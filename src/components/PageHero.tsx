import type { ReactNode } from 'react'
import type { ImageKey } from '../data/images'
import { SmartImage } from './SmartImage'

interface Props {
  image: ImageKey
  focus?: string
  eyebrow: string
  title: ReactNode
  intro?: ReactNode
  children?: ReactNode
  aside?: ReactNode
}

// Image-led page opener shared by every inner page.
export function PageHero({ image, focus, eyebrow, title, intro, children, aside }: Props) {
  return (
    <section className="relative flex min-h-[78svh] items-end overflow-hidden bg-charcoal text-ivory lg:min-h-[86svh]">
      <SmartImage image={image} focus={focus} priority />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgb(32_32_30/0.45)_0%,rgb(32_32_30/0.15)_35%,rgb(32_32_30/0.8)_100%)]" aria-hidden="true" />
      <div className="wrap relative grid gap-10 pb-14 pt-32 lg:grid-cols-12 lg:items-end lg:pb-20">
        <div className="lg:col-span-8">
          <p className="eyebrow text-champagne">{eyebrow}</p>
          <h1 className="display mt-6 text-[2.9rem] sm:text-[4rem] lg:text-[5.4rem]">{title}</h1>
          {intro && <div className="mt-6 max-w-xl text-[17px] leading-relaxed text-ivory/80">{intro}</div>}
          {children && <div className="mt-9 flex flex-wrap gap-3">{children}</div>}
        </div>
        {aside && <div className="lg:col-span-4 lg:justify-self-end">{aside}</div>}
      </div>
    </section>
  )
}
