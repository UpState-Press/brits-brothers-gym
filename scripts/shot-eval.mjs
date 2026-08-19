import puppeteer from 'puppeteer-core';
import chromium from '@sparticuz/chromium';

const URL = process.env.SHOT_URL;
const OUT = process.env.SHOT_OUT || '/tmp/shots';
const fs = await import('node:fs');
fs.mkdirSync(OUT, { recursive: true });

const exePath = await chromium.executablePath();
const browser = await puppeteer.launch({
  args: [...chromium.args, '--no-sandbox'],
  executablePath: exePath,
  headless: true,
});

for (const [w, h, tag] of [[1440, 900, 'laptop'], [390, 844, 'mobile']]) {
  const page = await browser.newPage();
  await page.setViewport({ width: w, height: h });
  await page.goto(URL, { waitUntil: 'networkidle0', timeout: 90000 });
  await new Promise((r) => setTimeout(r, 2500));
  await page.screenshot({ path: `${OUT}/full-${tag}.png`, fullPage: true });
  const height = await page.evaluate(() => document.body.scrollHeight);
  console.log(tag, 'height', height);
  await page.close();
}

await browser.close();
console.log('done');
