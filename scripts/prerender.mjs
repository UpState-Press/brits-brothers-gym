/**
 * Static prerender after `vite build`: Puppeteer visits each route against the SPA
 * shell so React Router + react-helmet-async run in current Chromium (replaces
 * unmaintained react-snap + its legacy Chromium, which could not parse modern bundles).
 *
 * Routes other than `/` are processed before `/` so `dist/index.html` stays the
 * generic shell while other URLs are rendered.
 */
import fs from 'node:fs'
import path from 'node:path'
import http from 'node:http'
import { fileURLToPath } from 'node:url'
import puppeteer from 'puppeteer-core'
import chromium from '@sparticuz/chromium'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')
const dist = path.join(root, 'dist')
const routesPath = path.join(root, 'prerender-routes.json')

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.mjs': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.webp': 'image/webp',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.map': 'application/json',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
}

function routeToHtmlPath(route) {
  if (route === '/') return path.join(dist, 'index.html')
  return path.join(dist, route.replace(/^\//, ''), 'index.html')
}

function sortRoutesForShellSafety(routes) {
  return [...routes].sort((a, b) => {
    const aRoot = a === '/' ? 1 : 0
    const bRoot = b === '/' ? 1 : 0
    return aRoot - bRoot
  })
}

function sendFile(res, filePath, requestPathForCache) {
  const ext = path.extname(filePath).toLowerCase()
  const type = MIME[ext] || 'application/octet-stream'
  if (requestPathForCache.startsWith('/assets/')) {
    res.setHeader('Cache-Control', 'public, max-age=31536000, immutable')
  }
  res.writeHead(200, { 'Content-Type': type })
  fs.createReadStream(filePath).pipe(res)
}

const SANDBOX_ARGS = [
  '--no-sandbox',
  '--disable-setuid-sandbox',
  '--disable-dev-shm-usage',
  '--disable-gpu',
]

function isVercelBuild() {
  return process.env.VERCEL === '1'
}

async function resolveLocalExecutablePath() {
  if (process.env.PUPPETEER_EXECUTABLE_PATH) {
    const custom = process.env.PUPPETEER_EXECUTABLE_PATH
    if (!fs.existsSync(custom)) {
      throw new Error(`PUPPETEER_EXECUTABLE_PATH does not exist: ${custom}`)
    }
    return custom
  }

  try {
    const { computeSystemExecutablePath } = await import('@puppeteer/browsers')
    return computeSystemExecutablePath({
      browser: 'chrome',
      channel: 'stable',
    })
  } catch {
    // Fall through to well-known install locations.
  }

  const candidates = [
    process.platform === 'win32' &&
      'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    process.platform === 'win32' &&
      'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
    process.platform === 'darwin' &&
      '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    '/usr/bin/google-chrome-stable',
    '/usr/bin/google-chrome',
    '/usr/bin/chromium-browser',
    '/usr/bin/chromium',
  ].filter(Boolean)

  for (const candidate of candidates) {
    if (fs.existsSync(candidate)) return candidate
  }

  throw new Error(
    'Could not find a local Chrome/Chromium binary for prerender. ' +
      'Install Google Chrome or set PUPPETEER_EXECUTABLE_PATH.',
  )
}

async function launchBrowser() {
  if (isVercelBuild()) {
    chromium.setGraphicsMode = false
    return puppeteer.launch({
      args: [...chromium.args, ...SANDBOX_ARGS],
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath(),
      headless: chromium.headless,
    })
  }

  return puppeteer.launch({
    headless: true,
    executablePath: await resolveLocalExecutablePath(),
    args: SANDBOX_ARGS,
  })
}

function createSpaStaticServer() {
  return http.createServer((req, res) => {
    try {
      const url = new URL(req.url || '/', 'http://127.0.0.1')
      const pathname = decodeURIComponent(url.pathname) || '/'

      if (pathname.includes('..')) {
        res.writeHead(400)
        res.end('Bad path')
        return
      }

      if (pathname === '/') {
        sendFile(res, path.join(dist, 'index.html'), pathname)
        return
      }

      const rel = pathname.replace(/^\//, '').replace(/\/$/, '')
      const abs = path.join(dist, rel)
      if (!abs.startsWith(dist)) {
        res.writeHead(400)
        res.end('Bad path')
        return
      }

      if (fs.existsSync(abs) && fs.statSync(abs).isFile()) {
        sendFile(res, abs, pathname)
        return
      }

      sendFile(res, path.join(dist, 'index.html'), pathname)
    } catch {
      res.writeHead(500)
      res.end('Error')
    }
  })
}

async function main() {
  if (!fs.existsSync(dist)) {
    throw new Error(`Missing ${dist}. Run vite build first.`)
  }

  const routes = sortRoutesForShellSafety(
    JSON.parse(fs.readFileSync(routesPath, 'utf8')),
  )

  const server = createSpaStaticServer()
  const PORT = Number(process.env.PRERENDER_PORT || 14711)

  await new Promise((resolve, reject) => {
    server.listen(PORT, '127.0.0.1', () => resolve())
    server.on('error', reject)
  })

  const browser = await launchBrowser()

  try {
    const page = await browser.newPage()

    const navigationWaitUntil =
      process.env.PRERENDER_WAIT_UNTIL || 'load'
    const timeout = Number(process.env.PRERENDER_TIMEOUT_MS || 180000)

    for (const route of routes) {
      page.removeAllListeners('pageerror')
      page.on('pageerror', (err) => {
        console.error('[prerender pageerror]', route, err)
      })
      const url = `http://127.0.0.1:${PORT}${route === '/' ? '/' : route}`
      await page.goto(url, { waitUntil: navigationWaitUntil, timeout })
      await page.waitForFunction(
        () => {
          const root = document.getElementById('root')
          if (!root || root.children.length === 0) return false
          return document.querySelector('meta[property="og:title"]') != null
        },
        { timeout },
      )
      const html = await page.content()
      const outFile = routeToHtmlPath(route)
      fs.mkdirSync(path.dirname(outFile), { recursive: true })
      fs.writeFileSync(outFile, html, 'utf8')
      console.log('prerender', route, '->', path.relative(root, outFile))
    }
  } finally {
    await browser.close()
    await new Promise((resolve, reject) => {
      server.close((err) => (err ? reject(err) : resolve()))
    })
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
