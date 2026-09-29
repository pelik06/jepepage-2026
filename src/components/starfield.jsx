import { useEffect, useRef } from 'react'
import { prefersReducedMotion } from '../hooks/useprefersreducedmotion'

const INTENSIFY_EVENT = 'jepepage:intensify'

/**
 * The persistent universe: twinkling stars + occasional shooting stars.
 * Fixed canvas behind all pages. Listens for the "intensify" event
 * (fired by the birthday finale) to brighten the sky.
 */
export default function Starfield() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const reduced = prefersReducedMotion()

    let stars = []
    let raf = 0
    let running = true
    let intensified = false
    let dpr = 1
    let w = 0
    let h = 0
    let t = 0

    const shooting = []
    let nextShootAt = 4

    const build = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = window.innerWidth
      h = window.innerHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      canvas.style.width = w + 'px'
      canvas.style.height = h + 'px'
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      const count = Math.round(Math.min(190, (w * h) / 9000))
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() < 0.86 ? Math.random() * 1.1 + 0.35 : Math.random() * 1.7 + 1,
        a: 0.25 + Math.random() * 0.65,
        speed: 0.3 + Math.random() * 1.1,
        phase: Math.random() * Math.PI * 2,
        warm: Math.random() < 0.14,
      }))
    }

    const spawnShoot = () => {
      const fromLeft = Math.random() < 0.7
      shooting.push({
        x: fromLeft ? -40 : w * (0.3 + Math.random() * 0.7),
        y: Math.random() * h * 0.4,
        vx: (fromLeft ? 1 : -0.55) * (7 + Math.random() * 5),
        vy: 2.2 + Math.random() * 2.4,
        life: 1,
      })
    }

    const draw = (now) => {
      if (!running) return
      t = now / 1000
      ctx.clearRect(0, 0, w, h)

      const boost = intensified ? 1.5 : 1
      for (const s of stars) {
        const tw = reduced ? 1 : 0.62 + 0.38 * Math.sin(s.phase + t * s.speed)
        const alpha = Math.min(1, s.a * tw * boost)
        ctx.beginPath()
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
        ctx.fillStyle = s.warm
          ? `rgba(247, 208, 138, ${alpha})`
          : `rgba(242, 240, 255, ${alpha})`
        ctx.fill()
      }

      if (!reduced) {
        if (t > nextShootAt) {
          spawnShoot()
          nextShootAt = t + (intensified ? 2.5 + Math.random() * 3 : 7 + Math.random() * 8)
        }
        for (let i = shooting.length - 1; i >= 0; i--) {
          const m = shooting[i]
          m.x += m.vx
          m.y += m.vy
          m.life -= 0.011
          if (m.life <= 0 || m.x > w + 60 || m.y > h) {
            shooting.splice(i, 1)
            continue
          }
          const tailX = m.x - m.vx * 9
          const tailY = m.y - m.vy * 9
          const grad = ctx.createLinearGradient(m.x, m.y, tailX, tailY)
          grad.addColorStop(0, `rgba(255, 250, 240, ${0.85 * m.life})`)
          grad.addColorStop(1, 'rgba(255, 250, 240, 0)')
          ctx.strokeStyle = grad
          ctx.lineWidth = 1.6
          ctx.lineCap = 'round'
          ctx.beginPath()
          ctx.moveTo(m.x, m.y)
          ctx.lineTo(tailX, tailY)
          ctx.stroke()
        }
      }

      if (!reduced) raf = requestAnimationFrame(draw)
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

    const onIntensify = (e) => {
      intensified = !!e.detail
    }

    build()
    if (reduced) {
      draw(0) // single static frame
    } else {
      raf = requestAnimationFrame(draw)
    }

    let resizeTimer
    const onResize = () => {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(() => {
        build()
        if (reduced) draw(0)
      }, 160)
    }

    window.addEventListener('resize', onResize)
    document.addEventListener('visibilitychange', onVis)
    window.addEventListener(INTENSIFY_EVENT, onIntensify)

    return () => {
      running = false
      cancelAnimationFrame(raf)
      clearTimeout(resizeTimer)
      window.removeEventListener('resize', onResize)
      document.removeEventListener('visibilitychange', onVis)
      window.removeEventListener(INTENSIFY_EVENT, onIntensify)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  )
}

export function setSkyIntensified(on) {
  window.dispatchEvent(new CustomEvent(INTENSIFY_EVENT, { detail: on }))
}

