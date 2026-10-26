import { Link, useParams } from 'react-router'
import { Icon } from '../components/Icon'
import { PageHero } from '../components/PageHero'
import { ProjectGallery } from '../components/ProjectGallery'
import { Reveal } from '../components/Reveal'
import { CtaBand } from '../components/sections'
import { SmartImage } from '../components/SmartImage'
import { ButtonLink, ConceptLabel } from '../components/ui'
import { findProject, projects } from '../data/projects'
import NotFound from './NotFound'

export default function ProjectDetail() {
  const { slug } = useParams()
  const project = findProject(slug)
  if (!project) return <NotFound />

  const i = projects.indexOf(project)
  const next = projects[(i + 1) % projects.length]
  const prev = projects[(i - 1 + projects.length) % projects.length]

  return (
    <>
      <PageHero image={project.cover} focus={project.coverFocus} eyebrow={project.kicker} title={project.title} intro={project.summary} aside={<ConceptLabel />}>
        <ButtonLink to="/contact#consultation" variant="gold">Book a Consultation</ButtonLink>
        <ButtonLink to="/projects" variant="ghost-light">All Concepts</ButtonLink>
      </PageHero>

      <nav aria-label="Breadcrumb" className="wrap pt-8 text-[12px] uppercase tracking-[0.16em] text-ink-soft">
        <ol className="flex flex-wrap gap-2">
          <li><Link to="/" className="hover:text-charcoal">Home</Link> /</li>
          <li><Link to="/projects" className="hover:text-charcoal">Projects</Link> /</li>
          <li aria-current="page" className="text-charcoal">{project.title}</li>
        </ol>
      </nav>

      <section className="py-16 lg:py-28">
        <div className="wrap grid gap-14 lg:grid-cols-12 lg:gap-10">
          <Reveal className="lg:col-span-6">
            <p className="eyebrow text-ink-soft">Design intent</p>
            <p className="display mt-6 text-[1.9rem] leading-[1.25] sm:text-[2.4rem]">{project.intent}</p>
          </Reveal>
          <Reveal delay={120} className="grid gap-10 sm:grid-cols-2 lg:col-span-5 lg:col-start-8 lg:grid-cols-1 lg:gap-12">
            <Spec title="Palette" items={project.palette} />
            <Spec title="Materials" items={project.materials} />
            <Spec title="Typical scope" items={project.scope} />
          </Reveal>
        </div>
      </section>

      <section className="pb-24 lg:pb-36" aria-labelledby="gallery-title">
        <div className="wrap">
          <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <h2 id="gallery-title" className="display text-[2.4rem] sm:text-[3rem]">Concept gallery</h2>
            <ConceptLabel tone="light" />
          </div>
          <ProjectGallery items={project.gallery} title={project.title} />
          <p className="mt-6 max-w-2xl text-[13px] leading-relaxed text-ink-soft">
            Illustrative imagery created to communicate a design direction. Not a photograph of a completed client home.
          </p>
        </div>
      </section>

      <nav aria-label="More concepts" className="border-t border-line">
        <div className="grid sm:grid-cols-2">
          {[
            { p: prev, label: 'Previous concept', icon: 'arrowLeft' as const },
            { p: next, label: 'Next concept', icon: 'arrow' as const },
          ].map(({ p, label, icon }, k) => (
            <Link
              key={label}
              to={`/projects/${p.slug}`}
              className={`zoom group relative flex min-h-56 items-end overflow-hidden bg-charcoal p-6 text-ivory sm:min-h-72 sm:p-10 ${k === 1 ? 'sm:justify-end sm:text-right' : ''}`}
            >
              <SmartImage image={p.cover} focus={p.coverFocus} sizes="50vw" className="opacity-60" />
              <span className="relative">
                <span className={`flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-champagne ${k === 1 ? 'sm:justify-end' : ''}`}>
                  {k === 0 && <Icon name={icon} size={16} />} {label} {k === 1 && <Icon name={icon} size={16} />}
                </span>
                <span className="display mt-2 block text-[2rem] sm:text-[2.4rem]">{p.title}</span>
              </span>
            </Link>
          ))}
        </div>
      </nav>

      <CtaBand title="Start your own concept." />
    </>
  )
}

function Spec({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h3 className="text-[11px] font-semibold uppercase tracking-[0.22em] text-gold-ink">{title}</h3>
      <ul className="mt-4 space-y-2 text-[16px]">
        {items.map((it) => (
          <li key={it} className="border-b border-charcoal/10 pb-2">{it}</li>
        ))}
      </ul>
    </div>
  )
}
