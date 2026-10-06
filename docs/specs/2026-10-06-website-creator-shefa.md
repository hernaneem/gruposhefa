# Grupo Shefa: los 20 puntos y la mudanza a Vercel — Spec
> 2026-10-06 · Estado: en revisión de Hernán

## Problema

La auditoría de `website-creator` sobre gruposhefa.com (6 oct 2026) dio 🔴 en 10 de los 20 puntos.

**Faltan:**
- los términos y el banner de cookies;
- la sección de cookies del aviso;
- el campo trampa y Turnstile en el formulario, que además solo abre el correo del visitante (`mailto:`) y "Mensaje" no es obligatorio.

**Fallan:**
- la descripción del inicio mide 248 caracteres;
- la imagen para compartir mide 2089×991 y pesa 1.7 MB;
- Lighthouse móvil da 87 (LCP 2.8 s) y 77 en Buenas prácticas;
- hay textos sin contraste AA;
- el `.gitignore` no cubre `.env.local`.

El sitio vive en GitHub Pages (publicado con GitHub Actions), que no permite HSTS y cuyas reglas no favorecen sitios comerciales, y el repo `hernaneem/gruposhefa` es público.

## Solución

El sitio conserva su diseño y su contenido, y completa los 20 puntos. Se publica en el Vercel Pro de Hernán: primero en `*.vercel.app` con una vista previa por rama, y al final en gruposhefa.com, con el cambio de DNS en name.com que Hernán autoriza. El formulario de contacto pasa a ser real: lo recibe una función del mismo proyecto, Turnstile frena a los bots y Resend manda el mensaje a `contacto@gruposhefa.com` con respuesta al visitante. El CTA principal es "Agenda una asesoría". Los textos legales salen de `legal-mx` con `[FALTA DATO]` donde falten datos de Grupo Shefa, así que el sitio no pasa a producción hasta tenerlos.

## Historias de usuario

1. Como visitante, quiero mandar el formulario sin salir del sitio y ver que llegó, en vez de que se abra mi programa de correo.
2. Como visitante, quiero ver errores claros si me falta un campo o el correo está mal.
3. Como visitante de la landing de una empresa del grupo, quiero que mi mensaje llegue marcado con esa área.
4. Como visitante, quiero rechazar las cookies con la misma facilidad que aceptarlas.
5. Como visitante, quiero leer el aviso de privacidad (con cookies) y los términos desde cualquier pie de página.
6. Como visitante en celular, quiero que el sitio cargue en menos de 2.5 s.
7. Como Hernán, quiero recibir cada contacto en `contacto@gruposhefa.com` y contestar directo al visitante.
8. Como Hernán, quiero que los bots no puedan mandar el formulario ni leer el correo del sitio.
9. Como Hernán, quiero que al compartir cualquier página salga una tarjeta ligera con la marca.
10. Como Hernán, quiero cada cambio en una vista previa con su semáforo antes del merge.
11. Como Hernán, quiero autorizar yo el cambio de DNS de gruposhefa.com sin que se pierda el correo de Outlook.
12. Como Hernán, quiero que el repo quede privado cuando el sitio viva en Vercel.

## Decisiones

**H1 (VoBo Hernán 2026-10-06, Q3/Q4):** Proyecto `gruposhefa` en el Vercel Pro, conectado al repo, con el preset de Astro (salida estática). `main` publica en producción y cada rama en una vista previa. Se apaga el workflow de GitHub Pages después del cambio de DNS. Descartado: seguir en GitHub Pages (D9 de la skill).

**H2 (VoBo Hernán 2026-10-06, Q4):** El cambio a gruposhefa.com se hace al final de la ola, con el MCP de name.com y la autorización de Hernán el mismo día:
- el apex y `www` apuntan a Vercel;
- MX, SPF y DMARC de Outlook no se tocan;
- se toma una foto de los registros antes del cambio, para poder revertirlo.

**H3 (VoBo Hernán 2026-10-06, Q5/Q10):** El formulario usa la pieza de `website-creator`: la función `api/contacto` en el mismo proyecto, campo trampa, Turnstile verificado en el servidor y Resend.
- El correo sale desde `gruposhefa.com` verificado en Resend; los registros DKIM y SPF de Resend se agregan en name.com.
- Llega a `contacto@gruposhefa.com` con respuesta al visitante.
- En las landings de empresa se conserva el dato oculto del área.

Descartado: Formspree o Web3Forms (D7 de la skill).

**H4 (VoBo Hernán 2026-10-06, Q10):** El CTA principal es "Agenda una asesoría" y lleva al formulario, porque hoy no hay WhatsApp (`sitio.js` lo deja vacío a propósito). Va marcado `data-cta="principal"` en la primera pantalla y `data-cta="final"` al final, en cada página.

**H5 (VoBo Hernán 2026-10-06, Q6):** El aviso de privacidad del sitio (con la sección de cookies, el formulario y Resend como encargado) y los términos de uso salen de `legal-mx`, con `[FALTA DATO]` en los datos de Grupo Shefa. Mientras queden, los puntos 1 y 2 están en 🔴 y el merge a `main` espera los datos.

**H6 (VoBo Hernán 2026-10-06, Q7):** Se conserva el diseño actual. Solo cambia lo que exigen los puntos: tonos para AA, la imagen para compartir (1200×630 JPG menor a 300 KB), la longitud de las descripciones, la carga de recursos para el LCP y lo que baja Buenas prácticas a 77.

**H7 (VoBo Hernán 2026-10-06, D6 de la skill):** Banner de cookies de la pieza, con GA4 listo y apagado (`data-ga4-id=""`).

**H8 (VoBo Hernán 2026-10-06, Q9):** El repo `hernaneem/gruposhefa` pasa a privado cuando la producción en Vercel esté arriba.

## Testing

**Seams:**
- `verificar-sitio` en modo carpeta sobre `dist/` mientras se construye.
- `verificar-sitio` contra la vista previa con el link temporal del MCP (D24).
- Las pruebas de la pieza del formulario, que ya existen en la skill.

Las pruebas propias del repo (`npm test`) siguen en verde. La revisión a mano con Playwright cubre el banner, el envío del formulario (con errores, con el campo trampa lleno y un envío real a Resend en la vista previa), los 375 px, el CTA y los textos legales.

## Producción

- **Capa 1:** las llaves de Resend y de Turnstile viven solo en las variables de entorno de Vercel.
- **Capa 4:** el receptor valida todo en el servidor.
- **Capa 6:** Turnstile, campo trampa y cabeceras de seguridad.
- **Capa 7:** Turnstile; la regla de límite en el firewall queda en el ticket de la skill hernaneem/skills#22.
- **Capa 10:** los fallos de Resend quedan en los logs de Vercel; la alerta está en hernaneem/skills#23.

## Fuera de alcance

- WhatsApp y teléfono: cuando haya números reales (`sitio.js`).
- GA4: cuando haya cuenta (D6).
- Contenido nuevo o rediseño: explícitamente nunca en esta ola.

## Criterios de aceptación

1. `verificar-sitio` sobre la vista previa da 🟢 en todo, salvo 🔴 en 1 y 2 por `[FALTA DATO]` y 🟡 en 19.
2. Un envío real del formulario en la vista previa llega a `contacto@gruposhefa.com` con respuesta al visitante. Con el campo trampa lleno, o sin Turnstile, el servidor lo rechaza.
3. Las landings de empresa mandan el área en el correo.
4. Lighthouse móvil da 90 o más en las cuatro categorías, con LCP menor a 2.5 s.
5. Antes del merge, Hernán ve las capturas de antes y después con el mismo diseño.
6. Tras el cambio de DNS, gruposhefa.com responde desde Vercel con HSTS, el correo de Outlook sigue llegando y GitHub Pages queda apagado.

## Preguntas abiertas

1. **Turnstile:** ¿tienes cuenta de Cloudflare? Ahí se crean la llave pública y la secreta del widget, gratis. Propuesta: la creas tú y pones la secreta en Vercel. Contesta: Hernán.
2. **Resend:** ¿se usa la misma cuenta de naas-facturacion? Hay que agregar `gruposhefa.com` como dominio y poner la llave en Vercel. Propuesta: tú agregas el dominio en Resend y me pasas los registros DNS que te da, sin la llave; yo los pongo en name.com. Las dos llaves secretas las escribes tú en Vercel (Settings → Environment Variables) y nunca pasan por el chat. Contesta: Hernán.
