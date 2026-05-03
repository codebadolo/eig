import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { api } from '../lib/api'
import toast from 'react-hot-toast'
import PageHeader from '../components/PageHeader'
import ImageUpload from '../components/ImageUpload'

export default function DirigeantForm() {
  const { id } = useParams()
  const navigate = useNavigate()
  const isEdit = !!id
  const [photo, setPhoto] = useState('')
  const [saving, setSaving] = useState(false)
  const { register, handleSubmit, reset } = useForm()

  useEffect(() => {
    if (isEdit) {
      api.get(`/dirigeants/${id}`).then(d => {
        if (d) { reset(d); setPhoto(d.photo || '') }
      })
    }
  }, [id, isEdit, reset])

  const onSubmit = async (data) => {
    setSaving(true)
    try {
      const payload = { ...data, photo: photo || null, ordre: Number(data.ordre) || 0, actif: data.actif !== false }
      if (isEdit) {
        await api.put(`/dirigeants/${id}`, payload)
        toast.success('Dirigeant mis à jour')
      } else {
        await api.post('/dirigeants', payload)
        toast.success('Dirigeant créé')
      }
      navigate('/dirigeants')
    } catch (err) {
      toast.error(err.message)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="max-w-3xl">
      <PageHeader title={isEdit ? 'Modifier le dirigeant' : 'Nouveau dirigeant'} backTo="/dirigeants">
        <button form="dirigeant-form" type="submit" disabled={saving} className="btn-primary text-sm">
          {saving ? 'Enregistrement...' : isEdit ? 'Mettre à jour' : 'Créer'}
        </button>
      </PageHeader>

      <form id="dirigeant-form" onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="card p-6 space-y-5">
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-widest">Identité</h3>

          <div>
            <label className="label">ID (slug unique) *</label>
            <input className="input" placeholder="dg" {...register('id', { required: true })} disabled={isEdit} />
            <p className="text-xs text-gray-400 mt-1">Identifiant unique non modifiable après création (ex: dg, daf, djuridique)</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label">Nom complet *</label>
              <input className="input" placeholder="Issouf Compaoré" {...register('nom', { required: true })} />
            </div>
            <div>
              <label className="label">Rôle / Titre *</label>
              <input className="input" placeholder="Directeur Général" {...register('role', { required: true })} />
            </div>
          </div>

          <div>
            <label className="label">Profil LinkedIn</label>
            <input className="input" placeholder="https://linkedin.com/in/..." {...register('linkedin')} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label">Ordre d'affichage</label>
              <input type="number" className="input" defaultValue={0} {...register('ordre')} />
            </div>
          </div>

          <ImageUpload value={photo} onChange={setPhoto} label="Photo (optionnel)" />
        </div>

        <div className="card p-6 space-y-5">
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-widest">Biographie & Expertise</h3>

          <div>
            <label className="label">Biographie *</label>
            <p className="text-xs text-gray-400 mb-1">Présentation générale (paragraphe).</p>
            <textarea className="input min-h-[120px]" rows={5} {...register('bio', { required: true })} />
          </div>

          <div>
            <label className="label">Domaines d'expertise</label>
            <p className="text-xs text-gray-400 mb-1">Un domaine par ligne. Apparaîtront sous forme de tags.</p>
            <textarea className="input min-h-[100px]" rows={4} placeholder={"Stratégie d'investissement\nFinance d'entreprise\nGouvernance de holdings..."} {...register('expertise')} />
          </div>
        </div>

        <div className="card p-6 space-y-5">
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-widest">Parcours</h3>

          <div>
            <label className="label">Expériences professionnelles</label>
            <p className="text-xs text-gray-400 mb-1">Une expérience par ligne, format : <code className="bg-gray-100 px-1 rounded">Titre – Organisation, Ville (Année – Année)</code></p>
            <textarea className="input min-h-[120px]" rows={5} placeholder={"Directeur Général – Excellis Invest Group, Ouagadougou (2018 – présent)\nDirecteur des Investissements – Coris Bank International (2012 – 2018)..."} {...register('experiences')} />
          </div>

          <div>
            <label className="label">Formation académique</label>
            <p className="text-xs text-gray-400 mb-1">Un diplôme par ligne, format : <code className="bg-gray-100 px-1 rounded">Diplôme – Institution (Année)</code></p>
            <textarea className="input min-h-[100px]" rows={4} placeholder={"MBA Finance & Stratégie – HEC Paris (2002)\nMaster 2 Économie Internationale – Université Paris I (2000)..."} {...register('formation')} />
          </div>
        </div>

        <div className="flex gap-3">
          <button type="submit" disabled={saving} className="btn-primary">
            {saving ? 'Enregistrement...' : isEdit ? 'Mettre à jour' : 'Créer'}
          </button>
          <button type="button" onClick={() => navigate('/dirigeants')} className="btn-secondary">Annuler</button>
        </div>
      </form>
    </div>
  )
}
