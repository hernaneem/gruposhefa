# Sitio web de Grupo Shefa

Sitio corporativo de **Grupo Shefa** — despacho fiscal, contable, jurídico y
financiero. Hecho con **Astro + Tailwind CSS**: es un sitio estático, rápido,
seguro y bueno para aparecer en Google.

---

## 🚀 Cómo verlo en su computadora

Necesita tener instalado [Node.js](https://nodejs.org) (versión 18 o más nueva).

1. Abra la **Terminal** dentro de la carpeta `web`.
2. La primera vez, instale lo necesario:
   ```bash
   npm install
   ```
3. Levante el sitio en modo de prueba:
   ```bash
   npm run dev
   ```
4. Abra en su navegador la dirección que aparece (normalmente
   **http://localhost:4321**). Cualquier cambio que guarde se verá al instante.

Para detener el servidor, presione `Ctrl + C` en la Terminal.

---

## ✏️ Qué puede editar fácilmente (sin saber programar)

Casi todo el contenido vive en archivos sencillos. Estos son los principales:

| Quiero cambiar… | Edite este archivo |
| --- | --- |
| Teléfono, correo, WhatsApp, dirección, dominio | `src/data/sitio.js` |
| Los servicios (textos, agregar o quitar) | `src/data/servicios.js` |
| Los colores y las fuentes de la marca | `tailwind.config.mjs` |
| El texto del Aviso de Privacidad | `src/pages/aviso-de-privacidad.astro` |
| Los textos del home (hero, secciones) | `src/pages/index.astro` |

> 💡 **Consejo:** los archivos `.js` de la carpeta `src/data` están llenos de
> comentarios en español que explican qué es cada cosa. Cambie solo el texto
> que está entre comillas y guarde.

### Agregar un servicio nuevo

Abra `src/data/servicios.js`, copie un bloque `{ ... }` completo de un servicio
existente, péguelo y cambie sus textos. El sitio creará **automáticamente** su
tarjeta y su página individual. No hay que crear archivos nuevos.

### Conectar el formulario de contacto a un correo real

Por ahora el formulario abre el programa de correo del visitante (`mailto:`).
Cuando quiera recibir los mensajes directo en su bandeja, contrate un servicio
como [Formspree](https://formspree.io) o [Resend](https://resend.com) y siga la
nota que está dentro de `src/components/FormularioContacto.astro`.

---

## 🌐 Cómo publicarlo en internet (Vercel)

El sitio ya está listo para [Vercel](https://vercel.com) (gratis para empezar):

1. Suba esta carpeta a un repositorio de GitHub.
2. En Vercel, elija **“Add New Project”** y seleccione ese repositorio.
3. Vercel detecta Astro solo. Deje todo como viene y presione **Deploy**.
4. Cuando tenga su dominio `gruposhefa.com`, conéctelo desde Vercel y actualice
   la dirección en `astro.config.mjs` y en `src/data/sitio.js`.

Para generar la versión final manualmente:
```bash
npm run build      # crea la carpeta "dist" lista para publicar
npm run preview    # la prueba localmente antes de subirla
```

---

## 📁 Cómo está organizado

```
web/
├── public/                  Imágenes y archivos fijos (logo, robots.txt)
├── src/
│   ├── data/                ← Datos editables (sitio y servicios)
│   ├── components/          Piezas reutilizables (encabezado, footer, tarjetas…)
│   ├── layouts/             Plantilla base con el SEO
│   ├── pages/               Las páginas del sitio
│   │   ├── index.astro              Home
│   │   ├── aviso-de-privacidad.astro
│   │   └── servicios/[slug].astro   Genera una página por servicio
│   └── styles/global.css    Estilos base y fuentes
├── tailwind.config.mjs      ← Colores y tipografía de la marca
└── astro.config.mjs         Configuración general
```

---

## 🎨 Identidad de marca aplicada

- **Colores:** verde esmeralda `#0F5C46`, verde profundo `#083930`,
  dorado `#C7A765`, negro tinta `#141414`, hueso `#F5F3EC`, blanco.
- **Tipografía:** Montserrat (títulos) e Inter (texto), desde Google Fonts.
- **Voz:** trato de “usted”, experta pero humana; nunca “evadir”, siempre
  “optimizar legalmente”.

Todo esto está centralizado para mantener la coherencia de la marca en cada página.
