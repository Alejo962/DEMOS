# Demos de páginas web para restaurantes · Sincelejo

Cuatro landing pages gastronómicas **independientes** para usar como demostración comercial en visitas presenciales:

| Ruta | Estilo | Marca ficticia |
| --- | --- | --- |
| `/` | Selector de demostraciones | — |
| `/demos/comidas-rapidas` | Urbano, neo-brutalista | Chispa Burger |
| `/demos/parrillas-llaneras` | Rústico y cinematográfico | El Fogón Llanero |
| `/demos/tradicional-cafeterias` | Cálido, luminoso, artesanal | Casa Sabana |
| `/demos/premium-gastrobares` | Editorial, minimalista | Ónix Cocina de Autor |

Todos los nombres, direcciones, precios, reseñas y teléfonos son **ficticios** y de demostración. Las reseñas están marcadas como "de ejemplo" y no usan ninguna integración con Google. El número de WhatsApp (`573000000000`) es un marcador de posición.

Stack: React 19 · Vite · TypeScript · Tailwind CSS 4 · lucide-react · react-router. Sin backend, base de datos ni claves de API.

## Desarrollo

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # genera dist/
npm run preview    # sirve dist/ localmente
```

## Cómo presentarla

1. Abre `/` y toca la tarjeta del estilo que mejor encaje con el restaurante.
2. La demo se ve como un sitio real. Solo hay una etiqueta discreta **DEMOSTRACIÓN** abajo a la izquierda, con un enlace **← Demos** para volver al selector.
3. Para personalizar delante del propietario, abre el panel oculto con **`Ctrl + Shift + E`** o con el icono de engranaje casi transparente junto a la etiqueta.

### Panel de personalización

Todo se actualiza en vivo y se guarda en el navegador (localStorage) de ese dispositivo:

- **Marca:** nombre, eslogan, logo tipográfico o imagen de logo, colores principal y de acento.
- **Contacto:** número de WhatsApp, mensaje predeterminado (`{nombre}` se reemplaza por el nombre del restaurante), dirección, ciudad, horarios, enlace del perfil de Google Maps y URL de mapa.
- **Menú:** nombre, descripción, precio (COP), categoría y foto de cada producto. Permite agregar y eliminar.
- **Fotos:** portada, ambientes y galería. Se pueden pegar URLs o subir una foto desde el equipo (se reduce y guarda como data-URL).
- **Textos:** titulares y párrafos.
- **Restablecer:** vuelve la demo a sus datos originales.

## Dónde editar el contenido por defecto

Cada demo tiene su carpeta en `src/demos/<nombre>/`:

- `config.ts`: marca, WhatsApp, dirección, horarios, productos con precios, reseñas de ejemplo, galería y textos.
- `Page.tsx`: composición y secciones propias de esa demo.
- `*.css`: tema (colores, tipografías, detalles gráficos).

El código compartido está en `src/core/` (estado y persistencia, enlaces wa.me, mapa incrustado, panel de personalización). Las fotos son URLs de Unsplash; para cambiarlas edita `photo('<id>')` en `config.ts`.

### Mapa y reseñas

- El mapa se genera con `https://www.google.com/maps?q=<dirección>&output=embed` (sin API key) y cambia al editar la dirección. Puedes fijar un iframe propio en "URL del mapa".
- El botón de reseñas usa el enlace del perfil si lo defines; si no, abre la búsqueda en Google Maps por dirección.

## Publicación gratuita (GitHub + Vercel)

```bash
git init
git add .
git commit -m "Demos de restaurantes"
git branch -M main
git remote add origin https://github.com/<usuario>/<repositorio>.git
git push -u origin main
```

1. En [vercel.com](https://vercel.com) crea un proyecto con **Add New → Project** y elige el repositorio.
2. Vercel detecta Vite. Build: `npm run build`. Output: `dist`.
3. Pulsa **Deploy**. No hay variables de entorno ni servicios de pago.

`vercel.json` reescribe todas las rutas a `index.html`, así que recargar `/demos/...` no da 404.
