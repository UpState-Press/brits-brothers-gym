# Brit's Brothers Gym — Claude Code Context

This file loads automatically when Claude Code opens this project directory.
Do not delete it. Update it when business info, routes, or integrations change.

---

## Project identity

- **Client:** Brit's Brothers Gym
- **Agency:** UpState Press
- **GitHub repo:** UpState-Press/brits-brothers-gym
- **Production URL:** https://www.britsbrothersgym.com
- **Canonical domain:** https://www.britsbrothersgym.com (www, not apex)
- **Vercel project:** brits-brothers-gym (team: UpState / up-state)
- **Figma Make file:** https://www.figma.com/make/lxIkjOVjIoBq3ee59RiAhX/Brits-Brothers-Gym
  — Design reference only. Do not treat as production source of truth.

---

## Business info (used in siteConfig.ts, schema, SEO defaults)

```
Name:          Brit's Brothers Gym
Tagline:       Built British. Built Different.
Award:         Voted "Best Trainer of the Upstate" 9 years in a row
Phone:         (864) 553-3821  |  tel: 1-864-553-3821
Email:         britsbrothersgym@gmail.com
Address:       301 Airport Rd, Suite K, "The Junction", Greenville, SC 29601
Geo:           34.8454664, -82.355276
Hours (open gym):       Sun–Sat 5am–12am
Hours (personal training): Mon–Thu 6am–8pm, Fri 6am–7pm, Sat 8am–12pm
```

---

## Stack

```
Framework:     React + TypeScript/TSX
Build tool:    Vite
Routing:       React Router
SEO:           React Helmet / HelmetProvider
Styling:       Tailwind utility classes + custom theme/CSS variables
Prerender:     scripts/prerender.mjs (Puppeteer Core + @sparticuz/chromium)
Image opt:     scripts/optimize-images.mjs (sharp)
Hosting:       Vercel (auto-deploy from GitHub main)
Form backend:  Formspree — endpoint in VITE_CONTACT_FORM_ENDPOINT env var
Analytics:     GA4 — G-9TZCZP31QC
```

---

## Key files

```
src/config/siteConfig.ts          — canonical source for all business data
src/app/App.tsx                   — route definitions (must stay in sync with prerender-routes.json and sitemap.xml)
src/app/components/SEO.tsx        — reusable SEO head component
src/app/components/LocalBusinessSchema.tsx — JSON-LD structured data
scripts/prerender.mjs             — prerender pipeline (runs after vite build)
prerender-routes.json             — list of all routes to prerender
public/sitemap.xml                — submitted to Google Search Console
public/robots.txt                 — allows all crawling, points to sitemap
vercel.json                       — build config, rewrites, redirects, cache headers
```

---

## Active routes

Every route must exist in App.tsx, prerender-routes.json, AND public/sitemap.xml.

```
/                           Homepage
/contact                    Contact form + location/hours
/membership                 Pricing and membership options
/trainers                   Trainer listing
/trainers/jake-henderson    Trainer detail
/trainers/guy-mosley        Trainer detail
/testimonials               Testimonials
/resources                  Resources hub
/blog/powerlifting.html     Legacy SEO authority page (recovered)
/blog/bodybuilding.html     Legacy SEO authority page (recovered)
/blog/weight-loss.html      Legacy SEO authority page (recovered)
```

---

## Redirects (vercel.json)

```
/programs/boxing            → /                        (301, boxing removed)
/boxing/                    → /                        (301, legacy)
/trainers/jake_henderson/   → /trainers/jake-henderson (301)
/trainers/guy_mosley/       → /trainers/guy-mosley     (301)
```

---

## Payment / membership links (live, do not change without confirming)

```
Open Gym membership:        https://websales.webfdm.com/websales/sign/britsbrothersgym/b136
PT Add-On:                  https://websales.webfdm.com/websales/sign/britsbrothersgym/b136
Day Pass:                   https://app.moonclerk.com/pay/1wx71ob86e56
Single Session PT:          https://app.moonclerk.com/pay/2jge8a1mwx9k
1x/week PT:                 https://app.moonclerk.com/pay/72rdik6itc67
2x/week PT:                 https://app.moonclerk.com/pay/3vvvywkne9pc
Unlimited PT:               https://app.moonclerk.com/pay/b7wfk023l
6-Week Challenge (full):    https://app.moonclerk.com/pay/3avt9i7laad5
6-Week Challenge (4-pay):   https://app.moonclerk.com/pay/190ig8ay7e44
Student Program:            https://app.moonclerk.com/pay/jgowzl1n5jy
```

---

## Trainers (from live site)

```
Olly Pierce      — Owner & Head Coach
Kevin Bain       — Personal Trainer
Jake Henderson   — Personal Trainer  (route: /trainers/jake-henderson)
Guy Mosley       — Personal Trainer  (route: /trainers/guy-mosley)
Evan Pierce      — Cardio Boxing & Yoga
```

---

## Integrations

- **Formspree endpoint:** stored in Vercel env var `VITE_CONTACT_FORM_ENDPOINT`
  — never hardcode this value; always reference `import.meta.env.VITE_CONTACT_FORM_ENDPOINT`
  — after changing this env var in Vercel, redeploy
- **GA4 ID:** G-9TZCZP31QC
- **Google Search Console:** domain property verified via DNS TXT record
- **Sitemap submitted:** https://www.britsbrothersgym.com/sitemap.xml

---

## OG / social image

```
Path:   public/images/og-home.jpg
URL:    https://www.britsbrothersgym.com/images/og-home.jpg
Format: JPG (not SVG — SVG does not preview in iMessage/social)
```

---

## Build commands

```bash
npm install
npm run optimize:images     # run before build if new images were added
npm run build               # runs vite build + prerender pipeline
git add .
git commit -m "Description"
git push                    # triggers Vercel auto-deploy
```

---

## Rules Claude Code must follow for this project

1. **Never change** routing structure, prerender logic, Vercel config, or sitemap without explicit instruction.
2. **Always run** `npm run build` after any code change and confirm prerender output succeeds before committing.
3. **Never hardcode** business phone, email, address, or canonical URLs outside of `siteConfig.ts` — reference the config.
4. **Never hardcode** the Formspree endpoint — always use `import.meta.env.VITE_CONTACT_FORM_ENDPOINT`.
5. **Never commit** `dist/`, `node_modules/`, `.env`, or `.env.local`.
6. **When adding a new page:** add it to App.tsx, prerender-routes.json, AND public/sitemap.xml — all three, never just one.
7. **When adding a legacy recovery page:** follow the authority-page pattern (H1, intro, who it's for, internal links to /trainers, /membership, /contact, /resources, and related blog pages, CTA).
8. **Never add** a CMS, markdown engine, RSS feed, or new package dependencies without explicit instruction.
9. **Payment links** must not be changed without explicit confirmation — they are live transaction URLs.
10. **Canonical URLs** must always be clean paths with no query strings.

---

## Common prompts (copy-paste ready)

### Add a legacy SEO recovery page
```
Recover the legacy [TOPIC] blog topic as a lightweight SEO authority page.

Create route: /blog/[slug].html

Follow the authority-page pattern: H1, intro, who it's for, training philosophy section, why coaching matters, how Brit's Brothers is different, internal links, CTA.

Internal links must include: /trainers, /membership, /contact, /resources, and any related blog pages.

Add the route to: App.tsx, prerender-routes.json, public/sitemap.xml.

Do not add a CMS, RSS, markdown engine, or new packages.
Do not alter deployment config, prerender logic, or vercel.json.
Run npm run build and confirm prerender succeeds before committing.
```

### Domain/URL find-and-replace
```
Search the entire project for references to [old-domain] and replace with [new-domain].

Include: canonical URLs, og:url, sitemap.xml, robots.txt, LocalBusinessSchema, siteConfig.ts, SEO defaults, structured data, any hardcoded absolute links.

Do not change: routing, styling, component structure, deployment config, prerender logic.
Run npm run build and confirm prerender succeeds.
```

### Update business info
```
Update [FIELD] across the project.

Change [old value] to [new value].

Update siteConfig.ts first, then check LocalBusinessSchema.tsx, SEO.tsx defaults, and any hardcoded instances elsewhere in the codebase.

Do not change routing, layout, styling, or prerender logic.
Run npm run build and confirm prerender succeeds.
```
