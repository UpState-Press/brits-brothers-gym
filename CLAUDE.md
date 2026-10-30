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
/membership                 Pricing and membership options
/trainers                   Trainer listing
/trainers/:slug             Trainer detail, one per slug in src/data/trainers.ts
/find-your-trainer          Trainer match quiz (src/data/trainerMatch.ts)
/testimonials               Testimonials
/contact                    Contact form + location/hours
/consultation               Free evaluation form (Formspree + /api/eval-lead)
/resources                  Resources hub
/macro-calculator           Macro calculator (Formspree + /api/macro-lead)
/blog/powerlifting.html     Legacy SEO authority page (recovered)
/blog/bodybuilding.html     Legacy SEO authority page (recovered)
/blog/weight-loss.html      Legacy SEO authority page (recovered)
*                           404 page (NotFoundPage, noindex)
```

Current trainer slugs live in prerender-routes.json. Do not copy the list here; it goes stale.

---

## Redirects (vercel.json)

```
/programs/boxing, /boxing            -> /                        (301, boxing removed)
/trainers/jake_henderson             -> /trainers/jake-henderson (301)
/trainers/guy-mosley, guy_mosley     -> /trainers                (301, Guy left Oct 2026)
/macros-calculator, /macros, /macro, /calculator -> /macro-calculator (301)
/membership/, /contact/, /testimonials/ -> no trailing slash     (301)
```

The SPA rewrite is `/((?!api/).*)` -> /index.html so /api/* reaches the serverless functions.

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

## Trainers

Source of truth: `src/data/trainers.ts` (profiles) and `src/data/trainerMatch.ts` (quiz pool).
As of Oct 30, 2026: Olly Pierce (owner, no profile page), Jake Henderson, Ryan Mccaffery,
Hailey Peterson, Heather Hetager, Juliette Pierce, Evan Pierce (profile live, held out of the
quiz until boxing is ruled on). Guy Mosley left Oct 30, 2026.

Before any trainer change, read "Trainer changes" below.

---

## Integrations

- **Formspree endpoint:** stored in Vercel env var `VITE_CONTACT_FORM_ENDPOINT`
  - never hardcode this value; always reference `import.meta.env.VITE_CONTACT_FORM_ENDPOINT`
  - after changing this env var in Vercel, redeploy
  - Formspree emails go to Olly. Every form keeps sending to Formspree.
- **GHL (GoHighLevel) Brits sub-account:** location `vmfZgRdAoZXbZA38iuln`
  - `api/macro-lead.js` and `api/eval-lead.js` write contacts and tags to GHL
  - token is Vercel env var `GHL_WEBSITE_TOKEN`, **Production only**, so previews never write to Olly's CRM
  - without the token both functions return 204 and do nothing
  - UpState's macro nurture runs in GHL. See `nurture/macro/README.md`
- **Lead source:** `src/lib/leadSource.ts` keeps a 30 day first touch from UTMs. UpState links use
  `utm_source=upstate`. That is how UpState gets credit for evaluations its nurture brings in.
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
npm run build:nurture       # only if nurture copy or coaches.json changed
npm run build               # trainer check + vite build + prerender pipeline
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
5. **Never commit** `dist/`, `node_modules/`, `.env`, or `.env.local`. One exception: `nurture/macro/dist/` is committed on purpose.
6. **When adding a new page:** add it to App.tsx, prerender-routes.json, AND public/sitemap.xml — all three, never just one.
7. **When adding a legacy recovery page:** follow the authority-page pattern (H1, intro, who it's for, internal links to /trainers, /membership, /contact, /resources, and related blog pages, CTA).
8. **Never add** a CMS, markdown engine, RSS feed, or new package dependencies without explicit instruction.
9. **Payment links** must not be changed without explicit confirmation — they are live transaction URLs.
10. **Canonical URLs** must always be clean paths with no query strings.
11. **Trainer changes touch more than the trainer page.** Adding, removing, renaming or pausing a trainer is explicit instruction to edit every file in the "Trainer changes" checklist below, and only those. Do the whole checklist or none of it.
12. **`npm run build` runs `scripts/check-trainer-refs.mjs` first.** If it fails, fix what it names. Do not edit the check to make it pass, except to add a departed trainer to its `RETIRED` list.
13. **If the build prints `GHL SYNC NEEDED`,** the live nurture emails are out of date and only a human can paste them into GHL. Put `GHL SYNC NEEDED: email N` at the top of your final summary. Your job is not done until you do. You have no GHL access; do not try to get it.
14. **Never put a trainer's name in nurture copy by hand.** Email 4's coach list comes from `nurture/macro/coaches.json`.

---

## Trainer changes

A trainer's name lives in more places than their page. When Olly adds, drops, renames or pauses
a coach, all of these move together in one commit:

| # | File | Add a trainer | Remove a trainer | Pause (still on staff, out of the quiz) |
|---|---|---|---|---|
| 1 | `src/data/trainers.ts` | add profile + images in `src/assets/` | delete profile and its imports | no change |
| 2 | `src/data/trainerMatch.ts` | add entry, `active: true` | delete entry | `active: false` |
| 3 | `prerender-routes.json` | add `/trainers/<slug>` | remove it | no change |
| 4 | `public/sitemap.xml` | add the `<url>` block | remove it | no change |
| 5 | `vercel.json` | no change | 301 `/trainers/<slug>` (and `_` and trailing-slash forms) to `/trainers` | no change |
| 6 | `scripts/check-trainer-refs.mjs` | no change | add them to `RETIRED` | no change |
| 7 | `nurture/macro/coaches.json` | add `{slug, name, line}` | remove them | remove them |
| 8 | `nurture/macro/dist/` | `python3 nurture/macro/build.py` | same | same |
| 9 | GHL workflow email 4 | **human pastes** `dist/email4.body.html` | same | same |
| 10 | Copy that names coaches | search `src/` for the name and fix any prose | same | same |

Then run `npm run build`. The check fails on any drift between 1 to 8 and warns
`GHL SYNC NEEDED` for step 9. Report that in your summary (rule 13).

Things that update themselves and need no edit: the quiz's coach count and the /trainers grid. Things that never update themselves: the nurture emails in GHL.

`src/imports/` is legacy reference material from the old site. Leave it alone; the check skips it.

---

## UpState macro nurture

UpState, not Olly, nurtures macro calculator leads through GHL. Full wiring, file list and the
GHL paste steps: `nurture/macro/README.md`. Short version:

- Copy lives in `nurture/macro/build.py`. Coach list lives in `nurture/macro/coaches.json`.
- Build with `npm run build:nurture`. Commit `nurture/macro/dist/`.
- The live emails sit inside the GHL workflow, pasted by hand. Workers cannot update them.
- `nurture/macro/ghl-live.json` records what is live. Only the person who pasted updates it.
- Copy rules: no em or en dashes, no "seamless/robust/leverage/unlock/delve/utilize", short
  sentences, and every CTA keeps the line saying replies reach a real person.

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

### Add, remove or pause a trainer
```
[Add | Remove | Pause] trainer [NAME] ([slug]).

Follow the "Trainer changes" checklist in CLAUDE.md, every row for this change type.
Run python3 nurture/macro/build.py, then npm run build. Fix anything the trainer check names.
If the build prints GHL SYNC NEEDED, start your summary with "GHL SYNC NEEDED: email 4".
```

### Update business info
```
Update [FIELD] across the project.

Change [old value] to [new value].

Update siteConfig.ts first, then check LocalBusinessSchema.tsx, SEO.tsx defaults, and any hardcoded instances elsewhere in the codebase.

Do not change routing, layout, styling, or prerender logic.
Run npm run build and confirm prerender succeeds.
```

---

## Changelog

- v2.0 (2026-10-30, Johnny 5 with Jerry): refreshed routes, redirects, trainers and integrations
  to match the site. Added rules 11 to 14, the "Trainer changes" checklist, the UpState macro
  nurture section, `scripts/check-trainer-refs.mjs` in `npm run build`, and the trainer prompt.
- v1.x: original file.
