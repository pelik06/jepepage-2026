import { mainLetter } from '../content/letter'
import { usePageTitle } from '../hooks/usepagemeta'

export default function Letter() {
  usePageTitle('A Letter')

  return (
    <div className="page-inner">
      <header className="page-head">
        <h1 className="section-title fade-item" style={{ '--stagger': '0s' }}>
          A Letter For You
        </h1>
        <p className="script-sub fade-item" style={{ '--stagger': '0.12s' }}>
          take your time — I mean every line
        </p>
      </header>

      <div className="main-letter-wrap">
        <article className="paper fade-item" style={{ '--stagger': '0.2s' }}>
          <div className="paper-inner">
            <p className="p-salutation">{mainLetter.salutation}</p>
            <div className="p-body">
              {mainLetter.paragraphs.slice(0, 2).map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
            <figure className="polaroid p-photo" style={{ '--rot': '-2.2deg', '--w': '280px' }}>
              <span className="tape" aria-hidden="true" />
              {mainLetter.video ? (
                <video
                  className="p-img p-video"
                  src={mainLetter.video}
                  playsInline
                  autoPlay
                  muted
                  loop
                  controls
                  style={{ width: '100%', height: 'auto', aspectRatio: '720 / 480', objectFit: 'cover' }}
                />
              ) : (
                <img className="p-img" src={mainLetter.photo} alt={mainLetter.photoAlt} loading="lazy" decoding="async" width="250" height="250" />
              )}
              <figcaption>{mainLetter.photoCaption}</figcaption>
            </figure>
            <div className="p-body">
              {mainLetter.paragraphs.slice(2).map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
            <p className="p-sign" style={{ textAlign: 'center', fontSize: 'clamp(24px, 3vw, 30px)' }}>
              {mainLetter.closing}
            </p>
            <p className="p-sign">— {mainLetter.signature}</p>
            <p className="p-ps">{mainLetter.ps}</p>
          </div>
        </article>
      </div>
    </div>
  )
}
