import { useEffect, useState } from 'react'
import { ArrowRight, ArrowLeft, MapPin } from 'lucide-react'
import { DemoShell } from '../../core/DemoShell'
import { useCfg } from '../../core/DemoContext'
import { DemoNote, Img, Logo, MapEmbed, Reveal } from '../../core/ui'
import { categoriesOf, formatCOP, prettyPhone, reviewsUrl, sized, waLink, waLinkProduct, YEAR } from '../../core/utils'
import { definition } from './config'
import './prem.css'

const WaIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M3 21l1.65-4.9A8.5 8.5 0 1 1 8 19.4L3 21z" />
    <path d="M9 8.5c0 3.5 2.5 6 6 6l1.2-1.4-2-1-.9.7c-.9-.4-1.7-1.2-2.1-2.1l.7-.9-1-2L9 8.5z" />
  </svg>
)

const NAV = [
  ['Propuesta', '#propuesta'],
  ['Carta', '#carta'],
  ['Ambiente', '#ambiente'],
  ['Galería', '#galeria'],
  ['Visítenos', '#visitenos'],
]

function Nav() {
  const cfg = useCfg()
  const [solid, setSolid] = useState(false)
  useEffect(() => {
    const h = () => setSolid(window.scrollY > 60)
    h()
    window.addEventListener('scroll', h, { passive: true })
    return () => window.removeEventListener('scroll', h)
  }, [])
  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-700 ${solid ? 'border-b border-line bg-paper/90 py-4 backdrop-blur-md' : 'py-7'}`}>
      <div className="mx-auto flex max-w-[1500px] items-center justify-between px-6 md:px-12">
        <a href="#inicio">
          <Logo className="f-display text-[26px] font-medium tracking-[0.42em] text-ink">{cfg.brand.logoMark}</Logo>
        </a>
        <nav className="hidden items-center gap-10 text-ink/80 lg:flex">
          {NAV.map(([l, h]) => (
            <a key={h} href={h} className="link">
              {l}
            </a>
          ))}
        </nav>
        <a href="#reservas" className="link text-p">
          Reservar
        </a>
      </div>
    </header>
  )
}

function Hero() {
  const cfg = useCfg()
  const { copy } = cfg
  return (
    <section id="inicio" className="relative flex min-h-[100svh] items-end overflow-hidden">
      <Img src={sized(cfg.images.hero, 2200)} alt="Plato de autor" eager className="slowzoom absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/30" />
      <div className="relative mx-auto w-full max-w-[1500px] px-6 pb-16 md:px-12 md:pb-20">
        <p className="eyebrow rise" style={{ animationDelay: '.3s' }}>
          {copy.heroEyebrow}
        </p>
        <h1 className="f-display rise mt-5 text-[clamp(52px,11vw,176px)] font-light leading-[0.9] text-white" style={{ animationDelay: '.5s' }}>
          {copy.heroLine1}
          <br />
          <em className="font-light italic text-a">{copy.heroLine2}</em>
        </h1>
        <div className="rise mt-10 flex flex-col justify-between gap-8 md:flex-row md:items-end" style={{ animationDelay: '.9s' }}>
          <p className="max-w-md text-lg font-light leading-relaxed text-white/75">{copy.heroText}</p>
          <div className="flex items-center gap-8">
            <a href="#reservas" className="btn">
              Reservar <ArrowRight size={15} />
            </a>
            <span className="cue hidden md:block" />
          </div>
        </div>
      </div>
    </section>
  )
}

function Proposal() {
  const cfg = useCfg()
  return (
    <section id="propuesta" className="light px-6 py-28 md:px-12 md:py-40">
      <div className="mx-auto grid max-w-[1500px] gap-16 lg:grid-cols-12">
        <Reveal className="lg:col-span-7">
          <p className="eyebrow">01 — La propuesta</p>
          <h2 className="f-display mt-8 text-[clamp(34px,4.8vw,76px)] font-light leading-[1.06]">{cfg.copy.proposalTitle}</h2>
        </Reveal>
        <Reveal delay={150} className="flex flex-col justify-end gap-8 lg:col-span-5">
          <Img src={sized(cfg.images.proposal, 1000)} alt="Plato principal" className="aspect-[4/3] w-full object-cover" />
          <p className="max-w-md text-[17px] font-light leading-[1.8] text-mute">{cfg.copy.proposalText}</p>
          <dl className="grid grid-cols-3 border-t border-line pt-6 text-sm">
            {[
              ['Carta', 'De temporada'],
              ['Producto', 'Local'],
              ['Servicio', 'A la mesa'],
            ].map(([a, b]) => (
              <div key={a}>
                <dt className="eyebrow !text-[10px]">{a}</dt>
                <dd className="f-display mt-1 text-xl">{b}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  )
}

function Carta() {
  const cfg = useCfg()
  const cats = categoriesOf(cfg.products)
  const [cat, setCat] = useState(cats[0])
  const active = cats.includes(cat) ? cat : cats[0]
  const list = cfg.products.filter((p) => p.category === active)
  const [hoverId, setHoverId] = useState<string | null>(null)
  const shown = list.find((p) => p.id === hoverId) ?? list[0]
  return (
    <section id="carta" className="px-6 py-28 md:px-12 md:py-40">
      <div className="mx-auto max-w-[1500px]">
        <Reveal className="flex flex-col justify-between gap-10 md:flex-row md:items-end">
          <div>
            <p className="eyebrow">02 — La carta</p>
            <h2 className="f-display mt-6 text-[clamp(44px,7vw,110px)] font-light leading-[0.95]">
              Platos <em className="italic text-a">destacados</em>
            </h2>
          </div>
          <div className="flex flex-wrap gap-x-8 gap-y-4 text-ink/70" role="tablist" aria-label="Categorías de la carta">
            {cats.map((c) => (
              <button
                key={c}
                role="tab"
                aria-selected={active === c}
                onClick={() => {
                  setCat(c)
                  setHoverId(null)
                }}
                className={`link pb-1 ${active === c ? 'on text-p' : ''}`}
              >
                {c}
              </button>
            ))}
          </div>
        </Reveal>

        <div className="mt-16 grid gap-16 lg:grid-cols-[1fr_minmax(0,440px)] xl:gap-28">
          <div key={active}>
            {list.map((p, k) => (
              <Reveal key={p.id} delay={k * 60}>
                <article className="row-line group py-8 md:py-10" onMouseEnter={() => setHoverId(p.id)} onFocus={() => setHoverId(p.id)}>
                  <div className="flex items-start gap-5 md:gap-10">
                    <span className="f-display pt-2 text-lg text-p">{String(k + 1).padStart(2, '0')}</span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-baseline justify-between gap-6">
                        <h3 className="f-display text-[clamp(28px,3.4vw,48px)] font-light leading-tight transition-colors group-hover:text-a">
                          {p.name}
                          {p.tag && <span className="eyebrow ml-4 align-middle !text-[10px]">{p.tag}</span>}
                        </h3>
                        <span className="f-display whitespace-nowrap text-xl text-ink/90 md:text-2xl">{formatCOP(p.price)}</span>
                      </div>
                      <p className="mt-3 max-w-xl text-base font-light leading-relaxed text-mute">{p.description}</p>
                      <Img src={sized(p.image, 700)} alt={p.name} className="mt-5 aspect-[16/10] w-full object-cover lg:hidden" />
                      <a href={waLinkProduct(cfg, p)} target="_blank" rel="noopener noreferrer" className="link mt-5 inline-block text-p">
                        Consultar
                      </a>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
          <aside className="relative hidden lg:block" aria-hidden>
            <div className="sticky top-28 aspect-[4/5] overflow-hidden bg-soft">
              {list.map((p) => (
                <Img key={p.id} src={sized(p.image, 900)} alt="" className={`absolute inset-0 h-full w-full object-cover transition-all duration-[900ms] ease-out ${shown?.id === p.id ? 'scale-100 opacity-100' : 'scale-110 opacity-0'}`} />
              ))}
              <div className="pointer-events-none absolute inset-3 border border-p/40" />
            </div>
          </aside>
        </div>
      </div>
    </section>
  )
}

function Experience() {
  const cfg = useCfg()
  return (
    <section id="ambiente" className="relative flex min-h-[90svh] items-end overflow-hidden">
      <Img src={sized(cfg.images.experience, 2000)} alt="Interior del restaurante" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-black/20" />
      <div className="relative mx-auto grid w-full max-w-[1500px] gap-14 px-6 pb-16 pt-40 md:px-12 md:pb-24 lg:grid-cols-2">
        <Reveal>
          <p className="eyebrow">03 — La experiencia</p>
          <h2 className="f-display mt-6 text-[clamp(38px,5.6vw,88px)] font-light leading-[1] text-white">{cfg.copy.experienceTitle}</h2>
        </Reveal>
        <Reveal delay={150} className="self-end">
          <p className="max-w-lg text-[17px] font-light leading-[1.8] text-white/75">{cfg.copy.experienceText}</p>
          <ul className="mt-8 grid grid-cols-3 gap-6 border-t border-white/20 pt-6 text-white/90">
            {['Cenas privadas', 'Celebraciones', 'Maridaje sin alcohol'].map((t) => (
              <li key={t} className="f-display text-lg leading-snug">
                {t}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}

const GAL = [
  'md:col-span-5 md:row-span-2',
  'md:col-span-4',
  'md:col-span-3 md:row-span-2',
  'md:col-span-4',
  'md:col-span-5',
  'md:col-span-4',
  'md:col-span-3',
]

function Gallery() {
  const cfg = useCfg()
  return (
    <section id="galeria" className="px-6 py-28 md:px-12 md:py-40">
      <div className="mx-auto max-w-[1500px]">
        <Reveal className="flex items-end justify-between">
          <div>
            <p className="eyebrow">04 — Galería</p>
            <h2 className="f-display mt-6 text-[clamp(44px,7vw,110px)] font-light leading-[0.95]">
              Instantes <em className="italic text-a">en mesa</em>
            </h2>
          </div>
        </Reveal>
        <div className="mt-16 grid auto-rows-[220px] grid-cols-2 gap-3 md:auto-rows-[200px] md:grid-cols-12 md:gap-4">
          {cfg.gallery.map((g, k) => (
            <Reveal key={k} delay={(k % 3) * 80} className={`gal relative overflow-hidden ${GAL[k % GAL.length]} ${k === 0 ? 'col-span-2 row-span-2' : ''}`}>
              <Img src={sized(g, 1000)} alt={`Galería ${k + 1}`} className="h-full w-full object-cover" />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function Reviews() {
  const cfg = useCfg()
  const [idx, setIdx] = useState(0)
  const n = cfg.reviews.length
  const r = cfg.reviews[((idx % n) + n) % n]
  return (
    <section id="resenas" className="light px-6 py-28 md:px-12 md:py-40">
      <div className="mx-auto grid max-w-[1500px] gap-14 lg:grid-cols-12">
        <Reveal className="lg:col-span-3">
          <p className="eyebrow">05 — Reseñas</p>
          <p className="f-display mt-8 text-8xl font-light leading-none">{cfg.rating.score.toFixed(1)}</p>
          <p className="mt-3 text-sm tracking-wide text-mute">{cfg.rating.count} reseñas de ejemplo</p>
        </Reveal>
        <div className="lg:col-span-9">
          {r && (
            <div key={r.id} className="rise" style={{ animationDuration: '.9s' }}>
              <blockquote className="f-display text-[clamp(28px,3.8vw,58px)] font-light leading-[1.15]">“{r.text}”</blockquote>
              <p className="mt-8 text-sm uppercase tracking-[0.22em]">
                {r.author} <span className="text-mute">· {r.when}</span>
              </p>
            </div>
          )}
          <div className="mt-14 flex flex-wrap items-center gap-8 border-t border-line pt-8">
            <div className="flex items-center gap-4">
              <button onClick={() => setIdx(idx - 1)} className="grid h-12 w-12 place-items-center border border-line transition hover:border-ink" aria-label="Reseña anterior">
                <ArrowLeft size={16} />
              </button>
              <button onClick={() => setIdx(idx + 1)} className="grid h-12 w-12 place-items-center border border-line transition hover:border-ink" aria-label="Siguiente reseña">
                <ArrowRight size={16} />
              </button>
              <span className="f-display text-lg text-mute">
                {String((((idx % n) + n) % n) + 1).padStart(2, '0')} / {String(n).padStart(2, '0')}
              </span>
            </div>
            <a href={reviewsUrl(cfg)} target="_blank" rel="noopener noreferrer" className="btn !py-3.5">
              Ver reseñas en Google Maps
            </a>
          </div>
          <DemoNote className="mt-5" />
        </div>
      </div>
    </section>
  )
}

function Visit() {
  const cfg = useCfg()
  return (
    <section id="visitenos" className="px-6 py-28 md:px-12 md:py-40">
      <div className="mx-auto grid max-w-[1500px] gap-16 lg:grid-cols-12">
        <Reveal className="lg:col-span-5">
          <p className="eyebrow">06 — Visítenos</p>
          <h2 className="f-display mt-6 text-[clamp(40px,5.4vw,84px)] font-light leading-[0.98]">
            Horarios <em className="italic text-a">y ubicación</em>
          </h2>
          <div className="mt-12 space-y-10">
            <div>
              <p className="eyebrow !text-[10px]">Dirección</p>
              <p className="f-display mt-2 text-2xl">{cfg.location.address}</p>
              <p className="text-mute">{cfg.location.city}</p>
              <p className="mt-1 text-xs text-mute/70">Ubicación de demostración</p>
            </div>
            <div>
              <p className="eyebrow !text-[10px]">Horario</p>
              <dl className="mt-3">
                {cfg.hours.map((h) => (
                  <div key={h.label} className="flex justify-between gap-6 border-b border-line py-3">
                    <dt className="font-light">{h.label}</dt>
                    <dd className="f-display text-lg text-a">{h.time}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div>
              <p className="eyebrow !text-[10px]">WhatsApp</p>
              <p className="f-display mt-2 text-2xl">{prettyPhone(cfg.contact.whatsapp)}</p>
              <p className="text-xs text-mute/70">Número de demostración</p>
            </div>
          </div>
        </Reveal>
        <Reveal delay={120} className="map-dark lg:col-span-7">
          <MapEmbed className="aspect-[4/3] border border-line lg:aspect-auto lg:h-[560px]" buttonClassName="btn w-fit" buttonLabel="Abrir en Google Maps" />
        </Reveal>
      </div>
    </section>
  )
}

function Reserve() {
  const cfg = useCfg()
  const [f, setF] = useState({ name: '', people: '2', date: '', time: '8:00 pm' })
  const msg = `Hola ${cfg.brand.name}, quisiera reservar${f.name ? ` a nombre de ${f.name}` : ''} para ${f.people} personas${f.date ? ` el ${f.date}` : ''} a las ${f.time}.`
  const set = (k: keyof typeof f) => (e: { target: { value: string } }) => setF({ ...f, [k]: e.target.value })
  return (
    <section id="reservas" className="border-t border-line px-6 py-28 md:px-12 md:py-40">
      <div className="mx-auto grid max-w-[1500px] gap-16 lg:grid-cols-12">
        <Reveal className="lg:col-span-6">
          <p className="eyebrow">07 — Reservas</p>
          <h2 className="f-display mt-6 text-[clamp(44px,7vw,110px)] font-light leading-[0.95]">{cfg.copy.reserveTitle}</h2>
          <p className="mt-8 max-w-sm font-light leading-relaxed text-mute">{cfg.copy.reserveText}</p>
        </Reveal>
        <Reveal delay={120} className="lg:col-span-6">
          <form
            className="grid gap-x-10 gap-y-3 sm:grid-cols-2"
            onSubmit={(e) => {
              e.preventDefault()
              window.open(waLink(cfg, msg), '_blank', 'noopener')
            }}
          >
            <input className="field sm:col-span-2" placeholder="Nombre" value={f.name} onChange={set('name')} aria-label="Nombre" />
            <select className="field" value={f.people} onChange={set('people')} aria-label="Personas">
              {[1, 2, 3, 4, 5, 6, 8, 10].map((n) => (
                <option key={n} value={n}>
                  {n} {n === 1 ? 'persona' : 'personas'}
                </option>
              ))}
            </select>
            <input type="date" className="field" value={f.date} onChange={set('date')} aria-label="Fecha" />
            <select className="field sm:col-span-2" value={f.time} onChange={set('time')} aria-label="Hora">
              {['12:30 pm', '1:30 pm', '7:00 pm', '8:00 pm', '9:00 pm'].map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
            <button type="submit" className="btn mt-8 w-fit">
              <WaIcon size={18} /> Solicitar reserva
            </button>
          </form>
        </Reveal>
      </div>
    </section>
  )
}

function Footer() {
  const cfg = useCfg()
  return (
    <footer className="overflow-hidden border-t border-line px-6 pb-24 pt-14 md:px-12">
      <p className="f-display select-none text-center text-[clamp(64px,19vw,300px)] font-light leading-[0.85] tracking-[0.12em] text-ink/10">{cfg.brand.logoMark}</p>
      <p className="mt-8 flex flex-wrap items-center justify-center gap-3 text-center text-xs uppercase tracking-[0.24em] text-mute">
        <MapPin size={13} /> {cfg.location.city} · © {YEAR} {cfg.brand.name}
      </p>
    </footer>
  )
}

export default function Page() {
  return (
    <DemoShell def={definition} theme="t-prem" waClass="wa-prem">
      <Nav />
      <Hero />
      <Proposal />
      <Carta />
      <Experience />
      <Gallery />
      <Reviews />
      <Visit />
      <Reserve />
      <Footer />
    </DemoShell>
  )
}
