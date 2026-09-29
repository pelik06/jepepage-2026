import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowIcon } from '../components/icons'
import { site } from '../content/site'
import { heroCopy } from '../content/home'
import { Moon, Clouds, Landscape } from '../components/sky'
import { Polaroid, Reveal, Lightbox } from '../components/media'
import heroImg from '../assets/img/hero-couple-me.jpeg'
import { usePageTitle } from '../hooks/usePageMeta'
import { prefersReducedMotion } from '../hooks/usePrefersReducedMotion'

/**
 * Landing page with full-width assets & layered parallax:
 *  - hero assets: moon (slowest), clouds, centered text, full-width landscape (fastest)
 *  - scroll-linked reveal & parallax for the picture in the note section
 *  - pointer parallax: gentle depth on fine pointers (desktop), disabled on touch
 * Both are rAF-throttled and respect prefers-reduced-motion.
 */
export default function Home() {
  usePageTitle('')
  const salutation = site.herName ? `My ${site.herName}` : 'My Love'
  const heroRef = useRef(null)
  const noteRef = useRef(null)
  const photoParallaxRef = useRef(null)
  const [photoVisible, setPhotoVisible] = useState(false)
  const [lightboxOpen, setLightboxOpen] = useState(false)

  const scrollToNote = () => {
    noteRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    const hero = heroRef.current
    const reduced = prefersReducedMotion()
    if (reduced) {
      setPhotoVisible(true)
      return
    }

    const layers = [
      { sel: '.px-moon', scroll: 0.16, mouse: 14 },
      { sel: '.px-clouds', scroll: 0.10, mouse: 8 },
      { sel: '.px-text', scroll: 0.24, mouse: -6 },
      { sel: '.px-landscape', scroll: 0.44, mouse: 0 },
    ]
    const nodes = layers
      .map((l) => ({ ...l, el: hero?.querySelector(l.sel) }))
      .filter((l) => l.el)

    let ticking = false
    let lastScroll = window.scrollY
    let mx = 0
    let my = 0

    const apply = () => {
      ticking = false

      // Hero parallax layers
      for (const l of nodes) {
        const sy = lastScroll * l.scroll
        const tx = mx * l.mouse
        const ty = my * l.mouse * 0.6
        l.el.style.transform = `translate3d(${tx.toFixed(1)}px, ${(sy + ty).toFixed(1)}px, 0)`
      }

      // Hero text & cue fade on scroll
      const textEl = hero?.querySelector('.px-text')
      if (textEl) {
        const textFade = Math.max(0, 1 - lastScroll / 380)
        textEl.style.opacity = textFade.toFixed(2)
      }
      const cue = hero?.querySelector('.px-cue')
      if (cue) {
        cue.style.opacity = String(Math.max(0, 1 - lastScroll / 180))
      }

      // Note section picture appearance & subtle parallax float
      const noteEl = noteRef.current
      const photoEl = photoParallaxRef.current
      if (noteEl) {
        const rect = noteEl.getBoundingClientRect()
        const vh = window.innerHeight || 800
        // Picture appearance when scrolling down near note section
        if (rect.top < vh * 0.84) {
          setPhotoVisible(true)
        }
        // Parallax depth for the picture once it's in view
        if (photoEl && rect.top < vh && rect.bottom > 0) {
          const progress = (vh - rect.top) / (vh + rect.height)
          const pty = (progress - 0.5) * -36
          photoEl.style.setProperty('--photo-pty', `${pty.toFixed(1)}px`)
        }
      }
    }

    const onScroll = () => {
      lastScroll = window.scrollY
      if (!ticking) {
        ticking = true
        requestAnimationFrame(apply)
      }
    }

    const onPointer = (e) => {
      if (!hero) return
      const r = hero.getBoundingClientRect()
      const nx = (e.clientX - r.left) / r.width - 0.5
      const ny = (e.clientY - r.top) / r.height - 0.5
      mx = Math.max(-0.5, Math.min(0.5, nx))
      my = Math.max(-0.5, Math.min(0.5, ny))
      if (!ticking) {
        ticking = true
        requestAnimationFrame(apply)
      }
    }

    // Pointer parallax only for fine pointers (mouse/trackpad), not touch
    let pointerBound = false
    try {
      if (window.matchMedia && window.matchMedia('(pointer: fine)').matches) {
        window.addEventListener('pointermove', onPointer, { passive: true })
        pointerBound = true
      }
    } catch {
      /* matchMedia unavailable — scroll parallax still works */
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    apply()

    return () => {
      window.removeEventListener('scroll', onScroll)
      if (pointerBound) window.removeEventListener('pointermove', onPointer)
    }
  }, [])

  return (
    <>
      <section className="hero hero-full" ref={heroRef} aria-label="Welcome">
        <Moon style={{ top: '14%', right: 'clamp(24px, 8vw, 120px)' }} extraClass="px-moon" />
        <div className="px-clouds" style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none', width: '100%', overflow: 'hidden' }}>
          <Clouds />
        </div>

        <div className="hero-center px-text will-change">
          <p className="hero-date rise-item" style={{ '--stagger': '0s' }}>
            {site.dateLabel}
          </p>
          <h1 className="hero-title rise-item" style={{ '--stagger': '0.12s' }}>
            Happy Birthday,
            <span className="hero-script grad-text">{salutation}</span>
          </h1>
          <p className="hero-sub rise-item" style={{ '--stagger': '0.26s' }}>
            {heroCopy.subtitle}
          </p>
          <button
            type="button"
            onClick={scrollToNote}
            className="scroll-cue px-cue rise-item"
            style={{ '--stagger': '0.4s' }}
            aria-label="Scroll to explore"
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M12 4v15M6 13l6 6 6-6" />
            </svg>
            explore
          </button>
        </div>

        <div className="px-landscape will-change" style={{ position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none', width: '100%', overflow: 'hidden' }}>
          <Landscape />
        </div>
      </section>

      <section id="note-section" className="note-section" ref={noteRef} aria-label="A note from me">
        <div className="page-inner">
          <div className="note-grid">
            <div
              ref={photoParallaxRef}
              className={`note-photo-wrap note-photo-parallax px-photo${photoVisible ? ' is-appeared' : ''}`}
            >
              <Polaroid
                src={heroImg}
                alt="A couple standing together under a starry night sky above a lake and distant city lights"
                caption={heroCopy.photoCaption}
                rotation={-2.4}
                size={330}
                onOpen={() => setLightboxOpen(true)}
              />
            </div>
            <Reveal className="note-copy" delay={0.15}>
              <p className="hand">{heroCopy.handwritten}</p>
              <p>{heroCopy.paragraph}</p>
              <p>{heroCopy.paragraph2}</p>
            </Reveal>
          </div>

          <Reveal className="note-cta" delay={0.25}>
            <Link to="/open-when" className="btn hero-btn">
              Begin the journey
              <ArrowIcon />
            </Link>
          </Reveal>
        </div>
      </section>

      {lightboxOpen && (
        <Lightbox
          item={{
            src: heroImg,
            alt: 'A couple standing together under a starry night sky above a lake and distant city lights',
            caption: heroCopy.photoCaption,
          }}
          onClose={() => setLightboxOpen(false)}
        />
      )}
    </>
  )
}
