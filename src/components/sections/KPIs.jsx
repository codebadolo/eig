import AnimatedCounter from '../ui/AnimatedCounter'
import ScrollReveal from '../ui/ScrollReveal'
import { useLang } from '../../contexts/LangContext'

export default function KPIs({ company }) {
  const { t } = useLang()
  const kpis = company?.kpis ?? []

  if (!kpis.length) return null

  return (
    <section className="section-kpis">
      <span className="section-label kpis-label">{t('sections.kpis.label')}</span>
      <h2 className="kpis-title">{t('sections.kpis.title')}</h2>

      <div className="kpis-grid">
        {kpis.map((kpi, i) => (
          <ScrollReveal key={kpi.label} delay={i * 0.1} className="kpi-item">
            <span className="kpi-num">
              {/^\d+$/.test(kpi.num)
                ? <AnimatedCounter value={kpi.num} suffix={kpi.unite} />
                : <>{kpi.num}<span className="kpi-unit">{kpi.unite}</span></>
              }
            </span>
            <span className="kpi-label">{kpi.label}</span>
          </ScrollReveal>
        ))}
      </div>
    </section>
  )
}
