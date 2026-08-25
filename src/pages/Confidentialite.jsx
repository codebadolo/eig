import { Link } from 'react-router-dom'
import Seo from '../components/Seo'
import LegalPage from '../components/LegalPage'
import FaIcon from '../components/ui/FaIcon'
import { useApi } from '../hooks/useApi'
import { useLang } from '../contexts/LangContext'

export default function Confidentialite() {
  const { lang } = useLang()
  const { data: company } = useApi('/company')
  const nom = company?.nom || 'Excellis Invest Group'
  const email = company?.email || 'contact@excellis-invest-group.com'

  const sections = lang === 'en'
    ? [
        {
          heading: 'Data controller',
          body: `${nom} is the controller of the personal data collected through this website. For any question, you can reach us at ${email}.`,
        },
        {
          heading: 'Data we collect',
          body: [
            'Contact form: last name, first name, email, phone number, message.',
            'Job application form (Careers section): last name, first name, email, phone number, cover letter, CV file.',
            'Newsletter subscription: email address.',
          ],
        },
        {
          heading: 'Purpose of processing',
          body: 'This data is collected solely to respond to your requests, process job applications, and — where you have subscribed — send you our newsletter. It is not used for any other purpose and is not sold to third parties.',
        },
        {
          heading: 'Retention period',
          body: 'Data is kept only for as long as necessary to fulfil the purpose for which it was collected (handling your request, the recruitment process, or the duration of your newsletter subscription). Precise retention periods are currently being finalised with our legal counsel.',
        },
        {
          heading: 'Your rights',
          body: `In accordance with applicable data protection regulations, you have the right to access, rectify, delete and object to the processing of your personal data. To exercise these rights, please write to ${email} or use our contact form.`,
        },
        {
          heading: 'Security',
          body: `${nom} implements reasonable technical and organisational measures to protect your personal data against unauthorised access, alteration, disclosure or destruction.`,
        },
        {
          heading: 'Cookies',
          body: 'For information about the cookies and similar technologies used on this site, please see our Cookies policy.',
        },
      ]
    : [
        {
          heading: 'Responsable du traitement',
          body: `${nom} est responsable du traitement des données personnelles collectées via le présent site. Pour toute question, vous pouvez nous écrire à ${email}.`,
        },
        {
          heading: 'Données collectées',
          body: [
            'Formulaire de contact : nom, prénom, email, téléphone, message.',
            'Formulaire de candidature (rubrique Carrières) : nom, prénom, email, téléphone, lettre de motivation, fichier CV.',
            "Inscription à la newsletter : adresse email.",
          ],
        },
        {
          heading: 'Finalités du traitement',
          body: "Ces données sont collectées dans le seul but de répondre à vos demandes, de traiter les candidatures reçues et, lorsque vous y avez souscrit, de vous adresser notre newsletter. Elles ne sont utilisées à aucune autre fin et ne sont pas cédées à des tiers.",
        },
        {
          heading: 'Durée de conservation',
          body: "Les données sont conservées uniquement le temps nécessaire à la finalité pour laquelle elles ont été collectées (traitement de la demande, processus de recrutement, ou durée de l'abonnement à la newsletter). Les durées précises de conservation sont en cours de finalisation avec notre conseil juridique.",
        },
        {
          heading: 'Vos droits',
          body: `Conformément à la réglementation applicable en matière de protection des données, vous disposez d'un droit d'accès, de rectification, de suppression et d'opposition au traitement de vos données personnelles. Pour exercer ces droits, écrivez-nous à ${email} ou utilisez notre formulaire de contact.`,
        },
        {
          heading: 'Sécurité',
          body: `${nom} met en œuvre des mesures techniques et organisationnelles raisonnables pour protéger vos données personnelles contre tout accès non autorisé, altération, divulgation ou destruction.`,
        },
        {
          heading: 'Cookies',
          body: 'Pour en savoir plus sur les cookies et technologies similaires utilisés sur ce site, consultez notre politique de cookies.',
        },
      ]

  return (
    <>
      <Seo
        title={lang === 'en' ? 'Privacy policy' : 'Politique de confidentialité'}
        description={lang === 'en'
          ? `How ${nom} collects, uses and protects your personal data on this website.`
          : `Comment ${nom} collecte, utilise et protège vos données personnelles sur ce site.`}
        path="/confidentialite"
      />
      <LegalPage
        label={lang === 'en' ? 'Privacy' : 'Confidentialité'}
        title={lang === 'en' ? 'Privacy policy' : 'Politique de confidentialité'}
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
