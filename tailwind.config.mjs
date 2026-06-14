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
        // Verde esmeralda — color principal (logo, títulos, botones).
        'verde': '#0F5C46',
        // Verde profundo — fondos de sección oscuros y pie de página.
        'verde-profundo': '#083930',
        // Dorado — acento premium (líneas, íconos, botón destacado). Úsalo poco.
        'dorado': '#C7A765',
        // Negro tinta — texto sobre fondos claros.
        'tinta': '#141414',
        // Hueso — fondo cálido alternativo, da un toque premium.
        'hueso': '#F5F3EC',
        // (El blanco #FFFFFF ya viene incluido en Tailwind como 'white'.)
      },
      fontFamily: {
        // Montserrat para títulos y encabezados (fuerza y carácter).
        titulo: ['Montserrat', 'system-ui', 'sans-serif'],
        // Inter para el cuerpo de texto (claridad y lectura).
        texto: ['Inter', 'system-ui', 'sans-serif'],
      },
      // Ancho máximo del contenido para que las secciones respiren.
      maxWidth: {
        contenido: '1180px',
      },
    },
  },
  plugins: [],
};
