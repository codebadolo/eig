import { Link } from 'react-router-dom'
import { useLang } from '../../contexts/LangContext'
import { useApi } from '../../hooks/useApi'

const API_URL = import.meta.env.VITE_API_URL?.replace('/api', '') || ''

export default function CallToAction() {
  const { t } = useLang()
  const { data: ctaImgs = [] } = useApi('/images?section=home-cta&actif=true')
  const bgImg = ctaImgs[0]

  const bgStyle = bgImg
    ? {
        backgroundImage: `linear-gradient(135deg, rgba(15,72,85,0.92) 0%, rgba(15,25,36,0.96) 100%), url(${API_URL}${bgImg.url})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }
    : {}

  return (
    <section className="section-cta" style={bgStyle}>
      <h2 className="cta-title">{t('cta.title')}</h2>
      <p className="cta-sub">{t('cta.sub')}</p>
      <div className="cta-actions">
        <Link to="/contact" className="btn-cta-white">{t('cta.contact')}</Link>
        <Link to="/contact" className="btn-cta-outline">{t('cta.investors')}</Link>
      </div>
    </section>
  )
}
