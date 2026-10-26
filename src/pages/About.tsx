import { PageHero } from '../components/PageHero'
import { Reveal } from '../components/Reveal'
import { CtaBand, ProcessSteps, WhyGrid } from '../components/sections'
import { SmartImage } from '../components/SmartImage'
import { ButtonLink, SectionHeading } from '../components/ui'
import { site } from '../data/site'

const principles = [
  {
    title: 'Listen before drawing',
    text: 'Every project begins with how you live: who shares the home, what you store, how you host and what makes a room feel restful to you.',
  },
  {
    title: 'Design the whole home',
    text: 'Rooms are planned together so materials, lighting and storage feel continuous from the entrance to the last bedroom.',
  },
  {
    title: 'Stay with the work',
    text: 'Design intent is carried onto site. We coordinate the trades and check the details so the finished home matches the approved design.',
  },
]

export default function About() {
  return (
    <>
      <PageHero
        image="apartment3bhk"
        eyebrow="About the Studio"
        title="Homes shaped with care, built with intent."
        intro="An Assam based studio for luxury residential interiors and construction, founded by Madhurjya Sharma and Daisy Sharma."
      />

      <section className="py-24 lg:py-36">
        <div className="wrap grid gap-14 lg:grid-cols-12 lg:gap-10">
          <Reveal className="lg:col-span-5">
            <p className="eyebrow text-ink-soft">Our Story</p>
            <h2 className="display mt-6 text-[2.5rem] sm:text-[3.3rem]">A to Z interiors for the way Assam lives now.</h2>
          </Reveal>
          <Reveal delay={120} className="space-y-6 text-[17px] leading-relaxed text-ink-soft lg:col-span-6 lg:col-start-7 lg:pt-14">
            <p className="text-[20px] leading-relaxed text-charcoal">
              Dreamy Interiors & Construction was created to give homeowners in Assam a single, trusted partner for the whole journey of making a home.
            </p>
            <p>
              The studio focuses on flat interiors, from compact 2BHK apartments to generous 4BHK residences, alongside renovations and residential
              construction work. We plan layouts, design every room, select materials and coordinate execution on site, so you are never left managing
              separate vendors.
            </p>
            <p>
              We work with families in Guwahati, Nagaon and Tezpur, and bring the same attention to a single modular kitchen as to a complete home.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-charcoal py-24 text-ivory lg:py-32" aria-labelledby="founders-title">
        <div className="wrap grid gap-14 lg:grid-cols-12 lg:items-center lg:gap-10">
          <Reveal className="relative aspect-[4/5] lg:col-span-5">
            <SmartImage image="bedroom" focus="35% 50%" sizes="(min-width: 1024px) 40vw, 100vw" />
          </Reveal>
          <div className="lg:col-span-6 lg:col-start-7">
            <SectionHeading tone="dark" eyebrow="Founders" title={<span id="founders-title">Led by the people who design your home.</span>} />
            <ul className="mt-12 grid gap-px bg-ivory/15 sm:grid-cols-2">
              {site.founders.map((f) => (
                <Reveal as="li" key={f} className="bg-charcoal py-6 sm:pr-8">
                  <p className="display text-[2rem]">{f}</p>
                  <p className="mt-1 text-[12px] font-semibold uppercase tracking-[0.2em] text-champagne">Founder</p>
                </Reveal>
              ))}
            </ul>
            <Reveal className="mt-10 max-w-lg text-[16px] leading-relaxed text-ivory/70">
              <p>
                When you work with Dreamy Interiors, you speak directly with the founders. That keeps decisions quick, communication clear and the design
                vision consistent from the first meeting to handover.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="py-24 lg:py-36">
        <div className="wrap">
          <SectionHeading eyebrow="How We Work" title="Three principles behind every home." />
          <ol className="mt-16 grid gap-12 md:grid-cols-3 md:gap-10">
            {principles.map((p, i) => (
              <Reveal as="li" key={p.title} delay={i * 100} className={`border-t border-charcoal/20 pt-8 ${i === 1 ? 'md:mt-16' : i === 2 ? 'md:mt-32' : ''}`}>
                <span className="display text-[3.5rem] leading-none text-champagne">0{i + 1}</span>
                <h3 className="display mt-6 text-[1.9rem]">{p.title}</h3>
                <p className="mt-3 text-[16px] leading-relaxed text-ink-soft">{p.text}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-sand py-24 lg:py-36">
        <div className="wrap grid gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <SectionHeading eyebrow="Why Dreamy Interiors" title="Designed Around You. Crafted to Last." />
            <Reveal className="mt-10">
              <ButtonLink to="/services" variant="ghost-dark" icon="arrow">View Services</ButtonLink>
            </Reveal>
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            <WhyGrid />
          </div>
        </div>
      </section>

      <section className="py-24 lg:py-36">
        <div className="wrap">
          <SectionHeading eyebrow="Our Process" title="From discovery to handover." />
          <div className="mt-16 lg:mt-20">
            <ProcessSteps />
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  )
}
