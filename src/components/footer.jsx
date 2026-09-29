import { Link } from 'react-router-dom'
import { nav, site } from '../content/site'

function StarMark() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2c.9 5.2 4.8 9.1 10 10-5.2.9-9.1 4.8-10 10-.9-5.2-4.8-9.1-10-10 5.2-.9 9.1-4.8 10-10z" />
    </svg>
  )
}

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <span className="footer-tag">
          <StarMark />
          {site.brand} · {site.tagline}
        </span>

        <nav className="footer-links" aria-label="Footer">
          {nav.slice(1).map((item) => (
            <Link key={item.to} to={item.to}>
              {item.label}
            </Link>
          ))}
        </nav>

        <Link to="/2025" className="footer-archive">
          Previous Birthday · 2025
          <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </Link>

        <p className="footer-note">
          <span className="hand">made with love, under our sky</span>
          <br />
          2026 · chapter two
        </p>
      </div>
    </footer>
  )
}
