import { Link } from 'react-router-dom'
import { useLang } from '../../contexts/LangContext'
import { useApi } from '../../hooks/useApi'

const API_URL = import.meta.env.VITE_API_URL?.replace('/api', '') || ''

export default function CallToAction({ contactHref, contactLabel }) {
  const { t, pick } = useLang()
  const { data: company } = useApi('/company')
  const { data: ctaImgs = [] } = useApi('/images?section=home-cta&actif=true')
  const bgImg = ctaImgs[0]

  const bgStyle = bgImg
    ? {
        backgroundImage: `linear-gradient(135deg, rgba(15,72,85,0.92) 0%, rgba(15,25,36,0.96) 100%), url(${API_URL}${bgImg.url})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }
    : {}

  const href = contactHref || '/contact'
  const isExternal = /^(mailto:|tel:|https?:)/.test(href)

  return (
    <section className="section-cta" style={bgStyle}>
      <h2 className="cta-title">{pick(company, 'ctaTitre') || t('cta.title')}</h2>
      <p className="cta-sub">{pick(company, 'ctaSousTitre') || t('cta.sub')}</p>
      <div className="cta-actions">
        {isExternal ? (
          <a href={href} className="btn-cta-white">{contactLabel || t('cta.contact')}</a>
        ) : (
          <Link to={href} className="btn-cta-white">{contactLabel || t('cta.contact')}</Link>
        )}
      </div>
    </section>
  )
}
