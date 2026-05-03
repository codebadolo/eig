import { Link } from 'react-router-dom'
import ScrollReveal from '../ui/ScrollReveal'

const FALLBACK_PILIERS = [
  { num: '01', titre: 'Rigueur & Transparence', texte: 'Gouvernance SA de droit burkinabè, notation externe reconnue' },
  { num: '02', titre: 'Adaptabilité & Innovation', texte: 'Modèle évolutif, ancré dans les réalités africaines' },
  { num: '03', titre: 'Création de Valeur Durable', texte: 'Investissements de long terme dans les secteurs structurants' },
  { num: '04', titre: 'Esprit de Partenariat', texte: 'Croissance en synergie avec les partenaires institutionnels' },
  { num: '05', titre: 'Performance & Responsabilité', texte: 'Résultats mesurables, impact économique et social concret' },
]

export default function Governance({ company }) {
  const piliers = company?.gouvernancePiliers ?? FALLBACK_PILIERS

  return (
    <section className="section-gouv">
      <ScrollReveal className="gouv-content">
        <span className="section-label">Gouvernance</span>
        <h2 className="section-title">
          Une gouvernance structurée pour un groupe{' '}
          <em>de référence</em>
        </h2>
        <div className="gold-rule" style={{ background: 'var(--gold)' }} />

        <div className="gouv-quote">
          <p className="gouv-quote-text">
            "Notre ambition est d'être l'architecte d'une Afrique qui crée sa propre valeur,
            avec ses propres capitaux et ses propres talents."
          </p>
          <span className="gouv-quote-author">Direction Générale — {company?.nom ?? 'Excellis Invest Group'}</span>
        </div>

        <Link to="/gouvernance" className="btn-secondary">
          Découvrir notre gouvernance
          <span className="btn-arrow">→</span>
        </Link>
      </ScrollReveal>

      <ScrollReveal delay={0.2} className="gouv-visual">
        {piliers.map(p => (
          <div key={p.num} className="gouv-pillar">
            <span className="gouv-pillar-num">{p.num}</span>
            <div>
              <div className="gouv-pillar-title">{p.titre}</div>
              <div className="gouv-pillar-text">{p.texte}</div>
            </div>
          </div>
        ))}
      </ScrollReveal>
    </section>
  )
}
