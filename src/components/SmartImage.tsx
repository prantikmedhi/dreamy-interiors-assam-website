import { useEffect, useRef, useState } from 'react'
import { images, type ImageAsset, type ImageKey } from '../data/images'

interface Props {
  image: ImageKey | ImageAsset
  focus?: string
  sizes?: string
  priority?: boolean
  alt?: string
  className?: string
  imgClassName?: string
}

// Fills its (positioned) parent. Falls back to a quiet material tone when a photograph
// is missing or fails to load, so layouts never show a broken image.
export function SmartImage({ image, focus = '50% 50%', sizes = '100vw', priority, alt, className = '', imgClassName = '' }: Props) {
  const asset = typeof image === 'string' ? images[image] : image
  const [failed, setFailed] = useState(false)
  const ref = useRef<HTMLImageElement>(null)

  // An error can fire before hydration attaches onError; check once on mount.
  useEffect(() => {
    const img = ref.current
    if (img && img.complete && img.naturalWidth === 0) setFailed(true)
  }, [])

  const show = asset.available && !failed
  const srcSet = asset.variants.length
    ? [...asset.variants.map((v) => `${v.src} ${v.width}w`), `${asset.src} ${asset.width}w`].join(', ')
    : undefined

  return (
    <div className={`tone absolute inset-0 overflow-hidden ${className}`} role={show ? undefined : 'img'} aria-label={show ? undefined : (alt ?? asset.alt)}>
      {show && (
        <img
          ref={ref}
          src={asset.src}
          srcSet={srcSet}
          sizes={srcSet ? sizes : undefined}
          width={asset.width}
          height={asset.height}
          alt={alt ?? asset.alt}
          loading={priority ? 'eager' : 'lazy'}
          fetchPriority={priority ? 'high' : 'auto'}
          decoding={priority ? 'sync' : 'async'}
          onError={() => setFailed(true)}
          className={`h-full w-full object-cover ${imgClassName}`}
          style={{ objectPosition: focus }}
        />
      )}
    </div>
  )
}
