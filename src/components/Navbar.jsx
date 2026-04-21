import { useState, useEffect, useRef } from 'react'
import { NavLink, Link } from 'react-router-dom'

// Nav items — edit dropdowns here as you add features / fun stuff
const FEATURES_ITEMS = [
  // { label: 'Project One', to: '/features/project-one' },
]

const FUN_ITEMS = [
  // { label: 'Mini Game', to: '/fun/mini-game' },
]

function DropdownLink({ label, items, to }) {
  const hasItems = items && items.length > 0

  if (!hasItems) {
    // No sub-items yet → render as a plain (slightly dimmed) link
    return (
      <li>
        <NavLink
          to={to}
          className={({ isActive }) => `nav-btn${isActive ? ' active' : ''}`}
        >
          {label}
          <span style={{ fontSize: '0.7rem', opacity: 0.5, marginLeft: 2 }}>soon</span>
        </NavLink>
      </li>
    )
  }

  return (
    <li className="dropdown-wrapper">
      <button className="nav-btn" tabIndex={0}>
        {label}
        <span className="dropdown-caret">▼</span>
      </button>
      <div className="dropdown-menu">
        {items.map((item) => (
          <Link key={item.to} to={item.to} className="dropdown-item">
            {item.label}
          </Link>
        ))}
      </div>
    </li>
  )
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [featuresOpen, setFeaturesOpen] = useState(false)
  const [funOpen, setFunOpen] = useState(false)

  // Scroll listener — adds .scrolled after 90px
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 90)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const close = () => setMenuOpen(false)

  return (
    <>
      <nav className={`navbar${scrolled ? ' scrolled' : ''}`}>
        {/* ── Logo ── */}
        <Link to="/" className="nav-logo" onClick={close}>
          Mr-Don-Leo
        </Link>

        {/* ── Desktop links ── */}
        <ul className="nav-links">
          <li>
            <NavLink
              to="/"
              end
              className={({ isActive }) => `nav-btn${isActive ? ' active' : ''}`}
            >
              Home
            </NavLink>
          </li>

          <DropdownLink
            label="Features"
            items={FEATURES_ITEMS}
            to="/features"
          />

          <DropdownLink
            label="Fun Stuff"
            items={FUN_ITEMS}
            to="/fun"
          />

          <li>
            <NavLink
              to="/contact"
              className={({ isActive }) => `nav-btn${isActive ? ' active' : ''}`}
            >
              Contact
            </NavLink>
          </li>
        </ul>

        {/* ── Hamburger (mobile) ── */}
        <button
          className={`hamburger${menuOpen ? ' open' : ''}`}
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          <span />
          <span />
          <span />
        </button>
      </nav>

      {/* ── Mobile drawer ── */}
      <div className={`mobile-menu${menuOpen ? ' open' : ''}`}>
        <NavLink to="/" end className="mobile-nav-link" onClick={close}>Home</NavLink>

        {/* Features group */}
        <span className="mobile-sub-label">Features</span>
        {FEATURES_ITEMS.length > 0 ? (
          <div className="mobile-sub-links">
            {FEATURES_ITEMS.map((i) => (
              <Link key={i.to} to={i.to} className="mobile-sub-link" onClick={close}>{i.label}</Link>
            ))}
          </div>
        ) : (
          <span style={{ fontSize: '0.9rem', opacity: 0.45 }}>Coming soon</span>
        )}

        {/* Fun Stuff group */}
        <span className="mobile-sub-label" style={{ marginTop: '0.6rem' }}>Fun Stuff</span>
        {FUN_ITEMS.length > 0 ? (
          <div className="mobile-sub-links">
            {FUN_ITEMS.map((i) => (
              <Link key={i.to} to={i.to} className="mobile-sub-link" onClick={close}>{i.label}</Link>
            ))}
          </div>
        ) : (
          <span style={{ fontSize: '0.9rem', opacity: 0.45 }}>Coming soon</span>
        )}

        <NavLink to="/contact" className="mobile-nav-link" onClick={close}>Contact</NavLink>
      </div>
    </>
  )
}
