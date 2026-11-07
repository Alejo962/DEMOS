import type { DemoDefinition, Product } from '../../core/types'
import { photo } from '../../core/utils'

const i = {
  hero: photo('1519708227418-c8fd9a32b7a2'),
  tartar: photo('1432139555190-58524dae6a55'),
  pulpo: photo('1476224203421-9ac39bcb3327'),
  corvina: photo('1467003909585-2f8a72700288'),
  lomo: photo('1551218808-94e220e084d2'),
  postre: photo('1565958011703-44f9829ba187'),
  c1: photo('1544145945-f90425340c7e'),
  c2: photo('1514362545857-3bc16c4c7d1b'),
  c3: photo('1470337458703-46ad1756a187'),
  room: photo('1590846406792-0adc7f938f1d'),
  g1: photo('1559339352-11d035aa65de'),
  g2: photo('1414235077428-338989a2e8c0'),
  g3: photo('1555396273-367ea4eb4db5'),
  g4: photo('1517248135467-4c7edcad34c4'),
  g5: photo('1559329007-40df8a9345d8'),
  g6: photo('1578474846511-04ba529f0b88'),
}

const products: Product[] = [
  { id: 'e1', category: 'Entradas', name: 'Tartar de res', description: 'Yema curada, alcaparras fritas, mostaza de miel y pan de masa madre.', price: 38000, image: i.tartar },
  { id: 'e2', category: 'Entradas', name: 'Carpaccio de pulpo', description: 'Aceite de ají dulce, cítricos, cebollín y sal de Manaure.', price: 42000, image: i.pulpo },
  { id: 'm1', category: 'Principales', name: 'Salmón sellado', description: 'Puré de ñame, mantequilla de limón, hinojo encurtido y crujiente de plátano.', price: 78000, image: i.hero, tag: 'Firma' },
  { id: 'm2', category: 'Principales', name: 'Corvina a la plancha', description: 'Arroz de coco tostado, salsa de maracuyá y vegetales de temporada.', price: 82000, image: i.corvina },
  { id: 'm3', category: 'Principales', name: 'Lomo fino', description: '220 g de res madurada, reducción de panela, papa rústica y hierbas.', price: 92000, image: i.lomo },
  { id: 'd1', category: 'Postres', name: 'Esfera de cacao', description: 'Chocolate de origen, frutos rojos y helado de vainilla que se funde en mesa.', price: 34000, image: i.postre },
  { id: 'c1', category: 'Coctelería sin alcohol', name: 'Maracuyá & albahaca', description: 'Maracuyá, albahaca fresca, jengibre y soda de limón.', price: 24000, image: i.c1 },
  { id: 'c2', category: 'Coctelería sin alcohol', name: 'Humo de panela', description: 'Panela ahumada, cítricos y espuma ligera de coco.', price: 26000, image: i.c2 },
  { id: 'c3', category: 'Coctelería sin alcohol', name: 'Flores & lulo', description: 'Té frío de flores, lulo y toque de menta.', price: 22000, image: i.c3 },
]

export const definition: DemoDefinition = {
  slug: 'premium-gastrobares',
  defaults: {
    brand: { name: 'Ónix Cocina de Autor', tagline: 'Cocina contemporánea y coctelería sin alcohol', logoMark: 'ÓNIX', logoUrl: '' },
    contact: { whatsapp: '573000000000', message: 'Hola {nombre}, quisiera solicitar una reserva.' },
    location: { address: 'Calle 25 # 19-30, Zona Rosa', city: 'Sincelejo, Sucre', mapEmbed: '', mapsUrl: '', reviewsUrl: '' },
    hours: [
      { label: 'Martes a jueves', time: '12:00 m – 10:00 pm' },
      { label: 'Viernes y sábado', time: '12:00 m – 12:00 am' },
      { label: 'Domingo', time: '12:00 m – 6:00 pm' },
      { label: 'Lunes', time: 'Cerrado' },
    ],
    colors: { primary: '#b79b62', accent: '#d9c18a' },
    rating: { score: 4.9, count: 164 },
    images: { hero: i.hero, proposal: i.lomo, experience: i.room },
    gallery: [i.g1, i.g2, i.g3, i.postre, i.g4, i.g5, i.g6],
    copy: {
      heroEyebrow: 'Sincelejo · Cocina de autor',
      heroLine1: 'El arte de',
      heroLine2: 'comer despacio',
      heroText: 'Ingredientes del Caribe colombiano, técnica contemporánea y una mesa pensada para quedarse.',
      proposalTitle: 'Producto local, técnica precisa, un solo propósito: emocionar.',
      proposalText: 'Cada plato nace de ingredientes de la región (ñame, coco, panela, pescados del Golfo) trabajados con técnica contemporánea. Una carta corta que cambia con la temporada.',
      experienceTitle: 'Un ambiente a media luz',
      experienceText: 'Luz cálida, madera oscura y un servicio que acompaña sin interrumpir. Pensado para cenas, celebraciones y reuniones que merecen un lugar distinto.',
      reserveTitle: 'Reserve su mesa',
      reserveText: 'Solicite su reserva y le confirmamos por WhatsApp.',
    },
    products,
    reviews: [
      { id: 'r1', author: 'Isabella M.', rating: 5, text: 'Una experiencia impecable. El salmón y la coctelería sin alcohol son de otro nivel. El servicio, muy atento y discreto.', when: 'hace 1 semana' },
      { id: 'r2', author: 'Julián O.', rating: 5, text: 'Ideal para una cena especial. La carta es corta pero cada plato tiene intención. Volveré.', when: 'hace 1 mes' },
      { id: 'r3', author: 'Natalia C.', rating: 5, text: 'Ambiente elegante y tranquilo. Los postres son una obra de arte.', when: 'hace 2 meses' },
      { id: 'r4', author: 'Sebastián R.', rating: 4, text: 'Excelente propuesta para Sincelejo. Presentación cuidadísima y buena sazón.', when: 'hace 3 meses' },
    ],
    labels: {
      images: { hero: 'Foto de portada', proposal: 'Foto de la propuesta', experience: 'Foto de ambiente (pantalla amplia)' },
      copy: {
        heroEyebrow: 'Etiqueta de portada',
        heroLine1: 'Titular, línea 1',
        heroLine2: 'Titular, línea 2 (cursiva)',
        heroText: 'Texto de portada',
        proposalTitle: 'Frase de la propuesta',
        proposalText: 'Texto de la propuesta',
        experienceTitle: 'Título de la experiencia',
        experienceText: 'Texto de la experiencia',
        reserveTitle: 'Título de reservas',
        reserveText: 'Texto de reservas',
      },
    },
  },
}
