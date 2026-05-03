import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Plus } from 'lucide-react'

export default function PageHeader({ title, subtitle, action, backTo }) {
  const navigate = useNavigate()
  return (
    <div className="flex items-start justify-between mb-6">
      <div className="flex items-center gap-3">
        {backTo && (
          <button onClick={() => navigate(backTo)} className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-500">
            <ArrowLeft size={18} />
          </button>
        )}
        <div>
          <h1 className="text-xl font-semibold text-gray-900">{title}</h1>
          {subtitle && <p className="text-sm text-gray-500 mt-0.5">{subtitle}</p>}
        </div>
      </div>
      {action && (
        <button onClick={action.onClick} className="btn-primary">
          <Plus size={16} /> {action.label}
        </button>
      )}
    </div>
  )
}
