// ─────────────────────────────────────────────────────────────────────────────
//  CATÁLOGO DE SERVICIOS — GRUPO SHEFA
//  Esta es la única fuente de verdad de los servicios. Con esta lista se
//  generan automáticamente: las tarjetas del home y la página de cada servicio.
//
//  Para agregar un servicio nuevo: copia un bloque { ... } y edítalo.
//  - slug:        identificador para la URL (sin espacios, sin acentos, en minúsculas).
//  - titulo:      nombre del servicio.
//  - resumen:     frase corta para la tarjeta del home.
//  - icono:       nombre de un ícono disponible (ver src/components/Icono.astro).
//  - descripcion: párrafos de la página individual (en la voz de marca: trato de "usted").
//  - incluye:     lista de puntos concretos que abarca el servicio.
// ─────────────────────────────────────────────────────────────────────────────

// Las 4 categorías en las que se agrupan los servicios.
export const categorias = [
  {
    id: 'contabilidad-fiscal',
    titulo: 'Contabilidad y fiscal',
    resumen: 'Su contabilidad al día y su empresa estructurada para pagar lo justo, dentro de la ley.',
    icono: 'calculadora',
  },
  {
    id: 'juridico',
    titulo: 'Jurídico',
    resumen: 'Lo respaldamos y defendemos en cada frente legal de su empresa.',
    icono: 'balanza',
  },
  {
    id: 'nomina',
    titulo: 'Nómina y capital humano',
    resumen: 'Su nómina bien calculada y en regla, sin que usted se complique.',
    icono: 'personas',
  },
  {
    id: 'financieros',
    titulo: 'Servicios financieros',
    resumen: 'Soluciones de crédito y activos digitales con respaldo y cumplimiento.',
    icono: 'monedas',
  },
];

export const servicios = [
  // ── 1. Contabilidad y fiscal ───────────────────────────────────────────
  {
    slug: 'implementacion-sistema-contabilidad',
    categoria: 'contabilidad-fiscal',
    titulo: 'Implementación de sistema de contabilidad',
    resumen: 'Dejamos su contabilidad bien montada desde cero.',
    icono: 'estructura',
    descripcion: [
      'Empezar bien lo cambia todo. Montamos su contabilidad desde cero, con un sistema ordenado y a la medida de su empresa, para que cada peso que entra y sale quede registrado como debe ser.',
      'Así, desde el primer día tiene información clara para tomar decisiones y cumple con el SAT sin sobresaltos. Lo dejamos listo para crecer, no para improvisar.',
    ],
    incluye: [
      'Diseño del catálogo de cuentas a la medida de su negocio',
      'Configuración del sistema contable y sus procesos',
      'Capacitación a su equipo para mantener el orden',
      'Punto de partida limpio y confiable para crecer',
    ],
  },
  {
    slug: 'regularizacion-contable',
    categoria: 'contabilidad-fiscal',
    titulo: 'Regularización contable',
    resumen: 'Lo ponemos al día si va atrasado con su contabilidad.',
    icono: 'reloj',
    descripcion: [
      'Si su contabilidad quedó atrás, no se preocupe: lo ponemos al corriente. Revisamos periodo por periodo, ordenamos lo pendiente y dejamos sus números claros y al día.',
      'Recuperar el orden le quita un peso de encima y lo deja en regla frente a la autoridad, listo para seguir adelante con tranquilidad.',
    ],
    incluye: [
      'Diagnóstico de su situación contable actual',
      'Ordenamiento de periodos atrasados',
      'Conciliación de cuentas y movimientos',
      'Plan para mantenerse al día de aquí en adelante',
    ],
  },
  {
    slug: 'contabilidad-mensual',
    categoria: 'contabilidad-fiscal',
    titulo: 'Contabilidad mensual',
    resumen: 'Llevamos su contabilidad al corriente, mes con mes.',
    icono: 'calendario',
    descripcion: [
      'Nos hacemos cargo de su contabilidad mes con mes, para que usted se dedique a su negocio y no a los números. Registramos sus operaciones, presentamos sus declaraciones y le entregamos información clara y oportuna.',
      'Cada mes sabe exactamente cómo va su empresa y cumple en tiempo con sus obligaciones. Sin prisas de último momento, sin sorpresas.',
    ],
    incluye: [
      'Registro mensual de ingresos, gastos y operaciones',
      'Cálculo y presentación de declaraciones',
      'Reportes claros del estado de su empresa',
      'Atención cercana para resolver sus dudas',
    ],
  },
  {
    slug: 'planeacion-fiscal-corporativa',
    categoria: 'contabilidad-fiscal',
    titulo: 'Planeación fiscal corporativa',
    resumen: 'Estructuramos su empresa para que pague lo justo, dentro de la ley.',
    icono: 'estrategia',
    descripcion: [
      'No se trata de pagar menos a la fuerza, sino de pagar lo justo. Analizamos su empresa y la estructuramos para aprovechar cada beneficio que la ley permite, optimizando legalmente su carga fiscal.',
      'El resultado: usted conserva más de lo que genera, con cada decisión bien sustentada y lista para resistir cualquier revisión. Prosperidad con cumplimiento, sin atajos riesgosos.',
    ],
    incluye: [
      'Análisis de su estructura y carga fiscal actual',
      'Estrategias de optimización legal a su medida',
      'Aprovechamiento de los beneficios que la ley permite',
      'Soporte documental sólido ante el SAT',
    ],
  },
  {
    slug: 'facturacion-cfdi',
    categoria: 'contabilidad-fiscal',
    titulo: 'Facturación (CFDI)',
    resumen: 'Emitimos y administramos sus facturas electrónicas.',
    icono: 'documento',
    descripcion: [
      'La facturación electrónica no tiene por qué quitarle tiempo. Emitimos y administramos sus CFDI conforme a las reglas vigentes del SAT, con cada dato en orden y a tiempo.',
      'Sus clientes reciben sus facturas sin demoras y usted mantiene todo correctamente registrado, listo para su contabilidad y sin riesgo de errores que después cuesten caro.',
    ],
    incluye: [
      'Emisión de facturas (CFDI) conforme al SAT',
      'Administración y resguardo de sus comprobantes',
      'Cancelaciones y notas de crédito cuando se requieran',
      'Control que se integra con su contabilidad',
    ],
  },
  {
    slug: 'asesoria-fiscal',
    categoria: 'contabilidad-fiscal',
    titulo: 'Asesoría fiscal',
    resumen: 'Lo orientamos en cada decisión con impacto fiscal.',
    icono: 'brujula',
    descripcion: [
      'Antes de una decisión importante, conviene saber cómo le pega en lo fiscal. Lo acompañamos para que cada paso de su empresa esté bien pensado y aproveche lo que la ley permite.',
      'Le explicamos en claro qué conviene y por qué, sin tecnicismos, para que decida con seguridad y nunca lo tome por sorpresa el SAT.',
    ],
    incluye: [
      'Orientación antes de decisiones con impacto fiscal',
      'Respuestas claras, sin tecnicismos',
      'Análisis de riesgos y oportunidades legales',
      'Acompañamiento cercano y oportuno',
    ],
  },
  {
    slug: 'auditoria',
    categoria: 'contabilidad-fiscal',
    titulo: 'Auditoría',
    resumen: 'Revisamos sus números para darle certeza y detectar riesgos.',
    icono: 'lupa',
    descripcion: [
      'Revisamos a fondo sus números para darle una certeza que vale oro: saber que todo está bien hecho. Detectamos riesgos antes de que se vuelvan problemas y confirmamos que su información es confiable.',
      'Termina con un panorama claro de dónde está parado y qué conviene ajustar. Tranquilidad respaldada por una revisión profesional.',
    ],
    incluye: [
      'Revisión a fondo de su información contable y fiscal',
      'Detección temprana de riesgos y áreas de mejora',
      'Certeza sobre la confiabilidad de sus números',
      'Recomendaciones claras y accionables',
    ],
  },

  // ── 2. Jurídico ─────────────────────────────────────────────────────────
  {
    slug: 'defensa-laboral',
    categoria: 'juridico',
    titulo: 'Defensa laboral',
    resumen: 'Lo defendemos ante demandas y conflictos con trabajadores.',
    icono: 'escudo',
    descripcion: [
      'Un conflicto laboral mal manejado puede salir caro. Lo representamos y defendemos ante demandas y disputas con trabajadores, cuidando su empresa en cada etapa del proceso.',
      'Buscamos la mejor salida para usted, con estrategia y firmeza, y lo ayudamos a prevenir que estos problemas se repitan.',
    ],
    incluye: [
      'Representación ante demandas laborales',
      'Estrategia de defensa y negociación',
      'Atención ante juntas y autoridades laborales',
      'Prevención de futuros conflictos',
    ],
  },
  {
    slug: 'defensa-penal',
    categoria: 'juridico',
    titulo: 'Defensa penal',
    resumen: 'Representación en asuntos penales.',
    icono: 'escudo',
    descripcion: [
      'Cuando lo que está en juego es serio, necesita un respaldo a la altura. Lo representamos en asuntos penales con discreción total y una defensa cuidada en cada detalle.',
      'Lo acompañamos de principio a fin, explicándole con claridad cada paso, para que enfrente el proceso con la mejor estrategia y el mayor respaldo.',
    ],
    incluye: [
      'Representación profesional en asuntos penales',
      'Estrategia de defensa a su medida',
      'Discreción y manejo cuidadoso del caso',
      'Acompañamiento claro en cada etapa',
    ],
  },
  {
    slug: 'defensa-fiscal',
    categoria: 'juridico',
    titulo: 'Defensa fiscal',
    resumen: 'Lo defendemos ante actos y revisiones del SAT.',
    icono: 'escudo',
    descripcion: [
      'Si el SAT inicia una revisión o emite un acto en su contra, no tiene por qué enfrentarlo solo. Lo defendemos con argumentos sólidos y todo el soporte que la ley le otorga.',
      'Cuidamos sus derechos y sus intereses en cada instancia, para que un trámite o una revisión no se conviertan en un problema mayor. Usted, en orden y bien respaldado.',
    ],
    incluye: [
      'Defensa ante revisiones y actos del SAT',
      'Medios de defensa y recursos legales',
      'Protección de sus derechos como contribuyente',
      'Acompañamiento en cada instancia',
    ],
  },
  {
    slug: 'derecho-corporativo',
    categoria: 'juridico',
    titulo: 'Derecho corporativo',
    resumen: 'Constitución de empresas, contratos y gobierno corporativo.',
    icono: 'edificio',
    descripcion: [
      'Una empresa bien constituida es una empresa que crece tranquila. Lo apoyamos en la creación de su sociedad, en sus contratos y en el gobierno corporativo, con cada documento en regla.',
      'Dejamos las bases legales firmes para que su negocio opere con seguridad y esté listo para crecer, asociarse o invertir cuando llegue el momento.',
    ],
    incluye: [
      'Constitución de sociedades y empresas',
      'Elaboración y revisión de contratos',
      'Gobierno corporativo y actas',
      'Bases legales sólidas para crecer',
    ],
  },
  {
    slug: 'derecho-administrativo',
    categoria: 'juridico',
    titulo: 'Derecho administrativo',
    resumen: 'Trámites y litigios frente a autoridades.',
    icono: 'balanza',
    descripcion: [
      'Los trámites y disputas con autoridades pueden volverse un laberinto. Lo guiamos y representamos frente a dependencias y organismos, para que cada gestión avance como debe.',
      'Nos hacemos cargo de los tecnicismos y los plazos, y le explicamos en claro cómo va su asunto, para que usted siga concentrado en su negocio.',
    ],
    incluye: [
      'Trámites y permisos ante autoridades',
      'Litigios y recursos administrativos',
      'Atención de requerimientos oficiales',
      'Seguimiento claro de cada gestión',
    ],
  },
  {
    slug: 'propiedad-intelectual',
    categoria: 'juridico',
    titulo: 'Propiedad intelectual',
    resumen: 'Registro y protección de marcas.',
    icono: 'sello',
    descripcion: [
      'Su marca es uno de sus activos más valiosos: vale la pena protegerla. Registramos y resguardamos su marca para que sea legalmente suya y nadie más pueda aprovecharla.',
      'Lo acompañamos desde el registro hasta la defensa ante cualquier uso indebido, para que el nombre que tanto le costó construir quede bien protegido.',
    ],
    incluye: [
      'Registro de marca ante el IMPI',
      'Búsqueda y análisis de disponibilidad',
      'Protección ante usos indebidos',
      'Renovaciones y resguardo de sus derechos',
    ],
  },
  {
    slug: 'privacidad-proteccion-datos',
    categoria: 'juridico',
    titulo: 'Privacidad y protección de datos',
    resumen: 'Cumplimiento de la ley de datos personales.',
    icono: 'candado',
    descripcion: [
      'Manejar datos de clientes y empleados conlleva responsabilidades legales. Lo ponemos en regla con la ley de protección de datos personales, con avisos de privacidad y procesos correctos.',
      'Así genera confianza y evita multas, demostrando que cuida la información que le confían. Cumplimiento que protege a su empresa y a sus clientes.',
    ],
    incluye: [
      'Avisos de privacidad conforme a la ley',
      'Políticas y procesos de manejo de datos',
      'Cumplimiento ante el INAI',
      'Reducción de riesgos y multas',
    ],
  },
  {
    slug: 'servicios-migratorios',
    categoria: 'juridico',
    titulo: 'Servicios migratorios',
    resumen: 'Trámites migratorios para empresas y personas.',
    icono: 'pasaporte',
    descripcion: [
      'Si su empresa contrata talento del extranjero o usted necesita regularizar su estancia, lo acompañamos en cada trámite migratorio con todo en regla.',
      'Nos encargamos de los requisitos y los tiempos ante el Instituto Nacional de Migración, para que el proceso sea claro y sin contratiempos.',
    ],
    incluye: [
      'Trámites de visas y permisos de trabajo',
      'Regularización de estancia',
      'Gestión ante el INM',
      'Acompañamiento de principio a fin',
    ],
  },

  // ── 3. Nómina y capital humano ──────────────────────────────────────────
  {
    slug: 'maquila-de-nomina',
    categoria: 'nomina',
    titulo: 'Maquila de nómina',
    resumen: 'Calculamos y dispersamos su nómina sin que usted se complique.',
    icono: 'personas',
    descripcion: [
      'La nómina exige precisión y puntualidad cada periodo. Nos encargamos de calcularla y dispersarla por usted, con cada impuesto y cada prestación en su lugar.',
      'Su equipo cobra a tiempo y correcto, usted cumple con todas sus obligaciones y se ahorra un proceso que consume tiempo y se presta a errores. Todo en orden, sin complicarse.',
    ],
    incluye: [
      'Cálculo de nómina, impuestos y prestaciones',
      'Dispersión puntual a sus colaboradores',
      'Recibos (CFDI de nómina) en regla',
      'Cumplimiento ante el IMSS y el SAT',
    ],
  },
  {
    slug: 'repse',
    categoria: 'nomina',
    titulo: 'REPSE',
    resumen: 'Registro y cumplimiento de servicios especializados (reforma de subcontratación).',
    icono: 'registro',
    descripcion: [
      'La reforma de subcontratación cambió las reglas para los servicios especializados. Lo ayudamos a obtener y mantener su registro REPSE, cumpliendo cada requisito en tiempo y forma.',
      'Mantenerse en regla le evita sanciones y le permite operar con tranquilidad, demostrando que su empresa hace las cosas bien.',
    ],
    incluye: [
      'Trámite de registro REPSE',
      'Cumplimiento de obligaciones periódicas',
      'Renovaciones y actualizaciones',
      'Prevención de sanciones',
    ],
  },
  {
    slug: 'vales-de-despensa',
    categoria: 'nomina',
    titulo: 'Vales de despensa',
    resumen: 'Implementamos vales de despensa con beneficio fiscal para empresa y empleados.',
    icono: 'regalo',
    descripcion: [
      'Los vales de despensa son una forma legal de cuidar a su equipo y, a la vez, optimizar su carga fiscal. Le ayudamos a implementarlos correctamente para que ambos ganen.',
      'Su empresa aprovecha el beneficio fiscal que la ley permite y sus colaboradores reciben una prestación que valoran. Un beneficio que se gestiona bien y rinde para todos.',
    ],
    incluye: [
      'Implementación de vales de despensa',
      'Aprovechamiento del beneficio fiscal legal',
      'Prestación atractiva para sus colaboradores',
      'Cumplimiento de los requisitos aplicables',
    ],
  },

  // ── 4. Servicios financieros ────────────────────────────────────────────
  {
    slug: 'sofom',
    categoria: 'financieros',
    titulo: 'SOFOM',
    resumen: 'Créditos y préstamos para su empresa o sus colaboradores.',
    icono: 'monedas',
    descripcion: [
      'A veces el crecimiento necesita un impulso financiero. A través de nuestra SOFOM ofrecemos créditos y préstamos para su empresa o sus colaboradores, con condiciones claras y bien explicadas.',
      'Le acompañamos para que el financiamiento sea una herramienta a su favor, no una carga: con números transparentes y sin letras chiquitas.',
    ],
    incluye: [
      'Créditos y préstamos para su empresa',
      'Opciones de financiamiento para colaboradores',
      'Condiciones claras, sin letras chiquitas',
      'Acompañamiento en cada paso',
    ],
  },
  {
    slug: 'gestion-de-criptoactivos',
    categoria: 'financieros',
    titulo: 'Gestión de criptoactivos',
    resumen: 'Administración y cumplimiento fiscal de activos digitales.',
    icono: 'cripto',
    descripcion: [
      'Los activos digitales también tienen reglas fiscales que conviene cumplir. Lo ayudamos a administrar sus criptoactivos y a darles el tratamiento fiscal correcto ante el SAT.',
      'Así aprovecha estas nuevas oportunidades con orden y dentro de la ley, sin riesgos por información mal reportada. Innovación con cumplimiento.',
    ],
    incluye: [
      'Administración de activos digitales',
      'Tratamiento fiscal correcto ante el SAT',
      'Orden y trazabilidad de sus operaciones',
      'Cumplimiento que reduce riesgos',
    ],
  },
];

// Devuelve los servicios de una categoría (para mostrarlos agrupados).
export function serviciosPorCategoria(idCategoria) {
  return servicios.filter((s) => s.categoria === idCategoria);
}

// Devuelve el nombre de una categoría a partir de su id.
export function nombreCategoria(idCategoria) {
  const cat = categorias.find((c) => c.id === idCategoria);
  return cat ? cat.titulo : '';
}
