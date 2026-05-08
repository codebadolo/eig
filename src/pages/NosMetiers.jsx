import { Link } from 'react-router-dom'
import ScrollReveal from '../components/ui/ScrollReveal'
import CallToAction from '../components/sections/CallToAction'
import { useApi } from '../hooks/useApi'
import FaIcon from '../components/ui/FaIcon'
import PageHero from '../components/ui/PageHero'
import { useLang } from '../contexts/LangContext'

const API = import.meta.env.VITE_API_URL?.replace('/api', '') || ''

export default function NosMetiers() {
  const { t, pick } = useLang()
  const { data: metiers = [], loading } = useApi('/metiers')

  if (loading) return <div style={{ padding: '200px 5%', textAlign: 'center', color: 'var(--gray-mid)' }}>{t('common.loading')}</div>

  return (
    <>
      <PageHero
        section="nos-metiers"
        label={t('metiers.label')}
        title={<>{metiers.length} {t('metiers.heroTitle1')}<br /><span>{t('metiers.heroTitleSpan')}</span><br /><span>{t('metiers.heroTitleSpan2')}</span></>}
        subtitle={t('metiers.heroSub')}
      />

      <section style={{ background: 'var(--ivory)' }}>
        <div className="metiers-grid">
          {metiers.map((m, i) => {
            const count = Array.isArray(m.filialesIds) ? m.filialesIds.length : 0
            return (
              <ScrollReveal key={m.slug} delay={(i % 3) * 0.08}>
                <Link to={`/nos-metiers/${m.slug}`} className="metier-card">
                  {m.image && (
                    <div className="metier-card-bg" style={{ backgroundImage: `url(${m.image})` }} />
                  )}
                  <div className="metier-icon" style={{ background: m.couleur }}><FaIcon name={m.icone} size={24} /></div>
                  <span className="metier-arrow">↗</span>
                  <div className="metier-title">{pick(m, 'titre')}</div>
                  <div className="metier-desc">{pick(m, 'description')}</div>
                  <span className="metier-count">{count} {count > 1 ? t('metiers.filiales') : t('metiers.filiale')}</span>
                </Link>
              </ScrollReveal>
            )
          })}
        </div>
      </section>

      <CallToAction />
    </>
  )
}
