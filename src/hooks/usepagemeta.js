import { useEffect } from 'react'

/** Update document.title per route. */
export function usePageTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} · jepepage` : 'jepepage · a little universe'
  }, [title])
}

/** Scroll to top on route change + move focus to main for keyboard users. */
export function useRouteChanged(pathname) {
  useEffect(() => {
    window.scrollTo(0, 0)
    const main = document.getElementById('main')
    if (main) main.focus({ preventScroll: true })
  }, [pathname])
}
