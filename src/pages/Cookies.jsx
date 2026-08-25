import { Link } from 'react-router-dom'
import Seo from '../components/Seo'
import LegalPage from '../components/LegalPage'
import FaIcon from '../components/ui/FaIcon'
import { useApi } from '../hooks/useApi'
import { useLang } from '../contexts/LangContext'

export default function Cookies() {
  const { lang } = useLang()
  const { data: company } = useApi('/company')
  const nom = company?.nom || 'Excellis Invest Group'

  const sections = lang === 'en'
    ? [
        {
          heading: 'What is a cookie?',
          body: 'A cookie is a small text file stored by your browser when you visit a website. It allows the site to recognise your browser and remember certain information between visits.',
        },
        {
          heading: 'Cookies used on this site',
          body: [
            'This website currently does not use any third-party advertising or analytics tracking cookies.',
            'It only uses local browser storage strictly necessary for the site to function, notably to remember your language preference (French / English) from one visit to another, and, for the administration area only, an authentication token.',
          ],
        },
        {
          heading: 'Managing cookies',
          body: 'You can configure your browser to accept, refuse or delete cookies at any time. Please refer to your browser\'s help menu for instructions. Disabling storage may affect some site features, such as remembering your language preference.',
        },
        {
          heading: 'Changes to this policy',
          body: `Should ${nom} introduce analytics or advertising cookies in the future, this page will be updated accordingly and, where required, your consent will be requested beforehand.`,
        },
        {
          heading: 'Contact',
          body: 'For any question about this cookies policy, please use our contact form.',
        },
      ]
    : [
        {
          heading: "Qu'est-ce qu'un cookie ?",
          body: "Un cookie est un petit fichier texte déposé par votre navigateur lors de la visite d'un site web. Il permet au site de reconnaître votre navigateur et de conserver certaines informations d'une visite à l'autre.",
        },
        {
          heading: 'Cookies utilisés sur ce site',
          body: [
            "Ce site n'utilise actuellement aucun cookie publicitaire ou de mesure d'audience tiers.",
            "Il recourt uniquement au stockage local du navigateur strictement nécessaire à son fonctionnement, notamment pour mémoriser votre préférence de langue (français / anglais) d'une visite à l'autre, ainsi que, pour le seul espace d'administration, un jeton d'authentification.",
          ],
        },
        {
          heading: 'Gestion des cookies',
          body: "Vous pouvez configurer votre navigateur pour accepter, refuser ou supprimer les cookies à tout moment. Reportez-vous au menu d'aide de votre navigateur pour connaître la marche à suivre. Désactiver le stockage local peut affecter certaines fonctionnalités du site, comme la mémorisation de votre langue.",
        },
        {
          heading: 'Évolution de cette politique',
          body: `Si ${nom} venait à intégrer des cookies de mesure d'audience ou publicitaires, cette page serait mise à jour en conséquence et, le cas échéant, votre consentement serait recueilli au préalable.`,
        },
        {
          heading: 'Contact',
          body: 'Pour toute question relative à cette politique de cookies, merci de nous contacter via notre formulaire de contact.',
        },
      ]

  return (
    <>
      <Seo
        title="Cookies"
        description={lang === 'en'
          ? `Cookies and local storage policy for the ${nom} website.`
          : `Politique de cookies et de stockage local du site ${nom}.`}
        path="/cookies"
      />
      <LegalPage
        label={lang === 'en' ? 'Privacy' : 'Confidentialité'}
        title={lang === 'en' ? 'Cookies policy' : 'Politique de cookies'}
        sections={sections}
      />
      <div style={{ maxWidth: 860, margin: '-20px auto 80px', padding: '0 5%', textAlign: 'center' }}>
        <Link to="/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: 'var(--teal)', fontSize: 14, fontWeight: 600, textDecoration: 'underline' }}>
          {lang === 'en' ? 'Contact us' : 'Nous contacter'}
          <FaIcon name="arrow-right" size={14} />
        </Link>
      </div>
    </>
  )
}
