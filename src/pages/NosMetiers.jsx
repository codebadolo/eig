import { Link } from 'react-router-dom'
import ScrollReveal from '../components/ui/ScrollReveal'
import CallToAction from '../components/sections/CallToAction'
import Seo from '../components/Seo'
import PageSkeleton from '../components/ui/PageSkeleton'
import { useApi } from '../hooks/useApi'
import FaIcon from '../components/ui/FaIcon'
import PageHero from '../components/ui/PageHero'
import { useLang } from '../contexts/LangContext'

const API = import.meta.env.VITE_API_URL?.replace('/api', '') || ''

export default function NosMetiers() {
  const { t, pick } = useLang()
  const { data: company } = useApi('/company')
  const { data: metiers = [], loading } = useApi('/metiers')

  if (loading) return <PageSkeleton />

  return (
    <>
      <Seo
        title="Nos métiers — Secteurs stratégiques d'investissement"
        description="Excellis Invest Group intervient dans les services financiers, l'assurance, l'énergie, la logistique, l'industrie et les technologies & fintech à travers un portefeuille de filiales panafricain."
        path="/nos-metiers"
      />
      <PageHero
        section="nos-metiers"
        label={t('metiers.label')}
        title={<>{t('metiers.heroTitle1')}<br /><span>{t('metiers.heroTitleSpan')}</span></>}
        subtitle={pick(company, 'sousTitreMetiers') || t('metiers.heroSub')}
      />

      <section style={{ background: 'var(--ivory)' }}>
        <div className="metiers-grid">
          {metiers.map((m, i) => (
            <ScrollReveal key={m.slug} delay={(i % 3) * 0.08}>
              <Link to={`/nos-metiers/${m.slug}`} className="metier-card">
                {m.image && (
                  <div className="metier-card-bg" style={{ backgroundImage: `url(${m.image})` }} />
                )}
                <div className="metier-icon" style={{ background: m.couleur }}><FaIcon name={m.icone} size={24} /></div>
                <span className="metier-arrow">↗</span>
                <div className="metier-title">{pick(m, 'titre')}</div>
                <div className="metier-desc">{pick(m, 'description')}</div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <CallToAction />
    </>
  )
}
