import { useState, useRef } from 'react'
import { Upload, X, Image } from 'lucide-react'
import { api } from '../lib/api'
import toast from 'react-hot-toast'

const API_URL = import.meta.env.VITE_API_URL?.replace('/api', '') || ''

function resolveUrl(url) {
  if (!url) return null
  if (url.startsWith('http')) return url
  return `${API_URL}${url}`
}

export default function ImageUpload({ value, onChange, label = 'Image' }) {
  const [uploading, setUploading] = useState(false)
  const ref = useRef()

  const handleFile = async (file) => {
    if (!file) return
    setUploading(true)
    try {
      const res = await api.upload(file)
      onChange(res.url)
      toast.success('Image uploadée')
    } catch (err) {
      toast.error(err.message)
    } finally {
      setUploading(false)
    }
  }

  return (
    <div>
      <label className="label">{label}</label>
      <div className="flex items-start gap-3">
        {value ? (
          <div className="relative w-24 h-24 rounded-lg overflow-hidden border border-gray-200 flex-shrink-0">
            <img src={resolveUrl(value)} alt="" className="w-full h-full object-cover" />
            <button
              type="button"
              onClick={() => onChange('')}
              className="absolute top-1 right-1 w-5 h-5 bg-red-600 rounded-full flex items-center justify-center text-white hover:bg-red-700"
            >
              <X size={10} />
            </button>
          </div>
        ) : (
          <div className="w-24 h-24 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-400 flex-shrink-0">
            <Image size={24} />
          </div>
        )}
        <div className="flex-1">
          <input
            ref={ref}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => handleFile(e.target.files[0])}
          />
          <button
            type="button"
            onClick={() => ref.current.click()}
            disabled={uploading}
            className="btn-secondary"
          >
            <Upload size={14} />
            {uploading ? 'Upload...' : 'Choisir une image'}
          </button>
          <p className="text-xs text-gray-400 mt-1">JPG, PNG, WebP — max 5 Mo</p>
          {value && (
            <input
              type="text"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              className="input mt-2 text-xs"
              placeholder="URL de l'image"
            />
          )}
        </div>
      </div>
    </div>
  )
}
