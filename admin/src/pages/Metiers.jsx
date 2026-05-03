import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../lib/api'
import toast from 'react-hot-toast'
import PageHeader from '../components/PageHeader'
import ConfirmDialog from '../components/ConfirmDialog'
import { Pencil, Trash2 } from 'lucide-react'

export default function Metiers() {
  const navigate = useNavigate()
  const [metiers, setMetiers] = useState([])
  const [loading, setLoading] = useState(true)
  const [confirm, setConfirm] = useState(null)

  useEffect(() => {
    api.get('/metiers').then(setMetiers).finally(() => setLoading(false))
  }, [])

  const handleDelete = async (id) => {
    try {
      await api.delete(`/metiers/${id}`)
      setMetiers(metiers.filter(m => m.id !== id))
      toast.success('Métier supprimé')
    } catch (err) {
      toast.error(err.message)
    } finally {
      setConfirm(null)
    }
  }

  if (loading) return <div className="flex items-center justify-center h-64"><div className="animate-spin w-8 h-8 border-4 border-brand-500 border-t-transparent rounded-full" /></div>

  return (
    <div>
      <PageHeader
        title="Métiers"
        subtitle={`${metiers.length} secteurs d'activité`}
        action={{ label: 'Nouveau métier', onClick: () => navigate('/metiers/nouveau') }}
      />
      <div className="space-y-2">
        {metiers.map((m) => (
          <div key={m.id} className="card p-4 flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg flex-shrink-0 flex items-center justify-center text-xl" style={{ background: m.couleur }}>
              {m.icone}
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-medium text-gray-900 text-sm">{m.titre}</div>
              <div className="text-xs text-gray-400 mt-0.5">{Array.isArray(m.filialesIds) ? m.filialesIds.length : 0} filiale(s)</div>
            </div>
            <div className="flex items-center gap-1">
              <button onClick={() => navigate(`/metiers/${m.id}/modifier`)} className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-500 hover:text-brand-600 transition-colors">
                <Pencil size={15} />
              </button>
              <button onClick={() => setConfirm(m)} className="p-1.5 hover:bg-red-50 rounded-lg text-gray-500 hover:text-red-600 transition-colors">
                <Trash2 size={15} />
              </button>
            </div>
          </div>
        ))}
        {metiers.length === 0 && <div className="card py-16 text-center text-gray-400 text-sm">Aucun métier</div>}
      </div>
      <ConfirmDialog
        open={!!confirm}
        title="Supprimer le métier"
        message={`Supprimer "${confirm?.titre}" ?`}
        onConfirm={() => handleDelete(confirm.id)}
        onCancel={() => setConfirm(null)}
      />
    </div>
  )
}
