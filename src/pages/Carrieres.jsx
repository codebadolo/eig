import { Link } from 'react-router-dom'
import ScrollReveal from '../components/ui/ScrollReveal'
import CallToAction from '../components/sections/CallToAction'
import { useApi } from '../hooks/useApi'
import FaIcon from '../components/ui/FaIcon'
import PageHero from '../components/ui/PageHero'

const atouts = [
  { icone: 'globe', titre: 'Impact panafricain', texte: "Rejoindre EIG, c'est contribuer au développement économique de l'Afrique de l'Ouest." },
  { icone: 'chart-line', titre: 'Évolution de carrière', texte: "Un écosystème de filiales offrant de multiples opportunités d'évolution et de mobilité." },
  { icone: 'graduation-cap', titre: 'Formation continue', texte: "Un investissement constant dans le développement des compétences et le leadership." },
  { icone: 'handshake', titre: 'Culture collaborative', texte: "L'esprit d'équipe comme valeur fondamentale, au service de la performance collective." },
]

export default function Carrieres() {
  const { data: offres = [], loading } = useApi('/carrieres?actif=true')

  return (
    <>
      <PageHero
        section="careers"
        label="Carrières"
        title={<>Construisez votre avenir<br /><span>avec Excellis Invest Group</span></>}
        subtitle="Rejoignez un groupe panafricain en pleine croissance et contribuez à la transformation économique de l'Afrique de l'Ouest."
      />

      <section style={{ background: 'var(--white)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}>
          <ScrollReveal>
            <span className="section-label">Pourquoi nous rejoindre</span>
            <h2 className="section-title">
              Un groupe où <span>vos talents</span> créent de la valeur
            </h2>
            <div className="gold-rule" />
            <p className="section-lead">
              Excellis Invest Group réunit des professionnels engagés, animés par la
              conviction que l'Afrique peut créer sa propre valeur avec ses propres talents.
            </p>
            <Link to="/contact" className="btn-primary">Candidature spontanée →</Link>
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              {atouts.map(a => (
                <div key={a.titre} className="pillar" style={{ padding: 24 }}>
                  <div style={{ marginBottom: 12, color: 'var(--gold)' }}><FaIcon name={a.icone} size={28} /></div>
                  <div className="pillar-title">{a.titre}</div>
                  <div className="pillar-text">{a.texte}</div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section style={{ background: 'var(--ivory)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 48, flexWrap: 'wrap', gap: 20 }}>
          <div>
            <span className="section-label">Postes ouverts</span>
            <h2 className="section-title">Nos <span>offres d'emploi</span></h2>
          </div>
          {offres.length > 0 && (
            <span style={{ fontSize: 13, color: 'var(--gray-mid)' }}>{offres.length} offre{offres.length > 1 ? 's' : ''}</span>
          )}
        </div>

        {loading && <div style={{ textAlign: 'center', color: 'var(--gray-mid)', padding: '40px 0' }}>Chargement...</div>}

        {!loading && offres.length === 0 && (
          <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--gray-mid)' }}>
            <p style={{ fontSize: 17 }}>Aucune offre ouverte en ce moment.</p>
            <p style={{ fontSize: 14, marginTop: 8 }}>Déposez une candidature spontanée, nous l'étudierons avec attention.</p>
          </div>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {offres.map((o, i) => (
            <ScrollReveal key={o.id} delay={i * 0.06}>
              <Link to={`/carrieres/${o.id}`} style={{ textDecoration: 'none' }}>
                <div className="offre-card">
                  <div>
                    <div className="offre-title">{o.titre}</div>
                    <div className="offre-meta">
                      <span className="offre-tag">{o.departement}</span>
                      <span className="offre-tag gold">{o.type}</span>
                      <span style={{ fontSize: 12, color: 'var(--gray-mid)', display: 'flex', alignItems: 'center', gap: 4 }}>
                        📍 {o.lieu}
                      </span>
                      {o.dateExpiration && (
                        <span style={{ fontSize: 12, color: 'var(--gray-mid)' }}>📅 {o.dateExpiration}</span>
                      )}
                    </div>
                  </div>
                  <span style={{ fontSize: 22, color: 'var(--gray-light)', flexShrink: 0 }}>→</span>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal>
          <div style={{ marginTop: 48, padding: 40, background: 'var(--teal-dark)', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 32, flexWrap: 'wrap' }}>
            <div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 24, color: 'white', marginBottom: 8 }}>
                Vous ne trouvez pas le poste idéal ?
              </div>
              <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 15 }}>
                Envoyez-nous votre candidature spontanée, nous sommes toujours ouverts aux profils talentueux.
              </p>
            </div>
            <Link to="/contact" className="btn-primary">Candidature spontanée →</Link>
          </div>
        </ScrollReveal>
      </section>

      <CallToAction />
    </>
  )
}
