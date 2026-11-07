import type { DemoDefinition, Product } from '../../core/types'
import { photo } from '../../core/utils'

const img = {
  hero: photo('1568901346375-23c9450c58cd'),
  clasica: photo('1550547660-d9450f859349'),
  doble: photo('1553979459-d2229ba7433b'),
  bbq: photo('1594212699903-ec8a3eca50f5'),
  chicken: photo('1586190848861-99aa4a171e90'),
  pulled: photo('1606755962773-d324e0a13086'),
  salchi: photo('1573080496219-bb080dd4f877'),
  papas: photo('1630384060421-cb20d0e0649d'),
  pizza1: photo('1565299624946-b28f40a0ae38'),
  pizza2: photo('1513104890138-7c749659a591'),
  combo1: photo('1551782450-a2132b4ba21d'),
  combo2: photo('1561758033-d89a9ad46330'),
  combo3: photo('1571091718767-18b5b1457add'),
  combo4: photo('1572802419224-296b0aeee0d9'),
}

const products: Product[] = [
  { id: 'h1', category: 'Hamburguesas', name: 'Chispa Clásica', description: 'Carne de res de 150 g, queso cheddar, lechuga, tomate y nuestra salsa de la casa.', price: 18900, image: img.clasica },
  { id: 'h2', category: 'Hamburguesas', name: 'Doble Furia', description: 'Doble carne, doble queso, tocineta crocante y cebolla caramelizada.', price: 26900, image: img.doble, tag: 'Más vendido' },
  { id: 'h3', category: 'Hamburguesas', name: 'BBQ Bacon', description: 'Carne, tocineta, aros de cebolla y salsa BBQ ahumada en pan brioche.', price: 24900, image: img.bbq, tag: 'Más vendido' },
  { id: 'h4', category: 'Hamburguesas', name: 'Crispy Chicken', description: 'Pechuga apanada y crujiente, queso, pepinillos y mayonesa picante.', price: 21900, image: img.chicken },
  { id: 'h5', category: 'Hamburguesas', name: 'Pulled Pork Smoke', description: 'Cerdo desmechado 8 horas, coleslaw fresco y salsa de mostaza y miel.', price: 25900, image: img.pulled },
  { id: 'd1', category: 'Perros', name: 'Perro Callejero', description: 'Salchicha alemana, papa ripio, queso gratinado, cebolla y tres salsas.', price: 14900, image: photo('1619740455993-9e612b1af08a') },
  { id: 'd2', category: 'Perros', name: 'Perro Chispa Loco', description: 'Chorizo ahumado, tocineta, huevos de codorniz, maíz tierno y salsa de ajo.', price: 18900, image: photo('1619740455993-9e612b1af08a'), tag: 'Nuevo' },
  { id: 's1', category: 'Salchipapas', name: 'Salchipapa Brutal', description: 'Papas a la francesa, salchicha, chorizo, queso fundido, huevo de codorniz y salsas.', price: 19900, image: img.salchi, tag: 'Más vendido' },
  { id: 's2', category: 'Salchipapas', name: 'Salchipapa Familiar', description: 'Para compartir entre 3 o 4: doble porción de papas, carnes y gratinado.', price: 38900, image: img.papas },
  { id: 'p1', category: 'Pizzas', name: 'Pepperoni Personal', description: 'Masa fina, mozzarella y abundante pepperoni. Tamaño personal.', price: 22900, image: img.pizza1 },
  { id: 'p2', category: 'Pizzas', name: 'Pollo BBQ Personal', description: 'Pollo desmechado, cebolla, maíz tierno y salsa BBQ.', price: 24900, image: img.pizza2, tag: 'Más vendido' },
  { id: 'a1', category: 'Papas', name: 'Papas Cheddar & Tocineta', description: 'Papas crocantes bañadas en cheddar caliente con tocineta y cebollín.', price: 13900, image: img.papas },
  { id: 'c1', category: 'Combos', name: 'Combo Clásico', description: 'Chispa Clásica + papas medianas + gaseosa 400 ml.', price: 25900, image: img.combo1, tag: 'Ahorras $5.000' },
  { id: 'c2', category: 'Combos', name: 'Combo Doble Furia', description: 'Doble Furia + papas con cheddar + limonada natural.', price: 36900, image: img.combo2, tag: 'Ahorras $7.000' },
  { id: 'c3', category: 'Combos', name: 'Combo Pareja', description: '2 hamburguesas a elección + papas grandes + 2 bebidas.', price: 52900, image: img.combo3, tag: 'Ahorras $10.000' },
  { id: 'c4', category: 'Combos', name: 'Combo Salchi + Pizza', description: 'Salchipapa Brutal + pizza personal + 2 gaseosas.', price: 39900, image: img.combo4, tag: 'Ahorras $6.000' },
]

export const definition: DemoDefinition = {
  slug: 'comidas-rapidas',
  defaults: {
    brand: { name: 'Chispa Burger', tagline: 'Hamburguesas con actitud', logoMark: 'CHISPA', logoUrl: '' },
    contact: { whatsapp: '573000000000', message: 'Hola {nombre}, quiero hacer un pedido.' },
    location: { address: 'Plaza Majagual, Centro', city: 'Sincelejo, Sucre', mapEmbed: '', mapsUrl: '', reviewsUrl: '' },
    hours: [
      { label: 'Lunes a jueves', time: '11:00 am – 10:00 pm' },
      { label: 'Viernes y sábado', time: '11:00 am – 12:00 am' },
      { label: 'Domingo', time: '12:00 m – 10:00 pm' },
    ],
    colors: { primary: '#e11d2e', accent: '#ff7a1a' },
    rating: { score: 4.8, count: 312 },
    images: { hero: img.hero },
    gallery: [
      photo('1571091718767-18b5b1457add'),
      photo('1551782450-a2132b4ba21d'),
      photo('1513104890138-7c749659a591'),
      photo('1561758033-d89a9ad46330'),
      photo('1565299624946-b28f40a0ae38'),
      photo('1573080496219-bb080dd4f877'),
      photo('1550547660-d9450f859349'),
    ],
    copy: {
      heroEyebrow: 'Hecho al momento · Sin filtros',
      heroLine1: 'Hamburguesas',
      heroLine2: 'con actitud',
      heroText: 'Carne jugosa, pan tostado y salsas que no se olvidan. Pide por WhatsApp y te lo preparamos al instante.',
      menuTitle: 'El menú',
      combosTitle: 'Combos que sí rinden',
      ctaTitle: '¿Antojo? Escríbenos',
      ctaText: 'Pide por WhatsApp y recoge en el local o te lo enviamos.',
    },
    products,
    reviews: [
      { id: 'r1', author: 'Camila R.', rating: 5, text: 'La Doble Furia es otro nivel. Llegó caliente y el pan estaba perfecto.', when: 'hace 2 semanas' },
      { id: 'r2', author: 'Andrés M.', rating: 5, text: 'Las salchipapas rinden muchísimo y la salsa de la casa es adictiva.', when: 'hace 1 mes' },
      { id: 'r3', author: 'Laura P.', rating: 4, text: 'Buen ambiente y atención rápida. Los combos están muy bien de precio.', when: 'hace 1 mes' },
      { id: 'r4', author: 'Jhon D.', rating: 5, text: 'El BBQ Bacon con aros de cebolla, sin discusión lo mejor de la zona.', when: 'hace 3 meses' },
    ],
    labels: {
      images: { hero: 'Foto principal (portada)' },
      copy: {
        heroEyebrow: 'Etiqueta sobre el titular',
        heroLine1: 'Titular, línea 1',
        heroLine2: 'Titular, línea 2 (resaltada)',
        heroText: 'Texto de portada',
        menuTitle: 'Título del menú',
        combosTitle: 'Título de combos',
        ctaTitle: 'Título del llamado final',
        ctaText: 'Texto del llamado final',
      },
    },
  },
}
