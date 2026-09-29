/* Safe access helpers — the preview may run inside a sandboxed iframe where
   localStorage / matchMedia can throw. Nothing here may ever crash the app. */

export function storageGet(key) {
  try {
    return window.localStorage.getItem(key)
  } catch {
    return null
  }
}

export function storageSet(key, value) {
  try {
    window.localStorage.setItem(key, value)
  } catch {
    /* storage unavailable — preference just won't persist */
  }
}

export function reducedMotionPreferred() {
  try {
    return !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  } catch {
    return false
  }
}
