// Verified business facts only. Anything not listed here was not supplied and is not shown.
export const site = {
  name: 'Dreamy Interiors & Construction',
  fullName: 'Dreamy Interiors & Construction, Assam',
  shortName: 'Dreamy Interiors',
  tagline: 'Luxury Interior Design & Construction',
  url: 'https://dreamy-interiors-assam-website.vercel.app',
  phoneDisplay: '+91 91018 03363',
  phoneE164: '+919101803363',
  whatsappNumber: '919101803363',
  whatsappUrl: 'https://wa.me/919101803363',
  instagramUrl: 'https://www.instagram.com/dreamyinteriors.in/',
  instagramHandle: '@dreamyinteriors.in',
  founders: ['Madhurjya Sharma', 'Daisy Sharma'],
  cities: ['Guwahati', 'Nagaon', 'Tezpur'],
  region: 'Assam, India',
  specialty: '2BHK, 3BHK and 4BHK flat interiors, A to Z',
} as const

export const nav = [
  { to: '/about', label: 'About' },
  { to: '/services', label: 'Services' },
  { to: '/projects', label: 'Projects' },
  { to: '/contact', label: 'Contact' },
] as const

export const mapsSearchUrl = (city: string) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${city}, Assam, India`)}`

export const whatsappLink = (text?: string) =>
  text ? `${site.whatsappUrl}?text=${encodeURIComponent(text)}` : site.whatsappUrl
