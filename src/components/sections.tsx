import { benefits, instagramTiles, process } from '../data/content'
import { mapsSearchUrl, site, whatsappLink } from '../data/site'
import { Icon } from './Icon'
import { Reveal } from './Reveal'
import { SmartImage } from './SmartImage'
import { ButtonLink } from './ui'

export function ProcessSteps({ tone = 'light' }: { tone?: 'light' | 'dark' }) {
  const dark = tone === 'dark'
  return (
    <ol className="grid gap-0 md:grid-cols-5 md:gap-6">
      {process.map((step, i) => (
        <Reveal as="li" key={step.title} delay={i * 90} className="relative flex gap-6 pb-10 md:block md:pb-0">
          {/* Vertical rail on mobile, horizontal on desktop. */}
          <span className={`absolute left-[19px] top-10 h-full w-px md:hidden ${dark ? 'bg-ivory/15' : 'bg-charcoal/15'} ${i === process.length - 1 ? 'hidden' : ''}`} aria-hidden="true" />
          <span
            className={`relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border text-[12px] font-semibold ${
              dark ? 'border-champagne/60 bg-charcoal text-champagne' : 'border-gold bg-ivory text-charcoal'
            }`}
          >
            {i + 1}
          </span>
          <span className={`absolute left-12 right-0 top-5 hidden h-px md:block ${dark ? 'bg-ivory/15' : 'bg-charcoal/15'} ${i === process.length - 1 ? 'md:hidden' : ''}`} aria-hidden="true" />
          <div className="md:mt-8">
            <h3 className="display text-[1.6rem] lg:text-[1.75rem]">{step.title}</h3>
            <p className={`mt-3 text-[15px] leading-relaxed ${dark ? 'text-ivory/65' : 'text-ink-soft'}`}>{step.text}</p>
          </div>
        </Reveal>
      ))}
    </ol>
  )
}

export function WhyGrid() {
  return (
    <ul className="grid border-t border-charcoal/15 sm:grid-cols-2">
      {benefits.map((b, i) => (
        <Reveal
          as="li"
          key={b.title}
          delay={(i % 2) * 100}
          className={`border-b border-charcoal/15 py-8 sm:px-0 sm:py-10 ${i % 2 === 0 ? 'sm:pr-10' : 'sm:border-l sm:pl-10'}`}
        >
          <span className="text-[11px] font-semibold tracking-[0.22em] text-gold-ink">{String(i + 1).padStart(2, '0')}</span>
          <h3 className="display mt-3 text-[1.65rem]">{b.title}</h3>
          <p className="mt-2 text-[15px] leading-relaxed text-ink-soft">{b.text}</p>
        </Reveal>
      ))}
    </ul>
  )
}

// Honest placeholder until verified client stories are authorised for publication.
export function StoriesEmpty() {
  return (
    <Reveal className="relative mx-auto max-w-4xl border border-charcoal/15 px-6 py-16 text-center sm:px-16 sm:py-20">
      <span className="display block text-[6rem] leading-[0.5] text-champagne" aria-hidden="true">“</span>
      <p className="eyebrow justify-center text-ink-soft">Client stories</p>
      <h2 className="display mx-auto mt-5 max-w-2xl text-[2.2rem] sm:text-[3rem]">Words from the homes we create.</h2>
      <p className="mx-auto mt-6 max-w-xl text-[16px] leading-relaxed text-ink-soft">
        This space is reserved for verified client stories and authorised project photography. We only publish feedback that homeowners have
        agreed to share, so you will see real words here, never invented ones.
      </p>
      <div className="mt-10 flex flex-wrap justify-center gap-3">
        <ButtonLink to={site.instagramUrl} variant="ghost-dark" icon="instagram">
          Follow on Instagram
        </ButtonLink>
      </div>
    </Reveal>
  )
}

export function InstagramGrid() {
  return (
    <div>
      <ul className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-6">
        {instagramTiles.map((t, i) => (
          <Reveal as="li" key={t.label} delay={i * 70} className={i % 2 === 1 ? 'lg:mt-12' : ''}>
            <a
              href={site.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="zoom group relative block aspect-square overflow-hidden"
              aria-label={`${t.label}. Open Dreamy Interiors on Instagram`}
            >
              <SmartImage image={t.image} focus={t.focus} sizes="(min-width: 1024px) 16vw, (min-width: 768px) 33vw, 50vw" alt="" />
              <span className="absolute inset-0 flex items-end bg-gradient-to-t from-charcoal/60 to-transparent p-3 opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100">
                <Icon name="instagram" size={18} className="text-ivory" />
              </span>
            </a>
          </Reveal>
        ))}
      </ul>
      <p className="mt-6 text-[12px] tracking-[0.04em] text-ink-soft">
        Curated illustrative inspiration. Visit {site.instagramHandle} for the studio’s own updates.
      </p>
    </div>
  )
}

export function LocationCards() {
  return (
    <ul className="grid gap-px bg-charcoal/15 sm:grid-cols-3">
      {site.cities.map((city, i) => (
        <Reveal as="li" key={city} delay={i * 90} className="bg-ivory">
          <a
            href={mapsSearchUrl(city)}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex h-full flex-col justify-between gap-12 p-7 transition-colors duration-300 hover:bg-sand sm:p-9"
          >
            <span className="flex items-center justify-between text-ink-soft">
              <Icon name="pin" size={22} className="text-gold-ink" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em]">Assam</span>
            </span>
            <span>
              <span className="display block text-[2.4rem]">{city}</span>
              <span className="link-line mt-3 text-ink-soft">
                View on Google Maps <Icon name="arrow" size={16} />
              </span>
            </span>
          </a>
        </Reveal>
      ))}
    </ul>
  )
}

export function ContactLines({ tone = 'light' }: { tone?: 'light' | 'dark' }) {
  const dark = tone === 'dark'
  const row = `group flex items-center justify-between gap-6 border-b py-6 transition-colors ${dark ? 'border-ivory/15 hover:text-champagne' : 'border-charcoal/15 hover:text-gold-ink'}`
  const label = `text-[11px] font-semibold uppercase tracking-[0.22em] ${dark ? 'text-champagne' : 'text-ink-soft'}`
  return (
    <ul className={`border-t ${dark ? 'border-ivory/15' : 'border-charcoal/15'}`}>
      <li>
        <a href={`tel:${site.phoneE164}`} className={row}>
          <span>
            <span className={label}>Call</span>
            <span className="display mt-1 block text-[1.9rem] sm:text-[2.2rem]">{site.phoneDisplay}</span>
          </span>
          <Icon name="phone" size={24} />
        </a>
      </li>
      <li>
        <a href={whatsappLink('Hello Dreamy Interiors, I would like to discuss my home interiors.')} target="_blank" rel="noopener noreferrer" className={row}>
          <span>
            <span className={label}>WhatsApp</span>
            <span className="display mt-1 block text-[1.9rem] sm:text-[2.2rem]">Message the studio</span>
          </span>
          <Icon name="whatsapp" size={24} />
        </a>
      </li>
      <li>
        <a href={site.instagramUrl} target="_blank" rel="noopener noreferrer" className={row}>
          <span>
            <span className={label}>Instagram</span>
            <span className="display mt-1 block text-[1.9rem] sm:text-[2.2rem]">{site.instagramHandle}</span>
          </span>
          <Icon name="instagram" size={24} />
        </a>
      </li>
    </ul>
  )
}

export function CtaBand({ title = 'Begin with a conversation.', text }: { title?: string; text?: string }) {
  return (
    <section className="bg-sand py-20 lg:py-28">
      <div className="wrap grid items-end gap-10 lg:grid-cols-12">
        <Reveal className="lg:col-span-7">
          <p className="eyebrow text-ink-soft">Next step</p>
          <h2 className="display mt-5 text-[2.5rem] sm:text-[3.4rem]">{title}</h2>
          <p className="mt-5 max-w-xl text-[17px] leading-relaxed text-ink-soft">
            {text ?? 'Tell us about your home in Guwahati, Nagaon, Tezpur or elsewhere in Assam, and we will plan a consultation around your space.'}
          </p>
        </Reveal>
        <Reveal delay={120} className="flex flex-col gap-3 sm:flex-row lg:col-span-5 lg:justify-end">
          <ButtonLink to="/contact#consultation" variant="dark">Book a Consultation</ButtonLink>
          <ButtonLink to={whatsappLink()} variant="ghost-dark" icon="whatsapp">WhatsApp Us</ButtonLink>
        </Reveal>
      </div>
    </section>
  )
}
