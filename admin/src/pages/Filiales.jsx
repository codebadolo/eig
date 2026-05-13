import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../lib/api'
import toast from 'react-hot-toast'
import PageHeader from '../components/PageHeader'
import ConfirmDialog from '../components/ConfirmDialog'
import { Pencil, Trash2, Globe } from 'lucide-react'

const API_URL = import.meta.env.VITE_API_URL?.replace('/api', '') || ''
const resolveUrl = (url) => {
  if (!url) return null
  if (url.startsWith('http')) return url
  return `${API_URL}${url}`
}

export default function Filiales() {
  const navigate = useNavigate()
  const [filiales, setFiliales] = useState([])
  const [loading, setLoading] = useState(true)
  const [confirm, setConfirm] = useState(null)

  useEffect(() => {
    api.get('/filiales').then(setFiliales).finally(() => setLoading(false))
  }, [])

  const handleDelete = async (id) => {
    try {
      await api.delete(`/filiales/${id}`)
      setFiliales(filiales.filter(f => f.id !== id))
      toast.success('Filiale supprimée')
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
        title="Filiales"
        subtitle={`${filiales.length} filiales`}
        action={{ label: 'Nouvelle filiale', onClick: () => navigate('/filiales/nouveau') }}
      />

      <div className="card overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              <th className="text-left px-4 py-3 font-medium text-gray-600">Filiale</th>
              <th className="text-left px-4 py-3 font-medium text-gray-600 hidden md:table-cell">Secteur</th>
              <th className="text-left px-4 py-3 font-medium text-gray-600 hidden md:table-cell">Pays</th>
              <th className="text-left px-4 py-3 font-medium text-gray-600">Statut</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {filiales.map((f) => (
              <tr key={f.id} className="hover:bg-gray-50/50">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    {f.logo
                      ? <img src={resolveUrl(f.logo)} alt="" className="w-8 h-8 rounded object-contain border border-gray-100" />
                      : <div className="w-8 h-8 rounded bg-brand-100 text-brand-700 flex items-center justify-center font-bold text-xs flex-shrink-0">{f.sigle?.slice(0,2)}</div>
                    }
                    <div>
                      <div className="font-medium text-gray-900">{f.nom}</div>
                      <div className="text-xs text-gray-400">{f.sigle}</div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-gray-600 hidden md:table-cell">{f.secteur}</td>
                <td className="px-4 py-3 hidden md:table-cell">
                  <span className="flex items-center gap-1 text-gray-600"><Globe size={12} />{f.pays}</span>
                </td>
                <td className="px-4 py-3">
                  <span className={`badge ${f.actif ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                    {f.actif ? 'Actif' : 'Inactif'}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1 justify-end">
                    <button onClick={() => navigate(`/filiales/${f.id}/modifier`)} className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-500 hover:text-brand-600 transition-colors">
                      <Pencil size={15} />
                    </button>
                    <button onClick={() => setConfirm(f)} className="p-1.5 hover:bg-red-50 rounded-lg text-gray-500 hover:text-red-600 transition-colors">
                      <Trash2 size={15} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filiales.length === 0 && (
          <div className="py-16 text-center text-gray-400 text-sm">Aucune filiale</div>
        )}
      </div>

      <ConfirmDialog
        open={!!confirm}
        title="Supprimer la filiale"
        message={`Supprimer "${confirm?.nom}" ? Cette action est irréversible.`}
        onConfirm={() => handleDelete(confirm.id)}
        onCancel={() => setConfirm(null)}
      />
    </div>
  )
}
