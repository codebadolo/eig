import { useParams, Link } from 'react-router-dom'
import ScrollReveal from '../components/ui/ScrollReveal'
import CallToAction from '../components/sections/CallToAction'
import { useApi } from '../hooks/useApi'
import PageHero from '../components/ui/PageHero'
import { useLang } from '../contexts/LangContext'
import { useResponsive } from '../hooks/useResponsive'

const API_URL = import.meta.env.VITE_API_URL?.replace('/api', '') || ''

function Section({ label, children }) {
  return (
    <div style={{ borderLeft: '3px solid var(--gold)', paddingLeft: 24 }}>
      <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 19, color: 'var(--dark)', marginBottom: 16, letterSpacing: '-0.01em' }}>{label}</h3>
      {children}
    </div>
  )
}

function TagList({ text }) {
  if (!text) return null
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
      {text.split('\n').filter(Boolean).map((tag, i) => (
        <span key={i} style={{
          background: 'var(--gold-pale)',
          color: 'var(--teal-dark)',
          fontSize: 13,
          fontWeight: 500,
          padding: '6px 14px',
          borderRadius: 3,
          border: '1px solid rgba(184,146,42,0.2)',
        }}>{tag}</span>
      ))}
    </div>
  )
}

function Timeline({ text }) {
  if (!text) return null
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
      {text.split('\n').filter(Boolean).map((line, i, arr) => {
        const parts = line.split(' – ')
        const role = parts[0]
        const rest = parts.slice(1).join(' – ')
        return (
          <div key={i} style={{ display: 'flex', gap: 16, alignItems: 'stretch' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0, width: 20 }}>
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: 'var(--teal)', flexShrink: 0, marginTop: 6 }} />
              {i < arr.length - 1 && <div style={{ width: 2, flex: 1, background: 'var(--gray-light)', minHeight: 20 }} />}
            </div>
            <div style={{ paddingBottom: i < arr.length - 1 ? 20 : 0 }}>
              <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--dark)' }}>{role}</div>
              {rest && <div style={{ fontSize: 13, color: 'var(--gray-mid)', marginTop: 2 }}>{rest}</div>}
            </div>
          </div>
        )
      })}
    </div>
  )
}

function DiplomaList({ text }) {
  if (!text) return null
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      {text.split('\n').filter(Boolean).map((line, i) => {
        const parts = line.split(' – ')
        const diplome = parts[0]
        const rest = parts.slice(1).join(' – ')
        return (
          <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
            <span style={{ color: 'var(--gold)', fontWeight: 700, flexShrink: 0, marginTop: 2 }}>🎓</span>
            <div>
              <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--dark)' }}>{diplome}</div>
              {rest && <div style={{ fontSize: 12, color: 'var(--gray-mid)', marginTop: 2 }}>{rest}</div>}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default function DirigeantDetail() {
  const { id } = useParams()
  const { t } = useLang()
  const { isMobile } = useResponsive()
  const { data: dirigeant, loading } = useApi(`/dirigeants/${id}`)
  const { data: allDirigeants = [] } = useApi('/dirigeants')

  if (loading) return <div style={{ padding: '200px 5%', textAlign: 'center', color: 'var(--gray-mid)' }}>{t('common.loading')}</div>

  if (!dirigeant) {
    return (
      <div style={{ padding: '180px 5% 80px', textAlign: 'center' }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 48 }}>{t('common.notFound')}</h1>
        <Link to="/gouvernance" className="btn-primary" style={{ marginTop: 32, display: 'inline-flex' }}>
          {t('gouvernance.backToAll')}
        </Link>
      </div>
    )
  }

  const initials = dirigeant.nom.split(' ').map(w => w[0]).join('').slice(0, 2)
  const autres = allDirigeants.filter(d => d.id !== id).slice(0, 3)

  return (
    <>
      <PageHero section="governance">
        <Link to="/gouvernance" style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 6, marginBottom: 20 }}>
          {t('gouvernance.backToAll')}
        </Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: 28, flexWrap: 'wrap' }}>
          <div style={{
            width: 90, height: 90, borderRadius: '50%',
            background: 'rgba(255,255,255,0.12)',
            border: '2px solid rgba(184,146,42,0.5)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            overflow: 'hidden', flexShrink: 0,
            fontFamily: 'var(--font-num)', fontSize: 28, color: 'var(--gold-light)',
          }}>
            {dirigeant.photo
              ? <img src={`${API_URL}${dirigeant.photo}`} alt={dirigeant.nom} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              : initials
            }
          </div>
          <div>
            <h1 className="page-hero-title" style={{ marginBottom: 6 }}>{dirigeant.nom}</h1>
            <span style={{ fontSize: 13, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--gold-light)' }}>{dirigeant.role}</span>
            {dirigeant.linkedin && (
              <a href={dirigeant.linkedin} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 10, color: 'rgba(255,255,255,0.55)', fontSize: 13, textDecoration: 'none' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>
                LinkedIn
              </a>
            )}
          </div>
        </div>
      </PageHero>

      <section style={{ background: 'var(--white)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '2fr 1fr', gap: isMobile ? 40 : 64, alignItems: 'start' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 48 }}>
            <ScrollReveal>
              <span className="section-label">{t('gouvernance.bioLabel')}</span>
              <h2 className="section-title" style={{ fontSize: 'clamp(22px,2.8vw,34px)' }}>{dirigeant.nom}</h2>
              <div className="gold-rule" />
              <p style={{ fontSize: 16, color: 'var(--gray-mid)', lineHeight: 1.85 }}>{dirigeant.bio}</p>
            </ScrollReveal>

            {dirigeant.expertise && (
              <ScrollReveal delay={0.08}>
                <Section label={t('gouvernance.expertiseLabel')}>
                  <TagList text={dirigeant.expertise} />
                </Section>
              </ScrollReveal>
            )}

            {dirigeant.experiences && (
              <ScrollReveal delay={0.12}>
                <Section label={t('gouvernance.experiencesLabel')}>
                  <Timeline text={dirigeant.experiences} />
                </Section>
              </ScrollReveal>
            )}

            {dirigeant.formation && (
              <ScrollReveal delay={0.16}>
                <Section label={t('gouvernance.formationLabel')}>
                  <DiplomaList text={dirigeant.formation} />
                </Section>
              </ScrollReveal>
            )}
          </div>

          <ScrollReveal delay={0.1}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, position: 'sticky', top: 100 }}>
              {dirigeant.photo ? (
                <div style={{ borderRadius: 8, overflow: 'hidden', aspectRatio: '3/4', background: 'var(--ivory)' }}>
                  <img src={`${API_URL}${dirigeant.photo}`} alt={dirigeant.nom} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              ) : (
                <div style={{ borderRadius: 8, background: 'var(--teal-dark)', aspectRatio: '3/4', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-num)', fontSize: 64, color: 'var(--gold-light)' }}>
                  {initials}
                </div>
              )}

              <div style={{ background: 'var(--ivory)', padding: '20px 24px', borderRadius: 6, border: '1px solid var(--gray-light)' }}>
                <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--gray-mid)', marginBottom: 4 }}>{t('gouvernance.fonctionLabel')}</div>
                <div style={{ fontWeight: 600, color: 'var(--teal)', fontSize: 14 }}>{dirigeant.role}</div>
              </div>

              {dirigeant.linkedin && (
                <a href={dirigeant.linkedin} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#0a66c2', color: 'white', padding: '12px 20px', borderRadius: 6, textDecoration: 'none', fontSize: 14, fontWeight: 500, justifyContent: 'center' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>
                  {t('gouvernance.linkedinBtn')}
                </a>
              )}

              <Link to="/gouvernance" style={{ fontSize: 13, color: 'var(--teal)', textDecoration: 'none', padding: '12px 0', borderTop: '1px solid var(--gray-light)', display: 'block' }}>
                {t('gouvernance.backToTeam')}
              </Link>
            </div>
          </ScrollReveal>
        </div>

        {autres.length > 0 && (
          <ScrollReveal>
            <div style={{ marginTop: 80, paddingTop: 60, borderTop: '1px solid var(--gray-light)' }}>
              <span className="section-label">{t('gouvernance.teamLabel')}</span>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 16, marginTop: 24 }}>
                {autres.map(d => (
                  <Link key={d.id} to={`/gouvernance/${d.id}`} style={{ textDecoration: 'none' }}>
                    <div style={{ background: 'var(--ivory)', borderRadius: 8, padding: 24, border: '1px solid var(--gray-light)', textAlign: 'center', transition: 'box-shadow 0.2s' }}>
                      <div style={{
                        width: 60, height: 60, borderRadius: '50%', margin: '0 auto 16px',
                        background: 'var(--teal-dark)', overflow: 'hidden',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontFamily: 'var(--font-num)', fontSize: 18, color: 'var(--gold-light)',
                      }}>
                        {d.photo
                          ? <img src={`${API_URL}${d.photo}`} alt={d.nom} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                          : d.nom.split(' ').map(w => w[0]).join('').slice(0, 2)
                        }
                      </div>
                      <div style={{ fontWeight: 600, fontSize: 14, color: 'var(--dark)', marginBottom: 4 }}>{d.nom}</div>
                      <div style={{ fontSize: 12, color: 'var(--gray-mid)' }}>{d.role}</div>
                    </div>
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
