import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { envelopeIconMap, HeartFill } from './icons'
import { music } from '../lib/musicEngine'

/**
 * LetterPaper — the readable letter card, used by envelope letters and the main letter.
 */
export function LetterPaper({ letter, delayBase = 0, withAudio = true }) {
  const [on, setOn] = useState(false)

  useEffect(() => music.subscribe(setOn), [])

  const style = (i) => ({ '--stagger': `${delayBase + 0.35 + i * 0.18}s` })

  return (
    <article className="paper read-letter">
      <div className="paper-inner">
        <p className="p-salutation fade-item" style={style(0)}>{letter.salutation}</p>
        <div className="p-body">
          {letter.message.map((para, i) => (
            <p key={i} className="fade-item" style={style(i + 1)}>{para}</p>
          ))}
        </div>
        {letter.photo && (
          <figure className="polaroid p-photo fade-item" style={{ '--rot': '-2.2deg', '--w': '240px', '--stagger': `${delayBase + 0.9}s` }}>
            <span className="tape" aria-hidden="true" />
            <img className="p-img" src={letter.photo} alt={letter.photoAlt} loading="lazy" decoding="async" width="240" height="240" />
            <figcaption>{letter.photoCaption}</figcaption>
          </figure>
        )}
        <p className="p-sign fade-item" style={style(6)}>— {letter.signature}</p>
        {letter.ps && <p className="p-ps fade-item" style={style(7)}>{letter.ps}</p>}
        {withAudio && (
          <button
            type="button"
            className="audio-note fade-item"
            style={style(8)}
            aria-pressed={on}
            onClick={() => setOn(music.toggle())}
            title="A little message, made for this letter"
          >
            {on ? (
              <span className="eq" aria-hidden="true"><span /><span /><span /><span /></span>
            ) : (
              <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M9 18V5l10-2v13" />
                <circle cx="6.5" cy="18" r="2.5" />
                <circle cx="16.5" cy="16" r="2.5" />
              </svg>
            )}
            a little message for you...
          </button>
        )}
      </div>
    </article>
  )
}

/**
 * EnvelopeRitual — the tactile "opening an envelope" experience.
 * sealed → the envelope waits (glowing softly, seal in the middle)
 * opening → flap swings open, the paper rises out
 * read → the letter card takes over
 */
export function EnvelopeRitual({ letter, accent }) {
  const navigate = useNavigate()
  const [stage, setStage] = useState('sealed')

  useEffect(() => {
    setStage('sealed')
  }, [letter.id])

  const open = () => {
    if (stage !== 'sealed') return
    setStage('opening')
    setTimeout(() => setStage('read'), 1500)
  }

  const Icon = envelopeIconMap[letter.icon] || HeartFill

  if (stage === 'read') {
    return (
      <div className="ritual" style={{ '--tint': accent }} aria-live="polite">
        <div className="ritual-enter" style={{ width: '100%', display: 'grid', justifyItems: 'center' }}>
          <div style={{ width: 'min(680px, 100%)' }}>
            <LetterPaper letter={letter} />
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: 26 }}>
              <button type="button" className="btn-ghost" onClick={() => navigate('/open-when')}>
                <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M19 12H5M11 18l-6-6 6-6" />
                </svg>
                Back to Open When...
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="ritual" style={{ '--tint': accent }} aria-live="polite">
      <div
        className={`big-env${stage === 'opening' ? ' is-opening' : ''}`}
        role="button"
        tabIndex={0}
        aria-label={`Open the envelope: ${letter.eyebrow} ${letter.title}`}
        onClick={open}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            open()
          }
        }}
      >
        <div className="be-back" />
        <div className="be-letter" />
        <div className="be-front" />
        <div className="be-seal">
          <Icon />
        </div>
        <div className="be-flap" />
        {stage === 'sealed' && <span className="ritual-hint">tap the envelope</span>}
      </div>
    </div>
  )
}
