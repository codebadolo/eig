import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../lib/api'
import toast from 'react-hot-toast'
import PageHeader from '../components/PageHeader'
import ConfirmDialog from '../components/ConfirmDialog'
import { Pencil, Trash2 } from 'lucide-react'

export default function Carrieres() {
  const navigate = useNavigate()
  const [carrieres, setCarrieres] = useState([])
  const [loading, setLoading] = useState(true)
  const [confirm, setConfirm] = useState(null)

  useEffect(() => {
    api.get('/carrieres').then(setCarrieres).finally(() => setLoading(false))
  }, [])

  const handleDelete = async (id) => {
    try {
      await api.delete(`/carrieres/${id}`)
      setCarrieres(carrieres.filter(c => c.id !== id))
      toast.success('Offre supprimée')
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
        title="Carrières"
        subtitle={`${carrieres.length} offre(s)`}
        action={{ label: "Nouvelle offre", onClick: () => navigate('/carrieres/nouveau') }}
      />
      <div className="card overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              <th className="text-left px-4 py-3 font-medium text-gray-600">Poste</th>
              <th className="text-left px-4 py-3 font-medium text-gray-600 hidden md:table-cell">Département</th>
              <th className="text-left px-4 py-3 font-medium text-gray-600 hidden md:table-cell">Type</th>
              <th className="text-left px-4 py-3 font-medium text-gray-600">Statut</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {carrieres.map((c) => (
              <tr key={c.id} className="hover:bg-gray-50/50">
                <td className="px-4 py-3">
                  <div className="font-medium text-gray-900">{c.titre}</div>
                  <div className="text-xs text-gray-400">{c.lieu}</div>
                </td>
                <td className="px-4 py-3 text-gray-600 hidden md:table-cell">{c.departement}</td>
                <td className="px-4 py-3 hidden md:table-cell">
                  <span className="badge bg-blue-50 text-blue-700">{c.type}</span>
                </td>
                <td className="px-4 py-3">
                  <span className={`badge ${c.actif ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                    {c.actif ? 'Active' : 'Fermée'}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1 justify-end">
                    <button onClick={() => navigate(`/carrieres/${c.id}/modifier`)} className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-500 hover:text-brand-600 transition-colors">
                      <Pencil size={15} />
                    </button>
                    <button onClick={() => setConfirm(c)} className="p-1.5 hover:bg-red-50 rounded-lg text-gray-500 hover:text-red-600 transition-colors">
                      <Trash2 size={15} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {carrieres.length === 0 && <div className="py-16 text-center text-gray-400 text-sm">Aucune offre</div>}
      </div>
      <ConfirmDialog
        open={!!confirm}
        title="Supprimer l'offre"
        message={`Supprimer "${confirm?.titre}" ?`}
        onConfirm={() => handleDelete(confirm.id)}
        onCancel={() => setConfirm(null)}
      />
    </div>
  )
}
