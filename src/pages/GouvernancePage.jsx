import { Link } from 'react-router-dom'
import ScrollReveal from '../components/ui/ScrollReveal'
import CallToAction from '../components/sections/CallToAction'
import { useApi } from '../hooks/useApi'
import PageHero from '../components/ui/PageHero'

const API_URL = import.meta.env.VITE_API_URL?.replace('/api', '') || ''

export default function GouvernancePage() {
  const { data: company, loading: loadingCompany } = useApi('/company')
  const { data: dirigeants = [], loading: loadingDirigeants } = useApi('/dirigeants')

  if (loadingCompany || loadingDirigeants) return (
    <div style={{ padding: '200px 5%', textAlign: 'center', color: 'var(--gray-mid)' }}>Chargement...</div>
  )

  const piliers = company?.gouvernancePiliers ?? []

  return (
    <>
      <PageHero
        section="governance"
        label="Gouvernance"
        title={<>Une gouvernance structurée<br /><span>pour un groupe de référence</span></>}
        subtitle="Constitué en société anonyme de droit burkinabè, EIG s'appuie sur une gouvernance rigoureuse, une notation externe et des principes clairs pour garantir la performance et la confiance de ses parties prenantes."
      />

      <section style={{ background: 'var(--white)' }}>
        <ScrollReveal>
          <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
            <div className="gouv-quote" style={{ textAlign: 'left', marginBottom: 0 }}>
              <p className="gouv-quote-text" style={{ color: 'var(--dark)', fontSize: 24 }}>
                "Notre ambition est d'être l'architecte d'une Afrique qui crée sa propre valeur,
                avec ses propres capitaux et ses propres talents."
              </p>
              <span className="gouv-quote-author" style={{ color: 'var(--teal)' }}>
                Direction Générale — {company?.nom ?? 'Excellis Invest Group'}
              </span>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {piliers.length > 0 && (
        <section style={{ background: 'var(--ivory)' }}>
          <div style={{ textAlign: 'center', maxWidth: 700, margin: '0 auto 60px' }}>
            <span className="section-label">Principes directeurs</span>
            <h2 className="section-title">Les <span>{piliers.length} piliers</span> de notre gouvernance</h2>
            <div className="gold-rule" style={{ margin: '24px auto' }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 900, margin: '0 auto' }}>
            {piliers.map((p, i) => (
              <ScrollReveal key={p.num} delay={i * 0.08}>
                <div className="gouv-pillar" style={{ background: 'var(--white)', border: '1px solid var(--gray-light)', padding: '24px 32px' }}>
                  <span className="gouv-pillar-num" style={{ color: 'var(--gold)', opacity: 1 }}>{p.num}</span>
                  <div>
                    <div className="gouv-pillar-title" style={{ color: 'var(--black)', fontSize: 17 }}>{p.titre}</div>
                    <div className="gouv-pillar-text" style={{ color: 'var(--gray-mid)', marginTop: 6 }}>{p.texte}</div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>
      )}

      {dirigeants.length > 0 && (
        <section style={{ background: 'var(--white)' }}>
          <div style={{ textAlign: 'center', maxWidth: 700, margin: '0 auto 60px' }}>
            <span className="section-label">Équipe dirigeante</span>
            <h2 className="section-title">La <span>direction</span> du Groupe</h2>
            <div className="gold-rule" style={{ margin: '24px auto' }} />
            <p style={{ fontSize: 17, color: 'var(--gray-mid)', lineHeight: 1.7 }}>
              L'équipe de direction d'Excellis Invest Group rassemble des experts reconnus dans
              leurs domaines respectifs, engagés dans la création de valeur durable.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 20 }}>
            {dirigeants.map((d, i) => (
              <ScrollReveal key={d.id} delay={i * 0.08}>
                <Link to={`/gouvernance/${d.id}`} style={{ textDecoration: 'none' }}>
                  <div className="dirigeant-card" style={{ cursor: 'pointer' }}>
                    <div className="dirigeant-photo">
                      {d.photo
                        ? <img src={`${API_URL}${d.photo}`} alt={d.nom} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        : d.nom.split(' ').map(w => w[0]).join('').slice(0, 2)
                      }
                    </div>
                    <div className="dirigeant-info">
                      <div className="dirigeant-name">{d.nom}</div>
                      <div className="dirigeant-role">{d.role}</div>
                      <p className="dirigeant-bio">{d.bio}</p>
                      <span style={{ fontSize: 12, color: 'var(--teal)', marginTop: 8, display: 'inline-block' }}>Voir le profil →</span>
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </section>
      )}

      <section style={{ background: 'var(--gold-pale)', padding: '80px 5%' }}>
        <ScrollReveal>
          <div style={{ display: 'flex', alignItems: 'center', gap: 60, flexWrap: 'wrap', maxWidth: 900, margin: '0 auto' }}>
            <div>
              <span className="section-label">Notation Externe</span>
              <h2 className="section-title" style={{ fontSize: 'clamp(28px,3.5vw,44px)' }}>
                Noté par <span>Bloomfield</span> Investment Corporation
              </h2>
              <div className="gold-rule" />
              <p style={{ fontSize: 16, color: 'var(--gray)', lineHeight: 1.7 }}>
                La solidité de la gouvernance et la qualité de la structure financière d'EIG
                sont reconnues par la notation BBB attribuée par Bloomfield Investment
                Corporation, conférant au Groupe une signature de référence.
              </p>
            </div>
            <div style={{ flexShrink: 0 }}>
              <div style={{ width: 160, height: 160, background: 'var(--teal-dark)', borderRadius: 8, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8, boxShadow: 'var(--shadow-lg)' }}>
                <div style={{ fontFamily: 'var(--font-num)', fontSize: 56, color: 'var(--gold-light)', lineHeight: 1 }}>BBB</div>
                <div style={{ fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)' }}>Bloomfield Rating</div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      <CallToAction />
    </>
  )
}
