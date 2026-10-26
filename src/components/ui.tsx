import type { ReactNode } from 'react'
import { Link } from 'react-router'
import { Icon, type IconName } from './Icon'
import { Reveal } from './Reveal'

type Variant = 'gold' | 'dark' | 'ghost-light' | 'ghost-dark'

interface ButtonLinkProps {
  to: string
  variant?: Variant
  icon?: IconName
  children: ReactNode
  className?: string
  external?: boolean
}

export function ButtonLink({ to, variant = 'gold', icon, children, className = '', external }: ButtonLinkProps) {
  const cls = `btn btn-${variant} ${className}`
  const content = (
    <>
      {children}
      {icon && <Icon name={icon} size={18} />}
    </>
  )
  if (external || /^(https?:|tel:|mailto:)/.test(to)) {
    const newTab = to.startsWith('http')
    return (
      <a href={to} className={cls} {...(newTab ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
        {content}
      </a>
    )
  }
  return (
    <Link to={to} className={cls}>
      {content}
    </Link>
  )
}

interface SectionHeadingProps {
  eyebrow: string
  title: ReactNode
  intro?: ReactNode
  tone?: 'light' | 'dark'
  align?: 'left' | 'center'
  as?: 'h1' | 'h2'
  className?: string
}

export function SectionHeading({ eyebrow, title, intro, tone = 'light', align = 'left', as: H = 'h2', className = '' }: SectionHeadingProps) {
  const centered = align === 'center'
  return (
    <Reveal className={`${centered ? 'mx-auto text-center' : ''} max-w-3xl ${className}`}>
      <p className={`eyebrow ${tone === 'dark' ? 'text-champagne' : 'text-ink-soft'} ${centered ? 'justify-center' : ''}`}>{eyebrow}</p>
      <H className={`display mt-5 text-[2.5rem] sm:text-[3.25rem] lg:text-[4rem] ${tone === 'dark' ? 'text-ivory' : ''}`}>{title}</H>
      {intro && <div className={`mt-6 max-w-2xl text-[17px] leading-relaxed ${centered ? 'mx-auto' : ''} ${tone === 'dark' ? 'text-ivory/75' : 'text-ink-soft'}`}>{intro}</div>}
    </Reveal>
  )
}

export function ConceptLabel({ tone = 'dark', className = '' }: { tone?: 'light' | 'dark'; className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 text-[10.5px] font-semibold uppercase tracking-[0.22em] ${tone === 'dark' ? 'text-ivory/85' : 'text-ink-soft'} ${className}`}>
      <span className="h-1.5 w-1.5 rotate-45 bg-gold" aria-hidden="true" />
      Illustrative interior concept
    </span>
  )
}
