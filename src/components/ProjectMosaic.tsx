import { Link } from 'react-router'
import { projects } from '../data/projects'
import { Icon } from './Icon'
import { Reveal } from './Reveal'
import { SmartImage } from './SmartImage'

// Editorial, deliberately uneven placement. Index based so the six concepts keep their rhythm.
const layout = [
  { cell: 'lg:col-span-7', aspect: 'aspect-[4/5] lg:aspect-[7/6]' },
  { cell: 'lg:col-span-4 lg:col-start-9 lg:mt-40', aspect: 'aspect-[4/5]' },
  { cell: 'lg:col-span-4 lg:col-start-2', aspect: 'aspect-[4/5] lg:aspect-[3/4]' },
  { cell: 'lg:col-span-6 lg:col-start-7 lg:mt-24', aspect: 'aspect-[4/5] lg:aspect-[6/5]' },
  { cell: 'lg:col-span-6 lg:-mt-10', aspect: 'aspect-[4/5] lg:aspect-[6/5]' },
  { cell: 'lg:col-span-4 lg:col-start-9 lg:mt-28', aspect: 'aspect-[4/5]' },
]

export function ProjectMosaic() {
  return (
    <ul className="grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-12 lg:gap-y-24">
      {projects.map((p, i) => (
        <Reveal as="li" key={p.slug} className={layout[i].cell} delay={(i % 2) * 120}>
          <Link to={`/projects/${p.slug}`} className="zoom group block">
            <div className={`relative overflow-hidden ${layout[i].aspect}`}>
              <SmartImage image={p.cover} focus={p.coverFocus} sizes="(min-width: 1024px) 55vw, (min-width: 640px) 50vw, 100vw" />
              <span className="absolute left-4 top-4 bg-ivory/90 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-charcoal">
                {p.kicker}
              </span>
            </div>
            <div className="mt-5 flex items-start justify-between gap-6">
              <div>
                <h3 className="display text-[1.85rem] lg:text-[2.2rem]">{p.title}</h3>
                <p className="mt-2 max-w-md text-[15px] leading-relaxed text-ink-soft">{p.summary}</p>
              </div>
              <span className="mt-2 flex h-11 w-11 shrink-0 items-center justify-center border border-charcoal/20 transition-colors duration-300 group-hover:border-charcoal group-hover:bg-charcoal group-hover:text-ivory">
                <Icon name="arrow" size={18} />
                <span className="sr-only">View concept</span>
              </span>
            </div>
          </Link>
        </Reveal>
      ))}
    </ul>
  )
}
