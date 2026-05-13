import { logos } from '../../assets/logos'

const API_URL = import.meta.env.VITE_API_URL?.replace('/api', '') || ''

function resolveUrl(url) {
  if (!url) return null
  if (url.startsWith('http')) return url
  return `${API_URL}${url}`
}

export default function FilialeLogo({ id, sigle, size = 56, className = '', logo }) {
  // DB logo has priority over bundled static logo
  const src = resolveUrl(logo) || logos[id] || null

  const style = {
    width: size,
    height: size,
    borderRadius: size >= 80 ? 12 : 8,
    background: 'var(--white)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '1px solid var(--gray-light)',
    overflow: 'hidden',
    flexShrink: 0,
  }

  if (src) {
    return (
      <div style={style} className={className}>
        <img
          src={src}
          alt={sigle}
          style={{ width: '100%', height: '100%', objectFit: 'contain', padding: size >= 80 ? 10 : 6 }}
        />
      </div>
    )
  }

  return (
    <div
      style={{
        ...style,
        background: 'var(--ivory)',
        fontFamily: 'var(--font-num)',
        fontSize: Math.round(size * 0.28),
        color: 'var(--teal)',
        fontWeight: 700,
        letterSpacing: '0.05em',
      }}
      className={className}
    >
      {sigle}
    </div>
  )
}
