import { Routes, Route } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { loadApi } from './hooks/useApi'
import AppShellLoader from './components/AppShellLoader'
import ComingSoon from './pages/ComingSoon'
import Layout from './components/layout/Layout'
import Home from './pages/Home'
import LeGroupe from './pages/LeGroupe'
import NosMetiers from './pages/NosMetiers'
import MetierDetail from './pages/MetierDetail'
import NosFiliales from './pages/NosFiliales'
import FilialeDetail from './pages/FilialeDetail'
import GouvernancePage from './pages/GouvernancePage'
import Actualites from './pages/Actualites'
import ArticleDetail from './pages/ArticleDetail'
import Carrieres from './pages/Carrieres'
import CarriereDetail from './pages/CarriereDetail'
import Contact from './pages/Contact'
import MentionsLegales from './pages/MentionsLegales'
import Confidentialite from './pages/Confidentialite'
import Cookies from './pages/Cookies'
import NotFound from './pages/NotFound'
import Unsubscribe from './pages/Unsubscribe'

function App() {
  const [comingSoon, setComingSoon] = useState(null) // null = not loaded yet

  useEffect(() => {
    loadApi('/company')
      .then((data) => {
        const launchAt = data.comingSoonEnabled && data.comingSoonLaunchAt
          ? new Date(data.comingSoonLaunchAt)
          : null
        setComingSoon(
          launchAt && launchAt.getTime() > Date.now()
            ? { launchAt, contactEmail: data.email }
            : false
        )
      })
      // Fail open: if the API is unreachable, show the real site rather than block it.
      .catch(() => setComingSoon(false))
  }, [])

  if (comingSoon === null) return <AppShellLoader />
  if (comingSoon) {
    return (
      <ComingSoon
        launchAt={comingSoon.launchAt}
        contactEmail={comingSoon.contactEmail}
        onDone={() => setComingSoon(false)}
      />
    )
  }

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="le-groupe" element={<LeGroupe />} />
        <Route path="nos-metiers" element={<NosMetiers />} />
        <Route path="nos-metiers/:slug" element={<MetierDetail />} />
        <Route path="nos-filiales" element={<NosFiliales />} />
        <Route path="nos-filiales/:id" element={<FilialeDetail />} />
        <Route path="gouvernance" element={<GouvernancePage />} />
        <Route path="actualites" element={<Actualites />} />
        <Route path="actualites/:slug" element={<ArticleDetail />} />
        <Route path="carrieres" element={<Carrieres />} />
        <Route path="carrieres/:id" element={<CarriereDetail />} />
        <Route path="contact" element={<Contact />} />
        <Route path="mentions-legales" element={<MentionsLegales />} />
        <Route path="confidentialite" element={<Confidentialite />} />
        <Route path="cookies" element={<Cookies />} />
        <Route path="*" element={<NotFound />} />
      </Route>
      <Route path="/unsubscribe" element={<Unsubscribe />} />
    </Routes>
  )
}

export default App
