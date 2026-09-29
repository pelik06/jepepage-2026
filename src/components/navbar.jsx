import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { ListIcon, CloseIcon } from './icons'
import { nav, site } from '../content/site'
import { useAmbientMusic } from '../hooks/useAmbientMusic'

function StarMark() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2c.9 5.2 4.8 9.1 10 10-5.2.9-9.1 4.8-10 10-.9-5.2-4.8-9.1-10-10 5.2-.9 9.1-4.8 10-10z" />
    </svg>
  )
}

function EqBars() {
  return (
    <span className="eq" aria-hidden="true">
      <span /><span /><span /><span />
    </span>
  )
}

function MusicNote() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M9 18V5l10-2v13" />
      <circle cx="6.5" cy="18" r="2.5" />
      <circle cx="16.5" cy="16" r="2.5" />
    </svg>
  )
}

export default function Navbar() {
  const { playing, toggle } = useAmbientMusic()
  const [open, setOpen] = useState(false)
  const location = useLocation()

  // close the mobile menu whenever the route changes
  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  // lock page scroll while the menu is open
  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <>
      <div className="nav-wrap">
        <nav className="nav" aria-label="Main">
          <Link to="/" className="brand">
            <StarMark />
            {site.brand}
          </Link>

          <div className="nav-links">
            {nav.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
              >
                {item.label}
              </NavLink>
            ))}
          </div>

          <div className="nav-utils">
            <button
              type="button"
              className="icon-btn"
              onClick={toggle}
              aria-pressed={playing}
              aria-label={playing ? 'Pause the music' : 'Play the music'}
              title={playing ? 'Pause the music' : 'Play the music'}
            >
              {playing ? <EqBars /> : <MusicNote />}
            </button>
            <button
              type="button"
              className="icon-btn menu-btn"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? 'Close menu' : 'Open menu'}
            >
              {open ? <CloseIcon /> : <ListIcon />}
            </button>
          </div>
        </nav>
      </div>

      {open && (
        <div id="mobile-menu" className="mobile-menu">
          <nav aria-label="Mobile">
            {nav.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) => (isActive ? 'active' : '')}
              >
                {item.label}
              </NavLink>
            ))}
            <div className="menu-foot">a little universe, just for you</div>
          </nav>
        </div>
      )}
    </>
  )
}
