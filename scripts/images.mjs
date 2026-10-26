// Builds src/data/generated/image-manifest.json from whatever photography is present in
// public/images. Missing files are recorded as unavailable so the site renders a tonal
// placeholder instead of a broken request.
import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from 'node:fs'
import { execFileSync } from 'node:child_process'
import { dirname, join } from 'node:path'

const root = new URL('..', import.meta.url).pathname
const outFile = join(root, 'src/data/generated/image-manifest.json')
const WIDTHS = [640, 960]

const ASSETS = [
  'images/hero.webp',
  'images/living.webp',
  'images/bedroom.webp',
  'images/kitchen.webp',
  'images/apartment-2bhk.webp',
  'images/apartment-3bhk.webp',
  'images/apartment-4bhk.webp',
  'images/before.webp',
  'images/after.webp',
  'brand/logo.webp',
]

function dimensions(buf) {
  if (buf.toString('ascii', 0, 4) === 'RIFF' && buf.toString('ascii', 8, 12) === 'WEBP') {
    const chunk = buf.toString('ascii', 12, 16)
    if (chunk === 'VP8 ') return { width: buf.readUInt16LE(26) & 0x3fff, height: buf.readUInt16LE(28) & 0x3fff }
    if (chunk === 'VP8L') {
      const b = buf.readUInt32LE(21)
      return { width: (b & 0x3fff) + 1, height: ((b >> 14) & 0x3fff) + 1 }
    }
    if (chunk === 'VP8X') return { width: buf.readUIntLE(24, 3) + 1, height: buf.readUIntLE(27, 3) + 1 }
  }
  if (buf.readUInt32BE(0) === 0x89504e47) return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) }
  if (buf[0] === 0xff && buf[1] === 0xd8) {
    let i = 2
    while (i < buf.length) {
      const marker = buf[i + 1]
      const len = buf.readUInt16BE(i + 2)
      if (marker >= 0xc0 && marker <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(marker)) {
        return { width: buf.readUInt16BE(i + 7), height: buf.readUInt16BE(i + 5) }
      }
      i += 2 + len
    }
  }
  return null
}

let hasCwebp = true
try {
  execFileSync('cwebp', ['-version'], { stdio: 'ignore' })
} catch {
  hasCwebp = false
}

mkdirSync(join(root, 'src/data/generated'), { recursive: true })

const manifest = {}
for (const rel of ASSETS) {
  const file = join(root, 'public', rel)
  const key = rel.replace(/^.*\//, '').replace(/\.\w+$/, '')
  if (!existsSync(file)) {
    manifest[rel] = { available: false }
    continue
  }
  const dims = dimensions(readFileSync(file))
  if (!dims) {
    console.warn(`images: could not read dimensions of ${rel}, treating as unavailable`)
    manifest[rel] = { available: false }
    continue
  }
  // Responsive variants live beside the source as <name>-<width>.webp. Existing ones are
  // reused; if none exist for a large source and cwebp is installed, they are generated.
  const siblings = () =>
    readdirSync(dirname(file))
      .map((f) => f.match(new RegExp(`^${key}-(\\d+)\\.webp$`)))
      .filter(Boolean)
      .map((m) => ({ width: Number(m[1]), src: `/${dirname(rel)}/${m[0]}` }))
      .filter((v) => v.width < dims.width)
      .sort((a, b) => a.width - b.width)
  let variants = rel.startsWith('images/') ? siblings() : []
  if (rel.startsWith('images/') && variants.length === 0 && hasCwebp && dims.width > 1100) {
    for (const w of WIDTHS.filter((w) => w < dims.width)) {
      execFileSync('cwebp', ['-quiet', '-q', '78', '-resize', String(w), '0', file, '-o', join(dirname(file), `${key}-${w}.webp`)])
    }
    variants = siblings()
  }
  manifest[rel] = { available: true, ...dims, variants }
}

writeFileSync(outFile, JSON.stringify(manifest, null, 2) + '\n')
const present = Object.values(manifest).filter((m) => m.available).length
console.log(`images: ${present}/${ASSETS.length} assets available, cwebp ${hasCwebp ? 'on' : 'off'}`)
