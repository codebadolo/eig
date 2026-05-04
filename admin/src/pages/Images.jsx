import { useEffect, useState, useRef } from 'react'
import { api } from '../lib/api'
import toast from 'react-hot-toast'
import PageHeader from '../components/PageHeader'
import { Plus, Trash2, Upload, Eye, EyeOff, Pencil, Copy, Check, X } from 'lucide-react'

const API = import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://localhost:3001'

// Sections connues avec libellés lisibles
const KNOWN_SECTIONS = {
  // Bannières de pages (PageHero)
  'hero':               'Hero – Accueil',
  'about':              'Bannière – Le Groupe',
  'nos-filiales':       'Bannière – Nos Filiales',
  'nos-metiers':        'Bannière – Nos Métiers',
  'actualites':         'Bannière – Actualités',
  'governance':         'Bannière – Gouvernance',
  'careers':            'Bannière – Carrières',
  'contact':            'Bannière – Contact',
  // Sections internes (accueil)
  'home-about':         'Accueil – Section Groupe',
  'home-cta':           'Accueil – Bandeau CTA',
  'home-governance':    'Accueil – Section Gouvernance',
  // Sections internes (pages)
  'about-gallery':      'Le Groupe – Galerie photos',
  'careers-ambiance':   'Carrières – Photos d\'ambiance',
  // Thématiques sectorielles
  'energie':            'Énergie',
  'fintech':            'Fintech',
  'general':            'Général',
}

// Préfixes de sections de détail
const DETAIL_PREFIXES = [
  { prefix: 'filiale-', label: 'Filiale' },
  { prefix: 'metier-',  label: 'Métier' },
]

function sectionLabel(key) {
  if (KNOWN_SECTIONS[key]) return KNOWN_SECTIONS[key]
  for (const { prefix, label } of DETAIL_PREFIXES) {
    if (key.startsWith(prefix)) return `${label} › ${key.slice(prefix.length)}`
  }
  return key
}

function CopyButton({ text }) {
  const [copied, setCopied] = useState(false)
  const copy = (e) => {
    e.stopPropagation()
    navigator.clipboard.writeText(`${API}${text}`).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    })
  }
  return (
    <button
      onClick={copy}
      className="p-1.5 text-gray-400 hover:text-brand-600 hover:bg-brand-50 rounded-lg border border-gray-200 transition-colors"
      title="Copier l'URL"
    >
      {copied ? <Check size={13} className="text-green-500" /> : <Copy size={13} />}
    </button>
  )
}

function ImageCard({ image, onToggle, onDelete, onEdit, onPreview }) {
  return (
    <div className={`relative rounded-xl overflow-hidden border-2 transition-all group ${image.actif ? 'border-brand-200' : 'border-gray-200 opacity-60'}`}>
      <div className="aspect-video bg-gray-100 relative cursor-pointer" onClick={() => onPreview(image)}>
        <img
          src={`${API}${image.url}`}
          alt={image.alt || image.titre}
          className="w-full h-full object-cover"
        />
        {!image.actif && (
          <div className="absolute inset-0 bg-gray-900/40 flex items-center justify-center">
            <span className="text-white text-xs font-semibold bg-gray-800 px-2 py-1 rounded">Désactivée</span>
          </div>
        )}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
          <span className="text-white text-xs font-medium bg-black/60 px-2 py-1 rounded">Aperçu</span>
        </div>
      </div>
      <div className="p-3 bg-white">
        <div className="text-sm font-medium text-gray-800 truncate">{image.titre || '(sans titre)'}</div>
        <div className="text-xs text-gray-400 truncate mt-0.5 font-mono">{image.url}</div>
        <div className="flex items-center gap-1.5 mt-3">
          <button onClick={() => onEdit(image)} className="flex-1 flex items-center justify-center gap-1 py-1.5 text-xs font-medium text-gray-600 hover:text-brand-600 hover:bg-brand-50 rounded-lg border border-gray-200 transition-colors">
            <Pencil size={12} /> Modifier
          </button>
          <CopyButton text={image.url} />
          <button onClick={() => onToggle(image)} className="p-1.5 text-gray-500 hover:text-brand-600 hover:bg-brand-50 rounded-lg border border-gray-200 transition-colors" title={image.actif ? 'Désactiver' : 'Activer'}>
            {image.actif ? <EyeOff size={14} /> : <Eye size={14} />}
          </button>
          <button onClick={() => onDelete(image.id)} className="p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg border border-gray-200 transition-colors">
            <Trash2 size={14} />
          </button>
        </div>
      </div>
    </div>
  )
}

function Lightbox({ image, onClose }) {
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  return (
    <div className="fixed inset-0 bg-black/90 z-[60] flex items-center justify-center p-4" onClick={onClose}>
      <button className="absolute top-4 right-4 text-white hover:text-gray-300 p-2" onClick={onClose}>
        <X size={24} />
      </button>
      <div className="max-w-5xl max-h-[90vh] relative" onClick={e => e.stopPropagation()}>
        <img
          src={`${API}${image.url}`}
          alt={image.alt || image.titre}
          className="max-w-full max-h-[85vh] object-contain rounded-lg"
        />
        {(image.titre || image.alt) && (
          <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-sm px-4 py-2 rounded-b-lg">
            {image.titre && <span className="font-medium">{image.titre}</span>}
            {image.alt && <span className="text-gray-300 ml-2 text-xs">{image.alt}</span>}
          </div>
        )}
      </div>
    </div>
  )
}

function SectionInput({ value, onChange }) {
  const [mode, setMode] = useState(() => KNOWN_SECTIONS[value] ? 'known' : 'custom')
  const [customVal, setCustomVal] = useState(mode === 'custom' ? value : '')

  const handleKnown = (key) => {
    setMode('known')
    onChange(key)
  }
  const handleCustom = (val) => {
    setCustomVal(val)
    onChange(val)
  }

  const SUGGESTIONS = [
    { group: 'Bannières de pages', keys: ['hero', 'about', 'nos-filiales', 'nos-metiers', 'actualites', 'governance', 'careers', 'contact'] },
    { group: 'Sections internes – Accueil', keys: ['home-about', 'home-cta', 'home-governance'] },
    { group: 'Sections internes – Pages', keys: ['about-gallery', 'careers-ambiance'] },
    { group: 'Thématiques sectorielles', keys: ['energie', 'fintech', 'general'] },
  ]

  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        <button type="button" onClick={() => setMode('known')} className={`px-3 py-1.5 text-xs rounded-lg border font-medium transition-colors ${mode === 'known' ? 'bg-brand-600 text-white border-brand-600' : 'border-gray-300 text-gray-600 hover:border-brand-400'}`}>
          Section prédéfinie
        </button>
        <button type="button" onClick={() => { setMode('custom'); onChange(customVal) }} className={`px-3 py-1.5 text-xs rounded-lg border font-medium transition-colors ${mode === 'custom' ? 'bg-brand-600 text-white border-brand-600' : 'border-gray-300 text-gray-600 hover:border-brand-400'}`}>
          Section personnalisée
        </button>
      </div>

      {mode === 'known' ? (
        <div className="space-y-2">
          {SUGGESTIONS.map(group => (
            <div key={group.group}>
              <div className="text-xs text-gray-400 uppercase tracking-wider mb-1">{group.group}</div>
              <div className="flex flex-wrap gap-1.5">
                {group.keys.map(key => (
                  <button key={key} type="button" onClick={() => handleKnown(key)}
                    className={`px-2.5 py-1 text-xs rounded-md border transition-colors ${value === key ? 'bg-brand-600 text-white border-brand-600' : 'border-gray-200 text-gray-600 hover:border-brand-400 hover:bg-brand-50'}`}>
                    {KNOWN_SECTIONS[key]}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div>
          <input
            className="input"
            value={customVal}
            onChange={e => handleCustom(e.target.value)}
            placeholder="ex: filiale-barka-energies ou metier-energie"
          />
          <p className="text-xs text-gray-400 mt-1">
            Pour une filiale : <code className="bg-gray-100 px-1 rounded">filiale-{'{id}'}</code> ·
            Pour un métier : <code className="bg-gray-100 px-1 rounded">metier-{'{slug}'}</code>
          </p>
        </div>
      )}
    </div>
  )
}

function DropZone({ onFile, uploading }) {
  const [dragging, setDragging] = useState(false)
  const inputRef = useRef()

  const handleDrop = (e) => {
    e.preventDefault()
    setDragging(false)
    const file = e.dataTransfer.files[0]
    if (file) onFile(file)
  }

  return (
    <div
      className={`relative border-2 border-dashed rounded-xl transition-all cursor-pointer ${dragging ? 'border-brand-400 bg-brand-50' : 'border-gray-300 hover:border-brand-400 hover:bg-gray-50'} ${uploading ? 'opacity-50 pointer-events-none' : ''}`}
      onDragOver={e => { e.preventDefault(); setDragging(true) }}
      onDragLeave={() => setDragging(false)}
      onDrop={handleDrop}
      onClick={() => inputRef.current?.click()}
    >
      <div className="flex flex-col items-center justify-center py-8 px-4 text-center">
        <Upload size={28} className={`mb-2 ${dragging ? 'text-brand-500' : 'text-gray-400'}`} />
        <p className="text-sm font-medium text-gray-600">
          {uploading ? 'Upload en cours...' : 'Glisser-déposer ou cliquer pour choisir'}
        </p>
        <p className="text-xs text-gray-400 mt-1">Images et vidéos · max 200 MB</p>
      </div>
      <input ref={inputRef} type="file" accept="image/*,video/*" className="hidden" onChange={e => { if (e.target.files[0]) onFile(e.target.files[0]) }} />
    </div>
  )
}

function ImageFormModal({ initial, onSave, onClose }) {
  const isEdit = !!initial?.id
  const [form, setForm] = useState({
    section: initial?.section || 'hero',
    url: initial?.url || '',
    titre: initial?.titre || '',
    alt: initial?.alt || '',
    ordre: initial?.ordre ?? 0,
    actif: initial?.actif ?? true,
  })
  const [uploading, setUploading] = useState(false)
  const [saving, setSaving] = useState(false)

  const handleFile = async (file) => {
    setUploading(true)
    try {
      const data = await api.upload(file)
      setForm(f => ({ ...f, url: data.url }))
    } catch (err) {
      toast.error(err?.message || 'Erreur upload')
    } finally {
      setUploading(false)
    }
  }

  const handleSave = async () => {
    if (!form.url) return toast.error('Veuillez choisir une image')
    if (!form.section.trim()) return toast.error('Section requise')
    setSaving(true)
    try {
      if (isEdit) {
        await api.put(`/images/${initial.id}`, form)
        toast.success('Image mise à jour')
      } else {
        await api.post('/images', form)
        toast.success('Image ajoutée')
      }
      onSave()
    } catch (err) {
      toast.error(err.message)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xl max-h-[92vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between p-5 border-b border-gray-100 sticky top-0 bg-white z-10">
          <h3 className="font-semibold text-gray-900">{isEdit ? "Modifier l'image" : 'Ajouter une image'}</h3>
          <button onClick={onClose} className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-500"><X size={16} /></button>
        </div>

        <div className="p-5 space-y-5">
          <div>
            <label className="label">Section *</label>
            <SectionInput value={form.section} onChange={section => setForm(f => ({ ...f, section }))} />
          </div>

          <div>
            <label className="label">{isEdit ? 'Remplacer l\'image' : 'Image *'}</label>
            {form.url ? (
              <div className="space-y-2">
                <div className="relative rounded-xl overflow-hidden aspect-video bg-gray-100">
                  <img src={`${API}${form.url}`} alt="" className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => setForm(f => ({ ...f, url: '' }))}
                    className="absolute top-2 right-2 bg-black/60 text-white rounded-full p-1 hover:bg-black/80"
                  >
                    <X size={12} />
                  </button>
                </div>
                <p className="text-xs text-gray-400 font-mono truncate">{API}{form.url}</p>
              </div>
            ) : (
              <DropZone onFile={handleFile} uploading={uploading} />
            )}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="label">Titre</label>
              <input className="input" value={form.titre} onChange={e => setForm(f => ({ ...f, titre: e.target.value }))} />
            </div>
            <div>
              <label className="label">Ordre d'affichage</label>
              <input type="number" className="input" value={form.ordre} onChange={e => setForm(f => ({ ...f, ordre: Number(e.target.value) }))} />
            </div>
          </div>

          <div>
            <label className="label">Texte alternatif (SEO)</label>
            <input className="input" value={form.alt} onChange={e => setForm(f => ({ ...f, alt: e.target.value }))} />
          </div>

          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" className="w-4 h-4 accent-brand-600" checked={form.actif} onChange={e => setForm(f => ({ ...f, actif: e.target.checked }))} />
            <span className="text-sm text-gray-700">Image active (visible sur le site)</span>
          </label>
        </div>

        <div className="flex gap-3 p-5 border-t border-gray-100 sticky bottom-0 bg-white">
          <button onClick={handleSave} disabled={saving || uploading} className="btn-primary flex-1">
            {saving ? 'Enregistrement...' : isEdit ? 'Mettre à jour' : 'Ajouter'}
          </button>
          <button onClick={onClose} className="btn-secondary">Annuler</button>
        </div>
      </div>
    </div>
  )
}

export default function Images() {
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeSection, setActiveSection] = useState('all')
  const [modal, setModal] = useState(null)
  const [lightbox, setLightbox] = useState(null)

  const load = () => {
    setLoading(true)
    api.get('/images').then(setImages).catch(() => toast.error('Erreur chargement')).finally(() => setLoading(false))
  }

  useEffect(() => { load() }, [])

  const handleToggle = async (image) => {
    try {
      await api.put(`/images/${image.id}`, { actif: !image.actif })
      setImages(imgs => imgs.map(i => i.id === image.id ? { ...i, actif: !i.actif } : i))
    } catch { toast.error('Erreur') }
  }

  const handleDelete = async (id) => {
    if (!confirm('Supprimer cette image ?')) return
    try {
      await api.delete(`/images/${id}`)
      setImages(imgs => imgs.filter(i => i.id !== id))
      toast.success('Image supprimée')
    } catch { toast.error('Erreur') }
  }

  // Sections dynamiques : sections connues dans l'ordre + sections personnalisées trouvées en base
  const allSectionKeys = [...new Set(images.map(i => i.section))]
  const knownOrder = Object.keys(KNOWN_SECTIONS)
  const sortedSections = [
    ...knownOrder.filter(k => allSectionKeys.includes(k)),
    ...allSectionKeys.filter(k => !knownOrder.includes(k)).sort(),
  ]

  const filtered = activeSection === 'all' ? images : images.filter(i => i.section === activeSection)

  // Grouper par section pour la vue "Toutes"
  const grouped = sortedSections.reduce((acc, s) => {
    acc[s] = images.filter(i => i.section === s)
    return acc
  }, {})

  return (
    <div>
      <PageHeader
        title="Médiathèque"
        subtitle={`${images.length} image${images.length > 1 ? 's' : ''} · ${sortedSections.length} section${sortedSections.length > 1 ? 's' : ''}`}
        action={{ label: 'Ajouter une image', onClick: () => setModal({ image: null }) }}
      />

      {/* Onglets de section dynamiques */}
      <div className="flex gap-1.5 flex-wrap mb-6">
        <button
          onClick={() => setActiveSection('all')}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${activeSection === 'all' ? 'bg-brand-600 text-white' : 'bg-white text-gray-600 border border-gray-200 hover:border-brand-300'}`}
        >
          Toutes ({images.length})
        </button>
        {sortedSections.map(key => {
          const count = images.filter(i => i.section === key).length
          return (
            <button
              key={key}
              onClick={() => setActiveSection(key)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${activeSection === key ? 'bg-brand-600 text-white' : 'bg-white text-gray-600 border border-gray-200 hover:border-brand-300'}`}
            >
              {sectionLabel(key)} ({count})
            </button>
          )
        })}
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="animate-spin w-8 h-8 border-4 border-brand-500 border-t-transparent rounded-full" />
        </div>
      ) : activeSection === 'all' ? (
        sortedSections.map(key => {
          const imgs = grouped[key]
          if (!imgs?.length) return null
          return (
            <div key={key} className="mb-10">
              <div className="flex items-center gap-3 mb-3">
                <h3 className="text-sm font-semibold text-gray-700">{sectionLabel(key)}</h3>
                <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full font-mono">{key}</span>
                <span className="text-xs text-gray-400">{imgs.length} image{imgs.length > 1 ? 's' : ''}</span>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {imgs.map(img => (
                  <ImageCard key={img.id} image={img} onToggle={handleToggle} onDelete={handleDelete} onEdit={img => setModal({ image: img })} onPreview={setLightbox} />
                ))}
              </div>
            </div>
          )
        })
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map(img => (
            <ImageCard key={img.id} image={img} onToggle={handleToggle} onDelete={handleDelete} onEdit={img => setModal({ image: img })} onPreview={setLightbox} />
          ))}
          {!filtered.length && (
            <div className="col-span-4 py-16 text-center text-gray-400">
              <p className="text-base mb-2">Aucune image pour cette section.</p>
              <button onClick={() => setModal({ image: null })} className="btn-primary text-sm mt-2">
                <Plus size={14} /> Ajouter la première image
              </button>
            </div>
          )}
        </div>
      )}

      {modal !== null && (
        <ImageFormModal
          initial={modal.image}
          onSave={() => { setModal(null); load() }}
          onClose={() => setModal(null)}
        />
      )}

      {lightbox && <Lightbox image={lightbox} onClose={() => setLightbox(null)} />}
    </div>
  )
}
