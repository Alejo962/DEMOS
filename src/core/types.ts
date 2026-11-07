export interface Product {
  id: string
  category: string
  name: string
  description: string
  /** Precio en pesos colombianos (COP) */
  price: number
  image: string
  /** Etiqueta opcional: "Nuevo", "Más vendido"... */
  tag?: string
}

export interface Review {
  id: string
  author: string
  rating: number
  text: string
  when: string
}

export interface DemoConfig {
  brand: {
    name: string
    tagline: string
    /** Texto corto del logotipo (monograma/sigla) */
    logoMark: string
    /** URL o imagen subida; si existe reemplaza el logo tipográfico */
    logoUrl: string
  }
  contact: {
    /** Solo dígitos con indicativo de país. NÚMERO DE DEMOSTRACIÓN. */
    whatsapp: string
    message: string
  }
  location: {
    address: string
    /** Texto para mostrar bajo el mapa (ej. "Sincelejo, Sucre") */
    city: string
    /** Si se deja vacío, el mapa se genera a partir de la dirección */
    mapEmbed: string
    /** Si se deja vacío, el enlace se genera a partir de la dirección */
    mapsUrl: string
    /** Enlace al perfil del negocio en Google Maps (reseñas) */
    reviewsUrl: string
  }
  hours: { label: string; time: string }[]
  colors: { primary: string; accent: string }
  rating: { score: number; count: number }
  /** Imágenes con nombre (hero, about, …). */
  images: Record<string, string>
  gallery: string[]
  /** Textos editables de la página (titulares, párrafos) */
  copy: Record<string, string>
  products: Product[]
  reviews: Review[]
  /** Etiquetas legibles para el panel de personalización */
  labels: {
    images: Record<string, string>
    copy: Record<string, string>
  }
}

export interface DemoDefinition {
  slug: string
  defaults: DemoConfig
}
