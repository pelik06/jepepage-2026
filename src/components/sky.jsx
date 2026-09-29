import { prefersReducedMotion } from '../hooks/useprefersreducedmotion'

/* Crescent moon with a soft glow â€” pure CSS. */
export function Moon({ style, extraClass = '' }) {
  return (
    <div
      aria-hidden="true"
      className={`moon ${extraClass}`.trim()}
      style={{
        position: 'absolute',
        width: 92,
        height: 92,
        borderRadius: '50%',
        background: 'radial-gradient(circle at 38% 36%, #fffdf4 0%, #f6eccb 55%, #e8d9a8 100%)',
        boxShadow:
          '0 0 34px rgba(255, 246, 214, 0.5), 0 0 90px rgba(255, 236, 180, 0.22), inset -10px -8px 0 rgba(228, 214, 168, 0.55)',
        ...style,
      }}
    />
  )
}

/* Soft drifting clouds â€” blurred, almost subliminal. */
export function Clouds() {
  const reduced = prefersReducedMotion()
  const anim = reduced ? undefined : 'cloud-drift 90s ease-in-out infinite alternate'
  const anim2 = reduced ? undefined : 'cloud-drift 120s ease-in-out infinite alternate-reverse'
  return (
    <div aria-hidden="true" style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
      <style>{`@keyframes cloud-drift { from { transform: translateX(-4%) } to { transform: translateX(5%) } }`}</style>
      <div style={{
        position: 'absolute', top: '16%', left: '-6%', width: 'clamp(420px, 45vw, 720px)', height: 'clamp(140px, 16vh, 220px)',
        borderRadius: '50%', filter: 'blur(42px)', opacity: 0.16,
        background: 'radial-gradient(ellipse, #8f7cc9 0%, rgba(143,124,201,0) 70%)',
        animation: anim,
      }} />
      <div style={{
        position: 'absolute', top: '34%', right: '-8%', width: 'clamp(520px, 50vw, 820px)', height: 'clamp(160px, 18vh, 250px)',
        borderRadius: '50%', filter: 'blur(52px)', opacity: 0.14,
        background: 'radial-gradient(ellipse, #d88fb4 0%, rgba(216,143,180,0) 70%)',
        animation: anim2,
      }} />
      <div style={{
        position: 'absolute', top: '8%', left: '38%', width: 'clamp(360px, 38vw, 620px)', height: 'clamp(120px, 14vh, 190px)',
        borderRadius: '50%', filter: 'blur(46px)', opacity: 0.1,
        background: 'radial-gradient(ellipse, #6a5aa8 0%, rgba(106,90,168,0) 70%)',
        animation: anim,
      }} />
    </div>
  )
}

/*
 * Distant landscape: mountains, tiny city lights, a lake with shimmering
 * reflections — and two small silhouettes sitting together on the hill.
 * Inline SVG so it stays crisp and ships with the site.
 */
export function Landscape({ style }) {
  const cityLights = []
  const rand = (seed) => {
    // deterministic pseudo-random so SSR/dev/prod render identically
    let x = seed
    return () => {
      x = (x * 9301 + 49297) % 233280
      return x / 233280
    }
  }
  const r = rand(7)
  for (let i = 0; i < 34; i++) {
    cityLights.push({
      x: 3 + r() * 94,
      y: 61 + r() * 13,
      s: 0.7 + r() * 1.5,
      warm: r() < 0.75,
    })
  }

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 1200 320"
      preserveAspectRatio="xMidYMax slice"
      style={{ position: 'absolute', left: 0, right: 0, bottom: 0, width: '100%', height: 'clamp(220px, 34vh, 420px)', ...style }}
    >
      <defs>
        <linearGradient id="mtn-far" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#241b47" />
          <stop offset="1" stopColor="#1a1440" />
        </linearGradient>
        <linearGradient id="mtn-near" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#151132" />
          <stop offset="1" stopColor="#0e0c26" />
        </linearGradient>
        <linearGradient id="lake" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#120f30" />
          <stop offset="1" stopColor="#0b0a1f" />
        </linearGradient>
        <linearGradient id="haze" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f7a8b8" stopOpacity="0.16" />
          <stop offset="1" stopColor="#f7d08a" stopOpacity="0.05" />
        </linearGradient>
      </defs>

      {/* far mountains */}
      <path d="M0 210 L120 150 L230 200 L340 138 L470 205 L600 155 L720 208 L840 148 L960 200 L1080 155 L1200 205 L1200 320 L0 320 Z" fill="url(#mtn-far)" />
      {/* horizon haze */}
      <rect x="0" y="180" width="1200" height="70" fill="url(#haze)" />

      {/* city lights */}
      {cityLights.map((l, i) => (
        <circle key={i} cx={(l.x / 100) * 1200} cy={l.y * 3.2} r={l.s}
          fill={l.warm ? 'rgba(247, 208, 138, 0.8)' : 'rgba(184, 216, 248, 0.55)'} />
      ))}

      {/* near hill where the couple sits */}
      <path d="M0 262 Q180 216 360 246 Q560 280 760 250 Q980 218 1200 258 L1200 320 L0 320 Z" fill="url(#mtn-near)" />

      {/* lake */}
      <path d="M0 292 Q300 282 600 290 Q900 298 1200 288 L1200 320 L0 320 Z" fill="url(#lake)" />
      {/* shimmer */}
      <g stroke="rgba(242, 240, 255, 0.14)" strokeWidth="1.4" strokeLinecap="round">
        <line x1="220" y1="300" x2="268" y2="300" />
        <line x1="420" y1="306" x2="486" y2="306" />
        <line x1="660" y1="301" x2="700" y2="301" />
        <line x1="900" y1="308" x2="968" y2="308" />
        <line x1="1060" y1="299" x2="1096" y2="299" />
      </g>
      <g stroke="rgba(247, 208, 138, 0.2)" strokeWidth="1.4" strokeLinecap="round">
        <line x1="330" y1="303" x2="368" y2="303" />
        <line x1="780" y1="305" x2="826" y2="305" />
      </g>

      {/* the couple â€” small, quiet, together */}
      <g fill="#08071a">
        {/* seated figure one */}
        <path d="M585 246 q-3 -14 6 -21 q8 -6 16 0 q7 6 5 15 l-1 6 q8 3 8 10 l0 6 l-36 0 l0 -7 q0 -6 2 -9 Z" />
        {/* seated figure two, leaning in */}
        <path d="M617 248 q-2 -12 6 -18 q7 -5 14 1 q6 5 5 13 l0 5 q7 3 7 9 l0 5 l-33 0 l0 -6 q0 -5 1 -9 Z" />
        {/* the hill shadow beneath them */}
        <ellipse cx="608" cy="260" rx="52" ry="6" opacity="0.9" />
      </g>
    </svg>
  )
}


