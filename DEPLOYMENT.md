# Deployment Guide - Brit's Brothers Gym

This guide covers deploying the website to production hosting platforms.

## Pre-Deployment Checklist

Before deploying, ensure you complete these steps:

### 1. Test Build Locally
```bash
pnpm build
pnpm preview
```
- Verify the build completes without errors
- Test the preview to ensure all pages work correctly
- Check that all assets (images, fonts) load properly

### 2. Update Site Configuration
After deployment, you MUST update these files with your actual domain:

**`/public/sitemap.xml`**
- Replace all instances of `https://www.britsbrothers.com` with your actual domain
- Update `<lastmod>` dates to the current date (format: YYYY-MM-DD)

**`/public/robots.txt`**
- Update the Sitemap URL with your actual domain

### 3. Verify Payment Links
Check that all payment URLs in `/src/config/siteConfig.ts` are correct:
- Open Gym membership link
- Personal training package links
- Ensure all PayPal/payment URLs are production-ready

### 4. Review Contact Information
Verify all contact details in `/src/config/siteConfig.ts`:
- Phone numbers
- Email addresses
- Physical address
- Business hours

## Deployment Options

### Option 1: Deploy to Vercel (Recommended)

Vercel is optimized for Vite applications and offers excellent performance.

#### Prerequisites
- GitHub/GitLab/Bitbucket account
- Vercel account (free tier available)

#### Steps

1. **Push code to Git repository**
   ```bash
   git init
   git add .
   git commit -m "Initial commit - ready for deployment"
   git remote add origin <your-repo-url>
   git push -u origin main
   ```

2. **Import project to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your Git repository
   - Vercel will auto-detect the configuration from `vercel.json`

3. **Configure deployment settings**
   - Framework Preset: **Vite**
   - Build Command: `pnpm build` (auto-detected)
   - Output Directory: `dist` (auto-detected)
   - Install Command: `pnpm install` (auto-detected)

4. **Deploy**
   - Click "Deploy"
   - Wait for build to complete (~1-2 minutes)
   - Your site will be live at `https://<project-name>.vercel.app`

5. **Add custom domain** (optional)
   - Go to Project Settings → Domains
   - Add your custom domain (e.g., `www.britsbrothers.com`)
   - Follow DNS configuration instructions
   - Vercel automatically provisions SSL certificate

#### Automatic Deployments
- Every push to `main` branch triggers automatic deployment
- Pull requests get preview deployments

---

### Option 2: Deploy to Netlify

Netlify is another excellent hosting option with a generous free tier.

#### Prerequisites
- GitHub/GitLab/Bitbucket account
- Netlify account (free tier available)

#### Steps

1. **Push code to Git repository** (same as Vercel)

2. **Import project to Netlify**
   - Go to [netlify.com](https://netlify.com)
   - Click "Add new site" → "Import an existing project"
   - Connect your Git repository
   - Netlify will auto-detect settings from `netlify.toml`

3. **Configure build settings**
   - Build command: `pnpm build` (auto-detected)
   - Publish directory: `dist` (auto-detected)
   - Node version: 20 (set in netlify.toml)

4. **Deploy**
   - Click "Deploy site"
   - Wait for build to complete
   - Your site will be live at `https://<random-name>.netlify.app`

5. **Add custom domain** (optional)
   - Go to Site Settings → Domain management
   - Add custom domain
   - Configure DNS records
   - SSL certificate is automatically provisioned

---

### Option 3: Deploy to GitHub Pages

Free hosting directly from your GitHub repository.

#### Prerequisites
- GitHub account
- GitHub repository

#### Steps

1. **Install gh-pages package**
   ```bash
   pnpm add -D gh-pages
   ```

2. **Update `package.json`**
   Add these scripts:
   ```json
   {
     "scripts": {
       "predeploy": "pnpm build",
       "deploy": "gh-pages -d dist"
     }
   }
   ```

3. **Update `vite.config.ts`**
   Add base path (replace with your repo name):
   ```ts
   export default defineConfig({
     base: '/your-repo-name/',
     // ... rest of config
   })
   ```

4. **Deploy**
   ```bash
   pnpm deploy
   ```

5. **Enable GitHub Pages**
   - Go to repository Settings → Pages
   - Source: Deploy from a branch
   - Branch: `gh-pages` → `/ (root)`
   - Save

6. **Access your site**
   - URL: `https://<username>.github.io/<repo-name>/`

**Note:** GitHub Pages doesn't support custom domains on free tier without additional setup.

---

## Post-Deployment Tasks

After your site is live, complete these critical SEO and marketing steps:

### 1. Update SEO Files with Actual Domain

**Update sitemap.xml**
```bash
# Replace placeholder domain with your actual domain
# Example: https://www.britsbrothers.com
```

**Update robots.txt**
```bash
# Update sitemap URL with your actual domain
```

### 2. Submit to Search Engines

**Google Search Console**
1. Go to [search.google.com/search-console](https://search.google.com/search-console)
2. Add property (use your domain)
3. Verify ownership (DNS verification or HTML tag)
4. Submit sitemap: `https://yourdomain.com/sitemap.xml`
5. Monitor indexing status

**Bing Webmaster Tools**
1. Go to [bing.com/webmasters](https://www.bing.com/webmasters)
2. Add your site
3. Verify ownership
4. Submit sitemap
5. Import settings from Google Search Console (optional)

### 3. Set Up Google Business Profile

Critical for local SEO and "gyms near me" searches:

1. Go to [business.google.com](https://business.google.com)
2. Create/claim business listing for "Brit's Brothers Gym"
3. Verify business (postcard, phone, or email)
4. Complete profile:
   - Add business hours (match website)
   - Upload photos (gym interior, equipment, trainers)
   - Add services (Personal Training, Open Gym, Boxing, Yoga)
   - Set business category: Gym / Fitness Center
   - Add attributes (Personal Trainer, Boxing Studio, etc.)
5. Publish website URL
6. Encourage customers to leave reviews

### 4. Add Google Analytics (Optional but Recommended)

Track visitor behavior and measure marketing effectiveness:

1. Go to [analytics.google.com](https://analytics.google.com)
2. Create new property
3. Get tracking ID (GA4 format: G-XXXXXXXXXX)
4. Add to website:
   - Install `react-ga4` package
   - Initialize in App.tsx
   - Track page views and events

### 5. Monitor Performance

**Week 1-2: Indexing**
- Check Google Search Console for indexing errors
- Verify all pages are discovered
- Fix any crawl errors

**Month 1: Initial Rankings**
- Monitor for branded searches ("Brit's Brothers Gym")
- Check local pack rankings ("gym Greenville SC")
- Review Search Console performance data

**Month 2-3: Optimization**
- Analyze which pages get most traffic
- Identify top keywords
- Create content for underperforming pages
- Monitor bounce rate and user engagement

**Ongoing:**
- Update content regularly (hours, pricing, trainers)
- Add new testimonials and success stories
- Create blog posts for additional keywords
- Build local citations and backlinks

## Troubleshooting

### Build Fails
- Check Node version (should be 18+)
- Clear node_modules: `rm -rf node_modules && pnpm install`
- Check for TypeScript errors: `pnpm tsc --noEmit`

### Assets Not Loading
- Verify all image imports use correct syntax
- Check that `figma:asset/` imports are resolved during build
- Ensure base path is correct in vite.config.ts

### Routing Issues (404 on refresh)
- Verify SPA rewrites are configured (vercel.json or netlify.toml)
- Check that all routes redirect to index.html

### Slow Performance
- Check bundle size: `pnpm build` then inspect dist/ folder
- Optimize images (compress, use WebP format)
- Enable lazy loading for images
- Use code splitting for large components

## Maintenance

### Updating Content
- Edit `/src/config/siteConfig.ts` for business info, hours, pricing
- Edit `/src/data/trainers.ts` for trainer information
- Update component files for page content
- Push changes to Git (triggers automatic deployment)

### Updating Dependencies
```bash
# Check for updates
pnpm outdated

# Update all dependencies
pnpm update

# Test build
pnpm build
pnpm preview
```

### Backup Strategy
- Git repository serves as version control
- Export database/content regularly (if using CMS in future)
- Keep local copy of production environment variables

## Support

For deployment issues:
- **Vercel:** [vercel.com/docs](https://vercel.com/docs)
- **Netlify:** [docs.netlify.com](https://docs.netlify.com)
- **Vite:** [vitejs.dev/guide/build](https://vitejs.dev/guide/build)

For SEO issues:
- **Google Search Console Help:** [support.google.com/webmasters](https://support.google.com/webmasters)
- **SEO Guide:** See `/workspaces/default/code/PHASE5-SUMMARY.md`

---

## Quick Reference: Deployment Commands

```bash
# Local development
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview

# Deploy to Vercel (from CLI)
npx vercel

# Deploy to Netlify (from CLI)
npx netlify deploy --prod

# Deploy to GitHub Pages
pnpm deploy
```

---

**Ready for Production:** This site is fully optimized and ready to deploy! 🚀
