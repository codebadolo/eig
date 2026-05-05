import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Plus, Trash2, ExternalLink, Layout } from 'lucide-react'
import toast from 'react-hot-toast'
import PageHeader from '../components/PageHeader'
import { api } from '../lib/api'

const DEFAULT_COLS = [
  {
    title: 'Le Groupe',
    links: [
      { label: 'Qui sommes-nous', href: '/le-groupe' },
      { label: 'Notre vision', href: '/le-groupe' },
      { label: 'Notre histoire', href: '/le-groupe' },
      { label: 'Gouvernance', href: '/gouvernance' },
    ],
  },
  {
    title: 'Activités',
    links: [
      { label: 'Nos métiers', href: '/nos-metiers' },
      { label: 'Nos filiales', href: '/nos-filiales' },
      { label: 'Services financiers', href: '/nos-metiers/services-financiers' },
      { label: 'Assurance', href: '/nos-metiers/assurance' },
      { label: 'Technologies & Fintech', href: '/nos-metiers/technologies-fintech' },
    ],
  },
  {
    title: 'Informations',
    links: [
      { label: 'Actualités', href: '/actualites' },
      { label: 'Carrières', href: '/carrieres' },
      { label: 'Contact', href: '/contact' },
      { label: 'Relations presse', href: '/contact' },
      { label: 'Partenariats', href: '/contact' },
    ],
  },
]

function ColEditor({ col, index, onChange }) {
  const updateTitle = (e) => onChange({ ...col, title: e.target.value })

  const updateLink = (i, field, value) => {
    const links = col.links.map((l, j) => j === i ? { ...l, [field]: value } : l)
    onChange({ ...col, links })
  }

  const addLink = () => onChange({ ...col, links: [...col.links, { label: '', href: '' }] })

  const removeLink = (i) => onChange({ ...col, links: col.links.filter((_, j) => j !== i) })

  return (
    <div className="card p-5 space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <label className="label mb-1">Titre de la colonne {index + 1}</label>
          <input
            className="input"
            value={col.title}
            onChange={updateTitle}
            placeholder={`Colonne ${index + 1}`}
          />
        </div>
        <button
          type="button"
          onClick={addLink}
          className="btn-secondary text-xs mt-4"
        >
          <Plus size={13} /> Lien
        </button>
      </div>

      <div className="space-y-2">
        {col.links.map((link, i) => (
          <div key={i} className="flex items-center gap-2">
            <input
              className="input flex-1"
              placeholder="Libellé"
              value={link.label}
              onChange={e => updateLink(i, 'label', e.target.value)}
            />
            <input
              className="input flex-1"
              placeholder="/page ou https://..."
              value={link.href}
              onChange={e => updateLink(i, 'href', e.target.value)}
            />
            <button
              type="button"
              onClick={() => removeLink(i)}
              className="p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg flex-shrink-0"
            >
              <Trash2 size={13} />
            </button>
          </div>
        ))}
        {col.links.length === 0 && (
          <p className="text-xs text-gray-400 italic">Aucun lien — cliquez sur « Lien » pour en ajouter.</p>
        )}
      </div>
    </div>
  )
}

export default function Footer() {
  const [saving, setSaving] = useState(false)
  const [loading, setLoading] = useState(true)
  const [cols, setCols] = useState(DEFAULT_COLS)
  const { register, handleSubmit, reset } = useForm()

  useEffect(() => {
    api.get('/company').then(data => {
      reset({
        footerTagline:        data.footerTagline        || data.tagline || '',
        footerDesc:           data.footerDesc           || '',
        linkedin:             data.linkedin             || '',
        facebook:             data.facebook             || '',
        twitter:              data.twitter              || '',
        instagram:            data.instagram            || '',
        youtube:              data.youtube              || '',
        whatsapp:             data.whatsapp             || '',
        footerCopyright:      data.footerCopyright      || '',
        footerMentions:       data.footerMentions       || '',
        footerConfidentialite:data.footerConfidentialite|| '',
        footerCookies:        data.footerCookies        || '',
      })
      if (data.footerCols && data.footerCols.length === 3) {
        setCols(data.footerCols)
      }
    }).catch(() => toast.error('Données non chargées')).finally(() => setLoading(false))
  }, [reset])

  const onSubmit = async (data) => {
    setSaving(true)
    try {
      // Merge footer fields into existing company data
      const current = await api.get('/company')
      await api.put('/company', { ...current, ...data, footerCols: cols })
      toast.success('Pied de page mis à jour')
    } catch (err) {
      toast.error(err.message)
    } finally {
      setSaving(false)
    }
  }

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className="animate-spin w-8 h-8 border-4 border-brand-500 border-t-transparent rounded-full" />
    </div>
  )

  return (
    <div className="max-w-3xl">
      <PageHeader
        title="Pied de page"
        subtitle="Gérez le contenu du footer affiché sur le site"
      />

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

        {/* Texte de présence */}
        <div className="card p-6 space-y-4">
          <h2 className="font-semibold text-gray-900">Texte de présence</h2>
          <p className="text-xs text-gray-400">Affiché sous le logo dans la colonne de gauche du footer.</p>
          <div>
            <label className="label">Tagline</label>
            <input className="input" placeholder="Investir autrement" {...register('footerTagline')} />
          </div>
          <div>
            <label className="label">Description</label>
            <textarea
              className="input"
              rows={3}
              placeholder="Courte description du groupe visible dans le footer…"
              {...register('footerDesc')}
            />
          </div>
        </div>

        {/* Réseaux sociaux */}
        <div className="card p-6 space-y-4">
          <h2 className="font-semibold text-gray-900">Réseaux sociaux</h2>
          <p className="text-xs text-gray-400">
            Seuls les liens renseignés apparaissent. Laissez vide pour masquer.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label">LinkedIn</label>
              <input type="url" className="input" placeholder="https://linkedin.com/company/..." {...register('linkedin')} />
            </div>
            <div>
              <label className="label">Facebook</label>
              <input type="url" className="input" placeholder="https://facebook.com/..." {...register('facebook')} />
            </div>
            <div>
              <label className="label">Twitter / X</label>
              <input type="url" className="input" placeholder="https://x.com/..." {...register('twitter')} />
            </div>
            <div>
              <label className="label">Instagram</label>
              <input type="url" className="input" placeholder="https://instagram.com/..." {...register('instagram')} />
            </div>
            <div>
              <label className="label">YouTube</label>
              <input type="url" className="input" placeholder="https://youtube.com/@..." {...register('youtube')} />
            </div>
            <div>
              <label className="label">WhatsApp (numéro avec +)</label>
              <input className="input" placeholder="+22601020304" {...register('whatsapp')} />
            </div>
          </div>
        </div>

        {/* Colonnes de navigation */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Layout size={15} className="text-gray-400" />
            <h2 className="font-semibold text-gray-900">Colonnes de navigation</h2>
          </div>
          <p className="text-xs text-gray-400">
            Les 3 colonnes de liens affichées à droite du footer. Utilisez <code>/page</code> pour les liens internes ou une URL complète pour les liens externes.
          </p>
          <div className="grid grid-cols-1 gap-4">
            {cols.map((col, i) => (
              <ColEditor
                key={i}
                col={col}
                index={i}
                onChange={updated => setCols(cols.map((c, j) => j === i ? updated : c))}
              />
            ))}
          </div>
        </div>

        {/* Bas de page */}
        <div className="card p-6 space-y-4">
          <h2 className="font-semibold text-gray-900">Bas de page</h2>
          <div>
            <label className="label">Texte du copyright</label>
            <input
              className="input"
              placeholder="Excellis Invest Group — Tous droits réservés"
              {...register('footerCopyright')}
            />
            <p className="text-xs text-gray-400 mt-1">L'année en cours est ajoutée automatiquement.</p>
          </div>
          <div className="grid grid-cols-1 gap-3">
            <div>
              <label className="label">Lien — Mentions légales</label>
              <input
                className="input"
                placeholder="/mentions-legales"
                {...register('footerMentions')}
              />
            </div>
            <div>
              <label className="label">Lien — Politique de confidentialité</label>
              <input
                className="input"
                placeholder="/confidentialite"
                {...register('footerConfidentialite')}
              />
            </div>
            <div>
              <label className="label">Lien — Cookies</label>
              <input
                className="input"
                placeholder="/cookies"
                {...register('footerCookies')}
              />
            </div>
          </div>
        </div>

        {/* Aperçu rapide */}
        <div className="card p-5 bg-gray-50 border-dashed">
          <div className="flex items-center gap-2 mb-3">
            <ExternalLink size={13} className="text-gray-400" />
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Aperçu des colonnes</span>
          </div>
          <div className="grid grid-cols-3 gap-6">
            {cols.map((col, i) => (
              <div key={i}>
                <div className="text-xs font-bold text-gray-700 mb-2">{col.title || `Colonne ${i + 1}`}</div>
                <ul className="space-y-1">
                  {col.links.map((l, j) => (
                    <li key={j} className="text-xs text-gray-500 flex items-center gap-1">
                      <span className="w-1 h-1 rounded-full bg-gray-300 flex-shrink-0" />
                      {l.label || <span className="italic text-gray-300">sans libellé</span>}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-3">
          <button type="submit" disabled={saving} className="btn-primary">
            {saving ? 'Enregistrement...' : 'Enregistrer'}
          </button>
        </div>
      </form>
    </div>
  )
}
