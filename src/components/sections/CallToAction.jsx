import { Link } from 'react-router-dom'

export default function CallToAction() {
  return (
    <section className="section-cta">
      <h2 className="cta-title">Construisons ensemble.</h2>
      <p className="cta-sub">
        Investisseur, partenaire institutionnel ou client d'une filiale — prenons le temps
        d'un échange pour explorer les opportunités.
      </p>
      <div className="cta-actions">
        <Link to="/contact" className="btn-cta-white">Nous contacter</Link>
        <Link to="/contact" className="btn-cta-outline">Espace Investisseurs</Link>
      </div>
    </section>
  )
}
