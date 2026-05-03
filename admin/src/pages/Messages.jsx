import { useEffect, useState } from 'react'
import { api } from '../lib/api'
import toast from 'react-hot-toast'
import PageHeader from '../components/PageHeader'
import ConfirmDialog from '../components/ConfirmDialog'
import { Trash2, MailOpen, Mail } from 'lucide-react'

export default function Messages() {
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(true)
  const [confirm, setConfirm] = useState(null)
  const [expanded, setExpanded] = useState(null)

  useEffect(() => {
    api.get('/contact').then(setMessages).finally(() => setLoading(false))
  }, [])

  const markLu = async (id) => {
    try {
      const updated = await api.put(`/contact/${id}/lu`)
      setMessages(messages.map(m => m.id === id ? updated : m))
    } catch (err) {
      toast.error(err.message)
    }
  }

  const handleDelete = async (id) => {
    try {
      await api.delete(`/contact/${id}`)
      setMessages(messages.filter(m => m.id !== id))
      toast.success('Message supprimé')
    } catch (err) {
      toast.error(err.message)
    } finally {
      setConfirm(null)
    }
  }

  const nonLus = messages.filter(m => !m.lu).length

  if (loading) return <div className="flex items-center justify-center h-64"><div className="animate-spin w-8 h-8 border-4 border-brand-500 border-t-transparent rounded-full" /></div>

  return (
    <div>
      <PageHeader title="Messages de contact" subtitle={nonLus > 0 ? `${nonLus} non lu(s)` : 'Tous lus'} />
      <div className="space-y-2">
        {messages.map((m) => (
          <div key={m.id} className={`card overflow-hidden transition-all ${!m.lu ? 'border-brand-200 shadow-sm' : ''}`}>
            <div
              className="p-4 cursor-pointer flex items-start gap-3 hover:bg-gray-50"
              onClick={() => {
                setExpanded(expanded === m.id ? null : m.id)
                if (!m.lu) markLu(m.id)
              }}
            >
              <div className={`mt-0.5 flex-shrink-0 ${m.lu ? 'text-gray-300' : 'text-brand-500'}`}>
                {m.lu ? <MailOpen size={18} /> : <Mail size={18} />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-medium text-gray-900 text-sm">{m.nom}</span>
                  {!m.lu && <span className="badge bg-brand-50 text-brand-700">Nouveau</span>}
                  <span className="text-xs text-gray-400 ml-auto">
                    {new Date(m.createdAt).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' })}
                  </span>
                </div>
                <div className="text-xs text-gray-500 mt-0.5">{m.email}{m.telephone ? ` · ${m.telephone}` : ''}</div>
                <div className="text-sm text-gray-700 font-medium mt-1">{m.sujet}</div>
                {expanded !== m.id && <p className="text-xs text-gray-500 mt-1 line-clamp-1">{m.message}</p>}
              </div>
              <button
                onClick={(e) => { e.stopPropagation(); setConfirm(m) }}
                className="p-1.5 hover:bg-red-50 rounded-lg text-gray-300 hover:text-red-600 transition-colors flex-shrink-0"
              >
                <Trash2 size={15} />
              </button>
            </div>
            {expanded === m.id && (
              <div className="px-4 pb-4 border-t border-gray-50 pt-3">
                <p className="text-sm text-gray-700 leading-relaxed">{m.message}</p>
                <a href={`mailto:${m.email}?subject=Re: ${m.sujet}`} className="btn-secondary mt-3 text-xs">
                  Répondre par email
                </a>
              </div>
            )}
          </div>
        ))}
        {messages.length === 0 && (
          <div className="card py-16 text-center text-gray-400 text-sm">
            <Mail size={32} className="mx-auto mb-2 opacity-40" />
            Aucun message reçu
          </div>
        )}
      </div>
      <ConfirmDialog
        open={!!confirm}
        title="Supprimer le message"
        message={`Supprimer le message de "${confirm?.nom}" ?`}
        onConfirm={() => handleDelete(confirm.id)}
        onCancel={() => setConfirm(null)}
      />
    </div>
  )
}
