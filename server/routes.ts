import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertContactMessageSchema, 
  insertNewsletterSubscriptionSchema,
  insertOrderSchema,
  insertOrderItemSchema
} from "@shared/schema";
import { z } from "zod";

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

  const httpServer = createServer(app);
  return httpServer;
}
