# Pre-Deployment Checklist

Use this checklist before deploying to production to ensure everything is ready.

## ✅ Code Quality

- [ ] **Test local build**
  ```bash
  pnpm build
  pnpm preview
  ```
  - Build completes without errors
  - Preview shows all pages working correctly
  - No console errors in browser

- [ ] **Verify TypeScript**
  ```bash
  pnpm tsc --noEmit
  ```
  - No TypeScript errors

- [ ] **Test all routes**
  - [ ] Homepage (/)
  - [ ] Membership (/membership)
  - [ ] Trainers (/trainers)
  - [ ] Trainer detail pages (/trainers/jake-henderson, /trainers/guy-mosley)
  - [ ] Boxing (/programs/boxing)
  - [ ] Testimonials (/testimonials)
  - [ ] Contact (/contact)

- [ ] **Test responsive design**
  - [ ] Desktop (1920px+)
  - [ ] Laptop (1024px-1919px)
  - [ ] Tablet (768px-1023px)
  - [ ] Mobile (320px-767px)

- [ ] **Test navigation**
  - [ ] All nav links work
  - [ ] Mobile menu opens/closes
  - [ ] Footer links work
  - [ ] Back button works on all pages

## ✅ Content Review

- [ ] **Business information** (`/src/config/siteConfig.ts`)
  - [ ] Phone numbers are correct
  - [ ] Email address is correct
  - [ ] Physical address is correct
  - [ ] Business hours are current
  - [ ] Founded year is correct

- [ ] **Payment links** (`/src/config/siteConfig.ts`)
  - [ ] Open Gym membership link is production-ready
  - [ ] Personal training package links are production-ready
  - [ ] All PayPal/payment URLs are tested and working
  - [ ] Prices match current offerings

- [ ] **Trainer information** (`/src/data/trainers.ts`)
  - [ ] All trainer names spelled correctly
  - [ ] Titles are current
  - [ ] Bios are accurate
  - [ ] All trainer images display correctly

- [ ] **Images and assets**
  - [ ] All images load correctly
  - [ ] No broken image links
  - [ ] Logo displays properly
  - [ ] Favicon is set (if applicable)

## ✅ SEO Preparation

- [ ] **Meta tags** (verify on each page)
  - [ ] Unique title tags (50-60 characters)
  - [ ] Unique meta descriptions (150-160 characters)
  - [ ] Relevant keywords included
  - [ ] Open Graph tags present
  - [ ] Twitter Card tags present

- [ ] **Structured data**
  - [ ] LocalBusiness schema present on all pages
  - [ ] Business hours match website
  - [ ] Address matches Google Business Profile
  - [ ] Phone number format is consistent

- [ ] **SEO files ready for update**
  - [ ] Note placeholder domain in sitemap.xml
  - [ ] Note placeholder domain in robots.txt
  - [ ] Plan to update after deployment

## ✅ Technical Setup

- [ ] **Git repository**
  - [ ] Code pushed to GitHub/GitLab/Bitbucket
  - [ ] Repository is public or hosting platform has access
  - [ ] .gitignore includes node_modules, dist, .env.local

- [ ] **Environment variables**
  - [ ] .env.example is up to date
  - [ ] No sensitive data in source code
  - [ ] Plan for adding env vars to hosting platform (if needed)

- [ ] **Dependencies**
  - [ ] All packages installed: `pnpm install`
  - [ ] No security vulnerabilities: `pnpm audit`
  - [ ] Lock file (pnpm-lock.yaml) is committed

- [ ] **Build configuration**
  - [ ] vercel.json or netlify.toml is present
  - [ ] vite.config.ts is correctly configured
  - [ ] Base path is correct (for GitHub Pages)

## ✅ Performance Optimization

- [ ] **Assets**
  - [ ] Images are optimized (compressed)
  - [ ] No unnecessarily large files
  - [ ] Fonts are loaded efficiently

- [ ] **Bundle size**
  - [ ] Build size is reasonable (check dist/ folder after build)
  - [ ] No duplicate dependencies
  - [ ] Code splitting implemented (automatic with Vite)

## ✅ Legal & Compliance

- [ ] **Privacy & Legal**
  - [ ] Privacy policy present (if collecting user data)
  - [ ] Terms of service present (if applicable)
  - [ ] Cookie consent (if using analytics)
  - [ ] Accessibility considerations (WCAG guidelines)

- [ ] **Copyright**
  - [ ] All images have proper licenses
  - [ ] Font licenses are valid for web use
  - [ ] No trademarked content without permission

## ✅ Platform-Specific

### For Vercel:
- [ ] vercel.json is configured
- [ ] Account has access to Git repository
- [ ] Domain DNS is ready (if using custom domain)

### For Netlify:
- [ ] netlify.toml is configured
- [ ] Account has access to Git repository
- [ ] Domain DNS is ready (if using custom domain)

### For GitHub Pages:
- [ ] gh-pages package installed
- [ ] Base path configured in vite.config.ts
- [ ] Deploy script added to package.json
- [ ] Repository settings allow GitHub Pages

## ✅ Post-Deployment Prep

- [ ] **Have Google accounts ready**
  - [ ] Google Search Console account
  - [ ] Google Analytics account (optional)
  - [ ] Google Business Profile account

- [ ] **Domain ready**
  - [ ] Domain purchased (if using custom domain)
  - [ ] DNS access available
  - [ ] SSL certificate plan (usually auto-provisioned)

- [ ] **Backup plan**
  - [ ] Know how to rollback deployment
  - [ ] Have local backup of code
  - [ ] Git history is clean

## ✅ Final Checks

- [ ] **Communication**
  - [ ] Stakeholders notified of deployment timeline
  - [ ] Downtime window communicated (if applicable)
  - [ ] Support contact ready for issues

- [ ] **Testing accounts**
  - [ ] Test payment process (if applicable)
  - [ ] Test contact form submission
  - [ ] Test all external links

- [ ] **Documentation**
  - [ ] Deployment guide reviewed (DEPLOYMENT.md)
  - [ ] Post-deployment checklist ready
  - [ ] Team knows how to make content updates

---

## Ready to Deploy? 🚀

Once all items are checked:

1. **Choose your platform** (Vercel, Netlify, or GitHub Pages)
2. **Follow deployment guide** (see DEPLOYMENT.md)
3. **Complete post-deployment tasks** (see DEPLOYMENT.md → Post-Deployment Tasks)

---

**Last Review Date:** _______________  
**Reviewed By:** _______________  
**Ready for Production:** ☐ Yes ☐ No
