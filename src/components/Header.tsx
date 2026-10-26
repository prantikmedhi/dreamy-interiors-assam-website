import { useRef } from 'react'
import { Link, NavLink } from 'react-router'
import { nav, site, whatsappLink } from '../data/site'
import { Icon } from './Icon'
import { Logo } from './Logo'

// `solid` is driven by an IntersectionObserver sentinel in Layout, not by scroll listeners.
export function Header({ solid }: { solid: boolean }) {
  const menu = useRef<HTMLDialogElement>(null)
  const tone = solid ? 'dark' : 'light'
  const close = () => menu.current?.close()

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-[background-color,box-shadow,color] duration-500 ${
        solid ? 'bg-ivory/95 text-charcoal shadow-[0_1px_0_var(--color-line)] backdrop-blur-md' : 'bg-gradient-to-b from-charcoal/45 to-transparent text-ivory'
      }`}
    >
      <div className="wrap flex h-[72px] items-center justify-between gap-6 lg:h-[78px]">
        <Logo tone={tone} size={48} />

        <nav aria-label="Primary" className="hidden items-center gap-9 lg:flex">
          {nav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `relative whitespace-nowrap py-2 text-[12px] font-semibold uppercase tracking-[0.18em] transition-opacity hover:opacity-100 ${
                  isActive ? 'opacity-100 after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:bg-gold' : 'opacity-80'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
          <Link to="/contact#consultation" className={`btn h-11 px-5 ${solid ? 'btn-dark' : 'btn-ghost-light'}`}>
            Book a Consultation
          </Link>
        </nav>

        <button
          type="button"
          className="-mr-2 flex h-12 w-12 items-center justify-center lg:hidden"
          aria-label="Open menu"
          aria-haspopup="dialog"
          onClick={() => menu.current?.showModal()}
        >
          <Icon name="menu" size={26} />
        </button>
      </div>

      <dialog
        ref={menu}
        aria-label="Site menu"
        className="m-0 h-[100dvh] max-h-none w-full max-w-none bg-ivory p-0 text-charcoal"
        onClick={(e) => e.target === e.currentTarget && close()}
      >
        <div className="flex min-h-full flex-col">
          <div className="wrap flex h-[72px] shrink-0 items-center justify-between">
            <span onClick={close}>
              <Logo tone="dark" size={44} />
            </span>
            <button type="button" className="-mr-2 flex h-12 w-12 items-center justify-center" aria-label="Close menu" onClick={close}>
              <Icon name="close" size={26} />
            </button>
          </div>
          <nav aria-label="Mobile" className="wrap flex flex-1 flex-col justify-center py-8">
            <ul className="border-t border-line">
              {[{ to: '/', label: 'Home' }, ...nav].map((item, i) => (
                <li key={item.to} className="border-b border-line">
                  <NavLink
                    to={item.to}
                    end
                    onClick={close}
                    className={({ isActive }) =>
                      `flex items-baseline justify-between py-5 font-display text-[2.1rem] leading-none ${isActive ? 'text-gold-ink' : ''}`
                    }
                  >
                    {item.label}
                    <span className="font-sans text-[11px] tracking-[0.2em] text-ink-soft">0{i + 1}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
            <Link to="/contact#consultation" onClick={close} className="btn btn-dark mt-10 w-full">
              Book a Consultation
            </Link>
          </nav>
          <div className="wrap flex shrink-0 flex-wrap gap-x-6 gap-y-3 pb-8 text-[13px] text-ink-soft">
            <a href={`tel:${site.phoneE164}`} className="inline-flex items-center gap-2"><Icon name="phone" size={16} />{site.phoneDisplay}</a>
            <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2"><Icon name="whatsapp" size={16} />WhatsApp</a>
            <a href={site.instagramUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2"><Icon name="instagram" size={16} />Instagram</a>
          </div>
        </div>
      </dialog>
    </header>
  )
}
