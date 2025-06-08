# Mintee - Premium Peppermint Water

A modern e-commerce website for Mintee peppermint-infused water, built with React, Vite, and Stripe payments.

## Features

- Modern, responsive design optimized for mobile and desktop
- Complete e-commerce functionality with shopping cart
- Stripe payment integration for secure transactions
- SEO-optimized separate pages (Home, Shop, About, Sustainability, Contact)
- Contact form and newsletter subscription
- Performance optimized with Vite build system

## Tech Stack

- **Frontend**: React 18, Vite, TypeScript
- **Styling**: Tailwind CSS, Radix UI components
- **Payments**: Stripe Elements
- **State Management**: React Context API
- **Forms**: React Hook Form with Zod validation
- **Routing**: Wouter
- **Deployment**: Netlify with Functions

## Local Development

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up environment variables:
   - `STRIPE_SECRET_KEY` - Your Stripe test secret key
   - `VITE_STRIPE_PUBLIC_KEY` - Your Stripe test publishable key
4. Start development server: `npm run dev`

## Deployment to Netlify

1. Push your code to GitHub
2. Connect your GitHub repo to Netlify
3. Set build command: `npm run build`
4. Set publish directory: `dist`
5. Add environment variables in Netlify dashboard:
   - `STRIPE_SECRET_KEY`
   - `VITE_STRIPE_PUBLIC_KEY`

## Environment Variables

### Required for Production
- `STRIPE_SECRET_KEY` - Stripe secret key (use test keys for development)
- `VITE_STRIPE_PUBLIC_KEY` - Stripe publishable key (use test keys for development)

## Testing Payments

Use Stripe test card numbers:
- Success: `4242 4242 4242 4242`
- Declined: `4000 0000 0000 0002`
- Requires authentication: `4000 0025 0000 3155`

## Project Structure

```
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── lib/            # Utilities and stores
│   │   └── hooks/          # Custom React hooks
├── netlify/
│   └── functions/          # Netlify serverless functions
├── server/                 # Development server (not used in production)
└── shared/                 # Shared types and schemas
```

## License

MIT