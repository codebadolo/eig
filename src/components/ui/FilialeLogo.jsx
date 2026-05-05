import { logos } from '../../assets/logos'

export default function FilialeLogo({ id, sigle, size = 56, className = '', logo }) {
  const src = logos[id] || logo

  const base = {
    width: size,
    height: size,
    borderRadius: size >= 80 ? 14 : 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    flexShrink: 0,
  }

  if (src) {
    return (
      <div style={{
        ...base,
        background: 'var(--white)',
        border: '1px solid rgba(26,107,122,0.1)',
        boxShadow: '0 4px 16px rgba(15,25,36,0.12)',
      }} className={className}>
        <img
          src={src}
          alt={sigle}
          style={{ width: '100%', height: '100%', objectFit: 'contain', padding: size >= 80 ? 12 : 8 }}
        />
      </div>
    )
  }

  return (
    <div
      style={{
        ...base,
        background: 'linear-gradient(135deg, var(--teal-dark) 0%, var(--teal) 100%)',
        fontFamily: 'var(--font-num)',
        fontSize: Math.round(size * 0.3),
        color: 'white',
        fontWeight: 700,
        letterSpacing: '0.05em',
        boxShadow: '0 4px 16px rgba(26,107,122,0.25)',
      }}
      className={className}
    >
      {sigle}
    </div>
  )
}
