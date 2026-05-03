import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { api } from '../lib/api'
import {
  Building2, Briefcase, Newspaper, MessageSquare, Users,
  Rocket, ImageIcon, Plus, Globe, Star,
  TrendingUp, FileText, CheckCircle, Eye, EyeOff, ChevronRight,
} from 'lucide-react'

const API = import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://localhost:3001'

/* ── Styles inline partagés ── */
const S = {
  label: {
    fontSize: 10, fontWeight: 700, letterSpacing: '0.18em',
    textTransform: 'uppercase', color: '#B8922A',
  },
  title: {
    fontFamily: '"Cormorant Garamond", Georgia, serif',
    fontWeight: 600, color: '#0F1924', lineHeight: 1.15,
  },
  num: {
    fontFamily: '"Bebas Neue", sans-serif',
    lineHeight: 1,
  },
  goldRule: {
    width: 32, height: 2, background: '#B8922A', margin: '10px 0',
  },
  card: {
    background: 'white',
    borderRadius: 10,
    border: '1px solid rgba(15,25,36,0.08)',
    boxShadow: '0 2px 12px rgba(15,25,36,0.05)',
  },
}

/* ── Carte statistique (dans le hero) ── */
function HeroStat({ value, label, to }) {
  return (
    <Link to={to} style={{ textDecoration: 'none', flex: '1 1 0', minWidth: 100 }}>
      <div style={{
        background: 'rgba(255,255,255,0.06)',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: 8, padding: '18px 16px',
        transition: 'background 0.2s',
      }}
        onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.11)'}
        onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.06)'}
      >
        <div style={{ ...S.num, fontSize: 44, color: '#D4AA4A' }}>{value ?? '—'}</div>
        <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', marginTop: 4, letterSpacing: '0.06em' }}>{label}</div>
      </div>
    </Link>
  )
}

/* ── Bouton d'action rapide ── */
function QuickBtn({ icon: Icon, label, to, style }) {
  return (
    <Link to={to} style={{
      display: 'inline-flex', alignItems: 'center', gap: 8,
      padding: '9px 18px', borderRadius: 6,
      fontSize: 12, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase',
      textDecoration: 'none', transition: 'opacity 0.2s',
      ...style,
    }}
      onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
      onMouseLeave={e => e.currentTarget.style.opacity = '1'}
    >
      <Icon size={14} />
      {label}
    </Link>
  )
}

/* ── Ligne article récent ── */
function ArticleRow({ article }) {
  return (
    <Link to={`/articles/${article.id}/modifier`} style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 12, padding: '10px 16px', borderRadius: 8, transition: 'background 0.15s' }}
      onMouseEnter={e => e.currentTarget.style.background = '#F8F6F1'}
      onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
    >
      <div style={{ width: 38, height: 38, borderRadius: 6, flexShrink: 0, overflow: 'hidden', background: article.couleur }}>
        {article.image
          ? <img src={`${API}${article.image}`} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          : <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%', ...S.num, fontSize: 13, color: 'rgba(255,255,255,0.5)' }}>EIG</span>
        }
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 13, fontWeight: 500, color: '#0F1924', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{article.titre}</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 2 }}>
          <span style={{ fontSize: 11, color: '#6B7280' }}>{article.date}</span>
          <span style={{ fontSize: 11, color: '#1A6B7A', background: 'rgba(26,107,122,0.08)', padding: '1px 6px', borderRadius: 3 }}>{article.categorie}</span>
          {article.featured && <Star size={10} style={{ color: '#B8922A' }} />}
          {!article.publie && <span style={{ fontSize: 10, color: '#9CA3AF', background: '#F3F4F6', padding: '1px 6px', borderRadius: 3 }}>Brouillon</span>}
        </div>
      </div>
      <ChevronRight size={13} style={{ color: '#D1D5DB', flexShrink: 0 }} />
    </Link>
  )
}

/* ── Lien section du site ── */
function SiteSection({ icon: Icon, label, desc, to, badge }) {
  return (
    <Link to={to} style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 12, padding: '10px 14px', borderRadius: 8, transition: 'background 0.15s', border: '1px solid transparent' }}
      onMouseEnter={e => { e.currentTarget.style.background = '#F8F6F1'; e.currentTarget.style.borderColor = 'rgba(184,146,42,0.15)' }}
      onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'transparent' }}
    >
      <div style={{ width: 34, height: 34, borderRadius: 8, background: 'rgba(26,107,122,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        <Icon size={16} style={{ color: '#1A6B7A' }} />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 13, fontWeight: 500, color: '#0F1924' }}>{label}</div>
        <div style={{ fontSize: 11, color: '#9CA3AF', marginTop: 1 }}>{desc}</div>
      </div>
      {badge != null && (
        <span style={{
          fontSize: 11, fontWeight: 700, padding: '2px 8px', borderRadius: 20, flexShrink: 0,
          background: badge > 0 ? 'rgba(26,107,122,0.08)' : '#F3F4F6',
          color: badge > 0 ? '#1A6B7A' : '#9CA3AF',
        }}>{badge}</span>
      )}
    </Link>
  )
}

/* ── Ligne message non lu ── */
function MessageRow({ msg }) {
  return (
    <div style={{ padding: '10px 16px', borderRadius: 8 }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
        <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#B8922A', flexShrink: 0, marginTop: 5 }} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: '#0F1924' }}>{msg.nom}</div>
          <div style={{ fontSize: 11, color: '#9CA3AF', marginBottom: 2 }}>{msg.email}</div>
          <p style={{ fontSize: 12, color: '#6B7280', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{msg.message}</p>
        </div>
      </div>
    </div>
  )
}

/* ── Ligne statut ── */
function StatusRow({ icon: Icon, iconColor, label, value }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid rgba(15,25,36,0.05)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#6B7280' }}>
        <Icon size={14} style={{ color: iconColor, flexShrink: 0 }} />
        {label}
      </div>
      <span style={{ ...S.num, fontSize: 20, color: '#0F4855' }}>{value}</span>
    </div>
  )
}

/* ══════════════════════════════════════════════════ */
export default function Dashboard() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      api.get('/filiales').catch(() => []),
      api.get('/metiers').catch(() => []),
      api.get('/articles').catch(() => []),
      api.get('/dirigeants').catch(() => []),
      api.get('/contact').catch(() => []),
      api.get('/carrieres').catch(() => []),
      api.get('/images').catch(() => []),
    ]).then(([filiales, metiers, articles, dirigeants, msgs, carrieres, images]) => {
      setData({ filiales, metiers, articles, dirigeants, msgs, carrieres, images })
    }).finally(() => setLoading(false))
  }, [])

  if (loading) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 280 }}>
      <div style={{ width: 36, height: 36, borderRadius: '50%', border: '3px solid #B8922A', borderTopColor: 'transparent', animation: 'spin 0.8s linear infinite' }} />
    </div>
  )

  const { filiales, metiers, articles, dirigeants, msgs, carrieres, images } = data
  const articlesPublies    = articles.filter(a => a.publie)
  const articlesBrouillons = articles.filter(a => !a.publie)
  const filialesActives    = filiales.filter(f => f.actif)
  const carriereActives    = carrieres.filter(c => c.actif)
  const msgsNonLus         = msgs.filter(m => !m.lu)
  const recentArticles     = [...articles].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 5)
  const recentMsgs         = msgsNonLus.slice(0, 4)

  const now = new Date()
  const dateStr = now.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto' }}>

      {/* ── Hero banner ── */}
      <div style={{
        background: 'linear-gradient(135deg, #0F4855 0%, #0F1924 100%)',
        borderRadius: 12,
        padding: '36px 40px 32px',
        marginBottom: 28,
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Décoration dorée */}
        <div style={{ position: 'absolute', top: 0, right: 0, width: 280, height: 280, background: 'radial-gradient(circle, rgba(184,146,42,0.08) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: -40, left: -40, width: 200, height: 200, border: '1px solid rgba(184,146,42,0.1)', borderRadius: '50%', pointerEvents: 'none' }} />

        {/* Top row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 20, flexWrap: 'wrap', marginBottom: 32, position: 'relative' }}>
          <div>
            <div style={{ ...S.label, color: '#D4AA4A', marginBottom: 8 }}>Tableau de bord</div>
            <h1 style={{ ...S.title, fontSize: 'clamp(26px, 3vw, 36px)', color: 'white', marginBottom: 4 }}>
              Excellis Invest Group
            </h1>
            <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', textTransform: 'capitalize', letterSpacing: '0.04em' }}>{dateStr}</p>
          </div>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <QuickBtn icon={Plus}      label="Nouvel article"   to="/articles/nouveau"  style={{ background: '#B8922A', color: 'white' }} />
            <QuickBtn icon={Building2} label="Nouvelle filiale" to="/filiales/nouveau"  style={{ background: 'rgba(255,255,255,0.1)', color: 'white', border: '1px solid rgba(255,255,255,0.15)' }} />
            <QuickBtn icon={ImageIcon} label="Médiathèque"      to="/images"            style={{ background: 'rgba(255,255,255,0.1)', color: 'white', border: '1px solid rgba(255,255,255,0.15)' }} />
          </div>
        </div>

        {/* Stats */}
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', position: 'relative' }}>
          <HeroStat value={filialesActives.length}  label="Filiales actives"   to="/filiales"  />
          <HeroStat value={articlesPublies.length}  label="Articles publiés"   to="/articles"  />
          <HeroStat value={carriereActives.length}  label="Offres d'emploi"    to="/carrieres" />
          <HeroStat value={msgsNonLus.length}       label="Messages non lus"   to="/messages"  />
        </div>
      </div>

      {/* ── Contenu principal ── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 320px', gap: 20, alignItems: 'start' }}>

        {/* ── Actualités récentes ── */}
        <div style={S.card}>
          <div style={{ padding: '20px 16px 12px', borderBottom: '1px solid rgba(15,25,36,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={S.label}>Actualités</div>
              <h2 style={{ ...S.title, fontSize: 18, marginTop: 2 }}>Articles récents</h2>
              <div style={S.goldRule} />
            </div>
            <Link to="/articles/nouveau" style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 11, fontWeight: 600, color: '#1A6B7A', textDecoration: 'none', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              <Plus size={12} /> Ajouter
            </Link>
          </div>
          <div style={{ padding: '8px 0' }}>
            {recentArticles.length > 0
              ? recentArticles.map(a => <ArticleRow key={a.id} article={a} />)
              : <p style={{ textAlign: 'center', color: '#9CA3AF', fontSize: 13, padding: '32px 0' }}>Aucun article</p>
            }
          </div>
          {articles.length > 5 && (
            <div style={{ padding: '10px 16px', borderTop: '1px solid rgba(15,25,36,0.05)' }}>
              <Link to="/articles" style={{ fontSize: 12, color: '#1A6B7A', textDecoration: 'none', fontWeight: 500 }}>
                Voir tous les articles ({articles.length}) →
              </Link>
            </div>
          )}
        </div>

        {/* ── Gestion du site ── */}
        <div style={S.card}>
          <div style={{ padding: '20px 16px 12px', borderBottom: '1px solid rgba(15,25,36,0.05)' }}>
            <div style={S.label}>Administration</div>
            <h2 style={{ ...S.title, fontSize: 18, marginTop: 2 }}>Gestion du site</h2>
            <div style={S.goldRule} />
          </div>
          <div style={{ padding: '8px 6px' }}>
            <SiteSection icon={Building2}     label="Filiales"     desc="Portefeuille de filiales"   to="/filiales"   badge={filialesActives.length} />
            <SiteSection icon={Briefcase}     label="Métiers"      desc="Secteurs d'activité"        to="/metiers"    badge={metiers.length} />
            <SiteSection icon={Users}         label="Gouvernance"  desc="Équipe dirigeante"          to="/dirigeants" badge={dirigeants.length} />
            <SiteSection icon={Globe}         label="Le Groupe"    desc="Mission, valeurs, KPIs"     to="/company" />
            <SiteSection icon={Rocket}        label="Carrières"    desc="Offres d'emploi"            to="/carrieres"  badge={carriereActives.length} />
            <SiteSection icon={ImageIcon}     label="Médiathèque"  desc="Images des sections"        to="/images"     badge={images.length} />
            <SiteSection icon={MessageSquare} label="Messages"     desc="Formulaire de contact"      to="/messages"   badge={msgsNonLus.length} />
          </div>
        </div>

        {/* ── Colonne droite ── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

          {/* Statut du contenu */}
          <div style={S.card}>
            <div style={{ padding: '20px 16px 12px', borderBottom: '1px solid rgba(15,25,36,0.05)' }}>
              <div style={S.label}>Statuts</div>
              <h2 style={{ ...S.title, fontSize: 18, marginTop: 2 }}>Contenu</h2>
              <div style={S.goldRule} />
            </div>
            <div style={{ padding: '8px 16px 12px' }}>
              <StatusRow icon={CheckCircle} iconColor="#10B981" label="Articles publiés"  value={articlesPublies.length} />
              <StatusRow icon={FileText}    iconColor="#F59E0B" label="Brouillons"         value={articlesBrouillons.length} />
              <StatusRow icon={Eye}         iconColor="#1A6B7A" label="Filiales actives"   value={filialesActives.length} />
              <StatusRow icon={EyeOff}      iconColor="#D1D5DB" label="Filiales inactives" value={filiales.length - filialesActives.length} />
              <StatusRow icon={Briefcase}   iconColor="#8B5CF6" label="Métiers"            value={metiers.length} />
              <StatusRow icon={TrendingUp}  iconColor="#B8922A" label="Images médiathèque" value={images.length} />
            </div>
          </div>

          {/* Messages */}
          <div style={S.card}>
            <div style={{ padding: '20px 16px 12px', borderBottom: '1px solid rgba(15,25,36,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={S.label}>Réception</div>
                <h2 style={{ ...S.title, fontSize: 18, marginTop: 2, display: 'flex', alignItems: 'center', gap: 8 }}>
                  Messages
                  {msgsNonLus.length > 0 && (
                    <span style={{ ...S.num, fontSize: 16, background: '#B8922A', color: 'white', borderRadius: 20, padding: '1px 8px', lineHeight: 1.4 }}>
                      {msgsNonLus.length}
                    </span>
                  )}
                </h2>
              </div>
              <Link to="/messages" style={{ fontSize: 11, color: '#1A6B7A', textDecoration: 'none', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                Voir tout
              </Link>
            </div>
            <div style={{ padding: '8px 0' }}>
              {recentMsgs.length > 0
                ? recentMsgs.map(m => <MessageRow key={m.id} msg={m} />)
                : (
                  <div style={{ padding: '28px 0', textAlign: 'center' }}>
                    <MessageSquare size={28} style={{ color: '#E5E7EB', display: 'block', margin: '0 auto 8px' }} />
                    <p style={{ fontSize: 12, color: '#9CA3AF' }}>Aucun message non lu</p>
                  </div>
                )
              }
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
