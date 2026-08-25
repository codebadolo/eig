import { Link } from 'react-router-dom'
import Seo from '../components/Seo'
import LegalPage from '../components/LegalPage'
import FaIcon from '../components/ui/FaIcon'
import { useApi } from '../hooks/useApi'
import { useLang } from '../contexts/LangContext'

const TODO_FR = '[à compléter par la direction juridique]'
const TODO_EN = '[to be completed by legal counsel]'

export default function MentionsLegales() {
  const { lang, pick } = useLang()
  const { data: company } = useApi('/company')
  const nom = company?.nom || 'Excellis Invest Group'
  const todo = lang === 'en' ? TODO_EN : TODO_FR
  const adresse = pick(company, 'adresse') || todo
  const email = company?.email || todo
  const telephone = company?.telephone || todo
  const formeJuridique = pick(company, 'formeJuridique') || (lang === 'en' ? 'a public limited company (société anonyme) under Burkinabè law' : 'société anonyme de droit burkinabè')
  const capitalSocial = company?.capitalSocial || todo
  const rccm = company?.rccm || todo
  const ifu = company?.ifu || todo
  const directeurPublication = company?.directeurPublication || todo
  const hebergeurNom = company?.hebergeurNom || todo
  const hebergeurAdresse = company?.hebergeurAdresse || ''

  const sections = lang === 'en'
    ? [
        {
          heading: 'Website publisher',
          body: [
            `This website is published by ${nom}, ${formeJuridique}.`,
            `Registered office: ${adresse}`,
            `Share capital: ${capitalSocial} — Trade and companies register (RCCM): ${rccm} — Taxpayer ID (IFU): ${ifu}`,
            `Contact: ${email} — ${telephone}`,
          ],
        },
        {
          heading: 'Publication director',
          body: `Publication director: ${directeurPublication}`,
        },
        {
          heading: 'Hosting',
          body: `This website is hosted by: ${hebergeurNom}${hebergeurAdresse ? `, ${hebergeurAdresse}` : ''}`,
        },
        {
          heading: 'Intellectual property',
          body: 'The overall structure of this website, as well as the texts, images, graphics, logos and any other elements composing it, are the exclusive property of ' + nom + ' or its subsidiaries, unless otherwise indicated. Any reproduction, representation, modification or distribution, in whole or in part, without prior written authorization is prohibited.',
        },
        {
          heading: 'Hyperlinks',
          body: `${nom} cannot be held responsible for the content of external websites linked to from this site, nor for the hyperlinks pointing to this site set up by third-party websites.`,
        },
        {
          heading: 'Contact',
          body: 'For any question relating to these legal notices, please use our contact form.',
        },
      ]
    : [
        {
          heading: 'Éditeur du site',
          body: [
            `Le présent site est édité par ${nom}, ${formeJuridique}.`,
            `Siège social : ${adresse}`,
            `Capital social : ${capitalSocial} — Numéro RCCM : ${rccm} — IFU : ${ifu}`,
            `Contact : ${email} — ${telephone}`,
          ],
        },
        {
          heading: 'Directeur de la publication',
          body: `Directeur de la publication : ${directeurPublication}`,
        },
        {
          heading: 'Hébergement',
          body: `Le présent site est hébergé par : ${hebergeurNom}${hebergeurAdresse ? `, ${hebergeurAdresse}` : ''}`,
        },
        {
          heading: 'Propriété intellectuelle',
          body: `L'ensemble de la structure de ce site, ainsi que les textes, images, graphismes, logos et autres éléments qui le composent, sont la propriété exclusive de ${nom} ou de ses filiales, sauf mention contraire. Toute reproduction, représentation, modification ou diffusion, totale ou partielle, sans autorisation écrite préalable, est interdite.`,
        },
        {
          heading: 'Liens hypertextes',
          body: `${nom} ne saurait être tenu responsable du contenu des sites externes vers lesquels ce site pointe, ni des liens hypertextes pointant vers ce site mis en place par des sites tiers.`,
        },
        {
          heading: 'Contact',
          body: 'Pour toute question relative aux présentes mentions légales, merci de nous contacter via notre formulaire de contact.',
        },
      ]

  return (
    <>
      <Seo
        title={lang === 'en' ? 'Legal notice' : 'Mentions légales'}
        description={lang === 'en'
          ? `Legal notice for the ${nom} website: publisher, hosting, intellectual property.`
          : `Mentions légales du site ${nom} : éditeur, hébergement, propriété intellectuelle.`}
        path="/mentions-legales"
      />
      <LegalPage
        label={lang === 'en' ? 'Legal' : 'Juridique'}
        title={lang === 'en' ? 'Legal notice' : 'Mentions légales'}
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
