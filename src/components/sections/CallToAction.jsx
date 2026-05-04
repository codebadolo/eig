import { Link } from 'react-router-dom'
import { useLang } from '../../contexts/LangContext'

export default function CallToAction() {
  const { t } = useLang()
  return (
    <section className="section-cta">
      <h2 className="cta-title">{t('cta.title')}</h2>
      <p className="cta-sub">{t('cta.sub')}</p>
      <div className="cta-actions">
        <Link to="/contact" className="btn-cta-white">{t('cta.contact')}</Link>
        <Link to="/contact" className="btn-cta-outline">{t('cta.investors')}</Link>
      </div>
    </section>
  )
}
