import { Routes, Route } from 'react-router-dom'
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
import DirigeantDetail from './pages/DirigeantDetail'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'
import Unsubscribe from './pages/Unsubscribe'

function App() {
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
        <Route path="gouvernance/:id" element={<DirigeantDetail />} />
        <Route path="contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Route>
      <Route path="/unsubscribe" element={<Unsubscribe />} />
    </Routes>
  )
}

export default App
