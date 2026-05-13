import { Link } from 'react-router-dom'
import { useApi } from '../../hooks/useApi'
import { useLang } from '../../contexts/LangContext'

const API = import.meta.env.VITE_API_URL?.replace('/api', '') || ''

export default function Hero({ company }) {
  const { t, pick } = useLang()
  const { data: heroImgs = [] } = useApi('/images?section=hero&actif=true')
  const heroImg = heroImgs[0]

  const kpis = company?.kpis ?? [
    { num: '+700', unite: '', label: 'Collaborateurs' },
    { num: '17',   unite: '', label: 'Filiales opérationnelles' },
    { num: '9',    unite: '', label: 'Secteurs stratégiques' },
    { num: '2',    unite: '', label: 'Pays (BF + CI)' },
  ]

  return (
    <section className="hero" id="hero">
      <div className="hero-bg" />
      {heroImg && (
        <img
          src={`${API}${heroImg.url}`}
          alt={heroImg.alt || ''}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.18, zIndex: 0 }}
        />
      )}
      <div className="hero-pattern" />

      <div className="hero-content">
        <div className="hero-badge">
          <span className="hero-badge-dot" />
          <span>{t('hero.badge')}</span>
        </div>

        <h1 className="hero-title">
          <span>{t('hero.title1')}</span>
          <em>{t('hero.title2')}</em>
          <span>{t('hero.title3')}</span>
        </h1>

        <p className="hero-subtitle">
          {pick(company, 'descriptionCourte') || pick(company, 'description') ||
            "Excellis Invest Group est une holding Multi sectoriel, capitalisé à 20 milliards FCFA, opérant dans 9 secteurs stratégiques à travers 16 filiales en Afrique."}
        </p>

      

        <div className="hero-actions">
          <Link to="/le-groupe" className="btn-primary">
            {t('hero.discover')}
            <span className="btn-arrow">→</span>
          </Link>
          <Link to="/contact" className="btn-secondary">
            {t('hero.investors')}
            <span className="btn-arrow">→</span>
          </Link>
        </div>
      </div>

      <div className="hero-scroll" aria-hidden="true">
        <span>{t('hero.scroll')}</span>
        <div className="scroll-line" />
      </div>
    </section>
  )
}
