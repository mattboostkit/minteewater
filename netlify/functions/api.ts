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
    imageUrl: "/api/placeholder/300/400",
    isPopular: false
  },
  {
    id: 2,
    name: "Family Pack",
    description: "6 Bottle Pack - Great for sharing",
    quantity: 6,
    price: "26.99",
    imageUrl: "/api/placeholder/300/400",
    isPopular: true
  },
  {
    id: 3,
    name: "Value Pack",
    description: "12 Bottle Pack - Best value for regular drinkers",
    quantity: 12,
    price: "48.99",
    imageUrl: "/api/placeholder/300/400",
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