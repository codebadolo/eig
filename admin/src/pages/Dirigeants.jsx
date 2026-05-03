import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../lib/api'
import toast from 'react-hot-toast'
import PageHeader from '../components/PageHeader'
import ConfirmDialog from '../components/ConfirmDialog'
import { Pencil, Trash2 } from 'lucide-react'

const API_URL = import.meta.env.VITE_API_URL?.replace('/api', '') || ''

export default function Dirigeants() {
  const navigate = useNavigate()
  const [dirigeants, setDirigeants] = useState([])
  const [loading, setLoading] = useState(true)
  const [confirm, setConfirm] = useState(null)

  useEffect(() => {
    api.get('/dirigeants').then(setDirigeants).finally(() => setLoading(false))
  }, [])

  const handleDelete = async (id) => {
    try {
      await api.delete(`/dirigeants/${id}`)
      setDirigeants(dirigeants.filter(d => d.id !== id))
      toast.success('Dirigeant supprimé')
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
        title="Gouvernance"
        subtitle="Dirigeants du Groupe"
        action={{ label: 'Ajouter un dirigeant', onClick: () => navigate('/dirigeants/nouveau') }}
      />
      <div className="card overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              <th className="text-left px-4 py-3 font-medium text-gray-600">Dirigeant</th>
              <th className="text-left px-4 py-3 font-medium text-gray-600 hidden md:table-cell">Rôle</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {dirigeants.map((d) => (
              <tr key={d.id} className="hover:bg-gray-50/50">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    {d.photo
                      ? <img src={`${API_URL}${d.photo}`} alt="" className="w-9 h-9 rounded-full object-cover border border-gray-200" />
                      : <div className="w-9 h-9 rounded-full bg-brand-100 text-brand-700 flex items-center justify-center font-bold text-sm">{d.nom[0]}</div>
                    }
                    <span className="font-medium text-gray-900">{d.nom}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-gray-600 hidden md:table-cell">{d.role}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1 justify-end">
                    <button onClick={() => navigate(`/dirigeants/${d.id}/modifier`)} className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-500 hover:text-brand-600 transition-colors">
                      <Pencil size={15} />
                    </button>
                    <button onClick={() => setConfirm(d)} className="p-1.5 hover:bg-red-50 rounded-lg text-gray-500 hover:text-red-600 transition-colors">
                      <Trash2 size={15} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {dirigeants.length === 0 && <div className="py-16 text-center text-gray-400 text-sm">Aucun dirigeant</div>}
      </div>
      <ConfirmDialog
        open={!!confirm}
        title="Supprimer le dirigeant"
        message={`Supprimer "${confirm?.nom}" ?`}
        onConfirm={() => handleDelete(confirm.id)}
        onCancel={() => setConfirm(null)}
      />
    </div>
  )
}
