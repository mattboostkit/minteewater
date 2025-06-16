# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Development
- `npm run dev` - Start development server with hot reload (runs on port 5173)
- `npm run build` - Build for production (creates `dist/` directory)
- `npm run check` - Run TypeScript type checking
- `npm run db:push` - Push database schema changes using Drizzle Kit

### Production
- `npm start` - Run production server (requires build first)

## Architecture Overview

This is a full-stack e-commerce application for Mintee peppermint water with:

### Frontend (React + Vite)
- **Entry**: `client/src/main.tsx` → `App.tsx`
- **Routing**: Wouter-based routing with pages in `client/src/pages/`
- **State Management**: React Context for cart (`lib/cart-store.tsx`), TanStack Query for server state
- **UI Components**: Radix UI primitives with Tailwind CSS styling in `client/src/components/ui/`
- **Payment Integration**: Stripe Elements for checkout and subscription flows

### Backend
- **Development Server**: Express-based in `server/` (not used in production)
- **Production API**: Netlify Functions in `netlify/functions/api.ts`
- **Database**: Drizzle ORM with schema in `shared/schema.ts`
- **Storage**: Abstract storage layer in `server/storage.ts`

### Key Flows

1. **E-commerce Flow**:
   - Products displayed from API → Add to cart (Context) → Checkout page → Stripe payment intent → Success page

2. **Subscription Flow**:
   - Subscribe page → Select plan → Create Stripe subscription → Payment → Subscription management

3. **Deployment**:
   - Netlify deployment with serverless functions
   - Environment variables: `STRIPE_SECRET_KEY`, `VITE_STRIPE_PUBLIC_KEY`
   - Build output in `dist/`

### API Endpoints
- `GET /api/products` - Fetch all products
- `POST /api/create-payment-intent` - Create Stripe payment intent
- `POST /api/contact` - Submit contact form
- `POST /api/newsletter` - Subscribe to newsletter
- `POST /api/create-subscription` - Create Stripe subscription
- `GET/POST /api/subscriptions/*` - Manage subscriptions

### Testing Payments
Use Stripe test cards:
- Success: `4242 4242 4242 4242`
- Declined: `4000 0000 0000 0002`
- Requires authentication: `4000 0025 0000 3155`