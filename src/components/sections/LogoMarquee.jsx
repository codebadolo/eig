import { Link } from 'react-router-dom'
import { logos } from '../../assets/logos'

export default function LogoMarquee({ filiales = [] }) {
  if (!filiales.length) return null

  const doubleList = [...filiales, ...filiales]

  return (
    <div className="logo-marquee-wrapper">
      <div className="logo-marquee-label">Nos {filiales.length} filiales opérationnelles</div>
      <div className="logo-marquee-track-container">
        <div className="logo-marquee-track">
          {doubleList.map((f, i) => (
            <Link
              key={`${f.id}-${i}`}
              to={`/nos-filiales/${f.id}`}
              className="logo-marquee-item"
              title={f.nom}
            >
              {logos[f.id] ? (
                <img src={logos[f.id]} alt={f.nom} />
              ) : f.logo ? (
                <img src={f.logo} alt={f.nom} />
              ) : (
                <span className="logo-marquee-fallback">{f.sigle}</span>
              )}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
