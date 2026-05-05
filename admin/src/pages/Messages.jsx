import { useEffect, useState } from 'react'
import { api } from '../lib/api'
import toast from 'react-hot-toast'
import PageHeader from '../components/PageHeader'
import ConfirmDialog from '../components/ConfirmDialog'
import { Trash2, MailOpen, Mail, CheckCircle, Circle, ChevronDown, ChevronUp, ExternalLink, StickyNote } from 'lucide-react'

const SUJET_LABELS = {
  information: 'Information générale',
  investissement: 'Investissement / Partenariat',
  presse: 'Relations presse',
  recrutement: 'Recrutement / Carrières',
  filiale: 'Contact filiale',
  autre: 'Autre',
}

const SUJET_COLORS = {
  investissement: '#0F4855',
  presse:         '#B8922A',
  recrutement:    '#10B981',
  filiale:        '#6366f1',
  information:    '#6B7280',
  autre:          '#6B7280',
}

export default function Messages() {
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(true)
  const [confirm, setConfirm] = useState(null)
  const [expanded, setExpanded] = useState(null)
  const [filter, setFilter] = useState('tous') // tous | nonlus | traites | nontraites
  const [note, setNote] = useState({}) // { [id]: string }
  const [savingNote, setSavingNote] = useState(null)

  useEffect(() => {
    api.get('/contact').then(data => {
      setMessages(data)
      const initialNotes = {}
      data.forEach(m => { if (m.note) initialNotes[m.id] = m.note })
      setNote(initialNotes)
    }).finally(() => setLoading(false))
  }, [])

  const markLu = async (id) => {
    try {
      const updated = await api.put(`/contact/${id}/lu`)
      setMessages(msgs => msgs.map(m => m.id === id ? updated : m))
    } catch (err) {
      toast.error(err.message)
    }
  }

  const toggleTraite = async (id) => {
    try {
      const updated = await api.put(`/contact/${id}/traite`)
      setMessages(msgs => msgs.map(m => m.id === id ? updated : m))
      toast.success(updated.traite ? 'Marqué comme traité' : 'Marqué comme non traité')
    } catch (err) {
      toast.error(err.message)
    }
  }

  const saveNote = async (id) => {
    setSavingNote(id)
    try {
      await api.put(`/contact/${id}/note`, { note: note[id] || '' })
      toast.success('Note enregistrée')
    } catch (err) {
      toast.error(err.message)
    } finally {
      setSavingNote(null)
    }
  }

  const handleDelete = async (id) => {
    try {
      await api.delete(`/contact/${id}`)
      setMessages(msgs => msgs.filter(m => m.id !== id))
      toast.success('Message supprimé')
    } catch (err) {
      toast.error(err.message)
    } finally {
      setConfirm(null)
    }
  }

  const filtered = messages.filter(m => {
    if (filter === 'nonlus') return !m.lu
    if (filter === 'traites') return m.traite
    if (filter === 'nontraites') return !m.traite
    return true
  })

  const counts = {
    tous: messages.length,
    nonlus: messages.filter(m => !m.lu).length,
    traites: messages.filter(m => m.traite).length,
    nontraites: messages.filter(m => !m.traite).length,
  }

  const tabs = [
    { id: 'tous',       label: 'Tous',         count: counts.tous },
    { id: 'nonlus',     label: 'Non lus',       count: counts.nonlus },
    { id: 'nontraites', label: 'À traiter',     count: counts.nontraites },
    { id: 'traites',    label: 'Traités',       count: counts.traites },
  ]

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className="animate-spin w-8 h-8 border-4 border-brand-500 border-t-transparent rounded-full" />
    </div>
  )

  return (
    <div>
      <PageHeader
        title="Messages de contact"
        subtitle={`${counts.nonlus} non lu${counts.nonlus > 1 ? 's' : ''} · ${counts.nontraites} à traiter`}
      />

      {/* Tabs */}
      <div className="flex gap-2 mb-5 flex-wrap">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setFilter(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all border ${
              filter === tab.id
                ? 'bg-brand-700 text-white border-brand-700'
                : 'bg-white text-gray-600 border-gray-200 hover:border-brand-300 hover:text-brand-700'
            }`}
          >
            {tab.label}
            {tab.count > 0 && (
              <span className={`text-xs px-1.5 py-0.5 rounded-full font-semibold ${
                filter === tab.id ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-500'
              }`}>
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Liste */}
      <div className="space-y-2">
        {filtered.map((m) => {
          const isExpanded = expanded === m.id
          const sujetColor = SUJET_COLORS[m.sujet] || '#6B7280'

          return (
            <div key={m.id} className={`card overflow-hidden transition-all ${
              m.traite ? 'opacity-70' : !m.lu ? 'border-brand-200 shadow-sm' : ''
            }`}>
              {/* Header cliquable */}
              <div
                className="p-4 cursor-pointer flex items-start gap-3 hover:bg-gray-50 transition-colors"
                onClick={() => {
                  setExpanded(isExpanded ? null : m.id)
                  if (!m.lu) markLu(m.id)
                }}
              >
                {/* Icône lu/non lu */}
                <div className={`mt-0.5 flex-shrink-0 ${m.lu ? 'text-gray-300' : 'text-brand-500'}`}>
                  {m.lu ? <MailOpen size={18} /> : <Mail size={18} />}
                </div>

                <div className="flex-1 min-w-0">
                  {/* Ligne 1 : nom + badges + date */}
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-semibold text-gray-900 text-sm">{m.nom}</span>
                    {!m.lu && (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-brand-50 text-brand-700 font-semibold border border-brand-100">
                        Nouveau
                      </span>
                    )}
                    {m.traite && (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-semibold border border-emerald-100 flex items-center gap-1">
                        <CheckCircle size={10} /> Traité
                      </span>
                    )}
                    {m.note && (
                      <span className="text-xs text-amber-500 flex items-center gap-1">
                        <StickyNote size={11} /> Note
                      </span>
                    )}
                    <span className="text-xs text-gray-400 ml-auto flex-shrink-0">
                      {new Date(m.created_at).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>

                  {/* Ligne 2 : email + téléphone */}
                  <div className="text-xs text-gray-500 mt-0.5 flex items-center gap-3 flex-wrap">
                    <a href={`mailto:${m.email}`} onClick={e => e.stopPropagation()}
                      className="hover:text-brand-600 transition-colors flex items-center gap-1">
                      {m.email} <ExternalLink size={10} />
                    </a>
                    {m.telephone && <span>· {m.telephone}</span>}
                  </div>

                  {/* Ligne 3 : sujet */}
                  <div className="flex items-center gap-2 mt-1.5">
                    <span className="text-xs px-2 py-0.5 rounded font-semibold text-white"
                      style={{ background: sujetColor }}>
                      {SUJET_LABELS[m.sujet] || m.sujet}
                    </span>
                    {!isExpanded && (
                      <p className="text-xs text-gray-500 truncate">{m.message}</p>
                    )}
                  </div>
                </div>

                {/* Actions rapides */}
                <div className="flex items-center gap-1 flex-shrink-0 ml-2" onClick={e => e.stopPropagation()}>
                  <button
                    onClick={() => toggleTraite(m.id)}
                    title={m.traite ? 'Marquer comme non traité' : 'Marquer comme traité'}
                    className={`p-1.5 rounded-lg transition-colors ${
                      m.traite
                        ? 'text-emerald-500 hover:bg-emerald-50'
                        : 'text-gray-300 hover:text-emerald-500 hover:bg-emerald-50'
                    }`}
                  >
                    {m.traite ? <CheckCircle size={16} /> : <Circle size={16} />}
                  </button>
                  <button
                    onClick={() => setConfirm(m)}
                    className="p-1.5 hover:bg-red-50 rounded-lg text-gray-300 hover:text-red-500 transition-colors"
                  >
                    <Trash2 size={15} />
                  </button>
                  <div className="text-gray-300 ml-1">
                    {isExpanded ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
                  </div>
                </div>
              </div>

              {/* Corps développé */}
              {isExpanded && (
                <div className="border-t border-gray-100 bg-gray-50/50">
                  {/* Message complet */}
                  <div className="px-5 py-4">
                    <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Message</div>
                    <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">{m.message}</p>
                  </div>

                  {/* Note interne */}
                  <div className="px-5 pb-4 border-t border-gray-100 pt-3">
                    <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-1">
                      <StickyNote size={11} /> Note interne
                    </div>
                    <textarea
                      className="w-full text-sm border border-gray-200 rounded-lg p-3 resize-none focus:outline-none focus:border-brand-300 bg-white"
                      rows={3}
                      placeholder="Ajouter une note interne (visible uniquement ici)..."
                      value={note[m.id] || ''}
                      onChange={e => setNote(n => ({ ...n, [m.id]: e.target.value }))}
                    />
                    <div className="flex items-center gap-3 mt-2">
                      <button
                        onClick={() => saveNote(m.id)}
                        disabled={savingNote === m.id}
                        className="btn-secondary text-xs"
                      >
                        {savingNote === m.id ? 'Enregistrement...' : 'Sauvegarder la note'}
                      </button>
                    </div>
                  </div>

                  {/* Actions bas */}
                  <div className="px-5 pb-4 flex items-center gap-3">
                    <a
                      href={`mailto:${m.email}?subject=Re: ${m.sujet}`}
                      className="btn-primary text-xs flex items-center gap-1.5"
                    >
                      <Mail size={13} /> Répondre par email
                    </a>
                    <button
                      onClick={() => toggleTraite(m.id)}
                      className={`btn-secondary text-xs flex items-center gap-1.5 ${m.traite ? 'text-amber-600' : 'text-emerald-600'}`}
                    >
                      {m.traite
                        ? <><Circle size={13} /> Rouvrir</>
                        : <><CheckCircle size={13} /> Marquer comme traité</>
                      }
                    </button>
                    <button
                      onClick={() => setConfirm(m)}
                      className="ml-auto text-xs text-red-400 hover:text-red-600 flex items-center gap-1"
                    >
                      <Trash2 size={12} /> Supprimer
                    </button>
                  </div>
                </div>
              )}
            </div>
          )
        })}

        {filtered.length === 0 && (
          <div className="card py-16 text-center text-gray-400 text-sm">
            <Mail size={32} className="mx-auto mb-2 opacity-30" />
            <div>Aucun message dans cette catégorie</div>
          </div>
        )}
      </div>

      <ConfirmDialog
        open={!!confirm}
        title="Supprimer le message"
        message={`Supprimer définitivement le message de "${confirm?.nom}" ?`}
        onConfirm={() => handleDelete(confirm.id)}
        onCancel={() => setConfirm(null)}
      />
    </div>
  )
}
