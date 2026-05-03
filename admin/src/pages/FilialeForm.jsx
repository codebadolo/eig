import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { api } from '../lib/api'
import toast from 'react-hot-toast'
import PageHeader from '../components/PageHeader'
import ImageUpload from '../components/ImageUpload'

const SECTEURS = [
  'Services Financiers','Gestion de Créances','Énergie',"Production d'Énergie",
  'Hôtellerie & Restauration','Assurance Non-Vie','Assurance Vie',
  'Marchés Financiers',"Gestion d'Actifs",'Immobilier & Capital-Risque',
  'Technologies & Fintech','Industrie & Arts Graphiques','Commerce & Fournitures',
  'Transport & Logistique Minière',
]

const SECTEURS_SLUGS = {
  'Services Financiers': 'services-financiers',
  'Gestion de Créances': 'services-financiers',
  'Énergie': 'energie',
  "Production d'Énergie": 'energie',
  'Hôtellerie & Restauration': 'hotellerie',
  'Assurance Non-Vie': 'assurance',
  'Assurance Vie': 'assurance',
  'Marchés Financiers': 'marches-financiers',
  "Gestion d'Actifs": 'marches-financiers',
  'Immobilier & Capital-Risque': 'immobilier-capital',
  'Technologies & Fintech': 'technologies-fintech',
  'Industrie & Arts Graphiques': 'industrie',
  'Commerce & Fournitures': 'commerce',
  'Transport & Logistique Minière': 'logistique-miniere',
}

export default function FilialeForm() {
  const { id } = useParams()
  const navigate = useNavigate()
  const isEdit = !!id
  const [logo, setLogo] = useState('')
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
      }).catch(() => toast.error('Filiale non trouvée'))
    }
  }, [id, isEdit, reset])

  const onSubmit = async (data) => {
    setSaving(true)
    try {
      const payload = { ...data, logo, actif: data.actif !== false && data.actif !== 'false', ordre: Number(data.ordre) || 0 }
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
      <form onSubmit={handleSubmit(onSubmit)} className="card p-6 space-y-5">
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

        <div>
          <label className="label">Description *</label>
          <textarea className="input min-h-[80px]" rows={3} {...register('description', { required: true })} />
        </div>

        <ImageUpload value={logo} onChange={setLogo} label="Logo" />

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
