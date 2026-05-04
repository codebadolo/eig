import { useEffect, useState } from 'react'
import { api } from '../lib/api'
import toast from 'react-hot-toast'
import PageHeader from '../components/PageHeader'
import ConfirmDialog from '../components/ConfirmDialog'
import { Trash2, Send, Users, Globe } from 'lucide-react'

export default function Newsletter() {
  const [subscribers, setSubscribers] = useState([])
  const [loading, setLoading] = useState(true)
  const [confirm, setConfirm] = useState(null)
  const [sending, setSending] = useState(false)
  const [form, setForm] = useState({
    subject: '', subject_en: '',
    body: '', body_en: '',
  })
  const [tab, setTab] = useState('fr')

  useEffect(() => {
    api.get('/newsletter').then(setSubscribers).finally(() => setLoading(false))
  }, [])

  const handleDelete = async (id) => {
    try {
      await api.delete(`/newsletter/${id}`)
      setSubscribers(subscribers.filter(s => s.id !== id))
      toast.success('Abonné supprimé')
    } catch (err) {
      toast.error(err.message)
    } finally {
      setConfirm(null)
    }
  }

  const handleSend = async (e) => {
    e.preventDefault()
    if (!form.subject || !form.body) return toast.error('Objet et contenu FR requis.')
    setSending(true)
    try {
      const res = await api.post('/newsletter/send', form)
      toast.success(res.message)
      setForm({ subject: '', subject_en: '', body: '', body_en: '' })
    } catch (err) {
      toast.error(err.message)
    } finally {
      setSending(false)
    }
  }

  const frCount = subscribers.filter(s => s.locale === 'fr').length
  const enCount = subscribers.filter(s => s.locale === 'en').length

  const S = {
    tab: (active) => ({
      padding: '6px 18px', borderRadius: 6, fontSize: 12, fontWeight: 700,
      border: '1px solid', cursor: 'pointer', transition: 'all 0.15s',
      borderColor: active ? '#0F4855' : '#E5E7EB',
      background: active ? '#0F4855' : 'white',
      color: active ? 'white' : '#6B7280',
    }),
    textarea: {
      width: '100%', padding: '12px 16px', borderRadius: 6,
      border: '1px solid #E5E7EB', fontSize: 14, lineHeight: 1.7,
      resize: 'vertical', minHeight: 160, boxSizing: 'border-box',
      fontFamily: 'inherit', outline: 'none',
    },
    input: {
      width: '100%', padding: '10px 14px', borderRadius: 6,
      border: '1px solid #E5E7EB', fontSize: 14, boxSizing: 'border-box', outline: 'none',
    },
    label: { fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#9CA3AF', display: 'block', marginBottom: 6 },
  }

  if (loading) return <div className="flex items-center justify-center h-64"><div className="animate-spin w-8 h-8 border-4 border-brand-500 border-t-transparent rounded-full" /></div>

  return (
    <div>
      <PageHeader title="Newsletter" subtitle={`${subscribers.length} abonné(s)`} />

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16, marginBottom: 28 }}>
        {[
          { icon: Users, label: 'Total abonnés', value: subscribers.length, color: '#0F4855' },
          { icon: Globe,  label: 'Francophones',  value: frCount,           color: '#1A6B7A' },
          { icon: Globe,  label: 'Anglophones',   value: enCount,           color: '#B8922A' },
        ].map(({ icon: Icon, label, value, color }) => (
          <div key={label} style={{ background: 'white', borderRadius: 10, border: '1px solid rgba(15,25,36,0.08)', padding: '20px 24px', display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ width: 40, height: 40, borderRadius: 8, background: `${color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Icon size={18} style={{ color }} />
            </div>
            <div>
              <div style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: 28, color, lineHeight: 1 }}>{value}</div>
              <div style={{ fontSize: 12, color: '#9CA3AF', marginTop: 2 }}>{label}</div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 24, alignItems: 'start' }}>

        {/* Liste abonnés */}
        <div style={{ background: 'white', borderRadius: 10, border: '1px solid rgba(15,25,36,0.08)', overflow: 'hidden' }}>
          <div style={{ padding: '16px 20px', borderBottom: '1px solid rgba(15,25,36,0.06)' }}>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#B8922A' }}>Base</div>
            <h2 style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: 18, color: '#0F1924', fontWeight: 600, marginTop: 2 }}>Abonnés</h2>
          </div>
          <div style={{ maxHeight: 480, overflowY: 'auto' }}>
            {subscribers.length === 0 ? (
              <div style={{ padding: '40px', textAlign: 'center', color: '#9CA3AF', fontSize: 13 }}>Aucun abonné</div>
            ) : subscribers.map(s => (
              <div key={s.id} style={{ display: 'flex', alignItems: 'center', padding: '10px 16px', borderBottom: '1px solid rgba(15,25,36,0.04)', gap: 10 }}>
                <div style={{
                  fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 10,
                  background: s.locale === 'en' ? 'rgba(184,146,42,0.1)' : 'rgba(26,107,122,0.08)',
                  color: s.locale === 'en' ? '#B8922A' : '#1A6B7A',
                  flexShrink: 0,
                }}>
                  {s.locale.toUpperCase()}
                </div>
                <div style={{ flex: 1, fontSize: 13, color: '#374151', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{s.email}</div>
                <div style={{ fontSize: 11, color: '#D1D5DB', flexShrink: 0 }}>
                  {new Date(s.created_at).toLocaleDateString('fr-FR')}
                </div>
                <button onClick={() => setConfirm(s)} style={{ padding: '4px', border: 'none', background: 'none', cursor: 'pointer', color: '#D1D5DB', flexShrink: 0 }}
                  onMouseEnter={e => e.currentTarget.style.color = '#EF4444'}
                  onMouseLeave={e => e.currentTarget.style.color = '#D1D5DB'}>
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Composer newsletter */}
        <div style={{ background: 'white', borderRadius: 10, border: '1px solid rgba(15,25,36,0.08)', overflow: 'hidden' }}>
          <div style={{ padding: '16px 20px', borderBottom: '1px solid rgba(15,25,36,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#B8922A' }}>Envoi</div>
              <h2 style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: 18, color: '#0F1924', fontWeight: 600, marginTop: 2 }}>Composer une newsletter</h2>
            </div>
            <div style={{ display: 'flex', gap: 6 }}>
              <button style={S.tab(tab === 'fr')} onClick={() => setTab('fr')}>FR</button>
              <button style={S.tab(tab === 'en')} onClick={() => setTab('en')}>EN</button>
            </div>
          </div>

          <form onSubmit={handleSend} style={{ padding: '20px' }}>
            <div style={{ display: tab === 'fr' ? 'flex' : 'none', flexDirection: 'column', gap: 16 }}>
              <div>
                <label style={S.label}>Objet (FR) <span style={{ color: '#B8922A' }}>*</span></label>
                <input style={S.input} value={form.subject} onChange={e => setForm(f => ({ ...f, subject: e.target.value }))} placeholder="Objet de la newsletter en français" />
              </div>
              <div>
                <label style={S.label}>Contenu (FR) <span style={{ color: '#B8922A' }}>*</span></label>
                <textarea style={S.textarea} value={form.body} onChange={e => setForm(f => ({ ...f, body: e.target.value }))} placeholder="Rédigez votre newsletter en français..." />
              </div>
            </div>

            <div style={{ display: tab === 'en' ? 'flex' : 'none', flexDirection: 'column', gap: 16 }}>
              <div>
                <label style={S.label}>Subject (EN)</label>
                <input style={S.input} value={form.subject_en} onChange={e => setForm(f => ({ ...f, subject_en: e.target.value }))} placeholder="Newsletter subject in English (optional)" />
              </div>
              <div>
                <label style={S.label}>Content (EN)</label>
                <textarea style={S.textarea} value={form.body_en} onChange={e => setForm(f => ({ ...f, body_en: e.target.value }))} placeholder="Write your newsletter in English (optional — falls back to FR if empty)..." />
              </div>
            </div>

            <div style={{ marginTop: 20, padding: '12px 16px', background: '#F8F6F1', borderRadius: 6, fontSize: 12, color: '#6B7280' }}>
              📤 Sera envoyée à <strong>{subscribers.length} abonné(s)</strong> — {frCount} FR · {enCount} EN
            </div>

            <button type="submit" disabled={sending || subscribers.length === 0} style={{
              marginTop: 16, width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              padding: '12px', borderRadius: 6, border: 'none', cursor: sending || subscribers.length === 0 ? 'not-allowed' : 'pointer',
              background: sending || subscribers.length === 0 ? '#9CA3AF' : '#0F4855',
              color: 'white', fontSize: 13, fontWeight: 700, letterSpacing: '0.08em',
            }}>
              <Send size={15} />
              {sending ? 'Envoi en cours...' : `Envoyer à ${subscribers.length} abonné(s)`}
            </button>
          </form>
        </div>
      </div>

      <ConfirmDialog
        open={!!confirm}
        title="Supprimer l'abonné"
        message={`Supprimer "${confirm?.email}" de la liste ?`}
        onConfirm={() => handleDelete(confirm.id)}
        onCancel={() => setConfirm(null)}
      />
    </div>
  )
}
