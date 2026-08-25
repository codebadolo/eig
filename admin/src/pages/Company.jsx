import { Plus, Trash2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import BilingualField from '../components/BilingualField'
import { ICON_LIST } from '../components/FaIcon'
import ImageUpload from '../components/ImageUpload'
import PageHeader from '../components/PageHeader'
import { api } from '../lib/api'

export default function Company() {
  const [saving, setSaving] = useState(false)
  const [loading, setLoading] = useState(true)
  const [imageGroupe, setImageGroupe] = useState('')
  const { register, handleSubmit, reset, control } = useForm()

  const { fields: kpiFields,    append: addKpi,    remove: removeKpi    } = useFieldArray({ control, name: 'kpis' })
  const { fields: valeurFields, append: addValeur, remove: removeValeur } = useFieldArray({ control, name: 'valeurs' })
  const { fields: organeFields, append: addOrgane, remove: removeOrgane } = useFieldArray({ control, name: 'organes' })

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
    <div className="max-w-5xl">
      <PageHeader title="Le Groupe" subtitle="Informations institutionnelles" />
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

        <div className="card p-6 space-y-4">
          <h2 className="font-semibold text-gray-900">Mode « Disponible bientôt »</h2>
          <p className="text-sm text-gray-500">
            Quand activé, le site public affiche un compte à rebours à la place du contenu jusqu'à la date choisie.
            L'interface d'administration reste accessible normalement.
          </p>
          <label className="flex items-center gap-2">
            <input type="checkbox" {...register('comingSoonEnabled')} />
            <span>Activer le compte à rebours</span>
          </label>
          <div>
            <label className="label">Date et heure de lancement</label>
            <input type="datetime-local" className="input" {...register('comingSoonLaunchAt')} />
          </div>
        </div>

        <div className="card p-6 space-y-4">
          <h2 className="font-semibold text-gray-900">Identité</h2>
          <div>
            <label className="label">Nom du Groupe</label>
            <input className="input" {...register('nom')} />
          </div>
          <BilingualField label="Tagline" name="tagline" register={register} placeholder="Investir autrement" placeholder_en="Investing differently" />
          <BilingualField label="Description courte" name="descriptionCourte" register={register} type="textarea" rows={2} placeholder_en="Short description of the group..." />
          <BilingualField label="Description complète" name="description" register={register} type="textarea" rows={4} placeholder_en="Full description of the group..." />
          <BilingualField label="Mission" name="mission" register={register} type="textarea" rows={3} placeholder_en="Our mission is to..." />
          <BilingualField label="Vision" name="vision" register={register} type="textarea" rows={2} placeholder="Être un investisseur panafricain de référence." placeholder_en="To be a reference pan-African investor." />
          <BilingualField label="Notre Modèle" name="modele" register={register} type="textarea" rows={2} placeholder="Une holding multisectorielle pilotant un portefeuille diversifié d'entités opérationnelles dans des secteurs clés de l'économie." placeholder_en="A multisectoral holding managing a diversified portfolio of operational entities across key sectors of the economy." />
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
              <label className="label">WhatsApp (numéro avec +)</label>
              <input className="input" placeholder="+22601020304" {...register('whatsapp')} />
            </div>
            <div className="col-span-2">
              <label className="label">Lien Google Maps (géolocalisation du siège)</label>
              <input type="url" className="input" placeholder="https://maps.google.com/maps?q=..." {...register('mapUrl')} />
            </div>
          </div>
        </div>

        <div className="card p-6 space-y-4">
          <h2 className="font-semibold text-gray-900">Réseaux sociaux & liens web</h2>
          <p className="text-xs text-gray-400">Ces liens apparaissent dans le pied de page du site.</p>
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
              <label className="label">Site web officiel</label>
              <input type="url" className="input" placeholder="https://www.excellisinvest.com" {...register('website')} />
            </div>
          </div>
        </div>

        <div className="card p-6 space-y-4">
          <h2 className="font-semibold text-gray-900">Informations légales</h2>
          <p className="text-xs text-gray-400">
            Affichées sur les pages publiques « Mentions légales », « Politique de confidentialité » et « Cookies ».
            Tant que ces champs sont vides, ces pages affichent une mention « à compléter ».
          </p>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label">Forme juridique</label>
              <input className="input" placeholder="Société anonyme de droit burkinabè" {...register('formeJuridique')} />
            </div>
            <div>
              <label className="label">Capital social</label>
              <input className="input" placeholder="20 000 000 000 FCFA" {...register('capitalSocial')} />
            </div>
            <div>
              <label className="label">Numéro RCCM</label>
              <input className="input" placeholder="BF OUA 2019 B 00000" {...register('rccm')} />
            </div>
            <div>
              <label className="label">IFU</label>
              <input className="input" placeholder="00118250 Y" {...register('ifu')} />
            </div>
            <div>
              <label className="label">Directeur de la publication</label>
              <input className="input" {...register('directeurPublication')} />
            </div>
            <div>
              <label className="label">Hébergeur — nom</label>
              <input className="input" {...register('hebergeurNom')} />
            </div>
            <div>
              <label className="label">Hébergeur — adresse</label>
              <input className="input" {...register('hebergeurAdresse')} />
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
          <div className="space-y-3">
            {kpiFields.map((f, i) => (
              <div key={f.id} className="border border-gray-100 rounded-lg p-3 space-y-2">
                <div className="flex items-center gap-2">
                  <input className="input w-20" placeholder="20" {...register(`kpis.${i}.num`)} />
                  <input className="input w-16" placeholder="Mds" {...register(`kpis.${i}.unite`)} />
                  <button type="button" onClick={() => removeKpi(i)} className="ml-auto p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg">
                    <Trash2 size={14} />
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <span className="text-[10px] font-bold tracking-widest uppercase text-indigo-600 bg-indigo-50 border border-indigo-100 px-2 py-0.5 rounded-full">FR</span>
                    <input className="input mt-1" placeholder="FCFA de capital social" {...register(`kpis.${i}.label`)} />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold tracking-widest uppercase text-amber-600 bg-amber-50 border border-amber-100 px-2 py-0.5 rounded-full">EN</span>
                    <input className="input mt-1" placeholder="FCFA in share capital" {...register(`kpis.${i}.label_en`)} />
                  </div>
                </div>
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
              <div key={f.id} className="border border-gray-100 rounded-lg p-3 space-y-2">
                <div className="flex items-center gap-2">
                  <select className="input flex-1" {...register(`valeurs.${i}.icone`)}>
                    <option value="">— icône —</option>
                    {ICON_LIST.map(name => (
                      <option key={name} value={name}>{name}</option>
                    ))}
                  </select>
                  <button type="button" onClick={() => removeValeur(i)} className="p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg">
                    <Trash2 size={14} />
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <span className="text-[10px] font-bold tracking-widest uppercase text-indigo-600 bg-indigo-50 border border-indigo-100 px-2 py-0.5 rounded-full">FR</span>
                    <input className="input mt-1" placeholder="Rigueur" {...register(`valeurs.${i}.titre`)} />
                    <textarea className="input mt-1 resize-y" rows={2} placeholder="Description..." {...register(`valeurs.${i}.description`)} />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold tracking-widest uppercase text-amber-600 bg-amber-50 border border-amber-100 px-2 py-0.5 rounded-full">EN</span>
                    <input className="input mt-1" placeholder="Rigour" {...register(`valeurs.${i}.titre_en`)} />
                    <textarea className="input mt-1 resize-y" rows={2} placeholder="Description in English..." {...register(`valeurs.${i}.description_en`)} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Hero ── */}
        <div className="card p-6 space-y-4">
          <h2 className="font-semibold text-gray-900">Hero — Page d'accueil</h2>
          <p className="text-xs text-gray-400">Badge et sous-titre affichés dans la section principale de la page d'accueil.</p>
          <BilingualField label="Badge" name="heroBadge" register={register} placeholder="Holding multisectorielle panafricaine" placeholder_en="Pan-African multisectoral holding" />
          <BilingualField label="Sous-titre hero" name="heroSub" register={register} type="textarea" rows={2} placeholder="Excellis Invest Group est une holding multisectorielle..." placeholder_en="Excellis Invest Group is a multisectoral holding..." />
        </div>

        {/* ── CTA ── */}
        <div className="card p-6 space-y-4">
          <h2 className="font-semibold text-gray-900">CTA — Appel à l'action</h2>
          <p className="text-xs text-gray-400">Bloc "Construisons ensemble" affiché en bas de toutes les pages.</p>
          <BilingualField label="Titre CTA" name="ctaTitre" register={register} placeholder="Construisons ensemble." placeholder_en="Let's build together." />
          <BilingualField label="Sous-titre CTA" name="ctaSousTitre" register={register} type="textarea" rows={2} placeholder="Investisseur, partenaire institutionnel ou client d'une filiale..." placeholder_en="Investor, institutional partner or subsidiary client..." />
        </div>

        {/* ── Ambition ── */}
        <div className="card p-6 space-y-4">
          <h2 className="font-semibold text-gray-900">Ambition</h2>
          <BilingualField label="Texte Ambition" name="ambition" register={register} type="textarea" rows={2} placeholder="Un rayonnement panafricain ancré dans les réalités économiques locales." placeholder_en="Pan-African reach rooted in local economic realities." />
        </div>

        {/* ── Organes de gouvernance ── */}
        <div className="card p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-semibold text-gray-900">Organes de gouvernance</h2>
              <p className="text-xs text-gray-400 mt-0.5">4 blocs affichés sur la page Gouvernance.</p>
            </div>
            <button type="button" onClick={() => addOrgane({ titre: '', titre_en: '', desc: '', desc_en: '' })} className="btn-secondary text-xs">
              <Plus size={14} /> Ajouter
            </button>
          </div>
          <div className="space-y-3">
            {organeFields.map((f, i) => (
              <div key={f.id} className="border border-gray-100 rounded-lg p-3 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-gray-400">Organe {i + 1}</span>
                  <button type="button" onClick={() => removeOrgane(i)} className="p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg">
                    <Trash2 size={14} />
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <span className="text-[10px] font-bold tracking-widest uppercase text-indigo-600 bg-indigo-50 border border-indigo-100 px-2 py-0.5 rounded-full">FR</span>
                    <input className="input mt-1" placeholder="Assemblée Générale" {...register(`organes.${i}.titre`)} />
                    <textarea className="input mt-1 resize-y" rows={3} placeholder="Description..." {...register(`organes.${i}.desc`)} />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold tracking-widest uppercase text-amber-600 bg-amber-50 border border-amber-100 px-2 py-0.5 rounded-full">EN</span>
                    <input className="input mt-1" placeholder="General Assembly" {...register(`organes.${i}.titre_en`)} />
                    <textarea className="input mt-1 resize-y" rows={3} placeholder="Description in English..." {...register(`organes.${i}.desc_en`)} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Notation externe ── */}
        <div className="card p-6 space-y-4">
          <h2 className="font-semibold text-gray-900">Notation externe</h2>
          <p className="text-xs text-gray-400">Section Bloomfield sur la page Gouvernance.</p>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="label">Agence</label>
              <input className="input" placeholder="Bloomfield Investment" {...register('ratingAgence')} />
            </div>
            <div>
              <label className="label">Notes</label>
              <input className="input" placeholder="A / A2" {...register('ratingNotes')} />
            </div>
            <div>
              <label className="label">Perspective</label>
              <input className="input" placeholder="Stable" {...register('ratingPerspective')} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label">Date de la notation</label>
              <input className="input" placeholder="Juin 2026" {...register('ratingDate')} />
            </div>
            <div>
              <label className="label">Lien vers le rapport / communiqué</label>
              <input type="url" className="input" placeholder="https://..." {...register('ratingSourceUrl')} />
            </div>
          </div>
          <BilingualField label="Description" name="ratingDesc" register={register} type="textarea" rows={3}
            placeholder="La solidité de la gouvernance et la qualité de la structure financière..."
            placeholder_en="The strength of governance and the quality of the financial structure..." />
        </div>

        {/* ── Sous-titres des pages ── */}
        <div className="card p-6 space-y-4">
          <h2 className="font-semibold text-gray-900">Sous-titres des pages</h2>
          <p className="text-xs text-gray-400">Textes affichés sous le titre principal de chaque page (hero subtitle).</p>
          <BilingualField label="Le Groupe" name="sousTitreGroupe" register={register} type="textarea" rows={2}
            placeholder="Holding d'investissement multisectorielle..." placeholder_en="Multi-sector investment holding..." />
          <BilingualField label="Nos Filiales" name="sousTitreFiliales" register={register} type="textarea" rows={2}
            placeholder="Partout en Afrique, nos filiales opèrent..." placeholder_en="Across Africa, our subsidiaries operate..." />
          <BilingualField label="Nos Métiers" name="sousTitreMetiers" register={register} type="textarea" rows={2}
            placeholder="Du marché financier à l'énergie..." placeholder_en="From financial markets to energy..." />
          <BilingualField label="Gouvernance" name="sousTitreGouvernance" register={register} type="textarea" rows={2}
            placeholder="Constitué en société anonyme de droit burkinabè..." placeholder_en="Incorporated as a Burkinabè public limited company..." />
          <BilingualField label="Carrières" name="sousTitreCarrieres" register={register} type="textarea" rows={2}
            placeholder="Rejoignez un groupe panafricain en pleine croissance..." placeholder_en="Join a fast-growing pan-African group..." />
          <BilingualField label="Contact" name="sousTitreContact" register={register} type="textarea" rows={2}
            placeholder="Investisseur, partenaire institutionnel, presse ou candidat..." placeholder_en="Investor, institutional partner, press or candidate..." />
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
