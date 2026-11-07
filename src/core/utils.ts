import type { DemoConfig, Product } from './types'

const COP = new Intl.NumberFormat('es-CO', {
  style: 'currency',
  currency: 'COP',
  maximumFractionDigits: 0,
})

export const formatCOP = (n: number) => COP.format(Number.isFinite(n) ? n : 0)

/** Construye la URL base de una foto de Unsplash a partir de su ID. */
export const photo = (id: string) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&q=75`

/** Devuelve la URL con el ancho solicitado (solo para imágenes de Unsplash). */
export function sized(url: string, w: number): string {
  if (!url || !url.includes('images.unsplash.com')) return url
  try {
    const u = new URL(url)
    u.searchParams.set('w', String(w))
    return u.toString()
  } catch {
    return url
  }
}

const digits = (s: string) => s.replace(/\D/g, '')

/** Enlace wa.me con mensaje predeterminado (o uno propio). */
export function waLink(cfg: DemoConfig, text?: string): string {
  const msg = (text ?? cfg.contact.message).replaceAll('{nombre}', cfg.brand.name)
  return `https://wa.me/${digits(cfg.contact.whatsapp)}?text=${encodeURIComponent(msg)}`
}

export function waLinkProduct(cfg: DemoConfig, p: Product): string {
  return waLink(cfg, `Hola {nombre}, me interesa: ${p.name} (${formatCOP(p.price)}).`)
}

/** Muestra +57 300 000 0000 a partir de los dígitos. */
export function prettyPhone(raw: string): string {
  const d = digits(raw)
  if (d.startsWith('57') && d.length === 12) {
    return `+57 ${d.slice(2, 5)} ${d.slice(5, 8)} ${d.slice(8)}`
  }
  return d ? `+${d}` : ''
}

const fullAddress = (cfg: DemoConfig) => `${cfg.location.address}, ${cfg.location.city}`

export function mapEmbedSrc(cfg: DemoConfig): string {
  if (cfg.location.mapEmbed.trim()) return cfg.location.mapEmbed.trim()
  return `https://www.google.com/maps?q=${encodeURIComponent(fullAddress(cfg))}&output=embed`
}

export function mapsOpenUrl(cfg: DemoConfig): string {
  if (cfg.location.mapsUrl.trim()) return cfg.location.mapsUrl.trim()
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(fullAddress(cfg))}`
}

export function reviewsUrl(cfg: DemoConfig): string {
  return cfg.location.reviewsUrl.trim() || mapsOpenUrl(cfg)
}

export function categoriesOf(products: Product[]): string[] {
  return Array.from(new Set(products.map((p) => p.category)))
}

export const stars = (n: number) => Array.from({ length: 5 }, (_, i) => i < Math.round(n))

export function deepMerge<T>(base: T, over: unknown): T {
  if (Array.isArray(base) || typeof base !== 'object' || base === null) {
    return (over === undefined ? base : over) as T
  }
  if (typeof over !== 'object' || over === null || Array.isArray(over)) return base
  const out: Record<string, unknown> = { ...(base as Record<string, unknown>) }
  for (const k of Object.keys(over as object)) {
    out[k] = deepMerge((base as Record<string, unknown>)[k], (over as Record<string, unknown>)[k])
  }
  return out as T
}

/** Lee una imagen del equipo del usuario y la reduce para guardarla en localStorage. */
export function fileToDataUrl(file: File, maxSide = 1400, quality = 0.8): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onerror = () => reject(new Error('No se pudo leer el archivo'))
    reader.onload = () => {
      const img = new Image()
      img.onerror = () => reject(new Error('Imagen no válida'))
      img.onload = () => {
        const scale = Math.min(1, maxSide / Math.max(img.width, img.height))
        const c = document.createElement('canvas')
        c.width = Math.round(img.width * scale)
        c.height = Math.round(img.height * scale)
        c.getContext('2d')!.drawImage(img, 0, 0, c.width, c.height)
        resolve(c.toDataURL('image/jpeg', quality))
      }
      img.src = String(reader.result)
    }
    reader.readAsDataURL(file)
  })
}

export const YEAR = new Date().getFullYear()
