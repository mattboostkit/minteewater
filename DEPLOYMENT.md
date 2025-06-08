# Deployment Guide

## Quick Netlify Deployment

### Step 1: Push to GitHub
1. Create a new repository on GitHub
2. Initialize Git in your project:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin [your-repo-url]
   git push -u origin main
   ```

### Step 2: Connect to Netlify
1. Go to [netlify.com](https://netlify.com) and sign up/login
2. Click "New site from Git"
3. Choose GitHub and authorize
4. Select your repository
5. Configure build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
   - **Node version**: 18

### Step 3: Environment Variables
Add these in Netlify dashboard → Site settings → Environment variables:
- `STRIPE_SECRET_KEY`: Your Stripe secret key
- `VITE_STRIPE_PUBLIC_KEY`: Your Stripe publishable key

### Step 4: Deploy
Click "Deploy site" - Netlify will:
- Install dependencies
- Build your site
- Deploy to global CDN
- Provide a live URL

## Custom Domain (Optional)
1. In Netlify dashboard → Domain settings
2. Add custom domain
3. Configure DNS records as shown
4. SSL certificate auto-generated

## Production Checklist
- [ ] Replace test Stripe keys with live keys
- [ ] Test payment flow thoroughly
- [ ] Set up proper error monitoring
- [ ] Configure form notifications
- [ ] Add Google Analytics (optional)

## Monitoring
- Netlify provides built-in analytics
- Function logs available in dashboard
- Set up Stripe webhooks for payment confirmations