import { useState } from 'react'
import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import logoEig from '../assets/logo-eig.png'
import {
  LayoutDashboard, Building2, Briefcase, Newspaper, Users,
  Settings, MessageSquare, LogOut, Menu,
  Globe, Rocket, ImageIcon, ClipboardList, Mail, PanelBottom,
} from 'lucide-react'

const nav = [
  { to: '/', icon: LayoutDashboard, label: 'Tableau de bord', exact: true },
  { to: '/filiales', icon: Building2, label: 'Filiales' },
  { to: '/metiers', icon: Briefcase, label: 'Métiers' },
  { to: '/articles', icon: Newspaper, label: 'Actualités' },
  { to: '/dirigeants', icon: Users, label: 'Gouvernance' },
  { to: '/company', icon: Globe, label: 'Le Groupe' },
  { to: '/carrieres', icon: Rocket, label: 'Carrières' },
  { to: '/candidatures', icon: ClipboardList, label: 'Candidatures' },
  { to: '/newsletter',   icon: Mail,          label: 'Newsletter' },
  { to: '/images',       icon: ImageIcon,     label: 'Médiathèque' },
  { to: '/messages', icon: MessageSquare, label: 'Messages' },
  { to: '/footer', icon: PanelBottom, label: 'Pied de page' },
  { to: '/parametres', icon: Settings, label: 'Paramètres' },
]

function SidebarLink({ item, onClick }) {
  return (
    <NavLink
      to={item.to}
      end={item.exact}
      onClick={onClick}
      className={({ isActive }) =>
        `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
          isActive
            ? 'bg-white/12 text-white border-l-2 border-gold pl-[10px]'
            : 'text-white/60 hover:bg-white/8 hover:text-white/90 border-l-2 border-transparent'
        }`
      }
      style={({ isActive }) => isActive ? { borderLeftColor: '#D4AA4A' } : {}}
    >
      {({ isActive }) => (
        <>
          <item.icon size={17} className={isActive ? 'opacity-100' : 'opacity-60'} />
          {item.label}
        </>
      )}
    </NavLink>
  )
}

function Sidebar({ onClose }) {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div className="flex flex-col h-full" style={{ background: '#0F4855' }}>
      {/* Logo */}
      <div className="px-5 py-4 flex-shrink-0" style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
        <div className="flex items-center gap-3">
          <img src={logoEig} alt="Excellis Invest Group" style={{ height: 38, width: 'auto', objectFit: 'contain', flexShrink: 0 }} />
          <div>
            <div style={{ fontFamily: '"Jost", sans-serif', fontWeight: 600, fontSize: 12, color: 'white', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              Administration
            </div>
            <div style={{ fontFamily: '"Cormorant Garamond", serif', fontStyle: 'italic', fontSize: 11, color: '#D4AA4A', letterSpacing: '0.06em' }}>
              Investir autrement
            </div>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        {nav.map((item) => (
          <SidebarLink key={item.to} item={item} onClick={onClose} />
        ))}
      </nav>

      {/* User */}
      <div className="px-3 pb-4 flex-shrink-0" style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: 12 }}>
        <div className="flex items-center gap-3 px-3 py-2 rounded-lg mb-1">
          <div style={{
            width: 30, height: 30, borderRadius: '50%',
            background: 'rgba(184,146,42,0.2)',
            border: '1px solid rgba(184,146,42,0.4)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0,
            fontFamily: '"Bebas Neue", sans-serif', fontSize: 14, color: '#D4AA4A',
          }}>
            {user?.nom?.[0] || 'A'}
          </div>
          <div className="flex-1 min-w-0">
            <div style={{ fontSize: 12, fontWeight: 600, color: 'white', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{user?.nom}</div>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{user?.email}</div>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-2 px-3 py-2 text-sm rounded-lg transition-colors"
          style={{ color: 'rgba(255,255,255,0.45)', fontSize: 13 }}
          onMouseEnter={e => e.currentTarget.style.color = '#ff8080'}
          onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.45)'}
        >
          <LogOut size={15} /> Déconnexion
        </button>
      </div>
    </div>
  )
}

export default function Layout() {
  const [open, setOpen] = useState(false)

  return (
    <div className="flex h-screen" style={{ background: '#F8F6F1' }}>
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex w-56 flex-col flex-shrink-0" style={{ boxShadow: '4px 0 24px rgba(15,25,36,0.15)' }}>
        <Sidebar onClose={null} />
      </aside>

      {/* Mobile overlay */}
      {open && (
        <div className="lg:hidden fixed inset-0 z-40 flex">
          <div className="fixed inset-0 bg-black/40" onClick={() => setOpen(false)} />
          <aside className="relative w-56 z-50 flex flex-col" style={{ boxShadow: '4px 0 40px rgba(15,25,36,0.3)' }}>
            <Sidebar onClose={() => setOpen(false)} />
          </aside>
        </div>
      )}

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Mobile header */}
        <header className="lg:hidden flex items-center gap-3 px-4 py-3 bg-white border-b border-gray-200/60">
          <button onClick={() => setOpen(true)} className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-600">
            <Menu size={20} />
          </button>
          <img src={logoEig} alt="Excellis Invest Group" style={{ height: 28, width: 'auto', objectFit: 'contain' }} />
        </header>

        <main className="flex-1 overflow-y-auto p-5 lg:p-7">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
