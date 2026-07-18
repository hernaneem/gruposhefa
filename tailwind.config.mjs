/** @type {import('tailwindcss').Config} */

// ─────────────────────────────────────────────────────────────────────────────
//  COLORES Y TIPOGRAFÍA DE LA MARCA GRUPO SHEFA
//  Este es el lugar central para editar la identidad visual del sitio.
//  Si en el futuro cambia un color de marca, cámbialo AQUÍ y se actualiza
//  en todo el sitio automáticamente.
// ─────────────────────────────────────────────────────────────────────────────

export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Azul corporativo — color de acción (botones, enlaces, íconos).
        'azul': '#1E40AF',
        // Azul marino — títulos sobre fondo claro y fondos de sección oscuros.
        'azul-profundo': '#1E3A8A',
        // Azul noche — el fondo más oscuro (hero, pie de página).
        'noche': '#172554',
        // Celeste — acento secundario para detalles sobre fondos oscuros.
        'celeste': '#60A5FA',
        // Dorado — acento premium heredado del logo (líneas, íconos, botón destacado).
        'dorado': '#C7A765',
        // Negro tinta — texto sobre fondos claros.
        'tinta': '#0F172A',
        // Niebla — fondo claro alternativo, frío y limpio.
        'niebla': '#F6F8FB',
        // (El blanco #FFFFFF ya viene incluido en Tailwind como 'white'.)
      },
      fontFamily: {
        // Poppins para títulos y encabezados (moderna y profesional).
        titulo: ['Poppins', 'system-ui', 'sans-serif'],
        // Open Sans para el cuerpo de texto (claridad y lectura).
        texto: ['"Open Sans"', 'system-ui', 'sans-serif'],
      },
      // Ancho máximo del contenido para que las secciones respiren.
      maxWidth: {
        contenido: '1180px',
      },
    },
  },
  plugins: [],
};
