import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useLang } from '../../contexts/LangContext'

const API_BASE = import.meta.env.VITE_API_URL || '/api'

function NewsletterWidget() {
  const { t } = useLang()
  const [email, setEmail] = useState('')
  const [state, setState] = useState('idle') // idle | sending | success | error | already

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
    <div style={{
      borderTop: '1px solid rgba(255,255,255,0.08)',
      paddingTop: 40, marginTop: 16,
    }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'center' }}>
        <div>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 8 }}>
            Newsletter
          </div>
          <div className="footer-brand-name" style={{ fontSize: 22, marginBottom: 8 }}>
            {t('footer.nl_title')}
          </div>
          <p className="footer-desc" style={{ marginBottom: 0 }}>
            {t('footer.nl_sub')}
          </p>
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

  return (
    <footer>
      <div className="footer-main">
        <div>
          <div className="footer-brand-name">Excellis Invest Group</div>
          <span className="footer-brand-tagline">{t('footer.tagline')}</span>
          <p className="footer-desc">{t('footer.desc')}</p>
          <div className="footer-social">
            <a href="#" className="social-btn" title="LinkedIn" aria-label="LinkedIn">in</a>
            <a href="#" className="social-btn" title="Facebook" aria-label="Facebook">f</a>
            <a href="#" className="social-btn" title="WhatsApp" aria-label="WhatsApp">W</a>
          </div>
        </div>

        <div>
          <div className="footer-col-title">{t('footer.col1')}</div>
          <ul className="footer-links">
            <li><Link to="/le-groupe">{t('footer.links1.qui')}</Link></li>
            <li><Link to="/le-groupe">{t('footer.links1.vision')}</Link></li>
            <li><Link to="/le-groupe">{t('footer.links1.histoire')}</Link></li>
            <li><Link to="/gouvernance">{t('footer.links1.gouvernance')}</Link></li>
          </ul>
        </div>

        <div>
          <div className="footer-col-title">{t('footer.col2')}</div>
          <ul className="footer-links">
            <li><Link to="/nos-metiers">{t('footer.links2.metiers')}</Link></li>
            <li><Link to="/nos-filiales">{t('footer.links2.filiales')}</Link></li>
            <li><Link to="/nos-metiers/services-financiers">{t('footer.links2.finance')}</Link></li>
            <li><Link to="/nos-metiers/assurance">{t('footer.links2.assurance')}</Link></li>
            <li><Link to="/nos-metiers/technologies-fintech">{t('footer.links2.fintech')}</Link></li>
          </ul>
        </div>

        <div>
          <div className="footer-col-title">{t('footer.col3')}</div>
          <ul className="footer-links">
            <li><Link to="/actualites">{t('footer.links3.actualites')}</Link></li>
            <li><Link to="/carrieres">{t('footer.links3.carrieres')}</Link></li>
            <li><Link to="/contact">{t('footer.links3.contact')}</Link></li>
            <li><Link to="/contact">{t('footer.links3.presse')}</Link></li>
            <li><Link to="/contact">{t('footer.links3.partenariats')}</Link></li>
          </ul>
        </div>
      </div>

      <NewsletterWidget />

      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Jofé° — {t('footer.rights')}</span>
        <div className="footer-legal">
          <Link to="/contact">{t('footer.legal')}</Link>
          <Link to="/contact">{t('footer.privacy')}</Link>
          <Link to="/contact">{t('footer.cookies')}</Link>
        </div>
      </div>
    </footer>
  )
}
