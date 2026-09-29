import { useEffect, useState } from 'react'
import { music } from '../lib/musicengine'
import { storageGet, storageSet, reducedMotionPreferred } from '../lib/safeenv'

const STORAGE_KEY = 'jepepage:music'

/**
 * Ambient music state + persistence.
 * The AudioContext itself is only ever created after an explicit user gesture
 * (the toggle click, or any first interaction when the pref was saved on).
 */
export function useAmbientMusic() {
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    const unsub = music.subscribe(setPlaying)
    return unsub
  }, [])

  // honor a previously saved preference: start on the first user gesture
  useEffect(() => {
    let started = false
    const saved = storageGet(STORAGE_KEY)
    const tryStart = () => {
      if (started || music.playing) return
      if (saved === 'on') {
        started = true
        music.start()
      }
      window.removeEventListener('pointerdown', tryStart)
      window.removeEventListener('keydown', tryStart)
    }
    if (saved === 'on' && !reducedMotionPreferred()) {
      window.addEventListener('pointerdown', tryStart, { once: false })
      window.addEventListener('keydown', tryStart, { once: false })
    }
    return () => {
      window.removeEventListener('pointerdown', tryStart)
      window.removeEventListener('keydown', tryStart)
    }
  }, [])

  const toggle = () => {
    const now = music.toggle()
    storageSet(STORAGE_KEY, now ? 'on' : 'off')
    return now
  }

  return { playing, toggle }
}
