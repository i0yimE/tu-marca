# Tu Marca — Sitio web

Guía rápida para abrir, editar y publicar esta web. Está escrita para que puedas seguirla sin conocimientos técnicos, usando el Bloc de notas.

## 1. Ver la web en tu computadora

Hacé doble clic en `index.html`. Se abre en tu navegador y funciona igual que online (menú, catálogo, formularios). No hace falta instalar nada.

Si después de editar algo no ves el cambio, mantené presionado `Ctrl` y apretá `F5` (recarga forzada). Los navegadores guardan una copia de la web en caché y a veces hay que forzarlos a mirar la versión nueva.

## 2. Qué hay en cada carpeta

- `index.html`, `catalogo.html`, `nosotros.html`, `servicios.html`, `contacto.html`, `creditos.html` — las páginas del sitio. **No hace falta tocarlas** para los cambios habituales.
- `lib/manifest.js` — **acá vive casi todo lo editable**: nombre de la marca, teléfono, dirección, redes, productos del catálogo y servicios.
- `assets/img/` — todas las fotos del sitio.
- `assets/photos/source/` — carpeta vacía para que dejes tus fotos originales antes de reemplazarlas en `assets/img/`.
- `styles.css` / `main.js` — el diseño y el comportamiento del sitio. No son necesarios de tocar para los cambios de contenido.
- `tools/` — carpeta de uso interno del desarrollo, la podés ignorar o borrar sin problema.

## 3. Cómo editar `lib/manifest.js`

Abrilo con el Bloc de notas (clic derecho → Abrir con → Bloc de notas). Vas a ver bloques de texto entre `{ }`. Cada dato está entre comillas: `"así"`. Cambiá solo lo que está entre comillas, sin borrar comas ni llaves.

### Cambiar el nombre de la marca
Buscá `name: "Tu Marca"` cerca del principio del archivo y reemplazá `Tu Marca` por el nombre real. **Importante:** el nombre también aparece escrito directamente en cada página HTML (el logo del menú y del pie de página). Si querés que cambie en todos lados, lo más simple es:
1. Abrí cada archivo `.html` con el Bloc de notas.
2. Usá "Buscar" (`Ctrl+B` en Bloc de notas) para encontrar `Tu Marca` y reemplazarlo manualmente donde aparece como texto del logo (`<a class="nav-logo">`) y del pie de página (`<div class="footer-logo">`).

### Cambiar teléfono, WhatsApp, email, dirección, horario e Instagram
Todos estos datos están juntos, cerca del principio de `manifest.js`:

```
whatsappNumber: "5490000000000",
phoneDisplay: "[Tu teléfono / WhatsApp]",
email: "[tu-email@tumarca.com]",
address: "[Tu dirección — calle, ciudad, provincia]",
hours: "[Tu horario de atención — ej. Lunes a viernes de 9 a 18 h]",
instagramHandle: "@tu_usuario",
instagramUrl: "https://instagram.com/tu_usuario",
```

- `whatsappNumber`: solo números, con código de país, sin espacios ni "+". Ejemplo para Argentina: `5491122334455`.
- `phoneDisplay`: el teléfono tal como querés que se vea escrito en la web.
- Estos datos se actualizan solos en todas las páginas — no hace falta repetirlos.

### Agregar o quitar un producto del catálogo
Dentro de `manifest.js` buscá la sección `products: [`. Cada producto es un bloque así:

```js
{
  id: "remera-basica",
  name: "Remera básica de algodón",
  category: "remeras",
  image: "product-tshirt.jpg",
  composition: "100% algodón peinado 24/1",
  sizes: "S — XXL",
  colors: "Blanco, negro, gris melange, terracota",
  care: "Lavar a máquina con agua fría, del revés...",
  description: "Corte clásico, cuello redondo reforzado..."
},
```

- **Para agregar un producto**: copiá un bloque completo (desde `{` hasta `},`), pegalo antes del `]` que cierra la lista, y cambiá sus datos. El `id` tiene que ser único (no repetir el de otro producto).
- **Para quitar un producto**: borrá su bloque completo, desde `{` hasta la `}` que le corresponde (incluyendo la coma).
- `category` tiene que ser uno de los ids definidos en `categories:` (más arriba en el mismo archivo): `remeras`, `buzos`, `camisas`, `pantalones` o `accesorios`.
- `image` es el nombre del archivo dentro de `assets/img/` (ver punto 4).

Los productos que aparecen destacados en la portada (Inicio) están hardcodeados directamente en `index.html` — si querés cambiar cuáles se destacan ahí, editá esa sección del archivo o pedinos una mano.

### Agregar o quitar una categoría
Buscá `categories: [` en `manifest.js`. Cada categoría es `{ id: "...", label: "..." }`. Si agregás una categoría nueva, acordate de usar ese mismo `id` en los productos que quieras clasificar ahí.

### Editar los servicios
Buscá `services: [` — cada servicio tiene `title` (título) y `text` (descripción). Mismo mecanismo: copiar/pegar bloques para agregar, borrar bloques para quitar. Estos textos también están escritos directamente en `servicios.html`; si los cambiás en el manifest, replicá el cambio en esa página para que se vea igual en las dos partes del sitio.

## 4. Cambiar fotos

1. Guardá tus fotos nuevas dentro de `assets/photos/source/` (referencia, no se usa directamente en la web).
2. Copialas (o versiones ya recortadas/optimizadas) a `assets/img/`, con el mismo nombre de archivo que ya está en uso (por ejemplo reemplazá `hero.jpg` por tu propia foto, manteniendo el nombre `hero.jpg`) — así no hace falta tocar ningún HTML.
3. Si querés usar un nombre de archivo distinto, tenés que actualizar la referencia correspondiente: en `manifest.js` (campo `image` del producto) o directamente en el `.html` donde aparezca `assets/img/nombre-anterior.jpg`.

Todas las fotos actuales son **imágenes de stock de archivo** (banco de imágenes gratuito, con licencia Creative Commons) mientras no haya fotos propias del catálogo real. Los créditos completos están en `assets/credits.json` y se muestran en `creditos.html`. Reemplazalas por fotos reales de tus prendas apenas las tengas — mejora muchísimo la percepción de la marca.

## 5. El mapa de Contacto

En `contacto.html` el mapa está vacío hasta que cargues una dirección real. Para activarlo:
1. Buscá tu negocio en Google Maps.
2. Compartir → Insertar un mapa → copiá el link largo que aparece dentro de `src="..."`.
3. Pegalo en `manifest.js`, en el campo `mapEmbedSrc`.

## 6. Publicar en Hostinger

1. Entrá al **Administrador de archivos** (File Manager) de tu panel de Hostinger.
2. Andá a la carpeta `public_html` (o la carpeta raíz de tu dominio).
3. Arrastrá **todo el contenido** de esta carpeta del proyecto (todos los archivos y subcarpetas: `index.html`, `styles.css`, `lib/`, `assets/`, `.htaccess`, etc.) directamente ahí. El archivo `.htaccess` es importante — asegurate de que se suba (algunos administradores de archivos ocultan los archivos que empiezan con punto; activá "mostrar archivos ocultos" si no lo ves).
4. Abrí tu dominio en el navegador. Listo.

### Si subís cambios y no se actualiza en la web
Esto es casi siempre un tema de caché del navegador, no un error real:
1. Volvé a abrir la web con `Ctrl+F5`.
2. Si sigue sin verse, abrí `styles.css?v=20260706` y `main.js?v=20260706` — el número al final (`?v=20260706`) es la fecha de la versión. Cada vez que subas un cambio a `styles.css` o `main.js`, actualizá ese número (por ejemplo a la fecha del día) en **todos** los archivos `.html`, buscando y reemplazando `20260706` por la fecha nueva. Esto obliga al navegador a descargar la versión más reciente.

## 7. SEO básico (ya incluido)

Cada página tiene título y descripción propios, pensados para buscadores. También hay `sitemap.xml` y `robots.txt` en la raíz del proyecto. Una vez que tengas tu dominio real:
1. Abrí `sitemap.xml` y `robots.txt` con el Bloc de notas y reemplazá `https://www.tumarca.com` por tu dominio real en todas las líneas donde aparece.
2. Hacé lo mismo con las etiquetas `<link rel="canonical" ...>` de cada página (opcional, mejora el SEO pero no es obligatorio para que la web funcione).

## 8. Preguntas frecuentes

**¿Puedo agregar una página nueva?** Es más prolijo pedirle una mano a quien te desarrolló el sitio, para mantener el mismo menú y estilo en todas las páginas.

**¿El formulario de contacto envía un mail de verdad?** No hay servidor detrás — al enviar, se abre WhatsApp con el mensaje ya redactado (o tu cliente de correo, si usás el link de email). Es la forma más simple y confiable de recibir consultas sin pagar hosting con backend.

**¿Por qué las fotos son de archivo y no de mis productos?** Porque todavía no las tenías al momento de armar el sitio. Anotá en el punto 4 cómo reemplazarlas.
