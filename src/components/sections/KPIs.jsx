import ScrollReveal from '../ui/ScrollReveal'
import { useLang } from '../../contexts/LangContext'
import kpisBg from '../../assets/images/kpis-bg.webp'

const DEFAULT_KPIS = [
  { num: '+700', unite: '', label: 'Collaborateurs' },
  { num: '17',   unite: '', label: 'Filiales opérationnelles' },
  { num: '9',    unite: '', label: 'Secteurs stratégiques' },
  { num: '2',    unite: '', label: 'Pays (BF + CI)' },
  { num: '2019', unite: '', label: 'Année de création' },
]

export default function KPIs({ company }) {
  const { pick } = useLang()
  const kpis = company?.kpis?.length ? company.kpis : DEFAULT_KPIS

  return (
    <section className="section-kpis" style={{ backgroundImage: `url(${kpisBg})` }}>
      <div className="kpis-grid">
        {kpis.map((k, i) => (
          <ScrollReveal key={k.label || i} delay={i * 0.08}>
            <div className="kpi-item">
              <span className="kpi-num">
                {k.num}
                {k.unite && <span className="kpi-unit">{k.unite}</span>}
              </span>
              <span className="kpi-label">{pick(k, 'label')}</span>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  )
}
