import manifest from './generated/image-manifest.json'

// Central photography registry. Every visual on the site is drawn from here, so swapping in
// authorised project photography later is a matter of replacing the file at the same path
// (or editing the path below) and re-running the build. All current images are illustrative.
export type ImageKey =
  | 'hero'
  | 'living'
  | 'bedroom'
  | 'kitchen'
  | 'apartment2bhk'
  | 'apartment3bhk'
  | 'apartment4bhk'
  | 'before'
  | 'after'

export interface ImageAsset {
  src: string
  alt: string
  width: number
  height: number
  available: boolean
  variants: { width: number; src: string }[]
}

const registry: Record<ImageKey, { path: string; alt: string }> = {
  hero: { path: 'images/hero.webp', alt: 'Illustrative luxury apartment living space in warm ivory and champagne tones' },
  living: { path: 'images/living.webp', alt: 'Illustrative living room with layered lighting and tailored seating' },
  bedroom: { path: 'images/bedroom.webp', alt: 'Illustrative bedroom with upholstered headboard and soft ambient light' },
  kitchen: { path: 'images/kitchen.webp', alt: 'Illustrative modular kitchen with refined cabinetry and stone surfaces' },
  apartment2bhk: { path: 'images/apartment-2bhk.webp', alt: 'Illustrative 2BHK apartment interior with an open, light filled plan' },
  apartment3bhk: { path: 'images/apartment-3bhk.webp', alt: 'Illustrative 3BHK apartment interior with warm wood and textured walls' },
  apartment4bhk: { path: 'images/apartment-4bhk.webp', alt: 'Illustrative 4BHK apartment interior with generous formal living area' },
  before: { path: 'images/before.webp', alt: 'Illustrative empty apartment room before interior work' },
  after: { path: 'images/after.webp', alt: 'Illustrative finished interior of the same room after design and execution' },
}

type ManifestEntry = { available: boolean; width?: number; height?: number; variants?: { width: number; src: string }[] }
const m = manifest as Record<string, ManifestEntry>

function resolve(path: string, alt: string): ImageAsset {
  const entry = m[path] ?? { available: false }
  return {
    src: `/${path}`,
    alt,
    width: entry.width ?? 1600,
    height: entry.height ?? 1067,
    available: entry.available,
    variants: entry.variants ?? [],
  }
}

export const images = Object.fromEntries(
  Object.entries(registry).map(([key, { path, alt }]) => [key, resolve(path, alt)]),
) as Record<ImageKey, ImageAsset>

export const logo = resolve('brand/logo.webp', 'Dreamy Interiors & Construction, Assam logo')
