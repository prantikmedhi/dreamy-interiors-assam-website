import type { ReactNode } from 'react'
import { Link } from 'react-router'
import { mapsSearchUrl, nav, site, whatsappLink } from '../data/site'
import { services } from '../data/services'
import { Icon } from './Icon'
import { Logo } from './Logo'

export function Footer() {
  return (
    <footer className="bg-charcoal text-ivory">
      <div className="wrap grid gap-14 pb-12 pt-20 lg:grid-cols-12 lg:gap-8 lg:pt-28">
        <div className="lg:col-span-4">
          <Logo tone="light" size={72} />
          <p className="mt-8 max-w-sm text-[15px] leading-relaxed text-ivory/65">
            Luxury interior design and construction for homes across Assam. A to Z interiors for 2BHK, 3BHK and 4BHK flats, from first sketch to final handover.
          </p>
        </div>

        <FooterCol title="Explore" className="lg:col-span-2 lg:col-start-6">
          {[{ to: '/', label: 'Home' }, ...nav].map((n) => (
            <li key={n.to}><Link to={n.to} className="hover:text-champagne">{n.label}</Link></li>
          ))}
        </FooterCol>

        <FooterCol title="Services" className="lg:col-span-3">
          {services.map((s) => (
            <li key={s.id}><Link to={`/services#${s.id}`} className="hover:text-champagne">{s.title}</Link></li>
          ))}
        </FooterCol>

        <FooterCol title="Contact" className="lg:col-span-2">
          <li><a href={`tel:${site.phoneE164}`} className="inline-flex items-center gap-2 whitespace-nowrap hover:text-champagne"><Icon name="phone" size={16} />{site.phoneDisplay}</a></li>
          <li><a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:text-champagne"><Icon name="whatsapp" size={16} />WhatsApp</a></li>
          <li><a href={site.instagramUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:text-champagne"><Icon name="instagram" size={16} />{site.instagramHandle}</a></li>
          <li className="pt-2 text-ivory/50">
            {site.cities.map((c, i) => (
              <span key={c}>
                <a href={mapsSearchUrl(c)} target="_blank" rel="noopener noreferrer" className="hover:text-champagne">{c}</a>
                {i < site.cities.length - 1 ? ' · ' : ''}
              </span>
            ))}
          </li>
        </FooterCol>
      </div>
      <div className="wrap flex flex-col gap-3 border-t border-ivory/10 py-8 text-[12px] text-ivory/65 sm:flex-row sm:justify-between">
        <p>© {new Date().getFullYear()} {site.fullName}</p>
        <p>Portfolio imagery shown is illustrative interior concepts.</p>
      </div>
    </footer>
  )
}

function FooterCol({ title, className, children }: { title: string; className?: string; children: ReactNode }) {
  return (
    <div className={className}>
      <h2 className="text-[11px] font-semibold uppercase tracking-[0.24em] text-champagne">{title}</h2>
      <ul className="mt-6 space-y-3 text-[15px] text-ivory/80">{children}</ul>
    </div>
  )
}
