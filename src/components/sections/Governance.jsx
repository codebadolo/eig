import { Link } from 'react-router-dom'
import ScrollReveal from '../ui/ScrollReveal'
import { useLang } from '../../contexts/LangContext'
import { useApi } from '../../hooks/useApi'
import FaIcon from '../ui/FaIcon'

export default function Governance({ company }) {
  const { t, pick } = useLang()
  const { data: dirigeants = [] } = useApi('/dirigeants')

  const valeurs = company?.valeurs ?? []
  const president = dirigeants.find(d => d.categorie === 'president')
  const citation = pick(president, 'mot') || president?.bio || t('sections.gouv.quote')
  const citationAuthor = president ? `${president.nom}${pick(president, 'role') ? ` — ${pick(president, 'role')}` : ''}` : `${t('sections.gouv.quoteBy')} — ${company?.nom ?? 'Excellis Invest Group'}`

  return (
    <section className="section-gouv">

      {/* ── Gauche : titre + mot du Président ── */}
      <ScrollReveal className="gouv-content">
        <span className="section-label">{t('sections.gouv.label')}</span>
        <h2 className="section-title">
          {t('sections.gouv.title1')}{' '}
          <em>{t('sections.gouv.titleEm')}</em>
        </h2>
        <div className="gold-rule" style={{ background: 'var(--gold)' }} />

        <div className="gouv-quote">
          <p className="gouv-quote-text">{citation}</p>
          <span className="gouv-quote-author">{citationAuthor}</span>
        </div>

        <Link to="/gouvernance" className="btn-secondary">
          {t('sections.gouv.link')}
          <FaIcon name="arrow-right" size={16} className="btn-arrow" />
        </Link>
      </ScrollReveal>

      {/* ── Droite : valeurs du groupe ── */}
      <ScrollReveal delay={0.2} className="gouv-visual">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'flex-end' }}>
          {valeurs.map((v, i) => (
            <div key={pick(v, 'titre') || i} className="gouv-pillar" style={{ flexDirection: 'column', alignItems: 'flex-start', gap: 8, width: '100%' }}>
              {v.icone && (
                <div style={{
                  width: 32, height: 32, borderRadius: '50%',
                  background: 'rgba(184,146,42,0.15)',
                  border: '1px solid rgba(184,146,42,0.25)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'var(--gold-light)', flexShrink: 0,
                }}>
                  <FaIcon name={v.icone} size={14} />
                </div>
              )}
              <div>
                <div className="gouv-pillar-title">{pick(v, 'titre')}</div>
                <div className="gouv-pillar-text">{pick(v, 'description')}</div>
              </div>
            </div>
          ))}
        </div>
      </ScrollReveal>

    </section>
  )
}
