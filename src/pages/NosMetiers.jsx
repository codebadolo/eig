import { Link } from 'react-router-dom'
import ScrollReveal from '../components/ui/ScrollReveal'
import CallToAction from '../components/sections/CallToAction'
import { useApi } from '../hooks/useApi'
import FaIcon from '../components/ui/FaIcon'
import PageHero from '../components/ui/PageHero'

export default function NosMetiers() {
  const { data: metiers = [], loading } = useApi('/metiers')

  if (loading) return <div style={{ padding: '200px 5%', textAlign: 'center', color: 'var(--gray-mid)' }}>Chargement...</div>

  return (
    <>
      <PageHero
        section="nos-metiers"
        label="Nos Métiers"
        title={<>{metiers.length} secteurs stratégiques,<br /><span>une logique d'investissement cohérente</span></>}
        subtitle="Du marché financier à l'énergie, de l'assurance à la fintech, EIG intervient dans les secteurs qui structurent les économies africaines de demain."
      />

      <section style={{ background: 'var(--ivory)' }}>
        <div className="metiers-grid">
          {metiers.map((m, i) => {
            const count = Array.isArray(m.filialesIds) ? m.filialesIds.length : 0
            return (
              <ScrollReveal key={m.slug} delay={(i % 3) * 0.08}>
                <Link to={`/nos-metiers/${m.slug}`} className="metier-card">
                  <div className="metier-icon" style={{ background: m.couleur }}><FaIcon name={m.icone} size={24} /></div>
                  <span className="metier-arrow">↗</span>
                  <div className="metier-title">{m.titre}</div>
                  <div className="metier-desc">{m.description}</div>
                  <span className="metier-count">{count} {count > 1 ? 'filiales' : 'filiale'}</span>
                </Link>
              </ScrollReveal>
            )
          })}
        </div>
      </section>

      <CallToAction />
    </>
  )
}
