# Deployment Guide for Vercel

## Prerequisites

1. Install Vercel CLI globally:
```bash
npm install -g vercel
```

2. Create a Vercel account at https://vercel.com

## Deployment Steps

### Option 1: Deploy via Vercel CLI

1. Login to Vercel:
```bash
vercel login
```

2. Deploy from your project directory:
```bash
vercel
```

3. Follow the prompts:
   - Set up and deploy? **Y**
   - Which scope? Select your account
   - Link to existing project? **N** (for first deployment)
   - What's your project's name? **bio-profile-app**
   - In which directory is your code located? **./**

4. For production deployment:
```bash
vercel --prod
```

### Option 2: Deploy via GitHub Integration

1. Push your code to GitHub
2. Go to https://vercel.com/dashboard
3. Click "New Project"
4. Import your GitHub repository
5. Vercel will automatically detect it's a React app
6. Click "Deploy"

## Environment Variables (if needed)

If you need environment variables, add them in:
- Vercel Dashboard → Project Settings → Environment Variables
- Or via CLI: `vercel env add`

## Custom Domain (Optional)

1. Go to Project Settings → Domains
2. Add your custom domain
3. Configure DNS records as instructed

## Build Configuration

The project is already configured with:
- `vercel.json` for routing
- `vercel-build` script in package.json
- Proper build output directory (`build/`)

## Troubleshooting

- If build fails, check the build logs in Vercel dashboard
- Ensure all dependencies are in `package.json`
- Check that `npm run build` works locally first