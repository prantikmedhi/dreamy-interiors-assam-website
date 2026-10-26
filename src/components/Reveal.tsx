import { useEffect, useRef, type CSSProperties, type ElementType, type ReactNode } from 'react'

const observers = new Set<IntersectionObserver>()

function createObserver() {
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in')
          observer.unobserve(entry.target)
        }
      }
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
  )
  observers.add(observer)
  return observer
}

interface Props {
  as?: ElementType
  delay?: number
  className?: string
  children: ReactNode
  id?: string
}

// Subtle fade and rise once an element enters the viewport. A per-element observer
// avoids route-transition cleanup in React Strict Mode disconnecting other reveals.
export function Reveal({ as: Tag = 'div', delay = 0, className = '', children, id }: Props) {
  const ref = useRef<HTMLElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (el.classList.contains('is-in')) el.classList.remove('is-in')
    const io = createObserver()
    io.observe(el)
    return () => {
      io.unobserve(el)
      io.disconnect()
      observers.delete(io)
      el.classList.remove('is-in')
    }
  }, [])
  return (
    <Tag ref={ref} id={id} className={`reveal ${className}`} style={delay ? ({ '--delay': `${delay}ms` } as CSSProperties) : undefined}>
      {children}
    </Tag>
  )
}
