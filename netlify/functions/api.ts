import type { Handler } from '@netlify/functions';
import Stripe from 'stripe';

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('Missing required Stripe secret: STRIPE_SECRET_KEY');
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2023-10-16",
});

// In-memory product data for Netlify deployment
const products = [
  {
    id: 1,
    name: "Starter Pack",
    description: "3 Bottle Pack - Perfect for trying Mintee",
    quantity: 3,
    price: "14.99",
    imageUrl: "https://ik.imagekit.io/boostkit/Mintee/Three_Bottles.webp?updatedAt=1749408731560",
    isPopular: false
  },
  {
    id: 2,
    name: "Family Pack",
    description: "6 Bottle Pack - Great for sharing",
    quantity: 6,
    price: "26.99",
    imageUrl: "https://ik.imagekit.io/boostkit/Mintee/Three_Bottles.webp?updatedAt=1749408731560",
    isPopular: true
  },
  {
    id: 3,
    name: "Value Pack",
    description: "12 Bottle Pack - Best value for regular drinkers",
    quantity: 12,
    price: "48.99",
    imageUrl: "https://ik.imagekit.io/boostkit/Mintee/Three_Bottles.webp?updatedAt=1749408731560",
    isPopular: false
  }
];

// In-memory subscription plans data for Netlify deployment
const subscriptionPlans = [
  {
    id: 1,
    name: "Weekly Delivery",
    description: "Fresh Mintee delivered to your door every week",
    price: "9.99",
    interval: "weekly",
    bottlesPerDelivery: 6,
    isPopular: false
  },
  {
    id: 2,
    name: "Monthly Delivery",
    description: "Monthly supply of refreshing Mintee water",
    price: "34.99",
    interval: "monthly",
    bottlesPerDelivery: 24,
    isPopular: true
  },
  {
    id: 3,
    name: "Quarterly Delivery",
    description: "Stock up with our best value quarterly plan",
    price: "94.99",
    interval: "quarterly",
    bottlesPerDelivery: 72,
    isPopular: false
  }
];

export const handler: Handler = async (event, context) => {
  const { path, httpMethod, body } = event;
  
  // CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  };

  if (httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers };
  }

  try {
    // Products endpoint
    if (path === '/.netlify/functions/api/products' && httpMethod === 'GET') {
      return {
        statusCode: 200,
        headers: { ...headers, 'Content-Type': 'application/json' },
        body: JSON.stringify(products),
      };
    }

    // Create payment intent endpoint
    if (path === '/.netlify/functions/api/create-payment-intent' && httpMethod === 'POST') {
      const { amount } = JSON.parse(body || '{}');
      
      const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(amount * 100), // Convert to cents
        currency: "gbp",
        automatic_payment_methods: {
          enabled: true,
        },
      });

      return {
        statusCode: 200,
        headers: { ...headers, 'Content-Type': 'application/json' },
        body: JSON.stringify({ clientSecret: paymentIntent.client_secret }),
      };
    }

    // Contact form endpoint
    if (path === '/.netlify/functions/api/contact' && httpMethod === 'POST') {
      const contactData = JSON.parse(body || '{}');
      
      // In production, you'd save this to a database
      console.log('Contact form submission:', contactData);
      
      return {
        statusCode: 200,
        headers: { ...headers, 'Content-Type': 'application/json' },
        body: JSON.stringify({ success: true, message: 'Message received' }),
      };
    }

    // Newsletter subscription endpoint
    if (path === '/.netlify/functions/api/newsletter' && httpMethod === 'POST') {
      const { email } = JSON.parse(body || '{}');
      
      // In production, you'd save this to a database
      console.log('Newsletter subscription:', email);
      
      return {
        statusCode: 200,
        headers: { ...headers, 'Content-Type': 'application/json' },
        body: JSON.stringify({ success: true, message: 'Subscribed successfully' }),
      };
    }

    // Subscription plans endpoint
    if (path === '/.netlify/functions/api/subscription-plans' && httpMethod === 'GET') {
      return {
        statusCode: 200,
        headers: { ...headers, 'Content-Type': 'application/json' },
        body: JSON.stringify(subscriptionPlans),
      };
    }

    // Create subscription endpoint
    if (path === '/.netlify/functions/api/create-subscription' && httpMethod === 'POST') {
      const subscriptionData = JSON.parse(body || '{}');
      
      // Find the plan
      const plan = subscriptionPlans.find(p => p.id === subscriptionData.planId);
      if (!plan) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ error: 'Invalid plan ID' }),
        };
      }

      try {
        // Create Stripe customer
        const customer = await stripe.customers.create({
          email: subscriptionData.customerEmail,
          name: subscriptionData.customerName,
          address: {
            line1: subscriptionData.deliveryAddress
          }
        });

        // Create Stripe product
        const product = await stripe.products.create({
          name: plan.name,
          description: plan.description,
        });

        // Create Stripe price
        const price = await stripe.prices.create({
          product: product.id,
          unit_amount: Math.round(parseFloat(plan.price) * 100),
          currency: 'gbp',
          recurring: {
            interval: plan.interval === 'weekly' ? 'week' : 
                     plan.interval === 'quarterly' ? 'month' : 'month',
            interval_count: plan.interval === 'quarterly' ? 3 : 1
          }
        });

        // Create Stripe subscription
        const subscription = await stripe.subscriptions.create({
          customer: customer.id,
          items: [{
            price: price.id
          }],
          payment_behavior: 'default_incomplete',
          payment_settings: { save_default_payment_method: 'on_subscription' },
          expand: ['latest_invoice.payment_intent']
        });

        const invoice = subscription.latest_invoice as any;
        const paymentIntent = invoice?.payment_intent;

        return {
          statusCode: 200,
          headers: { ...headers, 'Content-Type': 'application/json' },
          body: JSON.stringify({
            subscriptionId: subscription.id,
            clientSecret: paymentIntent?.client_secret,
            status: subscription.status
          }),
        };
      } catch (error: any) {
        console.error('Subscription creation error:', error);
        return {
          statusCode: 500,
          headers,
          body: JSON.stringify({ error: 'Failed to create subscription: ' + error.message }),
        };
      }
    }

    return {
      statusCode: 404,
      headers,
      body: JSON.stringify({ error: 'Not found' }),
    };

  } catch (error) {
    console.error('API Error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Internal server error' }),
    };
  }
};