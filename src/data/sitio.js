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

  // ── Datos de contacto (PROVISIONALES — reemplazar) ──────────────────────
  correo: 'contacto@gruposhefa.com',
  telefono: '+52 55 0000 0000',
  // Para los enlaces "tel:" y de WhatsApp se usa el número sin espacios ni signos.
  telefonoEnlace: '525500000000',
  // Número de WhatsApp en formato internacional, solo dígitos.
  whatsapp: '525500000000',
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

// Enlace de WhatsApp ya armado (úsalo en botones y enlaces).
export const enlaceWhatsapp = `https://wa.me/${sitio.whatsapp}?text=${encodeURIComponent(
  sitio.whatsappMensaje,
)}`;
