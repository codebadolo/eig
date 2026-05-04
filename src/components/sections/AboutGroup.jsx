import { Link } from 'react-router-dom'
import ScrollReveal from '../ui/ScrollReveal'
import { useApi } from '../../hooks/useApi'

const API_URL = import.meta.env.VITE_API_URL?.replace('/api', '') || ''

export default function AboutGroup({ company }) {
  const mission = company?.mission ?? "Mobiliser capitaux et expertises pour accompagner les entreprises africaines dans leur développement durable."
  const vision = company?.vision ?? "Être un investisseur panafricain de référence, catalyseur de croissance et de création de valeur durable."
  const description = company?.descriptionCourte ?? "Excellis Invest Group est une holding d'investissement multisectorielle basée au Burkina Faso, pilotant un portefeuille de filiales dans des secteurs structurants de l'économie régionale."

  const { data: sectionImgs = [] } = useApi('/images?section=home-about&actif=true')
  const mainImg = company?.imageGroupe
    ? `${API_URL}${company.imageGroupe}`
    : sectionImgs[0]
    ? `${API_URL}${sectionImgs[0].url}`
    : null
  const extraImgs = sectionImgs.slice(company?.imageGroupe ? 0 : 1, company?.imageGroupe ? 3 : 4)

  return (
    <section className="section-groupe">
      <div className="groupe-visual" aria-hidden="true">
        <div className="groupe-img-main">
          {mainImg ? (
            <img
              src={mainImg}
              alt="Excellis Invest Group"
              className="groupe-img-main-photo"
            />
          ) : (
            <span className="groupe-img-main-text">EIG</span>
          )}
        </div>
        {extraImgs.length > 0 && (
          <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
            {extraImgs.map(img => (
              <div key={img.id} style={{ flex: 1, aspectRatio: '4/3', borderRadius: 4, overflow: 'hidden' }}>
                <img src={`${API_URL}${img.url}`} alt={img.alt || img.titre || ''} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            ))}
          </div>
        )}
        <div className="groupe-img-accent">
          <span className="groupe-img-accent-num">20</span>
          <span className="groupe-img-accent-label">Milliards FCFA<br />Capital Social</span>
        </div>
      </div>

      <ScrollReveal className="groupe-content">
        <span className="section-label">Le Groupe</span>
        <h2 className="section-title">
          Un acteur structurant de la <span>transformation économique</span> africaine
        </h2>
        <div className="gold-rule" />
        <p className="section-lead">{description}</p>

        <div className="groupe-pillars">
          <div className="pillar">
            <div className="pillar-title">Notre Mission</div>
            <div className="pillar-text">{mission}</div>
          </div>
          <div className="pillar">
            <div className="pillar-title">Notre Vision</div>
            <div className="pillar-text">{vision}</div>
          </div>
          <div className="pillar">
            <div className="pillar-title">Notre Modèle</div>
            <div className="pillar-text">
              Une holding pilotant un portefeuille diversifié de filiales opérationnelles dans
              9 secteurs clés.
            </div>
          </div>
          <div className="pillar">
            <div className="pillar-title">Notre Ambition</div>
            <div className="pillar-text">
              Un rayonnement panafricain ancré dans les réalités économiques locales, avec une
              perspective régionale.
            </div>
          </div>
        </div>

        <Link to="/le-groupe" className="btn-primary">
          En savoir plus sur le Groupe
          <span className="btn-arrow">→</span>
        </Link>
      </ScrollReveal>
    </section>
  )
}
