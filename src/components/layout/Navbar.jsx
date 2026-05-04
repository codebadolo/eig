import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import logoLight from '../../assets/excellis-invest-group-font-blanc.png'
import logoDark from '../../assets/Logo EXCELLIS SUR FOND SOMBRE.png'

const links = [
  { to: '/le-groupe', label: 'Le Groupe' },
  { to: '/nos-metiers', label: 'Nos Métiers' },
  { to: '/nos-filiales', label: 'Nos Filiales' },
  { to: '/gouvernance', label: 'Gouvernance' },
  { to: '/actualites', label: 'Actualités' },
  { to: '/carrieres', label: 'Carrières' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <nav className={`navbar${scrolled ? ' scrolled' : ''}`}>
        <Link to="/" className="nav-logo" onClick={() => setMenuOpen(false)}>
          <div className="nav-logo-img-wrap">
            {/* Logo fond blanc — navbar scrollée */}
            <img
              src={logoLight}
              alt="Excellis Invest Group"
              className={`nav-logo-light${scrolled ? '' : ' nav-logo-hidden'}`}
            />
            {/* Logo fond sombre — navbar transparente */}
            <img
              src={logoDark}
              alt="Excellis Invest Group"
              className={`nav-logo-dark${scrolled ? ' nav-logo-hidden' : ''}`}
            />
          </div>
        </Link>

        <ul className="nav-links">
          {links.map(({ to, label }) => (
            <li key={to}>
              <NavLink to={to} className={({ isActive }) => isActive ? 'active' : ''}>
                {label}
              </NavLink>
            </li>
          ))}
          <li>
            <NavLink to="/contact" className="nav-cta">Nous Contacter</NavLink>
          </li>
        </ul>

        <button className="nav-hamburger" aria-label="Menu" onClick={() => setMenuOpen(o => !o)}>
          <span />
          <span />
          <span />
        </button>
      </nav>

      <div className={`nav-mobile${menuOpen ? ' open' : ''}`}>
        <div style={{ padding: '8px 0 20px' }}>
          <img src={logoLight} alt="Excellis Invest Group" style={{ width: 150, height: 'auto' }} />
        </div>
        {links.map(({ to, label }) => (
          <NavLink key={to} to={to} onClick={() => setMenuOpen(false)}>{label}</NavLink>
        ))}
        <NavLink to="/contact" className="nav-cta" onClick={() => setMenuOpen(false)}>
          Nous Contacter
        </NavLink>
      </div>
    </>
  )
}
