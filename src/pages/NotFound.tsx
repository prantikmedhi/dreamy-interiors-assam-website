import { Link } from 'react-router'
import { Icon } from '../components/Icon'
import { ButtonLink } from '../components/ui'
import { projects } from '../data/projects'

export default function NotFound() {
  return (
    <section className="flex min-h-[88svh] items-center pb-20 pt-36">
      <div className="wrap grid gap-14 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-7">
          <p className="eyebrow text-ink-soft">Error 404</p>
          <h1 className="display mt-6 text-[3rem] sm:text-[4.4rem] lg:text-[5.4rem]">This room has not been designed yet.</h1>
          <p className="mt-6 max-w-lg text-[17px] leading-relaxed text-ink-soft">
            The page you are looking for may have moved or never existed. Let us show you somewhere more beautiful.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <ButtonLink to="/" variant="dark">Return Home</ButtonLink>
            <ButtonLink to="/projects" variant="ghost-dark">Explore Our Projects</ButtonLink>
          </div>
        </div>
        <nav aria-label="Concepts" className="lg:col-span-4 lg:col-start-9">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-gold-ink">Explore a concept</p>
          <ul className="mt-4 border-t border-charcoal/15">
            {projects.map((p) => (
              <li key={p.slug} className="border-b border-charcoal/15">
                <Link to={`/projects/${p.slug}`} className="flex items-center justify-between py-3.5 text-[15px] hover:text-gold-ink">
                  {p.title} <Icon name="arrow" size={16} />
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </section>
  )
}
