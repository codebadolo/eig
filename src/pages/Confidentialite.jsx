import Seo from '../components/Seo'
import LegalPage from '../components/LegalPage'
import { useApi } from '../hooks/useApi'
import { useLang } from '../contexts/LangContext'
import { buildCompany } from '../content/legal/shared'
import confidentialite from '../content/legal/confidentialite'

export default function Confidentialite() {
  const { lang } = useLang()
  const { data: company } = useApi('/company')
  const page = confidentialite(lang, buildCompany(company))

  return (
    <>
      <Seo
        title={lang === 'en' ? 'Privacy policy' : 'Politique de confidentialité'}
        description={
          lang === 'en'
            ? 'How Excellis Invest Group collects, uses, retains and protects personal data.'
            : 'Comment Excellis Invest Group collecte, utilise, conserve et protège les données personnelles.'
        }
        path="/confidentialite"
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
