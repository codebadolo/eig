/**
 * Champ bilingue FR + EN côte à côte.
 * Usage :
 *   <BilingualField label="Titre" name="titre" register={register} required />
 *   <BilingualField label="Description" name="description" register={register} type="textarea" rows={3} />
 */
export default function BilingualField({
  label,
  name,
  register,
  type = 'input',
  rows = 3,
  required = false,
  placeholder = '',
  placeholder_en = '',
  hint = '',
}) {
  const isTextarea = type === 'textarea'
  const cls = `input w-full${isTextarea ? ' resize-y' : ''}`
  const minH = isTextarea ? { minHeight: Math.max(rows * 26, 72) } : {}

  return (
    <div>
      <div className="flex items-baseline gap-1.5 mb-2">
        <span className="label mb-0">{label}</span>
        {required && <span className="text-red-400 text-xs">*</span>}
      </div>
      {hint && <p className="text-xs text-gray-400 mb-2">{hint}</p>}
      <div className="grid grid-cols-2 gap-3">
        {/* Français */}
        <div>
          <div className="flex items-center gap-1.5 mb-1.5">
            <span className="text-[10px] font-bold tracking-widest uppercase text-indigo-600 bg-indigo-50 border border-indigo-100 px-2 py-0.5 rounded-full">FR</span>
            <span className="text-[10px] text-gray-400">Français</span>
          </div>
          {isTextarea ? (
            <textarea
              className={cls}
              style={minH}
              rows={rows}
              placeholder={placeholder}
              {...register(name, required ? { required: true } : {})}
            />
          ) : (
            <input
              className={cls}
              placeholder={placeholder}
              {...register(name, required ? { required: true } : {})}
            />
          )}
        </div>

        {/* English */}
        <div>
          <div className="flex items-center gap-1.5 mb-1.5">
            <span className="text-[10px] font-bold tracking-widest uppercase text-amber-600 bg-amber-50 border border-amber-100 px-2 py-0.5 rounded-full">EN</span>
            <span className="text-[10px] text-gray-400">English</span>
          </div>
          {isTextarea ? (
            <textarea
              className={cls}
              style={minH}
              rows={rows}
              placeholder={placeholder_en || `${label} in English...`}
              {...register(`${name}_en`)}
            />
          ) : (
            <input
              className={cls}
              placeholder={placeholder_en || `${label} in English...`}
              {...register(`${name}_en`)}
            />
          )}
        </div>
      </div>
    </div>
  )
}
