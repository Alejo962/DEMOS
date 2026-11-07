import { lazy, Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Home from './home/Home'

const ComidasRapidas = lazy(() => import('./demos/comidas-rapidas/Page'))
const ParrillasLlaneras = lazy(() => import('./demos/parrillas-llaneras/Page'))
const TradicionalCafeterias = lazy(() => import('./demos/tradicional-cafeterias/Page'))
const PremiumGastrobares = lazy(() => import('./demos/premium-gastrobares/Page'))

export default function App() {
  return (
    <Suspense fallback={<div style={{ minHeight: '100vh', background: '#0b0b0c' }} />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/demos/comidas-rapidas" element={<ComidasRapidas />} />
        <Route path="/demos/parrillas-llaneras" element={<ParrillasLlaneras />} />
        <Route path="/demos/tradicional-cafeterias" element={<TradicionalCafeterias />} />
        <Route path="/demos/premium-gastrobares" element={<PremiumGastrobares />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  )
}
