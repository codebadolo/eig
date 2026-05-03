import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { api } from '../lib/api'
import toast from 'react-hot-toast'
import PageHeader from '../components/PageHeader'
import ImageUpload from '../components/ImageUpload'
import BlockEditor from '../components/BlockEditor'
import { Eye } from 'lucide-react'

const CATEGORIES = ['Corporate', 'Filiales', 'Finance', 'Énergie', 'Technologie', 'Immobilier', 'Assurance']

const GRADIENTS = [
  'linear-gradient(135deg, #1A6B7A, #0F4855)',
  'linear-gradient(135deg, #2A6B4A, #1A4A32)',
  'linear-gradient(135deg, #6B2A6B, #4A1A4A)',
  'linear-gradient(135deg, #6B4A1A, #4A3010)',
  'linear-gradient(135deg, #1A4A6B, #102A4A)',
  'linear-gradient(135deg, #0F4855, #0F1924)',
]

function slugify(str) {
  return str.toLowerCase()
    .normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim().replace(/\s+/g, '-')
    .slice(0, 80)
}

export default function ArticleForm() {
  const { id } = useParams()
  const navigate = useNavigate()
  const isEdit = !!id
  const [image, setImage] = useState('')
  const [blocks, setBlocks] = useState([])
  const [saving, setSaving] = useState(false)
  const [slugEdited, setSlugEdited] = useState(false)

  const { register, handleSubmit, reset, watch, setValue } = useForm({
    defaultValues: { publie: true, featured: false }
  })

  const titleValue = watch('titre')

  useEffect(() => {
    if (!isEdit && titleValue && !slugEdited) {
      setValue('slug', slugify(titleValue))
    }
  }, [titleValue, isEdit, slugEdited, setValue])

  useEffect(() => {
    if (isEdit) {
      api.get(`/articles/${id}`).then((a) => {
        reset(a)
        setImage(a.image || '')
        setSlugEdited(true)
        try {
          const parsed = JSON.parse(a.contenu)
          if (Array.isArray(parsed)) {
            setBlocks(parsed)
            return
          }
        } catch {}
        if (a.contenu) {
          setBlocks([{ id: 'legacy', type: 'paragraph', content: a.contenu }])
        }
      }).catch(() => toast.error('Article non trouvé'))
    }
  }, [id, isEdit, reset])

  const onSubmit = async (data) => {
    setSaving(true)
    try {
      const payload = {
        ...data,
        image: image || null,
        contenu: JSON.stringify(blocks),
        featured: data.featured === true || data.featured === 'true',
        publie: data.publie !== false && data.publie !== 'false',
      }
      if (isEdit) {
        await api.put(`/articles/${id}`, payload)
        toast.success('Article mis à jour')
      } else {
        await api.post('/articles', payload)
        toast.success('Article créé')
      }
      navigate('/articles')
    } catch (err) {
      toast.error(err.message)
    } finally {
      setSaving(false)
    }
  }

  const couleur = watch('couleur')

  return (
    <div className="max-w-3xl">
      <PageHeader
        title={isEdit ? "Modifier l'article" : 'Nouvel article'}
        backTo="/articles"
        action={
          <button type="submit" form="article-form" disabled={saving} className="btn-primary">
            {saving ? 'Enregistrement...' : isEdit ? 'Mettre à jour' : "Publier l'article"}
          </button>
        }
      />

      <form id="article-form" onSubmit={handleSubmit(onSubmit)} className="space-y-5">

        {/* Informations */}
        <div className="card p-5 space-y-4">
          <h2 className="text-sm font-semibold text-gray-700 pb-1 border-b border-gray-100">Informations</h2>

          <div>
            <label className="label">Titre *</label>
            <input className="input text-base font-medium" placeholder="Titre de l'article"
              {...register('titre', { required: true })} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label">Slug (URL) *</label>
              <input className="input font-mono text-xs"
                placeholder="mon-article-2026"
                {...register('slug', { required: true })}
                onChange={e => { setSlugEdited(true); setValue('slug', e.target.value) }}
              />
            </div>
            <div>
              <label className="label">Date *</label>
              <input className="input" placeholder="Avril 2026" {...register('date', { required: true })} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label">Catégorie *</label>
              <select className="input" {...register('categorie', { required: true })}>
                <option value="">— Choisir —</option>
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="label">Couleur de fond</label>
              <div className="flex gap-1.5 flex-wrap mt-1">
                {GRADIENTS.map(g => (
                  <button key={g} type="button"
                    onClick={() => setValue('couleur', g)}
                    className={`w-7 h-7 rounded-lg border-2 transition-all ${couleur === g ? 'border-gray-900 scale-110' : 'border-transparent'}`}
                    style={{ background: g }}
                  />
                ))}
                <input className="input h-7 text-xs flex-1 min-w-[120px] font-mono"
                  placeholder="CSS gradient..."
                  {...register('couleur', { required: true })} />
              </div>
            </div>
          </div>

          <div>
            <label className="label">Extrait *</label>
            <textarea className="input" rows={2}
              placeholder="Résumé court affiché dans les listes..."
              {...register('extrait', { required: true })} />
          </div>

          <div className="flex gap-6 pt-1">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="w-4 h-4 rounded accent-brand-600" {...register('featured')} />
              <span className="text-sm font-medium text-gray-700 flex items-center gap-1">
                <Eye size={13} /> À la une
              </span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="w-4 h-4 rounded accent-brand-600" defaultChecked {...register('publie')} />
              <span className="text-sm font-medium text-gray-700">Publié</span>
            </label>
          </div>
        </div>

        {/* Image de couverture */}
        <div className="card p-5">
          <h2 className="text-sm font-semibold text-gray-700 pb-3 border-b border-gray-100 mb-4">Image de couverture</h2>
          <ImageUpload value={image} onChange={setImage} label="" />
        </div>

        {/* Contenu */}
        <div className="card p-5">
          <div className="flex items-center justify-between pb-3 border-b border-gray-100 mb-4">
            <h2 className="text-sm font-semibold text-gray-700">Contenu de l'article</h2>
            <span className="text-xs text-gray-400">{blocks.length} bloc{blocks.length > 1 ? 's' : ''}</span>
          </div>
          <BlockEditor value={blocks} onChange={setBlocks} />
        </div>

        <div className="flex gap-3 pb-8">
          <button type="submit" disabled={saving} className="btn-primary">
            {saving ? 'Enregistrement...' : isEdit ? 'Mettre à jour' : "Publier l'article"}
          </button>
          <button type="button" onClick={() => navigate('/articles')} className="btn-secondary">
            Annuler
          </button>
        </div>
      </form>
    </div>
  )
}
