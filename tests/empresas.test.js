// ─────────────────────────────────────────────────────────────────────────────
//  PRUEBAS DEL CATÁLOGO DE EMPRESAS
//  Se corren con: npm test
//  La prueba importante es la última: hace cumplir la regla de que ni la razón
//  social ni los datos internos del Excel pueden llegar a una página pública.
// ─────────────────────────────────────────────────────────────────────────────

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { empresas, otrasEmpresas } from '../src/data/empresas.js';
import { NOMBRES_PROHIBIDOS, DATOS_PROHIBIDOS, PATRONES_PROHIBIDOS } from '../src/data/prohibidos.js';

const CAMPOS_TEXTO = ['slug', 'titulo', 'etiqueta', 'resumen', 'icono'];
const CAMPOS_LISTA = ['descripcion', 'ofrece'];

test('hay exactamente ocho empresas', () => {
  assert.equal(empresas.length, 8);
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
    const textoOriginal = [
      empresa.titulo,
      empresa.etiqueta,
      empresa.resumen,
      ...empresa.descripcion,
      ...empresa.ofrece,
    ].join(' ');
    const texto = textoOriginal.toLowerCase();

    for (const prohibido of [...NOMBRES_PROHIBIDOS, ...DATOS_PROHIBIDOS]) {
      assert.ok(
        !texto.includes(prohibido.toLowerCase()),
        `${empresa.slug}: el contenido público contiene "${prohibido}"`,
      );
    }

    // Además de la lista literal, el contenido no puede traer nada con FORMA
    // de RFC o de CLABE, aunque no sea ninguno de los que el catálogo conoce
    // (por ejemplo, el RFC de un cliente pegado por error en el copy). Se usa
    // textoOriginal, sin pasar a minúsculas: un RFC real siempre se escribe
    // en mayúsculas, y el patrón de RFC solo reconoce mayúsculas.
    //
    // Se usa String#match, no patron.test(): los patrones llevan la bandera
    // "g", y con "g" ese método conserva lastIndex entre llamadas. Como el
    // mismo objeto de patrón se reutiliza en cada vuelta de este for (uno por
    // empresa), usar test() aquí arrastraría el lastIndex de una empresa a la
    // siguiente y se saltaría coincidencias reales de forma intermitente.
    // match() siempre reinicia lastIndex a 0 antes de buscar.
    for (const { nombre, patron } of PATRONES_PROHIBIDOS) {
      const coincidencias = textoOriginal.match(patron);
      assert.ok(
        !coincidencias,
        `${empresa.slug}: el contenido público contiene algo con forma de ${nombre} ("${coincidencias?.[0]}")`,
      );
    }
  }
});

test('prohibidos.js no contiene ningún RFC ni CLABE en texto plano', () => {
  // El propio archivo que define los patrones tiene que pasar su propio
  // filtro. Esta prueba es la que evita que alguien vuelva a pegar un RFC o
  // una CLABE reales "solo por esta vez, ya los voy a quitar después": si lo
  // hace, npm test se rompe antes de que ese commit llegue a ningún lado.
  const fuente = readFileSync(new URL('../src/data/prohibidos.js', import.meta.url), 'utf8');

  for (const { nombre, patron } of PATRONES_PROHIBIDOS) {
    const coincidencias = fuente.match(patron);
    assert.ok(
      !coincidencias,
      `src/data/prohibidos.js contiene algo con forma de ${nombre} en texto plano: "${coincidencias?.[0]}"`,
    );
  }
});
