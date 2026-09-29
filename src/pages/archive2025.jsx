import { Link } from 'react-router-dom'
import { archive2025 } from '../content/archive'
import { Polaroid, Reveal } from '../components/media'
import { usePageTitle } from '../hooks/usepagemeta'

export default function Archive2025() {
  usePageTitle('2025 · Archive')

  return (
    <div className="page-inner">
      <header className="page-head">
        <p className="eyebrow fade-item" style={{ '--stagger': '0s' }}>
          {archive2025.kicker} · {archive2025.year}
        </p>
        <h1 className="section-title fade-item" style={{ '--stagger': '0.1s' }}>
          {archive2025.title}
        </h1>
      </header>

      <div className="archive-wrap">
        <Reveal className="archive-chapters" delay={0}>
          <div className="archive-chapter">
            <span className="archive-star lit" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2c.9 5.2 4.8 9.1 10 10-5.2.9-9.1 4.8-10 10-.9-5.2-4.8-9.1-10-10 5.2-.9 9.1-4.8 10-10z" /></svg>
            </span>
            <span className="archive-year now">{archive2025.year}</span>
          </div>
          <span className="archive-connector" aria-hidden="true" />
          <div className="archive-chapter">
            <span className="archive-star lit" aria-hidden="true" style={{ color: 'var(--gold)', borderColor: 'rgba(247,208,138,0.4)', boxShadow: '0 0 26px rgba(247,208,138,0.25)' }}>
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2c.9 5.2 4.8 9.1 10 10-5.2.9-9.1 4.8-10 10-.9-5.2-4.8-9.1-10-10 5.2-.9 9.1-4.8 10-10z" /></svg>
            </span>
            <span className="archive-year now">2026 · you are here</span>
          </div>
        </Reveal>

        <Reveal className="archive-photo" delay={0.1}>
          <Polaroid
            src={archive2025.photo}
            alt={archive2025.photoAlt}
            caption={archive2025.photoCaption}
            rotation={2.6}
            size={280}
          />
        </Reveal>

        <Reveal className="archive-note" delay={0.15}>
          {archive2025.paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
          <p className="hand">“{archive2025.note}”</p>
        </Reveal>

        <Reveal delay={0.2}>
          <Link to="/" className="btn">
            Continue to 2026
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </Link>
        </Reveal>
      </div>
    </div>
  )
}
