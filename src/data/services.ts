import type { ImageKey } from './images'

export interface Service {
  id: string
  number: string
  title: string
  summary: string
  detail: string
  capabilities: string[]
  image: ImageKey
}

// Six service lines. Custom furniture and wardrobes, electrical and finishing work, and
// residential construction are delivered within these as detail capabilities.
export const services: Service[] = [
  {
    id: 'complete-interiors',
    number: '01',
    title: 'Complete Home Interiors',
    summary: 'A to Z interior design solutions for 2BHK, 3BHK and 4BHK flats, planned and delivered as one cohesive home.',
    detail:
      'From the first measurement to the final styling, every room is designed together so the whole home reads as one considered space. Layouts, finishes, storage and lighting are resolved in a single plan before work begins.',
    capabilities: ['Complete A to Z interior design', '2BHK, 3BHK and 4BHK flat interiors', 'Room by room planning in one cohesive scheme'],
    image: 'apartment3bhk',
  },
  {
    id: 'luxury-living',
    number: '02',
    title: 'Luxury Living Spaces',
    summary: 'Welcoming living and dining rooms with tailored furniture, layered textures and balanced light.',
    detail:
      'Living rooms are composed for conversation and hosting. Wall treatments, soft furnishings and made to measure furniture are selected to work together, with TV units, crockery units and feature joinery built to the exact dimensions of your home.',
    capabilities: ['Living and dining room design', 'Custom furniture, TV and crockery units', 'Wall panelling, textures and soft furnishing guidance'],
    image: 'living',
  },
  {
    id: 'bedroom-design',
    number: '03',
    title: 'Bedroom Design',
    summary: 'Calm bedrooms with made to measure wardrobes, quiet storage and soft, layered light.',
    detail:
      'Master, guest and children’s bedrooms are planned for rest. Wardrobes, beds and study tables are designed to fit your rooms precisely, with internal fittings planned around what you actually store.',
    capabilities: ['Master, guest and children’s bedrooms', 'Custom wardrobes and storage', 'Finishes, laminates, veneers and hardware selection'],
    image: 'bedroom',
  },
  {
    id: 'modular-kitchens',
    number: '04',
    title: 'Modular Kitchens',
    summary: 'Efficient, beautifully finished kitchens planned around how your family cooks, stores and gathers.',
    detail:
      'Work zones, storage, appliance placement and ventilation are planned first, then expressed in durable cabinetry, worktops and hardware chosen for daily use in Assam homes.',
    capabilities: ['Modular kitchen layout and cabinetry', 'Worktops, hardware and storage systems', 'Task and ambient kitchen lighting'],
    image: 'kitchen',
  },
  {
    id: 'ceiling-lighting',
    number: '05',
    title: 'Ceiling & Lighting Design',
    summary: 'Ceiling design and lighting plans that shape mood, define zones and make every room feel finished.',
    detail:
      'Ceiling profiles are drawn alongside the lighting plan, combining cove, accent and task lighting so each space has the right light for every hour of the day.',
    capabilities: ['False ceiling design and installation', 'Layered lighting plans', 'Cove, accent and feature lighting'],
    image: 'apartment4bhk',
  },
  {
    id: 'renovation-execution',
    number: '06',
    title: 'Renovation & Interior Execution',
    summary: 'Renovations, electrical and finishing work, and residential construction execution under one coordinated team.',
    detail:
      'Whether refreshing an existing flat or executing a residential build, civil, electrical, painting and finishing work is sequenced and supervised so design intent is carried through to the last detail.',
    capabilities: ['Home renovations and remodelling', 'Electrical work and finishing', 'Residential construction and site execution'],
    image: 'after',
  },
]
