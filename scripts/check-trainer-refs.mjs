// Trainer reference check. Runs before every build (npm run build) and on its own
// with: npm run check:trainers
//
// Trainers show up in more places than the trainer page. When a trainer is added,
// removed, renamed or paused, every one of these has to move together:
//   src/data/trainers.ts            site profiles (slug = page)
//   src/data/trainerMatch.ts        trainer quiz pool (active flag)
//   prerender-routes.json           prerendered /trainers/<slug> pages
//   public/sitemap.xml              /trainers/<slug> URLs
//   vercel.json                     301 for any removed trainer's old URL
//   nurture/macro/coaches.json      coach list in nurture email 4
//   nurture/macro/dist/             built email HTML (python3 nurture/macro/build.py)
//   GHL workflow (not in the repo)  a human pastes the new email 4 body into GHL
//
// Fails (exit 1) when the repo files disagree. Warns (exit 0) when the built emails
// differ from what was last pasted into GHL, because only a human can fix that.
import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { join } from 'node:path';

const ROOT = new URL('..', import.meta.url).pathname;
const read = (p) => readFileSync(join(ROOT, p), 'utf8');

// Trainers who have left. Their names must not appear on the site or in the emails,
// and their old URLs must 301. Add to this list when someone leaves; never remove.
const RETIRED = [
  { slug: 'guy-mosley', name: 'Guy Mosley', left: '2026-10-30' },
];

const errors = [];
const warns = [];
const fail = (msg, fix) => errors.push(fix ? `${msg}\n      fix: ${fix}` : msg);

// 1. Site profiles
const trainersTs = read('src/data/trainers.ts');
const siteSlugs = [...trainersTs.matchAll(/slug:\s*'([a-z0-9-]+)'/g)].map((m) => m[1]);

// 2. Quiz pool
const matchTs = read('src/data/trainerMatch.ts');
const quiz = [...matchTs.matchAll(/slug:\s*'([a-z0-9-]+)',\s*name:\s*'([^']+)',\s*group:\s*'[mf]',\s*active:\s*(true|false)/g)]
  .map((m) => ({ slug: m[1], name: m[2], active: m[3] === 'true' }));
if (!siteSlugs.length || !quiz.length) fail('Could not parse trainers.ts or trainerMatch.ts. The check script needs updating if their format changed.');
const active = quiz.filter((t) => t.active);
for (const t of quiz) {
  if (!siteSlugs.includes(t.slug)) fail(`Quiz trainer ${t.name} (${t.slug}) has no profile in src/data/trainers.ts`, 'add the profile or remove them from trainerMatch.ts');
}

// 3. Prerender + sitemap
const routes = JSON.parse(read('prerender-routes.json')).filter((r) => r.startsWith('/trainers/')).map((r) => r.slice(10));
const sitemap = [...read('public/sitemap.xml').matchAll(/\/trainers\/([a-z0-9-]+)<\/loc>/g)].map((m) => m[1]);
for (const s of siteSlugs) {
  if (!routes.includes(s)) fail(`/trainers/${s} missing from prerender-routes.json`);
  if (!sitemap.includes(s)) fail(`/trainers/${s} missing from public/sitemap.xml`);
}
for (const s of routes) if (!siteSlugs.includes(s)) fail(`prerender-routes.json lists /trainers/${s} but there is no such profile`, 'remove the route');
for (const s of sitemap) if (!siteSlugs.includes(s)) fail(`public/sitemap.xml lists /trainers/${s} but there is no such profile`, 'remove the <url> block');

// 4. Nurture email 4 coach list
const coaches = JSON.parse(read('nurture/macro/coaches.json')).coaches;
const cSlugs = coaches.map((c) => c.slug).sort().join(',');
const aSlugs = active.map((t) => t.slug).sort().join(',');
if (cSlugs !== aSlugs) {
  fail(`nurture/macro/coaches.json [${cSlugs}] does not match the active quiz trainers [${aSlugs}]`,
    'edit coaches.json to match, run python3 nurture/macro/build.py, then flag the GHL update (see nurture/macro/README.md)');
}
for (const c of coaches) {
  const q = quiz.find((t) => t.slug === c.slug);
  if (q && q.name !== c.name) fail(`coaches.json spells ${c.slug} as "${c.name}" but the quiz says "${q.name}"`);
}
const email4 = existsSync(join(ROOT, 'nurture/macro/dist/email4.body.html')) ? read('nurture/macro/dist/email4.body.html') : '';
if (!email4) fail('nurture/macro/dist/email4.body.html is missing', 'run python3 nurture/macro/build.py');
for (const c of coaches) if (email4 && !email4.includes(`${c.name}:</b>`)) fail(`Built email 4 is missing ${c.name}`, 'run python3 nurture/macro/build.py');
for (const t of quiz.filter((t) => !t.active)) if (email4.includes(t.name)) fail(`Built email 4 still lists ${t.name}, who is not active in the quiz`, 'run python3 nurture/macro/build.py');

// 5. Retired trainers
const vercel = read('vercel.json');
const SCAN = ['src', 'nurture', 'public', 'api', 'prerender-routes.json'];
const SKIP = new Set(['node_modules', 'dist', '.git', 'imports']); // src/imports is legacy reference material
const exts = /\.(tsx?|jsx?|mjs|json|html|xml|txt|md|py)$/;
const files = [];
const walk = (p) => {
  const full = join(ROOT, p);
  if (!existsSync(full)) return;
  if (statSync(full).isDirectory()) {
    for (const f of readdirSync(full)) if (!SKIP.has(f)) walk(join(p, f));
  } else if (exts.test(p)) files.push(p);
};
SCAN.forEach(walk);
// nurture/macro/dist is skipped by the walker (name "dist"), so scan it on purpose
for (const n of [1, 2, 3, 4, 5]) if (existsSync(join(ROOT, `nurture/macro/dist/email${n}.body.html`))) files.push(`nurture/macro/dist/email${n}.body.html`);
for (const r of RETIRED) {
  if (!vercel.includes(`"/trainers/${r.slug}"`)) fail(`vercel.json has no redirect for retired trainer /trainers/${r.slug}`, 'add a 301 to /trainers');
  for (const f of files) {
    const txt = read(f);
    if (txt.includes(r.name) || txt.includes(`/trainers/${r.slug}`)) fail(`${f} still mentions retired trainer ${r.name}`);
  }
}

// 6. Built emails vs what is live in GHL (warning only: a human has to paste)
const livePath = 'nurture/macro/ghl-live.json';
if (existsSync(join(ROOT, livePath))) {
  const live = JSON.parse(read(livePath));
  for (const n of [1, 2, 3, 4, 5]) {
    const p = `nurture/macro/dist/email${n}.body.html`;
    if (!existsSync(join(ROOT, p))) continue;
    const h = createHash('sha256').update(read(p)).digest('hex');
    if (live.emails?.[`email${n}`] !== h) warns.push(`email${n}: built HTML differs from what is live in GHL (last synced ${live.synced || 'unknown'})`);
  }
}

if (errors.length) {
  console.error(`\n[check-trainer-refs] FAILED: ${errors.length} problem(s)\n`);
  errors.forEach((e) => console.error(`  - ${e}`));
  console.error('\n  Trainer change checklist: CLAUDE.md, section "Trainer changes".\n');
  process.exit(1);
}
console.log(`[check-trainer-refs] OK: ${siteSlugs.length} profiles, ${active.length} in the quiz and nurture email 4 (${active.map((t) => t.name).join(', ')})`);
if (warns.length) {
  console.warn('\n[check-trainer-refs] GHL SYNC NEEDED. The live nurture emails are out of date:');
  warns.forEach((w) => console.warn(`  - ${w}`));
  console.warn('  A human (or Johnny) must paste the new body into the GHL workflow. Steps: nurture/macro/README.md');
  console.warn('  Agents: put "GHL SYNC NEEDED" and the email numbers in your final summary. Your job is not done until you do.\n');
}
