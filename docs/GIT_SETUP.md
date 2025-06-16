# Git Setup Commands for Mintee Deployment

Follow these exact commands to prepare your repository for deployment:

## 1. Check Current Status
```bash
ls -la
```

## 2. Add All Files to Git
```bash
git add .
git add .gitignore
git add DEPLOYMENT.md
git add README.md
```

## 3. Create Initial Commit
```bash
git commit -m "Initial commit: Mintee e-commerce platform with subscription service

Features:
- Complete e-commerce functionality with shopping cart
- Subscription service with recurring billing (Stripe)
- Payment processing for one-time and recurring purchases
- Mobile-responsive design with Tailwind CSS
- SEO-optimized pages for better search visibility
- Contact forms and newsletter integration
- Product catalog with inventory management
- Netlify Functions for serverless backend
- Production-ready build system"
```

## 4. Set Main Branch
```bash
git branch -M main
```

## 5. Add Your Remote Repository
Replace `[YOUR_REPO_URL]` with your actual GitHub/GitLab repository URL:
```bash
git remote add origin [YOUR_REPO_URL]
```

## 6. Push to Remote
```bash
git push -u origin main
```

## Quick Deploy to Netlify

After pushing to Git:

1. Go to https://netlify.com
2. Click "New site from Git"
3. Choose your repository
4. Set build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
5. Add environment variables:
   - `STRIPE_SECRET_KEY`
   - `VITE_STRIPE_PUBLIC_KEY`
6. Click Deploy

Your site will be live in 2-3 minutes!

## Environment Variables Needed

Get these from your Stripe Dashboard (https://dashboard.stripe.com/apikeys):

**For Testing:**
- `STRIPE_SECRET_KEY`: `sk_test_...`
- `VITE_STRIPE_PUBLIC_KEY`: `pk_test_...`

**For Production:**
- `STRIPE_SECRET_KEY`: `sk_live_...`
- `VITE_STRIPE_PUBLIC_KEY`: `pk_live_...`