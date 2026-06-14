// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

// Configuración de Astro.
//
// 'site'  = la dirección pública del sitio (se usa para SEO y el mapa del sitio).
// 'base'  = la subcarpeta donde se publica. Como el sitio usa el dominio propio
//           gruposhefa.com, se publica en la raíz '/'.
export default defineConfig({
  site: 'https://gruposhefa.com',
  base: '/',
  integrations: [tailwind(), sitemap()],
});
