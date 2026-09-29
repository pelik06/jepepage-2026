import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { LockIcon, ArrowIcon, ReplayIcon } from '../components/icons'
import { surprise } from '../content/surprise'
import { site } from '../content/site'
import finaleImg from '../assets/img/finale.jpg'
import Fireworks from '../components/fireworks'
import { setSkyIntensified } from '../components/starfield'
import { music } from '../lib/musicEngine'
import { prefersReducedMotion } from '../hooks/useprefersreducedmotion'
import { usePageTitle } from '../hooks/usePageMeta'

export default function Surprise() {
  usePageTitle('Surprise')
  const [stage, setStage] = useState('sealed') // sealed → opening → revealed
  const timers = useRef([])

  useEffect(() => {
    return () => {
      timers.current.forEach(clearTimeout)
      setSkyIntensified(false)
    }
  }, [])

  const open = () => {
    if (stage !== 'sealed') return
    setStage('opening')
    music.chime()
    timers.current.push(setTimeout(() => {
      setStage('revealed')
      setSkyIntensified(true)
    }, prefersReducedMotion() ? 400 : 2100))
  }

  const replay = () => {
    setSkyIntensified(false)
    setStage('sealed')
  }

  const f = surprise.finale

  if (stage === 'revealed') {
    return (
      <div className="finale">
        <div className="finale-bg" style={{ backgroundImage: `url(${finaleImg})` }} aria-hidden="true" />
        <Fireworks active />

        <div className="finale-inner">
          <p className="finale-date fade-item" style={{ '--stagger': '0.3s' }}>
            {site.dateLabel}
          </p>
          <h1 className="finale-title fade-item" style={{ '--stagger': '0.55s' }}>
            {f.titleLine}
            <span className="finale-script grad-text">{f.scriptLine}</span>
          </h1>
          <div className="finale-lines fade-item" style={{ '--stagger': '0.95s' }}>
            {f.lines.map((l, i) => (
              <p key={i}>{l}</p>
            ))}
          </div>
          <p className="finale-love fade-item" style={{ '--stagger': '1.4s' }}>
            {f.loveLine}
          </p>

          <div className="finale-actions fade-item" style={{ '--stagger': '2s' }}>
            <button type="button" className="btn-ghost" onClick={replay}>
              <ReplayIcon />
              Once more
            </button>
            <Link to="/" className="btn">
              Back home
              <ArrowIcon />
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="surprise-stage" style={{ minHeight: '100dvh' }}>
      <div className="surprise-inner">
        <p className="surprise-kicker">{surprise.kicker}</p>
        <h1 className="surprise-title">{surprise.title}</h1>
        <p className="surprise-sub">{surprise.sub}</p>

        <button
          type="button"
          className="surprise-env-btn"
          onClick={open}
          disabled={stage === 'opening'}
          aria-label="Open the birthday envelope"
        >
          <span className="surprise-pulse" aria-hidden="true" />
          <span className={`surprise-env${stage === 'opening' ? ' is-opening' : ''}`} aria-hidden="true">
            <span className="se-flap" />
            <span className="se-seal">
              <LockIcon />
            </span>
          </span>
        </button>

        {stage === 'opening' && (
          <p className="surprise-sub fade-item" style={{ marginTop: 30 }} aria-live="polite">
            the stars are getting ready...
          </p>
        )}
      </div>
    </div>
  )
}
