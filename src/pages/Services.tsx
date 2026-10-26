import { Icon } from '../components/Icon'
import { PageHero } from '../components/PageHero'
import { Reveal } from '../components/Reveal'
import { CtaBand, ProcessSteps } from '../components/sections'
import { SmartImage } from '../components/SmartImage'
import { ButtonLink, SectionHeading } from '../components/ui'
import { services } from '../data/services'

const flatTypes = [
  { type: '2BHK', text: 'Compact homes planned for openness, with full height storage and multifunctional furniture.' },
  { type: '3BHK', text: 'Family homes balancing shared living spaces with three distinct, personal bedrooms.' },
  { type: '4BHK', text: 'Generous residences with formal and family zones, statement ceilings and bespoke joinery.' },
]

export default function Services() {
  return (
    <>
      <PageHero
        image="kitchen"
        eyebrow="Services"
        title="A to Z interior design, delivered by one team."
        intro="Design, materials and execution for complete homes, single rooms, renovations and residential construction across Assam."
      >
        <ButtonLink to="/contact#consultation" variant="gold">Book a Consultation</ButtonLink>
      </PageHero>

      <nav aria-label="Services" className="sticky top-[72px] z-30 border-b border-line bg-ivory/95 backdrop-blur-md lg:top-[78px]">
        <ul className="wrap flex gap-6 overflow-x-auto py-4 text-[12px] font-semibold uppercase tracking-[0.16em] [scrollbar-width:none]">
          {services.map((s) => (
            <li key={s.id} className="shrink-0">
              <a href={`#${s.id}`} className="whitespace-nowrap text-ink-soft hover:text-charcoal">
                <span className="text-gold-ink">{s.number}</span> {s.title}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="py-12 lg:py-20">
        {services.map((s, i) => {
          const flip = i % 2 === 1
          return (
            <section key={s.id} id={s.id} className="scroll-mt-36 py-14 lg:py-20" aria-labelledby={`${s.id}-title`}>
              <div className="wrap grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-10">
                <Reveal className={`relative aspect-[4/3] lg:col-span-6 ${flip ? 'lg:order-2 lg:col-start-7' : ''}`}>
                  <SmartImage image={s.image} sizes="(min-width: 1024px) 50vw, 100vw" />
                </Reveal>
                <Reveal delay={100} className={`lg:col-span-5 ${flip ? 'lg:order-1 lg:col-start-1' : 'lg:col-start-8'}`}>
                  <span className="display text-[4rem] leading-none text-champagne">{s.number}</span>
                  <h2 id={`${s.id}-title`} className="display mt-4 text-[2.3rem] sm:text-[2.9rem]">{s.title}</h2>
                  <p className="mt-5 text-[18px] leading-relaxed text-charcoal">{s.summary}</p>
                  <p className="mt-4 text-[16px] leading-relaxed text-ink-soft">{s.detail}</p>
                  <ul className="mt-8 border-t border-charcoal/15">
                    {s.capabilities.map((c) => (
                      <li key={c} className="flex gap-3 border-b border-charcoal/15 py-4 text-[15px]">
                        <Icon name="check" size={18} className="mt-0.5 shrink-0 text-gold-ink" />
                        {c}
                      </li>
                    ))}
                  </ul>
                </Reveal>
              </div>
            </section>
          )
        })}
      </div>

      <section className="bg-charcoal py-24 text-ivory lg:py-32">
        <div className="wrap">
          <SectionHeading tone="dark" eyebrow="Flat Interior Specialists" title="Planned for 2BHK, 3BHK and 4BHK homes." />
          <ul className="mt-16 grid gap-px bg-ivory/15 md:grid-cols-3">
            {flatTypes.map((f, i) => (
              <Reveal as="li" key={f.type} delay={i * 100} className="bg-charcoal py-8 md:px-8 md:first:pl-0">
                <span className="display text-[3.6rem] leading-none text-champagne">{f.type}</span>
                <p className="mt-5 max-w-xs text-[16px] leading-relaxed text-ivory/70">{f.text}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-24 lg:py-36">
        <div className="wrap">
          <SectionHeading eyebrow="Our Process" title="How every service comes together." />
          <div className="mt-16 lg:mt-20">
            <ProcessSteps />
          </div>
        </div>
      </section>

      <CtaBand title="Tell us what your home needs." />
    </>
  )
}
