// ─────────────────────────────────────────────────────────────────────────────
//  AYUDANTE DE RUTAS — GRUPO SHEFA
//  GitHub Pages publica el sitio en una subcarpeta (ej. /gruposhefa/), mientras
//  que un dominio propio lo publica en la raíz (/). Esta función arma los
//  enlaces internos respetando esa "base" automáticamente, para que las
//  imágenes y los enlaces nunca se rompan, viva donde viva el sitio.
//
//  La base se configura una sola vez en astro.config.mjs (opción "base").
//
//  Uso:
//    ruta()                       → "/gruposhefa/"            (inicio)
//    ruta('servicios/auditoria')  → "/gruposhefa/servicios/auditoria"
//    ruta('#contacto')            → "/gruposhefa/#contacto"
//    ruta('favicon.svg')          → "/gruposhefa/favicon.svg"
// ─────────────────────────────────────────────────────────────────────────────

const BASE = import.meta.env.BASE_URL; // p. ej. "/" o "/gruposhefa/"

export function ruta(path: string = ''): string {
  const base = BASE.endsWith('/') ? BASE : BASE + '/';
  const limpio = String(path).replace(/^\//, '');
  return base + limpio;
}
