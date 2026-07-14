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

// Bancos del catálogo interno, y la palabra "CLABE" en sí. Esto SÍ puede vivir
// como texto literal: son nombres públicos de instituciones financieras, no
// datos que identifiquen a una empresa ni habiliten fraude.
//
// "ALBO", uno de los bancos, queda fuera a propósito: son cuatro letras que
// aparecen dentro de otras palabras (por ejemplo, "caballo") y darían falsos
// positivos. Los patrones de RFC y CLABE de abajo ya cubren ese riesgo: un
// RFC o una CLABE reales seguirían cazándose aunque "ALBO" no esté en esta
// lista.
//
// "REPSE" tampoco entra aquí: el catálogo interno guarda el estatus de cada
// empresa en el padrón, que es información interna, pero la palabra en sí es
// un servicio que Grupo Shefa vende (existe /servicios/repse y aparece en el
// inicio). Prohibirla reprobaría páginas legítimas.
export const DATOS_PROHIBIDOS = ['BANORTE', 'SANTANDER', 'CLABE'];

// RFC y CLABE reales de las siete empresas — detectados por FORMA, no por
// VALOR.
//
// Este repositorio es PÚBLICO. La primera versión de este archivo traía los
// seis RFC y las cinco CLABE del catálogo escritos tal cual, para que los
// guardianes los compararan por igualdad exacta. El problema es que
// "escribirlos aquí para que nadie los publique" ES publicarlos: en cuanto
// ese commit se empuja al remoto, quedan en el historial de git para
// siempre —visibles para cualquiera que clone el repo— sin importar que
// después se borren de HEAD. Las CLABE son lo más delicado de los dos: una
// CLABE real filtrada habilita fraude de suplantación de proveedor (alguien
// la usa para hacerse pasar por la empresa y desviar un pago a su propia
// cuenta).
//
// La solución es detectar por FORMA: un RFC de persona moral y una CLABE
// tienen una estructura fija y reconocible sin necesitar el valor real.
//   · RFC de persona moral: 3 letras (pueden incluir Ñ y &) + 6 dígitos de
//     fecha (AAMMDD) + 3 caracteres alfanuméricos de homoclave.
//   · CLABE: exactamente 18 dígitos seguidos.
// Guardar el PATRÓN en vez del VALOR cierra la fuga —este archivo no
// contiene ningún secreto— y además vuelve al guardián más estricto: caza
// cualquier RFC o CLABE con esa forma, no solo los seis que la lista vieja
// conocía. Una empresa nueva que se agregue al catálogo mañana, o el RFC de
// un cliente pegado por error en un párrafo de copy, caen igual sin que haya
// que acordarse de actualizar esta lista.
//
// Llevan la bandera "g" porque scripts/verificar-landings.mjs necesita
// encontrar TODAS las coincidencias en una página (no solo la primera) para
// reportarlas. Ojo si se reutilizan estos patrones en otro lado: con "g",
// RegExp#test y RegExp#exec conservan lastIndex entre llamadas, lo que
// produce falsos negativos intermitentes si se llama dos veces seguidas sobre
// cadenas distintas. String#match no tiene ese problema (siempre reinicia
// lastIndex en 0), y es la forma recomendada de usar estos patrones.
export const PATRONES_PROHIBIDOS = [
  { nombre: 'RFC', patron: /\b[A-ZÑ&]{3}\d{6}[A-Z0-9]{3}\b/g },
  { nombre: 'CLABE', patron: /\b\d{18}\b/g },
];
