import { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { api } from '../lib/api'
import toast from 'react-hot-toast'
import ConfirmDialog from '../components/ConfirmDialog'
import { ArrowLeft, FileText, Trash2 } from 'lucide-react'

const STATUTS = [
  { value: 'recue',    label: 'Reçue',    bg: 'rgba(26,107,122,0.1)',  color: '#1A6B7A' },
  { value: 'en_cours', label: 'En cours', bg: 'rgba(184,146,42,0.12)', color: '#B8922A' },
  { value: 'acceptee', label: 'Acceptée', bg: 'rgba(16,185,129,0.1)', color: '#059669' },
  { value: 'refusee',  label: 'Refusée',  bg: 'rgba(239,68,68,0.1)',  color: '#DC2626' },
]

const API_HOST = import.meta.env.VITE_API_URL?.replace('/api', '') || ''

function InfoRow({ label, value }) {
  if (!value) return null
  return (
    <div style={{ display: 'flex', gap: 16, padding: '12px 0', borderBottom: '1px solid rgba(15,25,36,0.05)' }}>
      <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#9CA3AF', width: 140, flexShrink: 0, paddingTop: 1 }}>
        {label}
      </div>
      <div style={{ fontSize: 14, color: '#1F2937', flex: 1 }}>{value}</div>
    </div>
  )
}

export default function CandidatureDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [cand, setCand] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [confirm, setConfirm] = useState(false)

  useEffect(() => {
    api.get(`/candidatures/${id}`).then(setCand).finally(() => setLoading(false))
  }, [id])

  const changeStatut = async (statut) => {
    setSaving(true)
    try {
      const updated = await api.put(`/candidatures/${id}`, { statut })
      setCand(updated)
      toast.success('Statut mis à jour')
    } catch (err) {
      toast.error(err.message)
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async () => {
    try {
      await api.delete(`/candidatures/${id}`)
      toast.success('Candidature supprimée')
      navigate('/candidatures')
    } catch (err) {
      toast.error(err.message)
    }
  }

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className="animate-spin w-8 h-8 border-4 border-brand-500 border-t-transparent rounded-full" />
    </div>
  )
  if (!cand) return <div className="text-center py-20 text-gray-400">Candidature introuvable</div>

  const statut = STATUTS.find(s => s.value === cand.statut) || STATUTS[0]

  return (
    <div style={{ maxWidth: 760 }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
        <Link to="/candidatures" style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: '#6B7280', textDecoration: 'none' }}>
          <ArrowLeft size={15} /> Candidatures
        </Link>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24, flexWrap: 'wrap', gap: 12 }}>
        <div>
          <h1 style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: 28, color: '#0F1924', fontWeight: 600 }}>
            {cand.prenom} {cand.nom}
          </h1>
          <div style={{ fontSize: 13, color: '#6B7280', marginTop: 4 }}>
            {cand.carriere_titre
              ? <>Candidature pour : <strong style={{ color: '#0F4855' }}>{cand.carriere_titre}</strong></>
              : <span style={{ fontStyle: 'italic' }}>Candidature spontanée</span>
            }
          </div>
        </div>
        <button onClick={() => setConfirm(true)} style={{
          display: 'flex', alignItems: 'center', gap: 6,
          padding: '8px 16px', borderRadius: 6, border: '1px solid #FCA5A5',
          background: 'white', color: '#DC2626', fontSize: 13, cursor: 'pointer',
        }}>
          <Trash2 size={14} /> Supprimer
        </button>
      </div>

      {/* Fiche */}
      <div style={{ background: 'white', borderRadius: 10, border: '1px solid rgba(15,25,36,0.08)', boxShadow: '0 2px 12px rgba(15,25,36,0.05)', overflow: 'hidden', marginBottom: 20 }}>
        <div style={{ padding: '20px 24px', borderBottom: '1px solid rgba(15,25,36,0.06)' }}>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#B8922A', marginBottom: 4 }}>Informations</div>
          <h2 style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: 20, color: '#0F1924', fontWeight: 600 }}>Dossier de candidature</h2>
        </div>
        <div style={{ padding: '8px 24px 16px' }}>
          <InfoRow label="Email" value={cand.email} />
          <InfoRow label="Téléphone" value={cand.telephone} />
          <InfoRow label="Poste visé" value={cand.carriere_titre || 'Candidature spontanée'} />
          <InfoRow label="Date" value={new Date(cand.created_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })} />
        </div>
      </div>

      {/* Lettre de motivation */}
      {cand.lettre && (
        <div style={{ background: 'white', borderRadius: 10, border: '1px solid rgba(15,25,36,0.08)', boxShadow: '0 2px 12px rgba(15,25,36,0.05)', overflow: 'hidden', marginBottom: 20 }}>
          <div style={{ padding: '20px 24px', borderBottom: '1px solid rgba(15,25,36,0.06)' }}>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#B8922A', marginBottom: 4 }}>Motivation</div>
            <h2 style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: 20, color: '#0F1924', fontWeight: 600 }}>Lettre de motivation</h2>
          </div>
          <div style={{ padding: '20px 24px', fontSize: 14, color: '#374151', lineHeight: 1.75, whiteSpace: 'pre-wrap' }}>
            {cand.lettre}
          </div>
        </div>
      )}

      {/* CV + Statut */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>

        {/* CV */}
        <div style={{ background: 'white', borderRadius: 10, border: '1px solid rgba(15,25,36,0.08)', boxShadow: '0 2px 12px rgba(15,25,36,0.05)', padding: '20px 24px' }}>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#B8922A', marginBottom: 12 }}>Curriculum vitae</div>
          {cand.cv_path
            ? <a href={`${API_HOST}${cand.cv_path}`} target="_blank" rel="noreferrer" style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '10px 20px', borderRadius: 6,
                background: '#0F4855', color: 'white',
                fontSize: 13, fontWeight: 600, textDecoration: 'none',
              }}>
                <FileText size={15} /> Télécharger le CV
              </a>
            : <p style={{ fontSize: 13, color: '#9CA3AF', fontStyle: 'italic' }}>Aucun CV joint</p>
          }
        </div>

        {/* Statut */}
        <div style={{ background: 'white', borderRadius: 10, border: '1px solid rgba(15,25,36,0.08)', boxShadow: '0 2px 12px rgba(15,25,36,0.05)', padding: '20px 24px' }}>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#B8922A', marginBottom: 12 }}>Statut du dossier</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {STATUTS.map(s => (
              <button key={s.value} onClick={() => changeStatut(s.value)} disabled={saving || cand.statut === s.value} style={{
                padding: '7px 14px', borderRadius: 20, fontSize: 12, fontWeight: 700,
                border: '2px solid',
                borderColor: cand.statut === s.value ? s.color : 'transparent',
                background: cand.statut === s.value ? s.bg : '#F9FAFB',
                color: cand.statut === s.value ? s.color : '#6B7280',
                cursor: cand.statut === s.value ? 'default' : 'pointer',
                transition: 'all 0.15s',
                opacity: saving ? 0.6 : 1,
              }}>
                {s.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <ConfirmDialog
        open={confirm}
        title="Supprimer la candidature"
        message={`Supprimer définitivement la candidature de ${cand.prenom} ${cand.nom} ?`}
        onConfirm={handleDelete}
        onCancel={() => setConfirm(false)}
      />
    </div>
  )
}
