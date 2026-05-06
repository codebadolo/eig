import { Link } from 'react-router-dom'
import { logos } from '../../assets/logos'

const FLAG = { 'Burkina Faso': '🇧🇫', "Côte d'Ivoire": '🇨🇮' }
const SHORT = { 'Burkina Faso': 'BF', "Côte d'Ivoire": 'CI' }

export default function LogoMarquee({ filiales = [] }) {
  if (!filiales.length) return null

  // Détecte les noms qui apparaissent dans plusieurs pays
  const nameCounts = {}
  filiales.forEach(f => {
    const base = f.nom.replace(/\s+(BF|CI)$/i, '').trim()
    nameCounts[base] = (nameCounts[base] || 0) + 1
  })

  const doubleList = [...filiales, ...filiales]

  return (
    <div className="logo-marquee-wrapper">
      <div className="logo-marquee-label">Nos {filiales.length} filiales opérationnelles</div>
      <div className="logo-marquee-track-container">
        <div className="logo-marquee-track">
          {doubleList.map((f, i) => {
            const base = f.nom.replace(/\s+(BF|CI)$/i, '').trim()
            const showCountry = nameCounts[base] > 1
            const hasSrc = logos[f.id] || f.logo

            return (
              <Link
                key={`${f.id}-${i}`}
                to={`/nos-filiales/${f.id}`}
                className="logo-marquee-item"
                title={`${f.nom} — ${f.pays}`}
              >
                <div className="logo-marquee-inner">
                  {hasSrc ? (
                    <img src={logos[f.id] || f.logo} alt={f.nom} />
                  ) : (
                    <span className="logo-marquee-fallback">{f.sigle}</span>
                  )}
                  {showCountry && (
                    <span className="logo-marquee-country">
                      {FLAG[f.pays] || ''} {SHORT[f.pays] || f.pays}
                    </span>
                  )}
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
