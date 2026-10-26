// Renders the Open Graph image and PNG favicons with a local Chromium based browser.
// Run manually after photography or the logo changes: `node scripts/brand-assets.mjs`.
// If public/brand/logo.webp exists, the icons are drawn from the supplied logo unchanged;
// otherwise a neutral monogram is used until the logo file is provided.
import { existsSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { chromium } from 'playwright-core'

const root = new URL('..', import.meta.url).pathname
const pub = (p) => join(root, 'public', p)
const executablePath = process.env.BROWSER_PATH ?? '/Applications/Brave Browser.app/Contents/MacOS/Brave Browser'
const dataUrl = (file, type) => `data:${type};base64,${readFileSync(file).toString('base64')}`
const font = (pkg, file) => dataUrl(join(root, 'node_modules/@fontsource-variable', pkg, 'files', file), 'font/woff2')

const fonts = `
  @font-face { font-family: Display; src: url(${font('cormorant-garamond', 'cormorant-garamond-latin-wght-normal.woff2')}); font-weight: 300 700; }
  @font-face { font-family: Sans; src: url(${font('manrope', 'manrope-latin-wght-normal.woff2')}); font-weight: 200 800; }
  * { margin: 0; box-sizing: border-box; }`

const hasLogo = existsSync(pub('brand/logo.webp'))
const logo = hasLogo ? dataUrl(pub('brand/logo.webp'), 'image/webp') : null
const hero = existsSync(pub('images/hero.webp')) ? dataUrl(pub('images/hero.webp'), 'image/webp') : null

const browser = await chromium.launch({ executablePath })
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } })

await page.setContent(`<style>${fonts}
  body { width: 1200px; height: 630px; display: grid; grid-template-columns: 1fr 470px; background: #20201E; color: #F7F4EE; font-family: Sans; }
  .img { background: #D8C5A5 ${hero ? `url(${hero}) 45% 60% / cover` : ''}; }
  .panel { padding: 56px 52px; display: flex; flex-direction: column; justify-content: space-between; }
  .mark { display: flex; align-items: center; gap: 16px; }
  .mark img { width: 84px; height: 84px; border-radius: 50%; background: #F7F4EE; }
  .name { font-family: Display; font-size: 30px; line-height: 1; }
  .sub { font-size: 11px; letter-spacing: .28em; text-transform: uppercase; color: #D8C5A5; margin-top: 8px; font-weight: 600; }
  h1 { font-family: Display; font-weight: 400; font-size: 58px; line-height: 1.02; letter-spacing: -.01em; }
  .rule { width: 56px; height: 1px; background: #B79A69; margin-bottom: 28px; }
  .foot { font-size: 13px; letter-spacing: .2em; text-transform: uppercase; color: rgba(247,244,238,.65); font-weight: 600; }
</style>
<div class="img"></div>
<div class="panel">
  <div class="mark">${logo ? `<img src="${logo}" alt="">` : ''}<div><div class="name">Dreamy Interiors</div><div class="sub">& Construction, Assam</div></div></div>
  <div><div class="rule"></div><h1>Spaces That Define the Art of Living.</h1></div>
  <div class="foot">Guwahati · Nagaon · Tezpur</div>
</div>`)
await page.screenshot({ path: pub('og-image.jpg'), type: 'jpeg', quality: 86 })

const icon = (size) =>
  logo
    ? `<style>*{margin:0}body{width:${size}px;height:${size}px;background:transparent}</style><img src="${logo}" style="width:${size}px;height:${size}px;border-radius:50%;object-fit:contain;background:#F7F4EE">`
    : `<style>*{margin:0}body{width:${size}px;height:${size}px;background:transparent}</style>${readFileSync(pub('favicon.svg'), 'utf8').replace('<svg ', `<svg width="${size}" height="${size}" `)}`

for (const [file, size] of [['favicon.png', 48], ['apple-touch-icon.png', 180]]) {
  await page.setViewportSize({ width: size, height: size })
  await page.setContent(icon(size))
  await page.screenshot({ path: pub(file), omitBackground: true })
}

await browser.close()
console.log(`brand-assets: og-image.jpg, favicon.png, apple-touch-icon.png (${hasLogo ? 'from supplied logo' : 'monogram, logo not supplied yet'})`)
