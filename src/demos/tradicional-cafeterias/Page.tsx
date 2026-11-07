import { useRef, useState } from 'react'
import { ArrowLeft, ArrowRight, CakeSlice, Clock, Coffee, Leaf, MapPin, MessageCircle, Phone, Soup, Sprout, Star, Wheat } from 'lucide-react'
import { DemoShell } from '../../core/DemoShell'
import { useCfg } from '../../core/DemoContext'
import { DemoNote, Img, Logo, MapEmbed, Reveal } from '../../core/ui'
import { categoriesOf, formatCOP, prettyPhone, reviewsUrl, sized, stars, waLink, waLinkProduct, YEAR } from '../../core/utils'
import { definition } from './config'
import './home.css'

const NAV = [
  ['Nosotros', '#nosotros'],
  ['Menú', '#menu'],
  ['Especialidades', '#especialidades'],
  ['Ingredientes', '#ingredientes'],
  ['Reseñas', '#resenas'],
  ['Visítanos', '#visitanos'],
]

function LeafSprig({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 120" className={className} fill="none" aria-hidden>
      <path d="M60 112C60 80 60 50 60 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      {[24, 44, 64, 84].map((y, k) => (
        <g key={y}>
          <path d={`M60 ${y + 14}C${42 - k * 2} ${y + 10} ${34 - k * 2} ${y - 4} ${32 - k * 2} ${y - 12}C${48 - k * 2} ${y - 10} ${58} ${y + 2} 60 ${y + 14}Z`} fill="currentColor" opacity=".85" />
          <path d={`M60 ${y + 4}C${78 + k * 2} ${y} ${86 + k * 2} ${y - 14} ${88 + k * 2} ${y - 22}C${72 + k * 2} ${y - 20} ${62} ${y - 8} 60 ${y + 4}Z`} fill="currentColor" opacity=".6" />
        </g>
      ))}
    </svg>
  )
}

function Nav() {
  const cfg = useCfg()
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-paper/90 backdrop-blur">
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-5 md:px-8">
        <a href="#inicio" className="flex items-center gap-2">
          <Logo className="f-display flex items-center gap-2 text-2xl font-semibold text-p">
            <Leaf size={22} className="text-a" /> {cfg.brand.logoMark}
          </Logo>
        </a>
        <nav className="hidden items-center gap-7 xl:flex">
          {NAV.map(([l, h]) => (
            <a key={h} href={h} className="text-[15px] font-semibold text-ink/75 transition hover:text-a">
              {l}
            </a>
          ))}
        </nav>
        <a href={waLink(cfg)} target="_blank" rel="noopener noreferrer" className="btn btn-olive !px-5 !py-2.5 !text-sm">
          <MessageCircle size={16} /> Escríbenos
        </a>
      </div>
    </header>
  )
}

function Hero() {
  const cfg = useCfg()
  const { copy } = cfg
  return (
    <section id="inicio" className="relative overflow-hidden px-5 pb-20 pt-12 md:px-8 md:pt-16 lg:pb-28">
      <div className="absolute -left-24 top-24 h-72 w-72 rounded-full bg-sun/50 blur-2xl" />
      <LeafSprig className="absolute bottom-6 left-3 hidden h-40 w-40 rotate-[-18deg] text-p/25 md:block" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
        <div>
          <p className="mb-5 inline-flex items-center gap-2 rounded-full bg-soft px-4 py-2 text-sm font-bold text-p">
            <Sprout size={16} /> {copy.heroEyebrow}
          </p>
          <h1 className="f-display text-[clamp(42px,6.2vw,84px)] font-semibold leading-[1.02] tracking-tight">
            {copy.heroLine1}
            <br />
            <em className="font-normal text-a">{copy.heroLine2}</em>
          </h1>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-mute">{copy.heroText}</p>
          <div className="mt-9 flex flex-wrap gap-4">
            <a href="#menu" className="btn btn-olive">
              Ver el menú
            </a>
            <a href={waLink(cfg)} target="_blank" rel="noopener noreferrer" className="btn btn-line">
              <MessageCircle size={18} /> Escribir por WhatsApp
            </a>
          </div>
          <dl className="mt-10 flex gap-10">
            <div>
              <dt className="text-sm text-mute">Calificación</dt>
              <dd className="f-display flex items-center gap-1.5 text-3xl font-semibold">
                <Star size={22} className="text-a" fill="currentColor" /> {cfg.rating.score.toFixed(1)}
              </dd>
            </div>
            <div>
              <dt className="text-sm text-mute">Almuerzo del día</dt>
              <dd className="f-display text-3xl font-semibold">{formatCOP(cfg.products.find((p) => p.tag === 'Menú del día')?.price ?? Math.min(...cfg.products.map((p) => p.price)))}</dd>
            </div>
          </dl>
        </div>
        <div className="relative mx-auto w-full max-w-[520px]">
          <div className="blob absolute -inset-4 bg-sun/70" />
          <div className="arch relative aspect-[4/5] border-[10px] border-paper shadow-2xl">
            <Img src={sized(cfg.images.hero, 1000)} alt="Plato casero" eager className="h-full w-full object-cover" />
          </div>
          <div className="floaty absolute -bottom-6 -left-4 h-32 w-32 overflow-hidden rounded-full border-[6px] border-paper shadow-xl md:-left-12 md:h-40 md:w-40">
            <Img src={sized(cfg.images.heroSmall, 400)} alt="Café" eager className="h-full w-full object-cover" />
          </div>
          <div className="absolute -right-2 top-10 rotate-6 rounded-2xl bg-a px-4 py-3 text-center text-white shadow-lg md:-right-8">
            <p className="text-[11px] font-bold uppercase tracking-wider opacity-90">Desayunos desde</p>
            <p className="f-display text-xl font-semibold">6:30 am</p>
          </div>
        </div>
      </div>
    </section>
  )
}

function About() {
  const cfg = useCfg()
  const items = [
    { Icon: Coffee, t: 'Desayunos', d: 'Arepas, huevos, pancakes y café recién hecho.' },
    { Icon: Soup, t: 'Almuerzos caseros', d: 'Sopas y seco del día con sabor de hogar.' },
    { Icon: CakeSlice, t: 'Postres y café', d: 'Tortas, dulces y bebidas para la tarde.' },
  ]
  return (
    <section id="nosotros" className="px-5 py-20 md:px-8 md:py-28">
      <Reveal className="mx-auto max-w-3xl text-center">
        <LeafSprig className="mx-auto mb-4 h-14 w-14 text-p" />
        <h2 className="f-display text-[clamp(30px,4.2vw,52px)] font-semibold leading-tight">{cfg.copy.aboutTitle}</h2>
        <p className="mt-5 text-lg leading-relaxed text-mute">{cfg.copy.aboutText}</p>
      </Reveal>
      <div className="mx-auto mt-14 grid max-w-5xl gap-6 md:grid-cols-3">
        {items.map(({ Icon, t, d }, k) => (
          <Reveal key={t} delay={k * 90}>
            <div className="h-full rounded-[28px] bg-soft p-8 text-center transition hover:-translate-y-1">
              <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-paper text-a">
                <Icon size={26} />
              </span>
              <h3 className="f-display mt-5 text-xl font-semibold">{t}</h3>
              <p className="mt-2 text-mute">{d}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

function Menu() {
  const cfg = useCfg()
  const cats = categoriesOf(cfg.products)
  const [cat, setCat] = useState(cats[0])
  const active = cats.includes(cat) ? cat : cats[0]
  const list = cfg.products.filter((p) => p.category === active)
  return (
    <section id="menu" className="dots bg-soft/60 px-5 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal className="text-center">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-a">Nuestro menú</p>
          <h2 className="f-display mt-3 text-[clamp(32px,4.6vw,58px)] font-semibold">Lo que servimos hoy</h2>
        </Reveal>
        <div className="mt-10 flex flex-wrap justify-center gap-2.5" role="tablist" aria-label="Categorías">
          {cats.map((c) => (
            <button
              key={c}
              role="tab"
              aria-selected={active === c}
              onClick={() => setCat(c)}
              className={`rounded-full px-5 py-2.5 text-[15px] font-bold transition ${active === c ? 'bg-p text-white shadow-md' : 'bg-paper text-ink/80 hover:bg-sun/60'}`}
            >
              {c}
            </button>
          ))}
        </div>
        <div key={active} className="mt-12 grid gap-5 md:grid-cols-2">
          {list.map((p, k) => (
            <Reveal key={p.id} delay={k * 60}>
              <article className="flex h-full gap-5 rounded-[26px] bg-paper p-4 shadow-[0_6px_24px_-12px_rgb(58_51_32/.25)] transition hover:shadow-[0_14px_30px_-14px_rgb(58_51_32/.35)]">
                <Img src={sized(p.image, 400)} alt={p.name} className="h-28 w-28 shrink-0 rounded-[20px] object-cover sm:h-36 sm:w-36" />
                <div className="flex min-w-0 flex-1 flex-col py-1">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="f-display text-[19px] font-semibold leading-snug">{p.name}</h3>
                    <span className="f-display whitespace-nowrap text-lg font-semibold text-a">{formatCOP(p.price)}</span>
                  </div>
                  {p.tag && <span className="mt-1 w-fit rounded-full bg-sun/70 px-2.5 py-0.5 text-xs font-bold text-ink/80">{p.tag}</span>}
                  <p className="mt-2 flex-1 text-[15px] leading-relaxed text-mute">{p.description}</p>
                  <a href={waLinkProduct(cfg, p)} target="_blank" rel="noopener noreferrer" className="mt-2 flex w-fit items-center gap-1.5 text-sm font-bold text-p hover:text-a">
                    <MessageCircle size={14} /> Preguntar por WhatsApp
                  </a>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function Specialties() {
  const cfg = useCfg()
  const list = cfg.products.filter((p) => p.tag === 'Especialidad').slice(0, 3)
  const items = list.length ? list : cfg.products.slice(0, 3)
  return (
    <section id="especialidades" className="relative overflow-hidden bg-p px-5 py-20 text-[#fbf6e9] md:px-8 md:py-28">
      <LeafSprig className="absolute -right-6 top-6 h-48 w-48 rotate-12 text-white/10" />
      <div className="relative mx-auto max-w-6xl">
        <Reveal className="text-center">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-sun">De la casa</p>
          <h2 className="f-display mt-3 text-[clamp(32px,4.6vw,58px)] font-semibold">Nuestras especialidades</h2>
        </Reveal>
        <div className="mt-16 grid gap-x-8 gap-y-16 md:grid-cols-3">
          {items.map((p, k) => (
            <Reveal key={p.id} delay={k * 100} className={k === 1 ? 'md:mt-10' : ''}>
              <article className="text-center">
                <div className="arch mx-auto aspect-[4/5] w-full max-w-[300px] border-[6px] border-[#fbf6e9]/90 shadow-2xl">
                  <Img src={sized(p.image, 700)} alt={p.name} className="h-full w-full object-cover transition duration-700 hover:scale-105" />
                </div>
                <h3 className="f-display mt-6 text-2xl font-semibold">{p.name}</h3>
                <p className="mx-auto mt-2 max-w-xs text-[15px] leading-relaxed text-[#fbf6e9]/80">{p.description}</p>
                <p className="f-display mt-3 text-xl text-sun">{formatCOP(p.price)}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function Ingredients() {
  const cfg = useCfg()
  const steps = [
    ['Ingredientes frescos', 'Verduras, tubérculos y carnes de proveedores de la región, cada mañana.'],
    ['Sofrito sin afán', 'Cebolla, ajo y tomate cocidos lento: la base de cada guiso.'],
    ['Fuego bajo', 'Sopas y arroces a su ritmo, hasta que el sabor se asienta.'],
    ['Servido caliente', 'De la olla al plato, con la sazón de la casa.'],
  ]
  return (
    <section id="ingredientes" className="px-5 py-20 md:px-8 md:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-2 lg:gap-24">
        <Reveal className="relative mx-auto w-full max-w-[560px]">
          <div className="blob absolute -inset-5 bg-sun/60" />
          <Img src={sized(cfg.images.ingredients, 1000)} alt="Preparación de la comida" className="relative aspect-square w-full rounded-[40px] object-cover shadow-xl" />
          <div className="absolute -bottom-8 left-4 flex gap-3 sm:left-8">
            {[cfg.images.ing1, cfg.images.ing2, cfg.images.ing3].map((s, k) => (
              <Img key={k} src={sized(s, 300)} alt="" className={`h-20 w-20 rounded-full border-4 border-paper object-cover shadow-lg sm:h-24 sm:w-24 ${k === 1 ? '-mt-4' : ''}`} />
            ))}
          </div>
        </Reveal>
        <Reveal>
          <p className="flex items-center gap-2 text-sm font-bold uppercase tracking-[0.2em] text-a">
            <Wheat size={18} /> Ingredientes y preparación
          </p>
          <h2 className="f-display mt-3 text-[clamp(30px,4vw,52px)] font-semibold leading-tight">{cfg.copy.ingredientsTitle}</h2>
          <p className="mt-4 max-w-lg text-lg leading-relaxed text-mute">{cfg.copy.ingredientsText}</p>
          <ol className="mt-9 space-y-6">
            {steps.map(([t, d], k) => (
              <li key={t} className="flex gap-5">
                <span className="f-display grid h-11 w-11 shrink-0 place-items-center rounded-full bg-p text-lg font-semibold text-white">{k + 1}</span>
                <div>
                  <h3 className="f-display text-xl font-semibold">{t}</h3>
                  <p className="text-mute">{d}</p>
                </div>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </section>
  )
}

function Gallery() {
  const cfg = useCfg()
  const ref = useRef<HTMLDivElement>(null)
  const go = (d: number) => ref.current?.scrollBy({ left: d * Math.min(440, ref.current.clientWidth * 0.8), behavior: 'smooth' })
  return (
    <section id="galeria" className="bg-soft/60 py-20 md:py-28">
      <div className="mx-auto flex max-w-7xl items-end justify-between px-5 md:px-8">
        <Reveal>
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-a">Galería</p>
          <h2 className="f-display mt-3 text-[clamp(30px,4.2vw,52px)] font-semibold">Un vistazo a la mesa</h2>
        </Reveal>
        <div className="hidden gap-3 sm:flex">
          <button onClick={() => go(-1)} className="grid h-12 w-12 place-items-center rounded-full border-2 border-p text-p transition hover:bg-p hover:text-white" aria-label="Anterior">
            <ArrowLeft size={20} />
          </button>
          <button onClick={() => go(1)} className="grid h-12 w-12 place-items-center rounded-full border-2 border-p text-p transition hover:bg-p hover:text-white" aria-label="Siguiente">
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
      <div ref={ref} className="scroll-x mt-10 flex gap-5 overflow-x-auto px-5 pb-4 md:px-8 lg:px-[max(2rem,calc((100vw-80rem)/2+2rem))]">
        {cfg.gallery.map((g, k) => (
          <figure key={k} className={`group relative shrink-0 overflow-hidden rounded-[30px] ${k % 2 ? 'mt-10 h-[300px] w-[240px] md:h-[360px] md:w-[300px]' : 'h-[340px] w-[260px] md:h-[420px] md:w-[340px]'}`}>
            <Img src={sized(g, 800)} alt={`Galería ${k + 1}`} className="h-full w-full object-cover transition duration-700 group-hover:scale-110" />
            <div className="absolute inset-0 bg-p/0 transition group-hover:bg-p/20" />
          </figure>
        ))}
      </div>
    </section>
  )
}

function Reviews() {
  const cfg = useCfg()
  return (
    <section id="resenas" className="px-5 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-a">Reseñas</p>
            <h2 className="f-display mt-3 text-[clamp(30px,4.2vw,52px)] font-semibold">Clientes felices, mesas llenas</h2>
          </div>
          <div className="flex items-center gap-4 rounded-[24px] bg-soft px-6 py-4">
            <span className="f-display text-5xl font-semibold text-p">{cfg.rating.score.toFixed(1)}</span>
            <div>
              <div className="flex text-a">
                {stars(cfg.rating.score).map((on, k) => (
                  <Star key={k} size={18} fill={on ? 'currentColor' : 'none'} />
                ))}
              </div>
              <p className="text-sm text-mute">{cfg.rating.count} reseñas de ejemplo</p>
            </div>
          </div>
        </Reveal>
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {cfg.reviews.map((r, k) => (
            <Reveal key={r.id} delay={k * 70}>
              <figure className="h-full rounded-[28px] border border-line bg-white/60 p-7">
                <div className="flex items-center gap-4">
                  <span className="f-display grid h-12 w-12 place-items-center rounded-full bg-p text-lg font-semibold text-white">{r.author[0]}</span>
                  <div>
                    <figcaption className="font-bold">{r.author}</figcaption>
                    <p className="text-sm text-mute">{r.when}</p>
                  </div>
                  <div className="ml-auto flex text-a">
                    {stars(r.rating).map((on, j) => (
                      <Star key={j} size={15} fill={on ? 'currentColor' : 'none'} />
                    ))}
                  </div>
                </div>
                <blockquote className="mt-5 text-[17px] leading-relaxed">“{r.text}”</blockquote>
              </figure>
            </Reveal>
          ))}
        </div>
        <div className="mt-10 flex flex-wrap items-center gap-4">
          <a href={reviewsUrl(cfg)} target="_blank" rel="noopener noreferrer" className="btn btn-line">
            <MapPin size={18} /> Ver reseñas en Google Maps
          </a>
          <DemoNote />
        </div>
      </div>
    </section>
  )
}

function Visit() {
  const cfg = useCfg()
  return (
    <section id="visitanos" className="px-5 pb-24 md:px-8">
      <div className="mx-auto grid max-w-7xl overflow-hidden rounded-[40px] bg-soft lg:grid-cols-2">
        <Reveal className="p-8 sm:p-12 lg:p-16">
          <h2 className="f-display text-[clamp(28px,3.6vw,46px)] font-semibold leading-tight">{cfg.copy.contactTitle}</h2>
          <ul className="mt-8 space-y-6">
            <li className="flex gap-4">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-paper text-a">
                <MapPin size={20} />
              </span>
              <div>
                <p className="font-bold">{cfg.location.address}</p>
                <p className="text-mute">{cfg.location.city}</p>
                <p className="text-xs text-mute/70">Ubicación de demostración</p>
              </div>
            </li>
            <li className="flex gap-4">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-paper text-a">
                <Clock size={20} />
              </span>
              <dl className="space-y-1">
                {cfg.hours.map((h) => (
                  <div key={h.label}>
                    <dt className="inline font-bold">{h.label}: </dt>
                    <dd className="inline text-mute">{h.time}</dd>
                  </div>
                ))}
              </dl>
            </li>
            <li className="flex gap-4">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-paper text-a">
                <Phone size={20} />
              </span>
              <div>
                <p className="font-bold">{prettyPhone(cfg.contact.whatsapp)}</p>
                <p className="text-xs text-mute/70">Número de demostración</p>
              </div>
            </li>
          </ul>
          <a href={waLink(cfg)} target="_blank" rel="noopener noreferrer" className="btn btn-olive mt-9">
            <MessageCircle size={18} /> Escribir por WhatsApp
          </a>
        </Reveal>
        <div className="min-h-[360px] p-4 lg:p-5">
          <MapEmbed className="h-[320px] rounded-[28px] lg:h-[calc(100%-4rem)]" buttonClassName="btn btn-line !py-2.5 w-fit" />
        </div>
      </div>
    </section>
  )
}

function Footer() {
  const cfg = useCfg()
  return (
    <footer className="border-t border-line px-5 py-10 pb-24 text-center text-sm text-mute">
      <LeafSprig className="mx-auto mb-2 h-10 w-10 text-p" />
      {cfg.brand.name} · {cfg.brand.tagline} · © {YEAR}
    </footer>
  )
}

export default function Page() {
  return (
    <DemoShell def={definition} theme="t-home" waClass="wa-home" waLabel="Escríbenos">
      <Nav />
      <Hero />
      <About />
      <Menu />
      <Specialties />
      <Ingredients />
      <Gallery />
      <Reviews />
      <Visit />
      <Footer />
    </DemoShell>
  )
}
