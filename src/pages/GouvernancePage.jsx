import { useState } from 'react'
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
    titre: "Comités Spécialisés",
    desc: "Veillent à la fiabilité des informations financières, au contrôle interne et à la maîtrise des risques opérationnels et financiers au niveau du groupe et de ses filiales.",
  },
  {
    icon: 'briefcase',
    num: '04',
    titre: 'Direction Général',
    desc: "Assure la mise en œuvre de la stratégie définie par le Conseil. Il pilote les filiales, coordonne les synergies inter-sectorielles et rend compte au Conseil d'Administration.",
  },
]

function parseJSON(str) {
  if (!str) return []
  try { return JSON.parse(str) } catch { return [] }
}

/* ─── Portrait imposant : grande photo sans bordure + citation réduite et alignée à droite (sans responsabilités) ─── */
function LeaderFeature({ photo, nom, titre, citation, large = false, dark = false, reverse = false }) {
  if (!nom && !citation) return null

  const textColor = dark ? 'white' : 'var(--dark)'
  const photoUrl = photo
    ? (photo.startsWith('http') ? photo : `${API_URL}${photo}`)
    : null

  // Photo encore plus grande pour le président du groupe
  const photoWidth = large
    ? 'clamp(480px, 60%, 800px)'   // agrandi à 800px max
    : 'clamp(320px, 42%, 580px)'

  return (
    <ScrollReveal>
      <div style={{
        display: 'flex',
        gap: 'clamp(40px, 5vw, 88px)',
        alignItems: 'center',
        maxWidth: large ? 1500 : 1080,  // élargi le conteneur
        margin: '0 auto',
        flexWrap: 'wrap',
        flexDirection: reverse ? 'row-reverse' : 'row',
      }}>
        {/* ── Grande photo sans bordure ── */}
        <div style={{ flexShrink: 0, width: photoWidth }}>
          {photoUrl ? (
            <div style={{
              aspectRatio: '3/4',
              borderRadius: large ? 20 : 14,
              overflow: 'hidden',
              boxShadow: dark
                ? '0 48px 120px rgba(0,0,0,0.6)'
                : '0 48px 120px rgba(0,0,0,0.25)',
            }}>
              <img src={photoUrl} alt={nom}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            </div>
          ) : (
            <div style={{
              aspectRatio: '3/4',
              borderRadius: large ? 20 : 14,
              background: 'linear-gradient(160deg, var(--teal) 0%, var(--teal-dark) 100%)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: 'var(--font-num)',
              fontSize: large ? 100 : 64,
              color: 'var(--gold-light)',
              boxShadow: '0 48px 120px rgba(0,0,0,0.25)',
            }}>
              {(nom || '?').split(' ').map(w => w[0]).join('').slice(0, 2)}
            </div>
          )}
        </div>

        {/* ── Citation réduite + identité alignée à droite (sans responsabilités) ── */}
        <div style={{ 
          flex: 1, 
          minWidth: 280,
          textAlign: 'right'  // aligne tout le contenu à droite
        }}>
          {/* Guillemet décoratif plus petit */}
          <div style={{
            fontFamily: 'Georgia, serif',
            fontSize: large ? 'clamp(60px, 7vw, 100px)' : 'clamp(70px, 9vw, 120px)',
            color: 'var(--gold)',
            opacity: 0.2,
            lineHeight: 0.7,
            marginBottom: large ? 12 : 16,
            userSelect: 'none',
            textAlign: 'right',
          }}>"</div>

          {citation && (
            <p style={{
              fontFamily: 'var(--font-display)',
              fontSize: large ? 'clamp(13px, 1.4vw, 18px)' : 'clamp(15px, 1.6vw, 20px)',
              fontStyle: 'italic',
              color: dark ? 'rgba(255,255,255,0.85)' : 'var(--dark)',
              lineHeight: 1.5,
              margin: '0 0 28px',
              maxWidth: '85%',
              marginLeft: 'auto',  // pousse le texte à droite
            }}>
              {citation}
            </p>
          )}

          {/* Identité */}
          <div style={{
            paddingTop: 18,
            borderTop: `1px solid ${dark ? 'rgba(255,255,255,0.12)' : 'var(--gray-light)'}`,
          }}>
            <div style={{
              fontFamily: 'var(--font-display)',
              fontSize: large ? 'clamp(20px, 2.2vw, 30px)' : 'clamp(15px, 1.5vw, 20px)',
              fontWeight: 700,
              color: textColor,
              marginBottom: 6,
            }}>
              {nom}
            </div>
            <div style={{
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'var(--gold)',
            }}>
              {titre}
            </div>
          </div>
        </div>
      </div>
    </ScrollReveal>
  )
}

/* ─── Carte comité de direction : photo agrandie, nom au hover ─── */
function ComiteCard({ d }) {
  const [hovered, setHovered] = useState(false)
  const photoUrl = d.photo
    ? (d.photo.startsWith('http') ? d.photo : `${API_URL}${d.photo}`)
    : null

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative',
        aspectRatio: '3/4',  // Changé de 2/3 à 3/4 pour des photos plus grandes
        borderRadius: 12,
        overflow: 'hidden',
        boxShadow: hovered ? '0 28px 70px rgba(0,0,0,0.3)' : '0 6px 24px rgba(0,0,0,0.12)',
        transition: 'box-shadow 0.35s, transform 0.35s',
        cursor: 'default',
        transform: hovered ? 'translateY(-8px)' : 'translateY(0)',
      }}
    >
      {/* Photo */}
      {photoUrl ? (
        <img
          src={photoUrl}
          alt={d.nom}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
            transform: hovered ? 'scale(1.08)' : 'scale(1)',
            transition: 'transform 0.45s',
          }}
        />
      ) : (
        <div style={{
          width: '100%', height: '100%',
          background: 'linear-gradient(160deg, var(--teal) 0%, var(--teal-dark) 100%)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: 'var(--font-num)', fontSize: 48, color: 'var(--gold-light)',
        }}>
          {d.nom.split(' ').map(w => w[0]).join('').slice(0, 2)}
        </div>
      )}

      {/* Barre dorée en haut */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0,
        height: 4, background: 'var(--gold)',
      }} />

      {/* Overlay nom/rôle — visible seulement au hover */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        background: 'linear-gradient(to top, rgba(8,22,30,0.98) 0%, rgba(8,22,30,0.7) 55%, transparent 100%)',
        padding: '50px 16px 20px',
        opacity: hovered ? 1 : 0,
        transform: hovered ? 'translateY(0)' : 'translateY(12px)',
        transition: 'opacity 0.3s, transform 0.3s',
      }}>
        <div style={{
          fontFamily: 'var(--font-display)',
          fontSize: 14,
          fontWeight: 700,
          color: 'white',
          lineHeight: 1.3,
          marginBottom: 6,
        }}>
          {d.nom}
        </div>
        <div style={{
          fontSize: 10,
          fontWeight: 700,
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          color: 'var(--gold)',
        }}>
          {d.role}
        </div>
      </div>
    </div>
  )
}

export default function GouvernancePage() {
  const { t } = useLang()
  const { data: company, loading: loadingCompany } = useApi('/company')
  const { data: dirigeants = [], loading: loadingDirigeants } = useApi('/dirigeants')
  const { isMobile, isTablet } = useResponsive()

  if (loadingCompany || loadingDirigeants) return (
    <div style={{ padding: '200px 5%', textAlign: 'center', color: 'var(--gray-mid)' }}>{t('common.loading')}</div>
  )

  const piliers = company?.gouvernancePiliers ?? []

  const hasDg = company?.nom_dg || company?.photo_dg

  // Président du Groupe — dirigeant avec categorie 'president'
  const presidentGroupe = dirigeants.find(d => d.categorie === 'president')

  // Président du CA
  const presidentCA = dirigeants.find(d => d.categorie === 'conseil')

  // DG depuis dirigeants
  const dgDirigeant = dirigeants.find(d => d.categorie === 'dg')

  // Comité de direction
  const comiteDirection = dirigeants.filter(d => d.categorie === 'direction')
  // Ajustement des colonnes pour des cartes plus grandes
  const comiteCols = isMobile ? 'repeat(1, 1fr)' : isTablet ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)'

  return (
    <>
      <PageHero
        section="governance"
        label={t('gouvernance.label')}
        title={<>{t('gouvernance.heroTitle1')}<br /><span>{t('gouvernance.heroTitleSpan')}</span></>}
        subtitle={t('gouvernance.heroSub')}
      />

      {/* ── 1. Président du Groupe — grand portrait sans titre de section ── */}
      {presidentGroupe && (
        <section style={{ background: 'var(--white)', padding: '100px 5%' }}>
          <LeaderFeature
            photo={presidentGroupe.photo || company?.photo_president}
            nom={presidentGroupe.nom}
            titre={presidentGroupe.role || 'Président du Groupe'}
            citation={presidentGroupe.bio || company?.mot_president}
            large
          />
        </section>
      )}

      {/* ── 2. Les organes de gouvernance ── */}
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

        <div style={{ maxWidth: 860, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 0 }}>
          {ORGANES.map((o, i) => (
            <ScrollReveal key={o.titre} delay={i * 0.1}>
              <div style={{ display: 'flex', gap: 0, alignItems: 'stretch' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 56, flexShrink: 0 }}>
                  <div style={{
                    width: 44, height: 44, borderRadius: '50%',
                    background: 'var(--gold)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontFamily: 'var(--font-num)', fontSize: 14, fontWeight: 700,
                    color: 'var(--teal-dark)', flexShrink: 0, zIndex: 1,
                  }}>
                    {o.num}
                  </div>
                  {i < ORGANES.length - 1 && (
                    <div style={{ width: 2, flex: 1, minHeight: 32, background: 'rgba(184,146,42,0.3)' }} />
                  )}
                </div>
                <div style={{
                  flex: 1,
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: 8, padding: '24px 28px',
                  marginLeft: 16,
                  marginBottom: i < ORGANES.length - 1 ? 16 : 0,
                  display: 'flex', gap: 20, alignItems: 'flex-start',
                  transition: 'all var(--transition)',
                }}
                  onMouseOver={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; e.currentTarget.style.borderColor = 'rgba(184,146,42,0.4)' }}
                  onMouseOut={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)' }}
                >
                  <div style={{
                    width: 44, height: 44, borderRadius: '50%',
                    background: 'rgba(255,255,255,0.1)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'var(--gold-light)', flexShrink: 0,
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

      {/* ── 3. Mot du Président du CA ── */}
      {presidentCA && (
        <section style={{ background: 'var(--ivory)', padding: '100px 5%' }}>
          <ScrollReveal>
            <div style={{ textAlign: 'center', maxWidth: 640, margin: '0 auto 64px' }}>
              <span className="section-label">Conseil d'Administration</span>
              <div className="gold-rule" style={{ margin: '20px auto' }} />
            </div>
          </ScrollReveal>
          <LeaderFeature
            photo={presidentCA.photo}
            nom={presidentCA.nom}
            titre={presidentCA.role}
            citation={presidentCA.bio}
            reverse
          />
        </section>
      )}

      {/* ── 4. Principes directeurs ── */}
      {piliers.length > 0 && (
        <section style={{ background: 'var(--white)', padding: '80px 5%' }}>
          <div style={{ textAlign: 'center', maxWidth: 700, margin: '0 auto 60px' }}>
            <span className="section-label">{t('gouvernance.principesLabel')}</span>
            <h2 className="section-title">
              {t('gouvernance.principesTitle1')} <span>{piliers.length} {t('gouvernance.principesTitle2')}</span> {t('gouvernance.principesTitle3')}
            </h2>
            <div className="gold-rule" style={{ margin: '24px auto' }} />
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(380px, 100%), 1fr))',
            gap: 16, maxWidth: 960, margin: '0 auto',
          }}>
            {piliers.map((p, i) => (
              <ScrollReveal key={p.num} delay={i * 0.07}>
                <div style={{
                  background: 'var(--white)',
                  border: '1px solid var(--gray-light)',
                  borderRadius: 6, padding: '24px 28px',
                  display: 'flex', gap: 20, alignItems: 'flex-start',
                  height: '100%', transition: 'all var(--transition)',
                  position: 'relative', overflow: 'hidden',
                }}
                  onMouseOver={e => { e.currentTarget.style.boxShadow = 'var(--shadow-md)'; e.currentTarget.style.borderColor = 'rgba(26,107,122,0.2)' }}
                  onMouseOut={e => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.borderColor = 'var(--gray-light)' }}
                >
                  <div style={{
                    width: 44, height: 44, borderRadius: '50%',
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

      {/* ── 5. Directeur Général (sans responsabilités) ── */}
      {hasDg && (
        <section style={{ background: 'var(--ivory)', padding: '100px 5%' }}>
          <ScrollReveal>
            <div style={{ textAlign: 'center', maxWidth: 640, margin: '0 auto 64px' }}>
              <span className="section-label">Direction</span>
              <h2 className="section-title">
                Le <span>Directeur Général</span>
              </h2>
              <div className="gold-rule" style={{ margin: '20px auto' }} />
            </div>
          </ScrollReveal>
          <LeaderFeature
            photo={company?.photo_dg || dgDirigeant?.photo}
            nom={company?.nom_dg}
            titre={company?.titre_dg || 'Directeur Général'}
            citation={company?.mot_dg}
          />
        </section>
      )}

      {/* ── 6. Comité de Direction avec photos agrandies ── */}
      {comiteDirection.length > 0 && (
        <section style={{ background: 'var(--white)', padding: '80px 5%' }}>
          <ScrollReveal>
            <div style={{ textAlign: 'center', maxWidth: 700, margin: '0 auto 56px' }}>
              <span className="section-label">Gouvernance opérationnelle</span>
              <h2 className="section-title">
                Comité de <span>Direction</span>
              </h2>
              <div className="gold-rule" style={{ margin: '20px auto' }} />
              <p style={{ fontSize: 16, color: 'var(--gray-mid)', lineHeight: 1.7 }}>
                Composé de {comiteDirection.length} membres, le Comité de Direction pilote
                au quotidien la stratégie opérationnelle du groupe et de ses filiales.
              </p>
            </div>
          </ScrollReveal>

          <div style={{
            display: 'grid',
            gridTemplateColumns: comiteCols,
            gap: 30,
            maxWidth: 1200,
            margin: '0 auto',
          }}>
            {comiteDirection.map((d, i) => (
              <ScrollReveal key={d.id} delay={i * 0.05}>
                <ComiteCard d={d} />
              </ScrollReveal>
            ))}
          </div>
        </section>
      )}

      {/* ── 7. Notation Bloomfield ── */}
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
                  { label: 'Agence',      value: 'Bloomfield Investment' },
                  { label: 'Notes',       value: 'A / A2' },
                  { label: 'Périmètre',   value: 'Groupe EIG' },
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