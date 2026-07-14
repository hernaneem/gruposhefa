# Landings por empresa — Diseño

Fecha: 2026-07-14
Estado: aprobado por Hernán

## Problema

Grupo Shefa es la matriz de siete empresas operadoras. Ninguna tiene presencia
web propia: quien busca "servicios de marketing y publicidad" no encuentra nada
del grupo, porque gruposhefa.com solo vende los servicios del despacho
(contabilidad, fiscal, jurídico, nómina).

Se necesita una página por empresa que venda sus servicios.

## Objetivo

Siete páginas de venta, una por empresa, dentro del sitio actual. Cada una se
presenta por los servicios que ofrece, no por la razón social.

Público: clientes nuevos que buscan un servicio. La página debe persuadir y
llevar a contacto.

## Decisiones

### El nombre de la empresa no aparece en el contenido

El título es el servicio. La razón social vive únicamente en la URL. No aparece
en el hero, ni en el cuerpo, ni al pie.

Consecuencia aceptada: las landings no sirven como respaldo institucional ni
para verificar quién factura. Son solo de venta. Se evaluó incluir el nombre al
pie para cubrir esos usos y se descartó.

### URLs por ruta, no por subdominio

`gruposhefa.com/geo-innovacion`, no `geo-innovacion.gruposhefa.com`.

Razones:

- GitHub Pages, el hosting actual, admite un solo dominio personalizado por
  repositorio. Los subdominios exigirían migrar a Cloudflare Pages.
- Las rutas concentran la autoridad SEO en un dominio. Cada subdominio arrancaría
  de cero en buscadores.
- Los guiones bajos no son válidos en nombres de host, así que `geo_innovacion`
  era imposible de todos modos.

Si más adelante se quieren subdominios, se migra el hosting sin rehacer contenido.

### Contacto único de Shefa

Las siete landings usan el teléfono, WhatsApp y correo centrales de
`src/data/sitio.js`. No hay contacto por empresa.

### Una empresa, una landing

Se evaluó fusionar por tema (dos empresas de publicidad en una sola página, dos
de tecnología en otra) para evitar contenido casi duplicado. Se descartó: Hernán
prefiere una página por empresa aunque algunas se parezcan.

Riesgo asumido: `/contenido-fuerza-y-medios` y `/geo-innovacion` comparten buena
parte de su catálogo, igual que `/personal-para-it` y
`/soluciones-empresariales-elite`. Se mitiga dándole a cada una un ángulo
distinto en la redacción, tomado de lo que sí las diferencia en el Excel:

- Contenido Fuerza y Medios: producción audiovisual y gráfica, locaciones,
  personal para producciones.
- GEO Innovación: marketing digital, medios, promocionales, impresión y
  mobiliario para eventos.
- Personal para IT: ejecución técnica, consultoría TI, ERP/CRM, mantenimiento
  de software.
- Soluciones Empresariales Elite: consultoría de negocio, planeación
  estratégica, constitución de sociedades, cumplimiento normativo.

`/administracion-y-finanzas` se solapa con lo que ya vende el home de Shefa. Se
incluye por decisión de Hernán.

## Fuente de contenido

`referencias/CATALOGO IPS OK.xlsx`, hoja "Catálogo IPS".

Solo se usa la columna **"puede facturar"** de cada empresa, reescrita a la voz
de marca del sitio (trato de "usted", tono de despacho profesional). Las viñetas
del Excel son notas administrativas, no copy de venta.

**Nunca se publica**: RFC, banco, cuenta, CLABE, estatus REPSE, ni la lista de
"no puede facturar". Es información interna.

De los nombres se omite el sufijo "de Grupo IPS".

## Arquitectura

Replica el patrón que el sitio ya usa para servicios: un archivo de datos como
única fuente de verdad, una plantilla que genera todas las páginas.

### Archivos nuevos

**`src/data/empresas.js`** — las siete entradas. Único archivo a editar para
cambiar contenido. Mismo estilo de comentarios que `src/data/servicios.js`.

Forma de cada entrada:

```js
{
  slug: 'geo-innovacion',            // la URL
  titulo: 'Servicios de marketing y publicidad',  // H1 y <title>
  etiqueta: 'Marketing y publicidad',             // giro, sobre el H1
  resumen: '...',                    // párrafo del hero y meta description
  icono: 'megafono',                 // nombre de un ícono de Icono.astro
  descripcion: ['...', '...'],       // párrafos del cuerpo
  ofrece: ['...'],                   // servicios, de "puede facturar"
}
```

No hay campo con la razón social: lo que no existe no se puede renderizar por
error.

**`src/pages/[empresa].astro`** — genera las siete rutas con `getStaticPaths()`.
Astro prioriza las rutas estáticas, así que `/aviso-de-privacidad` sigue
resolviendo a su propio archivo.

### Archivos modificados

**`src/components/Icono.astro`** — se agregan cuatro íconos que no existen:
`megafono`, `camara`, `monitor`, `planta`. El resto ya está.

**`src/components/TarjetaServicio.astro`** — hoy tiene el destino clavado a
`ruta(\`servicios/${slug}\`)`, así que no puede enlazar a `/geo-innovacion`. Gana
una prop `href` opcional: si se pasa, es el destino; si no, cae al comportamiento
actual. Los dos lugares que ya la usan siguen igual.

**`package.json`** — dos scripts nuevos: `test` y `verificar`. Sin dependencias
nuevas: las pruebas usan `node:test`, que viene con Node.

### Sin cambios

`Layout.astro`, `Header.astro`, `Footer.astro`, `BotonWhatsapp.astro`,
`global.css`, `tailwind.config.mjs`, `astro.config.mjs`, `index.astro`,
`servicios/[slug].astro`.

## Estructura de cada landing

Calcada de `src/pages/servicios/[slug].astro`.

1. **Hero** (`bg-verde-profundo`) — migas de pan, etiqueta con el giro, ícono
   dorado, H1 con el título de servicios, párrafo de entrada.
2. **Cuerpo** (`bg-white`, `lg:grid-cols-[1.4fr_0.6fr]`) — los párrafos de
   descripción, sección "¿Qué ofrecemos?" con `ofrece` en cuadrícula con
   palomitas, y a la derecha la tarjeta verde de contacto con "Agende una
   consulta" (a `#contacto` del home) y WhatsApp.
3. **Cierre** (`bg-hueso`) — tarjetas hacia las otras áreas del grupo, con
   `TarjetaServicio`.

## Las siete páginas

| slug | H1 | etiqueta | ícono |
|---|---|---|---|
| administracion-y-finanzas | Servicios de administración, contabilidad y finanzas | Administración y finanzas | calculadora |
| contenido-fuerza-y-medios | Servicios de publicidad, producción y eventos | Publicidad y eventos | camara |
| personal-para-it | Servicios y consultoría en tecnologías de la información | Tecnologías de la información | monitor |
| mantenimiento-y-construccion | Servicios de construcción y mantenimiento | Construcción y servicios inmobiliarios | edificio |
| agropersonal | Servicios agrícolas y de campo | Servicios agrícolas | planta |
| geo-innovacion | Servicios de marketing y publicidad | Marketing y publicidad | megafono |
| soluciones-empresariales-elite | Consultoría empresarial y servicios tecnológicos | Consultoría y tecnología | brujula |

## Dependencia bloqueante para publicar

`src/data/sitio.js` tiene datos de contacto provisionales: teléfono y WhatsApp
son `+52 55 0000 0000`, el correo es `contacto@gruposhefa.com` sin confirmar.

Las siete landings los heredan. Se construye con los provisionales, pero **no se
publica** hasta tener teléfono, WhatsApp y correo reales.

## Verificación

- `npm test` valida la forma de los datos y que el contenido no filtre razones
  sociales ni datos internos.
- `npm run build` genera las siete rutas sin errores, cada una con su título
  correcto, y sin romper el inicio, el aviso de privacidad ni las páginas de
  servicio.
- `npm run verificar` revisa el HTML ya construido en `dist/` y falla si
  encuentra razón social, RFC, CLABE, banco o REPSE.
- El sitemap incluye las siete rutas.
- Revisión a ojo en móvil y escritorio.

Sobre la regla del nombre: se hace cumplir contra los nombres **distintivos**
(Grupo IPS, GEO Innovación, Agropersonal, Soluciones Empresariales Elite,
Personal para IT, Contenido Fuerza y Medios). "Administración y Finanzas" y
"Mantenimiento y Construcción" quedan fuera de la regla: son palabras genéricas
del giro y aparecen inevitablemente en títulos legítimos como "Servicios de
construcción y mantenimiento".

## Fuera de alcance

- Migrar el hosting a Cloudflare para subdominios reales.
- Contacto por empresa.
- Formulario de contacto propio en cada landing: usan el del home.
- Traducciones.
- Cambios al home o a las páginas de servicio existentes.
