import { PageHero } from '../components/PageHero'
import { ProjectMosaic } from '../components/ProjectMosaic'
import { Reveal } from '../components/Reveal'
import { CtaBand } from '../components/sections'
import { ConceptLabel } from '../components/ui'

export default function Projects() {
  return (
    <>
      <PageHero
        image="apartment4bhk"
        eyebrow="Signature Projects"
        title="Illustrative interior concepts."
        intro="Six design directions for living rooms, bedrooms, kitchens and complete homes, showing the planning, materials and detailing we bring to every project."
        aside={<ConceptLabel />}
      />

      <section className="py-20 lg:py-32">
        <div className="wrap">
          <Reveal className="mb-16 grid gap-6 border-b border-charcoal/15 pb-10 lg:mb-24 lg:grid-cols-12">
            <p className="eyebrow text-ink-soft lg:col-span-3">About these concepts</p>
            <p className="max-w-2xl text-[16px] leading-relaxed text-ink-soft lg:col-span-8 lg:col-start-5">
              These are illustrative concepts created to show our design approach. They are not photographs of completed client homes. Authorised
              project photography will be added here as homeowners agree to share their spaces.
            </p>
          </Reveal>
          <ProjectMosaic />
        </div>
      </section>

      <CtaBand title="Imagine this for your home." />
    </>
  )
}
