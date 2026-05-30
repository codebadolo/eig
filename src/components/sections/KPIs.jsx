import ScrollReveal from '../ui/ScrollReveal'
import { useLang } from '../../contexts/LangContext'

export default function KPIs() {
  const { t } = useLang()

  return (
    <section className="section-kpis">
      <ScrollReveal>
        <h2 className="kpis-title" style={{ fontSize: 'clamp(28px, 3.5vw, 48px)', textAlign: 'center', maxWidth: 800, margin: '0 auto' }}>
          {t('sections.kpis.title')}
        </h2>
      </ScrollReveal>
    </section>
  )
}
