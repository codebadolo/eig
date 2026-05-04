import { Link } from 'react-router-dom'
import ScrollReveal from '../ui/ScrollReveal'
import { useApi } from '../../hooks/useApi'
import { useLang } from '../../contexts/LangContext'

const API_URL = import.meta.env.VITE_API_URL?.replace('/api', '') || ''

const FALLBACK_PILIERS = [
  { num: '01', titre: 'Rigueur & Transparence', texte: 'Gouvernance SA de droit burkinabè, notation externe reconnue' },
  { num: '02', titre: 'Adaptabilité & Innovation', texte: 'Modèle évolutif, ancré dans les réalités africaines' },
  { num: '03', titre: 'Création de Valeur Durable', texte: 'Investissements de long terme dans les secteurs structurants' },
  { num: '04', titre: 'Esprit de Partenariat', texte: 'Croissance en synergie avec les partenaires institutionnels' },
  { num: '05', titre: 'Performance & Responsabilité', texte: 'Résultats mesurables, impact économique et social concret' },
]

export default function Governance({ company }) {
  const { t } = useLang()
  const piliers = company?.gouvernancePiliers ?? FALLBACK_PILIERS
  const { data: govImgs = [] } = useApi('/images?section=home-governance&actif=true')
  const govImg = govImgs[0]

  return (
    <section className="section-gouv">
      <ScrollReveal className="gouv-content">
        <span className="section-label">{t('sections.gouv.label')}</span>
        <h2 className="section-title">
          {t('sections.gouv.title1')}{' '}
          <em>{t('sections.gouv.titleEm')}</em>
        </h2>
        <div className="gold-rule" style={{ background: 'var(--gold)' }} />

        <div className="gouv-quote">
          <p className="gouv-quote-text">{t('sections.gouv.quote')}</p>
          <span className="gouv-quote-author">
            {t('sections.gouv.quoteBy')} — {company?.nom ?? 'Excellis Invest Group'}
          </span>
        </div>

        <Link to="/gouvernance" className="btn-secondary">
          {t('sections.gouv.link')}
          <span className="btn-arrow">→</span>
        </Link>
      </ScrollReveal>

      <ScrollReveal delay={0.2} className="gouv-visual">
        {govImg && (
          <div style={{ borderRadius: 6, overflow: 'hidden', marginBottom: 20, maxHeight: 200 }}>
            <img
              src={`${API_URL}${govImg.url}`}
              alt={govImg.alt || 'Gouvernance Excellis Invest Group'}
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
          </div>
        )}
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
