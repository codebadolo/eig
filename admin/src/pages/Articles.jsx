import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../lib/api'
import toast from 'react-hot-toast'
import PageHeader from '../components/PageHeader'
import ConfirmDialog from '../components/ConfirmDialog'
import { Pencil, Trash2, Star } from 'lucide-react'

export default function Articles() {
  const navigate = useNavigate()
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [confirm, setConfirm] = useState(null)

  useEffect(() => {
    api.get('/articles').then(setArticles).finally(() => setLoading(false))
  }, [])

  const handleDelete = async (id) => {
    try {
      await api.delete(`/articles/${id}`)
      setArticles(articles.filter(a => a.id !== id))
      toast.success('Article supprimé')
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
        title="Actualités"
        subtitle={`${articles.length} articles`}
        action={{ label: 'Nouvel article', onClick: () => navigate('/articles/nouveau') }}
      />

      <div className="space-y-2">
        {articles.map((a) => (
          <div key={a.id} className="card p-4 flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg flex-shrink-0 overflow-hidden" style={{ background: a.couleur }}>
              {a.featured && <Star size={14} className="m-auto mt-3.5 text-white/70" />}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="font-medium text-gray-900 text-sm truncate">{a.titre}</h3>
                {a.featured && <span className="badge bg-amber-100 text-amber-700 flex-shrink-0">À la une</span>}
                {!a.publie && <span className="badge bg-gray-100 text-gray-500 flex-shrink-0">Brouillon</span>}
              </div>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="badge bg-brand-50 text-brand-700">{a.categorie}</span>
                <span className="text-xs text-gray-400">{a.date}</span>
              </div>
            </div>
            <div className="flex items-center gap-1 flex-shrink-0">
              <button onClick={() => navigate(`/articles/${a.id}/modifier`)} className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-500 hover:text-brand-600 transition-colors">
                <Pencil size={15} />
              </button>
              <button onClick={() => setConfirm(a)} className="p-1.5 hover:bg-red-50 rounded-lg text-gray-500 hover:text-red-600 transition-colors">
                <Trash2 size={15} />
              </button>
            </div>
          </div>
        ))}
        {articles.length === 0 && (
          <div className="card py-16 text-center text-gray-400 text-sm">Aucun article</div>
        )}
      </div>

      <ConfirmDialog
        open={!!confirm}
        title="Supprimer l'article"
        message={`Supprimer "${confirm?.titre}" ?`}
        onConfirm={() => handleDelete(confirm.id)}
        onCancel={() => setConfirm(null)}
      />
    </div>
  )
}
