// ─────────────────────────────────────────────────────────────────────────────
//  VERIFICACIÓN DE LAS LANDINGS PUBLICADAS
//  Revisa el HTML ya construido (dist/) y falla si encontró información que no
//  debe salir a internet: la razón social de las empresas o los datos internos
//  del catálogo (RFC, banco, cuenta, CLABE).
//
//  CRITERIO: una lista de EXCEPCIONES, no una lista de qué revisar.
//  Antes este script nombraba uno por uno los lugares a mirar (texto visible,
//  alt/title/aria-label, la meta description). Cada revisión encontró un hueco
//  nuevo que se le había olvidado a esa lista: el JSON-LD nunca se revisaba,
//  twitter:description no estaba, y atributos genéricos como value o
//  placeholder tampoco. El patrón es el mismo cada vez: mientras el script
//  vaya nombrando qué mirar, algo se le escapa.
//
//  Por eso se invierte el criterio: se revisa TODO el HTML construido —texto
//  visible, todos los atributos sin excepción, el contenido de cualquier
//  <script> (incluido application/ld+json), todas las <meta>— y solo se deja
//  fuera el puñado de lugares, pequeño y conocido, donde la URL de la página
//  vive de forma legítima. Cada landing se publica a propósito en una URL con
//  el nombre de la empresa (/geo-innovacion, /agropersonal, /personal-para-it,
//  etc.): es una decisión de producto, no una fuga, y esos lugares siempre van
//  a "sonar" a razón social sin serlo. Una lista de exclusión pequeña y cerrada
//  no se queda corta cuando aparece contenido nuevo en el HTML, porque no hay
//  que acordarse de agregarlo: por defecto, se revisa.
//
//  Se corre con: npm run verificar   (después de npm run build)
// ─────────────────────────────────────────────────────────────────────────────

import { readFileSync } from 'node:fs';
import { readdir } from 'node:fs/promises';
import { join } from 'node:path';
import { NOMBRES_PROHIBIDOS, DATOS_PROHIBIDOS, PATRONES_PROHIBIDOS } from '../src/data/prohibidos.js';
import { sitio } from '../src/data/sitio.js';

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

// Convierte entidades HTML a su carácter real, para que "GEO Innovaci&oacute;n"
// se compare como "GEO Innovación" y no se escape por escribirse con entidad.
// Cubre las entidades numéricas (&#243; y &#x2013;) y las nombradas más
// comunes en español: acentos, eñe, diéresis, &amp; y &nbsp;.
const ENTIDADES_NOMBRADAS = {
  amp: '&',
  nbsp: ' ',
  quot: '"',
  apos: "'",
  lt: '<',
  gt: '>',
  aacute: 'á',
  eacute: 'é',
  iacute: 'í',
  oacute: 'ó',
  uacute: 'ú',
  ntilde: 'ñ',
  uuml: 'ü',
  Aacute: 'Á',
  Eacute: 'É',
  Iacute: 'Í',
  Oacute: 'Ó',
  Uacute: 'Ú',
  Ntilde: 'Ñ',
  Uuml: 'Ü',
};

function decodificarEntidades(texto) {
  return texto.replace(/&(#x?[0-9a-fA-F]+|[a-zA-Z]+);/g, (coincide, cuerpo) => {
    if (cuerpo[0] === '#') {
      const esHex = cuerpo[1] === 'x' || cuerpo[1] === 'X';
      const codigo = esHex ? parseInt(cuerpo.slice(2), 16) : parseInt(cuerpo.slice(1), 10);
      return Number.isNaN(codigo) ? coincide : String.fromCodePoint(codigo);
    }
    return ENTIDADES_NOMBRADAS[cuerpo] ?? coincide;
  });
}

// ── Las únicas excepciones: dónde vive la URL de la página ─────────────────
// Se revisó a mano el HTML construido (dist/) para encontrar cada lugar donde
// la URL de una landing se repite. Son solo dos:
//
//   · El atributo href (de <link rel="canonical"> y de cualquier <a>) y el
//     atributo src (de <img> y de <link rel="stylesheet">), pero SOLO cuando
//     el valor es de verdad una ruta interna del sitio (ver esRutaInterna más
//     abajo). Antes se ignoraba el atributo completo, en cualquier etiqueta,
//     sin mirar el valor: eso escondía CUALQUIER cosa metida en un href o un
//     src, no solo las rutas. Un enlace "mailto:...?subject=Cotización para
//     GEO Innovación" pasaba limpio porque todo el atributo desaparecía, sin
//     que importara que ahí no vive ninguna URL de página. La excepción tiene
//     que acotarse a lo que en verdad puede llevar la razón social por
//     diseño —las rutas propias, /geo-innovacion, /servicios/repse,
//     #contacto— y no a "cualquier valor de href o src".
//   · El content de <meta property="og:url">, que repite la misma URL para
//     que redes sociales la muestren al compartir. A diferencia de href/src,
//     aquí la URL va en un atributo content, así que necesita su propia
//     excepción puntual: si ignoráramos TODO atributo "content" para taparla,
//     también dejaríamos de revisar la meta description y la de
//     twitter:description, que si son fuente legítima de fuga.
//
// No se encontró ningún otro lugar donde el HTML construido repita la URL de
// la página: ni breadcrumbs con URL absoluta, ni un campo "url" por landing en
// el JSON-LD (el único "url" del bloque application/ld+json es el del sitio
// completo, gruposhefa.com, igual en todas las páginas).

// Un valor de href/src es "ruta interna" —y por lo tanto legítimo para llevar
// el nombre de una empresa en su slug— en dos casos:
//
//   1. Es una URL absoluta del propio dominio: https://gruposhefa.com o
//      https://gruposhefa.com/lo-que-sea. El dominio se toma de
//      src/data/sitio.js, la misma fuente que usa el sitio para construirlas,
//      para no tener el valor repetido a mano en dos archivos.
//   2. Es una ruta relativa simple: /geo-innovacion, /servicios/repse,
//      #contacto, favicon.svg. Lo que las distingue de todo lo demás es que
//      NO llevan esquema (nada de "algo:" al inicio, que descarta mailto: y
//      tel:) y NO son "protocol-relative" (no empiezan con "//", que
//      apuntaría a otro host aunque no lleve esquema explícito).
//
// Cualquier otra cosa —un enlace externo (https://otro-dominio.com), un
// mailto:, un tel:, o un "//host-externo"— NO es ruta interna: su valor se
// deja tal cual en el HTML para que la revisión normal de atributos lo
// examine, igual que a cualquier alt o title.
//
// esRutaInterna juzga solo el PATH del valor, nunca el "?query" ni el
// "#fragmento" que pudieran venir pegados al final (eso lo separa quien la
// llama, en ocultarUrlDeLaPagina). Un href como
// "/contacto?asunto=Cotización para GEO Innovación" tiene un path interno
// legítimo, pero el query no vive en la URL de ninguna landing: es texto
// libre que puede traer una razón social, y por eso se revisa como
// cualquier otro valor.
function esRutaInterna(valor) {
  // sitio.dominio se interpola dentro de una regex, y el punto es un
  // metacarácter ahí: sin escapar, "gruposhefa.com" también hace match con
  // "gruposhefaXcom". Se escapan los metacaracteres antes de interpolar para
  // que la comparación sea contra el dominio literal, no un patrón laxo.
  const dominioEscapado = sitio.dominio.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const dominioPropio = new RegExp(`^https://${dominioEscapado}(?:/|$)`, 'i');
  if (dominioPropio.test(valor)) return true;

  const tieneEsquema = /^[a-z][a-z0-9+.-]*:/i.test(valor); // mailto:, tel:, https:, etc.
  if (tieneEsquema) return false;

  const esProtocolRelative = valor.startsWith('//'); // //host-externo.com
  if (esProtocolRelative) return false;

  return true; // /geo-innovacion, #contacto, servicios/repse, favicon.svg...
}

function ocultarUrlDeLaPagina(html) {
  const sinContentDeOgUrl = html.replace(/<meta\b[^>]*>/gi, (etiqueta) => {
    const esOgUrl = /\sproperty\s*=\s*(?:"og:url"|'og:url')/i.test(etiqueta);
    if (!esOgUrl) return etiqueta;
    return etiqueta.replace(/\scontent\s*=\s*(?:"[^"]*"|'[^']*')/i, ' content=""');
  });

  return sinContentDeOgUrl.replace(
    /\s(href|src)\s*=\s*(?:"([^"]*)"|'([^']*)')/gi,
    (coincidenciaCompleta, nombreAtributo, valorConDobles, valorConSimples) => {
      const conDobles = valorConDobles !== undefined;
      const valor = valorConDobles ?? valorConSimples ?? '';

      // esRutaInterna decide sobre el PATH, nunca sobre el valor entero: un
      // "?query" o un "#fragmento" pegado al final de una ruta interna no es
      // parte de la URL de la página, así que no debe eximirse solo porque
      // vive dentro del mismo href. Por ejemplo
      // "/contacto?asunto=Cotización para GEO Innovación" tiene un path
      // interno legítimo (/contacto) pero el query trae una razón social.
      const separador = valor.search(/[?#]/);
      const path = separador === -1 ? valor : valor.slice(0, separador);
      const resto = separador === -1 ? '' : valor.slice(separador);

      if (!esRutaInterna(path)) return coincidenciaCompleta; // no es ruta interna: se revisa completo, como antes

      if (!resto) return ''; // ruta interna sin query ni fragmento: se exime entera, como antes

      // Ruta interna CON query/fragmento: se exime solo el path y se
      // reconstruye el atributo dejando nada más el "?query"/"#fragmento",
      // para que la revisión normal de atributos (más abajo, en
      // textoParaRevisar) lo encuentre y lo examine como cualquier otro
      // valor.
      const comilla = conDobles ? '"' : "'";
      return ` ${nombreAtributo}=${comilla}${resto}${comilla}`;
    },
  );
}

// Los comentarios HTML (<!-- ... -->) SÍ se publican: cualquiera que abra
// "ver código fuente" en el navegador los ve. Y como todo este proyecto está
// comentado en español ("<!-- Logo -->", "<!-- Migas de pan -->"...), es
// plausible que alguien deje ahí una nota de trabajo con el nombre real de una
// empresa. El problema es que la línea que quita etiquetas más abajo,
// /<[^>]+>/g, no distingue un comentario de una etiqueta normal: como el
// contenido de un comentario casi nunca trae un ">", ese patrón hace match
// del comentario completo de un tirón (desde el "<" inicial hasta el primer
// ">", que es el del "-->") y lo borra entero, texto incluido. Por eso el
// contenido de los comentarios se extrae ANTES, con su propio patrón que sí
// entiende dónde empieza y dónde termina un comentario, para que ese texto se
// revise en vez de desaparecer.
function comentariosComoTexto(html) {
  const comentarios = [];
  const reComentario = /<!--([\s\S]*?)-->/g;
  let coincidencia;
  while ((coincidencia = reComentario.exec(html))) {
    comentarios.push(coincidencia[1]);
  }
  return comentarios;
}

// ── Todo lo demás se revisa ─────────────────────────────────────────────────
// Con la URL de la página ya neutralizada, el resto del HTML se revisa
// completo, sin enumerar qué mirar:
//
//   · Atributos: cualquier par nombre="valor" que quede en el HTML, sea cual
//     sea su nombre (alt, title, aria-label, value, placeholder, data-*, el
//     content de description/og:description/twitter:description...). No se
//     filtra por nombre de atributo, así que un atributo nuevo que aparezca
//     mañana se revisa solo por estar ahí, sin tocar este archivo.
//   · Comentarios: su contenido, extraído aparte (ver comentariosComoTexto).
//   · Texto y <script>: al quitar solo las ETIQUETAS (no lo que hay dentro),
//     el contenido de un <script type="application/ld+json"> queda como si
//     fuera un párrafo más de la página. Así se revisa el JSON-LD sin tratarlo
//     como caso especial, y sin descartar los <script> como hacía la versión
//     anterior.
//
// Se generan dos variantes del texto sin etiquetas, igual que antes:
//   · conEspacios: cada etiqueta se sustituye por un espacio.
//   · sinEspacios: la etiqueta se borra sin dejar espacio.
// La razón: "GE<strong>O</strong> Innovación" con la primera variante queda
// "GE O Innovación" (con espacio de más, no coincide), pero con la segunda
// queda "GEO Innovación" (la palabra se partió justo ahí, sin espacio real en
// el HTML fuente). Revisamos ambas y basta con que la fuga aparezca en una.
function textoParaRevisar(html) {
  const sinUrlPropia = ocultarUrlDeLaPagina(html);

  const atributos = [];
  const reAtributo = /\s[\w-]+\s*=\s*(?:"([^"]*)"|'([^']*)')/g;
  let coincidencia;
  while ((coincidencia = reAtributo.exec(sinUrlPropia))) {
    atributos.push(coincidencia[1] ?? coincidencia[2] ?? '');
  }

  const comentarios = comentariosComoTexto(sinUrlPropia);

  const conEspacios = sinUrlPropia.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ');
  const sinEspacios = sinUrlPropia.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ');

  return decodificarEntidades(
    [conEspacios, sinEspacios, atributos.join(' '), comentarios.join(' ')].join(' '),
  );
}

let archivos;
try {
  archivos = await archivosHtml('dist');
} catch (error) {
  if (error.code === 'ENOENT') {
    console.error('✘ No existe la carpeta dist/. Corre "npm run build" antes de "npm run verificar".');
    process.exit(1);
  }
  throw error;
}

const hallazgos = [];

for (const archivo of archivos) {
  const textoOriginal = textoParaRevisar(readFileSync(archivo, 'utf8'));
  const texto = textoOriginal.toLowerCase();
  for (const prohibido of PROHIBIDOS) {
    if (texto.includes(prohibido.toLowerCase())) {
      hallazgos.push(`${archivo} contiene "${prohibido}"`);
    }
  }

  // Los patrones de RFC y CLABE se revisan sobre el texto SIN convertir a
  // minúsculas: un RFC real siempre se escribe en mayúsculas, así que
  // comparar contra el texto tal cual evita tener que reescribir el patrón
  // con un rango de letras en minúscula además del de mayúscula.
  //
  // Se usa String#match (no patron.test ni patron.exec) a propósito: estos
  // patrones llevan la bandera "g", y con "g" tanto test como exec conservan
  // lastIndex entre llamadas. Como el mismo objeto de patrón se reutiliza en
  // cada vuelta de este for (uno por archivo), usar test/exec aquí
  // encontraría coincidencias en un archivo y luego, dependiendo de en qué
  // posición se quedó lastIndex, se las saltaría en el siguiente: un bug
  // intermitente y difícil de reproducir. String#match siempre reinicia
  // lastIndex a 0 antes de buscar, así que es segura para reutilizar el mismo
  // patrón una y otra vez.
  for (const { nombre, patron } of PATRONES_PROHIBIDOS) {
    const coincidencias = textoOriginal.match(patron) ?? [];
    for (const coincidencia of coincidencias) {
      hallazgos.push(`${archivo} contiene algo con forma de ${nombre}: "${coincidencia}"`);
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
