import { Link } from 'react-router'
import { BeforeAfter } from '../components/BeforeAfter'
import { ConsultationSection } from '../components/ConsultationForm'
import { Icon } from '../components/Icon'
import { ProjectMosaic } from '../components/ProjectMosaic'
import { Reveal } from '../components/Reveal'
import { ContactLines, InstagramGrid, LocationCards, ProcessSteps, StoriesEmpty, WhyGrid } from '../components/sections'
import { ServiceAccordion } from '../components/ServiceAccordion'
import { SmartImage } from '../components/SmartImage'
import { ButtonLink, ConceptLabel, SectionHeading } from '../components/ui'
import { highlights } from '../data/content'
import { site } from '../data/site'

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[100svh] items-end overflow-hidden bg-charcoal text-ivory">
        <SmartImage image="hero" priority focus="50% 60%" />
        <div
          className="absolute inset-0 bg-[linear-gradient(180deg,rgb(32_32_30/0.5)_0%,rgb(32_32_30/0.1)_38%,rgb(32_32_30/0.78)_100%)]"
          aria-hidden="true"
        />
        <div className="wrap relative pb-12 pt-28 sm:pb-16 lg:pb-20">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-9">
              <p className="eyebrow text-champagne">Luxury Interior Design & Construction</p>
              <h1 className="display mt-6 text-[2.85rem] sm:text-[4.4rem] lg:text-[6.2rem]">Spaces That Define the Art of Living.</h1>
              <p className="mt-6 max-w-xl text-[16px] leading-relaxed text-ivory/85 sm:text-[18px]">
                Thoughtfully designed interiors. Exceptional craftsmanship. Beautifully transformed homes.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <ButtonLink to="/projects" variant="gold">Explore Our Projects</ButtonLink>
                <ButtonLink to="#consultation" variant="ghost-light">Book a Consultation</ButtonLink>
              </div>
            </div>
            <div className="hidden flex-col items-end gap-3 text-right text-[12px] uppercase tracking-[0.2em] text-ivory/70 lg:col-span-3 lg:flex">
              <span>{site.cities.join(' · ')}</span>
              <ConceptLabel />
            </div>
          </div>
        </div>
      </section>

      {/* 1. Trust intro */}
      <section className="py-24 lg:py-36" aria-labelledby="intro-title">
        <div className="wrap">
          <Reveal className="max-w-5xl">
            <p className="eyebrow text-ink-soft">The Studio</p>
            <h2 id="intro-title" className="display mt-6 text-[2.6rem] sm:text-[3.6rem] lg:text-[4.6rem]">
              Your Vision. Our Craftsmanship. A Home Beyond Ordinary.
            </h2>
          </Reveal>
          <div className="mt-16 grid gap-14 lg:mt-24 lg:grid-cols-12 lg:gap-10">
            <Reveal className="relative aspect-[4/5] lg:col-span-6">
              <SmartImage image="living" sizes="(min-width: 1024px) 50vw, 100vw" />
            </Reveal>
            <div className="lg:col-span-5 lg:col-start-8 lg:pt-10">
              <Reveal>
                <p className="text-[19px] leading-relaxed text-charcoal sm:text-[21px]">
                  Dreamy Interiors & Construction is an Assam based interior design and execution studio founded by {site.founders[0]} and{' '}
                  {site.founders[1]}.
                </p>
                <p className="mt-5 text-[16px] leading-relaxed text-ink-soft">
                  We specialise in complete A to Z interiors for 2BHK, 3BHK and 4BHK flats across Guwahati, Nagaon and Tezpur, taking each home from an
                  empty shell to a finished space that feels calm, considered and entirely yours.
                </p>
              </Reveal>
              <ul className="mt-12 border-t border-charcoal/15">
                {highlights.map((h, i) => (
                  <Reveal as="li" key={h.title} delay={i * 90} className="grid grid-cols-[2.5rem_1fr] gap-x-2 border-b border-charcoal/15 py-6">
                    <span className="pt-1.5 text-[11px] font-semibold tracking-[0.2em] text-gold-ink">0{i + 1}</span>
                    <div>
                      <h3 className="display text-[1.55rem]">{h.title}</h3>
                      <p className="mt-1.5 text-[15px] leading-relaxed text-ink-soft">{h.text}</p>
                    </div>
                  </Reveal>
                ))}
              </ul>
              <Link to="/about" className="link-line mt-10">
                About the studio <Icon name="arrow" size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Signature projects */}
      <section className="bg-sand py-24 lg:py-36" aria-labelledby="projects-title">
        <div className="wrap">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading
              eyebrow="Signature Projects"
              title={<span id="projects-title">Six directions for the modern Assam home.</span>}
              intro="A curated set of illustrative interior concepts showing the planning, materials and detailing we bring to every room."
            />
            <Reveal className="flex flex-col items-start gap-5 lg:items-end">
              <ConceptLabel tone="light" />
              <Link to="/projects" className="link-line">
                View all concepts <Icon name="arrow" size={16} />
              </Link>
            </Reveal>
          </div>
          <div className="mt-16 lg:mt-24">
            <ProjectMosaic />
          </div>
        </div>
      </section>

      {/* 3. Services */}
      <section className="py-24 lg:py-36" aria-labelledby="services-title">
        <div className="wrap">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
            <SectionHeading
              className="lg:col-span-8"
              eyebrow="Services"
              title={<span id="services-title">Everything your home needs, under one roof.</span>}
              intro="From complete A to Z flat interiors to a single kitchen or wardrobe, every service is designed and executed by one coordinated team."
            />
            <Reveal className="lg:col-span-4 lg:justify-self-end">
              <Link to="/services" className="link-line">
                Explore services <Icon name="arrow" size={16} />
              </Link>
            </Reveal>
          </div>
          <div className="mt-14 lg:mt-20">
            <ServiceAccordion />
          </div>
        </div>
      </section>

      {/* 4. Before / After */}
      <section className="overflow-hidden bg-charcoal py-24 text-ivory lg:py-32" aria-labelledby="transform-title">
        <div className="wrap grid gap-14 lg:grid-cols-12 lg:items-center lg:gap-10">
          <div className="lg:col-span-5">
            <SectionHeading tone="dark" eyebrow="Transformation" title={<span id="transform-title">From Empty Spaces to Extraordinary Homes.</span>} />
            <Reveal className="mt-8 max-w-md">
              <p className="text-[16px] leading-relaxed text-ivory/70">
                A bare concrete shell becomes a warm, layered living room: false ceiling with cove light, panelled TV wall, marble finish flooring and
                tailored seating. Drag the divider, or focus it and use your arrow keys, to compare.
              </p>
              <p className="mt-6 inline-flex items-center gap-2 text-[10.5px] font-semibold uppercase tracking-[0.22em] text-champagne">
                <span className="h-1.5 w-1.5 rotate-45 bg-gold" aria-hidden="true" />
                Illustrative transformation preview
              </p>
              <ul className="mt-10 grid grid-cols-2 gap-px border-y border-ivory/15 text-[14px] text-ivory/75">
                {['Ceiling & lighting', 'Wall panelling', 'Flooring & finishes', 'Furniture & styling'].map((t) => (
                  <li key={t} className="flex items-center gap-2 py-3">
                    <Icon name="check" size={16} className="text-champagne" /> {t}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
          <Reveal className="mx-auto w-full max-w-[560px] lg:col-span-6 lg:col-start-7 lg:max-w-none">
            <BeforeAfter />
          </Reveal>
        </div>
      </section>

      {/* 5. Process */}
      <section className="py-24 lg:py-36" aria-labelledby="process-title">
        <div className="wrap">
          <SectionHeading
            eyebrow="Our Process"
            title={<span id="process-title">A clear path from first conversation to final handover.</span>}
          />
          <div className="mt-16 lg:mt-24">
            <ProcessSteps />
          </div>
        </div>
      </section>

      {/* 6. Why */}
      <section className="bg-sand py-24 lg:py-36" aria-labelledby="why-title">
        <div className="wrap grid gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-32">
              <SectionHeading eyebrow="Why Dreamy Interiors" title={<span id="why-title">Designed Around You. Crafted to Last.</span>} />
              <Reveal className="mt-10">
                <ButtonLink to="/about" variant="ghost-dark" icon="arrow">Our Approach</ButtonLink>
              </Reveal>
            </div>
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            <WhyGrid />
          </div>
        </div>
      </section>

      {/* 7. Stories (honest empty state) */}
      <section className="py-24 lg:py-32">
        <div className="wrap">
          <StoriesEmpty />
        </div>
      </section>

      {/* 8. Consultation */}
      <ConsultationSection />

      {/* 9. Instagram */}
      <section className="py-24 lg:py-32" aria-labelledby="ig-title">
        <div className="wrap">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading eyebrow={site.instagramHandle} title={<span id="ig-title">Follow Our Design Journey.</span>} />
            <Reveal>
              <ButtonLink to={site.instagramUrl} variant="dark" icon="instagram">Explore Us on Instagram</ButtonLink>
            </Reveal>
          </div>
          <div className="mt-14">
            <InstagramGrid />
          </div>
        </div>
      </section>

      {/* 10. Contact */}
      <section className="bg-sand py-24 lg:py-32" aria-labelledby="contact-title">
        <div className="wrap grid gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="Contact"
              title={<span id="contact-title">Serving homes across Assam.</span>}
              intro="We work with homeowners in Guwahati, Nagaon and Tezpur. Call, message on WhatsApp or send an enquiry, and we will arrange a consultation."
            />
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <ContactLines />
          </div>
        </div>
        <div className="wrap mt-16">
          <LocationCards />
        </div>
      </section>
    </>
  )
}
