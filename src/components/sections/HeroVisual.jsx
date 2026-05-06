import eigLogo from '../../assets/excellis-invest-group.png'

/* Approximate SVG positions for West Africa in the 280×340 viewBox:
   Burkina Faso (landlocked, center-west Africa) → cx=92, cy=118
   Côte d'Ivoire (coastal, south of BF)          → cx=68, cy=150        */

const AFRICA_PATH =
  'M138,4 L168,6 L196,14 L220,26 L242,44 L258,66 L268,92 ' +
  'L272,120 L268,148 L272,176 L276,204 L268,230 L256,254 ' +
  'L240,274 L220,292 L200,308 L182,326 L166,340 ' +
  'L152,340 L136,326 L116,308 L94,288 L70,264 ' +
  'L48,238 L28,210 L12,180 L4,150 L4,120 ' +
  'L10,92 L20,68 L36,48 L56,30 L82,16 L110,8 Z'

const BF  = { cx: 92,  cy: 118, r: 7,  label: 'Burkina Faso', color: '#D4AA4A' }
const CI  = { cx: 66,  cy: 150, r: 6,  label: "Côte d'Ivoire", color: '#2D8A9E' }

const nodes = [
  { cx: 140, cy: 90,  r: 3 }, { cx: 195, cy: 130, r: 2.5 },
  { cx: 170, cy: 165, r: 2 }, { cx: 115, cy: 178, r: 2.5 },
  { cx: 55,  cy: 198, r: 2 }, { cx: 210, cy: 200, r: 3 },
  { cx: 230, cy: 248, r: 2 }, { cx: 100, cy: 250, r: 2 },
]

export default function HeroVisual() {
  return (
    <div className="hero-visual" aria-hidden="true">

      {/* Animated rings */}
      <div className="hv-rings">
        <div className="hv-ring hv-ring-1" />
        <div className="hv-ring hv-ring-2" />
        <div className="hv-ring hv-ring-3" />
      </div>

      {/* Africa map SVG */}
      <svg className="hv-africa" viewBox="0 0 280 348" fill="none" xmlns="http://www.w3.org/2000/svg">

        {/* continent fill */}
        <path d={AFRICA_PATH} fill="rgba(26,107,122,0.18)" stroke="rgba(45,138,158,0.5)" strokeWidth="1.5" strokeLinejoin="round" />

        {/* connection line BF ↔ CI */}
        <line
          x1={BF.cx} y1={BF.cy} x2={CI.cx} y2={CI.cy}
          stroke="rgba(212,170,74,0.6)" strokeWidth="1.5" strokeDasharray="5 3"
        />

        {/* scatter nodes (other ambitions) */}
        {nodes.map((n, i) => (
          <circle key={i} cx={n.cx} cy={n.cy} r={n.r} fill="rgba(184,146,42,0.3)" />
        ))}

        {/* Burkina Faso */}
        <circle cx={BF.cx} cy={BF.cy} r={BF.r + 6} fill="rgba(212,170,74,0.12)" />
        <circle cx={BF.cx} cy={BF.cy} r={BF.r + 3} fill="rgba(212,170,74,0.2)" />
        <circle cx={BF.cx} cy={BF.cy} r={BF.r} fill={BF.color} className="hv-dot-pulse" />

        {/* Côte d'Ivoire */}
        <circle cx={CI.cx} cy={CI.cy} r={CI.r + 5} fill="rgba(45,138,158,0.12)" />
        <circle cx={CI.cx} cy={CI.cy} r={CI.r + 2} fill="rgba(45,138,158,0.2)" />
        <circle cx={CI.cx} cy={CI.cy} r={CI.r} fill={CI.color} className="hv-dot-pulse" style={{ animationDelay: '0.8s' }} />

        {/* Country labels */}
        <text x={BF.cx + 10} y={BF.cy + 1} fill="rgba(212,170,74,0.9)" fontSize="8" fontFamily="'Futura LT', 'Century Gothic', 'Trebuchet MS', sans-serif" fontWeight="600" letterSpacing="0.05em">BF</text>
        <text x={CI.cx + 9}  y={CI.cy + 1}  fill="rgba(45,138,158,0.9)"  fontSize="8" fontFamily="'Futura LT', 'Century Gothic', 'Trebuchet MS', sans-serif" fontWeight="600" letterSpacing="0.05em">CI</text>
      </svg>

      {/* EIG logo card */}
      <div className="hv-logo-card">
        <img src={eigLogo} alt="Excellis Invest Group" className="hv-logo-img" />
      </div>

      {/* Floating stat badges */}
      <div className="hv-badge hv-badge-1">
        <span className="hv-badge-num">+700</span>
        <span className="hv-badge-label">Collaborateurs</span>
      </div>
      <div className="hv-badge hv-badge-2">
        <span className="hv-badge-num">17</span>
        <span className="hv-badge-label">Filiales</span>
      </div>
      <div className="hv-badge hv-badge-3">
        <span className="hv-badge-num">9</span>
        <span className="hv-badge-label">Secteurs</span>
      </div>

    </div>
  )
}
