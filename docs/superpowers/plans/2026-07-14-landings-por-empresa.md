# Landings por empresa — Plan de implementación

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Publicar siete landings de venta, una por empresa del grupo, tituladas por los servicios que ofrecen y no por la razón social.

**Architecture:** Replica el patrón que el sitio ya usa para servicios: `src/data/empresas.js` es la única fuente de verdad y `src/pages/[empresa].astro` genera las siete rutas con `getStaticPaths()`. La estructura visual se calca de `src/pages/servicios/[slug].astro` reutilizando `Layout`, `Header`, `Footer` y `TarjetaServicio`.

**Tech Stack:** Astro 5, Tailwind 3, `node:test` para pruebas (viene con Node, sin dependencias nuevas).

**Spec:** `docs/superpowers/specs/2026-07-14-landings-por-empresa-design.md`

**Rama:** `landings-por-empresa` (ya creada, ya contiene el spec).

## Global Constraints

- **La razón social no aparece nunca en el contenido renderizado.** Vive solo en el slug de la URL. Ni en el hero, ni en el cuerpo, ni al pie.
- **Del Excel solo se usa la columna "puede facturar".** Nunca se publica RFC, banco, cuenta, CLABE, estatus REPSE, ni la lista de "no puede facturar".
- **Voz de marca:** trato de "usted", tono de despacho profesional. Se calca de `src/data/servicios.js`.
- **Comentarios en español**, en el mismo estilo didáctico de los archivos existentes (`src/data/servicios.js`, `src/lib/rutas.ts`).
- **Sin dependencias nuevas.** `package.json` no gana ningún paquete.
- **No se toca** `Layout.astro`, `Header.astro`, `Footer.astro`, `BotonWhatsapp.astro`, `global.css`, `tailwind.config.mjs`, `astro.config.mjs`, `index.astro`, ni `servicios/[slug].astro`.
- **Node 18+** para `node --test`.

### Nombres distintivos prohibidos en el contenido

Estos son marca y no pueden aparecer renderizados:

```
Grupo IPS, GEO Innovación, Agropersonal, Soluciones Empresariales Elite,
Personal para IT, Contenido Fuerza y Medios
```

`Administración y Finanzas` y `Mantenimiento y Construcción` **no** entran en esta lista: son palabras genéricas que describen el giro, y aparecen inevitablemente en títulos como "Servicios de construcción y mantenimiento". La regla aplica a los nombres distintivos, no a sustantivos comunes.

### Datos internos prohibidos en el contenido

Los RFC y las CLABE reales del catálogo **no se escriben en ningún archivo del
repositorio**, ni en este plan ni en el código: el repositorio es público, y
escribirlos "para que nadie los publique" ES publicarlos, en el historial de
git, para siempre. En su lugar se detectan por FORMA:

```
RFC de persona moral: /\b[A-ZÑ&]{3}\d{6}[A-Z0-9]{3}\b/g
CLABE (18 dígitos):   /\b\d{18}\b/g
```

Lo que sí puede quedar como texto literal, porque no identifica a ninguna
empresa ni habilita fraude, son los nombres de los bancos del catálogo:
`BANORTE`, `SANTANDER`, y la palabra `CLABE`. `ALBO` (otro banco) queda fuera
de esa lista a propósito: son cuatro letras que aparecen dentro de otras
palabras (por ejemplo, "caballo") y darían falsos positivos; los patrones de
RFC y CLABE ya cubren ese riesgo. `REPSE` tampoco es dato prohibido: Grupo
Shefa lo vende como servicio propio (existe `/servicios/repse`).

---

## File Structure

| Archivo | Responsabilidad |
|---|---|
| `src/data/prohibidos.js` (crear) | La lista de lo que no puede publicarse. Una sola definición, la usan las pruebas y el verificador. |
| `src/data/empresas.js` (crear) | Las siete entradas de contenido y el ayudante `otrasEmpresas()`. Único archivo a editar para cambiar copy. |
| `src/pages/[empresa].astro` (crear) | Genera las siete rutas. Solo presentación. |
| `src/components/Icono.astro` (modificar) | Se le agregan cuatro íconos: `megafono`, `camara`, `monitor`, `planta`. |
| `src/components/TarjetaServicio.astro` (modificar) | Gana una prop `href` opcional para poder enlazar fuera de `/servicios/`. |
| `tests/empresas.test.js` (crear) | Valida forma de los datos y hace cumplir las reglas de contenido prohibido. |
| `scripts/verificar-landings.mjs` (crear) | Revisa el HTML ya construido en `dist/`. Última red de seguridad. |

---

## Task 1: Componentes compartidos

Los cuatro íconos que faltan y la prop `href` de la tarjeta. Sin esto, las tareas siguientes no pueden renderizar.

**Files:**
- Modify: `src/components/Icono.astro`
- Modify: `src/components/TarjetaServicio.astro`

**Interfaces:**
- Consumes: nada.
- Produces:
  - `Icono` acepta `nombre="megafono" | "camara" | "monitor" | "planta"` además de los ya existentes.
  - `TarjetaServicio` acepta `href?: string`. Si se pasa, es el destino del enlace. Si no, cae al comportamiento actual `ruta(\`servicios/${slug}\`)`. Firma completa: `{ slug?: string, href?: string, titulo: string, resumen: string, icono: string }`.

- [ ] **Step 1: Agregar los cuatro íconos**

En `src/components/Icono.astro`, dentro del objeto `iconos`, justo después de la entrada `cripto` y antes del comentario `// Íconos para "Por qué Shefa".`, insertar:

```js
  // Íconos para las landings de empresa.
  megafono:
    '<path d="M4 10v4a1 1 0 0 0 1 1h3l6 4V5L8 9H5a1 1 0 0 0-1 1z"/><path d="M17 9.5a4 4 0 0 1 0 5"/><path d="M19.5 7a7.5 7.5 0 0 1 0 10"/><path d="M8 15v4h3"/>',
  camara:
    '<rect x="3" y="7" width="12" height="10" rx="2"/><path d="M15 11l6-3v8l-6-3z"/><circle cx="9" cy="12" r="2.5"/>',
  monitor:
    '<rect x="3" y="4" width="18" height="12" rx="2"/><line x1="12" y1="16" x2="12" y2="20"/><line x1="8" y1="20" x2="16" y2="20"/>',
  planta:
    '<path d="M12 21v-8"/><path d="M12 13c0-3.3 2.7-6 6-6 0 3.3-2.7 6-6 6z"/><path d="M12 16c0-2.8-2.2-5-5-5 0 2.8 2.2 5 5 5z"/><line x1="8" y1="21" x2="16" y2="21"/>',
```

- [ ] **Step 2: Verificar que los íconos existen**

Run:
```bash
node -e "const s=require('fs').readFileSync('src/components/Icono.astro','utf8'); for (const n of ['megafono','camara','monitor','planta']) { if (!s.includes(n+':')) { console.error('FALTA: '+n); process.exit(1) } } console.log('OK: los 4 iconos estan definidos')"
```
Expected: `OK: los 4 iconos estan definidos`

- [ ] **Step 3: Agregar la prop `href` a la tarjeta**

En `src/components/TarjetaServicio.astro`, reemplazar el bloque de frontmatter que va desde `interface Props {` hasta la línea `const { slug, titulo, resumen, icono } = Astro.props;` por:

```astro
interface Props {
  // Destino del enlace. Si no se pasa, se arma con el slug apuntando a
  // /servicios/<slug>, que es como la usan el inicio y las páginas de servicio.
  href?: string;
  slug?: string;
  titulo: string;
  resumen: string;
  icono: string;
}
const { href, slug, titulo, resumen, icono } = Astro.props;

const destino = href ?? ruta(`servicios/${slug}`);
```

Y en el `<a>`, reemplazar:

```astro
  href={ruta(`servicios/${slug}`)}
```

por:

```astro
  href={destino}
```

- [ ] **Step 4: Verificar que el sitio sigue construyendo igual**

Run:
```bash
npm run build && node -e "const s=require('fs').readFileSync('dist/index.html','utf8'); const n=(s.match(/href=\"\/servicios\//g)||[]).length; console.log(n>0 ? 'OK: el inicio sigue enlazando a /servicios/ ('+n+' enlaces)' : 'ROTO: se perdieron los enlaces'); process.exit(n>0?0:1)"
```
Expected: `OK: el inicio sigue enlazando a /servicios/ (N enlaces)` con N mayor que cero. Las tarjetas del inicio no pasan `href`, así que deben seguir cayendo al comportamiento anterior.

- [ ] **Step 5: Commit**

```bash
git add src/components/Icono.astro src/components/TarjetaServicio.astro
git commit -m "Agregar íconos de las landings y permitir destino propio en la tarjeta"
```

---

## Task 2: Los datos de las siete empresas

El archivo de contenido y sus pruebas. Aquí vive todo el copy.

**Files:**
- Create: `src/data/prohibidos.js`
- Create: `src/data/empresas.js`
- Create: `tests/empresas.test.js`
- Modify: `package.json` (agregar el script `test`)

**Interfaces:**
- Consumes: nada.
- Produces:
  - `export const NOMBRES_PROHIBIDOS: string[]` y `export const DATOS_PROHIBIDOS: string[]` en `src/data/prohibidos.js`. La Task 4 los reutiliza; no se vuelven a escribir.
  - `export const empresas` — arreglo de 7 objetos, en el orden del Excel. Cada objeto: `{ slug: string, titulo: string, etiqueta: string, resumen: string, icono: string, descripcion: string[], ofrece: string[] }`.
  - `export function otrasEmpresas(slug: string): Empresa[]` — devuelve las 3 empresas que siguen a `slug` en la lista, dando la vuelta al final. Nunca incluye la propia. Si el slug no existe, devuelve las primeras 3.

- [ ] **Step 1: Escribir la lista de lo prohibido**

Crear `src/data/prohibidos.js`:

```js
// ─────────────────────────────────────────────────────────────────────────────
//  LO QUE NO PUEDE PUBLICARSE — GRUPO SHEFA
//  El catálogo interno de empresas trae datos que no deben salir a internet, y
//  las landings se presentan por servicios, nunca por la razón social.
//
//  Esta lista es la definición única de esa regla. La usan dos guardianes:
//    · tests/empresas.test.js       revisa el contenido antes de construir
//    · scripts/verificar-landings   revisa el HTML ya construido
//
//  Si algún día se agrega una empresa al catálogo, su razón social va aquí, en
//  NOMBRES_PROHIBIDOS. Su RFC y su CLABE NO: lee la nota junto a
//  PATRONES_PROHIBIDOS antes de escribir uno en cualquier archivo del repo.
// ─────────────────────────────────────────────────────────────────────────────

// Nombres de marca. No incluye "Administración y Finanzas" ni "Mantenimiento y
// Construcción" a propósito: son palabras genéricas del giro y aparecen en
// títulos legítimos como "Servicios de construcción y mantenimiento".
export const NOMBRES_PROHIBIDOS = [
  'Grupo IPS',
  'GEO Innovación',
  'Agropersonal',
  'Soluciones Empresariales Elite',
  'Personal para IT',
  'Contenido Fuerza y Medios',
];

// Bancos del catálogo interno, y la palabra "CLABE" en sí: nombres públicos de
// instituciones financieras, no datos que identifiquen a una empresa ni
// habiliten fraude, así que pueden vivir como texto literal.
//
// "ALBO", uno de los bancos, queda fuera a propósito: son cuatro letras que
// aparecen dentro de otras palabras (por ejemplo, "caballo") y darían falsos
// positivos. Los patrones de RFC y CLABE de abajo ya cubren ese riesgo.
//
// "REPSE" tampoco entra: el catálogo interno guarda el estatus de cada
// empresa en el padrón, que es información interna, pero la palabra en sí es
// un servicio que Grupo Shefa vende (existe /servicios/repse). Prohibirla
// reprobaría páginas legítimas.
export const DATOS_PROHIBIDOS = ['BANORTE', 'SANTANDER', 'CLABE'];

// RFC y CLABE reales de las siete empresas — detectados por FORMA, no por
// VALOR.
//
// Este repositorio es PÚBLICO. Escribir aquí los RFC y las CLABE reales "para
// que los guardianes los comparen" ES publicarlos: en cuanto ese commit se
// empuja al remoto, quedan en el historial de git para siempre, sin importar
// que después se borren de HEAD. Las CLABE son lo más delicado: una CLABE
// real filtrada habilita fraude de suplantación de proveedor.
//
// Por eso se detecta por FORMA: un RFC de persona moral y una CLABE tienen
// una estructura fija y reconocible sin necesitar el valor real.
//   · RFC de persona moral: 3 letras (pueden incluir Ñ y &) + 6 dígitos de
//     fecha (AAMMDD) + 3 caracteres alfanuméricos de homoclave.
//   · CLABE: exactamente 18 dígitos seguidos.
// Guardar el PATRÓN en vez del VALOR cierra la fuga y además vuelve al
// guardián más estricto: caza cualquier RFC o CLABE con esa forma, no solo
// los que esta lista conoce hoy.
export const PATRONES_PROHIBIDOS = [
  { nombre: 'RFC', patron: /\b[A-ZÑ&]{3}\d{6}[A-Z0-9]{3}\b/g },
  { nombre: 'CLABE', patron: /\b\d{18}\b/g },
];
```

- [ ] **Step 2: Escribir las pruebas que fallan**

Crear `tests/empresas.test.js`:

```js
// ─────────────────────────────────────────────────────────────────────────────
//  PRUEBAS DEL CATÁLOGO DE EMPRESAS
//  Se corren con: npm test
//  La prueba importante es la última: hace cumplir la regla de que ni la razón
//  social ni los datos internos del Excel pueden llegar a una página pública.
// ─────────────────────────────────────────────────────────────────────────────

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { empresas, otrasEmpresas } from '../src/data/empresas.js';
import { NOMBRES_PROHIBIDOS, DATOS_PROHIBIDOS } from '../src/data/prohibidos.js';

const CAMPOS_TEXTO = ['slug', 'titulo', 'etiqueta', 'resumen', 'icono'];
const CAMPOS_LISTA = ['descripcion', 'ofrece'];

test('hay exactamente siete empresas', () => {
  assert.equal(empresas.length, 7);
});

test('cada empresa trae todos sus campos con contenido', () => {
  for (const empresa of empresas) {
    for (const campo of CAMPOS_TEXTO) {
      assert.equal(typeof empresa[campo], 'string', `${empresa.slug}: ${campo} debe ser texto`);
      assert.ok(empresa[campo].length > 0, `${empresa.slug}: ${campo} está vacío`);
    }
    for (const campo of CAMPOS_LISTA) {
      assert.ok(Array.isArray(empresa[campo]), `${empresa.slug}: ${campo} debe ser lista`);
      assert.ok(empresa[campo].length > 0, `${empresa.slug}: ${campo} está vacía`);
    }
  }
});

test('los slugs son únicos y válidos para una URL', () => {
  const vistos = new Set();
  for (const empresa of empresas) {
    assert.match(
      empresa.slug,
      /^[a-z0-9]+(-[a-z0-9]+)*$/,
      `${empresa.slug}: solo minúsculas, números y guiones medios, sin acentos`,
    );
    assert.ok(!vistos.has(empresa.slug), `slug repetido: ${empresa.slug}`);
    vistos.add(empresa.slug);
  }
});

test('otrasEmpresas devuelve tres empresas y nunca la propia', () => {
  for (const empresa of empresas) {
    const otras = otrasEmpresas(empresa.slug);
    assert.equal(otras.length, 3, `${empresa.slug}: deben ser 3`);
    assert.ok(
      !otras.some((o) => o.slug === empresa.slug),
      `${empresa.slug}: no puede sugerirse a sí misma`,
    );
  }
});

test('otrasEmpresas da la vuelta al llegar al final de la lista', () => {
  const ultima = empresas[empresas.length - 1];
  const otras = otrasEmpresas(ultima.slug);
  assert.deepEqual(
    otras.map((o) => o.slug),
    empresas.slice(0, 3).map((e) => e.slug),
  );
});

// ── La regla que no se puede romper ──────────────────────────────────────────
// La lista vive en src/data/prohibidos.js, compartida con el verificador.

test('el contenido no filtra razones sociales ni datos internos', () => {
  for (const empresa of empresas) {
    // Todo el texto que se va a renderizar. El slug queda fuera a propósito:
    // ahí sí vive el nombre de la empresa, es la URL.
    const texto = [
      empresa.titulo,
      empresa.etiqueta,
      empresa.resumen,
      ...empresa.descripcion,
      ...empresa.ofrece,
    ]
      .join(' ')
      .toLowerCase();

    for (const prohibido of [...NOMBRES_PROHIBIDOS, ...DATOS_PROHIBIDOS]) {
      assert.ok(
        !texto.includes(prohibido.toLowerCase()),
        `${empresa.slug}: el contenido público contiene "${prohibido}"`,
      );
    }
  }
});
```

- [ ] **Step 3: Agregar el script de pruebas**

En `package.json`, dentro de `"scripts"`, agregar después de `"preview"`:

```json
    "test": "node --test tests/*.test.js"
```

Queda así el bloque completo:

```json
  "scripts": {
    "dev": "astro dev",
    "start": "astro dev",
    "build": "astro build",
    "preview": "astro preview",
    "test": "node --test tests/*.test.js"
  },
```

Va con el comodín escrito así, expandido por la terminal, y no `node --test tests/`: a partir de Node 21 esa forma toma la carpeta como si fuera un módulo y truena con `Cannot find module`. Verificado en Node 25.

- [ ] **Step 4: Correr las pruebas para verlas fallar**

Run: `npm test`
Expected: FALLA con `Cannot find module` apuntando a `src/data/empresas.js`. El catálogo todavía no existe (`prohibidos.js` sí, se creó en el Step 1).

- [ ] **Step 5: Escribir el catálogo**

Crear `src/data/empresas.js`:

```js
// ─────────────────────────────────────────────────────────────────────────────
//  CATÁLOGO DE EMPRESAS — GRUPO SHEFA
//  Esta es la única fuente de verdad de las landings por empresa. Con esta
//  lista se genera automáticamente la página de cada una (src/pages/[empresa].astro).
//
//  REGLA IMPORTANTE: la razón social NO va en el contenido. Solo en el "slug",
//  que es la URL. El título de cada página son los servicios que ofrece, no el
//  nombre de la empresa. Del catálogo interno tampoco sale ningún RFC, banco,
//  cuenta ni CLABE. Las pruebas (npm test) hacen cumplir esto.
//
//  Para editar una landing: cambia su bloque { ... } aquí y listo.
//  - slug:        el nombre de la empresa en la URL (minúsculas, sin acentos).
//  - titulo:      los servicios que ofrece. Es el H1 y el título de la pestaña.
//  - etiqueta:    el giro, en letra chica sobre el título.
//  - resumen:     frase de entrada del encabezado. También la usan los buscadores.
//  - icono:       nombre de un ícono disponible (ver src/components/Icono.astro).
//  - descripcion: párrafos del cuerpo (en la voz de marca: trato de "usted").
//  - ofrece:      los servicios concretos, tomados de lo que la empresa puede facturar.
// ─────────────────────────────────────────────────────────────────────────────

export const empresas = [
  {
    slug: 'administracion-y-finanzas',
    titulo: 'Servicios de administración, contabilidad y finanzas',
    etiqueta: 'Administración y finanzas',
    resumen:
      'Nos hacemos cargo de la operación contable, fiscal y administrativa de su empresa, para que usted dedique su tiempo al negocio.',
    icono: 'calculadora',
    descripcion: [
      'La administración de una empresa exige orden constante: registros al día, obligaciones cumplidas en tiempo e información confiable para decidir. Nos hacemos cargo de esa operación completa, desde la contabilidad general hasta el cierre de cada ejercicio.',
      'Trabajamos con estructura propia y procesos definidos, de modo que usted reciba sus estados financieros con oportunidad, responda ante las autoridades sin sobresaltos y conserve el control de su empresa sin tener que operarla en el detalle.',
    ],
    ofrece: [
      'Contabilidad general y corporativa',
      'Cierres contables y estados financieros',
      'Análisis financiero para la toma de decisiones',
      'Planeación y cumplimiento fiscal',
      'Atención y respuesta a autoridades gubernamentales',
      'Gestión administrativa y documental',
      'Control interno y compliance',
      'Administración de nómina',
      'Gestión de recursos humanos y servicios laborales especializados',
      'Asesoría jurídica corporativa y gestión contractual',
      'Gobierno corporativo y representación legal',
      'Planeación estratégica y diseño de estructuras organizacionales',
      'Gestión de proveedores y de proyectos',
      'Servicios para grupos empresariales y facturación por volumen',
      'Estudios de mercado',
    ],
  },
  {
    slug: 'contenido-fuerza-y-medios',
    titulo: 'Servicios de publicidad, producción y eventos',
    etiqueta: 'Publicidad y eventos',
    resumen:
      'Producimos campañas, contenidos y eventos corporativos, de la idea a la ejecución en piso.',
    icono: 'camara',
    descripcion: [
      'Una campaña se sostiene en la ejecución. Planeamos la estrategia publicitaria y la llevamos hasta el material terminado: contenidos, piezas gráficas, video y comerciales, con equipo propio y locaciones habilitadas para producción.',
      'El mismo equipo opera sus eventos, convenciones y activaciones de marca, con el personal especializado que cada montaje requiere. Una sola coordinación de principio a fin, sin intermediarios.',
    ],
    ofrece: [
      'Planeación publicitaria',
      'Publicidad BTL y activaciones de marca',
      'Producción de contenidos',
      'Producción gráfica',
      'Producción de videos y comerciales',
      'Habilitación de locaciones para producciones',
      'Producción de eventos sociales y corporativos',
      'Convenciones y expos',
      'Personal especializado para producciones y montajes',
    ],
  },
  {
    slug: 'personal-para-it',
    titulo: 'Servicios y consultoría en tecnologías de la información',
    etiqueta: 'Tecnologías de la información',
    resumen:
      'Implementamos, integramos y mantenemos la tecnología que sostiene su operación.',
    icono: 'monitor',
    descripcion: [
      'La tecnología rinde cuando está bien implementada y alguien responde por ella. Definimos su estrategia tecnológica, ponemos en marcha los sistemas que su operación necesita —ERP, CRM, integraciones— y migramos su información sin interrumpir el negocio.',
      'Después del arranque seguimos ahí: mantenemos el software, resolvemos las incidencias y acompañamos a su equipo con consultoría continua.',
    ],
    ofrece: [
      'Consultoría en tecnologías de la información',
      'Estrategia tecnológica',
      'Implementación de ERP y CRM',
      'Integración de sistemas',
      'Migración de datos',
      'Mantenimiento de software',
      'Servicios integrales tecnológicos',
    ],
  },
  {
    slug: 'mantenimiento-y-construccion',
    titulo: 'Servicios de construcción y mantenimiento',
    etiqueta: 'Construcción y servicios inmobiliarios',
    resumen:
      'Ejecutamos obra civil, remodelaciones y mantenimiento, con dirección de proyecto y control de costos.',
    icono: 'edificio',
    descripcion: [
      'Construimos y mantenemos. Obra civil completa —negra, gris, blanca y acabados—, ampliaciones y remodelaciones, con las instalaciones eléctricas, hidrosanitarias y especiales que cada proyecto requiere.',
      'Cada obra lleva dirección de proyecto, supervisión, control de costos, seguridad en obra y cumplimiento normativo. Y cuando la obra termina, seguimos con el mantenimiento preventivo, correctivo y especializado, incluida la administración integral de inmuebles y condominios.',
    ],
    ofrece: [
      'Ejecución de obra civil',
      'Obra negra, gris, blanca y acabados',
      'Ampliaciones y remodelaciones',
      'Instalaciones eléctricas, hidrosanitarias y especiales',
      'Proyectos ejecutivos',
      'Dirección y administración de proyecto',
      'Supervisión de obra y seguridad en obra',
      'Control de costos',
      'Cumplimiento normativo',
      'Mantenimiento preventivo, correctivo y especializado',
      'Servicios técnicos especializados',
      'Administración integral de inmuebles y condominios',
      'Gestión operativa y de proveedores',
    ],
  },
  {
    slug: 'agropersonal',
    titulo: 'Servicios agrícolas y de campo',
    etiqueta: 'Servicios agrícolas',
    resumen:
      'Realizamos los trabajos agrícolas de su explotación y acompañamos a las empresas del campo en su operación.',
    icono: 'planta',
    descripcion: [
      'El campo exige gente que sepa lo que hace y esté cuando se le necesita. Realizamos los trabajos agrícolas de su explotación con personal capacitado, a lo largo de todo el ciclo productivo.',
      'También acompañamos a las empresas del sector con asesoría en su operación, y atendemos lo que viene después de la cosecha: producir, conservar, transformar y distribuir lo que sale de sus explotaciones agrícolas y forestales.',
    ],
    ofrece: [
      'Realización de trabajos agrícolas',
      'Asesoría a empresas agrícolas',
      'Producción, conservación y transformación de productos agrícolas y forestales',
      'Distribución de productos de explotaciones agrícolas y forestales',
      'Otros servicios relacionados con la agricultura',
    ],
  },
  {
    slug: 'geo-innovacion',
    titulo: 'Servicios de marketing y publicidad',
    etiqueta: 'Marketing y publicidad',
    resumen:
      'Llevamos su marca al mercado: estrategia, marketing digital, medios y activaciones.',
    icono: 'megafono',
    descripcion: [
      'Su marca necesita estar donde está su cliente. Planeamos la estrategia publicitaria, la ejecutamos en digital y la sostenemos en medios, con espacios publicitarios y activaciones BTL que ponen la marca frente a la gente.',
      'Cubrimos además todo lo que la campaña necesita alrededor: contenidos, video y comerciales, artículos promocionales, impresión digital, serigrafía y bordado textil, y el equipo y mobiliario que sus eventos y convenciones requieren.',
    ],
    ofrece: [
      'Planeación publicitaria',
      'Marketing digital',
      'Publicidad BTL y activaciones',
      'Renta de espacios publicitarios',
      'Producción de contenidos',
      'Producción de videos y comerciales',
      'Suministro de artículos promocionales',
      'Impresión digital, serigrafía y bordado textil',
      'Convenciones, expos y eventos sociales y corporativos',
      'Renta de mobiliario para eventos',
      'Equipo y tecnología para el ramo de la publicidad',
      'Capacitación de personal',
    ],
  },
  {
    slug: 'soluciones-empresariales-elite',
    titulo: 'Consultoría empresarial y servicios tecnológicos',
    etiqueta: 'Consultoría y tecnología',
    resumen:
      'Ordenamos y hacemos crecer su negocio: estrategia, constitución, cumplimiento y digitalización.',
    icono: 'brujula',
    descripcion: [
      'Acompañamos a la empresa desde su origen: constituimos la sociedad, definimos la estrategia y la implementamos, y ponemos en orden la administración del negocio con consultoría enfocada en resultados.',
      'A eso sumamos la mirada financiera y de control —asesoría financiera, auditoría y supervisión del cumplimiento normativo— junto con la implementación digital y los licenciamientos que su operación requiere.',
    ],
    ofrece: [
      'Consultoría administrativa',
      'Planeación e implementación estratégica',
      'Administración de negocios',
      'Constitución de sociedades',
      'Asesoría financiera',
      'Auditoría y supervisión de cumplimiento normativo',
      'Implementación digital',
      'Licenciamientos',
    ],
  },
];

// Las tres empresas que siguen a esta en la lista, dando la vuelta al llegar al
// final. Se usan al pie de cada landing para invitar a conocer el resto del grupo.
export function otrasEmpresas(slug) {
  const indice = empresas.findIndex((empresa) => empresa.slug === slug);
  if (indice === -1) return empresas.slice(0, 3);
  return [...empresas.slice(indice + 1), ...empresas.slice(0, indice)].slice(0, 3);
}
```

- [ ] **Step 6: Correr las pruebas para verlas pasar**

Run: `npm test`
Expected: PASS. Las 6 pruebas en verde, `# fail 0`.

- [ ] **Step 7: Commit**

```bash
git add src/data/prohibidos.js src/data/empresas.js tests/empresas.test.js package.json
git commit -m "Agregar el catálogo de las siete empresas con sus pruebas"
```

---

## Task 3: La plantilla de las landings

**Files:**
- Create: `src/pages/[empresa].astro`

**Interfaces:**
- Consumes: `empresas` y `otrasEmpresas` de `src/data/empresas.js`; `Layout`, `Icono`, `TarjetaServicio` (con la prop `href` de la Task 1); `enlaceWhatsapp` de `src/data/sitio.js`; `ruta` de `src/lib/rutas.ts`.
- Produces: las rutas `/administracion-y-finanzas`, `/contenido-fuerza-y-medios`, `/personal-para-it`, `/mantenimiento-y-construccion`, `/agropersonal`, `/geo-innovacion`, `/soluciones-empresariales-elite`.

- [ ] **Step 1: Comprobar que las rutas todavía no existen**

Run:
```bash
npm run build && ls dist/geo-innovacion/index.html
```
Expected: el build pasa, pero `ls` FALLA con `No such file or directory`. La ruta aún no se genera.

- [ ] **Step 2: Escribir la plantilla**

Crear `src/pages/[empresa].astro`:

```astro
---
// ─────────────────────────────────────────────────────────────────────────────
//  LANDING DE EMPRESA — GRUPO SHEFA
//  Astro genera AUTOMÁTICAMENTE una página por cada empresa del catálogo
//  (src/data/empresas.js). No hay que crear un archivo por empresa.
//
//  Ojo: la página se presenta por los SERVICIOS que ofrece, nunca por la razón
//  social. El nombre de la empresa vive solo en la URL.
// ─────────────────────────────────────────────────────────────────────────────

import Layout from '../layouts/Layout.astro';
import Icono from '../components/Icono.astro';
import TarjetaServicio from '../components/TarjetaServicio.astro';
import { enlaceWhatsapp } from '../data/sitio.js';
import { ruta } from '../lib/rutas.ts';
import { empresas, otrasEmpresas } from '../data/empresas.js';

// Le dice a Astro qué páginas generar: una por cada empresa.
export function getStaticPaths() {
  return empresas.map((empresa) => ({
    params: { empresa: empresa.slug },
    props: { empresa },
  }));
}

const { empresa } = Astro.props;

// Las otras áreas del grupo, para sugerir al final.
const otras = otrasEmpresas(empresa.slug);
---

<Layout titulo={empresa.titulo} descripcion={empresa.resumen}>
  <!-- Encabezado -->
  <section class="bg-verde-profundo text-white">
    <div class="contenedor py-16 md:py-20">
      <!-- Migas de pan -->
      <nav class="mb-8 text-sm text-white/60" aria-label="Ruta de navegación">
        <a href={ruta()} class="hover:text-dorado">Inicio</a>
        <span class="mx-2">/</span>
        <span class="text-white/90">{empresa.etiqueta}</span>
      </nav>

      <div class="flex items-start gap-5">
        <span class="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-dorado text-verde-profundo">
          <Icono nombre={empresa.icono} class="h-7 w-7" />
        </span>
        <div>
          <p class="etiqueta">{empresa.etiqueta}</p>
          <h1 class="mt-3 font-titulo text-3xl font-bold sm:text-4xl lg:text-5xl">
            {empresa.titulo}
          </h1>
        </div>
      </div>
      <p class="mt-6 max-w-2xl text-lg leading-relaxed text-white/80">
        {empresa.resumen}
      </p>
    </div>
  </section>

  <!-- Cuerpo -->
  <section class="bg-white py-16 md:py-20">
    <div class="contenedor grid gap-12 lg:grid-cols-[1.4fr_0.6fr]">
      <div>
        <div class="space-y-5 text-lg leading-relaxed text-tinta/80">
          {empresa.descripcion.map((parrafo) => <p>{parrafo}</p>)}
        </div>

        <!-- Qué ofrecemos -->
        <div class="mt-12">
          <h2 class="font-titulo text-2xl font-bold text-verde-profundo">
            ¿Qué ofrecemos?
          </h2>
          <span class="linea-dorada mt-4"></span>
          <ul class="mt-7 grid gap-4 sm:grid-cols-2">
            {
              empresa.ofrece.map((punto) => (
                <li class="flex items-start gap-3">
                  <span class="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-hueso text-verde">
                    <svg class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>
                  <span class="text-tinta/80">{punto}</span>
                </li>
              ))
            }
          </ul>
        </div>
      </div>

      <!-- Llamado a la acción -->
      <aside class="lg:pt-2">
        <div class="rounded-2xl bg-verde-profundo p-8 text-white">
          <h2 class="font-titulo text-xl font-bold">¿Le interesan estos servicios?</h2>
          <p class="mt-3 leading-relaxed text-white/75">
            Cuéntenos qué necesita y con gusto lo orientamos, sin compromiso.
          </p>
          <a href={ruta('#contacto')} class="boton-dorado mt-6 w-full">Agende una consulta</a>
          <a
            href={enlaceWhatsapp}
            target="_blank"
            rel="noopener"
            class="boton-contorno mt-3 w-full border-white/30 text-white hover:bg-white/10"
          >
            Escríbanos por WhatsApp
          </a>
        </div>
      </aside>
    </div>
  </section>

  <!-- Otras áreas del grupo -->
  <section class="bg-hueso py-16 md:py-20">
    <div class="contenedor">
      <h2 class="font-titulo text-2xl font-bold text-verde-profundo">
        Otras áreas del grupo
      </h2>
      <span class="linea-dorada mt-4"></span>
      <div class="mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {
          otras.map((otra) => (
            <TarjetaServicio
              href={ruta(otra.slug)}
              titulo={otra.titulo}
              resumen={otra.resumen}
              icono={otra.icono}
            />
          ))
        }
      </div>
    </div>
  </section>
</Layout>
```

- [ ] **Step 3: Construir y verificar que se generan las siete rutas**

Run:
```bash
npm run build && node -e "
const fs = require('fs');
const rutas = ['administracion-y-finanzas','contenido-fuerza-y-medios','personal-para-it','mantenimiento-y-construccion','agropersonal','geo-innovacion','soluciones-empresariales-elite'];
let error = false;
for (const r of rutas) {
  const archivo = 'dist/' + r + '/index.html';
  if (!fs.existsSync(archivo)) { console.error('FALTA: ' + archivo); error = true; continue; }
  const html = fs.readFileSync(archivo, 'utf8');
  if (!/<h1[^>]*>/.test(html)) { console.error('SIN H1: ' + r); error = true; continue; }
  console.log('OK: /' + r);
}
process.exit(error ? 1 : 0);
"
```
Expected: siete líneas `OK: /...`, sin ningún `FALTA` ni `SIN H1`.

- [ ] **Step 4: Verificar que cada página lleva su título correcto**

Run:
```bash
node -e "
const fs = require('fs');
const esperado = {
  'administracion-y-finanzas': 'Servicios de administración, contabilidad y finanzas',
  'contenido-fuerza-y-medios': 'Servicios de publicidad, producción y eventos',
  'personal-para-it': 'Servicios y consultoría en tecnologías de la información',
  'mantenimiento-y-construccion': 'Servicios de construcción y mantenimiento',
  'agropersonal': 'Servicios agrícolas y de campo',
  'geo-innovacion': 'Servicios de marketing y publicidad',
  'soluciones-empresariales-elite': 'Consultoría empresarial y servicios tecnológicos',
};
let error = false;
for (const [ruta, titulo] of Object.entries(esperado)) {
  const html = fs.readFileSync('dist/' + ruta + '/index.html', 'utf8');
  if (!html.includes(titulo)) { console.error('TITULO INCORRECTO en /' + ruta + ' — se esperaba: ' + titulo); error = true; }
  else console.log('OK: /' + ruta + ' → ' + titulo);
}
process.exit(error ? 1 : 0);
"
```
Expected: siete líneas `OK: /... → ...`.

- [ ] **Step 5: Verificar que las rutas viejas siguen vivas**

La plantilla `[empresa].astro` vive en la raíz de `src/pages/`. Astro da prioridad a las rutas estáticas, así que `/aviso-de-privacidad` debe seguir resolviendo a su propio archivo.

Run:
```bash
node -e "
const fs = require('fs');
for (const r of ['index.html','aviso-de-privacidad/index.html','servicios/regularizacion-contable/index.html']) {
  if (!fs.existsSync('dist/' + r)) { console.error('SE ROMPIÓ: ' + r); process.exit(1); }
  console.log('OK: ' + r);
}
"
```
Expected: tres líneas `OK:`.

- [ ] **Step 6: Verificar que el sitemap incluye las siete**

Run:
```bash
node -e "
const fs = require('fs');
const xml = fs.readFileSync('dist/sitemap-0.xml', 'utf8');
const rutas = ['administracion-y-finanzas','contenido-fuerza-y-medios','personal-para-it','mantenimiento-y-construccion','agropersonal','geo-innovacion','soluciones-empresariales-elite'];
const faltan = rutas.filter((r) => !xml.includes('gruposhefa.com/' + r));
if (faltan.length) { console.error('FALTAN EN EL SITEMAP: ' + faltan.join(', ')); process.exit(1); }
console.log('OK: las 7 landings están en el sitemap');
"
```
Expected: `OK: las 7 landings están en el sitemap`

- [ ] **Step 7: Commit**

```bash
git add "src/pages/[empresa].astro"
git commit -m "Generar las siete landings desde el catálogo de empresas"
```

---

## Task 4: Red de seguridad sobre el HTML construido

Las pruebas de la Task 2 revisan los datos. Este script revisa el resultado final: lo que de verdad se va a publicar. Si algún día alguien escribe la razón social directo en la plantilla, esto lo caza.

Reutiliza la lista de `src/data/prohibidos.js` que creó la Task 2. Los dos guardianes comparten una sola definición de la regla, para que no se puedan desincronizar.

**Files:**
- Modify: `src/data/prohibidos.js` (quitar `REPSE` de la lista)
- Create: `scripts/verificar-landings.mjs`
- Modify: `package.json` (agregar el script `verificar`)

**Interfaces:**
- Consumes: `dist/` ya construido, y `NOMBRES_PROHIBIDOS` / `DATOS_PROHIBIDOS` de `src/data/prohibidos.js` (Task 2). La lista **no** se vuelve a escribir aquí.
- Produces: comando `npm run verificar`. Sale con código 0 si todo está limpio, 1 si encuentra algo.

- [ ] **Step 1: Sacar REPSE de la lista de prohibidos**

La Task 2 metió `'REPSE'` en `DATOS_PROHIBIDOS` por un error del plan. Grupo Shefa **vende** el registro REPSE como servicio propio: existe `/servicios/repse`, con el título "REPSE", y la palabra aparece en el inicio. Dejarla prohibida haría que el verificador reprobara páginas legítimas que llevan meses publicadas.

En `src/data/prohibidos.js`, reemplazar el comentario de `DATOS_PROHIBIDOS` y quitar la última entrada:

```js
// Bancos del catálogo interno, y la palabra "CLABE" en sí: nombres públicos de
// instituciones financieras, no datos que identifiquen a una empresa ni
// habiliten fraude, así que pueden vivir como texto literal.
//
// "ALBO", uno de los bancos, queda fuera a propósito: son cuatro letras que
// aparecen dentro de otras palabras (por ejemplo, "caballo") y darían falsos
// positivos. Los patrones de RFC y CLABE de abajo ya cubren ese riesgo.
//
// "REPSE" tampoco entra: el catálogo interno guarda el estatus de cada
// empresa en el padrón, que es información interna, pero la palabra en sí es
// un servicio que Grupo Shefa vende (existe /servicios/repse). Prohibirla
// reprobaría páginas legítimas.
export const DATOS_PROHIBIDOS = ['BANORTE', 'SANTANDER', 'CLABE'];
```

Run: `npm test`
Expected: PASS, 6/6. Las pruebas del catálogo no dependen de REPSE.

- [ ] **Step 2: Escribir el script**

Crear `scripts/verificar-landings.mjs`:

```js
// ─────────────────────────────────────────────────────────────────────────────
//  VERIFICACIÓN DE LAS LANDINGS PUBLICADAS
//  Revisa el HTML ya construido (dist/) y falla si encontró información que no
//  debe salir a internet: la razón social de las empresas o los datos internos
//  del catálogo (RFC, banco, cuenta, CLABE).
//
//  Se corre con: npm run verificar   (después de npm run build)
// ─────────────────────────────────────────────────────────────────────────────

import { readFileSync } from 'node:fs';
import { readdir } from 'node:fs/promises';
import { join } from 'node:path';
import { NOMBRES_PROHIBIDOS, DATOS_PROHIBIDOS } from '../src/data/prohibidos.js';

const PROHIBIDOS = [...NOMBRES_PROHIBIDOS, ...DATOS_PROHIBIDOS];

// Junta todos los .html de dist/, recorriendo las subcarpetas.
async function archivosHtml(carpeta) {
  const encontrados = [];
  for (const entrada of await readdir(carpeta, { withFileTypes: true })) {
    const ruta = join(carpeta, entrada.name);
    if (entrada.isDirectory()) encontrados.push(...(await archivosHtml(ruta)));
    else if (entrada.name.endsWith('.html')) encontrados.push(ruta);
  }
  return encontrados;
}

// Deja solo lo que un visitante puede LEER en la página.
//
// Esto es lo que hace correcta a la verificación. La razón social sí vive en la
// URL —cada landing está en /geo-innovacion, /agropersonal, etc.—, así que si
// revisáramos el HTML crudo, cada enlace y cada etiqueta canónica se vería como
// una fuga. Lo que importa es el texto: quitamos los scripts, los estilos y
// todas las etiquetas, y nos quedamos con lo que se lee.
function textoVisible(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ');
}

const archivos = await archivosHtml('dist');
const hallazgos = [];

for (const archivo of archivos) {
  const texto = textoVisible(readFileSync(archivo, 'utf8')).toLowerCase();
  for (const prohibido of PROHIBIDOS) {
    if (texto.includes(prohibido.toLowerCase())) {
      hallazgos.push(`${archivo} contiene "${prohibido}"`);
    }
  }
}

if (hallazgos.length > 0) {
  console.error('✘ Se encontró información que no debe publicarse:\n');
  for (const hallazgo of hallazgos) console.error('  · ' + hallazgo);
  console.error(`\n${hallazgos.length} hallazgo(s). El sitio NO debe publicarse así.`);
  process.exit(1);
}

console.log(`✔ Limpio. Se revisaron ${archivos.length} páginas y ninguna filtra datos internos.`);
```

- [ ] **Step 3: Agregar el script a package.json**

En `package.json`, dentro de `"scripts"`, agregar después de `"test"`:

```json
    "verificar": "node scripts/verificar-landings.mjs"
```

Queda así el bloque completo:

```json
  "scripts": {
    "dev": "astro dev",
    "start": "astro dev",
    "build": "astro build",
    "preview": "astro preview",
    "test": "node --test tests/*.test.js",
    "verificar": "node scripts/verificar-landings.mjs"
  },
```

- [ ] **Step 4: Comprobar que el script sí detecta una filtración**

Metemos la razón social a propósito en una landing y confirmamos que el script la caza. Si no falla aquí, el script no sirve para nada.

Run:
```bash
npm run build
node -e "
const fs = require('fs');
const f = 'dist/geo-innovacion/index.html';
fs.writeFileSync(f, fs.readFileSync(f, 'utf8').replace('</main>', '<p>GEO Innovación</p></main>'));
console.log('Contaminado ' + f + ' a propósito');
"
npm run verificar
```
Expected: FALLA con código 1 y el mensaje `dist/geo-innovacion/index.html contiene "GEO Innovación"`.

- [ ] **Step 5: Comprobar que NO se confunde con la URL**

Esta es la otra mitad de la prueba, y la más importante. La razón social vive en la URL a propósito: `/agropersonal`, `/geo-innovacion`. Un verificador que revisara el HTML crudo marcaría cada enlace como fuga. Confirmamos que solo mira el texto que se lee.

Run:
```bash
npm run build && node -e "
const fs = require('fs');
const html = fs.readFileSync('dist/personal-para-it/index.html', 'utf8');
if (!html.includes('/agropersonal')) { console.error('La página no enlaza a /agropersonal; la prueba no sirve'); process.exit(1); }
console.log('OK: /personal-para-it enlaza a /agropersonal en el HTML crudo');
" && npm run verificar
```
Expected: `OK: /personal-para-it enlaza a /agropersonal en el HTML crudo`, y enseguida el verificador en verde. El enlace existe pero no cuenta como fuga, porque no es texto visible.

- [ ] **Step 6: Comprobar que el sitio que ya estaba publicado sigue limpio**

El verificador recorre todo `dist/`, no solo las landings nuevas. Confirmamos que no reprueba páginas que llevan meses en línea — en particular `/servicios/repse`, cuyo título es literalmente "REPSE".

Run:
```bash
npm run verificar && node -e "
const fs = require('fs');
const html = fs.readFileSync('dist/servicios/repse/index.html', 'utf8');
if (!html.includes('REPSE')) { console.error('La página de REPSE no menciona REPSE; algo se rompió'); process.exit(1); }
console.log('OK: /servicios/repse sigue diciendo REPSE y el verificador no la reprueba');
"
```
Expected: verificador en verde, seguido de `OK: /servicios/repse sigue diciendo REPSE y el verificador no la reprueba`.

- [ ] **Step 7: Correr todo junto una última vez**

Run:
```bash
npm test && npm run build && npm run verificar
```
Expected: pruebas en verde, build sin errores, verificación limpia.

- [ ] **Step 8: Commit**

```bash
git add src/data/prohibidos.js scripts/verificar-landings.mjs package.json
git commit -m "Verificar que el sitio publicado no filtre datos internos"
```

---

## Antes de publicar

**Bloqueante:** `src/data/sitio.js` tiene el teléfono y el WhatsApp en `+52 55 0000 0000` y el correo sin confirmar. Las siete landings los heredan. **No se hace merge a `main` hasta tener los datos reales**, porque el deploy a GitHub Pages es automático al hacer push a `main` (`.github/workflows/`).

**Revisión a ojo:** correr `npm run dev` y abrir las siete rutas en móvil y escritorio. El script verifica que no haya filtraciones, pero no que el copy se lea bien.

## Fuera de alcance, anotado como pendiente

Ninguna página enlaza hacia las landings. Quedan accesibles por URL directa y por el sitemap, que es suficiente para que Google las indexe y para campañas que apunten directo, pero un visitante del inicio no puede llegar a ellas navegando. Enlazarlas desde el inicio o el menú exige tocar `index.astro` o `Header.astro`, que el spec dejó fuera. Vale la pena decidirlo después de ver las landings publicadas.
