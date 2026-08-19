import puppeteer from 'puppeteer-core';
import chromium from '@sparticuz/chromium';

const URL = process.env.SHOT_URL;
const browser = await puppeteer.launch({
  args: [...chromium.args, '--no-sandbox'],
  executablePath: await chromium.executablePath(),
  headless: true,
});
const page = await browser.newPage();
await page.setViewport({ width: Number(process.env.W||1440), height: 900 });
await page.goto(URL, { waitUntil: 'networkidle0', timeout: 90000 });
await new Promise((r) => setTimeout(r, 2000));

const report = await page.evaluate(() => {
  const main = document.querySelectorAll('section');
  const out = [];
  main.forEach((s) => {
    const r = s.getBoundingClientRect();
    const cs = getComputedStyle(s);
    const top = r.top + window.scrollY;
    const bottom = top + r.height;
    // divider images = imgs with empty alt that span full width
    const divs = [...s.querySelectorAll('img[alt=""]')].map((img) => {
      const ir = img.getBoundingClientRect();
      const iTop = ir.top + window.scrollY;
      return {
        src: (img.currentSrc || img.src).split('/').pop(),
        height: Math.round(ir.height),
        atTop: Math.abs(iTop - top) < 4,
        atBottom: Math.abs(iTop + ir.height - bottom) < 4,
        rotated: getComputedStyle(img).transform !== 'none',
      };
    }).filter((d) => d.atTop || d.atBottom);

    // text elements that intrude into a divider strip
    const collisions = [];
    divs.forEach((d) => {
      const stripTop = d.atTop ? top : bottom - d.height;
      const stripBot = stripTop + d.height;
      s.querySelectorAll('h1,h2,h3,p,blockquote,a,button,label,input').forEach((el) => {
        const er = el.getBoundingClientRect();
        if (!er.height) return;
        const eTop = er.top + window.scrollY;
        const eBot = eTop + er.height;
        if (eTop < stripBot && eBot > stripTop) {
          collisions.push((el.textContent || el.tagName).trim().slice(0, 40));
        }
      });
    });

    out.push({
      id: s.id || null,
      bg: cs.backgroundColor,
      top: Math.round(top),
      height: Math.round(r.height),
      padTop: cs.paddingTop,
      padBottom: cs.paddingBottom,
      dividers: divs,
      collisions: [...new Set(collisions)],
    });
  });
  return out;
});

const rgb = (s) => s.replace(/\s/g, '');
const NAME = { 'rgb(18,18,20)': '#121214', 'rgb(28,28,30)': '#1c1c1e', 'rgb(10,10,12)': '#0a0a0c' };

console.log('\n=== SECTION / SEAM AUDIT ===');
report.forEach((s, i) => {
  const shade = NAME[rgb(s.bg)] || s.bg;
  console.log(`\n[${i}] ${s.id || '(no id)'}  bg=${shade}  h=${s.height}  padT=${s.padTop} padB=${s.padBottom}`);
  s.dividers.forEach((d) =>
    console.log(`     divider ${d.atTop ? 'TOP' : 'BOTTOM'} h=${d.height} rotated=${d.rotated} ${d.src}`),
  );
  if (!s.dividers.length) console.log('     (no divider)');
  if (s.collisions.length) console.log(`     !! TEXT IN DIVIDER STRIP: ${JSON.stringify(s.collisions)}`);
});

console.log('\n=== SEAM OWNERSHIP ===');
for (let i = 0; i < report.length - 1; i++) {
  const a = report[i], b = report[i + 1];
  const sa = NAME[rgb(a.bg)] || a.bg, sb = NAME[rgb(b.bg)] || b.bg;
  const owners = [];
  if (a.dividers.some((d) => d.atBottom)) owners.push(`upper[${i}] bottom`);
  if (b.dividers.some((d) => d.atTop)) owners.push(`lower[${i + 1}] top`);
  const changes = sa !== sb;
  let verdict = 'ok';
  if (owners.length > 1) verdict = 'FAIL: two dividers on one seam';
  else if (changes && owners.length === 0) verdict = 'WARN: shade changes with no divider';
  console.log(`seam ${i}->${i + 1}  ${sa} -> ${sb}  owners=[${owners.join(', ') || 'none'}]  ${verdict}`);
}

await browser.close();
