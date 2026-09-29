import { Link } from 'react-router-dom'
import { HeartFill } from '../components/icons'
import { openWhenIntro, openWhenMessages } from '../content/openWhen'
import { usePageTitle } from '../hooks/usePageMeta'
import { Reveal } from '../components/media'

const icons = {
  Heart: HeartFill,
}

export default function OpenWhen() {
  usePageTitle('Open When...')

  return (
    <div className="page-inner">
      <header className="page-head">
        <h1 className="section-title fade-item" style={{ '--stagger': '0s' }}>
          {openWhenIntro.title}
        </h1>
        <p className="script-sub fade-item" style={{ '--stagger': '0.12s' }}>
          {openWhenIntro.subtitle}
        </p>
        <div className="fade-item" style={{ '--stagger': '0.3s' }}>
          <HeartFill className="heart-divider" aria-hidden="true" />
        </div>
      </header>

      <section className="openwhen-section" aria-label="Envelopes">
        <div className="envelope-grid">
          {openWhenMessages.map((env, i) => {
            const Icon = icons[env.icon] || HeartFill
            const locked = !!env.locked
            return (
              <Reveal key={env.id} delay={(i % 3) * 0.1} style={{ '--tint': env.tint }}>
                <Link
                  to={`/open-when/${env.id}`}
                  className={`env-card${locked ? ' is-gold' : ''}`}
                  style={{ display: 'block', height: '100%', color: 'inherit' }}
                  aria-label={`${env.eyebrow} ${env.title}${locked ? ' (waiting for your day)' : ''}`}
                >
                  <span className="env-flap" aria-hidden="true" />
                  <span className="env-body">
                    <span className="env-icon">
                      <Icon />
                    </span>
                    <span className="env-eyebrow">{env.eyebrow}</span>
                    <span className="env-title">{env.title}</span>
                    <span className="env-hint" aria-hidden="true">
                      {locked ? 'waiting for your day' : 'tap to open'}
                    </span>
                  </span>
                </Link>
              </Reveal>
            )
          })}
        </div>

        <Reveal className="openwhen-note" delay={0.1}>
          <p className="hand">{openWhenIntro.note}</p>
        </Reveal>
      </section>
    </div>
  )
}
