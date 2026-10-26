import { useRef, useState } from 'react'
import type { GalleryItem } from '../data/projects'
import { images } from '../data/images'
import { Icon } from './Icon'
import { Reveal } from './Reveal'
import { SmartImage } from './SmartImage'

// Alternating wide and portrait crops; native <dialog> lightbox with arrow key navigation.
const cells = [
  { span: 'md:col-span-12', aspect: 'aspect-[4/3] md:aspect-[16/8]' },
  { span: 'md:col-span-5', aspect: 'aspect-[4/5] md:aspect-[5/6]' },
  { span: 'md:col-span-7', aspect: 'aspect-[4/5] md:aspect-[7/6]' },
  { span: 'md:col-span-12', aspect: 'aspect-[4/3] md:aspect-[16/8]' },
]

export function ProjectGallery({ items, title }: { items: GalleryItem[]; title: string }) {
  const dialog = useRef<HTMLDialogElement>(null)
  const [index, setIndex] = useState(0)
  const open = (i: number) => {
    setIndex(i)
    dialog.current?.showModal()
  }
  const step = (d: number) => setIndex((i) => (i + d + items.length) % items.length)
  const current = items[index]

  return (
    <>
      <ul className="grid gap-4 md:grid-cols-12 md:gap-6">
        {items.map((item, i) => (
          <Reveal as="li" key={i} delay={(i % 2) * 100} className={cells[i % cells.length].span}>
            <button
              type="button"
              onClick={() => open(i)}
              className={`zoom group relative block w-full overflow-hidden text-left ${cells[i % cells.length].aspect}`}
              aria-label={`Open image ${i + 1} of ${items.length}: ${item.caption}`}
            >
              <SmartImage image={item.image} focus={item.focus} sizes="(min-width: 768px) 60vw, 100vw" alt={item.caption} />
              <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 bg-gradient-to-t from-charcoal/70 to-transparent p-4 pt-16 text-ivory sm:p-6 sm:pt-20">
                <span className="text-[14px] leading-snug">{item.caption}</span>
                <Icon name="expand" size={20} className="shrink-0 opacity-80 transition-opacity group-hover:opacity-100" />
              </span>
            </button>
          </Reveal>
        ))}
      </ul>

      <dialog
        ref={dialog}
        aria-label={`${title} gallery`}
        className="m-0 h-[100dvh] max-h-none w-full max-w-none bg-transparent p-0 text-ivory backdrop:bg-charcoal/95"
        onKeyDown={(e) => {
          if (e.key === 'ArrowRight') step(1)
          if (e.key === 'ArrowLeft') step(-1)
        }}
        onClick={(e) => e.target === e.currentTarget && dialog.current?.close()}
      >
        <div className="flex h-full flex-col" onClick={(e) => e.target === e.currentTarget && dialog.current?.close()}>
          <div className="wrap flex h-[72px] shrink-0 items-center justify-between">
            <span className="text-[12px] font-semibold uppercase tracking-[0.2em] text-champagne">
              {index + 1} / {items.length}
            </span>
            <button type="button" autoFocus className="-mr-2 flex h-12 w-12 items-center justify-center" aria-label="Close gallery" onClick={() => dialog.current?.close()}>
              <Icon name="close" size={26} />
            </button>
          </div>
          <figure className="wrap flex min-h-0 flex-1 flex-col items-center justify-center gap-5 pb-6">
            <div className="relative min-h-0 w-full flex-1">
              {images[current.image].available ? (
                <img
                  key={index}
                  src={images[current.image].src}
                  alt={current.caption}
                  className="absolute inset-0 h-full w-full object-contain"
                  style={{ objectPosition: 'center' }}
                />
              ) : (
                <SmartImage image={current.image} alt={current.caption} />
              )}
            </div>
            <figcaption className="text-center text-[14px] text-ivory/75">
              {current.caption} <span className="text-ivory/65">· Illustrative concept</span>
            </figcaption>
          </figure>
          <div className="wrap flex shrink-0 justify-center gap-3 pb-8">
            <button type="button" className="flex h-12 w-12 items-center justify-center border border-ivory/30 hover:border-ivory" aria-label="Previous image" onClick={() => step(-1)}>
              <Icon name="arrowLeft" size={20} />
            </button>
            <button type="button" className="flex h-12 w-12 items-center justify-center border border-ivory/30 hover:border-ivory" aria-label="Next image" onClick={() => step(1)}>
              <Icon name="arrow" size={20} />
            </button>
          </div>
        </div>
      </dialog>
    </>
  )
}
