// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

// Configuración de Astro.
//
// 'site'  = la dirección pública del sitio (se usa para SEO y el mapa del sitio).
// 'base'  = la subcarpeta donde se publica. GitHub Pages publica en
//           /NOMBRE-DEL-REPOSITORIO/, por eso aquí va '/gruposhefa/'.
//
// 👉 Cuando conectes tu dominio propio (gruposhefa.com), cambia:
//      site: 'https://gruposhefa.com'   y   base: '/'
//    y vuelve a publicar.
export default defineConfig({
  site: 'https://ECHEVERRIA-USUARIO.github.io',
  base: '/gruposhefa/',
  integrations: [tailwind(), sitemap()],
});
