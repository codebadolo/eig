import { Link } from 'react-router-dom'
import ScrollReveal from '../components/ui/ScrollReveal'
import CallToAction from '../components/sections/CallToAction'
import { useApi } from '../hooks/useApi'
import FaIcon from '../components/ui/FaIcon'
import PageHero from '../components/ui/PageHero'

const API_URL = import.meta.env.VITE_API_URL?.replace('/api', '') || ''

export default function LeGroupe() {
  const { data: company, loading } = useApi('/company')
  const { data: galleryImgs = [] } = useApi('/images?section=about-gallery&actif=true')

  if (loading) return <div style={{ padding: '200px 5%', textAlign: 'center', color: 'var(--gray-mid)' }}>Chargement...</div>

  const valeurs = company?.valeurs ?? []

  return (
    <>
      <PageHero
        section="about"
        label="Le Groupe"
        title={<>{company?.nom ?? 'Excellis Invest Group'} —<br /><span>Un acteur d'envergure africaine</span></>}
        subtitle={company?.descriptionCourte ?? "Holding d'investissement multisectorielle, nous pilotons un portefeuille de filiales dans 9 secteurs stratégiques au service de la transformation économique du Burkina Faso et de la sous-région."}
      />

      <section style={{ background: 'var(--white)' }}>
        <div className="groupe-page-grid">
          <ScrollReveal>
            <span className="section-label">Qui sommes-nous</span>
            <h2 className="section-title">
              Une holding de <span>référence</span> au cœur de l'Afrique
            </h2>
            <div className="gold-rule" />
            <p style={{ fontSize: 17, color: 'var(--gray-mid)', lineHeight: 1.8, marginBottom: 24 }}>
              {company?.description}
            </p>
            <p style={{ fontSize: 15, color: 'var(--gray-mid)', lineHeight: 1.8 }}>
              La solidité de sa gouvernance et la qualité de sa structure financière sont
              reconnues par la notation attribuée par Bloomfield Investment Corporation,
              lui conférant l'avantage d'une bonne signature, gage de crédibilité auprès
              des investisseurs, partenaires et institutions.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <div style={{ background: 'linear-gradient(135deg, var(--teal) 0%, var(--teal-dark) 100%)', borderRadius: 6, padding: '40px 36px', color: 'white' }}>
                <div style={{ fontFamily: 'var(--font-num)', fontSize: 52, color: 'var(--gold-light)', lineHeight: 1 }}>2025</div>
                <div style={{ fontSize: 13, letterSpacing: '0.1em', textTransform: 'uppercase', opacity: 0.6, marginTop: 8 }}>
                  Constitué en SA de droit burkinabè
                </div>
              </div>
              <div style={{ background: 'var(--gold-pale)', borderRadius: 6, padding: '28px 36px', border: '1px solid rgba(184,146,42,0.2)' }}>
                <div style={{ fontFamily: 'var(--font-num)', fontSize: 44, color: 'var(--gold)', lineHeight: 1 }}>BBB</div>
                <div style={{ fontSize: 13, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--gray-mid)', marginTop: 8 }}>
                  Notation Bloomfield Investment Corporation
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section style={{ background: 'var(--ivory)' }}>
        <div style={{ textAlign: 'center', maxWidth: 800, margin: '0 auto 60px' }}>
          <span className="section-label">Raison d'être</span>
          <h2 className="section-title">Mission, Vision &amp; Valeurs</h2>
          <div className="gold-rule" style={{ margin: '24px auto' }} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 60 }}>
          <ScrollReveal>
            <div style={{ background: 'var(--teal-dark)', borderRadius: 6, padding: '48px 40px', color: 'white' }}>
              <span className="section-label" style={{ color: 'var(--gold-light)' }}>Mission</span>
              <p style={{ fontFamily: 'var(--font-display)', fontSize: 22, lineHeight: 1.6, color: 'rgba(255,255,255,0.9)', fontStyle: 'italic' }}>
                "{company?.mission}"
              </p>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.15}>
            <div style={{ background: 'var(--white)', borderRadius: 6, padding: '48px 40px', border: '1px solid var(--gray-light)' }}>
              <span className="section-label">Vision</span>
              <p style={{ fontFamily: 'var(--font-display)', fontSize: 22, lineHeight: 1.6, color: 'var(--black)', fontStyle: 'italic' }}>
                "{company?.vision}"
              </p>
            </div>
          </ScrollReveal>
        </div>

        {valeurs.length > 0 && (
          <ScrollReveal>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 32, fontWeight: 700, textAlign: 'center', marginBottom: 36, color: 'var(--black)' }}>
              Nos valeurs
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20 }}>
              {valeurs.map(v => (
                <div key={v.titre} className="valeur-item" style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                  <div className="valeur-icon"><FaIcon name={v.icone} size={20} /></div>
                  <div>
                    <div className="valeur-title">{v.titre}</div>
                    <div className="valeur-text">{v.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        )}
      </section>

      {galleryImgs.length > 0 && (
        <section style={{ background: 'var(--white)', paddingTop: 0, paddingBottom: 0 }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: galleryImgs.length === 1 ? '1fr' : galleryImgs.length === 2 ? '1fr 1fr' : 'repeat(3, 1fr)',
            gap: 4,
            maxHeight: 340,
            overflow: 'hidden',
          }}>
            {galleryImgs.slice(0, 6).map((img, i) => (
              <div key={img.id} style={{
                overflow: 'hidden',
                gridColumn: galleryImgs.length >= 3 && i === 0 ? 'span 2' : 'span 1',
              }}>
                <img
                  src={`${API_URL}${img.url}`}
                  alt={img.alt || img.titre || 'Excellis Invest Group'}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', minHeight: 160 }}
                />
              </div>
            ))}
          </div>
        </section>
      )}

      <section style={{ background: 'var(--white)' }}>
        <div style={{ maxWidth: 640, marginBottom: 60 }}>
          <span className="section-label">Modèle économique</span>
          <h2 className="section-title">
            Une <span>philosophie de création de valeur</span> cohérente
          </h2>
          <div className="gold-rule" />
          <p className="section-lead">
            EIG intervient comme actionnaire stratégique et partenaire de développement de
            ses filiales, apportant capitaux, expertise et synergies inter-sectorielles.
          </p>
        </div>
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
          <Link to="/nos-metiers" className="btn-primary">Nos métiers →</Link>
          <Link to="/nos-filiales" className="btn-teal">Nos filiales →</Link>
          <Link to="/gouvernance" className="btn-secondary" style={{ color: 'var(--teal-dark)', borderColor: 'var(--teal-light)' }}>
            Notre gouvernance →
          </Link>
        </div>
      </section>

      <CallToAction />
    </>
  )
}
