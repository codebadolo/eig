import { useState } from 'react'
import {
  Plus, Trash2, ChevronUp, ChevronDown,
  Type, Image as ImageIcon, Video, Quote, AlignLeft,
} from 'lucide-react'
import ImageUpload from './ImageUpload'
import { api } from '../lib/api'
import toast from 'react-hot-toast'

const API = import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://localhost:3001'

const BLOCK_TYPES = [
  { type: 'paragraph', label: 'Paragraphe',      icon: AlignLeft },
  { type: 'heading',   label: 'Titre',            icon: Type },
  { type: 'image',     label: 'Image',            icon: ImageIcon },
  { type: 'video',     label: 'Vidéo',            icon: Video },
  { type: 'quote',     label: 'Citation',         icon: Quote },
]

function uid() {
  return Math.random().toString(36).slice(2)
}

function newBlock(type) {
  const base = { id: uid(), type }
  if (type === 'paragraph') return { ...base, content: '' }
  if (type === 'heading')   return { ...base, content: '', level: 2 }
  if (type === 'image')     return { ...base, url: '', caption: '' }
  if (type === 'video')     return { ...base, url: '', caption: '' }
  if (type === 'quote')     return { ...base, content: '', author: '' }
  return base
}

function VideoPreview({ url }) {
  if (!url) return null
  const yt = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/)
  const vm = url.match(/vimeo\.com\/(\d+)/)
  if (yt) return (
    <div className="aspect-video rounded-lg overflow-hidden bg-gray-100 mt-2">
      <iframe src={`https://www.youtube.com/embed/${yt[1]}`} className="w-full h-full"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
    </div>
  )
  if (vm) return (
    <div className="aspect-video rounded-lg overflow-hidden bg-gray-100 mt-2">
      <iframe src={`https://player.vimeo.com/video/${vm[1]}`} className="w-full h-full"
        allow="autoplay; fullscreen; picture-in-picture" allowFullScreen />
    </div>
  )
  if (/\.(mp4|webm|ogg)$/i.test(url)) return (
    <video controls className="w-full rounded-lg mt-2 max-h-64">
      <source src={`${API}${url}`} />
    </video>
  )
  return null
}

function VideoUpload({ value, onChange }) {
  const [uploading, setUploading] = useState(false)
  const ref = { current: null }

  const handleFile = async (e) => {
    const file = e.target.files[0]
    if (!file) return
    setUploading(true)
    try {
      const res = await api.upload(file)
      onChange(res.url)
      toast.success('Vidéo uploadée')
    } catch (err) {
      toast.error(err.message)
    } finally {
      setUploading(false)
    }
  }

  return (
    <label className={`flex items-center gap-2 px-3 py-2 text-sm border border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-brand-400 hover:bg-brand-50 transition-colors text-gray-500 ${uploading ? 'opacity-50 pointer-events-none' : ''}`}>
      <Video size={14} />
      {uploading ? 'Upload en cours...' : 'Uploader une vidéo'}
      <input type="file" accept="video/*" className="hidden" onChange={handleFile} />
    </label>
  )
}

function BlockItem({ block, onChange, onDelete, onMoveUp, onMoveDown, isFirst, isLast }) {
  const typeLabel = BLOCK_TYPES.find(t => t.type === block.type)?.label
  const TypeIcon = BLOCK_TYPES.find(t => t.type === block.type)?.icon

  return (
    <div className="flex gap-2 items-start group/block">
      {/* Handles */}
      <div className="flex flex-col gap-0.5 pt-3 flex-shrink-0 opacity-0 group-hover/block:opacity-100 transition-opacity">
        <button type="button" onClick={onMoveUp} disabled={isFirst}
          className="p-0.5 hover:bg-gray-100 rounded text-gray-400 disabled:opacity-20 transition-colors">
          <ChevronUp size={13} />
        </button>
        <button type="button" onClick={onMoveDown} disabled={isLast}
          className="p-0.5 hover:bg-gray-100 rounded text-gray-400 disabled:opacity-20 transition-colors">
          <ChevronDown size={13} />
        </button>
      </div>

      {/* Block content */}
      <div className="flex-1 rounded-xl border border-gray-100 bg-white hover:border-brand-200 transition-colors overflow-hidden">
        {/* Block header */}
        <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 border-b border-gray-100">
          {TypeIcon && <TypeIcon size={12} className="text-gray-400" />}
          <span className="text-xs text-gray-400 font-medium uppercase tracking-wide">{typeLabel}</span>
        </div>

        {/* Block editor */}
        <div className="p-3">
          {block.type === 'paragraph' && (
            <textarea
              className="w-full text-sm text-gray-700 leading-relaxed resize-none outline-none min-h-[80px] bg-transparent"
              placeholder="Rédigez votre paragraphe..."
              value={block.content}
              onChange={e => {
                e.target.style.height = 'auto'
                e.target.style.height = e.target.scrollHeight + 'px'
                onChange({ ...block, content: e.target.value })
              }}
            />
          )}

          {block.type === 'heading' && (
            <div className="space-y-2">
              <select className="input py-1 text-xs w-20" value={block.level}
                onChange={e => onChange({ ...block, level: Number(e.target.value) })}>
                <option value={2}>H2</option>
                <option value={3}>H3</option>
              </select>
              <input
                className={`w-full outline-none bg-transparent text-gray-900 font-bold ${block.level === 2 ? 'text-xl' : 'text-lg'}`}
                placeholder="Titre de section..."
                value={block.content}
                onChange={e => onChange({ ...block, content: e.target.value })}
              />
            </div>
          )}

          {block.type === 'image' && (
            <div className="space-y-2">
              <ImageUpload value={block.url} onChange={url => onChange({ ...block, url })} label="" />
              <input className="input text-sm" placeholder="Légende (optionnel)"
                value={block.caption} onChange={e => onChange({ ...block, caption: e.target.value })} />
            </div>
          )}

          {block.type === 'video' && (
            <div className="space-y-2">
              <input className="input text-sm"
                placeholder="URL YouTube, Vimeo ou lien direct..."
                value={block.url}
                onChange={e => onChange({ ...block, url: e.target.value })} />
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-400">ou</span>
                <VideoUpload value={block.url} onChange={url => onChange({ ...block, url })} />
              </div>
              <VideoPreview url={block.url} />
              <input className="input text-sm" placeholder="Légende (optionnel)"
                value={block.caption} onChange={e => onChange({ ...block, caption: e.target.value })} />
            </div>
          )}

          {block.type === 'quote' && (
            <div className="border-l-4 border-brand-300 pl-3 space-y-2">
              <textarea
                className="w-full text-sm text-gray-700 italic leading-relaxed resize-none outline-none min-h-[60px] bg-transparent"
                placeholder="Texte de la citation..."
                value={block.content}
                onChange={e => onChange({ ...block, content: e.target.value })}
              />
              <input className="input text-sm" placeholder="Auteur / Source (optionnel)"
                value={block.author} onChange={e => onChange({ ...block, author: e.target.value })} />
            </div>
          )}
        </div>
      </div>

      {/* Delete */}
      <button type="button" onClick={onDelete}
        className="mt-3 p-1.5 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-lg opacity-0 group-hover/block:opacity-100 transition-all flex-shrink-0">
        <Trash2 size={13} />
      </button>
    </div>
  )
}

export default function BlockEditor({ value, onChange }) {
  const blocks = value || []
  const [showMenu, setShowMenu] = useState(false)

  const addBlock = (type) => {
    onChange([...blocks, newBlock(type)])
    setShowMenu(false)
  }

  const updateBlock = (id, updated) => onChange(blocks.map(b => b.id === id ? updated : b))
  const deleteBlock = (id) => onChange(blocks.filter(b => b.id !== id))
  const moveBlock = (index, dir) => {
    const target = index + dir
    if (target < 0 || target >= blocks.length) return
    const next = [...blocks]
    ;[next[index], next[target]] = [next[target], next[index]]
    onChange(next)
  }

  return (
    <div className="space-y-2">
      {blocks.length === 0 && (
        <div className="text-center py-10 border-2 border-dashed border-gray-200 rounded-xl text-gray-400 text-sm">
          Aucun contenu — ajoutez des blocs avec le bouton ci-dessous
        </div>
      )}

      {blocks.map((block, i) => (
        <BlockItem
          key={block.id}
          block={block}
          onChange={updated => updateBlock(block.id, updated)}
          onDelete={() => deleteBlock(block.id)}
          onMoveUp={() => moveBlock(i, -1)}
          onMoveDown={() => moveBlock(i, 1)}
          isFirst={i === 0}
          isLast={i === blocks.length - 1}
        />
      ))}

      <div className="relative">
        <button
          type="button"
          onClick={() => setShowMenu(!showMenu)}
          className="w-full py-2.5 border-2 border-dashed border-gray-200 rounded-xl text-sm text-gray-400 hover:border-brand-300 hover:text-brand-500 transition-colors flex items-center justify-center gap-2 font-medium"
        >
          <Plus size={15} /> Ajouter un bloc
        </button>

        {showMenu && (
          <>
            <div className="fixed inset-0 z-10" onClick={() => setShowMenu(false)} />
            <div className="absolute bottom-full mb-1 left-0 right-0 bg-white rounded-xl shadow-xl border border-gray-100 p-2 grid grid-cols-5 gap-1 z-20">
              {BLOCK_TYPES.map(bt => (
                <button
                  key={bt.type}
                  type="button"
                  onClick={() => addBlock(bt.type)}
                  className="flex flex-col items-center gap-1.5 p-3 rounded-xl hover:bg-brand-50 hover:text-brand-600 text-gray-500 transition-colors"
                >
                  <bt.icon size={20} />
                  <span className="text-xs font-medium leading-tight text-center">{bt.label}</span>
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
