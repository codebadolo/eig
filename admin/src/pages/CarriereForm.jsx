import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { api } from '../lib/api'
import toast from 'react-hot-toast'
import PageHeader from '../components/PageHeader'

const TYPES = ['CDI', 'CDD', 'Stage', 'Freelance', 'Alternance']
const DEPARTEMENTS = ['Direction Générale', 'Finance', 'Juridique', 'Opérations', 'Commercial', 'Technologie', 'RH', 'Communication']

export default function CarriereForm() {
  const { id } = useParams()
  const navigate = useNavigate()
  const isEdit = !!id
  const [saving, setSaving] = useState(false)
  const { register, handleSubmit, reset } = useForm()

  useEffect(() => {
    if (isEdit) {
      api.get(`/carrieres/${id}`).then(c => { if (c) reset(c) })
    }
  }, [id, isEdit, reset])

  const onSubmit = async (data) => {
    setSaving(true)
    try {
      const payload = { ...data, actif: data.actif !== false && data.actif !== 'false' }
      if (isEdit) {
        await api.put(`/carrieres/${id}`, payload)
        toast.success('Offre mise à jour')
      } else {
        await api.post('/carrieres', payload)
        toast.success('Offre créée')
      }
      navigate('/carrieres')
    } catch (err) {
      toast.error(err.message)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="max-w-3xl">
      <PageHeader title={isEdit ? "Modifier l'offre" : "Nouvelle offre"} backTo="/carrieres">
        <button form="carriere-form" type="submit" disabled={saving} className="btn-primary text-sm">
          {saving ? 'Enregistrement...' : isEdit ? 'Mettre à jour' : "Publier l'offre"}
        </button>
      </PageHeader>

      <form id="carriere-form" onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="card p-6 space-y-5">
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-widest">Informations générales</h3>

          <div>
            <label className="label">Titre du poste *</label>
            <input className="input" placeholder="Chargé de développement commercial" {...register('titre', { required: true })} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label">Département *</label>
              <select className="input" {...register('departement', { required: true })}>
                <option value="">— Choisir —</option>
                {DEPARTEMENTS.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>
            <div>
              <label className="label">Type de contrat *</label>
              <select className="input" {...register('type', { required: true })}>
                <option value="">— Choisir —</option>
                {TYPES.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label">Lieu *</label>
              <input className="input" placeholder="Ouagadougou, Burkina Faso" {...register('lieu', { required: true })} />
            </div>
            <div>
              <label className="label">Rémunération</label>
              <input className="input" placeholder="Selon profil et expérience" {...register('salaire')} />
            </div>
          </div>

          <div>
            <label className="label">Date limite de candidature</label>
            <input className="input" placeholder="ex: Mai 2026" {...register('dateExpiration')} />
          </div>
        </div>

        <div className="card p-6 space-y-5">
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-widest">Contenu de l'offre</h3>

          <div>
            <label className="label">Description du poste *</label>
            <p className="text-xs text-gray-400 mb-1">Présentation générale du poste et du contexte de recrutement.</p>
            <textarea className="input min-h-[100px]" rows={4} {...register('description', { required: true })} />
          </div>

          <div>
            <label className="label">Missions</label>
            <p className="text-xs text-gray-400 mb-1">Une mission par ligne. Elles apparaîtront sous forme de liste à points.</p>
            <textarea className="input min-h-[140px]" rows={6} placeholder={"Analyser les états financiers\nProduire les rapports mensuels\nPiloter la consolidation..."} {...register('missions')} />
          </div>

          <div>
            <label className="label">Profil recherché</label>
            <p className="text-xs text-gray-400 mb-1">Un critère par ligne (diplôme, expérience, compétences...).</p>
            <textarea className="input min-h-[140px]" rows={6} placeholder={"Bac+5 en Finance\nMinimum 5 ans d'expérience\nMaîtrise des normes IFRS..."} {...register('profil')} />
          </div>

          <div>
            <label className="label">Avantages</label>
            <p className="text-xs text-gray-400 mb-1">Un avantage par ligne.</p>
            <textarea className="input min-h-[100px]" rows={4} placeholder={"Rémunération attractive\nAssurance maladie groupe\nFormation continue..."} {...register('avantages')} />
          </div>
        </div>

        <div className="card p-6">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" className="w-4 h-4 rounded accent-brand-600" defaultChecked {...register('actif')} />
            <span className="text-sm font-medium text-gray-700">Offre active (visible sur le site)</span>
          </label>
        </div>

        <div className="flex gap-3">
          <button type="submit" disabled={saving} className="btn-primary">
            {saving ? 'Enregistrement...' : isEdit ? 'Mettre à jour' : "Publier l'offre"}
          </button>
          <button type="button" onClick={() => navigate('/carrieres')} className="btn-secondary">Annuler</button>
        </div>
      </form>
    </div>
  )
}
