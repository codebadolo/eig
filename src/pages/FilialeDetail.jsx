import { useParams, Link } from 'react-router-dom'
import ScrollReveal from '../components/ui/ScrollReveal'
import FilialeLogo from '../components/ui/FilialeLogo'
import { logos } from '../assets/logos'
import CallToAction from '../components/sections/CallToAction'
import Seo from '../components/Seo'
import PageSkeleton from '../components/ui/PageSkeleton'
import { useApi } from '../hooks/useApi'
import PageHero from '../components/ui/PageHero'
import { useLang } from '../contexts/LangContext'
import FaIcon from '../components/ui/FaIcon'
import SocialIcon, { SOCIAL_NETWORKS } from '../components/ui/SocialIcon'
import { useResponsive } from '../hooks/useResponsive'

const API = import.meta.env.VITE_API_URL?.replace('/api', '') || ''

export default function FilialeDetail() {
  const { id } = useParams()
  const { t, pick, lang } = useLang()
  const { isMobile } = useResponsive()
  const { data: filiale, loading } = useApi(`/filiales/${id}`)
  const { data: allFiliales = [] } = useApi('/filiales?actif=true')
  const { data: metiers = [] } = useApi('/metiers')
  const metierMap = Object.fromEntries(metiers.map(m => [m.slug, m]))
  const tSecteur = (obj) => {
    const slug = obj?.secteur_slug || obj?.secteurSlug || ''
    if (slug && metierMap[slug]) return pick(metierMap[slug], 'titre')
    if (lang === 'en' && obj?.secteur_en) return obj.secteur_en
    return obj?.secteur || ''
  }

  if (loading) return <PageSkeleton />

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
      <Seo
        title={filiale.nom}
        description={pick(filiale, 'description') || `${filiale.nom}, filiale d'Excellis Invest Group.`}
        path={`/nos-filiales/${id}`}
      />
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
              <img src={resolvedLogo} alt={filiale.nom} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'contain', padding: 10 }} />
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
              {tSecteur(filiale)} · {filiale.pays}{filiale.ville ? ` · ${filiale.ville}` : ''}
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

            <p style={{ fontSize: 17, color: 'var(--gray-mid)', lineHeight: 1.8, textAlign: 'justify' }}>
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
                <p style={{ fontSize: 15, color: 'var(--gray)', lineHeight: 1.7, margin: 0, textAlign: 'justify' }}>
                  {pick(filiale, 'mission')}
                </p>
              </div>
            )}

            {pick(filiale, 'vision') && (
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
                <p style={{ fontSize: 15, color: 'var(--gray)', lineHeight: 1.7, margin: 0, textAlign: 'justify' }}>
                  {pick(filiale, 'vision')}
                </p>
              </div>
            )}

            {pick(filiale, 'valeurs') && (
              <div style={{ marginTop: 28 }}>
                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--gray-mid)', marginBottom: 14 }}>
                  {t('filiales.valeursLabel')}
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {pick(filiale, 'valeurs').split(/[·,\n]/).map(v => v.trim()).filter(Boolean).map((v, i) => (
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

            {pick(filiale, 'commentaires') && (
              <div style={{
                marginTop: 28,
                background: 'var(--ivory)',
                border: '1px solid var(--gray-light)',
                borderRadius: 6,
                padding: '20px 24px',
              }}>
                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--gray-mid)', marginBottom: 14 }}>
                  {t('filiales.infoCompl')}
                </div>
                <RichComment text={pick(filiale, 'commentaires')} />
              </div>
            )}

            <div style={{ marginTop: 40, display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              <ContactFilialeBtn filiale={filiale} />
              <Link to="/nos-filiales" className="btn-teal">{t('filiales.allFiliales')} <FaIcon name="arrow-right" size={16} /></Link>
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
                  <img src={resolvedLogo} alt={filiale.nom} loading="lazy" style={{ maxWidth: '100%', maxHeight: 160, objectFit: 'contain' }} />
                </div>
              )}

              <SocialBar filiale={filiale} />

              <div style={{ background: 'var(--ivory)', padding: 24, borderRadius: 6, border: '1px solid var(--gray-light)' }}>
                <div style={labelStyle}>{t('filiales.sectorLabel')}</div>
                <div style={{ fontWeight: 600, color: 'var(--teal)' }}>{tSecteur(filiale)}</div>
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
                          {[
                            filiale.adresse,
                            filiale.ville && !filiale.adresse?.includes(filiale.ville) ? filiale.ville : null,
                            filiale.pays && !filiale.adresse?.includes(filiale.pays) ? filiale.pays : null,
                          ].filter(Boolean).join(', ')}
                        </span>
                      </div>
                    )}
                  </div>
                  <div style={{ marginTop: 16 }}>
                    <ContactFilialeBtn filiale={filiale} fullWidth />
                  </div>
                </div>
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
                    <div className="filiale-sector">{tSecteur(f)}</div>
                    <div className="filiale-country"><FaIcon name="location-dot" size={12} /> {f.pays}{f.ville ? `, ${f.ville}` : ''}</div>
                  </Link>
                ))}
              </div>
            </div>
          </ScrollReveal>
        )}
      </section>

      <CallToAction
        contactHref={filiale.email_contact ? `mailto:${filiale.email_contact}` : filiale.telephone ? `tel:${filiale.telephone}` : undefined}
      />
    </>
  )
}

// Découpe le texte "commentaires" (rédigé en blocs séparés par une ligne vide,
// avec puces "— ..." ou lignes "Libellé : contenu") en titres + listes + paragraphes
// plutôt qu'un unique bloc de texte brut difficile à lire.
function RichComment({ text }) {
  const blocks = text.split(/\n\s*\n/).map(b => b.trim()).filter(Boolean)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {blocks.map((block, i) => {
        const lines = block.split('\n').map(l => l.trim()).filter(Boolean)
        const bulletLines = lines.filter(l => /^[—-]\s/.test(l))
        const isHeadingWithBullets = bulletLines.length > 0 && bulletLines.length >= lines.length - 1

        if (isHeadingWithBullets) {
          const heading = lines.length > bulletLines.length ? lines[0].replace(/\s*:\s*$/, '') : null
          return (
            <div key={i}>
              {heading && (
                <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--teal-dark)', marginBottom: 8 }}>
                  {heading}
                </div>
              )}
              <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 6 }}>
                {bulletLines.map((l, j) => {
                  const content = l.replace(/^[—-]\s*/, '')
                  const [label, ...rest] = content.split(/\s*:\s*/)
                  const detail = rest.join(' : ')
                  return (
                    <li key={j} style={{ display: 'flex', gap: 8, fontSize: 14, color: 'var(--gray)', lineHeight: 1.6 }}>
                      <span style={{ color: 'var(--gold)', flexShrink: 0 }}>—</span>
                      <span>
                        {detail ? <><strong style={{ color: 'var(--gray)' }}>{label}</strong> : {detail}</> : content}
                      </span>
                    </li>
                  )
                })}
              </ul>
            </div>
          )
        }

        if (lines.length === 1) {
          const m = lines[0].match(/^([^:]{3,40}?)\s*:\s*(.+)$/)
          if (m) {
            return (
              <p key={i} style={{ fontSize: 14, color: 'var(--gray)', lineHeight: 1.7, margin: 0, textAlign: 'justify' }}>
                <strong style={{ color: 'var(--teal-dark)' }}>{m[1]}</strong> : {m[2]}
              </p>
            )
          }
        }

        return (
          <p key={i} style={{ fontSize: 14, color: 'var(--gray)', lineHeight: 1.7, margin: 0, whiteSpace: 'pre-line', textAlign: 'justify' }}>
            {lines.join('\n')}
          </p>
        )
      })}
    </div>
  )
}

function ContactFilialeBtn({ filiale, fullWidth }) {
  const { t } = useLang()
  const style = {
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
    background: 'var(--gold)', color: 'var(--teal-dark)',
    padding: '12px 20px', borderRadius: 4,
    fontWeight: 700, fontSize: 13, letterSpacing: '0.04em',
    textDecoration: 'none', border: 'none', cursor: 'pointer',
    transition: 'opacity 0.2s',
    ...(fullWidth ? { width: '100%' } : {}),
  }
  const label = t('filiales.contactBtn')

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

const SOCIAL_KEYS = ['linkedin', 'facebook', 'twitter', 'instagram', 'youtube', 'tiktok', 'whatsapp']

function SocialBar({ filiale }) {
  const { t } = useLang()
  const links = SOCIAL_KEYS.filter(key => filiale[key])
  const hasWebsite = !!filiale.website
  if (!links.length && !hasWebsite) return null

  const btnStyle = {
    width: 40, height: 40, borderRadius: 8, color: 'white',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    textDecoration: 'none', transition: 'transform 0.15s, opacity 0.15s', flexShrink: 0,
  }

  return (
    <div style={{ background: 'var(--white)', padding: '20px 24px', borderRadius: 6, border: '1px solid var(--gray-light)' }}>
      <div style={labelStyle}>{t('filiales.sociaux')}</div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginTop: 4 }}>
        {links.map(key => {
          const net = SOCIAL_NETWORKS[key]
          return (
            <a key={key} href={net.href(filiale[key])} target="_blank" rel="noopener noreferrer" title={net.label} aria-label={net.label}
              style={{ ...btnStyle, background: net.color }}
              onMouseOver={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.opacity = '0.85' }}
              onMouseOut={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.opacity = '1' }}
            >
              <SocialIcon network={key} size={18} />
            </a>
          )
        })}
        {hasWebsite && (
          <a href={filiale.website} target="_blank" rel="noopener noreferrer" title={t('filiales.website') || 'Site web'}
            style={{ ...btnStyle, background: 'var(--teal-dark)' }}
            onMouseOver={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.opacity = '0.85' }}
            onMouseOut={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.opacity = '1' }}
          >
            <FaIcon name="globe" size={18} />
          </a>
        )}
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
