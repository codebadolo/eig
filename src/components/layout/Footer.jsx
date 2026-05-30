import { Link } from 'react-router-dom'
import { useLang } from '../../contexts/LangContext'
import { useApi } from '../../hooks/useApi'

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
    ],
  },
  {
    title: null,
    links: [
      { label: null, href: '/actualites' },
      { label: null, href: '/carrieres' },
      { label: null, href: '/contact' },
    ],
  },
]

const FALLBACK_COL_TITLES = ['footer.col1', 'footer.col2', 'footer.col3']
const FALLBACK_LINKS = [
  ['footer.links1.qui', 'footer.links1.vision', 'footer.links1.histoire', 'footer.links1.gouvernance'],
  ['footer.links2.metiers', 'footer.links2.filiales'],
  ['footer.links3.actualites', 'footer.links3.carrieres', 'footer.links3.contact'],
]

function ColLink({ href, label }) {
  const isExternal = href && (href.startsWith('http://') || href.startsWith('https://'))
  if (isExternal) {
    return <a href={href} target="_blank" rel="noopener noreferrer">{label}</a>
  }
  return <Link to={href || '/'}>{label}</Link>
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

      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} {copyrightText}. {t('footer.rights')}</span>
        <div className="footer-legal">
          <ColLink href={mentionsHref} label={t('footer.legal')} />
          <ColLink href={privacyHref}  label={t('footer.privacy')} />
          <ColLink href={cookiesHref}  label={t('footer.cookies')} />
        </div>
      </div>
    </footer>
  )
}
