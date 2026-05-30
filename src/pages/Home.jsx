import Hero from '../components/sections/Hero'
import AboutGroup from '../components/sections/AboutGroup'
import KPIs from '../components/sections/KPIs'
import Sectors from '../components/sections/Sectors'
import Governance from '../components/sections/Governance'
import News from '../components/sections/News'
import CallToAction from '../components/sections/CallToAction'
import { useApi } from '../hooks/useApi'

export default function Home() {
  const { data: company } = useApi('/company')
  const { data: metiers = [] } = useApi('/metiers?actif=true')
  const { data: articles = [] } = useApi('/articles?publie=true')

  return (
    <>
      <Hero company={company} />
      <AboutGroup company={company} />
      <KPIs company={company} />
      <Sectors metiers={metiers} />
      <Governance company={company} />
      <News articles={articles} />
      <CallToAction />
    </>
  )
}
