import { Link } from 'react-router-dom'
import Seo from '../components/Seo'
import FaIcon from '../components/ui/FaIcon'

export default function NotFound() {
  return (
    <div style={{ padding: '180px 5% 100px', textAlign: 'center', minHeight: '100vh', background: 'var(--ivory)' }}>
      <Seo title="Page introuvable" description="La page que vous cherchez n'existe pas ou a été déplacée." noindex />
      <div style={{ fontFamily: 'var(--font-num)', fontSize: 120, color: 'var(--teal)', opacity: 0.12, lineHeight: 1, marginBottom: -20 }}>
        404
      </div>
      <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 48, fontWeight: 700, color: 'var(--black)', marginBottom: 16 }}>
        Page introuvable
      </h1>
      <p style={{ fontSize: 18, color: 'var(--gray-mid)', marginBottom: 40, lineHeight: 1.7 }}>
        La page que vous cherchez n'existe pas ou a été déplacée.
      </p>
      <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
        <Link to="/" className="btn-primary">Retour à l'accueil <FaIcon name="arrow-right" size={16} /></Link>
        <Link to="/contact" className="btn-teal">Nous contacter <FaIcon name="arrow-right" size={16} /></Link>
      </div>
    </div>
  )
}
