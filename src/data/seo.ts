import { site } from './site'
import { projects, findProject } from './projects'
import { logo } from './images'

export interface PageMeta {
  title: string
  description: string
  path: string
  notFound?: boolean
}

const staticMeta: Record<string, Omit<PageMeta, 'path'>> = {
  '/': {
    title: `${site.fullName} | Luxury Interior Design & Construction`,
    description:
      'Luxury interior design and construction for 2BHK, 3BHK and 4BHK homes in Guwahati, Nagaon and Tezpur. A to Z interiors by Dreamy Interiors & Construction, Assam.',
  },
  '/about': {
    title: `About the Studio | ${site.shortName}, Assam`,
    description:
      'Founded by Madhurjya Sharma and Daisy Sharma, Dreamy Interiors & Construction designs and delivers complete flat interiors across Guwahati, Nagaon and Tezpur.',
  },
  '/services': {
    title: `Interior Design Services | ${site.shortName}, Assam`,
    description:
      'Complete home interiors, modular kitchens, bedrooms, false ceilings and lighting, custom wardrobes, renovation and residential construction across Assam.',
  },
  '/projects': {
    title: `Interior Design Concepts | ${site.shortName}, Assam`,
    description:
      'Explore illustrative interior concepts for living rooms, bedrooms, modular kitchens and complete 2BHK, 3BHK and 4BHK homes in Assam.',
  },
  '/contact': {
    title: `Book a Consultation | ${site.shortName}, Assam`,
    description:
      'Plan your home interiors with Dreamy Interiors & Construction. Call or WhatsApp +91 91018 03363. Serving Guwahati, Nagaon and Tezpur.',
  },
}

export const notFoundMeta: PageMeta = {
  title: `Page Not Found | ${site.shortName}`,
  description: 'The page you are looking for could not be found. Explore our interior concepts or book a consultation.',
  path: '/404',
  notFound: true,
}

export function routeMeta(pathname: string): PageMeta {
  const path = pathname.replace(/\/+$/, '') || '/'
  if (staticMeta[path]) return { ...staticMeta[path], path }
  const match = path.match(/^\/projects\/([^/]+)$/)
  const project = match ? findProject(match[1]) : undefined
  if (project) {
    return {
      title: `${project.title} | Illustrative Interior Concept | ${site.shortName}`,
      description: `${project.summary} An illustrative interior concept by Dreamy Interiors & Construction, Assam.`,
      path,
    }
  }
  return notFoundMeta
}

export const prerenderRoutes = [...Object.keys(staticMeta), ...projects.map((p) => `/projects/${p.slug}`)]

export const ogImage = `${site.url}/og-image.jpg`

export const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'HomeAndConstructionBusiness',
  '@id': `${site.url}/#business`,
  name: site.fullName,
  url: site.url,
  ...(logo.available ? { logo: `${site.url}${logo.src}` } : {}),
  image: ogImage,
  description: 'Luxury interior design and construction studio offering A to Z interiors for 2BHK, 3BHK and 4BHK flats.',
  telephone: site.phoneE164,
  areaServed: site.cities.map((name) => ({ '@type': 'City', name, containedInPlace: { '@type': 'State', name: 'Assam' } })),
  founder: site.founders.map((name) => ({ '@type': 'Person', name })),
  sameAs: [site.instagramUrl],
}
