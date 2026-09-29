import { useEffect, useRef, useState } from 'react'
import { useInViewOnce } from '../hooks/useinviewonce'
import { CloseIcon as X } from './icons'

/**
 * Polaroid photo with handwritten caption, tape strip and gentle rotation.
 */
export function Polaroid({ src, alt, caption, rotation = 0, size = 240, tape = true, className = '', onOpen }) {
  return (
    <figure
      className={`polaroid ${className}`}
      style={{ '--rot': `${rotation}deg`, '--w': `${size}px` }}
    >
      {tape && <span className="tape" aria-hidden="true" />}
      <button
        type="button"
        onClick={onOpen}
        disabled={!onOpen}
        style={{ display: 'block', cursor: onOpen ? 'zoom-in' : 'default', borderRadius: 4 }}
        aria-label={onOpen ? `View larger: ${caption || alt}` : undefined}
      >
        <img className="p-img" src={src} alt={alt} loading="lazy" decoding="async" width={size} height={size} />
      </button>
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  )
}

/** Scroll-reveal wrapper — adds .revealed when entering the viewport. */
export function Reveal({ children, delay = 0, className = '', as: Tag = 'div', ...rest }) {
  const [ref, inView] = useInViewOnce()
  return (
    <Tag
      ref={ref}
      className={`${className} reveal${inView ? ' revealed' : ''}`}
      style={{ '--reveal-delay': `${delay}s` }}
      {...rest}
    >
      {children}
    </Tag>
  )
}

/** Simple, accessible image lightbox. */
export function Lightbox({ item, onClose }) {
  const closeRef = useRef(null)

  useEffect(() => {
    if (!item) return
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    closeRef.current?.focus()
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [item, onClose])

  if (!item) return null

  return (
    <div
      className="lightbox"
      role="dialog"
      aria-modal="true"
      aria-label={item.caption || 'Photo'}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <figure>
        <div className="polaroid">
          <img className="p-img" src={item.src} alt={item.alt} />
          {item.caption && <figcaption>{item.caption}</figcaption>}
        </div>
      </figure>
      <button type="button" ref={closeRef} className="icon-btn lightbox-close" onClick={onClose} aria-label="Close photo">
        <X />
      </button>
    </div>
  )
}
