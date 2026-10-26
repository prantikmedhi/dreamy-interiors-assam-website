// End to end QA against the production build in dist/.
// Serves dist like Vercel (clean URLs, 404.html with a 404 status), then drives a local
// Chromium based browser (Brave by default, override with BROWSER_PATH).
// Writes screenshots and qa/report.json. Exits non-zero if any check fails.
import { createServer } from 'node:http'
import { existsSync, mkdirSync, readFileSync, statSync, writeFileSync } from 'node:fs'
import { extname, join } from 'node:path'
import { chromium } from 'playwright-core'

const root = new URL('..', import.meta.url).pathname
const dist = join(root, 'dist')
const out = join(root, 'qa')
mkdirSync(join(out, 'screens'), { recursive: true })

const types = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.webp': 'image/webp', '.jpg': 'image/jpeg', '.png': 'image/png', '.svg': 'image/svg+xml', '.woff2': 'font/woff2', '.xml': 'application/xml', '.txt': 'text/plain' }
const server = createServer((req, res) => {
  const path = decodeURIComponent(new URL(req.url, 'http://x').pathname)
  const candidates = [path, `${path}/index.html`, `${path}.html`].map((p) => join(dist, p))
  const file = candidates.find((f) => f.startsWith(dist) && existsSync(f) && statSync(f).isFile())
  if (file) {
    res.writeHead(200, { 'content-type': types[extname(file)] ?? 'application/octet-stream' })
    return res.end(readFileSync(file))
  }
  res.writeHead(404, { 'content-type': types['.html'] })
  res.end(readFileSync(join(dist, '404.html')))
})
await new Promise((r) => server.listen(4319, r))
const base = 'http://localhost:4319'

const ssr = readFileSync(join(dist, 'sitemap.xml'), 'utf8')
const routes = [...ssr.matchAll(/<loc>https:\/\/[^/]+(\/[^<]*)<\/loc>/g)].map((m) => m[1])
const projectRoutes = routes.filter((r) => r.startsWith('/projects/'))

const results = []
const check = (name, ok, detail = '') => {
  results.push({ name, ok: !!ok, detail })
  if (!ok) console.log(`FAIL ${name} ${detail}`)
}

// 1. Raw pre-rendered HTML (what curl and crawlers see)
for (const r of routes) {
  const res = await fetch(base + r)
  const html = await res.text()
  const title = html.match(/<title>([^<]*)<\/title>/)?.[1] ?? ''
  const h1 = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/)?.[1]?.replace(/<[^>]+>/g, '') ?? ''
  check(`html ${r} status 200`, res.status === 200, String(res.status))
  check(`html ${r} title + h1 + canonical + og + ld`, title && h1 && html.includes('rel="canonical"') && html.includes('og:image') && html.includes('application/ld+json'), `${title} | ${h1}`)
}
const nf = await fetch(base + '/no-such-page')
const nfHtml = await nf.text()
check('html unknown route 404 + noindex', nf.status === 404 && nfHtml.includes('noindex'), String(nf.status))
check('six project routes', projectRoutes.length === 6, projectRoutes.join(','))
for (const f of ['/robots.txt', '/sitemap.xml', '/llms.txt', '/og-image.jpg', '/favicon.svg', '/favicon.png', '/apple-touch-icon.png']) {
  check(`asset ${f}`, (await fetch(base + f)).status === 200)
}

// 2. Browser checks
const browser = await chromium.launch({ executablePath: process.env.BROWSER_PATH ?? '/Applications/Brave Browser.app/Contents/MacOS/Brave Browser' })
const widths = [320, 390, 768, 1440]
const internalLinks = new Set()
const screens = []

async function openPage(width, path, opts = {}) {
  const ctx = await browser.newContext({ viewport: { width, height: width < 768 ? 844 : 900 }, deviceScaleFactor: 1, ...opts })
  const page = await ctx.newPage()
  const errors = []
  page.on('pageerror', (e) => errors.push(`pageerror: ${e.message}`))
  // Resource failures are reported by the response handler below with their URL.
  page.on('console', (m) => m.type() === 'error' && !m.text().startsWith('Failed to load resource') && errors.push(`console: ${m.text()}`))
  page.on('response', (r) => r.url().startsWith(base) && r.status() >= 400 && !r.url().endsWith(path) && errors.push(`http ${r.status()} ${r.url()}`))
  await page.goto(base + path, { waitUntil: 'networkidle' })
  return { ctx, page, errors }
}

async function scrollThrough(page) {
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 500) {
      window.scrollTo({ top: y, behavior: 'instant' })
      await new Promise((r) => setTimeout(r, 60))
    }
    window.scrollTo({ top: 0, behavior: 'instant' })
  })
  await page.waitForLoadState('networkidle')
  await page.waitForTimeout(900)
}

for (const width of widths) {
  for (const path of [...routes, '/missing-page']) {
    const { ctx, page, errors } = await openPage(width, path)
    await scrollThrough(page)
    const info = await page.evaluate(() => {
      const vw = document.documentElement.clientWidth
      const offenders = [...document.querySelectorAll('body *')]
        .filter((el) => {
          const r = el.getBoundingClientRect()
          if (!r.width || getComputedStyle(el).position === 'fixed') return false
          for (let p = el.parentElement; p; p = p.parentElement) {
            const s = getComputedStyle(p)
            if (s.overflowX !== 'visible' || p.tagName === 'DIALOG') return false
          }
          return r.right > vw + 1 || r.left < -1
        })
        .slice(0, 5)
        .map((el) => `${el.tagName}.${String(el.className).slice(0, 60)}`)
      const text = document.body.innerText
      const imgs = [...document.images].filter((i) => !i.closest('dialog'))
      return {
        overflow: document.documentElement.scrollWidth - vw,
        offenders,
        dashes: (text.match(/[–—]/g) ?? []).length,
        brokenImages: imgs.filter((i) => i.complete && i.naturalWidth === 0).map((i) => i.src),
        multilineButtons: [...document.querySelectorAll('.btn')]
          .filter((b) => b.offsetParent && b.getBoundingClientRect().height > 56)
          .map((b) => b.textContent.trim()),
        links: [...document.querySelectorAll('a[href^="/"]')].map((a) => a.getAttribute('href')),
        title: document.title,
      }
    })
    info.links.forEach((l) => internalLinks.add(l.split('#')[0] || '/'))
    const tag = `${width} ${path}`
    check(`no horizontal overflow ${tag}`, info.overflow <= 0 && info.offenders.length === 0, `${info.overflow}px ${info.offenders.join(' ')}`)
    check(`no page/console/http errors ${tag}`, errors.length === 0, errors.join(' | '))
    check(`no en/em dashes in visible copy ${tag}`, info.dashes === 0, String(info.dashes))
    check(`no broken images ${tag}`, info.brokenImages.length === 0, info.brokenImages.join(','))
    check(`CTAs single line ${tag}`, info.multilineButtons.length === 0, info.multilineButtons.join(','))

    if (path === '/') {
      const hero = await page.evaluate(() => {
        const vh = window.innerHeight
        const btns = [...document.querySelectorAll('main section:first-of-type .btn')]
        return { h1: document.querySelector('h1').getBoundingClientRect().bottom <= vh, ctas: btns.length === 2 && btns.every((b) => b.getBoundingClientRect().bottom <= vh) }
      })
      check(`hero h1 + both CTAs in first viewport ${width}`, hero.h1 && hero.ctas, JSON.stringify(hero))
    }
    if (width === 1440 && path === '/') {
      const nav = await page.evaluate(() => {
        const h = document.querySelector('header > div').getBoundingClientRect().height
        const tops = [...document.querySelectorAll('nav[aria-label="Primary"] > *')].map((a) => Math.round(a.getBoundingClientRect().top + a.getBoundingClientRect().height / 2))
        return { h, oneLine: new Set(tops).size === 1 }
      })
      check('desktop nav under 80px and one line', nav.h < 80 && nav.oneLine, JSON.stringify(nav))
    }
    const shoot = width === 1440 || width === 390 || path === '/'
    if (shoot) {
      const name = `${width}${path === '/' ? '-home' : path.replace(/\//g, '-')}.png`
      await page.screenshot({ path: join(out, 'screens', name), fullPage: true })
      screens.push(`qa/screens/${name}`)
    }
    await ctx.close()
  }
}

// 3. Internal links all resolve
for (const l of internalLinks) {
  const res = await fetch(base + l)
  check(`internal link ${l}`, res.status === 200, String(res.status))
}

// 4. Mobile menu
{
  const { ctx, page, errors } = await openPage(390, '/')
  await page.getByRole('button', { name: 'Open menu' }).click()
  const open = await page.locator('dialog[aria-label="Site menu"]').evaluate((d) => d.open)
  await page.screenshot({ path: join(out, 'screens', '390-mobile-menu-open.png') })
  screens.push('qa/screens/390-mobile-menu-open.png')
  await page.keyboard.press('Escape')
  const closedByEsc = !(await page.locator('dialog[aria-label="Site menu"]').evaluate((d) => d.open))
  await page.getByRole('button', { name: 'Open menu' }).click()
  await page.locator('dialog[aria-label="Site menu"]').getByRole('link', { name: /Services/ }).click()
  await page.waitForURL('**/services')
  const closedOnNav = !(await page.locator('dialog[aria-label="Site menu"]').evaluate((d) => d.open))
  await page.waitForFunction(() => /A to Z/.test(document.querySelector('h1')?.textContent ?? ''))
  const h1 = await page.locator('h1').textContent()
  check('mobile menu opens, Esc closes, link navigates and closes', open && closedByEsc && closedOnNav && /A to Z/.test(h1), `${open} ${closedByEsc} ${closedOnNav} ${h1}`)
  check('mobile menu no errors', errors.length === 0, errors.join(' | '))
  await ctx.close()
}

// 5. Before/after slider: keyboard and pointer
{
  const { ctx, page } = await openPage(1440, '/')
  const slider = page.getByRole('slider')
  await slider.scrollIntoViewIfNeeded()
  await slider.focus()
  for (let i = 0; i < 10; i++) await page.keyboard.press('ArrowLeft')
  const afterKeys = await slider.inputValue()
  const frame = page.locator('div.cursor-ew-resize')
  const box = await frame.boundingBox()
  await page.mouse.move(box.x + box.width * 0.8, box.y + box.height / 2)
  await page.mouse.down()
  await page.mouse.move(box.x + box.width * 0.85, box.y + box.height / 2)
  await page.mouse.up()
  const afterDrag = Number(await slider.inputValue())
  const clip = await frame.locator('div[style*="clip-path"]').getAttribute('style')
  check('slider keyboard moves 50 to 40', afterKeys === '40', afterKeys)
  check('slider pointer drag updates value and clip', afterDrag >= 83 && afterDrag <= 87 && clip.includes(`${100 - afterDrag}%`), `${afterDrag} ${clip}`)
  await frame.screenshot({ path: join(out, 'screens', '1440-before-after-dragged.png') })
  screens.push('qa/screens/1440-before-after-dragged.png')
  await ctx.close()
}

// 6. Service headings and consultation form validation and WhatsApp hand off
const serviceTitles = ['Complete Home Interiors', 'Luxury Living Spaces', 'Bedroom Design', 'Modular Kitchens', 'Ceiling & Lighting Design', 'Renovation & Interior Execution']
{
  const { ctx, page } = await openPage(1440, '/services')
  const headings = (await page.locator('main section[id] h2').allTextContents()).map((t) => t.trim())
  check('services page shows the six service headings in order', JSON.stringify(headings) === JSON.stringify(serviceTitles), headings.join(' | '))
  await ctx.close()
}
{
  const { ctx, page, errors } = await openPage(390, '/contact')
  await page.evaluate(() => {
    window.__opened = []
    window.open = (url) => (window.__opened.push(url), null)
  })
  const form = page.locator('#consultation form')
  await form.getByRole('button', { name: 'Request a Consultation', exact: true }).click()
  const invalid = await form.locator('[aria-invalid="true"]').count()
  const alert = await form.getByRole('alert').textContent()
  const focused = await page.evaluate(() => document.activeElement?.getAttribute('autocomplete'))
  check('form blocks empty submit with errors and focuses first field', invalid >= 5 && /highlighted/.test(alert) && focused === 'name', `${invalid} ${alert} ${focused}`)
  await page.screenshot({ path: join(out, 'screens', '390-form-errors.png'), fullPage: false })
  screens.push('qa/screens/390-form-errors.png')

  await form.getByLabel('Phone').fill('12345')
  await form.getByRole('button', { name: 'Request a Consultation', exact: true }).click()
  check('form rejects invalid phone', /valid 10 digit/.test(await form.textContent()))

  const serviceOptions = (await form.locator('fieldset').nth(1).locator('label').allTextContents()).map((t) => t.trim())
  check('form service options match the six service lines', JSON.stringify(serviceOptions) === JSON.stringify([...serviceTitles, 'Not sure yet']), serviceOptions.join(' | '))

  await form.getByLabel('Full Name').fill('Test Homeowner')
  await form.getByLabel('Phone').fill('98765 43210')
  await form.getByLabel('Email').fill('owner@example.com')
  await form.getByLabel('Project Location').fill('Guwahati')
  await form.locator('label', { hasText: '3BHK' }).click()
  await form.locator('label', { hasText: 'Modular Kitchens' }).click()
  await form.locator('label', { hasText: 'Ceiling & Lighting Design' }).click()
  await form.getByLabel('Estimated Budget').selectOption({ index: 2 })
  await form.getByLabel(/Project Description/).fill('Full interiors for a new flat.')
  const urlBefore = page.url()
  await form.getByRole('button', { name: 'Request a Consultation', exact: true }).click()
  const status = page.locator('#consultation [role="status"]')
  await status.waitFor()
  const statusText = await status.textContent()
  const opened = await page.evaluate(() => window.__opened)
  const manual = await status.getByRole('link', { name: /Continue on WhatsApp/ }).getAttribute('href')
  const msg = decodeURIComponent((opened[0] ?? '').split('?text=')[1] ?? '')
  check('form opens WhatsApp with structured message', opened.length === 1 && opened[0].startsWith('https://wa.me/919101803363?text=') && /Name: Test Homeowner/.test(msg) && /Property type: 3BHK/.test(msg) && /Required services: Modular Kitchens, Ceiling & Lighting Design/.test(msg), msg.replace(/\n/g, ' / '))
  check('confirmation is honest and offers manual fallback', /not been sent yet/.test(statusText) && /tap Send/.test(statusText) && manual === opened[0], statusText.slice(0, 120))
  check('form data never enters page URL or storage', page.url() === urlBefore && !page.url().includes('Homeowner') && (await page.evaluate(() => localStorage.length + sessionStorage.length)) === 0)
  check('form flow no errors', errors.length === 0, errors.join(' | '))
  await status.screenshot({ path: join(out, 'screens', '390-form-confirmation.png') })
  screens.push('qa/screens/390-form-confirmation.png')
  await ctx.close()
}

// 7. Project gallery lightbox on every concept route
for (const r of projectRoutes) {
  const { ctx, page, errors } = await openPage(1440, r)
  await page.getByRole('button', { name: /Open image 1 of/ }).click()
  const dialog = page.locator('dialog[aria-label$="gallery"]')
  const opened = await dialog.evaluate((d) => d.open)
  await page.keyboard.press('ArrowRight')
  const counter = await dialog.locator('span').first().textContent()
  if (r === projectRoutes[0]) {
    await page.screenshot({ path: join(out, 'screens', '1440-gallery-lightbox.png') })
    screens.push('qa/screens/1440-gallery-lightbox.png')
  }
  await page.keyboard.press('Escape')
  const closed = !(await dialog.evaluate((d) => d.open))
  check(`gallery lightbox ${r}`, opened && /2 \/ 4/.test(counter) && closed && errors.length === 0, `${opened} ${counter} ${closed} ${errors.join('|')}`)
  await ctx.close()
}

// 8. Reduced motion shows content without animation
{
  const { ctx, page } = await openPage(1440, '/', { reducedMotion: 'reduce' })
  const hidden = await page.evaluate(() => [...document.querySelectorAll('.reveal')].filter((el) => getComputedStyle(el).opacity !== '1').length)
  check('prefers-reduced-motion: all reveal content visible', hidden === 0, String(hidden))
  await ctx.close()
}

// 9. Client side navigation updates head
{
  const { ctx, page } = await openPage(1440, '/')
  await page.locator('nav[aria-label="Primary"]').getByRole('link', { name: 'About' }).click()
  await page.waitForURL('**/about')
  await page.waitForFunction(() => document.title.startsWith('About'), null, { timeout: 3000 }).catch(() => {})
  const t = await page.title()
  const canonical = await page.locator('link[rel="canonical"]').getAttribute('href')
  check('client navigation updates title and canonical', /About the Studio/.test(t) && canonical.endsWith('/about'), `${t} ${canonical}`)
  await ctx.close()
}

await browser.close()
server.close()

const failed = results.filter((r) => !r.ok)
writeFileSync(join(out, 'report.json'), JSON.stringify({ passed: results.length - failed.length, failed: failed.length, results, screens }, null, 2))
console.log(`\nQA: ${results.length - failed.length}/${results.length} checks passed`)
console.log(`Screenshots (${screens.length}):\n  ${screens.join('\n  ')}`)
process.exit(failed.length ? 1 : 0)
