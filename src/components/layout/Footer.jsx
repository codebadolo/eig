import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useLang } from '../../contexts/LangContext'
import { useApi } from '../../hooks/useApi'

const API_BASE = import.meta.env.VITE_API_URL || '/api'

const DEFAULT_COLS = [
  {
    title: null,
    links: [
      { label: null, href: '/le-groupe' },
      { label: null, href: '/le-groupe' },
      { label: null, href: '/le-groupe' },
      { label: null, href: '/gouvernance' },
    ],
  },
  {
    title: null,
    links: [
      { label: null, href: '/nos-metiers' },
      { label: null, href: '/nos-filiales' },
      { label: null, href: '/nos-metiers/services-financiers' },
      { label: null, href: '/nos-metiers/assurance' },
      { label: null, href: '/nos-metiers/technologies-fintech' },
    ],
  },
  {
    title: null,
    links: [
      { label: null, href: '/actualites' },
      { label: null, href: '/carrieres' },
      { label: null, href: '/contact' },
      { label: null, href: '/contact' },
      { label: null, href: '/contact' },
    ],
  },
]

const FALLBACK_COL_TITLES = ['footer.col1', 'footer.col2', 'footer.col3']
const FALLBACK_LINKS = [
  ['footer.links1.qui', 'footer.links1.vision', 'footer.links1.histoire', 'footer.links1.gouvernance'],
  ['footer.links2.metiers', 'footer.links2.filiales', 'footer.links2.finance', 'footer.links2.assurance', 'footer.links2.fintech'],
  ['footer.links3.actualites', 'footer.links3.carrieres', 'footer.links3.contact', 'footer.links3.presse', 'footer.links3.partenariats'],
]

function ColLink({ href, label }) {
  const isExternal = href && (href.startsWith('http://') || href.startsWith('https://'))
  if (isExternal) {
    return <a href={href} target="_blank" rel="noopener noreferrer">{label}</a>
  }
  return <Link to={href || '/'}>{label}</Link>
}

function NewsletterWidget() {
  const { t } = useLang()
  const [email, setEmail] = useState('')
  const [state, setState] = useState('idle')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email) return
    setState('sending')
    try {
      const res = await fetch(`${API_BASE}/newsletter/subscribe`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      const data = await res.json()
      if (res.status === 409) { setState('already'); return }
      if (!res.ok) throw new Error()
      setState('success')
      setEmail('')
    } catch {
      setState('error')
    }
  }

  const msg = {
    success: t('footer.nl_success'),
    error:   t('footer.nl_error'),
    already: t('footer.nl_already'),
  }[state]

  return (
    <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: 40, marginTop: 16 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'center' }}>
        <div>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 8 }}>
            Newsletter
          </div>
          <div className="footer-brand-name" style={{ fontSize: 22, marginBottom: 8 }}>
            {t('footer.nl_title')}
          </div>
          <p className="footer-desc" style={{ marginBottom: 0 }}>{t('footer.nl_sub')}</p>
        </div>

        <div>
          {state === 'success' ? (
            <div style={{
              background: 'rgba(16,185,129,0.12)', border: '1px solid rgba(16,185,129,0.25)',
              borderRadius: 8, padding: '16px 20px', fontSize: 14, color: '#34D399', lineHeight: 1.6,
            }}>
              ✓ {msg}
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              <input
                type="email" value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder={t('footer.nl_placeholder')}
                required
                style={{
                  flex: '1 1 220px', padding: '12px 18px', borderRadius: 6,
                  border: '1px solid rgba(255,255,255,0.12)', background: 'rgba(255,255,255,0.06)',
                  color: 'white', fontSize: 14, outline: 'none',
                }}
                onFocus={e => e.target.style.borderColor = 'rgba(212,170,74,0.5)'}
                onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.12)'}
              />
              <button type="submit" disabled={state === 'sending'} style={{
                padding: '12px 24px', borderRadius: 6, border: 'none', cursor: 'pointer',
                background: state === 'sending' ? '#6B7280' : 'var(--gold)',
                color: 'var(--teal-dark)', fontSize: 12, fontWeight: 700,
                letterSpacing: '0.1em', textTransform: 'uppercase', whiteSpace: 'nowrap',
                transition: 'opacity 0.2s',
              }}>
                {state === 'sending' ? '...' : t('footer.nl_btn')}
              </button>
            </form>
          )}
          {(state === 'error' || state === 'already') && (
            <p style={{ fontSize: 13, color: state === 'already' ? '#D4AA4A' : '#F87171', marginTop: 8 }}>{msg}</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default function Footer() {
  const { t } = useLang()
  const { data: company } = useApi('/company')

  const socials = [
    company?.linkedin   && { href: company.linkedin,   label: 'LinkedIn',    icon: 'in' },
    company?.facebook   && { href: company.facebook,   label: 'Facebook',    icon: 'f' },
    company?.twitter    && { href: company.twitter,    label: 'X / Twitter', icon: '𝕏' },
    company?.instagram  && { href: company.instagram,  label: 'Instagram',   icon: '◈' },
    company?.youtube    && { href: company.youtube,    label: 'YouTube',     icon: '▶' },
  ].filter(Boolean)

  const cols = (company?.footerCols?.length === 3) ? company.footerCols : DEFAULT_COLS

  const mentionsHref   = company?.footerMentions        || '/contact'
  const privacyHref    = company?.footerConfidentialite || '/contact'
  const cookiesHref    = company?.footerCookies         || '/contact'
  const copyrightText  = company?.footerCopyright       || company?.nom || 'Excellis Invest Group'
  const tagline        = company?.footerTagline         || company?.tagline || t('footer.tagline')
  const desc           = company?.footerDesc            || t('footer.desc')

  return (
    <footer>
      <div className="footer-main">
        {/* Brand */}
        <div>
          <div className="footer-brand-name">{company?.nom || 'Excellis Invest Group'}</div>
          <span className="footer-brand-tagline">{tagline}</span>
          <p className="footer-desc">{desc}</p>
          {socials.length > 0 ? (
            <div className="footer-social">
              {socials.map(s => (
                <a key={s.label} href={s.href} className="social-btn" title={s.label} aria-label={s.label}
                  target="_blank" rel="noopener noreferrer">
                  {s.icon}
                </a>
              ))}
            </div>
          ) : (
            <div className="footer-social">
              <a href="#" className="social-btn" title="LinkedIn" aria-label="LinkedIn">in</a>
              <a href="#" className="social-btn" title="Facebook" aria-label="Facebook">f</a>
            </div>
          )}
        </div>

        {/* 3 colonnes dynamiques */}
        {cols.map((col, i) => (
          <div key={i}>
            <div className="footer-col-title">
              {col.title || t(FALLBACK_COL_TITLES[i])}
            </div>
            <ul className="footer-links">
              {col.links.map((link, j) => (
                <li key={j}>
                  <ColLink
                    href={link.href}
                    label={link.label || t(FALLBACK_LINKS[i]?.[j] || '')}
                  />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <NewsletterWidget />

      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} {copyrightText} — {t('footer.rights')}</span>
        <div className="footer-legal">
          <ColLink href={mentionsHref} label={t('footer.legal')} />
          <ColLink href={privacyHref}  label={t('footer.privacy')} />
          <ColLink href={cookiesHref}  label={t('footer.cookies')} />
        </div>
      </div>
    </footer>
  )
}
