import { useParams, Link } from 'react-router-dom'
import ScrollReveal from '../components/ui/ScrollReveal'
import FilialeLogo from '../components/ui/FilialeLogo'
import { logos } from '../assets/logos'
import CallToAction from '../components/sections/CallToAction'
import { useApi } from '../hooks/useApi'
import PageHero from '../components/ui/PageHero'
import { useLang } from '../contexts/LangContext'
import FaIcon from '../components/ui/FaIcon'
import { useResponsive } from '../hooks/useResponsive'

const API = import.meta.env.VITE_API_URL?.replace('/api', '') || ''

export default function FilialeDetail() {
  const { id } = useParams()
  const { t, pick } = useLang()
  const { isMobile } = useResponsive()
  const { data: filiale, loading } = useApi(`/filiales/${id}`)
  const { data: allFiliales = [] } = useApi('/filiales?actif=true')
  const { data: metiers = [] } = useApi('/metiers')

  if (loading) return <div style={{ padding: '200px 5%', textAlign: 'center', color: 'var(--gray-mid)' }}>{t('common.loading')}</div>

  if (!filiale) {
    return (
      <div style={{ padding: '180px 5% 80px', textAlign: 'center' }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 48 }}>{t('filiales.notFound')}</h1>
        <Link to="/nos-filiales" className="btn-primary" style={{ marginTop: 32, display: 'inline-flex' }}>
          {t('filiales.backBtn')}
        </Link>
      </div>
    )
  }
  const metier = metiers.find(m => m.slug === filiale.secteurSlug)
  const autresFiliales = allFiliales.filter(f => f.secteurSlug === filiale.secteurSlug && f.id !== id).slice(0, 3)

  // DB logo has priority over bundled static logo
  const resolvedLogo = filiale.logo
    ? (filiale.logo.startsWith('http') ? filiale.logo : `${API}${filiale.logo}`)
    : (logos[id] || null)
  const hasLogo = Boolean(resolvedLogo)

  const hasContact = filiale.telephone || filiale.email_contact || filiale.adresse || filiale.ville

  return (
    <>
      <PageHero
        section={`filiale-${id}`}
        bgImage={filiale.image || null}
        label={t('filiales.label')}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 24, marginBottom: 20, flexWrap: 'wrap' }}>
          {hasLogo ? (
            <div style={{
              width: 100, height: 100, background: 'white', borderRadius: 12, overflow: 'hidden',
              flexShrink: 0, boxShadow: '0 4px 24px rgba(0,0,0,0.2)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <img src={resolvedLogo} alt={filiale.nom} style={{ width: '100%', height: '100%', objectFit: 'contain', padding: 10 }} />
            </div>
          ) : (
            <div style={{
              width: 80, height: 80, background: 'rgba(255,255,255,0.12)', borderRadius: 12,
              border: '1px solid rgba(255,255,255,0.2)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: 'var(--font-num)', fontSize: 22, color: 'white', fontWeight: 700,
            }}>
              {filiale.sigle}
            </div>
          )}
          <div>
            <h1 className="page-hero-title" style={{ marginBottom: 8 }}>{filiale.nom}</h1>
            <div style={{ fontSize: 13, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--gold-light)' }}>
              {filiale.secteur} · {filiale.pays}{filiale.ville ? ` · ${filiale.ville}` : ''}
            </div>
          </div>
        </div>
      </PageHero>

      <section style={{ background: 'var(--white)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '2fr 1fr', gap: isMobile ? 40 : 60, alignItems: 'start' }}>

          {/* ── Main content ── */}
          <ScrollReveal>
            <span className="section-label">{t('filiales.aboutLabel')}</span>
            <h2 className="section-title" style={{ fontSize: 'clamp(24px,3vw,38px)' }}>{filiale.nom}</h2>
            <div className="gold-rule" />

            <p style={{ fontSize: 17, color: 'var(--gray-mid)', lineHeight: 1.8 }}>
              {pick(filiale, 'description')}
            </p>

            {pick(filiale, 'mission') && (
              <div style={{
                marginTop: 28,
                borderLeft: '3px solid var(--gold)',
                background: 'var(--gold-pale)',
                padding: '20px 20px 20px 24px',
                borderRadius: '0 4px 4px 0',
              }}>
                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 8 }}>
                  {t('filiales.missionLabel')}
                </div>
                <p style={{ fontSize: 15, color: 'var(--gray)', lineHeight: 1.7, margin: 0 }}>
                  {pick(filiale, 'mission')}
                </p>
              </div>
            )}

            {filiale.vision && (
              <div style={{
                marginTop: 16,
                borderLeft: '3px solid var(--teal)',
                background: 'rgba(26,107,122,0.04)',
                padding: '20px 20px 20px 24px',
                borderRadius: '0 4px 4px 0',
              }}>
                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--teal)', marginBottom: 8 }}>
                  {t('filiales.visionLabel')}
                </div>
                <p style={{ fontSize: 15, color: 'var(--gray)', lineHeight: 1.7, margin: 0 }}>
                  {filiale.vision}
                </p>
              </div>
            )}

            {filiale.valeurs && (
              <div style={{ marginTop: 28 }}>
                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--gray-mid)', marginBottom: 14 }}>
                  {t('filiales.valeursLabel')}
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {filiale.valeurs.split(/[·,\n]/).map(v => v.trim()).filter(Boolean).map((v, i) => (
                    <span key={i} style={{
                      background: 'var(--ivory)',
                      border: '1px solid var(--gray-light)',
                      borderRadius: 20,
                      padding: '5px 14px',
                      fontSize: 13,
                      color: 'var(--teal-dark)',
                      fontWeight: 500,
                    }}>
                      {v}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {filiale.commentaires && (
              <div style={{
                marginTop: 28,
                background: 'var(--ivory)',
                border: '1px solid var(--gray-light)',
                borderRadius: 6,
                padding: '20px 24px',
              }}>
                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--gray-mid)', marginBottom: 10 }}>
                  {t('filiales.infoCompl')}
                </div>
                <p style={{ fontSize: 14, color: 'var(--gray)', lineHeight: 1.75, margin: 0, whiteSpace: 'pre-line' }}>
                  {filiale.commentaires}
                </p>
              </div>
            )}

            <div style={{ marginTop: 40, display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              <ContactFilialeBtn filiale={filiale} />
              <Link to="/nos-filiales" className="btn-teal">{t('filiales.allFiliales')}</Link>
            </div>
          </ScrollReveal>

          {/* ── Sidebar ── */}
          <ScrollReveal delay={0.15}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

              {hasLogo && (
                <div style={{
                  background: 'var(--white)', padding: '28px 24px', borderRadius: 10,
                  border: '1px solid var(--gray-light)',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.07)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <img src={resolvedLogo} alt={filiale.nom} style={{ maxWidth: '100%', maxHeight: 160, objectFit: 'contain' }} />
                </div>
              )}

              <SocialBar filiale={filiale} />

              <div style={{ background: 'var(--ivory)', padding: 24, borderRadius: 6, border: '1px solid var(--gray-light)' }}>
                <div style={labelStyle}>{t('filiales.sectorLabel')}</div>
                <div style={{ fontWeight: 600, color: 'var(--teal)' }}>{filiale.secteur}</div>
              </div>

              <div style={{ background: 'var(--ivory)', padding: 24, borderRadius: 6, border: '1px solid var(--gray-light)' }}>
                <div style={labelStyle}>{t('filiales.paysLabel')}</div>
                <div style={{ fontWeight: 600, color: 'var(--black)' }}>
                  <FaIcon name="location-dot" size={13} /> {filiale.pays}{filiale.ville ? `, ${filiale.ville}` : ''}
                </div>
              </div>

              {hasContact && (
                <div style={{ background: 'var(--white)', padding: 24, borderRadius: 6, border: '1px solid var(--gray-light)' }}>
                  <div style={labelStyle}>{t('filiales.contactLabel')}</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {filiale.telephone && (
                      <a href={`tel:${filiale.telephone}`} style={contactRowStyle}>
                        <FaIcon name="phone" size={14} style={contactIconStyle} />
                        <span>{filiale.telephone}</span>
                      </a>
                    )}
                    {filiale.email_contact && (
                      <a href={`mailto:${filiale.email_contact}`} style={contactRowStyle}>
                        <FaIcon name="envelope" size={14} style={contactIconStyle} />
                        <span>{filiale.email_contact}</span>
                      </a>
                    )}
                    {(filiale.adresse || filiale.ville) && (
                      <div style={{ ...contactRowStyle, cursor: 'default' }}>
                        <FaIcon name="location-dot" size={14} style={contactIconStyle} />
                        <span style={{ color: 'var(--gray-mid)' }}>
                          {[filiale.adresse, filiale.ville, filiale.pays].filter(Boolean).join(', ')}
                        </span>
                      </div>
                    )}
                  </div>
                  <div style={{ marginTop: 16 }}>
                    <ContactFilialeBtn filiale={filiale} fullWidth />
                  </div>
                </div>
              )}

              <div style={{ background: 'var(--white)', padding: 24, borderRadius: 6, border: '1px solid var(--gray-light)' }}>
                <div style={labelStyle}>{t('filiales.groupLabel')}</div>
                <div style={{ fontWeight: 600, color: 'var(--black)' }}>Excellis Invest Group</div>
              </div>

              {filiale.website && (
                <a
                  href={filiale.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex', alignItems: 'center', gap: 10,
                    background: 'var(--teal-dark)', color: 'white',
                    padding: '14px 20px', borderRadius: 6, textDecoration: 'none',
                    fontSize: 13, fontWeight: 600, transition: 'opacity 0.2s',
                  }}
                  onMouseOver={e => e.currentTarget.style.opacity = '0.85'}
                  onMouseOut={e => e.currentTarget.style.opacity = '1'}
                >
                  <FaIcon name="globe" size={16} />
                  {t('filiales.website') || 'Visiter le site web'} →
                </a>
              )}
            </div>
          </ScrollReveal>
        </div>

        {autresFiliales.length > 0 && (
          <ScrollReveal>
            <div style={{ marginTop: 80, paddingTop: 60, borderTop: '1px solid var(--gray-light)' }}>
              <span className="section-label">{t('filiales.sameSector')}</span>
              <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginTop: 24 }}>
                {autresFiliales.map(f => (
                  <Link key={f.id} to={`/nos-filiales/${f.id}`} className="filiale-card" style={{ flex: '1 1 200px', maxWidth: 280 }}>
                    <FilialeLogo id={f.id} sigle={f.sigle} size={56} logo={f.logo} />
                    <div className="filiale-name">{f.nom}</div>
                    <div className="filiale-sector">{f.secteur}</div>
                    <div className="filiale-country"><FaIcon name="location-dot" size={12} /> {f.pays}{f.ville ? `, ${f.ville}` : ''}</div>
                  </Link>
                ))}
              </div>
            </div>
          </ScrollReveal>
        )}
      </section>

      <CallToAction />
    </>
  )
}

function ContactFilialeBtn({ filiale, fullWidth }) {
  const style = {
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
    background: 'var(--gold)', color: 'var(--teal-dark)',
    padding: '12px 20px', borderRadius: 4,
    fontWeight: 700, fontSize: 13, letterSpacing: '0.04em',
    textDecoration: 'none', border: 'none', cursor: 'pointer',
    transition: 'opacity 0.2s',
    ...(fullWidth ? { width: '100%' } : {}),
  }
  const label = 'Contacter la filiale'

  if (filiale.email_contact) {
    return (
      <a href={`mailto:${filiale.email_contact}`} style={style}
        onMouseOver={e => e.currentTarget.style.opacity = '0.85'}
        onMouseOut={e => e.currentTarget.style.opacity = '1'}>
        <FaIcon name="envelope" size={14} />
        {label}
      </a>
    )
  }
  if (filiale.telephone) {
    return (
      <a href={`tel:${filiale.telephone}`} style={style}
        onMouseOver={e => e.currentTarget.style.opacity = '0.85'}
        onMouseOut={e => e.currentTarget.style.opacity = '1'}>
        <FaIcon name="phone" size={14} />
        {label}
      </a>
    )
  }
  return (
    <Link to="/contact" style={style}
      onMouseOver={e => e.currentTarget.style.opacity = '0.85'}
      onMouseOut={e => e.currentTarget.style.opacity = '1'}>
      <FaIcon name="envelope" size={14} />
      {label}
    </Link>
  )
}

const SOCIALS = [
  {
    key: 'linkedin',
    label: 'LinkedIn',
    color: '#0a66c2',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/>
        <circle cx="4" cy="4" r="2"/>
      </svg>
    ),
    href: v => v,
  },
  {
    key: 'facebook',
    label: 'Facebook',
    color: '#1877f2',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
      </svg>
    ),
    href: v => v,
  },
  {
    key: 'twitter',
    label: 'X / Twitter',
    color: '#000000',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
    href: v => v,
  },
  {
    key: 'instagram',
    label: 'Instagram',
    color: '#e1306c',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
        <circle cx="12" cy="12" r="4"/>
        <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
      </svg>
    ),
    href: v => v,
  },
  {
    key: 'youtube',
    label: 'YouTube',
    color: '#ff0000',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 001.46 6.42 29 29 0 001 12a29 29 0 00.46 5.58A2.78 2.78 0 003.41 19.54C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.96A29 29 0 0023 12a29 29 0 00-.46-5.58z"/>
        <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="white"/>
      </svg>
    ),
    href: v => v,
  },
  {
    key: 'tiktok',
    label: 'TikTok',
    color: '#000000',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.3 6.3 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.75a4.85 4.85 0 01-1.01-.06z"/>
      </svg>
    ),
    href: v => v,
  },
  {
    key: 'whatsapp',
    label: 'WhatsApp',
    color: '#25d366',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
    ),
    href: v => `https://wa.me/${v.replace(/\D/g, '')}`,
  },
]

function SocialBar({ filiale }) {
  const links = SOCIALS.filter(s => filiale[s.key])
  if (!links.length) return null

  return (
    <div style={{ background: 'var(--white)', padding: '20px 24px', borderRadius: 6, border: '1px solid var(--gray-light)' }}>
      <div style={labelStyle}>Réseaux sociaux</div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginTop: 4 }}>
        {links.map(s => (
          <a
            key={s.key}
            href={s.href(filiale[s.key])}
            target="_blank"
            rel="noopener noreferrer"
            title={s.label}
            style={{
              width: 40, height: 40,
              borderRadius: 8,
              background: s.color,
              color: 'white',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              textDecoration: 'none',
              transition: 'transform 0.15s, opacity 0.15s',
              flexShrink: 0,
            }}
            onMouseOver={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.opacity = '0.85' }}
            onMouseOut={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.opacity = '1' }}
          >
            {s.icon}
          </a>
        ))}
      </div>
    </div>
  )
}

const labelStyle = {
  fontSize: 11, fontWeight: 700, letterSpacing: '0.15em',
  textTransform: 'uppercase', color: 'var(--gray-mid)', marginBottom: 8,
}

const contactIconStyle = {
  flexShrink: 0, color: 'var(--teal)', marginTop: 1,
}

const contactRowStyle = {
  display: 'flex', alignItems: 'flex-start', gap: 8,
  fontSize: 13, color: 'var(--gray)', textDecoration: 'none', lineHeight: 1.4,
}
