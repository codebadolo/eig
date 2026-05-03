import { useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { api } from '../lib/api'
import toast from 'react-hot-toast'
import PageHeader from '../components/PageHeader'
import { Lock, ExternalLink } from 'lucide-react'

export default function Parametres() {
  const { user } = useAuth()
  const [pwd, setPwd] = useState({ current: '', next: '', confirm: '' })
  const [saving, setSaving] = useState(false)

  const handlePassword = async (e) => {
    e.preventDefault()
    if (pwd.next !== pwd.confirm) return toast.error('Les mots de passe ne correspondent pas')
    if (pwd.next.length < 8) return toast.error('Minimum 8 caractères')
    setSaving(true)
    try {
      await api.put('/auth/password', { currentPassword: pwd.current, newPassword: pwd.next })
      toast.success('Mot de passe mis à jour')
      setPwd({ current: '', next: '', confirm: '' })
    } catch (err) {
      toast.error(err.message)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="max-w-xl">
      <PageHeader title="Paramètres" />

      <div className="card p-6 mb-4">
        <h2 className="font-semibold text-gray-900 mb-4">Mon compte</h2>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between py-2 border-b border-gray-50">
            <span className="text-gray-500">Nom</span>
            <span className="font-medium text-gray-900">{user?.nom}</span>
          </div>
          <div className="flex justify-between py-2">
            <span className="text-gray-500">Email</span>
            <span className="font-medium text-gray-900">{user?.email}</span>
          </div>
        </div>
      </div>

      <div className="card p-6 mb-4">
        <h2 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Lock size={16} /> Changer le mot de passe
        </h2>
        <form onSubmit={handlePassword} className="space-y-4">
          <div>
            <label className="label">Mot de passe actuel</label>
            <input type="password" className="input" value={pwd.current} onChange={e => setPwd({ ...pwd, current: e.target.value })} required />
          </div>
          <div>
            <label className="label">Nouveau mot de passe</label>
            <input type="password" className="input" value={pwd.next} onChange={e => setPwd({ ...pwd, next: e.target.value })} required />
          </div>
          <div>
            <label className="label">Confirmer le mot de passe</label>
            <input type="password" className="input" value={pwd.confirm} onChange={e => setPwd({ ...pwd, confirm: e.target.value })} required />
          </div>
          <button type="submit" disabled={saving} className="btn-primary">
            {saving ? 'Mise à jour...' : 'Mettre à jour le mot de passe'}
          </button>
        </form>
      </div>

      <div className="card p-6">
        <h2 className="font-semibold text-gray-900 mb-3">Liens rapides</h2>
        <div className="space-y-2">
          <a href="/" target="_blank" className="flex items-center gap-2 text-sm text-brand-600 hover:underline">
            <ExternalLink size={14} /> Voir le site public
          </a>
        </div>
      </div>
    </div>
  )
}
