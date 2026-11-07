import { useEffect, useRef, useState, type ElementType, type ReactNode } from 'react'
import { MapPin, ExternalLink } from 'lucide-react'
import { useCfg } from './DemoContext'
import { mapEmbedSrc, mapsOpenUrl } from './utils'

/** Aparición suave al hacer scroll. Respeta prefers-reduced-motion vía CSS. */
export function Reveal({
  children,
  className = '',
  delay = 0,
  as: Tag = 'div',
}: {
  children: ReactNode
  className?: string
  delay?: number
  as?: ElementType
}) {
  const ref = useRef<HTMLElement>(null)
  const [shown, setShown] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el || typeof IntersectionObserver === 'undefined') {
      setShown(true)
      return
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShown(true)
          io.disconnect()
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.05 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return (
    <Tag ref={ref} className={`reveal ${shown ? 'in' : ''} ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </Tag>
  )
}

/** Logo de la marca: imagen si existe, de lo contrario el contenido tipográfico dado. */
export function Logo({ className = '', imgClassName = 'h-9 w-auto', children }: { className?: string; imgClassName?: string; children: ReactNode }) {
  const { brand } = useCfg()
  if (brand.logoUrl) return <img src={brand.logoUrl} alt={brand.name} className={imgClassName} />
  return <span className={className}>{children}</span>
}

/** Imagen con carga diferida y marcador de color mientras llega. */
export function Img({ src, alt, className = '', eager = false }: { src: string; alt: string; className?: string; eager?: boolean }) {
  return (
    <img
      src={src}
      alt={alt}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      className={className}
      onError={(e) => {
        e.currentTarget.style.visibility = 'hidden'
      }}
    />
  )
}

/** Mapa incrustado (iframe sin clave de API) + botón para abrir Google Maps. */
export function MapEmbed({ className = '', buttonClassName = '', buttonLabel = 'Abrir en Google Maps' }: { className?: string; buttonClassName?: string; buttonLabel?: string }) {
  const cfg = useCfg()
  return (
    <div className="flex flex-col gap-4">
      <div className={`relative overflow-hidden ${className}`}>
        <iframe
          title={`Mapa de ${cfg.brand.name}`}
          src={mapEmbedSrc(cfg)}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="absolute inset-0 h-full w-full border-0"
          allowFullScreen
        />
      </div>
      <a href={mapsOpenUrl(cfg)} target="_blank" rel="noopener noreferrer" className={buttonClassName}>
        <MapPin size={18} /> {buttonLabel} <ExternalLink size={15} className="opacity-70" />
      </a>
    </div>
  )
}

export function DemoNote({ className = '' }: { className?: string }) {
  return <p className={`text-xs opacity-60 ${className}`}>Reseñas y calificaciones de ejemplo, contenido demostrativo. No provienen de Google.</p>
}
