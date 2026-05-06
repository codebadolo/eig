import { useApi } from '../../hooks/useApi'

const API = import.meta.env.VITE_API_URL?.replace('/api', '') || ''

export default function PageHero({ section, label, title, subtitle, children, fallbackStyle, bgImage }) {
  const { data: imgs = [] } = useApi(section ? `/images?section=${section}&actif=true` : null)
  const img = imgs[0]

  const makeBgStyle = (src) => ({
    backgroundImage: `linear-gradient(135deg, rgba(15,72,85,0.88) 0%, rgba(15,25,36,0.92) 100%), url(${src})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  })

  const style = img
    ? makeBgStyle(`${API}${img.url}`)
    : bgImage
    ? makeBgStyle(`${API}${bgImage}`)
    : (fallbackStyle || {})

  return (
    <div className="page-hero" style={style}>
      <div className="page-hero-content">
        {label && <span className="page-hero-label">{label}</span>}
        {title && <h1 className="page-hero-title">{title}</h1>}
        {subtitle && <p className="page-hero-sub">{subtitle}</p>}
        {children}
      </div>
    </div>
  )
}
