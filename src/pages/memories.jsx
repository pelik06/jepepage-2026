import { useState } from 'react'
import { memoriesIntro, memories } from '../content/memories'
import { Polaroid, Reveal, Lightbox } from '../components/media'
import { usePageTitle } from '../hooks/usePageMeta'

export default function Memories() {
  usePageTitle('Memories')
  const [zoom, setZoom] = useState(null)

  return (
    <div className="page-inner">
      <header className="page-head">
        <h1 className="section-title fade-item" style={{ '--stagger': '0s' }}>
          {memoriesIntro.title}
        </h1>
        <p className="script-sub fade-item" style={{ '--stagger': '0.12s' }}>
          {memoriesIntro.subtitle}
        </p>
      </header>

      <section className="memories-cloud" aria-label="Photo memories">
        {memories.map((m, i) => (
          <Reveal key={m.id} delay={i * 0.08}>
            <Polaroid
              src={m.src}
              alt={m.alt}
              caption={m.caption}
              rotation={m.rotation}
              size={m.size}
              onOpen={() => setZoom(m)}
            />
          </Reveal>
        ))}
      </section>

      <Reveal className="memories-quote" delay={0.1}>
        <p className="hand">“{memoriesIntro.quote}”</p>
      </Reveal>

      <Lightbox item={zoom} onClose={() => setZoom(null)} />
    </div>
  )
}
