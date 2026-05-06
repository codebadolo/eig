import { Link } from 'react-router-dom'
import ScrollReveal from '../ui/ScrollReveal'
import FaIcon from '../ui/FaIcon'
import { useLang } from '../../contexts/LangContext'

const API = import.meta.env.VITE_API_URL?.replace('/api', '') || ''

export default function Sectors({ metiers = [] }) {
  const { t, pick } = useLang()

  if (!metiers.length) return null

  return (
    <section className="section-metiers">
      <div style={{ maxWidth: 640, marginBottom: 60 }}>
        <span className="section-label">{t('sections.sectors.label')}</span>
        <h2 className="section-title">
          {metiers.length} {t('sections.sectors.title1')} <span>{t('sections.sectors.titleSpan')}</span> {t('sections.sectors.title2')}
        </h2>
        <div className="gold-rule" />
        <p className="section-lead">{t('sections.sectors.desc')}</p>
      </div>

      <div className="metiers-grid">
        {metiers.map((m, i) => {
          const count = Array.isArray(m.filialesIds) ? m.filialesIds.length : (m.filiales ?? 0)
          return (
            <ScrollReveal key={m.slug} delay={(i % 3) * 0.08}>
              <Link to={`/nos-metiers/${m.slug}`} className={`metier-card${m.image ? ' has-image' : ''}`}>
                {m.image && (
                  <div className="metier-card-bg" style={{ backgroundImage: `url(${API}${m.image})` }} />
                )}
                <div className="metier-icon" style={{ background: m.couleur }}>
                  <FaIcon name={m.icone} size={24} />
                </div>
                <span className="metier-arrow">↗</span>
                <div className="metier-title">{pick(m, 'titre')}</div>
                <div className="metier-desc">{pick(m, 'description')}</div>
                <span className="metier-count">
                  {count} {count > 1 ? t('sections.sectors.filiales') : t('sections.sectors.filiale')}
                </span>
              </Link>
            </ScrollReveal>
          )
        })}
      </div>
    </section>
  )
}
