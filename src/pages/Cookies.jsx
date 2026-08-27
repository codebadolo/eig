import Seo from '../components/Seo'
import LegalPage from '../components/LegalPage'
import { useApi } from '../hooks/useApi'
import { useLang } from '../contexts/LangContext'
import { buildCompany } from '../content/legal/shared'
import cookies from '../content/legal/cookies'

export default function Cookies() {
  const { lang } = useLang()
  const { data: company } = useApi('/company')
  const page = cookies(lang, buildCompany(company))

  return (
    <>
      <Seo
        title={lang === 'en' ? 'Cookie policy' : 'Politique de gestion des cookies'}
        description={
          lang === 'en'
            ? 'Information about the trackers used on the Excellis Invest Group website and how to manage your choices.'
            : "Informations sur les traceurs utilisés sur le site d'Excellis Invest Group et les moyens de gérer vos choix."
        }
        path="/cookies"
      />
      <LegalPage
        label={page.label}
        title={page.title}
        updated={page.updated}
        intro={page.intro}
        sections={page.sections}
      />
    </>
  )
}
