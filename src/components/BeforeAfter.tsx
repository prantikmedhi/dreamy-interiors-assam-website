import { useRef, useState, type PointerEvent } from 'react'
import { SmartImage } from './SmartImage'

// Comparison slider. A native range input provides keyboard and assistive tech support;
// pointer handlers on the frame give direct drag on mouse and touch.
export function BeforeAfter() {
  const [pos, setPos] = useState(50)
  const frame = useRef<HTMLDivElement>(null)
  const dragging = useRef(false)

  const fromPointer = (e: PointerEvent) => {
    const rect = frame.current!.getBoundingClientRect()
    setPos(Math.round(Math.min(100, Math.max(0, ((e.clientX - rect.left) / rect.width) * 100))))
  }

  return (
    <div className="relative">
      <div
        ref={frame}
        className="group relative aspect-[3/4] cursor-ew-resize touch-pan-y select-none overflow-hidden"
        onPointerDown={(e) => {
          dragging.current = true
          e.currentTarget.setPointerCapture(e.pointerId)
          fromPointer(e)
        }}
        onPointerMove={(e) => dragging.current && fromPointer(e)}
        onPointerUp={() => (dragging.current = false)}
        onPointerCancel={() => (dragging.current = false)}
      >
        <SmartImage image="after" sizes="(min-width: 1024px) 45vw, 100vw" />
        <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
          <SmartImage image="before" sizes="(min-width: 1024px) 45vw, 100vw" />
        </div>

        <span className="pointer-events-none absolute left-4 top-4 bg-charcoal/80 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-ivory sm:left-6 sm:top-6">
          Before
        </span>
        <span className="pointer-events-none absolute right-4 top-4 bg-ivory/90 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-charcoal sm:right-6 sm:top-6">
          After
        </span>

        <div className="pointer-events-none absolute inset-y-0 w-px bg-ivory" style={{ left: `${pos}%` }} aria-hidden="true">
          <span className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-ivory bg-charcoal/55 text-ivory backdrop-blur-sm transition-shadow group-has-[input:focus-visible]:ring-2 group-has-[input:focus-visible]:ring-gold group-has-[input:focus-visible]:ring-offset-2">
            <svg width="26" height="14" viewBox="0 0 26 14" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
              <path d="M7 2 2 7l5 5M19 2l5 5-5 5" />
            </svg>
          </span>
        </div>

        <input
          type="range"
          min={0}
          max={100}
          step={1}
          value={pos}
          onChange={(e) => setPos(Number(e.target.value))}
          aria-label="Compare before and after. Use arrow keys to move the divider."
          aria-valuetext={`${pos}% before view, ${100 - pos}% after view`}
          className="pointer-events-none absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
        />
      </div>
    </div>
  )
}
