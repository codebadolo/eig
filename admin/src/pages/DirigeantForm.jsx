import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { api } from '../lib/api'
import toast from 'react-hot-toast'
import BilingualField from '../components/BilingualField'
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
    <div className="max-w-5xl">
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

          <div>
            <label className="label">Nom complet *</label>
            <input className="input" placeholder="Issouf Compaoré" {...register('nom', { required: true })} />
          </div>

          <BilingualField label="Rôle / Titre" name="role" register={register} required placeholder="Directeur Général" placeholder_en="Chief Executive Officer" />

          <div>
            <label className="label">Profil LinkedIn</label>
            <input className="input" placeholder="https://linkedin.com/in/..." {...register('linkedin')} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label">Ordre d'affichage</label>
              <input type="number" className="input" defaultValue={0} {...register('ordre')} />
            </div>
            <div>
              <label className="label">Catégorie</label>
              <select className="input" {...register('categorie')}>
                <option value="president">Président du Groupe</option>
                <option value="conseil">Conseil d'administration</option>
                <option value="dg">Directeur Général</option>
                <option value="direction">Comité de direction</option>
              </select>
            </div>
          </div>

          <ImageUpload value={photo} onChange={setPhoto} label="Photo (optionnel)" />
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
