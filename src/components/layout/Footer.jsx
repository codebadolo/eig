import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer>
      <div className="footer-main">
        <div>
          <div className="footer-brand-name">Excellis Invest Group</div>
          <span className="footer-brand-tagline">Investir autrement</span>
          <p className="footer-desc">
            Holding d'investissement multisectorielle basée au Burkina Faso.
            20 milliards FCFA de capital social. 17 filiales. 9 secteurs stratégiques.
            Noté Bloomfield.
          </p>
          <div className="footer-social">
            <a href="#" className="social-btn" title="LinkedIn" aria-label="LinkedIn">in</a>
            <a href="#" className="social-btn" title="Facebook" aria-label="Facebook">f</a>
            <a href="#" className="social-btn" title="WhatsApp" aria-label="WhatsApp">W</a>
          </div>
        </div>

        <div>
          <div className="footer-col-title">Le Groupe</div>
          <ul className="footer-links">
            <li><Link to="/le-groupe">Qui sommes-nous ?</Link></li>
            <li><Link to="/le-groupe">Vision &amp; Mission</Link></li>
            <li><Link to="/le-groupe">Notre histoire</Link></li>
            <li><Link to="/gouvernance">Gouvernance</Link></li>
          </ul>
        </div>

        <div>
          <div className="footer-col-title">Nos Activités</div>
          <ul className="footer-links">
            <li><Link to="/nos-metiers">Nos Métiers</Link></li>
            <li><Link to="/nos-filiales">Nos Filiales</Link></li>
            <li><Link to="/nos-metiers/services-financiers">Services Financiers</Link></li>
            <li><Link to="/nos-metiers/assurance">Assurance</Link></li>
            <li><Link to="/nos-metiers/technologies-fintech">Fintech</Link></li>
          </ul>
        </div>

        <div>
          <div className="footer-col-title">EIG &amp; Vous</div>
          <ul className="footer-links">
            <li><Link to="/actualites">Actualités</Link></li>
            <li><Link to="/carrieres">Carrières</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/contact">Relations Presse</Link></li>
            <li><Link to="/contact">Partenariats</Link></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Excellis Invest Group — Tous droits réservés</span>
        <div className="footer-legal">
          <Link to="/contact">Mentions légales</Link>
          <Link to="/contact">Politique de confidentialité</Link>
          <Link to="/contact">Cookies</Link>
        </div>
      </div>
    </footer>
  )
}
