import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router'
import { App } from './App'

export { routeMeta, prerenderRoutes, organizationJsonLd, ogImage } from './data/seo'
export { site } from './data/site'
export { projects } from './data/projects'

export function render(url: string) {
  return renderToString(
    <StrictMode>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </StrictMode>,
  )
}
