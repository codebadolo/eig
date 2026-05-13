import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import ImageUpload from '../components/ImageUpload'
import PageHeader from '../components/PageHeader'
import { api } from '../lib/api'

function MotCard({ title, subtitle, photoState, onPhotoChange, nameField, titreField, messageField, register }) {
  return (
    <div className="card p-6 space-y-5">
      <div>
        <h2 className="font-semibold text-gray-900">{title}</h2>
        <p className="text-xs text-gray-400 mt-0.5">{subtitle}</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="label">Nom complet</label>
          <input className="input" placeholder="Prénom Nom" {...register(nameField)} />
        </div>
        <div>
          <label className="label">Titre / Fonction</label>
          <input className="input" placeholder="Président du Conseil d'Administration" {...register(titreField)} />
        </div>
      </div>

      <div>
        <label className="label">Message</label>
        <textarea
          className="input min-h-[160px]"
          rows={7}
          placeholder="Saisissez ici le message affiché sur la page Gouvernance..."
          {...register(messageField)}
        />
        <p className="text-xs text-gray-400 mt-1">Ce texte apparaît en italique, encadré d'un trait doré, à côté de la photo.</p>
      </div>

      <ImageUpload
        value={photoState}
        onChange={onPhotoChange}
        label="Photo (portrait recommandé — format 3:4)"
      />
    </div>
  )
}

export default function MotDirection() {
  const [saving, setSaving] = useState(false)
  const [loading, setLoading] = useState(true)
  const [photoPresident, setPhotoPresident] = useState('')
  const [photoDg, setPhotoDg] = useState('')
  const { register, handleSubmit, reset } = useForm()

  useEffect(() => {
    api.get('/company').then(data => {
      reset(data)
      setPhotoPresident(data.photo_president || '')
      setPhotoDg(data.photo_dg || '')
    }).catch(() => toast.error('Impossible de charger les données')).finally(() => setLoading(false))
  }, [reset])

  const onSubmit = async (data) => {
    setSaving(true)
    try {
      await api.put('/company', {
        ...data,
        photo_president: photoPresident,
        photo_dg: photoDg,
      })
      toast.success('Messages enregistrés')
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
        title="Mot de la Direction"
        subtitle="Mot du Président et mot du Directeur Général — page Gouvernance"
      >
        <button form="mot-direction-form" type="submit" disabled={saving} className="btn-primary text-sm">
          {saving ? 'Enregistrement...' : 'Enregistrer'}
        </button>
      </PageHeader>

      <form id="mot-direction-form" onSubmit={handleSubmit(onSubmit)} className="space-y-6">

        <div className="rounded-lg px-4 py-3 text-sm" style={{ background: 'rgba(184,146,42,0.08)', border: '1px solid rgba(184,146,42,0.25)', color: '#8a6a1a' }}>
          Sur la page Gouvernance : le <strong>mot du Président</strong> apparaît en premier (photo à gauche), suivi du <strong>mot du DG</strong> (photo à droite). Ces sections sont masquées si le nom et le message sont vides.
        </div>

        <MotCard
          title="Mot du Président"
          subtitle="Affiché en premier, photo à gauche, message à droite."
          photoState={photoPresident}
          onPhotoChange={setPhotoPresident}
          nameField="nom_president"
          titreField="titre_president"
          messageField="mot_president"
          register={register}
        />

        <MotCard
          title="Mot du Directeur Général"
          subtitle="Affiché juste après le mot du Président, photo à droite, message à gauche."
          photoState={photoDg}
          onPhotoChange={setPhotoDg}
          nameField="nom_dg"
          titreField="titre_dg"
          messageField="mot_dg"
          register={register}
        />

        <div className="flex gap-3 pb-6">
          <button type="submit" disabled={saving} className="btn-primary">
            {saving ? 'Enregistrement...' : 'Enregistrer les messages'}
          </button>
        </div>
      </form>
    </div>
  )
}
