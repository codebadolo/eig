import Seo from '../components/Seo'
import LegalPage from '../components/LegalPage'
import { useApi } from '../hooks/useApi'
import { useLang } from '../contexts/LangContext'
import { buildCompany } from '../content/legal/shared'
import mentions from '../content/legal/mentions'

export default function MentionsLegales() {
  const { lang } = useLang()
  const { data: company } = useApi('/company')
  const page = mentions(lang, buildCompany(company))

  return (
    <>
      <Seo
        title={lang === 'en' ? 'Legal notice' : 'Mentions légales'}
        description={
          lang === 'en'
            ? 'Publisher, hosting and operating information for the Excellis Invest Group website.'
            : "Informations relatives à l'éditeur, à l'hébergement et au fonctionnement du site d'Excellis Invest Group."
        }
        path="/mentions-legales"
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
