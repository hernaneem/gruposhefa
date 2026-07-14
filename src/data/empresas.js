// ─────────────────────────────────────────────────────────────────────────────
//  CATÁLOGO DE EMPRESAS — GRUPO SHEFA
//  Esta es la única fuente de verdad de las landings por empresa. Con esta
//  lista se genera automáticamente la página de cada una (src/pages/[empresa].astro).
//
//  REGLA IMPORTANTE: la razón social NO va en el contenido. Solo en el "slug",
//  que es la URL. El título de cada página son los servicios que ofrece, no el
//  nombre de la empresa. Del catálogo interno tampoco sale ningún RFC, banco,
//  cuenta ni CLABE. Las pruebas (npm test) hacen cumplir esto.
//
//  Para editar una landing: cambia su bloque { ... } aquí y listo.
//  - slug:        el nombre de la empresa en la URL (minúsculas, sin acentos).
//  - titulo:      los servicios que ofrece. Es el H1 y el título de la pestaña.
//  - etiqueta:    el giro, en letra chica sobre el título.
//  - resumen:     frase de entrada del encabezado. También la usan los buscadores.
//  - icono:       nombre de un ícono disponible (ver src/components/Icono.astro).
//  - descripcion: párrafos del cuerpo (en la voz de marca: trato de "usted").
//  - ofrece:      los servicios concretos, tomados de lo que la empresa puede facturar.
// ─────────────────────────────────────────────────────────────────────────────

export const empresas = [
  {
    slug: 'administracion-y-finanzas',
    titulo: 'Servicios de administración, contabilidad y finanzas',
    etiqueta: 'Administración y finanzas',
    resumen:
      'Nos hacemos cargo de la operación contable, fiscal y administrativa de su empresa, con procesos ordenados, para que usted dedique su tiempo al negocio.',
    icono: 'calculadora',
    descripcion: [
      'La administración de una empresa exige orden constante: registros al día, obligaciones cumplidas en tiempo e información confiable para decidir. Nos hacemos cargo de esa operación completa, desde la contabilidad general hasta el cierre de cada ejercicio.',
      'Trabajamos con estructura propia y procesos definidos, de modo que usted reciba sus estados financieros con oportunidad, responda ante las autoridades sin sobresaltos y conserve el control de su empresa sin absorber la carga operativa del día a día.',
    ],
    ofrece: [
      'Contabilidad general y corporativa',
      'Cierres contables y estados financieros',
      'Análisis financiero para la toma de decisiones',
      'Planeación y cumplimiento fiscal',
      'Atención y respuesta a autoridades gubernamentales',
      'Gestión administrativa y documental',
      'Control interno y cumplimiento normativo',
      'Administración de nómina',
      'Gestión de recursos humanos y servicios laborales especializados',
      'Asesoría jurídica corporativa y gestión contractual',
      'Gobierno corporativo y representación legal',
      'Planeación estratégica y diseño de estructuras organizacionales',
      'Gestión de proveedores y de proyectos',
      'Servicios administrativos para grupos empresariales',
      'Procesamiento de facturación de alto volumen para su operación',
      'Estudios de mercado',
    ],
  },
  {
    slug: 'contenido-fuerza-y-medios',
    titulo: 'Servicios de publicidad, producción y eventos',
    etiqueta: 'Publicidad y eventos',
    resumen:
      'Producimos campañas, contenidos y eventos corporativos, desde la estrategia hasta la ejecución, con un solo equipo a cargo de cada etapa.',
    icono: 'camara',
    descripcion: [
      'Una campaña se sostiene en la ejecución. Planeamos la estrategia publicitaria y la llevamos hasta el material terminado: contenidos, piezas gráficas, video y comerciales, con equipo propio y locaciones que habilitamos para cada producción.',
      'El mismo equipo opera sus eventos, convenciones y activaciones de marca, con el personal especializado que cada montaje requiere. Una sola coordinación de principio a fin, sin intermediarios.',
    ],
    ofrece: [
      'Planeación publicitaria',
      'Publicidad en punto de venta y activaciones de marca',
      'Producción de contenidos',
      'Producción gráfica',
      'Producción de videos y comerciales',
      'Habilitación de locaciones para producciones',
      'Producción de eventos sociales y corporativos',
      'Convenciones y expos',
      'Personal especializado para producciones y montajes',
    ],
  },
  {
    slug: 'personal-para-it',
    titulo: 'Servicios y consultoría en tecnologías de la información',
    etiqueta: 'Tecnologías de la información',
    resumen:
      'Implementamos, integramos y mantenemos la tecnología que sostiene su operación, con acompañamiento continuo antes, durante y después de cada proyecto.',
    icono: 'monitor',
    descripcion: [
      'La tecnología rinde resultados cuando está bien implementada y tiene un responsable claro. Definimos su estrategia tecnológica, ponemos en marcha los sistemas que su operación necesita —ERP, CRM, integraciones— y migramos su información con el menor impacto posible en su operación.',
      'Concluida la implementación, continuamos con el mantenimiento del software, la resolución de incidencias y el acompañamiento a su equipo mediante consultoría continua.',
    ],
    ofrece: [
      'Consultoría en tecnologías de la información',
      'Estrategia tecnológica',
      'Implementación de ERP y CRM',
      'Integración de sistemas',
      'Migración de datos',
      'Mantenimiento de software',
      'Servicios tecnológicos integrales',
    ],
  },
  {
    slug: 'mantenimiento-y-construccion',
    titulo: 'Servicios de construcción y mantenimiento',
    etiqueta: 'Construcción y servicios inmobiliarios',
    resumen:
      'Ejecutamos obra civil, remodelaciones y mantenimiento, con dirección de proyecto, control de costos y cumplimiento normativo en cada etapa.',
    icono: 'edificio',
    descripcion: [
      'Construimos y mantenemos. Obra civil completa —negra, gris, blanca y acabados—, ampliaciones y remodelaciones, con las instalaciones eléctricas, hidrosanitarias y especiales que cada proyecto requiere.',
      'Cada obra lleva dirección de proyecto, supervisión, control de costos, seguridad en obra y cumplimiento normativo. Y cuando la obra termina, seguimos con el mantenimiento preventivo, correctivo y especializado, incluida la administración integral de inmuebles y condominios.',
    ],
    ofrece: [
      'Ejecución de obra civil',
      'Obra negra, gris, blanca y acabados',
      'Ampliaciones y remodelaciones',
      'Instalaciones eléctricas, hidrosanitarias y especiales',
      'Proyectos ejecutivos',
      'Dirección y administración de proyecto',
      'Supervisión de obra y seguridad en obra',
      'Control de costos',
      'Cumplimiento normativo',
      'Mantenimiento preventivo, correctivo y especializado',
      'Servicios técnicos especializados',
      'Administración integral de inmuebles y condominios',
      'Gestión operativa y de proveedores',
    ],
  },
  {
    slug: 'agropersonal',
    titulo: 'Servicios agrícolas y de campo',
    etiqueta: 'Servicios agrícolas',
    resumen:
      'Ponemos personal capacitado en su predio para los trabajos agrícolas y asesoramos a empresas del sector en la producción y distribución de sus cosechas.',
    icono: 'planta',
    descripcion: [
      'El trabajo agrícola exige personal capacitado y disponible en cada etapa del ciclo productivo. Realizamos las labores de campo de su predio con ese estándar, del preparado del terreno a la cosecha.',
      'También asesoramos a las empresas del sector en su operación, y atendemos lo que viene después de la cosecha: producción, conservación, transformación y distribución de lo que sale de sus predios agrícolas y forestales.',
    ],
    ofrece: [
      'Trabajos agrícolas con personal capacitado',
      'Asesoría a empresas agrícolas',
      'Producción de productos agrícolas y forestales',
      'Conservación y transformación de productos agrícolas y forestales',
      'Distribución de productos agrícolas y forestales',
    ],
  },
  {
    slug: 'geo-innovacion',
    titulo: 'Servicios de marketing y publicidad',
    etiqueta: 'Marketing y publicidad',
    resumen:
      'Llevamos su marca al mercado con estrategia, marketing digital, medios y activaciones, y con el equipo que cada campaña necesita para ejecutarse.',
    icono: 'megafono',
    descripcion: [
      'Su marca necesita estar donde está su cliente. Planeamos la estrategia publicitaria, la ejecutamos en digital y la sostenemos en medios, con espacios publicitarios y activaciones de marca en punto de venta que la acercan a su público.',
      'Cubrimos además los servicios complementarios que la campaña requiere: contenidos, video y comerciales, artículos promocionales, impresión digital, serigrafía y bordado textil, y el equipo y mobiliario que sus eventos y convenciones necesitan.',
    ],
    ofrece: [
      'Planeación publicitaria',
      'Marketing digital',
      'Publicidad en punto de venta y activaciones de marca',
      'Renta de espacios publicitarios',
      'Producción de contenidos',
      'Producción de videos y comerciales',
      'Suministro de artículos promocionales',
      'Impresión digital, serigrafía y bordado textil',
      'Convenciones, expos y eventos sociales y corporativos',
      'Renta de mobiliario para eventos',
      'Equipo y tecnología para publicidad',
      'Capacitación de personal',
    ],
  },
  {
    slug: 'soluciones-empresariales-elite',
    titulo: 'Consultoría empresarial y estratégica',
    etiqueta: 'Consultoría y estrategia',
    resumen:
      'Ordenamos y hacemos crecer su negocio con consultoría empresarial y estratégica: constitución, planeación, cumplimiento normativo e implementación digital.',
    icono: 'brujula',
    descripcion: [
      'Acompañamos a la empresa desde su origen: constituimos la sociedad, definimos la estrategia y la implementamos, y ponemos en orden la administración del negocio con consultoría enfocada en resultados.',
      'A ello sumamos el acompañamiento financiero y de control —asesoría financiera, auditoría y supervisión del cumplimiento normativo— junto con la implementación digital y los licenciamientos que su operación requiere.',
    ],
    ofrece: [
      'Consultoría administrativa',
      'Planeación e implementación estratégica',
      'Administración de negocios',
      'Constitución de sociedades',
      'Asesoría financiera',
      'Auditoría y supervisión de cumplimiento normativo',
      'Implementación digital',
      'Licenciamiento de software y plataformas digitales',
    ],
  },
];

// Las tres empresas que siguen a esta en la lista, dando la vuelta al llegar al
// final. Se usan al pie de cada landing para invitar a conocer el resto del grupo.
export function otrasEmpresas(slug) {
  const indice = empresas.findIndex((empresa) => empresa.slug === slug);
  if (indice === -1) return empresas.slice(0, 3);
  return [...empresas.slice(indice + 1), ...empresas.slice(0, indice)].slice(0, 3);
}
