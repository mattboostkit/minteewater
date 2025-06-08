# Mintee Deployment Guide

Your premium peppermint water e-commerce platform is ready for deployment! This guide covers Git setup and multiple deployment options.

## 🚀 Quick Git Setup

### 1. Prepare Your Repository
```bash
# Remove any existing git locks (if needed)
rm -f .git/index.lock

# Check git status
git status

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: Mintee e-commerce platform with subscription service"

# Set main branch (if needed)
git branch -M main
```

### 2. Connect to Your Remote Repository
```bash
# Add your GitHub/GitLab repository
git remote add origin [YOUR_REPOSITORY_URL]

# Push to remote
git push -u origin main
```

## 🌐 Deployment Options

### Option 1: Netlify (Recommended)

**Quick Setup:**
1. Go to [netlify.com](https://netlify.com)
2. Click "New site from Git"
3. Connect your repository
4. Configure build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
   - **Node version**: 18

**Environment Variables:**
```
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
VITE_STRIPE_PUBLIC_KEY=pk_test_your_stripe_public_key
```

### Option 2: Vercel

1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel --prod`
3. Follow prompts to deploy

### Option 3: Railway

1. Connect GitHub repository at [railway.app](https://railway.app)
2. Add environment variables
3. Deploy automatically

## 🔧 Environment Variables

**Required for all deployments:**
- `STRIPE_SECRET_KEY` - Your Stripe secret key (starts with `sk_`)
- `VITE_STRIPE_PUBLIC_KEY` - Your Stripe publishable key (starts with `pk_`)

**Get Stripe Keys:**
1. Visit [Stripe Dashboard](https://dashboard.stripe.com/apikeys)
2. Copy your test keys for development
3. Use live keys for production

## 📦 Build Process

The build creates optimized production assets:
```bash
npm run build
```

**Output:**
- `dist/` - Static files for deployment
- Optimized JavaScript (~374KB)
- Compressed CSS (~65KB)
- Image assets included

## ✅ Pre-Deployment Checklist

**Technical:**
- [ ] Environment variables configured
- [ ] Build completes successfully
- [ ] All routes work properly
- [ ] Payment integration tested

**Business:**
- [ ] Stripe account verified
- [ ] Payment flow tested with test cards
- [ ] Contact forms working
- [ ] Subscription plans configured

**SEO & Performance:**
- [ ] Meta tags configured
- [ ] Images optimized
- [ ] Loading states implemented
- [ ] Error handling in place

## 🧪 Testing Your Deployment

**Test Cards for Stripe:**
- Success: `4242 4242 4242 4242`
- Declined: `4000 0000 0000 0002`
- 3D Secure: `4000 0025 0000 3155`

**Key Features to Test:**
1. Homepage loads correctly
2. Product catalog displays
3. Shopping cart functionality
4. Checkout process (one-time payment)
5. Subscription flow
6. Contact form submission
7. Mobile responsiveness

## 🔄 Continuous Deployment

Once connected to Git, deployments are automatic:
1. Push code changes to main branch
2. Deployment service rebuilds automatically
3. Changes go live within 2-3 minutes

## 📊 Post-Deployment

**Monitor:**
- Deployment logs for errors
- Payment webhooks in Stripe
- Site performance metrics
- User analytics

**Optimize:**
- Set up error monitoring (Sentry)
- Configure analytics (Google Analytics)
- Add monitoring alerts
- Set up backup systems

## 🆘 Troubleshooting

**Common Issues:**
- **Build fails**: Check Node.js version (18+)
- **Env vars missing**: Verify all required variables set
- **Payments not working**: Check Stripe key configuration
- **Images not loading**: Verify asset paths in build

**Support:**
- Check deployment service logs
- Verify environment variables
- Test locally with `npm run build && npm run preview`

Your Mintee platform includes:
- Complete e-commerce functionality
- Subscription service with recurring billing
- Stripe payment integration
- Mobile-responsive design
- SEO optimization
- Production-ready build system