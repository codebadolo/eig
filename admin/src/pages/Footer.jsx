import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Plus, Trash2, ExternalLink, Layout } from 'lucide-react'
import toast from 'react-hot-toast'
import PageHeader from '../components/PageHeader'
import BilingualField from '../components/BilingualField'
import { api } from '../lib/api'

const DEFAULT_COLS = [
  {
    title: 'Le Groupe', title_en: 'The Group',
    links: [
      { label: 'Qui sommes-nous', label_en: 'Who we are',   href: '/le-groupe' },
      { label: 'Notre vision',    label_en: 'Our vision',    href: '/le-groupe' },
      { label: 'Notre histoire',  label_en: 'Our history',   href: '/le-groupe' },
      { label: 'Gouvernance',     label_en: 'Governance',    href: '/gouvernance' },
    ],
  },
  {
    title: 'Activités', title_en: 'Activities',
    links: [
      { label: 'Nos métiers',         label_en: 'Our businesses',   href: '/nos-metiers' },
      { label: 'Nos filiales',        label_en: 'Our subsidiaries', href: '/nos-filiales' },
      { label: 'Services financiers', label_en: 'Financial services', href: '/nos-metiers/services-financiers' },
      { label: 'Assurance',           label_en: 'Insurance',        href: '/nos-metiers/assurance' },
      { label: 'Technologies & Fintech', label_en: 'Technologies & Fintech', href: '/nos-metiers/technologies-fintech' },
    ],
  },
  {
    title: 'Informations', title_en: 'Information',
    links: [
      { label: 'Actualités',      label_en: 'News',              href: '/actualites' },
      { label: 'Carrières',       label_en: 'Careers',           href: '/carrieres' },
      { label: 'Contact',         label_en: 'Contact',           href: '/contact' },
      { label: 'Relations presse',label_en: 'Press relations',   href: '/contact' },
      { label: 'Partenariats',    label_en: 'Partnerships',      href: '/contact' },
    ],
  },
]

const FR_BADGE = <span className="text-[10px] font-bold tracking-widest uppercase text-indigo-600 bg-indigo-50 border border-indigo-100 px-2 py-0.5 rounded-full">FR</span>
const EN_BADGE = <span className="text-[10px] font-bold tracking-widest uppercase text-amber-600 bg-amber-50 border border-amber-100 px-2 py-0.5 rounded-full">EN</span>

function ColEditor({ col, index, onChange }) {
  const setField = (field, value) => onChange({ ...col, [field]: value })

  const updateLink = (i, field, value) => {
    const links = col.links.map((l, j) => j === i ? { ...l, [field]: value } : l)
    onChange({ ...col, links })
  }

  const addLink    = () => onChange({ ...col, links: [...col.links, { label: '', label_en: '', href: '' }] })
  const removeLink = (i) => onChange({ ...col, links: col.links.filter((_, j) => j !== i) })

  return (
    <div className="card p-5 space-y-3">
      {/* En-tête */}
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Colonne {index + 1}</span>
        <button type="button" onClick={addLink} className="btn-secondary text-xs">
          <Plus size={13} /> Lien
        </button>
      </div>

      {/* Titre bilingue */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <div className="flex items-center gap-1.5 mb-1">{FR_BADGE}<span className="text-[10px] text-gray-400">Titre</span></div>
          <input className="input" value={col.title || ''} onChange={e => setField('title', e.target.value)} placeholder={`Colonne ${index + 1}`} />
        </div>
        <div>
          <div className="flex items-center gap-1.5 mb-1">{EN_BADGE}<span className="text-[10px] text-gray-400">Title</span></div>
          <input className="input" value={col.title_en || ''} onChange={e => setField('title_en', e.target.value)} placeholder={`Column ${index + 1}`} />
        </div>
      </div>

      {/* Liens */}
      <div className="space-y-2">
        {col.links.map((link, i) => (
          <div key={i} className="border border-gray-100 rounded-lg p-3 space-y-2">
            <div className="grid grid-cols-2 gap-2">
              <div>
                <div className="flex items-center gap-1.5 mb-1">{FR_BADGE}</div>
                <input className="input" placeholder="Libellé" value={link.label || ''} onChange={e => updateLink(i, 'label', e.target.value)} />
              </div>
              <div>
                <div className="flex items-center gap-1.5 mb-1">{EN_BADGE}</div>
                <input className="input" placeholder="Label" value={link.label_en || ''} onChange={e => updateLink(i, 'label_en', e.target.value)} />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <input
                className="input flex-1"
                placeholder="/page ou https://..."
                value={link.href || ''}
                onChange={e => updateLink(i, 'href', e.target.value)}
              />
              <button type="button" onClick={() => removeLink(i)} className="p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg flex-shrink-0">
                <Trash2 size={13} />
              </button>
            </div>
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
  const [saving, setSaving]   = useState(false)
  const [loading, setLoading] = useState(true)
  const [cols, setCols]       = useState(DEFAULT_COLS)
  const { register, handleSubmit, reset } = useForm()

  useEffect(() => {
    api.get('/company').then(data => {
      reset({
        footerTagline:         data.footerTagline         || data.tagline    || '',
        footerTagline_en:      data.footerTagline_en      || data.tagline_en || '',
        footerDesc:            data.footerDesc            || '',
        footerDesc_en:         data.footerDesc_en         || '',
        linkedin:              data.linkedin              || '',
        facebook:              data.facebook              || '',
        twitter:               data.twitter               || '',
        instagram:             data.instagram             || '',
        youtube:               data.youtube               || '',
        whatsapp:              data.whatsapp              || '',
        footerCopyright:       data.footerCopyright       || '',
        footerCopyright_en:    data.footerCopyright_en    || '',
        footerMentions:        data.footerMentions        || '',
        footerConfidentialite: data.footerConfidentialite || '',
        footerCookies:         data.footerCookies         || '',
      })
      if (data.footerCols?.length === 3) setCols(data.footerCols)
    }).catch(() => toast.error('Données non chargées')).finally(() => setLoading(false))
  }, [reset])

  const onSubmit = async (data) => {
    setSaving(true)
    try {
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
      <PageHeader title="Pied de page" subtitle="Gérez le contenu du footer affiché sur le site" />

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

        {/* Texte de présence */}
        <div className="card p-6 space-y-4">
          <h2 className="font-semibold text-gray-900">Texte de présence</h2>
          <p className="text-xs text-gray-400">Affiché sous le logo dans la colonne de gauche du footer.</p>
          <BilingualField
            label="Tagline"
            name="footerTagline"
            register={register}
            placeholder="Investir autrement"
            placeholder_en="Investing differently"
          />
          <BilingualField
            label="Description"
            name="footerDesc"
            register={register}
            type="textarea"
            rows={3}
            placeholder="Courte description du groupe visible dans le footer…"
            placeholder_en="Short description of the group visible in the footer..."
          />
        </div>

        {/* Réseaux sociaux */}
        <div className="card p-6 space-y-4">
          <h2 className="font-semibold text-gray-900">Réseaux sociaux</h2>
          <p className="text-xs text-gray-400">Seuls les liens renseignés apparaissent. Laissez vide pour masquer.</p>
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
            Les 3 colonnes de liens affichées à droite du footer. Chaque titre et libellé est saisi en FR et EN.
            Utilisez <code>/page</code> pour les liens internes ou une URL complète pour les liens externes.
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
          <BilingualField
            label="Texte du copyright"
            name="footerCopyright"
            register={register}
            placeholder="Excellis Invest Group"
            placeholder_en="Excellis Invest Group"
            hint={`Affiché sous la forme : © ${new Date().getFullYear()} [votre texte] — Écrivez tout ce que vous voulez, ex : "jofé°. Tous droits réservés." Si vide, utilise le nom du groupe.`}
          />
          <div className="grid grid-cols-1 gap-3">
            <div>
              <label className="label">Lien — Mentions légales</label>
              <input className="input" placeholder="/mentions-legales" {...register('footerMentions')} />
            </div>
            <div>
              <label className="label">Lien — Politique de confidentialité</label>
              <input className="input" placeholder="/confidentialite" {...register('footerConfidentialite')} />
            </div>
            <div>
              <label className="label">Lien — Cookies</label>
              <input className="input" placeholder="/cookies" {...register('footerCookies')} />
            </div>
          </div>
        </div>

        {/* Aperçu rapide */}
        <div className="card p-5 bg-gray-50 border-dashed">
          <div className="flex items-center gap-2 mb-3">
            <ExternalLink size={13} className="text-gray-400" />
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Aperçu des colonnes (FR)</span>
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
