import Seo from '../components/Seo'
import LegalPage from '../components/LegalPage'
import { useApi } from '../hooks/useApi'
import { useLang } from '../contexts/LangContext'
import { buildCompany } from '../content/legal/shared'
import cgu from '../content/legal/cgu'

export default function ConditionsUtilisation() {
  const { lang } = useLang()
  const { data: company } = useApi('/company')
  const page = cgu(lang, buildCompany(company))

  return (
    <>
      <Seo
        title={lang === 'en' ? 'Terms of use' : "Conditions générales d'utilisation"}
        description={
          lang === 'en'
            ? 'Rules applicable to access to and use of the Excellis Invest Group website.'
            : "Règles applicables à l'accès et à l'utilisation du site internet d'Excellis Invest Group."
        }
        path="/conditions-utilisation"
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
