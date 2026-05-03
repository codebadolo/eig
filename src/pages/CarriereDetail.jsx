import { useParams, Link } from 'react-router-dom'
import ScrollReveal from '../components/ui/ScrollReveal'
import CallToAction from '../components/sections/CallToAction'
import { useApi } from '../hooks/useApi'
import PageHero from '../components/ui/PageHero'

function BulletList({ text, color = 'var(--teal)' }) {
  if (!text) return null
  return (
    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
      {text.split('\n').filter(Boolean).map((line, i) => (
        <li key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', fontSize: 15, color: 'var(--gray-mid)', lineHeight: 1.6 }}>
          <span style={{ color, fontWeight: 700, flexShrink: 0, marginTop: 2 }}>→</span>
          {line}
        </li>
      ))}
    </ul>
  )
}

function InfoBadge({ label, value, accent }) {
  return (
    <div style={{ background: accent ? 'var(--gold-pale)' : 'var(--ivory)', padding: '16px 20px', borderRadius: 6, border: `1px solid ${accent ? 'rgba(184,146,42,0.25)' : 'var(--gray-light)'}` }}>
      <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: accent ? 'var(--gold)' : 'var(--gray-mid)', marginBottom: 4 }}>{label}</div>
      <div style={{ fontWeight: 600, color: accent ? 'var(--teal-dark)' : 'var(--black)', fontSize: 14 }}>{value}</div>
    </div>
  )
}

export default function CarriereDetail() {
  const { id } = useParams()
  const { data: offre, loading } = useApi(`/carrieres/${id}`)

  if (loading) return <div style={{ padding: '200px 5%', textAlign: 'center', color: 'var(--gray-mid)' }}>Chargement...</div>

  if (!offre) {
    return (
      <div style={{ padding: '180px 5% 80px', textAlign: 'center' }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 48 }}>Offre introuvable</h1>
        <Link to="/carrieres" className="btn-primary" style={{ marginTop: 32, display: 'inline-flex' }}>
          ← Retour aux offres
        </Link>
      </div>
    )
  }

  return (
    <>
      <PageHero section="careers">
        <Link to="/carrieres" style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 6, marginBottom: 20 }}>
          ← Toutes les offres
        </Link>
        <div style={{ display: 'flex', gap: 10, marginBottom: 16, flexWrap: 'wrap' }}>
          <span style={{ background: 'var(--gold)', color: 'var(--teal-dark)', fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', padding: '4px 12px', borderRadius: 3 }}>{offre.type}</span>
          <span style={{ background: 'rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.8)', fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', padding: '4px 12px', borderRadius: 3 }}>{offre.departement}</span>
        </div>
        <h1 className="page-hero-title">{offre.titre}</h1>
        <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)', marginTop: 8, display: 'flex', alignItems: 'center', gap: 8 }}>
          <span>📍 {offre.lieu}</span>
          {offre.salaire && <><span style={{ opacity: 0.3 }}>·</span><span>💼 {offre.salaire}</span></>}
          {offre.dateExpiration && <><span style={{ opacity: 0.3 }}>·</span><span>📅 Expire : {offre.dateExpiration}</span></>}
        </p>
      </PageHero>

      <section style={{ background: 'var(--white)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 64, alignItems: 'start' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 48 }}>
            <ScrollReveal>
              <span className="section-label">Le poste</span>
              <h2 className="section-title" style={{ fontSize: 'clamp(22px,2.8vw,34px)' }}>Description du poste</h2>
              <div className="gold-rule" />
              <p style={{ fontSize: 16, color: 'var(--gray-mid)', lineHeight: 1.85 }}>{offre.description}</p>
            </ScrollReveal>

            {offre.missions && (
              <ScrollReveal delay={0.08}>
                <div style={{ borderLeft: '3px solid var(--teal)', paddingLeft: 24 }}>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 20, color: 'var(--dark)', marginBottom: 20 }}>Vos missions</h3>
                  <BulletList text={offre.missions} color="var(--teal)" />
                </div>
              </ScrollReveal>
            )}

            {offre.profil && (
              <ScrollReveal delay={0.12}>
                <div style={{ borderLeft: '3px solid var(--gold)', paddingLeft: 24 }}>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 20, color: 'var(--dark)', marginBottom: 20 }}>Profil recherché</h3>
                  <BulletList text={offre.profil} color="var(--gold)" />
                </div>
              </ScrollReveal>
            )}

            {offre.avantages && (
              <ScrollReveal delay={0.16}>
                <div style={{ background: 'var(--ivory)', borderRadius: 8, padding: '28px 32px', border: '1px solid var(--gray-light)' }}>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 20, color: 'var(--dark)', marginBottom: 20 }}>Ce que nous offrons</h3>
                  <BulletList text={offre.avantages} color="var(--teal)" />
                </div>
              </ScrollReveal>
            )}
          </div>

          <ScrollReveal delay={0.1}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, position: 'sticky', top: 100 }}>
              <div style={{ background: 'var(--teal-dark)', borderRadius: 8, padding: '28px 24px', textAlign: 'center' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 18, color: 'white', marginBottom: 8 }}>Intéressé(e) par ce poste ?</div>
                <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)', marginBottom: 20, lineHeight: 1.6 }}>
                  Envoyez votre CV et lettre de motivation à notre équipe RH.
                </p>
                <Link to="/contact" className="btn-primary" style={{ display: 'block', textAlign: 'center' }}>
                  Postuler maintenant →
                </Link>
              </div>

              <InfoBadge label="Type de contrat" value={offre.type} />
              <InfoBadge label="Département" value={offre.departement} />
              <InfoBadge label="Lieu" value={`📍 ${offre.lieu}`} />
              {offre.salaire && <InfoBadge label="Rémunération" value={offre.salaire} accent />}
              {offre.dateExpiration && <InfoBadge label="Date limite" value={`📅 ${offre.dateExpiration}`} />}

              <div style={{ marginTop: 8, padding: '16px 0', borderTop: '1px solid var(--gray-light)' }}>
                <Link to="/carrieres" style={{ fontSize: 13, color: 'var(--teal)', textDecoration: 'none' }}>
                  ← Voir toutes les offres
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <CallToAction />
    </>
  )
}
