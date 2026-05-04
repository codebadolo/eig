import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../lib/api'
import toast from 'react-hot-toast'
import PageHeader from '../components/PageHeader'
import ConfirmDialog from '../components/ConfirmDialog'
import FaIcon from '../components/FaIcon'
import { Pencil, Trash2, Search, Building2 } from 'lucide-react'

export default function Metiers() {
  const navigate = useNavigate()
  const [metiers, setMetiers] = useState([])
  const [loading, setLoading] = useState(true)
  const [confirm, setConfirm] = useState(null)
  const [search, setSearch] = useState('')

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

  const filtered = metiers.filter(m =>
    !search || m.titre?.toLowerCase().includes(search.toLowerCase()) || m.slug?.toLowerCase().includes(search.toLowerCase())
  )

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className="animate-spin w-8 h-8 border-4 border-brand-500 border-t-transparent rounded-full" />
    </div>
  )

  return (
    <div>
      <PageHeader
        title="Métiers"
        subtitle={`${metiers.length} secteur${metiers.length > 1 ? 's' : ''} d'activité`}
        action={{ label: 'Nouveau métier', onClick: () => navigate('/metiers/nouveau') }}
      />

      {/* Barre de recherche */}
      <div className="mb-4 flex items-center gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            className="input pl-9 py-2 text-sm"
            placeholder="Rechercher un métier..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        {search && (
          <span className="text-xs text-gray-500">{filtered.length} résultat{filtered.length > 1 ? 's' : ''}</span>
        )}
      </div>

      {/* Tableau */}
      <div className="card overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr style={{ background: '#F8F6F1', borderBottom: '1px solid #e5e7eb' }}>
              <th className="text-left px-4 py-3 font-semibold text-gray-600 text-xs uppercase tracking-wide">Secteur</th>
              <th className="text-left px-4 py-3 font-semibold text-gray-600 text-xs uppercase tracking-wide hidden md:table-cell">Slug</th>
              <th className="text-left px-4 py-3 font-semibold text-gray-600 text-xs uppercase tracking-wide hidden lg:table-cell">Description</th>
              <th className="text-center px-4 py-3 font-semibold text-gray-600 text-xs uppercase tracking-wide">Filiales</th>
              <th className="text-center px-4 py-3 font-semibold text-gray-600 text-xs uppercase tracking-wide hidden sm:table-cell">Ordre</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {filtered.map((m) => {
              const count = Array.isArray(m.filialesIds) ? m.filialesIds.length : 0
              return (
                <tr key={m.id} className="hover:bg-gray-50/60 transition-colors">
                  {/* Icône + titre */}
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-9 h-9 rounded-lg flex-shrink-0 flex items-center justify-center text-white shadow-sm"
                        style={{ background: m.couleur || '#1A6B7A' }}
                      >
                        <FaIcon name={m.icone} size="sm" />
                      </div>
                      <span className="font-medium text-gray-900">{m.titre}</span>
                    </div>
                  </td>
                  {/* Slug */}
                  <td className="px-4 py-3 hidden md:table-cell">
                    <code className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">{m.slug}</code>
                  </td>
                  {/* Description */}
                  <td className="px-4 py-3 hidden lg:table-cell">
                    <span className="text-xs text-gray-500 line-clamp-2">{m.description}</span>
                  </td>
                  {/* Filiales */}
                  <td className="px-4 py-3 text-center">
                    <span className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full ${
                      count > 0 ? 'bg-brand-50 text-brand-700' : 'bg-gray-100 text-gray-400'
                    }`}>
                      <Building2 size={11} />
                      {count}
                    </span>
                  </td>
                  {/* Ordre */}
                  <td className="px-4 py-3 text-center hidden sm:table-cell">
                    <span className="text-xs text-gray-400 font-mono">{m.ordre ?? '—'}</span>
                  </td>
                  {/* Actions */}
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => navigate(`/metiers/${m.id}/modifier`)}
                        className="p-1.5 hover:bg-blue-50 rounded-lg text-gray-400 hover:text-blue-600 transition-colors"
                        title="Modifier"
                      >
                        <Pencil size={14} />
                      </button>
                      <button
                        onClick={() => setConfirm(m)}
                        className="p-1.5 hover:bg-red-50 rounded-lg text-gray-400 hover:text-red-600 transition-colors"
                        title="Supprimer"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>

        {filtered.length === 0 && (
          <div className="py-16 text-center text-gray-400 text-sm">
            {search ? `Aucun résultat pour "${search}"` : 'Aucun métier'}
          </div>
        )}
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
