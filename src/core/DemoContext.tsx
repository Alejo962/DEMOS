import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import type { DemoConfig } from './types'
import { deepMerge } from './utils'

interface Ctx {
  slug: string
  cfg: DemoConfig
  defaults: DemoConfig
  update: (fn: (draft: DemoConfig) => DemoConfig) => void
  reset: () => void
  storageError: boolean
  isModified: boolean
}

const DemoCtx = createContext<Ctx | null>(null)
const key = (slug: string) => `demo:v1:${slug}`

function load(slug: string, defaults: DemoConfig): DemoConfig {
  try {
    const raw = localStorage.getItem(key(slug))
    if (raw) return deepMerge(defaults, JSON.parse(raw))
  } catch {
    /* almacenamiento no disponible o corrupto: usar valores originales */
  }
  return defaults
}

export function DemoProvider({ slug, defaults, children }: { slug: string; defaults: DemoConfig; children: ReactNode }) {
  const [cfg, setCfg] = useState<DemoConfig>(() => load(slug, defaults))
  const [storageError, setStorageError] = useState(false)

  useEffect(() => {
    try {
      if (cfg === defaults) localStorage.removeItem(key(slug))
      else localStorage.setItem(key(slug), JSON.stringify(cfg))
      setStorageError(false)
    } catch {
      setStorageError(true)
    }
  }, [cfg, defaults, slug])

  const update = useCallback((fn: (d: DemoConfig) => DemoConfig) => setCfg((c) => fn(structuredClone(c))), [])
  const reset = useCallback(() => setCfg(defaults), [defaults])

  const value = useMemo<Ctx>(
    () => ({ slug, cfg, defaults, update, reset, storageError, isModified: cfg !== defaults }),
    [slug, cfg, defaults, update, reset, storageError],
  )
  return <DemoCtx.Provider value={value}>{children}</DemoCtx.Provider>
}

export function useDemo() {
  const c = useContext(DemoCtx)
  if (!c) throw new Error('useDemo debe usarse dentro de DemoProvider')
  return c
}

/** Atajo: solo la configuración actual. */
export const useCfg = () => useDemo().cfg
