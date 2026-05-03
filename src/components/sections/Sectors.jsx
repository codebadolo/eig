import { Link } from 'react-router-dom'
import ScrollReveal from '../ui/ScrollReveal'
import FaIcon from '../ui/FaIcon'

export default function Sectors({ metiers = [] }) {
  if (!metiers.length) return null

  return (
    <section className="section-metiers">
      <div style={{ maxWidth: 640, marginBottom: 60 }}>
        <span className="section-label">Nos métiers</span>
        <h2 className="section-title">
          {metiers.length} secteurs stratégiques, <span>une logique d'investissement</span> cohérente
        </h2>
        <div className="gold-rule" />
        <p className="section-lead">
          Du marché financier à l'énergie, de l'assurance à la fintech, EIG intervient dans
          les secteurs qui structurent les économies africaines de demain.
        </p>
      </div>

      <div className="metiers-grid">
        {metiers.map((m, i) => {
          const count = Array.isArray(m.filialesIds) ? m.filialesIds.length : (m.filiales ?? 0)
          return (
            <ScrollReveal key={m.slug} delay={(i % 3) * 0.08}>
              <Link to={`/nos-metiers/${m.slug}`} className="metier-card">
                <div className="metier-icon" style={{ background: m.couleur }}>
                  <FaIcon name={m.icone} size={24} />
                </div>
                <span className="metier-arrow">↗</span>
                <div className="metier-title">{m.titre}</div>
                <div className="metier-desc">{m.description}</div>
                <span className="metier-count">
                  {count} {count > 1 ? 'filiales' : 'filiale'}
                </span>
              </Link>
            </ScrollReveal>
          )
        })}
      </div>
    </section>
  )
}
