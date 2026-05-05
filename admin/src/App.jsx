import { Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './hooks/useAuth'
import Layout from './components/Layout'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Filiales from './pages/Filiales'
import FilialeForm from './pages/FilialeForm'
import Metiers from './pages/Metiers'
import MetierForm from './pages/MetierForm'
import Articles from './pages/Articles'
import ArticleForm from './pages/ArticleForm'
import Dirigeants from './pages/Dirigeants'
import DirigeantForm from './pages/DirigeantForm'
import Company from './pages/Company'
import Messages from './pages/Messages'
import Carrieres from './pages/Carrieres'
import CarriereForm from './pages/CarriereForm'
import Candidatures from './pages/Candidatures'
import CandidatureDetail from './pages/CandidatureDetail'
import Newsletter from './pages/Newsletter'
import Images from './pages/Images'
import Parametres from './pages/Parametres'
import FooterPage from './pages/Footer'

function PrivateRoute({ children }) {
  const { user, loading } = useAuth()
  if (loading) return <div className="flex items-center justify-center h-screen"><div className="animate-spin w-8 h-8 border-4 border-brand-500 border-t-transparent rounded-full" /></div>
  return user ? children : <Navigate to="/login" replace />
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<PrivateRoute><Layout /></PrivateRoute>}>
        <Route index element={<Dashboard />} />
        <Route path="filiales" element={<Filiales />} />
        <Route path="filiales/nouveau" element={<FilialeForm />} />
        <Route path="filiales/:id/modifier" element={<FilialeForm />} />
        <Route path="metiers" element={<Metiers />} />
        <Route path="metiers/nouveau" element={<MetierForm />} />
        <Route path="metiers/:id/modifier" element={<MetierForm />} />
        <Route path="articles" element={<Articles />} />
        <Route path="articles/nouveau" element={<ArticleForm />} />
        <Route path="articles/:id/modifier" element={<ArticleForm />} />
        <Route path="dirigeants" element={<Dirigeants />} />
        <Route path="dirigeants/nouveau" element={<DirigeantForm />} />
        <Route path="dirigeants/:id/modifier" element={<DirigeantForm />} />
        <Route path="company" element={<Company />} />
        <Route path="images" element={<Images />} />
        <Route path="messages" element={<Messages />} />
        <Route path="carrieres" element={<Carrieres />} />
        <Route path="carrieres/nouveau" element={<CarriereForm />} />
        <Route path="carrieres/:id/modifier" element={<CarriereForm />} />
        <Route path="candidatures" element={<Candidatures />} />
        <Route path="candidatures/:id" element={<CandidatureDetail />} />
        <Route path="newsletter" element={<Newsletter />} />
        <Route path="footer" element={<FooterPage />} />
        <Route path="parametres" element={<Parametres />} />
      </Route>
    </Routes>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  )
}
