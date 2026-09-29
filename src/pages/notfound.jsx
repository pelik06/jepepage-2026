import { Link } from 'react-router-dom'
import { usePageTitle } from '../hooks/usepagemeta'

export default function NotFound() {
  usePageTitle('Lost among the stars')
  return (
    <div className="page-inner nf-wrap">
      <p className="script-sub" style={{ fontFamily: 'var(--font-script)', fontSize: 'clamp(34px, 5vw, 48px)', color: 'var(--rose-soft)' }}>
        lost among the stars?
      </p>
      <p style={{ color: 'var(--ink-low)' }}>
        This little corner of the universe doesn't exist — but the rest of it does.
      </p>
      <Link to="/" className="btn">Back home</Link>
    </div>
  )
}
