import { Link } from 'react-router-dom'
import { useLang } from '../../contexts/LangContext'
import { useApi } from '../../hooks/useApi'
import ScrollReveal from '../ui/ScrollReveal'

const API_URL = import.meta.env.VITE_API_URL?.replace('/api', '') || ''

export default function AboutGroup({ company }) {
  const { t, pick } = useLang()
  const mission = pick(company, 'mission') || company?.mission || t('sections.about.mission')
  const vision = pick(company, 'vision') || company?.vision || t('sections.about.vision')
  const description = pick(company, 'descriptionCourte') || company?.descriptionCourte || ''

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
            <img src={mainImg} alt="Excellis Invest Group" className="groupe-img-main-photo" />
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
          <span className="groupe-img-accent-num">+700</span>
          <span className="groupe-img-accent-label">Collaborateurs<br />sur le périmètre africain</span>
        </div>
      </div>

      <ScrollReveal className="groupe-content">
        <span className="section-label">{t('sections.about.label')}</span>
        <h2 className="section-title">
          {t('sections.about.title1')} <span>{t('sections.about.titleSpan')}</span> {t('sections.about.title2')}
        </h2>
        <div className="gold-rule" />
        <p className="section-lead">{description}</p>

        <div className="groupe-pillars">
          <div className="pillar">
            <div className="pillar-title">{t('sections.about.mission')}</div>
            <div className="pillar-text">{mission}</div>
          </div>
          <div className="pillar">
            <div className="pillar-title">{t('sections.about.vision')}</div>
            <div className="pillar-text">{vision}</div>
          </div>
          <div className="pillar">
            <div className="pillar-title">{t('sections.about.modele')}</div>
            <div className="pillar-text">{t('sections.about.modeleText')}</div>
          </div>
          <div className="pillar">
            <div className="pillar-title">{t('sections.about.ambition')}</div>
            <div className="pillar-text">{t('sections.about.ambitionText')}</div>
          </div>
        </div>

        <Link to="/le-groupe" className="btn-primary">
          {t('sections.about.link')}
          <span className="btn-arrow">→</span>
        </Link>
      </ScrollReveal>
    </section>
  )
}
