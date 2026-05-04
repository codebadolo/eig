import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../lib/api'
import toast from 'react-hot-toast'
import PageHeader from '../components/PageHeader'
import ConfirmDialog from '../components/ConfirmDialog'
import { Trash2, Eye, FileText } from 'lucide-react'

const STATUTS = [
  { value: '', label: 'Tous' },
  { value: 'recue', label: 'Reçues' },
  { value: 'en_cours', label: 'En cours' },
  { value: 'acceptee', label: 'Acceptées' },
  { value: 'refusee', label: 'Refusées' },
]

const STATUT_STYLE = {
  recue:    { bg: 'rgba(26,107,122,0.1)',  color: '#1A6B7A',  label: 'Reçue' },
  en_cours: { bg: 'rgba(184,146,42,0.1)', color: '#B8922A',  label: 'En cours' },
  acceptee: { bg: 'rgba(16,185,129,0.1)', color: '#059669',  label: 'Acceptée' },
  refusee:  { bg: 'rgba(239,68,68,0.1)',  color: '#DC2626',  label: 'Refusée' },
}

export default function Candidatures() {
  const navigate = useNavigate()
  const [all, setAll] = useState([])
  const [filtre, setFiltre] = useState('')
  const [loading, setLoading] = useState(true)
  const [confirm, setConfirm] = useState(null)

  useEffect(() => {
    api.get('/candidatures').then(setAll).finally(() => setLoading(false))
  }, [])

  const liste = filtre ? all.filter(c => c.statut === filtre) : all

  const handleDelete = async (id) => {
    try {
      await api.delete(`/candidatures/${id}`)
      setAll(all.filter(c => c.id !== id))
      toast.success('Candidature supprimée')
    } catch (err) {
      toast.error(err.message)
    } finally {
      setConfirm(null)
    }
  }

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className="animate-spin w-8 h-8 border-4 border-brand-500 border-t-transparent rounded-full" />
    </div>
  )

  return (
    <div>
      <PageHeader title="Candidatures" subtitle={`${all.length} candidature(s) reçue(s)`} />

      {/* Filtres statut */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap' }}>
        {STATUTS.map(s => (
          <button key={s.value} onClick={() => setFiltre(s.value)} style={{
            padding: '6px 16px', borderRadius: 20, fontSize: 12, fontWeight: 600,
            border: '1px solid',
            borderColor: filtre === s.value ? '#0F4855' : '#E5E7EB',
            background: filtre === s.value ? '#0F4855' : 'white',
            color: filtre === s.value ? 'white' : '#6B7280',
            cursor: 'pointer', transition: 'all 0.15s',
          }}>
            {s.label}
            {s.value && (
              <span style={{ marginLeft: 6, opacity: 0.7 }}>
                ({all.filter(c => c.statut === s.value).length})
              </span>
            )}
          </button>
        ))}
      </div>

      <div className="card overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              <th className="text-left px-4 py-3 font-medium text-gray-600">Candidat</th>
              <th className="text-left px-4 py-3 font-medium text-gray-600 hidden md:table-cell">Poste</th>
              <th className="text-left px-4 py-3 font-medium text-gray-600 hidden lg:table-cell">Date</th>
              <th className="text-left px-4 py-3 font-medium text-gray-600">Statut</th>
              <th className="text-left px-4 py-3 font-medium text-gray-600 hidden md:table-cell">CV</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {liste.map((c) => {
              const s = STATUT_STYLE[c.statut] || STATUT_STYLE.recue
              return (
                <tr key={c.id} className="hover:bg-gray-50/50">
                  <td className="px-4 py-3">
                    <div className="font-medium text-gray-900">{c.prenom} {c.nom}</div>
                    <div className="text-xs text-gray-400">{c.email}</div>
                  </td>
                  <td className="px-4 py-3 text-gray-600 hidden md:table-cell">
                    {c.carriere_titre || <span style={{ color: '#D1D5DB', fontStyle: 'italic' }}>Spontanée</span>}
                  </td>
                  <td className="px-4 py-3 text-gray-400 text-xs hidden lg:table-cell">
                    {new Date(c.created_at).toLocaleDateString('fr-FR')}
                  </td>
                  <td className="px-4 py-3">
                    <span style={{ fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 20, background: s.bg, color: s.color }}>
                      {s.label}
                    </span>
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell">
                    {c.cv_path
                      ? <a href={`${import.meta.env.VITE_API_URL?.replace('/api', '') || ''}${c.cv_path}`} target="_blank" rel="noreferrer"
                          className="inline-flex items-center gap-1 text-xs text-brand-600 hover:underline">
                          <FileText size={13} /> Voir CV
                        </a>
                      : <span className="text-xs text-gray-300">—</span>
                    }
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1 justify-end">
                      <button onClick={() => navigate(`/candidatures/${c.id}`)}
                        className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-500 hover:text-brand-600 transition-colors">
                        <Eye size={15} />
                      </button>
                      <button onClick={() => setConfirm(c)}
                        className="p-1.5 hover:bg-red-50 rounded-lg text-gray-500 hover:text-red-600 transition-colors">
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
        {liste.length === 0 && (
          <div className="py-16 text-center text-gray-400 text-sm">
            {filtre ? 'Aucune candidature avec ce statut' : 'Aucune candidature reçue'}
          </div>
        )}
      </div>

      <ConfirmDialog
        open={!!confirm}
        title="Supprimer la candidature"
        message={`Supprimer la candidature de "${confirm?.prenom} ${confirm?.nom}" ?`}
        onConfirm={() => handleDelete(confirm.id)}
        onCancel={() => setConfirm(null)}
      />
    </div>
  )
}
