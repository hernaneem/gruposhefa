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
    resumen: 'Contabilidad al corriente y planeación fiscal conforme a la legislación vigente.',
    icono: 'calculadora',
  },
  {
    id: 'juridico',
    titulo: 'Jurídico',
    resumen: 'Asesoría y representación legal en cada frente de su empresa.',
    icono: 'balanza',
  },
  {
    id: 'nomina',
    titulo: 'Nómina y capital humano',
    resumen: 'Administración de nómina precisa y en cumplimiento de sus obligaciones.',
    icono: 'personas',
  },
  {
    id: 'financieros',
    titulo: 'Servicios financieros',
    resumen: 'Soluciones de financiamiento y activos digitales con respaldo y cumplimiento.',
    icono: 'monedas',
  },
];

export const servicios = [
  // ── 1. Contabilidad y fiscal ───────────────────────────────────────────
  {
    slug: 'implementacion-sistema-contabilidad',
    categoria: 'contabilidad-fiscal',
    titulo: 'Implementación de sistema de contabilidad',
    resumen: 'Establecemos su sistema contable desde su origen, con orden y estructura.',
    icono: 'estructura',
    descripcion: [
      'Un sistema contable bien estructurado desde el inicio es la base de una operación sólida. Implementamos su contabilidad desde su origen, con procesos ordenados y un catálogo de cuentas a la medida de su empresa, de modo que cada operación quede correctamente registrada.',
      'Con ello, dispone desde el primer día de información confiable para la toma de decisiones y cumple puntualmente con sus obligaciones ante las autoridades.',
    ],
    incluye: [
      'Diseño del catálogo de cuentas a la medida de su empresa',
      'Configuración del sistema contable y sus procesos',
      'Capacitación a su equipo para mantener el control',
      'Una base contable confiable para operar y crecer',
    ],
  },
  {
    slug: 'regularizacion-contable',
    categoria: 'contabilidad-fiscal',
    titulo: 'Regularización contable',
    resumen: 'Regularizamos su contabilidad y la ponemos al corriente.',
    icono: 'reloj',
    descripcion: [
      'Cuando la contabilidad presenta rezagos, es fundamental atenderlos con método. Revisamos periodo por periodo, ordenamos la información pendiente y dejamos sus registros al corriente y debidamente conciliados.',
      'Recuperar el orden contable le devuelve certeza sobre la situación de su empresa y la coloca en cumplimiento ante las autoridades.',
    ],
    incluye: [
      'Diagnóstico de la situación contable actual',
      'Ordenamiento de los periodos pendientes',
      'Conciliación de cuentas y movimientos',
      'Plan para mantener la contabilidad al corriente',
    ],
  },
  {
    slug: 'contabilidad-mensual',
    categoria: 'contabilidad-fiscal',
    titulo: 'Contabilidad mensual',
    resumen: 'Administramos su contabilidad de forma mensual y oportuna.',
    icono: 'calendario',
    descripcion: [
      'Nos hacemos cargo de su contabilidad mes con mes, para que usted concentre su atención en la operación de su negocio. Registramos sus operaciones, presentamos sus declaraciones y le entregamos información clara y oportuna.',
      'Cada mes conoce con precisión la situación de su empresa y cumple en tiempo con sus obligaciones, mediante procesos ordenados y sin contratiempos.',
    ],
    incluye: [
      'Registro mensual de ingresos, gastos y operaciones',
      'Cálculo y presentación de declaraciones',
      'Reportes claros sobre la situación de su empresa',
      'Atención cercana para la resolución de sus dudas',
    ],
  },
  {
    slug: 'planeacion-fiscal-corporativa',
    categoria: 'contabilidad-fiscal',
    titulo: 'Planeación fiscal corporativa',
    resumen: 'Estructuramos su operación con planeación fiscal conforme a la ley.',
    icono: 'estrategia',
    descripcion: [
      'La planeación fiscal consiste en estructurar su operación para aprovechar, dentro del marco legal, los estímulos y beneficios que la legislación prevé. Analizamos su situación y diseñamos una estrategia que determina su carga fiscal de manera correcta y debidamente sustentada.',
      'El resultado es una empresa fiscalmente eficiente, con cada decisión soportada documentalmente y en pleno cumplimiento de la normatividad aplicable.',
    ],
    incluye: [
      'Análisis de su estructura y carga fiscal actual',
      'Estrategia de planeación conforme a la legislación',
      'Aprovechamiento de estímulos y beneficios legales',
      'Soporte documental sólido ante las autoridades',
    ],
  },
  {
    slug: 'facturacion-cfdi',
    categoria: 'contabilidad-fiscal',
    titulo: 'Facturación (CFDI)',
    resumen: 'Emitimos y administramos sus comprobantes fiscales electrónicos.',
    icono: 'documento',
    descripcion: [
      'Administramos su facturación electrónica conforme a las disposiciones vigentes del SAT, con cada comprobante correctamente emitido y oportunamente registrado.',
      'Sus clientes reciben sus comprobantes sin demora y su empresa mantiene la información en orden e integrada a su contabilidad, con pleno cumplimiento de los requisitos aplicables.',
    ],
    incluye: [
      'Emisión de comprobantes (CFDI) conforme al SAT',
      'Administración y resguardo de sus comprobantes',
      'Cancelaciones y notas de crédito cuando se requieran',
      'Control integrado con su contabilidad',
    ],
  },
  {
    slug: 'asesoria-fiscal',
    categoria: 'contabilidad-fiscal',
    titulo: 'Asesoría fiscal',
    resumen: 'Lo orientamos en cada decisión con impacto fiscal.',
    icono: 'brujula',
    descripcion: [
      'Toda decisión relevante de su empresa tiene implicaciones fiscales que conviene evaluar con anticipación. Lo asesoramos para que cada paso se tome con pleno conocimiento de su efecto fiscal y dentro del marco legal.',
      'Le exponemos con claridad las alternativas y sus consecuencias, para que decida con criterio, información precisa y respaldo profesional.',
    ],
    incluye: [
      'Asesoría previa a decisiones con impacto fiscal',
      'Análisis de riesgos y alternativas conforme a la ley',
      'Respuestas claras y fundamentadas',
      'Acompañamiento oportuno y profesional',
    ],
  },
  {
    slug: 'auditoria',
    categoria: 'contabilidad-fiscal',
    titulo: 'Auditoría',
    resumen: 'Revisamos su información para brindarle certeza y anticipar riesgos.',
    icono: 'lupa',
    descripcion: [
      'La auditoría aporta certeza sobre la confiabilidad de su información financiera y fiscal. Revisamos sus registros con rigor, verificamos su correcta integración e identificamos riesgos y áreas de mejora.',
      'Al concluir, dispone de un panorama claro de la situación de su empresa y de recomendaciones concretas para fortalecer su control interno.',
    ],
    incluye: [
      'Revisión rigurosa de su información contable y fiscal',
      'Identificación temprana de riesgos y áreas de mejora',
      'Certeza sobre la confiabilidad de su información',
      'Recomendaciones claras y accionables',
    ],
  },

  // ── 2. Jurídico ─────────────────────────────────────────────────────────
  {
    slug: 'defensa-laboral',
    categoria: 'juridico',
    titulo: 'Defensa laboral',
    resumen: 'Lo representamos ante demandas y conflictos laborales.',
    icono: 'escudo',
    descripcion: [
      'Los conflictos laborales requieren una atención oportuna y estratégica. Representamos a su empresa ante demandas y controversias con trabajadores, cuidando sus intereses en cada etapa del procedimiento.',
      'Buscamos la mejor resolución posible con criterio jurídico y firmeza, y le asesoramos para prevenir contingencias futuras.',
    ],
    incluye: [
      'Representación ante demandas laborales',
      'Estrategia de defensa y negociación',
      'Atención ante autoridades laborales',
      'Prevención de contingencias futuras',
    ],
  },
  {
    slug: 'defensa-penal',
    categoria: 'juridico',
    titulo: 'Defensa penal',
    resumen: 'Representación profesional en asuntos penales.',
    icono: 'escudo',
    descripcion: [
      'En materia penal, la representación profesional y la discreción resultan determinantes. Atendemos su asunto con una estrategia de defensa cuidada en cada detalle y absoluta confidencialidad.',
      'Lo acompañamos a lo largo de todo el procedimiento, exponiéndole con claridad cada etapa, para que lo enfrente con el mejor respaldo jurídico.',
    ],
    incluye: [
      'Representación profesional en asuntos penales',
      'Estrategia de defensa a la medida del caso',
      'Confidencialidad y manejo cuidadoso del asunto',
      'Acompañamiento claro en cada etapa',
    ],
  },
  {
    slug: 'defensa-fiscal',
    categoria: 'juridico',
    titulo: 'Defensa fiscal',
    resumen: 'Lo representamos ante actos y revisiones de las autoridades fiscales.',
    icono: 'escudo',
    descripcion: [
      'Ante una revisión o un acto de autoridad fiscal, su empresa cuenta con derechos y medios de defensa que conviene ejercer con oportunidad. Lo representamos con argumentos sólidos y el debido soporte legal.',
      'Protegemos sus intereses en cada instancia, con el objetivo de que una revisión o un requerimiento se resuelvan conforme a derecho.',
    ],
    incluye: [
      'Representación ante revisiones y actos del SAT',
      'Interposición de medios de defensa y recursos',
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
      'Una empresa correctamente constituida opera con seguridad jurídica. Lo apoyamos en la constitución de su sociedad, en la elaboración de sus contratos y en su gobierno corporativo, con cada documento en regla.',
      'Establecemos bases legales sólidas para que su empresa opere con certeza y esté preparada para crecer, asociarse o recibir inversión.',
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
      'Los trámites y controversias ante autoridades exigen precisión técnica y seguimiento puntual. Lo asesoramos y representamos ante dependencias y organismos, para que cada gestión se conduzca correctamente.',
      'Atendemos los requisitos y los plazos, y le informamos con claridad el estado de su asunto, para que su empresa continúe operando con normalidad.',
    ],
    incluye: [
      'Trámites y permisos ante autoridades',
      'Litigios y recursos administrativos',
      'Atención de requerimientos oficiales',
      'Seguimiento puntual de cada gestión',
    ],
  },
  {
    slug: 'propiedad-intelectual',
    categoria: 'juridico',
    titulo: 'Propiedad intelectual',
    resumen: 'Registro y protección de marcas.',
    icono: 'sello',
    descripcion: [
      'Su marca es uno de los activos más valiosos de su empresa y merece protección legal. Gestionamos su registro y resguardo, de modo que le pertenezca jurídicamente y no pueda ser aprovechada por terceros.',
      'Lo acompañamos desde el registro hasta la defensa ante cualquier uso indebido, para proteger la identidad que su empresa ha construido.',
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
    resumen: 'Cumplimiento de la ley de protección de datos personales.',
    icono: 'candado',
    descripcion: [
      'El tratamiento de datos de clientes y colaboradores conlleva obligaciones legales específicas. Ponemos a su empresa en cumplimiento de la normatividad en materia de protección de datos personales, con avisos de privacidad y procesos adecuados.',
      'Con ello genera confianza, reduce el riesgo de sanciones y demuestra el debido cuidado de la información que le confían.',
    ],
    incluye: [
      'Avisos de privacidad conforme a la ley',
      'Políticas y procesos de tratamiento de datos',
      'Cumplimiento ante el INAI',
      'Reducción de riesgos y sanciones',
    ],
  },
  {
    slug: 'servicios-migratorios',
    categoria: 'juridico',
    titulo: 'Servicios migratorios',
    resumen: 'Trámites migratorios para empresas y personas.',
    icono: 'pasaporte',
    descripcion: [
      'La incorporación de talento extranjero o la regularización de estancia requieren cumplir requisitos migratorios específicos. Lo acompañamos en cada trámite, con la documentación en regla.',
      'Atendemos los requisitos y los tiempos ante el Instituto Nacional de Migración, para que el proceso se desarrolle de manera clara y sin contratiempos.',
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
    resumen: 'Calculamos y dispersamos su nómina con precisión y en cumplimiento.',
    icono: 'personas',
    descripcion: [
      'La nómina exige precisión y puntualidad en cada periodo. Nos encargamos de su cálculo y dispersión, con cada impuesto y prestación correctamente determinados.',
      'Sus colaboradores reciben su pago de forma puntual y correcta, y su empresa cumple con sus obligaciones ante el IMSS y el SAT, mediante procesos ordenados y confiables.',
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
      'La reforma en materia de subcontratación estableció nuevas obligaciones para los prestadores de servicios especializados. Lo apoyamos a obtener y mantener su registro REPSE, dando cumplimiento a cada requisito en tiempo y forma.',
      'Mantenerse en cumplimiento evita sanciones y permite a su empresa operar con seguridad jurídica.',
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
    resumen: 'Implementamos vales de despensa como prestación con beneficio fiscal.',
    icono: 'regalo',
    descripcion: [
      'Los vales de despensa constituyen una prestación que beneficia a sus colaboradores y, a la vez, representa un beneficio fiscal conforme a la ley. Le apoyamos a implementarlos de manera correcta.',
      'Su empresa aprovecha el beneficio fiscal previsto en la normatividad y sus colaboradores reciben una prestación valorada, con el debido cumplimiento de los requisitos aplicables.',
    ],
    incluye: [
      'Implementación de vales de despensa',
      'Aprovechamiento del beneficio fiscal previsto en la ley',
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
      'El crecimiento en ocasiones requiere financiamiento oportuno. A través de nuestra SOFOM ofrecemos créditos y préstamos para su empresa o sus colaboradores, con condiciones claras y transparentes.',
      'Lo acompañamos para que el financiamiento sea una herramienta a favor de su operación, con información precisa y términos plenamente explicados.',
    ],
    incluye: [
      'Créditos y préstamos para su empresa',
      'Opciones de financiamiento para colaboradores',
      'Condiciones claras y transparentes',
      'Acompañamiento en cada etapa',
    ],
  },
  {
    slug: 'gestion-de-criptoactivos',
    categoria: 'financieros',
    titulo: 'Gestión de criptoactivos',
    resumen: 'Administración y cumplimiento fiscal de activos digitales.',
    icono: 'cripto',
    descripcion: [
      'Los activos digitales están sujetos a obligaciones fiscales que conviene atender adecuadamente. Lo apoyamos en la administración de sus criptoactivos y en su correcto tratamiento fiscal ante el SAT.',
      'De este modo aprovecha estas oportunidades con orden, trazabilidad y pleno cumplimiento de la normatividad aplicable.',
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
