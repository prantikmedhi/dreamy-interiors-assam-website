import { Link } from 'react-router'
import { services } from '../data/services'
import { Icon } from './Icon'

// Native <details> keeps the expansion keyboard and screen reader friendly without extra JS.
export function ServiceAccordion({ tone = 'light' }: { tone?: 'light' | 'dark' }) {
  const dark = tone === 'dark'
  return (
    <ul className={`border-t ${dark ? 'border-ivory/15' : 'border-charcoal/15'}`}>
      {services.map((s) => (
        <li key={s.id} className={`border-b ${dark ? 'border-ivory/15' : 'border-charcoal/15'}`}>
          <details className="group" name="services">
            <summary className="flex cursor-pointer list-none items-center gap-5 py-7 sm:gap-10 lg:py-9 [&::-webkit-details-marker]:hidden">
              <span className={`w-8 shrink-0 text-[12px] font-semibold tracking-[0.2em] ${dark ? 'text-champagne' : 'text-gold-ink'}`}>{s.number}</span>
              <span className="flex-1">
                <span className="display block text-[1.7rem] sm:text-[2.2rem] lg:text-[2.6rem]">{s.title}</span>
              </span>
              <span className={`hidden max-w-sm flex-1 text-[15px] leading-relaxed lg:block ${dark ? 'text-ivory/65' : 'text-ink-soft'}`}>{s.summary}</span>
              <span
                className={`flex h-11 w-11 shrink-0 items-center justify-center border transition-transform duration-500 group-open:rotate-45 ${dark ? 'border-ivory/30' : 'border-charcoal/25'}`}
                aria-hidden="true"
              >
                <Icon name="plus" size={18} />
              </span>
            </summary>
            <div className="grid gap-8 pb-10 pl-[3.25rem] sm:pl-[4.5rem] lg:grid-cols-12 lg:pl-[4.5rem]">
              <p className={`text-[16px] leading-relaxed lg:col-span-5 ${dark ? 'text-ivory/75' : 'text-ink-soft'}`}>
                <span className="lg:hidden">{s.summary} </span>
                {s.detail}
              </p>
              <ul className="space-y-3 lg:col-span-4 lg:col-start-7">
                {s.capabilities.map((c) => (
                  <li key={c} className="flex gap-3 text-[15px]">
                    <Icon name="check" size={18} className="mt-0.5 shrink-0 text-gold-ink" />
                    {c}
                  </li>
                ))}
              </ul>
              <div className="lg:col-span-2 lg:justify-self-end">
                <Link to={`/services#${s.id}`} className="link-line whitespace-nowrap">
                  Details <Icon name="arrow" size={16} />
                </Link>
              </div>
            </div>
          </details>
        </li>
      ))}
    </ul>
  )
}
