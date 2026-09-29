import { useEffect, useRef } from 'react'
import { prefersReducedMotion } from '../hooks/usePrefersReducedMotion'

const COLORS = [
  [247, 168, 184], // rose
  [214, 184, 240], // lavender
  [247, 208, 138], // gold
  [242, 240, 255], // starlight
]

/**
 * Gentle, elegant fireworks for the birthday finale.
 * Pastel bursts, slow cadence, capped particle count.
 * Reduced motion â†’ a calm static glow instead.
 */
export default function Fireworks({ active }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    if (!active) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const reduced = prefersReducedMotion()

    let raf = 0
    let running = true
    let dpr = 1
    let w = 0
    let h = 0
    let t = 0
    const particles = []
    const rockets = []
    let nextLaunch = 0.8
    const MAX_PARTICLES = 260

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = canvas.clientWidth
      h = canvas.clientHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const burst = (x, y) => {
      const color = COLORS[Math.floor(Math.random() * COLORS.length)]
      const n = 46
      for (let i = 0; i < n && particles.length < MAX_PARTICLES; i++) {
        const ang = (Math.PI * 2 * i) / n + Math.random() * 0.2
        const speed = 1.2 + Math.random() * 1.8
        particles.push({
          x, y,
          vx: Math.cos(ang) * speed,
          vy: Math.sin(ang) * speed,
          life: 1,
          decay: 0.008 + Math.random() * 0.008,
          r: 1 + Math.random() * 1.6,
          color,
        })
      }
    }

    const launch = () => {
      rockets.push({
        x: w * (0.2 + Math.random() * 0.6),
        y: h,
        vy: -(3.4 + Math.random() * 1.4),
        targetY: h * (0.18 + Math.random() * 0.3),
      })
    }

    const reducedDraw = () => {
      // calm static "constellation bloom"
      for (let i = 0; i < 26; i++) {
        const x = w * (0.12 + Math.random() * 0.76)
        const y = h * (0.1 + Math.random() * 0.42)
        const c = COLORS[i % COLORS.length]
        const g = ctx.createRadialGradient(x, y, 0, x, y, 40 + Math.random() * 60)
        g.addColorStop(0, `rgba(${c[0]}, ${c[1]}, ${c[2]}, 0.16)`)
        g.addColorStop(1, 'rgba(0,0,0,0)')
        ctx.fillStyle = g
        ctx.beginPath()
        ctx.arc(x, y, 100, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    const draw = (now) => {
      if (!running) return
      t = now / 1000
      ctx.clearRect(0, 0, w, h)
      ctx.globalCompositeOperation = 'lighter'

      if (t > nextLaunch && rockets.length < 2) {
        launch()
        nextLaunch = t + 1.4 + Math.random() * 1.4
      }

      for (let i = rockets.length - 1; i >= 0; i--) {
        const rk = rockets[i]
        rk.y += rk.vy
        rk.vy *= 0.988
        ctx.beginPath()
        ctx.arc(rk.x, rk.y, 1.6, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(255, 244, 220, 0.85)'
        ctx.fill()
        if (rk.y <= rk.targetY) {
          burst(rk.x, rk.y)
          rockets.splice(i, 1)
        }
      }

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i]
        p.x += p.vx
        p.y += p.vy
        p.vy += 0.012 // gravity, gentle
        p.vx *= 0.985
        p.vy *= 0.985
        p.life -= p.decay
        if (p.life <= 0) {
          particles.splice(i, 1)
          continue
        }
        const [r, g, b] = p.color
        const a = p.life * 0.8
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r * p.life + 0.4, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${a})`
        ctx.fill()
      }

      ctx.globalCompositeOperation = 'source-over'
      raf = requestAnimationFrame(draw)
    }

    const onVis = () => {
      if (document.hidden) {
        running = false
        cancelAnimationFrame(raf)
      } else if (!reduced) {
        running = true
        raf = requestAnimationFrame(draw)
      }
    }

    resize()
    if (reduced) reducedDraw()
    else raf = requestAnimationFrame(draw)

    const onResize = () => {
      resize()
      if (reduced) reducedDraw()
    }
    window.addEventListener('resize', onResize)
    document.addEventListener('visibilitychange', onVis)

    return () => {
      running = false
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', onResize)
      document.removeEventListener('visibilitychange', onVis)
    }
  }, [active])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 1,
      }}
    />
  )
}

