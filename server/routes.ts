import type { Express } from "express";
import { createServer, type Server } from "http";
import Stripe from "stripe";
import { storage } from "./storage";
import { 
  insertContactMessageSchema, 
  insertNewsletterSubscriptionSchema,
  insertOrderSchema,
  insertOrderItemSchema,
  insertSubscriptionSchema
} from "@shared/schema";
import { z } from "zod";

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('Missing required Stripe secret: STRIPE_SECRET_KEY');
}
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2023-10-16",
});

const checkoutSchema = z.object({
  customerName: z.string().min(1),
  customerEmail: z.string().email(),
  customerPhone: z.string().optional(),
  deliveryAddress: z.string().min(1),
  items: z.array(z.object({
    productId: z.number(),
    quantity: z.number().min(1)
  }))
});

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Get all products
  app.get("/api/products", async (req, res) => {
    try {
      const products = await storage.getAllProducts();
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch products" });
    }
  });

  // Get a specific product
  app.get("/api/products/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const product = await storage.getProduct(id);
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }
      res.json(product);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch product" });
    }
  });

  // Submit contact form
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactMessageSchema.parse(req.body);
      const message = await storage.createContactMessage(validatedData);
      res.status(201).json({ success: true, id: message.id });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid form data", details: error.errors });
      }
      res.status(500).json({ error: "Failed to submit contact form" });
    }
  });

  // Subscribe to newsletter
  app.post("/api/newsletter", async (req, res) => {
    try {
      const validatedData = insertNewsletterSubscriptionSchema.parse(req.body);
      
      // Check if email already exists
      const existing = await storage.getAllNewsletterSubscriptions();
      const emailExists = existing.some(sub => sub.email === validatedData.email);
      
      if (emailExists) {
        return res.status(409).json({ error: "Email already subscribed" });
      }
      
      const subscription = await storage.createNewsletterSubscription(validatedData);
      res.status(201).json({ success: true, id: subscription.id });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid email", details: error.errors });
      }
      res.status(500).json({ error: "Failed to subscribe to newsletter" });
    }
  });

  // Process checkout
  app.post("/api/checkout", async (req, res) => {
    try {
      const validatedData = checkoutSchema.parse(req.body);
      
      // Calculate total amount
      let totalAmount = 0;
      const orderItems = [];
      
      for (const item of validatedData.items) {
        const product = await storage.getProduct(item.productId);
        if (!product) {
          return res.status(400).json({ error: `Product ${item.productId} not found` });
        }
        
        const itemTotal = parseFloat(product.price) * item.quantity;
        totalAmount += itemTotal;
        
        orderItems.push({
          productId: item.productId,
          quantity: item.quantity,
          unitPrice: product.price
        });
      }

      // Create order
      const order = await storage.createOrder({
        customerName: validatedData.customerName,
        customerEmail: validatedData.customerEmail,
        customerPhone: validatedData.customerPhone || null,
        deliveryAddress: validatedData.deliveryAddress,
        totalAmount: totalAmount.toFixed(2),
        status: "pending"
      });

      // Create order items
      for (const item of orderItems) {
        await storage.createOrderItem({
          ...item,
          orderId: order.id
        });
      }

      res.status(201).json({ 
        success: true, 
        orderId: order.id,
        totalAmount: order.totalAmount
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid checkout data", details: error.errors });
      }
      console.error("Checkout error:", error);
      res.status(500).json({ error: "Failed to process checkout" });
    }
  });

  // Get order details
  app.get("/api/orders/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const order = await storage.getOrder(id);
      if (!order) {
        return res.status(404).json({ error: "Order not found" });
      }
      
      const items = await storage.getOrderItems(id);
      res.json({ ...order, items });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch order" });
    }
  });

  // Stripe payment intent endpoint
  app.post("/api/create-payment-intent", async (req, res) => {
    try {
      const { amount } = req.body;
      
      if (!amount || amount <= 0) {
        return res.status(400).json({ error: "Invalid amount" });
      }

      const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(amount * 100), // Convert to cents
        currency: "gbp",
        metadata: {
          source: "mintee-website"
        }
      });

      res.json({ clientSecret: paymentIntent.client_secret });
    } catch (error: any) {
      console.error("Stripe payment intent error:", error);
      res.status(500).json({ 
        error: "Error creating payment intent: " + error.message 
      });
    }
  });

  // Get all subscription plans
  app.get("/api/subscription-plans", async (req, res) => {
    try {
      const plans = await storage.getAllSubscriptionPlans();
      res.json(plans);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch subscription plans" });
    }
  });

  // Create subscription with Stripe
  app.post("/api/create-subscription", async (req, res) => {
    try {
      const subscriptionData = insertSubscriptionSchema.parse(req.body);
      
      // Get the subscription plan
      const plan = await storage.getSubscriptionPlan(subscriptionData.planId!);
      if (!plan) {
        return res.status(400).json({ error: "Subscription plan not found" });
      }

      // Create Stripe customer if needed
      let stripeCustomer;
      try {
        stripeCustomer = await stripe.customers.create({
          email: req.body.customerEmail,
          name: req.body.customerName,
          address: {
            line1: subscriptionData.deliveryAddress
          }
        });
      } catch (stripeError) {
        console.error("Stripe customer creation error:", stripeError);
        return res.status(500).json({ error: "Failed to create customer" });
      }

      // Create Stripe subscription
      let stripeSubscription;
      try {
        stripeSubscription = await stripe.subscriptions.create({
          customer: stripeCustomer.id,
          items: [{
            price_data: {
              currency: 'gbp',
              product_data: {
                name: plan.name,
                description: plan.description || undefined,
              },
              unit_amount: Math.round(parseFloat(plan.price) * 100),
              recurring: {
                interval: plan.interval === 'weekly' ? 'week' : 
                         plan.interval === 'quarterly' ? 'month' : 'month',
                interval_count: plan.interval === 'quarterly' ? 3 : 1
              }
            }
          }],
          payment_behavior: 'default_incomplete',
          payment_settings: { save_default_payment_method: 'on_subscription' },
          expand: ['latest_invoice.payment_intent']
        });
      } catch (stripeError) {
        console.error("Stripe subscription creation error:", stripeError);
        return res.status(500).json({ error: "Failed to create subscription" });
      }

      // Save subscription to storage
      const subscription = await storage.createSubscription({
        planId: plan.id,
        stripeSubscriptionId: stripeSubscription.id,
        stripeCustomerId: stripeCustomer.id,
        status: stripeSubscription.status,
        currentPeriodStart: new Date(stripeSubscription.current_period_start * 1000),
        currentPeriodEnd: new Date(stripeSubscription.current_period_end * 1000),
        deliveryAddress: subscriptionData.deliveryAddress,
        cancelAtPeriodEnd: false,
        userId: subscriptionData.userId
      });

      const invoice = stripeSubscription.latest_invoice as any;
      const paymentIntent = invoice?.payment_intent;

      res.json({
        subscriptionId: subscription.id,
        stripeSubscriptionId: stripeSubscription.id,
        clientSecret: paymentIntent?.client_secret,
        status: stripeSubscription.status
      });
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid subscription data", details: error.errors });
      }
      console.error("Subscription creation error:", error);
      res.status(500).json({ error: "Failed to create subscription: " + error.message });
    }
  });

  // Get user subscriptions
  app.get("/api/subscriptions/:userId", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const subscriptions = await storage.getUserSubscriptions(userId);
      res.json(subscriptions);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch subscriptions" });
    }
  });

  // Cancel subscription
  app.post("/api/subscriptions/:id/cancel", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const subscription = await storage.getSubscription(id);
      
      if (!subscription) {
        return res.status(404).json({ error: "Subscription not found" });
      }

      // Cancel in Stripe
      await stripe.subscriptions.update(subscription.stripeSubscriptionId, {
        cancel_at_period_end: true
      });

      // Update in storage
      const updatedSubscription = await storage.updateSubscriptionStatus(
        id, 
        subscription.status, 
        true
      );

      res.json(updatedSubscription);
    } catch (error: any) {
      console.error("Subscription cancellation error:", error);
      res.status(500).json({ error: "Failed to cancel subscription: " + error.message });
    }
  });

  // Reactivate subscription
  app.post("/api/subscriptions/:id/reactivate", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const subscription = await storage.getSubscription(id);
      
      if (!subscription) {
        return res.status(404).json({ error: "Subscription not found" });
      }

      // Reactivate in Stripe
      await stripe.subscriptions.update(subscription.stripeSubscriptionId, {
        cancel_at_period_end: false
      });

      // Update in storage
      const updatedSubscription = await storage.updateSubscriptionStatus(
        id, 
        'active', 
        false
      );

      res.json(updatedSubscription);
    } catch (error: any) {
      console.error("Subscription reactivation error:", error);
      res.status(500).json({ error: "Failed to reactivate subscription: " + error.message });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
