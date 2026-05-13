import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { api } from '../lib/api'
import toast from 'react-hot-toast'
import PageHeader from '../components/PageHeader'
import ImageUpload from '../components/ImageUpload'

const SECTEURS = [
  'Services Financiers','Gestion de Créances',
  'Énergies et distribution',
  'Hôtellerie & Restauration','Assurance Non-Vie','Assurance Vie',
  'Marchés Financiers',"Gestion d'Actifs",'Immobilier',
  'Technologies & Fintech','Industries et Agribusiness','Commerce & Fournitures',
  'Transport et logistiques minières et industrielles',
]

const SECTEURS_SLUGS = {
  'Services Financiers': 'services-financiers',
  'Gestion de Créances': 'services-financiers',
  'Énergies et distribution': 'energie',
  'Hôtellerie & Restauration': 'hotellerie',
  'Assurance Non-Vie': 'assurance',
  'Assurance Vie': 'assurance',
  'Marchés Financiers': 'marches-financiers',
  "Gestion d'Actifs": 'marches-financiers',
  'Immobilier': 'immobilier-capital',
  'Technologies & Fintech': 'technologies-fintech',
  'Industries et Agribusiness': 'industrie',
  'Commerce & Fournitures': 'commerce',
  'Transport et logistiques minières et industrielles': 'logistique-miniere',
}

function Section({ title, children }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <span className="text-xs font-bold tracking-widest uppercase text-gray-400">{title}</span>
        <div className="flex-1 h-px bg-gray-100" />
      </div>
      {children}
    </div>
  )
}

export default function FilialeForm() {
  const { id } = useParams()
  const navigate = useNavigate()
  const isEdit = !!id
  const [logo, setLogo] = useState('')
  const [image, setImage] = useState('')
  const [saving, setSaving] = useState(false)

  const { register, handleSubmit, reset, setValue, watch, formState: { errors } } = useForm()
  const secteur = watch('secteur')

  useEffect(() => {
    if (secteur && SECTEURS_SLUGS[secteur]) {
      setValue('secteurSlug', SECTEURS_SLUGS[secteur])
    }
  }, [secteur, setValue])

  useEffect(() => {
    if (isEdit) {
      api.get(`/filiales/${id}`).then((f) => {
        reset(f)
        setLogo(f.logo || '')
        setImage(f.image || '')
      }).catch(() => toast.error('Filiale non trouvée'))
    }
  }, [id, isEdit, reset])

  const onSubmit = async (data) => {
    setSaving(true)
    try {
      const payload = {
        ...data,
        logo,
        image,
        actif: data.actif !== false && data.actif !== 'false',
        ordre: Number(data.ordre) || 0,
      }
      if (isEdit) {
        await api.put(`/filiales/${id}`, payload)
        toast.success('Filiale mise à jour')
      } else {
        await api.post('/filiales', payload)
        toast.success('Filiale créée')
      }
      navigate('/filiales')
    } catch (err) {
      toast.error(err.message)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="max-w-2xl">
      <PageHeader
        title={isEdit ? 'Modifier la filiale' : 'Nouvelle filiale'}
        backTo="/filiales"
      />
      <form onSubmit={handleSubmit(onSubmit)} className="card p-6 space-y-8">

        {/* ── Identification ── */}
        <Section title="Identification">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label">ID (slug unique) *</label>
              <input className="input" placeholder="ex: coris-bourse" {...register('id', { required: true })} disabled={isEdit} />
            </div>
            <div>
              <label className="label">Sigle *</label>
              <input className="input" placeholder="CB" {...register('sigle', { required: true })} />
            </div>
          </div>

          <div>
            <label className="label">Nom complet *</label>
            <input className="input" placeholder="Coris Bourse" {...register('nom', { required: true })} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label">Secteur *</label>
              <select className="input" {...register('secteur', { required: true })}>
                <option value="">— Choisir —</option>
                {SECTEURS.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label className="label">Secteur slug *</label>
              <input className="input" placeholder="marches-financiers" {...register('secteurSlug', { required: true })} />
            </div>
          </div>

          <div>
            <label className="label">Pays *</label>
            <select className="input" {...register('pays', { required: true })}>
              <option value="">— Choisir —</option>
              <option value="Burkina Faso">Burkina Faso</option>
              <option value="Côte d'Ivoire">Côte d'Ivoire</option>
            </select>
          </div>
        </Section>

        {/* ── Description & Mission ── */}
        <Section title="Description & Mission">
          <div>
            <label className="label">Description (Français) *</label>
            <textarea className="input min-h-[100px]" rows={4} {...register('description', { required: true })} />
          </div>

          <div>
            <label className="label">Description (English)</label>
            <textarea className="input min-h-[100px]" rows={4} {...register('description_en')}
              placeholder="English description of the subsidiary..." />
          </div>

          <div>
            <label className="label">Mission (Français)</label>
            <textarea className="input" rows={3} placeholder="Notre mission est de…"
              {...register('mission')} />
          </div>

          <div>
            <label className="label">Mission (English)</label>
            <textarea className="input" rows={3} placeholder="Our mission is to…"
              {...register('mission_en')} />
          </div>

          <div>
            <label className="label">Vision</label>
            <textarea className="input" rows={2} placeholder="Notre vision à l'horizon…"
              {...register('vision')} />
          </div>

          <div>
            <label className="label">Valeurs</label>
            <textarea className="input" rows={2} placeholder="Confiance · Réactivité · Excellence"
              {...register('valeurs')} />
            <p className="text-xs text-gray-400 mt-1">Séparer les valeurs par · ou une virgule</p>
          </div>

          <div>
            <label className="label">Informations complémentaires</label>
            <textarea className="input min-h-[80px]" rows={3} placeholder="Prix, certifications, FCP disponibles…"
              {...register('commentaires')} />
          </div>
        </Section>

        {/* ── Contact ── */}
        <Section title="Contact">
          <div>
            <label className="label">Site web / Plateforme</label>
            <input className="input" type="url" placeholder="https://www.exemple.com" {...register('website')} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label">Téléphone</label>
              <input className="input" type="tel" placeholder="+226 25 XX XX XX" {...register('telephone')} />
            </div>
            <div>
              <label className="label">Email de contact</label>
              <input className="input" type="email" placeholder="contact@filiale.com" {...register('email_contact')} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label">Ville</label>
              <input className="input" placeholder="Ouagadougou" {...register('ville')} />
            </div>
            <div>
              <label className="label">Adresse</label>
              <input className="input" placeholder="Avenue de la Nation, Secteur 1" {...register('adresse')} />
            </div>
          </div>
        </Section>

        {/* ── Réseaux sociaux ── */}
        <Section title="Réseaux sociaux">
          <p className="text-xs text-gray-400 -mt-2">URLs complètes (https://...). Laisser vide si non applicable.</p>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label flex items-center gap-2">
                <span style={{ color: '#0a66c2' }}>in</span> LinkedIn
              </label>
              <input className="input" type="url" placeholder="https://linkedin.com/company/..." {...register('linkedin')} />
            </div>
            <div>
              <label className="label flex items-center gap-2">
                <span style={{ color: '#1877f2' }}>f</span> Facebook
              </label>
              <input className="input" type="url" placeholder="https://facebook.com/..." {...register('facebook')} />
            </div>
            <div>
              <label className="label flex items-center gap-2">
                <span style={{ color: '#000' }}>𝕏</span> Twitter / X
              </label>
              <input className="input" type="url" placeholder="https://x.com/..." {...register('twitter')} />
            </div>
            <div>
              <label className="label flex items-center gap-2">
                <span style={{ color: '#e1306c' }}>◈</span> Instagram
              </label>
              <input className="input" type="url" placeholder="https://instagram.com/..." {...register('instagram')} />
            </div>
            <div>
              <label className="label flex items-center gap-2">
                <span style={{ color: '#ff0000' }}>▶</span> YouTube
              </label>
              <input className="input" type="url" placeholder="https://youtube.com/@..." {...register('youtube')} />
            </div>
            <div>
              <label className="label flex items-center gap-2">
                <span style={{ color: '#000' }}>♪</span> TikTok
              </label>
              <input className="input" type="url" placeholder="https://tiktok.com/@..." {...register('tiktok')} />
            </div>
            <div>
              <label className="label flex items-center gap-2">
                <span style={{ color: '#25d366' }}>✆</span> WhatsApp
              </label>
              <input className="input" placeholder="+22600000000 (numéro avec +)" {...register('whatsapp')} />
              <p className="text-xs text-gray-400 mt-0.5">Numéro avec indicatif, ex: +22601020304</p>
            </div>
          </div>
        </Section>

        {/* ── Médias ── */}
        <Section title="Médias">
          <ImageUpload value={logo} onChange={setLogo} label="Logo" />
          <ImageUpload value={image} onChange={setImage} label="Image de couverture" />
        </Section>

        {/* ── Paramètres ── */}
        <Section title="Paramètres">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label">Ordre d'affichage</label>
              <input type="number" className="input" defaultValue={0} {...register('ordre')} />
            </div>
            <div className="flex items-end pb-1">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded accent-brand-600" defaultChecked {...register('actif')} />
                <span className="text-sm font-medium text-gray-700">Filiale active</span>
              </label>
            </div>
          </div>
        </Section>

        <div className="flex gap-3 pt-2">
          <button type="submit" disabled={saving} className="btn-primary">
            {saving ? 'Enregistrement...' : isEdit ? 'Mettre à jour' : 'Créer la filiale'}
          </button>
          <button type="button" onClick={() => navigate('/filiales')} className="btn-secondary">Annuler</button>
        </div>
      </form>
    </div>
  )
}
