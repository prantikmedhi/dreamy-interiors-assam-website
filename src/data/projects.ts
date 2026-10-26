import type { ImageKey } from './images'

export interface GalleryItem {
  image: ImageKey
  /** CSS object-position used to crop the source into a detail view. */
  focus: string
  caption: string
}

export interface ProjectConcept {
  slug: string
  title: string
  kicker: string
  cover: ImageKey
  coverFocus: string
  summary: string
  intent: string
  palette: string[]
  materials: string[]
  scope: string[]
  gallery: GalleryItem[]
}

// Illustrative design concepts. None of these are presented as completed client projects.
export const projects: ProjectConcept[] = [
  {
    slug: 'signature-living-rooms',
    title: 'Signature Living Rooms',
    kicker: 'Concept 01',
    cover: 'living',
    coverFocus: '50% 50%',
    summary: 'A living room composed around conversation, soft layered light and a single sculptural focal wall.',
    intent:
      'The concept treats the living room as the calm centre of the home. Seating is grouped for conversation, the TV wall becomes a quiet panelled feature, and light comes from many low sources rather than one bright ceiling.',
    palette: ['Warm ivory walls', 'Champagne upholstery', 'Smoked oak', 'Brushed gold accents'],
    materials: ['Fluted wall panelling', 'Textured paint finish', 'Woven rug', 'Stone topped side tables'],
    scope: ['Living and dining design', 'TV and feature wall joinery', 'False ceiling with cove lighting', 'Soft furnishing guidance'],
    gallery: [
      { image: 'living', focus: '50% 50%', caption: 'Conversation seating with a panelled feature wall' },
      { image: 'living', focus: '20% 60%', caption: 'Layered textures and low ambient light' },
      { image: 'after', focus: '70% 45%', caption: 'Finished corner styling' },
      { image: 'hero', focus: '40% 55%', caption: 'An open, light filled living volume' },
    ],
  },
  {
    slug: 'luxury-bedrooms',
    title: 'Luxury Bedrooms',
    kicker: 'Concept 02',
    cover: 'bedroom',
    coverFocus: '50% 45%',
    summary: 'A restful bedroom with a tall upholstered headboard wall, hidden storage and warm, dimmable light.',
    intent:
      'Everything in this concept serves rest. Storage disappears into full height wardrobes, the headboard wall carries soft texture, and lighting is planned in gentle layers for evening routines.',
    palette: ['Soft taupe', 'Ivory linen', 'Walnut veneer', 'Muted gold trims'],
    materials: ['Upholstered headboard panel', 'Veneer wardrobe shutters', 'Sheer and blackout drapery', 'Concealed profile lighting'],
    scope: ['Bedroom design', 'Custom wardrobes and storage', 'Headboard wall joinery', 'Ceiling and bedside lighting'],
    gallery: [
      { image: 'bedroom', focus: '50% 45%', caption: 'Headboard wall with layered bedside light' },
      { image: 'bedroom', focus: '15% 50%', caption: 'Soft textures and quiet detailing' },
      { image: 'bedroom', focus: '85% 50%', caption: 'Storage planned into the room' },
      { image: 'apartment3bhk', focus: '60% 50%', caption: 'A calm palette carried through the home' },
    ],
  },
  {
    slug: 'modern-modular-kitchens',
    title: 'Modern Modular Kitchens',
    kicker: 'Concept 03',
    cover: 'kitchen',
    coverFocus: '50% 50%',
    summary: 'A modular kitchen planned around an efficient work triangle, generous storage and easy to clean surfaces.',
    intent:
      'The concept starts with how the kitchen works: where groceries land, where cooking happens and where the family gathers. Tall units absorb storage so worktops stay clear and calm.',
    palette: ['Matte ivory shutters', 'Warm grey stone', 'Oak accents', 'Champagne handles'],
    materials: ['Moisture resistant carcass', 'Quartz or granite worktop', 'Soft close hardware', 'Under cabinet task lighting'],
    scope: ['Modular kitchen layout', 'Cabinetry and tall units', 'Worktop and backsplash selection', 'Kitchen electrical and lighting'],
    gallery: [
      { image: 'kitchen', focus: '50% 50%', caption: 'Clean lines and a clear work zone' },
      { image: 'kitchen', focus: '20% 50%', caption: 'Tall storage units' },
      { image: 'kitchen', focus: '80% 55%', caption: 'Worktop and hardware detailing' },
      { image: 'apartment2bhk', focus: '70% 50%', caption: 'Kitchen connected to the living area' },
    ],
  },
  {
    slug: 'complete-2bhk-interiors',
    title: 'Complete 2BHK Interiors',
    kicker: 'Concept 04',
    cover: 'apartment2bhk',
    coverFocus: '50% 50%',
    summary: 'A compact 2BHK planned to feel open, with smart storage and one continuous palette from door to balcony.',
    intent:
      'In a 2BHK every square foot matters. This concept uses multifunctional furniture, full height storage and a single light palette so the flat feels larger and more connected.',
    palette: ['Warm ivory', 'Light oak', 'Champagne beige', 'Charcoal accents'],
    materials: ['Laminate and veneer joinery', 'Mirror panels for depth', 'Slim profile lighting', 'Space saving hardware'],
    scope: ['Complete A to Z interiors', 'Modular kitchen', 'Two bedrooms with wardrobes', 'Living, dining and ceiling work'],
    gallery: [
      { image: 'apartment2bhk', focus: '50% 50%', caption: 'An open living and dining arrangement' },
      { image: 'kitchen', focus: '40% 50%', caption: 'Compact modular kitchen' },
      { image: 'bedroom', focus: '40% 50%', caption: 'Bedroom with full height storage' },
      { image: 'living', focus: '60% 50%', caption: 'Light palette to expand the space' },
    ],
  },
  {
    slug: 'elegant-3bhk-interiors',
    title: 'Elegant 3BHK Interiors',
    kicker: 'Concept 05',
    cover: 'apartment3bhk',
    coverFocus: '50% 50%',
    summary: 'A family 3BHK balancing shared living spaces with three distinct, personal bedrooms.',
    intent:
      'The concept gives the shared spaces a warm, formal character while each bedroom takes on its own personality within a common material language of wood, stone and soft gold.',
    palette: ['Ivory and taupe', 'Walnut', 'Muted gold', 'Deep charcoal accents'],
    materials: ['Wood veneer panelling', 'Stone accents', 'Textured wall finishes', 'Layered ceiling lighting'],
    scope: ['Complete A to Z interiors', 'Living, dining and puja area', 'Three bedrooms with wardrobes', 'Kitchen, ceiling and electrical work'],
    gallery: [
      { image: 'apartment3bhk', focus: '50% 50%', caption: 'Formal living with warm wood tones' },
      { image: 'bedroom', focus: '60% 40%', caption: 'Master bedroom retreat' },
      { image: 'living', focus: '30% 50%', caption: 'Seating nook with layered light' },
      { image: 'kitchen', focus: '50% 40%', caption: 'Family kitchen with tall storage' },
    ],
  },
  {
    slug: 'premium-4bhk-interiors',
    title: 'Premium 4BHK Interiors',
    kicker: 'Concept 06',
    cover: 'apartment4bhk',
    coverFocus: '50% 50%',
    summary: 'A generous 4BHK with formal and family zones, statement ceilings and fully bespoke joinery.',
    intent:
      'Larger homes need a clear rhythm. This concept separates formal entertaining from private family life, links them with a consistent material story and gives each space a defining detail.',
    palette: ['Champagne beige', 'Charcoal', 'Brushed brass', 'Ivory stone'],
    materials: ['Statement false ceilings', 'Bespoke veneer joinery', 'Natural stone surfaces', 'Designer lighting'],
    scope: ['Complete A to Z interiors', 'Formal and family living zones', 'Four bedrooms with walk in storage', 'Construction coordination and finishing'],
    gallery: [
      { image: 'apartment4bhk', focus: '50% 50%', caption: 'Formal living with a statement ceiling' },
      { image: 'hero', focus: '65% 50%', caption: 'Generous volumes and warm light' },
      { image: 'bedroom', focus: '30% 50%', caption: 'Private suite detailing' },
      { image: 'apartment3bhk', focus: '40% 60%', caption: 'A consistent material story' },
    ],
  },
]

export const findProject = (slug: string | undefined) => projects.find((p) => p.slug === slug)
