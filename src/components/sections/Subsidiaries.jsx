import { Link } from 'react-router-dom'
import ScrollReveal from '../ui/ScrollReveal'
import FilialeLogo from '../ui/FilialeLogo'
import { useLang } from '../../contexts/LangContext'

export default function Subsidiaries({ filiales = [] }) {
  const { t } = useLang()
  const preview = filiales.slice(0, 8)
  const total = filiales.length

  if (!preview.length) return null

  return (
    <section className="section-filiales">
      <ScrollReveal>
        <div className="filiales-header">
          <div>
            <span className="section-label">{t('sections.subsidiaries.label')}</span>
            <h2 className="section-title">
              {t('sections.subsidiaries.title1')} <span>{total > 0 ? `${total} ${t('sections.subsidiaries.titleSpan')}` : t('sections.subsidiaries.defaultCount')}</span> {t('sections.subsidiaries.title2')}
            </h2>
          </div>
          <Link to="/nos-filiales" className="btn-primary">
            {t('sections.subsidiaries.seeAll')}
            <span className="btn-arrow">→</span>
          </Link>
        </div>
      </ScrollReveal>

      <div className="filiales-grid">
        {preview.map((f, i) => (
          <ScrollReveal key={f.id} delay={Math.floor(i / 4) * 0.1 + (i % 4) * 0.05}>
            <Link to={`/nos-filiales/${f.id}`} className="filiale-card">
              <FilialeLogo id={f.id} sigle={f.sigle} size={56} logo={f.logo} />
              <div className="filiale-name">{f.nom}</div>
              <div className="filiale-sector">{f.secteur}</div>
              <div className="filiale-country">📍 {f.pays}</div>
            </Link>
          </ScrollReveal>
        ))}
      </div>
    </section>
  )
}
