import { Link } from 'react-router-dom'
import ScrollReveal from '../components/ui/ScrollReveal'
import CallToAction from '../components/sections/CallToAction'
import { useApi } from '../hooks/useApi'
import PageHero from '../components/ui/PageHero'
import { useLang } from '../contexts/LangContext'
import FaIcon from '../components/ui/FaIcon'
import { useResponsive } from '../hooks/useResponsive'

const API_URL = import.meta.env.VITE_API_URL?.replace('/api', '') || ''

const ORGANES = [
  {
    icon: 'users',
    num: '01',
    titre: "Assemblée Générale",
    desc: "Organe souverain réunissant l'ensemble des actionnaires. Elle adopte les grands axes stratégiques, approuve les comptes annuels et nomme les membres du Conseil d'Administration.",
  },
  {
    icon: 'university',
    num: '02',
    titre: "Conseil d'Administration",
    desc: "Définit les orientations stratégiques du groupe, approuve les grandes décisions et contrôle la gestion de la Direction Générale. Il rend compte à l'Assemblée Générale.",
  },
  {
    icon: 'shield-halved',
    num: '03',
    titre: "Comité Spécialisé",
    desc: "Veille à la fiabilité des informations financières, au contrôle interne et à la maîtrise des risques opérationnels et financiers au niveau du groupe et de ses filiales.",
  },
  {
    icon: 'briefcase',
    num: '04',
    titre: 'Directeur Général',
    desc: "Assure la mise en œuvre de la stratégie définie par le Conseil. Il pilote les filiales, coordonne les synergies inter-sectorielles et rend compte au Conseil d'Administration.",
  },
]

function MotSection({ photo, nom, titre, message, background, reverse = false }) {
  if (!nom && !message) return null

  const photoBlock = (
    <div style={{ flexShrink: 0, width: 260 }}>
      {photo ? (
        <div style={{
          width: '100%',
          aspectRatio: '3/4',
          borderRadius: 8,
          overflow: 'hidden',
          boxShadow: 'var(--shadow-lg)',
          border: '3px solid var(--gold)',
        }}>
          <img
            src={`${API_URL}${photo}`}
            alt={nom}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>
      ) : (
        <div style={{
          width: '100%',
          aspectRatio: '3/4',
          borderRadius: 8,
          background: 'var(--teal-dark)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 56,
          fontFamily: 'var(--font-num)',
          color: 'var(--gold-light)',
          border: '3px solid var(--gold)',
        }}>
          {(nom || '?').split(' ').map(w => w[0]).join('').slice(0, 2)}
        </div>
      )}
      <div style={{ textAlign: 'center', marginTop: 16 }}>
        <div style={{
          fontFamily: 'var(--font-display)',
          fontSize: 16,
          fontWeight: 700,
          color: background === 'dark' ? 'var(--white)' : 'var(--dark)',
        }}>{nom}</div>
        <div style={{
          fontSize: 12,
          fontWeight: 600,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: 'var(--gold-light)',
          marginTop: 4,
        }}>{titre}</div>
      </div>
    </div>
  )

  const messageBlock = (
    <div style={{ flex: 1, minWidth: 0 }}>
      <div style={{
        position: 'relative',
        padding: '36px 40px',
        background: background === 'dark' ? 'rgba(255,255,255,0.06)' : 'var(--ivory)',
        border: background === 'dark' ? '1px solid rgba(255,255,255,0.1)' : '1px solid var(--gray-light)',
        borderLeft: '4px solid var(--gold)',
        borderRadius: '0 8px 8px 0',
      }}>
        <div style={{
          position: 'absolute', top: -16, left: 20,
          fontFamily: 'Georgia, serif',
          fontSize: 100,
          color: 'var(--gold)',
          opacity: 0.18,
          lineHeight: 1,
          userSelect: 'none',
          pointerEvents: 'none',
        }}>"</div>
        <p style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(16px,1.6vw,20px)',
          color: background === 'dark' ? 'rgba(255,255,255,0.85)' : 'var(--dark)',
          lineHeight: 1.8,
          fontStyle: 'italic',
          margin: 0,
          position: 'relative',
        }}>
          {message}
        </p>
      </div>
    </div>
  )

  return (
    <ScrollReveal>
      <div style={{
        display: 'flex',
        gap: 48,
        alignItems: 'flex-start',
        flexWrap: 'wrap',
        maxWidth: 1000,
        margin: '0 auto',
        flexDirection: reverse ? 'row-reverse' : 'row',
      }}>
        {photoBlock}
        {messageBlock}
      </div>
    </ScrollReveal>
  )
}

export default function GouvernancePage() {
  const { t } = useLang()
  const { data: company, loading: loadingCompany } = useApi('/company')
  const { data: dirigeants = [], loading: loadingDirigeants } = useApi('/dirigeants')

  if (loadingCompany || loadingDirigeants) return (
    <div style={{ padding: '200px 5%', textAlign: 'center', color: 'var(--gray-mid)' }}>{t('common.loading')}</div>
  )

  const { isMobile, isTablet } = useResponsive()

  const piliers = company?.gouvernancePiliers ?? []

  const conseil = dirigeants.filter(d => !d.categorie || d.categorie === 'conseil')
  const comiteDirection = dirigeants.filter(d => d.categorie === 'direction')

  const conseilCols = isMobile ? '1fr' : isTablet ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)'

  const hasPresident = company?.nom_president || company?.mot_president
  const hasDg = company?.nom_dg || company?.mot_dg

  return (
    <>
      <PageHero
        section="governance"
        label={t('gouvernance.label')}
        title={<>{t('gouvernance.heroTitle1')}<br /><span>{t('gouvernance.heroTitleSpan')}</span></>}
        subtitle={t('gouvernance.heroSub')}
      />

      {/* ── Mot du Président ── */}
      {hasPresident && (
        <section style={{ background: 'var(--white)' }}>
          <ScrollReveal>
            <div style={{ textAlign: 'center', maxWidth: 640, margin: '0 auto 52px' }}>
              <span className="section-label">Message</span>
              <h2 className="section-title">
                Mot du <span>Président</span>
              </h2>
              <div className="gold-rule" style={{ margin: '20px auto' }} />
            </div>
          </ScrollReveal>
          <MotSection
            photo={company?.photo_president}
            nom={company?.nom_president}
            titre={company?.titre_president || "Président du Conseil d'Administration"}
            message={company?.mot_president}
            background="light"
          />
        </section>
      )}

      {/* ── Mot du DG ── */}
      {hasDg && (
        <section style={{ background: 'var(--ivory)', padding: '80px 5%' }}>
          <ScrollReveal>
            <div style={{ textAlign: 'center', maxWidth: 640, margin: '0 auto 52px' }}>
              <span className="section-label">Message</span>
              <h2 className="section-title">
                Mot du <span>Directeur Général</span>
              </h2>
              <div className="gold-rule" style={{ margin: '20px auto' }} />
            </div>
          </ScrollReveal>
          <MotSection
            photo={company?.photo_dg}
            nom={company?.nom_dg}
            titre={company?.titre_dg || 'Directeur Général'}
            message={company?.mot_dg}
            background="light"
            reverse
          />
        </section>
      )}

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

        {/* Hiérarchie verticale des 4 instances */}
        <div style={{ maxWidth: 860, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 0 }}>
          {ORGANES.map((o, i) => (
            <ScrollReveal key={o.titre} delay={i * 0.1}>
              <div style={{ display: 'flex', gap: 0, alignItems: 'stretch' }}>
                {/* Colonne numéro + trait vertical */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 56, flexShrink: 0 }}>
                  <div style={{
                    width: 44, height: 44, borderRadius: '50%',
                    background: 'var(--gold)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontFamily: 'var(--font-num)', fontSize: 14, fontWeight: 700,
                    color: 'var(--teal-dark)',
                    flexShrink: 0,
                    zIndex: 1,
                  }}>
                    {o.num}
                  </div>
                  {i < ORGANES.length - 1 && (
                    <div style={{ width: 2, flex: 1, minHeight: 32, background: 'rgba(184,146,42,0.3)' }} />
                  )}
                </div>

                {/* Carte */}
                <div style={{
                  flex: 1,
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: 8,
                  padding: '24px 28px',
                  marginLeft: 16,
                  marginBottom: i < ORGANES.length - 1 ? 16 : 0,
                  display: 'flex',
                  gap: 20,
                  alignItems: 'flex-start',
                  transition: 'all var(--transition)',
                }}
                  onMouseOver={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; e.currentTarget.style.borderColor = 'rgba(184,146,42,0.4)' }}
                  onMouseOut={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)' }}
                >
                  <div style={{
                    width: 44, height: 44, borderRadius: '50%',
                    background: 'rgba(255,255,255,0.1)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'var(--gold-light)',
                    flexShrink: 0,
                  }}>
                    <FaIcon name={o.icon} size={20} />
                  </div>
                  <div>
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: 17, fontWeight: 700, color: 'white', marginBottom: 8 }}>
                      {o.titre}
                    </div>
                    <p style={{ fontSize: 13.5, color: 'rgba(255,255,255,0.6)', lineHeight: 1.7, margin: 0 }}>
                      {o.desc}
                    </p>
                  </div>
                </div>
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
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(380px, 100%), 1fr))', gap: 16, maxWidth: 960, margin: '0 auto' }}>
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

      {/* ── La Direction du Groupe ── */}
      {conseil.length > 0 && (
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

          <div style={{
            display: 'grid',
            gridTemplateColumns: conseilCols,
            gap: 28,
            maxWidth: 1140,
            margin: '0 auto',
          }}>
            {conseil.map((d, i) => (
              <ScrollReveal key={d.id} delay={i * 0.07}>
                <div style={{
                  background: 'var(--white)',
                  border: '1px solid var(--gray-light)',
                  borderRadius: 12,
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%',
                  transition: 'box-shadow var(--transition), transform var(--transition)',
                }}
                  onMouseOver={e => { e.currentTarget.style.boxShadow = 'var(--shadow-lg)'; e.currentTarget.style.transform = 'translateY(-4px)' }}
                  onMouseOut={e => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'none' }}
                >
                  {/* ── Photo en haut ── */}
                  <div style={{
                    width: '100%',
                    paddingBottom: '75%',
                    position: 'relative',
                    background: 'linear-gradient(160deg, var(--teal) 0%, var(--teal-dark) 100%)',
                    overflow: 'hidden',
                    flexShrink: 0,
                  }}>
                    {d.photo ? (
                      <img
                        src={d.photo.startsWith('http') ? d.photo : `${API_URL}${d.photo}`}
                        alt={d.nom}
                        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    ) : (
                      <div style={{
                        position: 'absolute', inset: 0,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontFamily: 'var(--font-num)', fontSize: 52,
                        color: 'rgba(255,255,255,0.2)',
                      }}>
                        {d.nom.split(' ').map(w => w[0]).join('').slice(0, 2)}
                      </div>
                    )}
                    {/* Barre dorée en bas de la photo */}
                    <div style={{
                      position: 'absolute', bottom: 0, left: 0, right: 0,
                      height: 4, background: 'var(--gold)',
                    }} />
                  </div>

                  {/* ── Contenu ── */}
                  <div style={{
                    flex: 1,
                    padding: '24px 24px 28px',
                    display: 'flex',
                    flexDirection: 'column',
                  }}>
                    <div style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 19,
                      fontWeight: 700,
                      color: 'var(--dark)',
                      marginBottom: 6,
                      lineHeight: 1.2,
                    }}>
                      {d.nom}
                    </div>
                    <div style={{
                      fontSize: 11,
                      fontWeight: 700,
                      letterSpacing: '0.13em',
                      textTransform: 'uppercase',
                      color: 'var(--teal)',
                      marginBottom: 14,
                      paddingBottom: 14,
                      borderBottom: '1px solid var(--gray-light)',
                    }}>
                      {d.role}
                    </div>
                    {d.bio && (
                      <p style={{
                        fontSize: 13.5,
                        color: 'var(--gray-mid)',
                        lineHeight: 1.75,
                        margin: 0,
                        flex: 1,
                        display: '-webkit-box',
                        WebkitLineClamp: 4,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                      }}>
                        {d.bio}
                      </p>
                    )}
                    {d.linkedin && (
                      <a
                        href={d.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={e => e.stopPropagation()}
                        style={{
                          marginTop: 16,
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: 6,
                          fontSize: 12,
                          color: '#0a66c2',
                          textDecoration: 'none',
                          fontWeight: 600,
                          width: 'fit-content',
                        }}
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/>
                          <circle cx="4" cy="4" r="2"/>
                        </svg>
                        LinkedIn
                      </a>
                    )}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>
      )}

      {/* ── Comité de Direction ── */}
      {comiteDirection.length > 0 && (
        <section style={{ background: 'var(--ivory)', padding: '80px 5%' }}>
          <ScrollReveal>
            <div style={{ textAlign: 'center', maxWidth: 700, margin: '0 auto 60px' }}>
              <span className="section-label">Gouvernance opérationnelle</span>
              <h2 className="section-title">
                Comité de <span>Direction</span>
              </h2>
              <div className="gold-rule" style={{ margin: '24px auto' }} />
              <p style={{ fontSize: 17, color: 'var(--gray-mid)', lineHeight: 1.7 }}>
                Composé de {comiteDirection.length} membres, le Comité de Direction pilote au quotidien la stratégie opérationnelle du groupe et de ses filiales.
              </p>
            </div>
          </ScrollReveal>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
            gap: 20,
            maxWidth: 1100,
            margin: '0 auto',
          }}>
            {comiteDirection.map((d, i) => (
              <ScrollReveal key={d.id} delay={i * 0.06}>
                <div style={{
                  background: 'var(--white)',
                  border: '1px solid var(--gray-light)',
                  borderRadius: 8,
                  overflow: 'hidden',
                  transition: 'all var(--transition)',
                  height: '100%',
                }}
                  onMouseOver={e => { e.currentTarget.style.boxShadow = 'var(--shadow-md)'; e.currentTarget.style.borderColor = 'rgba(26,107,122,0.2)'; e.currentTarget.style.transform = 'translateY(-3px)' }}
                  onMouseOut={e => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.borderColor = 'var(--gray-light)'; e.currentTarget.style.transform = 'none' }}
                >
                  {/* Photo */}
                  <div style={{
                    width: '100%',
                    paddingBottom: '110%',
                    position: 'relative',
                    background: 'var(--teal-dark)',
                    overflow: 'hidden',
                  }}>
                    {d.photo ? (
                      <img
                        src={`${API_URL}${d.photo}`}
                        alt={d.nom}
                        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    ) : (
                      <div style={{
                        position: 'absolute', inset: 0,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontFamily: 'var(--font-num)', fontSize: 36, color: 'var(--gold-light)',
                      }}>
                        {d.nom.split(' ').map(w => w[0]).join('').slice(0, 2)}
                      </div>
                    )}
                    {/* Badge doré en bas */}
                    <div style={{
                      position: 'absolute', bottom: 0, left: 0, right: 0,
                      height: 3, background: 'var(--gold)',
                    }} />
                  </div>

                  {/* Info */}
                  <div style={{ padding: '16px 16px 20px' }}>
                    <div style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 14,
                      fontWeight: 700,
                      color: 'var(--dark)',
                      marginBottom: 4,
                      lineHeight: 1.3,
                    }}>
                      {d.nom}
                    </div>
                    <div style={{
                      fontSize: 11,
                      fontWeight: 600,
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      color: 'var(--teal)',
                      marginBottom: 10,
                    }}>
                      {d.role}
                    </div>
                    {d.bio && (
                      <p style={{
                        fontSize: 12.5,
                        color: 'var(--gray-mid)',
                        lineHeight: 1.6,
                        margin: 0,
                        display: '-webkit-box',
                        WebkitLineClamp: 4,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                      }}>
                        {d.bio}
                      </p>
                    )}
                  </div>
                </div>
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
                  { label: 'Notes', value: 'A / A2' },
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
                <div style={{ fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)' }}>Notes de crédit</div>
                <div style={{ display: 'flex', gap: 12, alignItems: 'baseline' }}>
                  <div style={{ fontFamily: 'var(--font-num)', fontSize: 56, color: 'var(--gold-light)', lineHeight: 1 }}>A</div>
                  <div style={{ fontFamily: 'var(--font-num)', fontSize: 36, color: 'rgba(184,146,42,0.7)', lineHeight: 1 }}>A2</div>
                </div>
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
