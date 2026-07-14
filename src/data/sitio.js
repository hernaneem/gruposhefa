// ─────────────────────────────────────────────────────────────────────────────
//  DATOS DEL SITIO — GRUPO SHEFA
//  Edita aquí los datos de contacto, enlaces y textos clave de la marca.
//  Estos valores son PROVISIONALES: reemplázalos por los reales cuando los tengas.
// ─────────────────────────────────────────────────────────────────────────────

export const sitio = {
  nombre: 'Grupo Shefa',
  dominio: 'gruposhefa.com',
  url: 'https://gruposhefa.com',

  // Promesa y mensajes de marca (tomados del manual de marca).
  promesa: 'Prosperidad con cumplimiento',
  tagline: 'Su prosperidad, en orden.',
  descripcion:
    'Despacho de servicios profesionales fiscales, contables, jurídicos y financieros en México. Damos cumplimiento a las obligaciones de su empresa con rigor técnico y la acompañamos con planeación conforme a la ley, para que opere con orden y certeza.',

  // ── Datos de contacto ─────────────────────────────────────────────────
  correo: 'contacto@gruposhefa.com',

  // ⚠️ TELÉFONO Y WHATSAPP — SE DEJAN VACÍOS A PROPÓSITO ('').
  // Antes había un número inventado (+52 55 0000 0000) marcado como
  // "provisional", pero ya estaba en vivo en el sitio: aparecía en el pie
  // de página y en el botón flotante de WhatsApp como si fuera real.
  //
  // Mientras estos tres campos estén vacíos, el teléfono y los botones de
  // WhatsApp NO se muestran en ninguna parte del sitio (pie de página,
  // botón flotante, botones "Escríbanos por WhatsApp" de las landings,
  // datos estructurados para buscadores, etc.). El correo sí se sigue
  // mostrando siempre.
  //
  // ✅ PARA REACTIVARLOS: escribe aquí abajo el teléfono y el WhatsApp
  // reales y vuelve a construir el sitio (npm run build). No hay que tocar
  // ningún componente ni descomentar nada — reaparecen solos en todo el
  // sitio. Ejemplo de cómo se vería con datos reales:
  //   telefono:       '+52 55 1234 5678'   ← el que ve el usuario
  //   telefonoEnlace: '525512345678'       ← mismos dígitos, sin espacios ni signos (para "tel:")
  //   whatsapp:       '525512345678'       ← número de WhatsApp, formato internacional, solo dígitos
  telefono: '',
  telefonoEnlace: '',
  whatsapp: '',
  whatsappMensaje: 'Hola, me gustaría agendar una consulta con Grupo Shefa.',

  // Dirección (PROVISIONAL — reemplazar).
  direccion: 'Ciudad de México, México',

  // Redes sociales (opcional — deja vacío '' lo que no se use todavía).
  redes: {
    linkedin: '',
    facebook: '',
    instagram: '',
  },
};

// Indicadores derivados: los componentes deben preguntar por estos en vez
// de comparar sitio.telefono / sitio.whatsapp contra '' cada uno por su cuenta.
// Así, el día que se llenen los datos reales, todo el sitio se actualiza solo.
export const hayTelefono = Boolean(sitio.telefono.trim() && sitio.telefonoEnlace.trim());
export const hayWhatsapp = Boolean(sitio.whatsapp.trim());

// Enlace de WhatsApp ya armado (úsalo en botones y enlaces).
// Si no hay WhatsApp configurado, queda como cadena vacía a propósito, para
// que sea imposible usarlo por accidente (evita un enlace roto del tipo
// "https://wa.me/?text=..." sin número).
export const enlaceWhatsapp = hayWhatsapp
  ? `https://wa.me/${sitio.whatsapp}?text=${encodeURIComponent(sitio.whatsappMensaje)}`
  : '';
