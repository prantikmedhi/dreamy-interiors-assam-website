import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from 'react'
import { useLocation } from 'react-router'
import { routeMeta } from '../data/seo'
import { site } from '../data/site'
import { Footer } from './Footer'
import { Header } from './Header'

const useIsoLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect

function setMeta(selector: string, attr: string, value: string) {
  document.head.querySelector(selector)?.setAttribute(attr, value)
}

export function Layout({ children }: { children: ReactNode }) {
  const { pathname, hash } = useLocation()
  const meta = routeMeta(pathname)
  const sentinel = useRef<HTMLDivElement>(null)
  const [atTop, setAtTop] = useState(true)

  // Pages without a dark image header always use the solid header.
  const solid = meta.notFound || !atTop

  useEffect(() => {
    const el = sentinel.current
    if (!el) return
    const io = new IntersectionObserver(([entry]) => setAtTop(entry.isIntersecting))
    io.observe(el)
    return () => io.disconnect()
  }, [])

  // Keep head tags in sync on client navigation. Initial values come from pre-rendered HTML.
  useEffect(() => {
    const canonical = `${site.url}${meta.path === '/' ? '' : meta.path}`
    document.title = meta.title
    setMeta('meta[name="description"]', 'content', meta.description)
    setMeta('link[rel="canonical"]', 'href', canonical)
    setMeta('meta[property="og:title"]', 'content', meta.title)
    setMeta('meta[property="og:description"]', 'content', meta.description)
    setMeta('meta[property="og:url"]', 'content', canonical)
    setMeta('meta[name="robots"]', 'content', meta.notFound ? 'noindex, follow' : 'index, follow')
  }, [meta.title, meta.description, meta.path, meta.notFound])

  const firstRender = useRef(true)
  useIsoLayoutEffect(() => {
    // During hydration the server-rendered page can describe a different route than
    // the current browser URL. Treat that as a navigation, not an initial restore.
    if (firstRender.current) {
      firstRender.current = false
      const serverPath = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')?.href
      if (!serverPath || new URL(serverPath).pathname === pathname) return
    }
    document.querySelectorAll('.reveal.is-in').forEach((el) => el.classList.remove('is-in'))
    if (hash) {
      document.getElementById(decodeURIComponent(hash.slice(1)))?.scrollIntoView()
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' })
    }
  }, [pathname, hash])

  return (
    <>
      <a href="#main" className="fixed left-4 top-4 z-50 -translate-y-24 bg-charcoal px-4 py-3 text-sm text-ivory focus:translate-y-0">
        Skip to content
      </a>
      <div ref={sentinel} aria-hidden="true" className="pointer-events-none absolute left-0 top-0 h-24 w-px" />
      <Header solid={solid} />
      <main id="main" tabIndex={-1} className="outline-none">
        {children}
      </main>
      <Footer />
    </>
  )
}
