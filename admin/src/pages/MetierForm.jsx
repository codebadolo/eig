import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { api } from '../lib/api'
import toast from 'react-hot-toast'
import PageHeader from '../components/PageHeader'
import FaIcon, { ICON_LIST } from '../components/FaIcon'
import ImageUpload from '../components/ImageUpload'

export default function MetierForm() {
  const { id } = useParams()
  const navigate = useNavigate()
  const isEdit = !!id
  const [saving, setSaving] = useState(false)
  const [filialesInput, setFilialesInput] = useState('')
  const [image, setImage] = useState('')
  const { register, handleSubmit, reset, watch } = useForm()

  useEffect(() => {
    if (isEdit) {
      api.get(`/metiers/${id}`).then((m) => {
        reset(m)
        setFilialesInput(Array.isArray(m.filialesIds) ? m.filialesIds.join(', ') : '')
        setImage(m.image || '')
      }).catch(() => toast.error('Métier non trouvé'))
    }
  }, [id, isEdit, reset])

  const onSubmit = async (data) => {
    setSaving(true)
    try {
      const filialesIds = filialesInput.split(',').map(s => s.trim()).filter(Boolean)
      const payload = { ...data, image, filialesIds, ordre: Number(data.ordre) || 0 }
      if (isEdit) {
        await api.put(`/metiers/${id}`, payload)
        toast.success('Métier mis à jour')
      } else {
        await api.post('/metiers', payload)
        toast.success('Métier créé')
      }
      navigate('/metiers')
    } catch (err) {
      toast.error(err.message)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="max-w-2xl">
      <PageHeader title={isEdit ? 'Modifier le métier' : 'Nouveau métier'} backTo="/metiers" />
      <form onSubmit={handleSubmit(onSubmit)} className="card p-6 space-y-5">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="label">Slug (URL) *</label>
            <input className="input" placeholder="services-financiers" {...register('slug', { required: true })} />
          </div>
          <div>
            <label className="label">Icône *</label>
            <div className="flex items-center gap-2">
              <select className="input flex-1" {...register('icone', { required: true })}>
                <option value="">— Choisir —</option>
                {ICON_LIST.map(name => (
                  <option key={name} value={name}>{name}</option>
                ))}
              </select>
              <div className="w-10 h-10 flex items-center justify-center border border-gray-200 rounded-lg bg-gray-50 text-gray-700">
                <FaIcon name={watch('icone')} size="lg" />
              </div>
            </div>
          </div>
        </div>

        <div>
          <label className="label">Titre *</label>
          <input className="input" {...register('titre', { required: true })} />
        </div>

        <div>
          <label className="label">Couleur CSS (gradient) *</label>
          <input className="input font-mono text-xs" placeholder="linear-gradient(135deg, #1A6B7A, #0F4855)" {...register('couleur', { required: true })} />
        </div>

        <div>
          <label className="label">Description *</label>
          <textarea className="input" rows={2} {...register('description', { required: true })} />
        </div>

        <div>
          <label className="label">Enjeux *</label>
          <textarea className="input" rows={3} {...register('enjeux', { required: true })} />
        </div>

        <div>
          <label className="label">Contribution d'EIG *</label>
          <textarea className="input" rows={3} {...register('contribution', { required: true })} />
        </div>

        <ImageUpload value={image} onChange={setImage} label="Image de couverture" />

        <div>
          <label className="label">IDs des filiales associées (séparés par des virgules)</label>
          <input
            className="input font-mono text-xs"
            placeholder="coris-bourse, coris-asset-management"
            value={filialesInput}
            onChange={e => setFilialesInput(e.target.value)}
          />
          <p className="text-xs text-gray-400 mt-1">Utilisez les IDs exacts des filiales</p>
        </div>

        <div>
          <label className="label">Ordre d'affichage</label>
          <input type="number" className="input w-24" defaultValue={0} {...register('ordre')} />
        </div>

        <div className="flex gap-3 pt-2">
          <button type="submit" disabled={saving} className="btn-primary">
            {saving ? 'Enregistrement...' : isEdit ? 'Mettre à jour' : 'Créer le métier'}
          </button>
          <button type="button" onClick={() => navigate('/metiers')} className="btn-secondary">Annuler</button>
        </div>
      </form>
    </div>
  )
}
