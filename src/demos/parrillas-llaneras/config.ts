import type { DemoDefinition, Product } from '../../core/types'
import { photo } from '../../core/utils'

const i = {
  hero: photo('1529193591184-b1d58069ecdd'),
  grillDark: photo('1558030137-a56c1b004fa3'),
  skewers: photo('1555939594-58d7cb561ad1'),
  steakBoard: photo('1544025162-d76694265947'),
  steakPlate: photo('1600891964092-4316c288032e'),
  picana: photo('1432139509613-5c4255815697'),
  lomo: photo('1558030006-450675393462'),
  ribs: photo('1529692236671-f1f6cf9683ba'),
  veg: photo('1585238342024-78d387f4a707'),
  mamona: photo('1603360946369-dc9bb6258143'),
  potatoes: photo('1594041680534-e8c8cdebd659'),
  room: photo('1550966871-3ed3cdb5ed0c'),
}

const products: Product[] = [
  { id: 'k1', category: 'Cortes', name: 'Churrasco', description: '350 g de res a las brasas, con papa criolla, yuca frita y chimichurri de la casa.', price: 54900, image: i.steakBoard, tag: 'Insignia' },
  { id: 'k2', category: 'Cortes', name: 'Punta de anca', description: '400 g de punta de anca marinada en sal de monte y asada lentamente.', price: 58900, image: i.steakPlate },
  { id: 'k3', category: 'Cortes', name: 'Picaña', description: '300 g con su capa de grasa dorada, plátano maduro y ensalada fresca.', price: 52900, image: i.picana },
  { id: 'k4', category: 'Cortes', name: 'Lomo fino', description: '300 g de lomo tierno, término a su gusto, con puré rústico y verduras asadas.', price: 59900, image: i.lomo },
  { id: 'k5', category: 'Cortes', name: 'Costillas BBQ', description: 'Costillas de cerdo 6 horas a fuego lento, glaseadas con miel y panela.', price: 46900, image: i.ribs },
  { id: 'k6', category: 'Cortes', name: 'Solomillo de cerdo', description: '300 g sellados a la parrilla con vegetales de temporada.', price: 44900, image: i.veg },
  { id: 'l1', category: 'Llaneros', name: 'Mamona llanera', description: 'Ternera a las brasas con yuca cocida, plátano maduro, hogao y ensalada.', price: 44900, image: i.mamona, tag: 'Tradicional' },
  { id: 'l2', category: 'Llaneros', name: 'Pincho llanero mixto', description: 'Res, cerdo, pollo y chorizo en brocheta, con yuca y suero costeño.', price: 34900, image: i.skewers },
  { id: 'l3', category: 'Llaneros', name: 'Costilla ahumada con papa criolla', description: 'Costilla de res ahumada con papa criolla, arepa y guiso.', price: 41900, image: i.potatoes },
  { id: 'l4', category: 'Llaneros', name: 'Carne oreada con patacón', description: 'Carne seca al sol, patacón crujiente, queso costeño y ají casero.', price: 38900, image: i.grillDark },
  { id: 'p1', category: 'Parrilladas', name: 'Parrillada Llanera', description: 'Res, cerdo, chorizo y morcilla con yuca, papa criolla, plátano maduro y ensalada.', price: 119900, image: i.ribs, tag: 'Para 2 personas' },
  { id: 'p2', category: 'Parrilladas', name: 'Parrillada Familiar', description: 'Churrasco, costilla, pollo, chorizo, morcilla y todos los acompañantes para compartir.', price: 229900, image: i.steakBoard, tag: 'Para 4 personas' },
  { id: 'p3', category: 'Parrilladas', name: 'Parrillada del Patrón', description: 'La mesa completa: cuatro cortes, embutidos, achuras, guarniciones y postre de la casa.', price: 329900, image: i.potatoes, tag: 'Para 6 personas' },
]

export const definition: DemoDefinition = {
  slug: 'parrillas-llaneras',
  defaults: {
    brand: { name: 'El Fogón Llanero', tagline: 'Parrilla y tradición del llano', logoMark: 'FOGÓN LLANERO', logoUrl: '' },
    contact: { whatsapp: '573000000000', message: 'Hola {nombre}, quisiera información y reservar una mesa.' },
    location: { address: 'Avenida Okala, Sector Ford', city: 'Sincelejo, Sucre', mapEmbed: '', mapsUrl: '', reviewsUrl: '' },
    hours: [
      { label: 'Martes a jueves', time: '11:00 am – 10:00 pm' },
      { label: 'Viernes y sábado', time: '11:00 am – 11:00 pm' },
      { label: 'Domingo', time: '11:00 am – 6:00 pm' },
      { label: 'Lunes', time: 'Cerrado' },
    ],
    colors: { primary: '#b5522f', accent: '#d9b77e' },
    rating: { score: 4.9, count: 428 },
    images: { hero: i.hero, about1: i.grillDark, about2: i.skewers, experience: i.room },
    gallery: [i.hero, i.lomo, i.room, i.picana, i.mamona, i.potatoes, i.skewers],
    copy: {
      heroEyebrow: 'Sincelejo · Sucre',
      heroLine1: 'Carnes a la parrilla,',
      heroLine2: 'sabor del llano',
      heroText: 'Fuego de leña, cortes seleccionados y recetas de familia servidas con abundancia, como en casa de la finca.',
      aboutTitle: 'El fuego lento es nuestra receta',
      aboutP1: 'Cada corte llega a la mesa después de una larga marinada y horas de brasas. Cocinamos como se hace en el llano: sin afanes, con sal gruesa, humo de leña y el punto exacto.',
      aboutP2: 'Aquí se viene en familia. Las mesas son largas, las porciones generosas y la sobremesa siempre se alarga.',
      experienceTitle: 'Una mesa larga, una tarde sin afán',
      experienceText: 'Salones amplios, música de arpa suave y una parrilla a la vista. Celebraciones, almuerzos de domingo y reuniones de empresa en un ambiente campestre.',
      reserveTitle: 'Reserva tu mesa',
      reserveText: 'Cuéntanos cuándo vienes y te confirmamos por WhatsApp.',
    },
    products,
    reviews: [
      { id: 'r1', author: 'Marta G.', rating: 5, text: 'La parrillada familiar alcanzó para seis y sobró. La carne en su punto y el servicio muy atento.', when: 'hace 1 semana' },
      { id: 'r2', author: 'Ricardo S.', rating: 5, text: 'La mamona llanera es espectacular. Se siente el sabor a leña. Volveremos pronto.', when: 'hace 3 semanas' },
      { id: 'r3', author: 'Daniela V.', rating: 5, text: 'Celebramos un cumpleaños y nos atendieron de maravilla. Ambiente tranquilo y muy familiar.', when: 'hace 2 meses' },
      { id: 'r4', author: 'Fernando A.', rating: 4, text: 'Porciones abundantes y buen precio por la calidad. El churrasco, imperdible.', when: 'hace 2 meses' },
    ],
    labels: {
      images: { hero: 'Foto de portada', about1: 'Foto de presentación 1', about2: 'Foto de presentación 2', experience: 'Foto de la experiencia (ambiente)' },
      copy: {
        heroEyebrow: 'Etiqueta de portada',
        heroLine1: 'Titular, línea 1',
        heroLine2: 'Titular, línea 2 (cursiva)',
        heroText: 'Texto de portada',
        aboutTitle: 'Título de presentación',
        aboutP1: 'Presentación, párrafo 1',
        aboutP2: 'Presentación, párrafo 2',
        experienceTitle: 'Título de la experiencia',
        experienceText: 'Texto de la experiencia',
        reserveTitle: 'Título de reservas',
        reserveText: 'Texto de reservas',
      },
    },
  },
}
