import { Link } from 'react-router'
import { logo } from '../data/images'
import { site } from '../data/site'

// Renders the supplied circular logo unchanged. If the file is not present yet,
// a plain typographic name is shown instead of an imitation of the mark.
export function Logo({ tone = 'light', size = 52, showName = true }: { tone?: 'light' | 'dark'; size?: number; showName?: boolean }) {
  const text = tone === 'light' ? 'text-ivory' : 'text-charcoal'
  return (
    <Link to="/" className={`group flex items-center gap-3 ${text}`} aria-label={`${site.fullName}, home`}>
      {logo.available && (
        <img
          src={logo.src}
          width={size}
          height={size}
          alt=""
          className="shrink-0 rounded-full bg-ivory object-contain"
          style={{ width: size, height: size }}
        />
      )}
      {(showName || !logo.available) && (
        <span className="flex flex-col leading-none">
          <span className="font-display text-[1.45rem] font-medium tracking-[0.01em]">Dreamy Interiors</span>
          <span className="mt-1 text-[9.5px] font-semibold uppercase tracking-[0.28em] opacity-75">& Construction, Assam</span>
        </span>
      )}
    </Link>
  )
}
