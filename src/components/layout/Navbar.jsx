import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useLang } from '../../contexts/LangContext'
import logoLight from '../../assets/excellis-invest-group-font-blanc.png'
import logoDark from '../../assets/Logo EXCELLIS SUR FOND SOMBRE.png'

export default function Navbar() {
  const { lang, setLang, t } = useLang()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { to: '/le-groupe',    label: t('nav.groupe') },
    { to: '/nos-metiers',  label: t('nav.metiers') },
    { to: '/nos-filiales', label: t('nav.filiales') },
    { to: '/gouvernance',  label: t('nav.gouvernance') },
    { to: '/actualites',   label: t('nav.actualites') },
    { to: '/carrieres',    label: t('nav.carrieres') },
  ]

  const LangSwitch = ({ dark }) => (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 2,
      background: dark ? 'rgba(255,255,255,0.07)' : 'rgba(15,25,36,0.06)',
      borderRadius: 20, padding: '3px 4px',
      border: `1px solid ${dark ? 'rgba(255,255,255,0.12)' : 'rgba(15,25,36,0.12)'}`,
    }}>
      {['fr', 'en'].map(l => (
        <button key={l} onClick={() => setLang(l)} style={{
          padding: '3px 9px', borderRadius: 16, border: 'none', cursor: 'pointer',
          fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase',
          background: lang === l ? (dark ? 'rgba(212,170,74,0.9)' : '#0F4855') : 'transparent',
          color: lang === l ? (dark ? '#0F1924' : 'white') : (dark ? 'rgba(255,255,255,0.5)' : '#6B7280'),
          transition: 'all 0.2s',
        }}>
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  )

  return (
    <>
      <nav className={`navbar${scrolled ? ' scrolled' : ''}`}>
        <Link to="/" className="nav-logo" onClick={() => setMenuOpen(false)}>
          <div className="nav-logo-img-wrap">
            <img src={logoLight} alt="Excellis Invest Group" className={`nav-logo-light${scrolled ? '' : ' nav-logo-hidden'}`} />
            <img src={logoDark}  alt="Excellis Invest Group" className={`nav-logo-dark${scrolled ? ' nav-logo-hidden' : ''}`} />
          </div>
        </Link>

        <ul className="nav-links">
          {links.map(({ to, label }) => (
            <li key={to}>
              <NavLink to={to} className={({ isActive }) => isActive ? 'active' : ''}>{label}</NavLink>
            </li>
          ))}
          <li>
            <NavLink to="/contact" className="nav-cta">{t('nav.contact')}</NavLink>
          </li>
          <li style={{ display: 'flex', alignItems: 'center' }}>
            <LangSwitch dark={!scrolled} />
          </li>
        </ul>

        <button className="nav-hamburger" aria-label="Menu" onClick={() => setMenuOpen(o => !o)}>
          <span /><span /><span />
        </button>
      </nav>

      <div className={`nav-mobile${menuOpen ? ' open' : ''}`}>
        <div style={{ padding: '8px 0 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <img src={logoLight} alt="Excellis Invest Group" style={{ width: 150, height: 'auto' }} />
          <LangSwitch dark />
        </div>
        {links.map(({ to, label }) => (
          <NavLink key={to} to={to} onClick={() => setMenuOpen(false)}>{label}</NavLink>
        ))}
        <NavLink to="/contact" className="nav-cta" onClick={() => setMenuOpen(false)}>
          {t('nav.contact')}
        </NavLink>
      </div>
    </>
  )
}
