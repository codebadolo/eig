import { Plus, Trash2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { ICON_LIST } from '../components/FaIcon'
import ImageUpload from '../components/ImageUpload'
import PageHeader from '../components/PageHeader'
import { api } from '../lib/api'

export default function Company() {
  const [saving, setSaving] = useState(false)
  const [loading, setLoading] = useState(true)
  const [imageGroupe, setImageGroupe] = useState('')
  const { register, handleSubmit, reset, control } = useForm()

  const { fields: kpiFields, append: addKpi, remove: removeKpi } = useFieldArray({ control, name: 'kpis' })
  const { fields: valeurFields, append: addValeur, remove: removeValeur } = useFieldArray({ control, name: 'valeurs' })

  useEffect(() => {
    api.get('/company').then(data => {
      reset(data)
      setImageGroupe(data.imageGroupe || '')
    }).catch(() => toast.error('Données non trouvées')).finally(() => setLoading(false))
  }, [reset])

  
  const onSubmit = async (data) => {
    setSaving(true)
    try {
      await api.put('/company', { ...data, imageGroupe })
      toast.success('Informations mises à jour')
    } catch (err) {
      toast.error(err.message)
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <div className="flex items-center justify-center h-64"><div className="animate-spin w-8 h-8 border-4 border-brand-500 border-t-transparent rounded-full" /></div>

  return (
    <div className="max-w-3xl">
      <PageHeader title="Le Groupe" subtitle="Informations institutionnelles" />
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

        <div className="card p-6 space-y-4">
          <h2 className="font-semibold text-gray-900">Identité</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label">Nom du Groupe</label>
              <input className="input" {...register('nom')} />
            </div>
            <div>
              <label className="label">Tagline</label>
              <input className="input" {...register('tagline')} />
            </div>
          </div>
          <div>
            <label className="label">Description courte</label>
            <textarea className="input" rows={2} {...register('descriptionCourte')} />
          </div>
          <div>
            <label className="label">Description complète</label>
            <textarea className="input" rows={4} {...register('description')} />
          </div>
          <div>
            <label className="label">Mission</label>
            <textarea className="input" rows={3} {...register('mission')} />
          </div>
          <div>
            <label className="label">Vision</label>
            <textarea className="input" rows={3} {...register('vision')} />
          </div>
          <ImageUpload
            value={imageGroupe}
            onChange={setImageGroupe}
            label="Image de la section « Le Groupe » (page d'accueil)"
          />
        </div>

        <div className="card p-6 space-y-4">
          <h2 className="font-semibold text-gray-900">Contact</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label">Adresse</label>
              <input className="input" {...register('adresse')} />
            </div>
            <div>
              <label className="label">Email</label>
              <input type="email" className="input" {...register('email')} />
            </div>
            <div>
              <label className="label">Téléphone</label>
              <input className="input" {...register('telephone')} />
            </div>
            <div>
              <label className="label">WhatsApp (numéro sans +)</label>
              <input className="input" {...register('whatsapp')} />
            </div>
          </div>
        </div>

        <div className="card p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-gray-900">KPIs</h2>
            <button type="button" onClick={() => addKpi({ num: '', unite: '', label: '' })} className="btn-secondary text-xs">
              <Plus size={14} /> Ajouter
            </button>
          </div>
          <div className="space-y-2">
            {kpiFields.map((f, i) => (
              <div key={f.id} className="flex items-center gap-2">
                <input className="input w-20" placeholder="20" {...register(`kpis.${i}.num`)} />
                <input className="input w-16" placeholder="Mds" {...register(`kpis.${i}.unite`)} />
                <input className="input flex-1" placeholder="FCFA de capital social" {...register(`kpis.${i}.label`)} />
                <button type="button" onClick={() => removeKpi(i)} className="p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg">
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="card p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-gray-900">Valeurs</h2>
            <button type="button" onClick={() => addValeur({ titre: '', icone: '', description: '' })} className="btn-secondary text-xs">
              <Plus size={14} /> Ajouter
            </button>
          </div>
          <div className="space-y-3">
            {valeurFields.map((f, i) => (
              <div key={f.id} className="flex items-start gap-2">
                <select className="input w-40" {...register(`valeurs.${i}.icone`)}>
                  <option value="">— icône —</option>
                  {ICON_LIST.map(name => (
                    <option key={name} value={name}>{name}</option>
                  ))}
                </select>
                <input className="input w-32" placeholder="Rigueur" {...register(`valeurs.${i}.titre`)} />
                <input className="input flex-1" placeholder="Description..." {...register(`valeurs.${i}.description`)} />
                <button type="button" onClick={() => removeValeur(i)} className="p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg mt-1">
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-3">
          <button type="submit" disabled={saving} className="btn-primary">
            {saving ? 'Enregistrement...' : 'Enregistrer les modifications'}
          </button>
        </div>
      </form>
    </div>
  )
}
