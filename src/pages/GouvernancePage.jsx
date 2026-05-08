import { Link } from 'react-router-dom'
import ScrollReveal from '../components/ui/ScrollReveal'
import CallToAction from '../components/sections/CallToAction'
import { useApi } from '../hooks/useApi'
import PageHero from '../components/ui/PageHero'
import { useLang } from '../contexts/LangContext'
import FaIcon from '../components/ui/FaIcon'

const API_URL = import.meta.env.VITE_API_URL?.replace('/api', '') || ''

const ORGANES = [
  {
    icon: 'university',
    titre: "Conseil d'Administration",
    desc: "Organe suprême de gouvernance, il définit les orientations stratégiques du groupe, approuve les grandes décisions et contrôle la gestion de la Direction Générale.",
    couleur: 'var(--teal-dark)',
  },
  {
    icon: 'briefcase',
    titre: 'Direction Générale',
    desc: "Assure la mise en œuvre de la stratégie définie par le Conseil. Elle pilote les filiales, coordonne les synergies inter-sectorielles et rend compte au Conseil d'Administration.",
    couleur: 'var(--teal)',
  },
  {
    icon: 'shield-halved',
    titre: "Comité d'Audit & Risques",
    desc: "Veille à la fiabilité des informations financières, au contrôle interne et à la maîtrise des risques opérationnels et financiers au niveau du groupe et de ses filiales.",
    couleur: 'var(--gold)',
  },
]

export default function GouvernancePage() {
  const { t } = useLang()
  const { data: company, loading: loadingCompany } = useApi('/company')
  const { data: dirigeants = [], loading: loadingDirigeants } = useApi('/dirigeants')

  if (loadingCompany || loadingDirigeants) return (
    <div style={{ padding: '200px 5%', textAlign: 'center', color: 'var(--gray-mid)' }}>{t('common.loading')}</div>
  )

  const piliers = company?.gouvernancePiliers ?? []

  return (
    <>
      <PageHero
        section="governance"
        label={t('gouvernance.label')}
        title={<>{t('gouvernance.heroTitle1')}<br /><span>{t('gouvernance.heroTitleSpan')}</span></>}
        subtitle={t('gouvernance.heroSub')}
      />

      {/* ── Citation ── */}
      <section style={{ background: 'var(--white)' }}>
        <ScrollReveal>
          <div style={{ maxWidth: 820, margin: '0 auto', position: 'relative' }}>
            <div style={{
              position: 'absolute', top: -20, left: -12,
              fontFamily: 'Georgia, serif', fontSize: 120,
              color: 'var(--gold)', opacity: 0.12, lineHeight: 1,
              userSelect: 'none', pointerEvents: 'none',
            }}>
              "
            </div>
            <div style={{ padding: '40px 48px', borderLeft: '4px solid var(--gold)', background: 'var(--ivory)', borderRadius: '0 8px 8px 0', position: 'relative' }}>
              <p style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(18px,2.2vw,26px)', color: 'var(--dark)', lineHeight: 1.6, fontStyle: 'italic', margin: 0 }}>
                {t('gouvernance.quote')}
              </p>
              <div style={{ marginTop: 24, display: 'flex', alignItems: 'center', gap: 14 }}>
                <div style={{ width: 36, height: 2, background: 'var(--gold)' }} />
                <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--teal)' }}>
                  {t('gouvernance.quoteBy')} — {company?.nom ?? 'Excellis Invest Group'}
                </span>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* ── Structure de gouvernance ── */}
      <section style={{ background: 'var(--teal-dark)', padding: '80px 5%' }}>
        <ScrollReveal>
          <div style={{ textAlign: 'center', maxWidth: 640, margin: '0 auto 60px' }}>
            <span className="section-label" style={{ color: 'var(--gold-light)' }}>{t('gouvernance.structureLabel')}</span>
            <h2 className="section-title" style={{ color: 'white' }}>
              {t('gouvernance.structureTitle1')} <span style={{ color: 'var(--gold-light)' }}>{t('gouvernance.structureTitleSpan')}</span>
            </h2>
            <div className="gold-rule" style={{ margin: '20px auto' }} />
          </div>
        </ScrollReveal>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20, maxWidth: 1000, margin: '0 auto' }}>
          {ORGANES.map((o, i) => (
            <ScrollReveal key={o.titre} delay={i * 0.1}>
              <div style={{
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 8,
                padding: '32px 28px',
                height: '100%',
                transition: 'all var(--transition)',
              }}
                onMouseOver={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; e.currentTarget.style.borderColor = 'rgba(184,146,42,0.4)' }}
                onMouseOut={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)' }}
              >
                <div style={{
                  width: 52, height: 52, borderRadius: '50%',
                  background: o.couleur === 'var(--gold)' ? 'rgba(184,146,42,0.2)' : 'rgba(255,255,255,0.1)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginBottom: 20, color: o.couleur === 'var(--gold)' ? 'var(--gold-light)' : 'white',
                }}>
                  <FaIcon name={o.icon} size={22} />
                </div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 17, fontWeight: 700, color: 'white', marginBottom: 12 }}>
                  {o.titre}
                </div>
                <p style={{ fontSize: 13.5, color: 'rgba(255,255,255,0.6)', lineHeight: 1.7, margin: 0 }}>
                  {o.desc}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ── Piliers ── */}
      {piliers.length > 0 && (
        <section style={{ background: 'var(--ivory)' }}>
          <div style={{ textAlign: 'center', maxWidth: 700, margin: '0 auto 60px' }}>
            <span className="section-label">{t('gouvernance.principesLabel')}</span>
            <h2 className="section-title">
              {t('gouvernance.principesTitle1')} <span>{piliers.length} {t('gouvernance.principesTitle2')}</span> {t('gouvernance.principesTitle3')}
            </h2>
            <div className="gold-rule" style={{ margin: '24px auto' }} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))', gap: 16, maxWidth: 960, margin: '0 auto' }}>
            {piliers.map((p, i) => (
              <ScrollReveal key={p.num} delay={i * 0.07}>
                <div style={{
                  background: 'var(--white)',
                  border: '1px solid var(--gray-light)',
                  borderRadius: 6,
                  padding: '24px 28px',
                  display: 'flex',
                  gap: 20,
                  alignItems: 'flex-start',
                  height: '100%',
                  transition: 'all var(--transition)',
                  position: 'relative',
                  overflow: 'hidden',
                }}
                  onMouseOver={e => { e.currentTarget.style.boxShadow = 'var(--shadow-md)'; e.currentTarget.style.borderColor = 'rgba(26,107,122,0.2)' }}
                  onMouseOut={e => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.borderColor = 'var(--gray-light)' }}
                >
                  <div style={{
                    width: 44, height: 44,
                    borderRadius: '50%',
                    background: 'var(--gold-pale)',
                    border: '1px solid rgba(184,146,42,0.25)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontFamily: 'var(--font-num)', fontSize: 17, fontWeight: 700,
                    color: 'var(--gold)', flexShrink: 0,
                  }}>
                    {p.num}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 700, color: 'var(--dark)', marginBottom: 6 }}>
                      {p.titre}
                    </div>
                    <div style={{ fontSize: 13.5, color: 'var(--gray-mid)', lineHeight: 1.65 }}>
                      {p.texte}
                    </div>
                  </div>
                  <div style={{ position: 'absolute', bottom: 0, left: 0, height: 3, width: 0, background: 'var(--gold)', transition: 'width var(--transition)' }}
                    onMouseOver={e => e.currentTarget.style.width = '100%'}
                    onMouseOut={e => e.currentTarget.style.width = '0'}
                  />
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>
      )}

      {/* ── Équipe dirigeante ── */}
      {dirigeants.length > 0 && (
        <section style={{ background: 'var(--white)' }}>
          <div style={{ textAlign: 'center', maxWidth: 700, margin: '0 auto 60px' }}>
            <span className="section-label">{t('gouvernance.teamLabel')}</span>
            <h2 className="section-title">
              {t('gouvernance.teamTitle1')} <span>{t('gouvernance.teamTitleSpan')}</span> {t('gouvernance.teamTitle2')}
            </h2>
            <div className="gold-rule" style={{ margin: '24px auto' }} />
            <p style={{ fontSize: 17, color: 'var(--gray-mid)', lineHeight: 1.7 }}>
              {t('gouvernance.teamDesc')}
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 260px))', gap: 24, alignItems: 'stretch', justifyContent: 'center' }}>
            {dirigeants.map((d, i) => (
              <ScrollReveal key={d.id} delay={i * 0.08} style={{ height: '100%' }}>
                <Link to={`/gouvernance/${d.id}`} style={{ textDecoration: 'none', height: '100%', display: 'block' }}>
                  <div className="dirigeant-card" style={{ cursor: 'pointer', height: '100%', position: 'relative' }}>

                    {/* Photo */}
                    <div className="dirigeant-photo" style={{ position: 'relative' }}>
                      {d.photo
                        ? <img src={`${API_URL}${d.photo}`} alt={d.nom} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        : <span style={{ fontFamily: 'var(--font-num)', fontSize: 48, color: 'rgba(255,255,255,0.25)' }}>
                            {d.nom.split(' ').map(w => w[0]).join('').slice(0, 2)}
                          </span>
                      }
                      {d.linkedin && (
                        <div style={{
                          position: 'absolute', bottom: 10, right: 10,
                          width: 28, height: 28, borderRadius: 4,
                          background: '#0a66c2',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                        }}>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
                            <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/>
                            <circle cx="4" cy="4" r="2"/>
                          </svg>
                        </div>
                      )}
                    </div>

                    {/* Info */}
                    <div className="dirigeant-info">
                      <div className="dirigeant-name">{d.nom}</div>
                      <div className="dirigeant-role">{d.role}</div>
                      <p className="dirigeant-bio">{d.bio}</p>
                      <div style={{ marginTop: 16, paddingTop: 14, borderTop: '1px solid var(--gray-light)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <span style={{ fontSize: 12, color: 'var(--teal)', fontWeight: 600, letterSpacing: '0.05em' }}>
                          {t('gouvernance.profileLink')}
                        </span>
                        <span style={{ color: 'var(--gray-light)', fontSize: 14 }}>→</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </section>
      )}

      {/* ── Notation Bloomfield ── */}
      <section style={{ background: 'var(--gold-pale)', padding: '80px 5%' }}>
        <ScrollReveal>
          <div style={{ display: 'flex', alignItems: 'center', gap: 60, flexWrap: 'wrap', maxWidth: 960, margin: '0 auto' }}>
            <div style={{ flex: 1, minWidth: 280 }}>
              <span className="section-label">{t('gouvernance.ratingLabel')}</span>
              <h2 className="section-title" style={{ fontSize: 'clamp(28px,3.5vw,44px)' }}>
                {t('gouvernance.ratingTitle1')} <span>{t('gouvernance.ratingTitleSpan')}</span> {t('gouvernance.ratingTitle2')}
              </h2>
              <div className="gold-rule" />
              <p style={{ fontSize: 16, color: 'var(--gray)', lineHeight: 1.7, marginBottom: 28 }}>
                {t('gouvernance.ratingDesc')}
              </p>
              <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
                {[
                  { label: 'Agence', value: 'Bloomfield Investment' },
                  { label: 'Périmètre', value: 'Groupe EIG' },
                  { label: 'Perspective', value: 'Stable' },
                ].map(item => (
                  <div key={item.label}>
                    <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--gray-mid)', marginBottom: 4 }}>{item.label}</div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--dark)' }}>{item.value}</div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ flexShrink: 0 }}>
              <div style={{
                width: 180, height: 180,
                background: 'var(--teal-dark)',
                borderRadius: 12,
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                gap: 8, boxShadow: 'var(--shadow-lg)',
                border: '1px solid rgba(184,146,42,0.2)',
              }}>
                <div style={{ fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)' }}>Note de crédit</div>
                <div style={{ fontFamily: 'var(--font-num)', fontSize: 64, color: 'var(--gold-light)', lineHeight: 1 }}>BBB</div>
                <div style={{ fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)' }}>Bloomfield Rating</div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      <CallToAction />
    </>
  )
}
