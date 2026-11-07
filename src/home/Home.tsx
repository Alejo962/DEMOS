import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { photo, sized } from '../core/utils'
import './home.css'

const DEMOS = [
  {
    to: '/demos/comidas-rapidas',
    n: '01',
    title: 'Comidas rápidas',
    desc: 'Hamburguesas, perros, salchipapas y pizzas. Urbano, intenso y juvenil.',
    img: photo('1553979459-d2229ba7433b'),
    accent: '#e11d2e',
  },
  {
    to: '/demos/parrillas-llaneras',
    n: '02',
    title: 'Parrillas y llaneras',
    desc: 'Carnes a la parrilla y parrilladas familiares. Rústico, cálido y abundante.',
    img: photo('1529193591184-b1d58069ecdd'),
    accent: '#c2603a',
  },
  {
    to: '/demos/tradicional-cafeterias',
    n: '03',
    title: 'Tradicional y cafeterías',
    desc: 'Desayunos, almuerzos caseros y postres. Luminoso, artesanal y cercano.',
    img: photo('1547592180-85f173990554'),
    accent: '#7a8450',
  },
  {
    to: '/demos/premium-gastrobares',
    n: '04',
    title: 'Premium y gastrobares',
    desc: 'Alta cocina contemporánea. Editorial, minimalista y sofisticado.',
    img: photo('1519708227418-c8fd9a32b7a2'),
    accent: '#c9a96a',
  },
]

export default function Home() {
  return (
    <main className="home">
      <header className="home-head">
        <p className="home-kicker">Sincelejo · Sucre</p>
        <h1>
          Así podría verse <em>tu restaurante</em> en internet
        </h1>
        <p className="home-sub">Cuatro demostraciones de página web, cada una con su propia identidad. Elige un estilo para ver cómo luce.</p>
      </header>

      <section className="home-grid" aria-label="Demostraciones disponibles">
        {DEMOS.map((d) => (
          <Link key={d.to} to={d.to} className="home-card" style={{ ['--ac' as string]: d.accent }}>
            <img src={sized(d.img, 900)} alt="" loading={d.n === '01' ? 'eager' : 'lazy'} decoding="async" />
            <div className="home-shade" />
            <span className="home-n">{d.n}</span>
            <div className="home-info">
              <h2>{d.title}</h2>
              <p>{d.desc}</p>
              <span className="home-btn">
                Abrir demostración <ArrowUpRight size={16} />
              </span>
            </div>
          </Link>
        ))}
      </section>

      <footer className="home-foot">Los nombres, precios, reseñas y direcciones de las demostraciones son ficticios.</footer>
    </main>
  )
}
