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
    slug: 'baff-laboratories',
    titulo: 'Servicios de abastecimiento y compras',
    etiqueta: 'Abastecimiento y compras',
    resumen:
      'Buscamos, negociamos y compramos lo que su operación necesita, y respondemos por la entrega, para que su equipo no dedique su tiempo a cotizar.',
    icono: 'caja',
    descripcion: [
      'Comprar bien consume tiempo: localizar proveedores confiables, comparar cotizaciones, negociar condiciones y dar seguimiento hasta que lo pedido llega. Nos hacemos cargo de ese proceso completo, sea cual sea el insumo, el material o el equipo que su operación requiera.',
      'Compramos a nombre propio y en volumen, lo que permite obtener condiciones que una compra aislada difícilmente alcanza. Usted nos indica qué necesita; nosotros lo cotizamos, lo negociamos, lo adquirimos y respondemos por su entrega.',
    ],
    ofrece: [
      'Búsqueda y selección de proveedores',
      'Cotización comparativa y análisis de precios',
      'Negociación de precios y condiciones de compra',
      'Compra de insumos, materiales y consumibles',
      'Compra de productos y equipo especializado',
      'Consolidación de pedidos y compra por volumen',
      'Gestión y seguimiento de pedidos',
      'Entrega y logística',
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
  {
    slug: 'colossal',
    titulo: 'Servicios de construcción y venta de materiales',
    etiqueta: 'Construcción y materiales',
    resumen:
      'Edificamos su obra y le suministramos los materiales de construcción que necesita, con dirección de proyecto, control de costos y cumplimiento normativo en cada etapa.',
    icono: 'estructura',
    descripcion: [
      'Una obra bien terminada empieza por una buena ejecución. Levantamos su proyecto de principio a fin —cimentación, obra negra, gris y acabados—, con dirección de obra, supervisión y control de costos en cada etapa, y cumplimiento normativo desde el primer trazo hasta la entrega.',
      'Y porque una obra avanza al ritmo de sus materiales, también los suministramos: agregados, cemento y concreto, acero y estructura, e insumos para instalaciones y acabados, entregados en obra cuando se necesitan. Una sola coordinación para construir y abastecer, sin depender de terceros.',
    ],
    ofrece: [
      'Edificación y construcción de obra civil',
      'Cimentación, obra negra, gris y acabados',
      'Construcción de naves industriales y espacios comerciales',
      'Ampliaciones y remodelaciones',
      'Proyectos ejecutivos y dirección de obra',
      'Supervisión de obra y control de costos',
      'Venta de materiales de construcción',
      'Suministro de agregados, cemento y concreto',
      'Suministro de acero y estructura metálica',
      'Materiales para instalaciones y acabados',
      'Entrega de materiales en obra',
      'Cumplimiento normativo en obra',
    ],
  },
  {
    slug: 'linkvia',
    titulo: 'Comercialización de textiles e insumos para confección',
    etiqueta: 'Textil y confección',
    resumen:
      'Le suministramos telas, textiles e insumos para confección —de la materia prima a los avíos—, con abasto oportuno y volumen para sostener su producción.',
    icono: 'textil',
    descripcion: [
      'La confección depende de un abasto confiable. Comercializamos y distribuimos telas y textiles —tejido plano y de punto, en fibras naturales y sintéticas— junto con todos los componentes que una prenda requiere: hilos, cierres, botones, entretelas, elásticos, etiquetas y avíos en general.',
      'Trabajamos con volumen y con proveedores establecidos, de modo que su empresa reciba la materia prima y los insumos correctos, en la cantidad y el momento que su producción necesita, sin frenar la línea por faltantes.',
    ],
    ofrece: [
      'Comercialización de telas y textiles',
      'Tejido plano y de punto, en fibras naturales y sintéticas',
      'Distribución de insumos para confección',
      'Hilos, cierres, botones y broches',
      'Entretelas, elásticos y cintas',
      'Etiquetas, avíos y accesorios para prenda',
      'Materiales para acabado y empaque de prenda',
      'Abasto por volumen para producción',
      'Surtido a la medida de cada pedido',
      'Entrega y logística de materiales',
    ],
  },
  {
    slug: 'vexor',
    titulo: 'Comercialización y venta de productos al mayoreo',
    etiqueta: 'Comercializadora y mayorista',
    resumen:
      'Le surtimos al mayoreo los productos que su operación consume —artículos de limpieza, materiales de construcción e insumos generales— con precio por volumen y entregas programadas, y le ayudamos a promover lo que usted vende.',
    icono: 'almacen',
    descripcion: [
      'Una operación no puede detenerse por falta de insumos. Comercializamos y distribuimos al mayoreo los productos de uso continuo de su empresa: artículos y químicos de limpieza, consumibles de higiene, materiales para la construcción y los insumos generales que su negocio requiere, con inventario disponible y surtido por volumen.',
      'Compramos en volumen directamente a fabricantes y distribuidores, y eso nos permite darle a su empresa precios de mayoreo y condiciones estables. Armamos cada pedido a la medida, programamos entregas recurrentes y respondemos por la entrega en su almacén, su obra o su punto de venta.',
      'Complementamos el abasto con servicios de publicidad: planeamos y ejecutamos campañas, producimos el material publicitario y de punto de venta, y suministramos artículos promocionales para que su marca y sus productos lleguen a su cliente.',
    ],
    ofrece: [
      'Venta al mayoreo y medio mayoreo',
      'Artículos y productos de limpieza',
      'Químicos, consumibles y desechables de higiene',
      'Materiales para la construcción',
      'Insumos generales para empresas',
      'Precios por volumen y listas para clientes recurrentes',
      'Surtido a la medida de cada pedido',
      'Programación de entregas recurrentes',
      'Distribución y entrega en almacén, obra o punto de venta',
      'Abasto para distribuidores y puntos de venta',
      'Servicios de agencia de publicidad',
      'Planeación y ejecución de campañas publicitarias',
      'Material publicitario y para punto de venta',
      'Suministro de artículos promocionales',
    ],
  },
];

// Nota: aquí vivía otrasEmpresas(), que sugería tres empresas al pie de cada
// landing. Se eliminó junto con esa sección: cada landing es individual y no
// enlaza a las demás. Si alguna vez se quiere volver a enlazarlas entre sí,
// esta es la lista de la que hay que partir.
