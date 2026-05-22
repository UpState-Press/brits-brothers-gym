/**
 * Compress oversized raster assets in src/assets (and optionally src/imports).
 * Converts to WebP, replaces originals when output is smaller.
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')

/** @type {{ dir: string; minBytes: number; rules: Record<string, number> }} */
const TARGETS = [
  {
    dir: path.join(root, 'src', 'assets'),
    minBytes: 500 * 1024,
    rules: {
      'b9998cd4dac15b527e6a0d9dcc4f633747e64dd4.png': 1920,
      '7f1fd8efb037ca257503c74b0292f712144d1b51.png': 1920,
      '4b3a5063dfc3a839ebe8422ee2fd3f5827333cde.png': 1000,
    },
  },
  {
    dir: path.join(root, 'src', 'imports'),
    minBytes: 200 * 1024,
    rules: {
      'banner-10.jpg': 1920,
      'banner-12.jpg': 1920,
      'boxing_page_banner.jpg': 1600,
    },
  },
]

const WEBP_QUALITY = 82

async function optimizeFile(filePath, maxWidth) {
  const ext = path.extname(filePath).toLowerCase()
  const base = filePath.slice(0, -ext.length)
  const outPath = `${base}.webp`

  const image = sharp(filePath)
  const meta = await image.metadata()
  const width = meta.width ?? maxWidth
  const shouldResize = width > maxWidth

  let pipeline = sharp(filePath)
  if (shouldResize) {
    pipeline = pipeline.resize({
      width: maxWidth,
      withoutEnlargement: true,
      fit: 'inside',
    })
  }

  await pipeline
    .webp({ quality: WEBP_QUALITY, effort: 4 })
    .toFile(outPath)

  const before = fs.statSync(filePath).size
  const after = fs.statSync(outPath).size

  if (after < before) {
    fs.unlinkSync(filePath)
    return { outPath, before, after, resized: shouldResize }
  }

  fs.unlinkSync(outPath)
  return { outPath: filePath, before, after: before, resized: false, skipped: true }
}

async function runTarget({ dir, minBytes, rules }) {
  if (!fs.existsSync(dir)) return []

  const results = []
  const files = fs.readdirSync(dir).filter((f) => /\.(png|jpe?g)$/i.test(f))

  for (const name of files) {
    const filePath = path.join(dir, name)
    const size = fs.statSync(filePath).size
    const maxWidth = rules[name] ?? null

    if (!maxWidth && size < minBytes) continue

    const resolvedMax =
      maxWidth ??
      (size > 1024 * 1024 ? 1920 : size > 700 * 1024 ? 1400 : 1200)

    const result = await optimizeFile(filePath, resolvedMax)
    results.push({ name, dir, ...result })
  }

  return results
}

async function main() {
  const all = []
  for (const target of TARGETS) {
    all.push(...(await runTarget(target)))
  }

  for (const r of all) {
    if (r.skipped) {
      console.log(`skip  ${r.name} (webp not smaller)`)
      continue
    }
    const pct = Math.round((1 - r.after / r.before) * 100)
    console.log(
      `${r.resized ? 'resize' : 'webp  '} ${r.name}: ${(r.before / 1024).toFixed(0)} KB -> ${(r.after / 1024).toFixed(0)} KB (-${pct}%)`,
    )
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
