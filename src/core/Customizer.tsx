import { useRef, useState, type ReactNode } from 'react'
import { Plus, RotateCcw, Trash2, Upload, X } from 'lucide-react'
import { useDemo } from './DemoContext'
import type { DemoConfig, Product } from './types'
import { categoriesOf, fileToDataUrl, prettyPhone } from './utils'

type Tab = 'brand' | 'contact' | 'images' | 'menu' | 'copy'
const TABS: { id: Tab; label: string }[] = [
  { id: 'brand', label: 'Marca' },
  { id: 'contact', label: 'Contacto' },
  { id: 'menu', label: 'Menú' },
  { id: 'images', label: 'Fotos' },
  { id: 'copy', label: 'Textos' },
]

const input =
  'w-full rounded-md border border-neutral-300 bg-white px-2.5 py-1.5 text-[13px] text-neutral-900 outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900'

function Field({ label, hint, children }: { label: string; hint?: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1 block text-[11px] font-semibold uppercase tracking-wide text-neutral-500">{label}</span>
      {children}
      {hint && <span className="mt-1 block text-[11px] text-neutral-400">{hint}</span>}
    </label>
  )
}

function Text({ value, onChange, placeholder, area }: { value: string; onChange: (v: string) => void; placeholder?: string; area?: boolean }) {
  return area ? (
    <textarea className={input} rows={3} value={value} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} />
  ) : (
    <input className={input} value={value} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} />
  )
}

function ImageField({ label, value, onChange, max = 1600 }: { label: string; value: string; onChange: (v: string) => void; max?: number }) {
  const ref = useRef<HTMLInputElement>(null)
  const [err, setErr] = useState('')
  const isData = value.startsWith('data:')
  return (
    <div>
      <span className="mb-1 block text-[11px] font-semibold uppercase tracking-wide text-neutral-500">{label}</span>
      <div className="flex gap-2">
        {value && <img src={value} alt="" className="h-9 w-12 shrink-0 rounded object-cover" />}
        <input
          className={input}
          value={isData ? '(foto subida desde este equipo)' : value}
          readOnly={isData}
          placeholder="Pega una URL de imagen"
          onChange={(e) => onChange(e.target.value)}
        />
        <button
          type="button"
          onClick={() => ref.current?.click()}
          className="flex shrink-0 items-center gap-1 rounded-md bg-neutral-900 px-2.5 text-[12px] font-medium text-white hover:bg-neutral-700"
          title="Subir foto desde este equipo"
        >
          <Upload size={13} /> Subir
        </button>
        <input
          ref={ref}
          type="file"
          accept="image/*"
          hidden
          onChange={async (e) => {
            const f = e.target.files?.[0]
            e.target.value = ''
            if (!f) return
            try {
              setErr('')
              onChange(await fileToDataUrl(f, max))
            } catch (x) {
              setErr((x as Error).message)
            }
          }}
        />
      </div>
      {err && <span className="mt-1 block text-[11px] text-red-600">{err}</span>}
    </div>
  )
}

const uid = () => Math.random().toString(36).slice(2, 9)

export function Customizer({ onClose }: { onClose: () => void }) {
  const { cfg, update, reset, storageError, isModified } = useDemo()
  const [tab, setTab] = useState<Tab>('brand')

  const set = (fn: (d: DemoConfig) => void) =>
    update((d) => {
      fn(d)
      return d
    })

  const patchProduct = (id: string, patch: Partial<Product>) =>
    set((d) => {
      const p = d.products.find((x) => x.id === id)
      if (p) Object.assign(p, patch)
    })

  const cats = categoriesOf(cfg.products)

  return (
    <div className="cz fixed inset-0 z-[100] flex justify-end bg-black/30" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <aside className="flex h-full w-full max-w-[420px] flex-col bg-neutral-50 text-neutral-900 shadow-2xl" role="dialog" aria-label="Personalizar demostración">
        <header className="flex items-center justify-between border-b border-neutral-200 bg-white px-4 py-3">
          <div>
            <h2 className="text-sm font-bold">Personalizar demostración</h2>
            <p className="text-[11px] text-neutral-500">Los cambios se ven al instante y se guardan en este dispositivo.</p>
          </div>
          <button onClick={onClose} className="rounded-md p-1.5 hover:bg-neutral-100" aria-label="Cerrar panel">
            <X size={18} />
          </button>
        </header>

        <nav className="flex gap-1 border-b border-neutral-200 bg-white px-3 pt-2">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`rounded-t-md px-3 py-1.5 text-[12px] font-semibold ${tab === t.id ? 'border-b-2 border-neutral-900 text-neutral-900' : 'text-neutral-500 hover:text-neutral-800'}`}
            >
              {t.label}
            </button>
          ))}
        </nav>

        <div className="flex-1 space-y-4 overflow-y-auto p-4">
          {tab === 'brand' && (
            <>
              <Field label="Nombre del restaurante">
                <Text value={cfg.brand.name} onChange={(v) => set((d) => void (d.brand.name = v))} />
              </Field>
              <Field label="Eslogan / nombre comercial">
                <Text value={cfg.brand.tagline} onChange={(v) => set((d) => void (d.brand.tagline = v))} />
              </Field>
              <Field label="Logo tipográfico (sigla corta)" hint="Se usa cuando no hay imagen de logo.">
                <Text value={cfg.brand.logoMark} onChange={(v) => set((d) => void (d.brand.logoMark = v))} />
              </Field>
              <ImageField label="Logo (imagen opcional)" value={cfg.brand.logoUrl} max={500} onChange={(v) => set((d) => void (d.brand.logoUrl = v))} />
              {cfg.brand.logoUrl && (
                <button className="text-[12px] text-red-600 underline" onClick={() => set((d) => void (d.brand.logoUrl = ''))}>
                  Quitar logo de imagen
                </button>
              )}
              <div className="grid grid-cols-2 gap-3">
                <Field label="Color principal">
                  <input type="color" className="h-9 w-full cursor-pointer rounded-md border border-neutral-300" value={cfg.colors.primary} onChange={(e) => set((d) => void (d.colors.primary = e.target.value))} />
                </Field>
                <Field label="Color de acento">
                  <input type="color" className="h-9 w-full cursor-pointer rounded-md border border-neutral-300" value={cfg.colors.accent} onChange={(e) => set((d) => void (d.colors.accent = e.target.value))} />
                </Field>
              </div>
            </>
          )}

          {tab === 'contact' && (
            <>
              <Field label="WhatsApp" hint={`Solo números con indicativo (57…). Se muestra como ${prettyPhone(cfg.contact.whatsapp)}. Número de demostración.`}>
                <Text value={cfg.contact.whatsapp} onChange={(v) => set((d) => void (d.contact.whatsapp = v.replace(/[^\d+\s]/g, '')))} />
              </Field>
              <Field label="Mensaje predeterminado de WhatsApp" hint="Usa {nombre} para insertar el nombre del restaurante.">
                <Text area value={cfg.contact.message} onChange={(v) => set((d) => void (d.contact.message = v))} />
              </Field>
              <Field label="Dirección">
                <Text value={cfg.location.address} onChange={(v) => set((d) => void (d.location.address = v))} />
              </Field>
              <Field label="Ciudad">
                <Text value={cfg.location.city} onChange={(v) => set((d) => void (d.location.city = v))} />
              </Field>
              <Field label="Enlace del perfil en Google Maps (reseñas)" hint="Opcional. Si está vacío se busca por dirección.">
                <Text value={cfg.location.reviewsUrl} onChange={(v) => set((d) => void (d.location.reviewsUrl = v))} />
              </Field>
              <Field label="URL del mapa incrustado (iframe)" hint="Opcional. Vacío = mapa generado desde la dirección.">
                <Text value={cfg.location.mapEmbed} onChange={(v) => set((d) => void (d.location.mapEmbed = v))} />
              </Field>
              <div>
                <span className="mb-1 block text-[11px] font-semibold uppercase tracking-wide text-neutral-500">Horarios</span>
                <div className="space-y-2">
                  {cfg.hours.map((h, i) => (
                    <div key={i} className="flex gap-2">
                      <input className={input} value={h.label} onChange={(e) => set((d) => void (d.hours[i].label = e.target.value))} />
                      <input className={input} value={h.time} onChange={(e) => set((d) => void (d.hours[i].time = e.target.value))} />
                      <button onClick={() => set((d) => void d.hours.splice(i, 1))} className="px-1 text-neutral-400 hover:text-red-600" aria-label="Quitar horario">
                        <Trash2 size={15} />
                      </button>
                    </div>
                  ))}
                  <button onClick={() => set((d) => void d.hours.push({ label: 'Día', time: '8:00 am – 5:00 pm' }))} className="flex items-center gap-1 text-[12px] font-semibold text-neutral-700 hover:text-black">
                    <Plus size={14} /> Agregar horario
                  </button>
                </div>
              </div>
            </>
          )}

          {tab === 'menu' && (
            <>
              {cfg.products.map((p) => (
                <div key={p.id} className="space-y-2 rounded-lg border border-neutral-200 bg-white p-3">
                  <div className="flex items-start gap-2">
                    <input className={`${input} font-semibold`} value={p.name} onChange={(e) => patchProduct(p.id, { name: e.target.value })} />
                    <button onClick={() => set((d) => void (d.products = d.products.filter((x) => x.id !== p.id)))} className="p-1.5 text-neutral-400 hover:text-red-600" aria-label={`Eliminar ${p.name}`}>
                      <Trash2 size={15} />
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <span className="mb-0.5 block text-[10px] uppercase text-neutral-500">Precio (COP)</span>
                      <input className={input} inputMode="numeric" value={p.price} onChange={(e) => patchProduct(p.id, { price: Number(e.target.value.replace(/\D/g, '')) })} />
                    </div>
                    <div>
                      <span className="mb-0.5 block text-[10px] uppercase text-neutral-500">Categoría</span>
                      <input className={input} list={"cats-list"} value={p.category} onChange={(e) => patchProduct(p.id, { category: e.target.value })} />
                    </div>
                  </div>
                  <Text area value={p.description} onChange={(v) => patchProduct(p.id, { description: v })} />
                  <ImageField label="Foto" value={p.image} max={900} onChange={(v) => patchProduct(p.id, { image: v })} />
                </div>
              ))}
              <datalist id={"cats-list"}>
                {cats.map((c) => (
                  <option key={c} value={c} />
                ))}
              </datalist>
              <button
                onClick={() =>
                  set((d) =>
                    void d.products.push({
                      id: uid(),
                      category: cats[0] ?? 'Menú',
                      name: 'Nuevo producto',
                      description: 'Describe el producto aquí.',
                      price: 15000,
                      image: d.products[0]?.image ?? '',
                    }),
                  )
                }
                className="flex w-full items-center justify-center gap-1 rounded-lg border-2 border-dashed border-neutral-300 py-2.5 text-[13px] font-semibold text-neutral-700 hover:border-neutral-900"
              >
                <Plus size={15} /> Agregar producto
              </button>
            </>
          )}

          {tab === 'images' && (
            <>
              {Object.keys(cfg.images).map((k) => (
                <ImageField key={k} label={cfg.labels.images[k] ?? k} value={cfg.images[k]} onChange={(v) => set((d) => void (d.images[k] = v))} />
              ))}
              <div className="border-t border-neutral-200 pt-4">
                <span className="mb-2 block text-[11px] font-semibold uppercase tracking-wide text-neutral-500">Galería</span>
                <div className="space-y-3">
                  {cfg.gallery.map((g, i) => (
                    <div key={i} className="flex items-end gap-2">
                      <div className="flex-1">
                        <ImageField label={`Foto ${i + 1}`} value={g} max={1200} onChange={(v) => set((d) => void (d.gallery[i] = v))} />
                      </div>
                      <button onClick={() => set((d) => void d.gallery.splice(i, 1))} className="p-2 text-neutral-400 hover:text-red-600" aria-label="Quitar foto">
                        <Trash2 size={15} />
                      </button>
                    </div>
                  ))}
                  <button onClick={() => set((d) => void d.gallery.push(d.gallery[0] ?? ''))} className="flex items-center gap-1 text-[12px] font-semibold text-neutral-700 hover:text-black">
                    <Plus size={14} /> Agregar foto
                  </button>
                </div>
              </div>
            </>
          )}

          {tab === 'copy' &&
            Object.keys(cfg.copy).map((k) => (
              <Field key={k} label={cfg.labels.copy[k] ?? k}>
                <Text area value={cfg.copy[k]} onChange={(v) => set((d) => void (d.copy[k] = v))} />
              </Field>
            ))}
        </div>

        <footer className="space-y-2 border-t border-neutral-200 bg-white p-3">
          {storageError && <p className="text-[11px] text-amber-700">Las fotos subidas son muy pesadas para guardarlas. Los cambios siguen visibles pero se perderán al recargar.</p>}
          <div className="flex gap-2">
            <button
              disabled={!isModified}
              onClick={() => window.confirm('¿Restablecer la demostración a sus datos originales?') && reset()}
              className="flex flex-1 items-center justify-center gap-1.5 rounded-md border border-neutral-300 py-2 text-[13px] font-semibold text-neutral-800 hover:bg-neutral-100 disabled:opacity-40"
            >
              <RotateCcw size={14} /> Restablecer
            </button>
            <button onClick={onClose} className="flex-1 rounded-md bg-neutral-900 py-2 text-[13px] font-semibold text-white hover:bg-neutral-700">
              Listo
            </button>
          </div>
        </footer>
      </aside>
    </div>
  )
}
