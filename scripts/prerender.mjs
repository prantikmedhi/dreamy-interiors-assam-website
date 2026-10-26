// Renders every known route to static HTML with route specific head tags, then writes
// sitemap.xml, robots.txt and llms.txt from the same typed data the app uses.
import { mkdirSync, readFileSync, writeFileSync, rmSync } from 'node:fs'
import { dirname, join } from 'node:path'

const root = new URL('..', import.meta.url).pathname
const dist = join(root, 'dist')
const ssr = await import(join(root, 'dist-ssr/entry-server.js'))
const { render, routeMeta, prerenderRoutes, organizationJsonLd, ogImage, site, projects } = ssr

const template = readFileSync(join(dist, 'index.html'), 'utf8')
const esc = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
const json = (o) => JSON.stringify(o).replace(/</g, '\\u003c')

function head(meta) {
  const canonical = `${site.url}${meta.path === '/' ? '' : meta.path}`
  const ld = [organizationJsonLd]
  if (meta.path === '/') {
    ld.push({ '@context': 'https://schema.org', '@type': 'WebSite', name: site.fullName, url: site.url, publisher: { '@id': organizationJsonLd['@id'] } })
  }
  if (!meta.notFound && meta.path !== '/') {
    const parts = meta.path.split('/').filter(Boolean)
    ld.push({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [{ name: 'Home', path: '' }, ...parts.map((_, i) => ({ path: '/' + parts.slice(0, i + 1).join('/') }))].map((c, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: c.name ?? routeMeta(c.path).title.split(' | ')[0],
        item: `${site.url}${c.path}`,
      })),
    })
  }
  return [
    `<title>${esc(meta.title)}</title>`,
    `<meta name="description" content="${esc(meta.description)}" />`,
    `<meta name="robots" content="${meta.notFound ? 'noindex, follow' : 'index, follow'}" />`,
    `<link rel="canonical" href="${canonical}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="${esc(site.fullName)}" />`,
    `<meta property="og:locale" content="en_IN" />`,
    `<meta property="og:title" content="${esc(meta.title)}" />`,
    `<meta property="og:description" content="${esc(meta.description)}" />`,
    `<meta property="og:url" content="${canonical}" />`,
    `<meta property="og:image" content="${ogImage}" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta property="og:image:alt" content="${esc(site.fullName)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(meta.title)}" />`,
    `<meta name="twitter:description" content="${esc(meta.description)}" />`,
    `<meta name="twitter:image" content="${ogImage}" />`,
    `<link rel="icon" href="/favicon.png" type="image/png" sizes="48x48" />`,
    `<link rel="icon" href="/favicon.svg" type="image/svg+xml" />`,
    `<link rel="apple-touch-icon" href="/apple-touch-icon.png" />`,
    `<script type="application/ld+json">${json(ld)}</script>`,
  ].join('\n    ')
}

function page(url, meta) {
  const html = render(url)
  return template.replace(/<!--head-->[\s\S]*<!--\/head-->/, head(meta)).replace('<!--app-->', html)
}

for (const route of prerenderRoutes) {
  const file = route === '/' ? join(dist, 'index.html') : join(dist, route, 'index.html')
  mkdirSync(dirname(file), { recursive: true })
  writeFileSync(file, page(route, routeMeta(route)))
}
writeFileSync(join(dist, '404.html'), page('/404', routeMeta('/404')))

const today = new Date().toISOString().slice(0, 10)
writeFileSync(
  join(dist, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${prerenderRoutes
    .map((r) => `  <url><loc>${site.url}${r === '/' ? '/' : r}</loc><lastmod>${today}</lastmod></url>`)
    .join('\n')}\n</urlset>\n`,
)
writeFileSync(join(dist, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${site.url}/sitemap.xml\n`)
writeFileSync(
  join(dist, 'llms.txt'),
  `# ${site.fullName}

> Luxury interior design and construction studio in Assam, India, offering A to Z interiors for 2BHK, 3BHK and 4BHK flats.

- Founders: ${site.founders.join(' and ')}
- Service locations: ${site.cities.join(', ')} (Assam, India)
- Phone and WhatsApp: ${site.phoneE164}
- Instagram: ${site.instagramUrl}
- Services: Complete Home Interiors; Luxury Living Spaces; Bedroom Design; Modular Kitchens; Ceiling & Lighting Design; Renovation & Interior Execution. Includes custom furniture and wardrobes, electrical and finishing work, and residential construction execution.

Note: portfolio imagery on this website shows illustrative interior concepts, not photographs of completed client projects. No client testimonials are published.

## Pages

${prerenderRoutes.map((r) => `- [${routeMeta(r).title}](${site.url}${r === '/' ? '/' : r}): ${routeMeta(r).description}`).join('\n')}

## Concepts

${projects.map((p) => `- ${p.title}: ${p.summary}`).join('\n')}
`,
)

rmSync(join(root, 'dist-ssr'), { recursive: true, force: true })
console.log(`prerender: ${prerenderRoutes.length} routes + 404.html, sitemap.xml, robots.txt, llms.txt`)
