import { useEffect, useRef, useState } from 'react'

/**
 * Deterministic "enter viewport once" hook.
 * Falls back to instantly-visible when IntersectionObserver is unavailable,
 * so content never gets stuck invisible.
 */
export function useInViewOnce(margin = '-50px') {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (typeof IntersectionObserver === 'undefined') {
      setInView(true)
      return
    }
    let io
    try {
      io = new IntersectionObserver(
        (entries) => {
          if (entries.some((e) => e.isIntersecting)) {
            setInView(true)
            io.disconnect()
          }
        },
        { rootMargin: margin },
      )
      io.observe(el)
    } catch {
      setInView(true)
    }
    return () => {
      try {
        io && io.disconnect()
      } catch {
        /* noop */
      }
    }
  }, [margin])

  return [ref, inView]
}
