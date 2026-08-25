import logo from '../assets/excellis-invest-group-font-blanc.png'

/**
 * Shown for the brief moment before App.jsx knows whether the "coming soon"
 * gate applies — replaces a blank white flash with an on-brand splash.
 */
export default function AppShellLoader() {
  return (
    <div style={{
      position: 'fixed', inset: 0,
      background: 'linear-gradient(135deg, var(--teal-dark) 0%, var(--black) 100%)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <img src={logo} alt="" style={{ width: 180, opacity: 0.9, animation: 'pulse 1.8s ease-in-out infinite' }} />
    </div>
  )
}
