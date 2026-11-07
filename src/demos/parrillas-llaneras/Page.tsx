import { useEffect, useState } from 'react'
import { Beef, CalendarDays, Clock, Flame, MapPin, MessageCircle, Phone, Quote, Star, Users } from 'lucide-react'
import { DemoShell } from '../../core/DemoShell'
import { useCfg } from '../../core/DemoContext'
import { DemoNote, Img, Logo, MapEmbed, Reveal } from '../../core/ui'
import { formatCOP, prettyPhone, reviewsUrl, sized, stars, waLink, waLinkProduct, YEAR } from '../../core/utils'
import { definition } from './config'
import './grill.css'

const LINKS = [
  ['La casa', '#casa'],
  ['La carta', '#carta'],
  ['Parrilladas', '#parrilladas'],
  ['Galería', '#galeria'],
]
const LINKS_R = [
  ['Reseñas', '#resenas'],
  ['Visítanos', '#visitanos'],
]

function Nav() {
  const cfg = useCfg()
  const [solid, setSolid] = useState(false)
  useEffect(() => {
    const h = () => setSolid(window.scrollY > 50)
    h()
    window.addEventListener('scroll', h, { passive: true })
    return () => window.removeEventListener('scroll', h)
  }, [])
  const a = 'text-[12px] font-semibold uppercase tracking-[0.2em] text-ink/80 transition hover:text-a'
  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${solid ? 'wood border-b border-line bg-paper/95 py-3 backdrop-blur' : 'py-6'}`}>
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-5 md:px-8">
        <nav className="hidden flex-1 gap-8 lg:flex">
          {LINKS.map(([l, h]) => (
            <a key={h} href={h} className={a}>
              {l}
            </a>
          ))}
        </nav>
        <a href="#inicio" className="text-center">
          <Logo className="f-display block text-xl font-bold tracking-[0.12em] text-ink md:text-2xl">
            <Flame size={16} className="mx-auto mb-0.5 text-p" fill="currentColor" />
            {cfg.brand.logoMark}
          </Logo>
        </a>
        <div className="flex flex-1 items-center justify-end gap-8">
          <nav className="hidden gap-8 lg:flex">
            {LINKS_R.map(([l, h]) => (
              <a key={h} href={h} className={a}>
                {l}
              </a>
            ))}
          </nav>
          <a href="#reservas" className="btn btn-fill !px-5 !py-2.5 !text-[11px]">
            Reservar
          </a>
        </div>
      </div>
    </header>
  )
}

function Hero() {
  const cfg = useCfg()
  const { copy } = cfg
  return (
    <section id="inicio" className="relative flex min-h-[100svh] items-center justify-center overflow-hidden text-center">
      <Img src={sized(cfg.images.hero, 2000)} alt="Parrilla a las brasas" eager className="ken absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/25 to-[#1b110b]" />
      <div className="relative mx-auto max-w-4xl px-5 pb-28 pt-32">
        <p className="ornament mb-6 text-xs font-semibold uppercase tracking-[0.35em]">{copy.heroEyebrow}</p>
        <h1 className="f-display text-[clamp(40px,7.4vw,96px)] font-bold leading-[1.02] text-white">
          {copy.heroLine1}
          <br />
          <em className="font-medium text-a">{copy.heroLine2}</em>
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-white/80 md:text-lg">{copy.heroText}</p>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
          <a href="#reservas" className="btn btn-fill">
            <CalendarDays size={16} /> Reservar mesa
          </a>
          <a href="#carta" className="btn btn-ghost !text-white">
            Ver la carta
          </a>
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-0 hidden border-t border-white/15 bg-black/40 backdrop-blur-sm md:block">
        <div className="mx-auto grid max-w-5xl grid-cols-3 divide-x md:pl-44 divide-white/15 text-center text-sm text-white/85">
          {['Brasas de leña y carbón', 'Cortes seleccionados', 'Mesas para toda la familia'].map((t) => (
            <p key={t} className="py-4 tracking-wide">
              {t}
            </p>
          ))}
        </div>
      </div>
    </section>
  )
}

function About() {
  const cfg = useCfg()
  const { copy } = cfg
  return (
    <section id="casa" className="sand px-5 py-24 md:px-8 md:py-32">
      <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-2 lg:gap-24">
        <Reveal className="relative mx-auto w-full max-w-[560px] pb-16 pr-10">
          <Img src={sized(cfg.images.about1, 900)} alt="Carne en la parrilla" className="aspect-[4/5] w-full object-cover shadow-2xl" />
          <Img src={sized(cfg.images.about2, 600)} alt="Brochetas llaneras" className="absolute -bottom-0 -right-0 aspect-square w-[46%] border-[10px] border-[#e9ddc5] object-cover shadow-xl" />
        </Reveal>
        <Reveal>
          <p className="ornament !justify-start text-xs font-semibold uppercase tracking-[0.3em] text-p before:hidden">Nuestra casa</p>
          <h2 className="f-display mt-4 text-[clamp(32px,4.4vw,56px)] font-bold leading-[1.08]">{copy.aboutTitle}</h2>
          <p className="dropcap mt-7 text-[17px] leading-[1.8] text-mute">{copy.aboutP1}</p>
          <p className="mt-5 text-[17px] leading-[1.8] text-mute">{copy.aboutP2}</p>
          <ul className="mt-10 grid gap-6 sm:grid-cols-3">
            {[
              [Flame, 'A las brasas', 'Fuego de leña, nunca prisa.'],
              [Beef, 'Cortes de calidad', 'Seleccionados cada día.'],
              [Users, 'En familia', 'Porciones para compartir.'],
            ].map(([Icon, t, d]) => {
              const I = Icon as typeof Flame
              return (
                <li key={t as string} className="border-t-2 border-p pt-4">
                  <I className="text-p" size={22} />
                  <p className="f-display mt-2 text-lg font-bold">{t as string}</p>
                  <p className="text-sm text-mute">{d as string}</p>
                </li>
              )
            })}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}

function Carta() {
  const cfg = useCfg()
  const cortes = cfg.products.filter((p) => p.category === 'Cortes')
  const llaneros = cfg.products.filter((p) => p.category === 'Llaneros')
  const others = Array.from(new Set(cfg.products.map((p) => p.category))).filter((c) => !['Cortes', 'Llaneros', 'Parrilladas'].includes(c))
  return (
    <section id="carta" className="wood px-5 py-24 md:px-8 md:py-32">
      <div className="mx-auto max-w-7xl">
        <Reveal className="text-center">
          <p className="ornament text-xs font-semibold uppercase tracking-[0.35em]">La carta</p>
          <h2 className="f-display mt-4 text-[clamp(34px,5vw,64px)] font-bold">Cortes a las brasas</h2>
        </Reveal>
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {cortes.map((p, i) => (
            <Reveal key={p.id} delay={(i % 3) * 80}>
              <article className="group relative aspect-[3/4] overflow-hidden bg-soft">
                <Img src={sized(p.image, 800)} alt={p.name} className="absolute inset-0 h-full w-full object-cover transition duration-[1200ms] group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                {p.tag && <span className="absolute left-4 top-4 border border-a/70 bg-black/50 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-a backdrop-blur">{p.tag}</span>}
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <h3 className="f-display text-2xl font-bold text-white">{p.name}</h3>
                  <p className="mt-2 max-h-0 overflow-hidden text-sm leading-relaxed text-white/80 opacity-0 transition-all duration-500 group-hover:max-h-32 group-hover:opacity-100 max-sm:max-h-32 max-sm:opacity-100 [@media(hover:none)]:max-h-32 [@media(hover:none)]:opacity-100">
                    {p.description}
                  </p>
                  <div className="mt-3 flex items-center justify-between border-t border-white/25 pt-3">
                    <span className="f-display text-xl text-a">{formatCOP(p.price)}</span>
                    <a href={waLinkProduct(cfg, p)} target="_blank" rel="noopener noreferrer" className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/90 hover:text-a">
                      Pedir →
                    </a>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        {[{ title: 'Cocina llanera', list: llaneros }, ...others.map((c) => ({ title: c, list: cfg.products.filter((p) => p.category === c) }))].map(
          (g) =>
            g.list.length > 0 && (
              <div key={g.title} className="mt-24">
                <Reveal className="text-center">
                  <p className="ornament text-xs font-semibold uppercase tracking-[0.35em]">Tradición</p>
                  <h3 className="f-display mt-3 text-[clamp(28px,3.6vw,44px)] font-bold">{g.title}</h3>
                </Reveal>
                <div className="mt-12 grid gap-x-16 gap-y-8 md:grid-cols-2">
                  {g.list.map((p) => (
                    <Reveal key={p.id}>
                      <article className="flex gap-5">
                        <Img src={sized(p.image, 300)} alt={p.name} className="h-24 w-24 shrink-0 rounded-full border-2 border-a/50 object-cover" />
                        <div className="min-w-0 flex-1">
                          <div className="flex items-baseline gap-3">
                            <h4 className="f-display text-xl font-bold">{p.name}</h4>
                            <span className="leader" />
                            <span className="f-display whitespace-nowrap text-lg text-a">{formatCOP(p.price)}</span>
                          </div>
                          <p className="mt-1 text-sm leading-relaxed text-mute">{p.description}</p>
                        </div>
                      </article>
                    </Reveal>
                  ))}
                </div>
              </div>
            ),
        )}
      </div>
    </section>
  )
}

function Parrilladas() {
  const cfg = useCfg()
  const list = cfg.products.filter((p) => p.category === 'Parrilladas')
  if (!list.length) return null
  return (
    <section id="parrilladas" className="sand px-5 py-24 md:px-8 md:py-32">
      <div className="mx-auto max-w-7xl">
        <Reveal className="text-center">
          <p className="ornament text-xs font-semibold uppercase tracking-[0.35em]">Para compartir</p>
          <h2 className="f-display mt-4 text-[clamp(34px,5vw,64px)] font-bold">Parrilladas</h2>
        </Reveal>
        <div className="mt-16 space-y-20">
          {list.map((p, i) => (
            <Reveal key={p.id} className={`grid items-center gap-8 md:grid-cols-2 md:gap-16 ${i % 2 ? 'md:[&>*:first-child]:order-2' : ''}`}>
              <div className="relative">
                <Img src={sized(p.image, 1000)} alt={p.name} className="aspect-[5/4] w-full object-cover shadow-2xl" />
                <span className="absolute -bottom-4 left-6 bg-p px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white">{p.tag}</span>
              </div>
              <div>
                <h3 className="f-display text-[clamp(28px,3.4vw,44px)] font-bold leading-tight">{p.name}</h3>
                <p className="mt-4 max-w-md text-[17px] leading-relaxed text-mute">{p.description}</p>
                <p className="f-display mt-6 text-4xl font-bold text-p">{formatCOP(p.price)}</p>
                <a href={waLinkProduct(cfg, p)} target="_blank" rel="noopener noreferrer" className="btn btn-ghost mt-6">
                  <MessageCircle size={16} /> Pedir por WhatsApp
                </a>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function Experience() {
  const cfg = useCfg()
  return (
    <section className="relative overflow-hidden">
      <div className="grid lg:grid-cols-2">
        <div className="relative min-h-[360px] lg:min-h-[640px]">
          <Img src={sized(cfg.images.experience, 1400)} alt="Interior del restaurante" className="absolute inset-0 h-full w-full object-cover" />
        </div>
        <Reveal className="wood flex flex-col justify-center bg-soft px-6 py-16 md:px-16 lg:py-24">
          <p className="ornament !justify-start text-xs font-semibold uppercase tracking-[0.3em] before:hidden">La experiencia</p>
          <h2 className="f-display mt-4 text-[clamp(30px,4vw,52px)] font-bold leading-[1.1]">{cfg.copy.experienceTitle}</h2>
          <p className="mt-6 max-w-lg text-[17px] leading-[1.8] text-mute">{cfg.copy.experienceText}</p>
          <ul className="mt-8 grid max-w-lg gap-3 text-[15px]">
            {['Salones amplios y terraza abierta', 'Menú infantil y porciones para compartir', 'Celebraciones y reuniones de empresa', 'Parqueadero para clientes'].map((t) => (
              <li key={t} className="flex items-center gap-3 border-b border-line pb-3">
                <Flame size={15} className="text-p" /> {t}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}

function Gallery() {
  const cfg = useCfg()
  return (
    <section id="galeria" className="px-5 py-24 md:px-8 md:py-32">
      <div className="mx-auto max-w-7xl">
        <Reveal className="text-center">
          <p className="ornament text-xs font-semibold uppercase tracking-[0.35em]">Galería</p>
          <h2 className="f-display mt-4 text-[clamp(34px,5vw,64px)] font-bold">Del fuego a tu mesa</h2>
        </Reveal>
        <div className="mt-14 columns-2 gap-4 md:columns-3 md:gap-5 [&>*]:mb-4 md:[&>*]:mb-5">
          {cfg.gallery.map((g, i) => (
            <Reveal key={i} className="group relative break-inside-avoid overflow-hidden">
              <Img src={sized(g, 800)} alt={`Galería ${i + 1}`} className="w-full object-cover sepia-[.35] transition duration-700 group-hover:scale-105 group-hover:sepia-0" />
              <div className="pointer-events-none absolute inset-0 border border-a/0 transition group-hover:border-a/70 group-hover:m-3" />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function Reviews() {
  const cfg = useCfg()
  return (
    <section id="resenas" className="sand px-5 py-24 md:px-8 md:py-32">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[320px_1fr] lg:gap-20">
        <Reveal>
          <p className="ornament !justify-start text-xs font-semibold uppercase tracking-[0.3em] before:hidden">Reseñas</p>
          <h2 className="f-display mt-4 text-[clamp(30px,3.6vw,46px)] font-bold leading-tight">Lo que cuentan nuestros comensales</h2>
          <p className="f-display mt-8 text-7xl font-bold text-p">{cfg.rating.score.toFixed(1)}</p>
          <div className="mt-1 flex text-p">
            {stars(cfg.rating.score).map((on, i) => (
              <Star key={i} size={20} fill={on ? 'currentColor' : 'none'} />
            ))}
          </div>
          <p className="mt-2 text-sm text-mute">{cfg.rating.count} reseñas de ejemplo</p>
          <a href={reviewsUrl(cfg)} target="_blank" rel="noopener noreferrer" className="btn btn-ghost mt-8 !px-5 !text-[11px]">
            <MapPin size={15} /> Ver en Google Maps
          </a>
          <DemoNote className="mt-4" />
        </Reveal>
        <div className="grid gap-6 sm:grid-cols-2">
          {cfg.reviews.map((r, i) => (
            <Reveal key={r.id} delay={i * 70}>
              <figure className="relative h-full border border-line bg-white/40 p-7">
                <Quote className="absolute right-5 top-5 text-p/30" size={36} />
                <div className="flex text-p">
                  {stars(r.rating).map((on, k) => (
                    <Star key={k} size={15} fill={on ? 'currentColor' : 'none'} />
                  ))}
                </div>
                <blockquote className="f-display mt-4 text-[18px] italic leading-relaxed">“{r.text}”</blockquote>
                <figcaption className="mt-5 text-sm">
                  <b>{r.author}</b> <span className="text-mute">· {r.when}</span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function Visit() {
  const cfg = useCfg()
  return (
    <section id="visitanos" className="wood px-5 py-24 md:px-8 md:py-32">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-5 lg:gap-16">
        <Reveal className="lg:col-span-2">
          <p className="ornament !justify-start text-xs font-semibold uppercase tracking-[0.3em] before:hidden">Visítanos</p>
          <h2 className="f-display mt-4 text-[clamp(30px,3.6vw,46px)] font-bold">Horarios y ubicación</h2>
          <div className="mt-8 space-y-7">
            <div className="flex gap-4">
              <MapPin className="mt-1 shrink-0 text-a" size={20} />
              <div>
                <p className="text-lg font-semibold">{cfg.location.address}</p>
                <p className="text-mute">{cfg.location.city}</p>
                <p className="mt-1 text-xs text-mute/70">Ubicación de demostración</p>
              </div>
            </div>
            <div className="flex gap-4">
              <Clock className="mt-1 shrink-0 text-a" size={20} />
              <dl className="flex-1 space-y-2">
                {cfg.hours.map((h) => (
                  <div key={h.label} className="flex items-baseline gap-3">
                    <dt>{h.label}</dt>
                    <span className="leader" />
                    <dd className="text-a">{h.time}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className="flex gap-4">
              <Phone className="mt-1 shrink-0 text-a" size={20} />
              <div>
                <p className="text-lg font-semibold">{prettyPhone(cfg.contact.whatsapp)}</p>
                <p className="text-xs text-mute/70">Número de demostración</p>
              </div>
            </div>
          </div>
        </Reveal>
        <Reveal delay={100} className="lg:col-span-3">
          <MapEmbed className="aspect-[4/3] border border-a/40 grayscale-[.35] sepia-[.2]" buttonClassName="btn btn-ghost w-fit" />
        </Reveal>
      </div>
    </section>
  )
}

function Reserve() {
  const cfg = useCfg()
  const [f, setF] = useState({ name: '', people: '4', date: '', time: '1:00 pm' })
  const msg = `Hola ${cfg.brand.name}, quiero reservar una mesa${f.name ? ` a nombre de ${f.name}` : ''} para ${f.people} personas${f.date ? ` el ${f.date}` : ''} a las ${f.time}.`
  const set = (k: keyof typeof f) => (e: { target: { value: string } }) => setF({ ...f, [k]: e.target.value })
  return (
    <section id="reservas" className="relative overflow-hidden bg-p px-5 py-24 text-white md:px-8 md:py-28">
      <div className="wood absolute inset-0 opacity-40" />
      <Reveal className="relative mx-auto max-w-3xl text-center">
        <p className="ornament text-xs font-semibold uppercase tracking-[0.35em] !text-white/80">Reservas</p>
        <h2 className="f-display mt-4 text-[clamp(34px,5vw,60px)] font-bold">{cfg.copy.reserveTitle}</h2>
        <p className="mx-auto mt-4 max-w-md text-white/85">{cfg.copy.reserveText}</p>
        <form
          className="mt-10 grid gap-4 text-left sm:grid-cols-2"
          onSubmit={(e) => {
            e.preventDefault()
            window.open(waLink(cfg, msg), '_blank', 'noopener')
          }}
        >
          <input className="field" placeholder="Tu nombre" value={f.name} onChange={set('name')} aria-label="Tu nombre" />
          <select className="field" value={f.people} onChange={set('people')} aria-label="Personas">
            {[2, 3, 4, 5, 6, 8, 10, 12].map((n) => (
              <option key={n} value={n}>
                {n} personas
              </option>
            ))}
          </select>
          <input type="date" className="field" value={f.date} onChange={set('date')} aria-label="Fecha" />
          <select className="field" value={f.time} onChange={set('time')} aria-label="Hora">
            {['12:00 m', '1:00 pm', '2:00 pm', '6:00 pm', '7:00 pm', '8:00 pm'].map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
          <button type="submit" className="btn sm:col-span-2 !border-white !bg-white !text-[#1b110b] hover:!bg-[#1b110b] hover:!text-white">
            <MessageCircle size={17} /> Reservar por WhatsApp
          </button>
        </form>
      </Reveal>
    </section>
  )
}

function Footer() {
  const cfg = useCfg()
  return (
    <footer className="border-t border-line px-5 py-10 pb-24 text-center text-sm text-mute">
      <Logo className="f-display text-lg tracking-[0.12em] text-ink">{cfg.brand.logoMark}</Logo>
      <p className="mt-2">
        {cfg.brand.tagline} · © {YEAR}
      </p>
    </footer>
  )
}

export default function Page() {
  return (
    <DemoShell def={definition} theme="t-grill" waClass="wa-grill">
      <Nav />
      <Hero />
      <About />
      <Carta />
      <Parrilladas />
      <Experience />
      <Gallery />
      <Reviews />
      <Visit />
      <Reserve />
      <Footer />
    </DemoShell>
  )
}
