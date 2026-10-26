import type { ImageKey } from './images'

export const highlights = [
  {
    title: 'Thoughtfully Designed Spaces',
    text: 'Layouts, light and materials planned around how you live, so every room feels natural from the first morning.',
  },
  {
    title: 'Detail-Driven Execution',
    text: 'Joinery, finishes and fittings are supervised on site so the finished home matches the design you approved.',
  },
  {
    title: 'Personalized Interior Solutions',
    text: 'No catalogue templates. Each home is shaped around your family, your routines and your taste.',
  },
] as const

export const process = [
  {
    title: 'Discovery & Consultation',
    text: 'We listen to how you live, visit or review the space, and understand your priorities, preferences and budget.',
  },
  {
    title: 'Space Planning & Design',
    text: 'Furniture layouts, storage, ceilings and lighting are planned, then developed into a clear design direction for your approval.',
  },
  {
    title: 'Material Selection',
    text: 'Finishes, laminates, stone, fabrics, hardware and fixtures are chosen together so the palette feels cohesive and practical.',
  },
  {
    title: 'Execution & Coordination',
    text: 'Carpentry, electrical, ceiling, painting and finishing work are sequenced and supervised by one coordinated team.',
  },
  {
    title: 'Final Handover',
    text: 'The home is cleaned, checked room by room and handed over ready to live in, with care guidance for every finish.',
  },
] as const

export const benefits = [
  { title: 'Designed around your family', text: 'Every plan begins with your routines, storage needs and the way you like to host.' },
  { title: 'One team, A to Z', text: 'Design, materials and site execution handled together, so nothing is lost between hand offs.' },
  { title: 'Flat interior specialists', text: 'Focused experience with 2BHK, 3BHK and 4BHK apartments and the constraints they bring.' },
  { title: 'Considered materials', text: 'Finishes chosen for beauty and for daily life in Assam’s climate, explained clearly before you commit.' },
  { title: 'Clear communication', text: 'Direct contact with the people designing your home, from consultation to handover.' },
  { title: 'Craft that lasts', text: 'Careful detailing and supervised workmanship, so the home looks as good in years as on day one.' },
] as const

// Manually curated inspiration tiles. These are illustrative images, not posts pulled from
// the studio's Instagram account. Replace with authorised photography when available.
export const instagramTiles: { image: ImageKey; focus: string; label: string }[] = [
  { image: 'living', focus: '40% 50%', label: 'Living room mood' },
  { image: 'kitchen', focus: '60% 50%', label: 'Kitchen detailing' },
  { image: 'bedroom', focus: '50% 40%', label: 'Bedroom calm' },
  { image: 'apartment3bhk', focus: '30% 50%', label: 'Warm textures' },
  { image: 'after', focus: '70% 50%', label: 'Finished corners' },
  { image: 'apartment2bhk', focus: '50% 60%', label: 'Open plan light' },
]

export const propertyTypes = ['2BHK', '3BHK', '4BHK', 'Other'] as const

export const budgetRanges = [
  'Under ₹5 lakh',
  '₹5 to 10 lakh',
  '₹10 to 20 lakh',
  '₹20 lakh and above',
  'Not sure yet',
] as const
