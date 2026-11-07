import { useEffect, useState, type CSSProperties, type ReactNode } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ArrowLeft, MessageCircle, Settings2 } from 'lucide-react'
import { DemoProvider, useCfg } from './DemoContext'
import type { DemoDefinition } from './types'
import { waLink } from './utils'
import { Customizer } from './Customizer'

function Inner({ theme, waClass, waLabel, children }: { theme: string; waClass?: string; waLabel?: string; children: ReactNode }) {
  const cfg = useCfg()
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  // Atajo oculto para abrir el panel: Ctrl + Shift + E
  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'e') {
        e.preventDefault()
        setOpen((o) => !o)
      }
    }
    window.addEventListener('keydown', h)
    return () => window.removeEventListener('keydown', h)
  }, [])

  useEffect(() => {
    document.title = `${cfg.brand.name} · ${cfg.brand.tagline}`
  }, [cfg.brand.name, cfg.brand.tagline])

  const vars = { '--p': cfg.colors.primary, '--a': cfg.colors.accent } as CSSProperties

  return (
    <div className={`theme ${theme}`} style={vars}>
      {children}

      <a
        href={waLink(cfg)}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Escribir por WhatsApp"
        className={waClass ?? 'wa-float'}
      >
        <MessageCircle size={26} strokeWidth={2.2} />
        {waLabel && <span>{waLabel}</span>}
      </a>

      <div className="demo-badge" role="note">
        <Link to="/" title="Volver al selector de demostraciones">
          <ArrowLeft size={13} /> Demos
        </Link>
        <span>DEMOSTRACIÓN</span>
        <button type="button" onClick={() => setOpen(true)} aria-label="Personalizar demostración" className="demo-gear">
          <Settings2 size={13} />
        </button>
      </div>

      {open && <Customizer onClose={() => setOpen(false)} />}
    </div>
  )
}

export function DemoShell({
  def,
  theme,
  waClass,
  waLabel,
  children,
}: {
  def: DemoDefinition
  theme: string
  waClass?: string
  waLabel?: string
  children: ReactNode
}) {
  return (
    <DemoProvider slug={def.slug} defaults={def.defaults}>
      <Inner theme={theme} waClass={waClass} waLabel={waLabel}>
        {children}
      </Inner>
    </DemoProvider>
  )
}
