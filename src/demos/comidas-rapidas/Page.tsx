import { useState } from 'react'
import { Clock, MapPin, MessageCircle, Phone, Star, Flame } from 'lucide-react'
import { DemoShell } from '../../core/DemoShell'
import { useCfg } from '../../core/DemoContext'
import { DemoNote, Img, Logo, MapEmbed, Reveal } from '../../core/ui'
import { categoriesOf, formatCOP, prettyPhone, reviewsUrl, sized, stars, waLink, waLinkProduct, YEAR } from '../../core/utils'
import { definition } from './config'
import './fast.css'

const NAV = [
  ['Menú', '#menu'],
  ['Combos', '#combos'],
  ['Galería', '#galeria'],
  ['Reseñas', '#resenas'],
  ['Ubicación', '#ubicacion'],
]

function Nav() {
  const cfg = useCfg()
  return (
    <header className="sticky top-0 z-50 border-b-2 border-ink bg-ink text-paper">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-8">
        <a href="#inicio" className="flex items-center gap-2">
          <Logo className="f-display flex items-center gap-2 text-2xl uppercase tracking-wide">
            <span className="grid h-8 w-8 rotate-[-6deg] place-items-center bg-p text-lg text-white">
              <Flame size={18} fill="currentColor" />
            </span>
            {cfg.brand.logoMark}
          </Logo>
        </a>
        <nav className="hidden gap-7 md:flex">
          {NAV.map(([l, h]) => (
            <a key={h} href={h} className="f-display text-[15px] uppercase tracking-wider text-paper/80 hover:text-a">
              {l}
            </a>
          ))}
        </nav>
        <a href={waLink(cfg)} target="_blank" rel="noopener noreferrer" className="f-display flex items-center gap-2 bg-p px-4 py-2 text-sm uppercase tracking-wider text-white hover:bg-a">
          <MessageCircle size={16} /> Pedir
        </a>
      </div>
    </header>
  )
}

function Hero() {
  const cfg = useCfg()
  const { copy } = cfg
  return (
    <section id="inicio" className="on-dark relative overflow-hidden bg-ink text-paper">
      <div className="halftone absolute inset-0" />
      <div className="absolute -right-32 top-0 hidden h-full w-[55%] skew-x-[-12deg] bg-p lg:block" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-8 px-4 pb-16 pt-10 md:px-8 lg:min-h-[calc(100vh-4rem)] lg:grid-cols-12 lg:py-14">
        <div className="relative z-10 lg:col-span-7">
          <p className="mb-5 inline-flex items-center gap-2 border-2 border-paper/80 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em]">
            <span className="h-2 w-2 animate-pulse rounded-full bg-a" /> {copy.heroEyebrow}
          </p>
          <h1 className="f-display text-[clamp(46px,7.2vw,108px)] uppercase leading-[0.88]">
            {copy.heroLine1}
            <br />
            <span className="stroke-text">{copy.heroLine2}</span>
          </h1>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-paper/80">{copy.heroText}</p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a href={waLink(cfg)} target="_blank" rel="noopener noreferrer" className="btn btn-red">
              <MessageCircle size={20} /> Pedir por WhatsApp
            </a>
            <a href="#menu" className="btn btn-light">
              Ver el menú
            </a>
          </div>
          <dl className="mt-10 flex gap-8 text-paper">
            <div>
              <dt className="text-xs uppercase tracking-widest text-paper/60">Calificación</dt>
              <dd className="f-display flex items-center gap-1 text-3xl">
                <Star size={22} fill="currentColor" className="text-a" /> {cfg.rating.score.toFixed(1)}
              </dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-widest text-paper/60">Desde</dt>
              <dd className="f-display text-3xl">{formatCOP(Math.min(...cfg.products.map((p) => p.price)))}</dd>
            </div>
          </dl>
        </div>
        <div className="relative mx-auto w-full max-w-[520px] lg:col-span-5">
          <div className="absolute -inset-3 rotate-3 bg-a" />
          <div className="relative rotate-[-2deg] border-[3px] border-paper">
            <Img src={sized(cfg.images.hero, 1000)} alt={`Hamburguesa de ${cfg.brand.name}`} eager className="aspect-[4/5] w-full object-cover" />
          </div>
          <div className="spin-slow absolute -left-6 -top-6 grid h-28 w-28 place-items-center rounded-full bg-paper text-center text-ink md:-left-10 md:h-32 md:w-32">
            <div className="f-display text-[15px] uppercase leading-tight md:text-lg">
              100%
              <br />
              carne
              <br />
              <span className="text-p">de res</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Marquee() {
  const words = ['Hamburguesas', 'Perros', 'Salchipapas', 'Pizzas', 'Combos']
  const row = words.map((w) => (
    <span key={w} className="f-display flex items-center gap-6 pr-6 text-3xl uppercase tracking-wide md:text-4xl">
      {w} <Flame size={26} fill="currentColor" className="text-ink" />
    </span>
  ))
  return (
    <div className="overflow-hidden border-y-2 border-ink bg-a py-3 text-ink" aria-hidden>
      <div className="marquee">
        <div className="flex">{row}</div>
        <div className="flex">{row}</div>
        <div className="flex">{row}</div>
        <div className="flex">{row}</div>
      </div>
    </div>
  )
}

function Menu() {
  const cfg = useCfg()
  const menu = cfg.products.filter((p) => p.category !== 'Combos')
  const cats = categoriesOf(menu)
  const [cat, setCat] = useState('Todo')
  const active = cat === 'Todo' || cats.includes(cat) ? cat : 'Todo'
  const shown = active === 'Todo' ? menu : menu.filter((p) => p.category === active)
  return (
    <section id="menu" className="bg-paper px-4 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-7xl">
        <Reveal className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <h2 className="f-display text-[clamp(44px,7vw,96px)] uppercase leading-[0.9]">
            {cfg.copy.menuTitle}
            <span className="text-p">.</span>
          </h2>
          <div className="flex flex-wrap gap-2" role="tablist" aria-label="Categorías del menú">
            {['Todo', ...cats].map((c) => (
              <button
                key={c}
                role="tab"
                aria-selected={active === c}
                onClick={() => setCat(c)}
                className={`f-display border-2 border-ink px-4 py-2 text-sm uppercase tracking-wider transition ${active === c ? 'bg-ink text-paper' : 'bg-transparent hover:bg-a'}`}
              >
                {c}
              </button>
            ))}
          </div>
        </Reveal>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((p, i) => (
            <Reveal key={p.id} delay={(i % 3) * 70}>
              <article className="brut group flex h-full flex-col overflow-hidden rounded-2xl bg-white">
                <div className="relative aspect-[4/3] overflow-hidden border-b-2 border-ink">
                  <Img src={sized(p.image, 700)} alt={p.name} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                  {p.tag && <span className="f-display absolute left-3 top-3 rotate-[-4deg] bg-p px-2.5 py-1 text-xs uppercase tracking-wider text-white">{p.tag}</span>}
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-p">{p.category}</p>
                  <h3 className="f-display mt-1 text-2xl uppercase leading-tight">{p.name}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-mute">{p.description}</p>
                  <div className="mt-5 flex items-center justify-between">
                    <span className="f-display text-2xl">{formatCOP(p.price)}</span>
                    <a href={waLinkProduct(cfg, p)} target="_blank" rel="noopener noreferrer" className="f-display flex items-center gap-1.5 bg-ink px-3.5 py-2 text-sm uppercase tracking-wider text-paper hover:bg-p">
                      <MessageCircle size={15} /> Pedir
                    </a>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function Combos() {
  const cfg = useCfg()
  const combos = cfg.products.filter((p) => p.category === 'Combos')
  if (!combos.length) return null
  return (
    <section id="combos" className="stripes relative bg-p px-4 py-20 text-white md:px-8 md:py-28">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <p className="f-display text-lg uppercase tracking-widest text-ink">Promociones</p>
          <h2 className="f-display text-[clamp(44px,7vw,96px)] uppercase leading-[0.9]">{cfg.copy.combosTitle}</h2>
        </Reveal>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {combos.map((c, i) => (
            <Reveal key={c.id} delay={(i % 2) * 80}>
              <article className="brut flex overflow-hidden bg-paper text-ink">
                <div className="relative hidden w-2/5 shrink-0 border-r-2 border-dashed border-ink sm:block">
                  <Img src={sized(c.image, 500)} alt={c.name} className="absolute inset-0 h-full w-full object-cover" />
                </div>
                <div className="flex flex-1 flex-col p-5 md:p-6">
                  {c.tag && <span className="f-display mb-2 w-fit bg-a px-2 py-0.5 text-xs uppercase tracking-wider text-ink">{c.tag}</span>}
                  <h3 className="f-display text-3xl uppercase leading-none">{c.name}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-mute">{c.description}</p>
                  <div className="mt-4 flex items-center justify-between gap-3">
                    <span className="f-display text-3xl text-p">{formatCOP(c.price)}</span>
                    <a href={waLinkProduct(cfg, c)} target="_blank" rel="noopener noreferrer" className="f-display bg-ink px-4 py-2 text-sm uppercase tracking-wider text-paper hover:bg-p">
                      Lo quiero
                    </a>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function BestSellers() {
  const cfg = useCfg()
  const base = cfg.products.filter((p) => p.category !== 'Combos')
  const tagged = base.filter((p) => p.tag === 'Más vendido')
  const top = (tagged.length >= 3 ? tagged : base).slice(0, 4)
  return (
    <section className="on-dark bg-ink px-4 py-20 text-paper md:px-8 md:py-28">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <h2 className="f-display text-[clamp(40px,6vw,84px)] uppercase leading-[0.92]">
            Los más <span className="stroke-text">pedidos</span>
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
          {top.map((p, i) => (
            <Reveal key={p.id} delay={i * 80} className="relative pt-6">
              <span className="f-display stroke-text absolute -top-2 left-0 text-[110px] leading-none opacity-90">{i + 1}</span>
              <div className="relative ml-auto aspect-square w-[78%] overflow-hidden rounded-full border-[3px] border-a">
                <Img src={sized(p.image, 500)} alt={p.name} className="h-full w-full object-cover transition duration-500 hover:scale-110" />
              </div>
              <h3 className="f-display mt-5 text-2xl uppercase">{p.name}</h3>
              <p className="f-display text-xl text-a">{formatCOP(p.price)}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

const SPANS = ['col-span-2 row-span-2', '', '', 'row-span-2', '', 'col-span-2', '']

function Gallery() {
  const cfg = useCfg()
  return (
    <section id="galeria" className="bg-paper px-4 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <h2 className="f-display text-[clamp(44px,7vw,96px)] uppercase leading-[0.9]">
            Se ve <span className="text-p">brutal</span>
          </h2>
        </Reveal>
        <div className="mt-10 grid auto-rows-[150px] grid-cols-2 gap-3 md:auto-rows-[210px] md:grid-cols-4 md:gap-4">
          {cfg.gallery.map((g, i) => (
            <Reveal key={i} delay={(i % 4) * 60} className={`group relative overflow-hidden border-2 border-ink ${SPANS[i % SPANS.length] ?? ''}`}>
              <Img src={sized(g, 900)} alt={`Plato de ${cfg.brand.name} ${i + 1}`} className="h-full w-full object-cover transition duration-700 group-hover:scale-110 group-hover:rotate-1" />
              <div className="absolute inset-0 bg-p/0 mix-blend-multiply transition group-hover:bg-p/40" />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function Reviews() {
  const cfg = useCfg()
  const tilt = ['-rotate-1', 'rotate-1', 'rotate-[0.6deg]', '-rotate-[0.8deg]']
  return (
    <section id="resenas" className="stripes bg-a px-4 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-7xl">
        <Reveal className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <h2 className="f-display text-[clamp(44px,7vw,96px)] uppercase leading-[0.9]">Lo que dicen</h2>
          <div className="brut flex items-center gap-4 bg-paper px-5 py-3">
            <span className="f-display text-5xl leading-none">{cfg.rating.score.toFixed(1)}</span>
            <div>
              <div className="flex text-p">
                {stars(cfg.rating.score).map((on, i) => (
                  <Star key={i} size={18} fill={on ? 'currentColor' : 'none'} />
                ))}
              </div>
              <p className="text-xs font-semibold">{cfg.rating.count} reseñas (ejemplo)</p>
            </div>
          </div>
        </Reveal>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {cfg.reviews.map((r, i) => (
            <Reveal key={r.id} delay={i * 70}>
              <figure className={`brut h-full bg-paper p-5 ${tilt[i % tilt.length]}`}>
                <div className="flex text-p">
                  {stars(r.rating).map((on, k) => (
                    <Star key={k} size={16} fill={on ? 'currentColor' : 'none'} />
                  ))}
                </div>
                <blockquote className="mt-3 text-[15px] leading-relaxed">“{r.text}”</blockquote>
                <figcaption className="mt-4 text-sm font-bold">
                  {r.author} <span className="font-normal text-mute">· {r.when}</span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
        <div className="mt-10 flex flex-wrap items-center gap-4">
          <a href={reviewsUrl(cfg)} target="_blank" rel="noopener noreferrer" className="btn btn-dark">
            <MapPin size={18} /> Ver reseñas en Google Maps
          </a>
          <DemoNote className="!opacity-80" />
        </div>
      </div>
    </section>
  )
}

function Location() {
  const cfg = useCfg()
  return (
    <section id="ubicacion" className="on-dark bg-ink px-4 py-20 text-paper md:px-8 md:py-28">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2">
        <Reveal>
          <h2 className="f-display text-[clamp(44px,7vw,96px)] uppercase leading-[0.9]">
            Ven por <span className="text-a">el tuyo</span>
          </h2>
          <ul className="mt-8 space-y-6">
            <li className="flex gap-4">
              <MapPin className="mt-1 shrink-0 text-a" />
              <div>
                <p className="text-lg font-bold">{cfg.location.address}</p>
                <p className="text-paper/70">{cfg.location.city}</p>
                <p className="mt-1 text-xs text-paper/50">Ubicación de demostración</p>
              </div>
            </li>
            <li className="flex gap-4">
              <Clock className="mt-1 shrink-0 text-a" />
              <dl className="space-y-1">
                {cfg.hours.map((h) => (
                  <div key={h.label} className="flex flex-wrap gap-x-3">
                    <dt className="min-w-40 font-bold">{h.label}</dt>
                    <dd className="text-paper/75">{h.time}</dd>
                  </div>
                ))}
              </dl>
            </li>
            <li className="flex gap-4">
              <Phone className="mt-1 shrink-0 text-a" />
              <div>
                <p className="text-lg font-bold">{prettyPhone(cfg.contact.whatsapp)}</p>
                <p className="text-xs text-paper/50">Número de demostración</p>
              </div>
            </li>
          </ul>
        </Reveal>
        <Reveal delay={100}>
          <MapEmbed className="aspect-[4/3] border-[3px] border-paper" buttonClassName="btn btn-light w-fit" buttonLabel="Cómo llegar" />
        </Reveal>
      </div>
    </section>
  )
}

function FinalCta() {
  const cfg = useCfg()
  return (
    <section className="bg-p px-4 py-20 text-center text-white md:px-8 md:py-28">
      <Reveal>
        <h2 className="f-display mx-auto max-w-5xl text-[clamp(48px,9vw,130px)] uppercase leading-[0.88]">{cfg.copy.ctaTitle}</h2>
        <p className="mx-auto mt-5 max-w-lg text-lg text-white/90">{cfg.copy.ctaText}</p>
        <a href={waLink(cfg)} target="_blank" rel="noopener noreferrer" className="btn btn-light mt-8 !text-xl">
          <MessageCircle size={22} /> Escribir por WhatsApp
        </a>
      </Reveal>
    </section>
  )
}

function Footer() {
  const cfg = useCfg()
  return (
    <footer className="bg-ink px-4 py-8 pb-24 text-center text-sm text-paper/60">
      © {YEAR} {cfg.brand.name} · {cfg.brand.tagline}
    </footer>
  )
}

export default function Page() {
  return (
    <DemoShell def={definition} theme="t-fast" waClass="wa-fast">
      <Nav />
      <Hero />
      <Marquee />
      <Menu />
      <Combos />
      <BestSellers />
      <Gallery />
      <Reviews />
      <Location />
      <FinalCta />
      <Footer />
    </DemoShell>
  )
}
