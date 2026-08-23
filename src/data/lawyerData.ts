import {
  ServiceItem,
  TimelineMilestone,
  AcademicRecord,
  FAQItem,
} from '../types';

/**
 * ============================================================
 * ASSETS
 * ============================================================
 *
 * Todas las imágenes públicas utilizan rutas absolutas desde
 * /public.
 *
 * Estructura esperada:
 *
 * public/
 * └── assets/
 *     ├── brand/
 *     └── images/
 *         ├── hero/
 *         ├── services/
 *         ├── portraits/
 *         ├── legal/
 *         ├── editorial/
 *         ├── architecture/
 *         └── location/
 */

export const ASSETS = {
  // ==========================================================
  // BRAND
  // ==========================================================

  logoMonogram: '/assets/brand/logo-monogram.svg',

  logoBrandmark: '/assets/brand/logo-brandmark.svg',

  // ==========================================================
  // HERO
  // ==========================================================

  heroOffice: '/assets/images/hero/hero-office.webp',

  heroServices: '/assets/images/hero/hero-services.webp',

  heroAbout: '/assets/images/hero/hero-about.webp',

  heroMethod: '/assets/images/hero/hero-method.webp',

  heroFaq: '/assets/images/hero/hero-faq.webp',

  heroContact: '/assets/images/hero/hero-contact.webp',

  // ==========================================================
  // SERVICE IMAGES
  // ==========================================================

  serviceDelitosEconomicos:
    '/assets/images/services/delitos-economicos.webp',

  serviceLitigacionCompleja:
    '/assets/images/services/litigacion-compleja.webp',

  serviceCompliancePenal:
    '/assets/images/services/compliance-penal.webp',

  serviceDelitosSocietarios:
    '/assets/images/services/delitos-societarios.webp',

  serviceCiberdelincuencia:
    '/assets/images/services/ciberdelincuencia.webp',

  serviceUrgenciasPenales:
    '/assets/images/services/urgencias-penales.webp',

  serviceInvestigacionesInternas:
    '/assets/images/services/investigaciones-internas.webp',

  servicePenalMedioambiental:
    '/assets/images/services/penal-medioambiental.webp',

  // ==========================================================
  // CONTENT IMAGES
  // ==========================================================

  portrait:
    '/assets/images/portraits/emilia-sandobar.webp',

  deskDocs:
    '/assets/images/legal/desk-docs.webp',

  library:
    '/assets/images/editorial/library.webp',

  stoneArch:
    '/assets/images/architecture/stone-arch.webp',

  map:
    '/assets/images/location/map.webp',
};

/**
 * ============================================================
 * LAWYER INFORMATION
 * ============================================================
 */

export const LAWYER_INFO = {
  name: 'Emilia Sandobar',

  title:
    'Abogada Penalista y Asesora Corporativa en Mendoza',

  collegianNumber:
    'Mat. Provincial N° 9.842',

  experienceYears: 15,

  phone:
    '+54 9 2613 46-4483',

  urgencyPhone:
    '+54 9 2613 46-4483',

  whatsappUrl:
    'https://wa.me/5492613464483',

  email:
    'info@abogadasandobar.com.ar',

  address:
    'Av. España 948, 4º Piso, Ciudad de Mendoza, M5500, Mendoza, Argentina',

  schedule:
    'Lunes a Viernes: 08:30 - 19:30 hs (Guardia Penal Urgente 24/7)',

  quote:
    'El rigor técnico y la lealtad procesal son la única garantía real de una defensa inquebrantable.',

  bio:
    'Con más de 15 años de dedicación exclusiva a la litigación penal y la asesoría de alta dirección, la Dra. Emilia Sandobar combina una sólida visión dogmática con una ejecución procesal rigurosa. Especializada en la defensa técnica de personas físicas y jurídicas en causas complejas ante el Polo Judicial Penal de Mendoza, los Tribunales Penales Colegiados, la Suprema Corte de Justicia de Mendoza y los Juzgados Federales de Mendoza.',
};

/**
 * ============================================================
 * STATS
 * ============================================================
 */

export const STATS = [
  {
    value: '15+',
    label: 'Años de Trayectoria',
    detail: 'Dedicación exclusiva y continua en litigación penal y asesoría corporativa',
  },
  {
    value: 'Mendoza + federal',
    label: 'Cobertura territorial',
    detail: 'Polo Judicial Penal de Mendoza, tribunales provinciales y fueros federales',
  },
  {
    value: 'Penal económico',
    label: 'Área principal',
    detail: 'Defensa penal, compliance y litigación compleja',
  },
  {
    value: 'Mat. Provincial N° 9.842',
    label: 'Matrícula profesional',
    detail: 'Ejercicio habilitado en la Provincia de Mendoza',
  },
];

/**
 * ============================================================
 * SERVICES
 * ============================================================
 */

export const SERVICES: ServiceItem[] = [
  {
    id: 'delitos-economicos',
    category: 'penal',

    title:
      'Derecho Penal Económico y Financiero',

    shortDesc:
      'Defensa técnica en defraudaciones, administración fraudulenta, insolvencias punibles y blanqueo de capitales.',

    fullDesc:
      'Asesoramiento y defensa integral en procedimientos por delitos económicos de alta complejidad. Análisis pericial contable, estructuración de estrategia defensiva en etapa de investigación y juicio oral ante los tribunales penales de Mendoza y la Justicia Federal con asiento en Mendoza.',

    whenNeeded: [
      'Cuando existe una denuncia por estafa, administración fraudulenta o fraude societario.',
      'Cuando la empresa o un directivo recibe una imputación por maniobras patrimoniales complejas.',
      'Cuando conviene actuar antes de una citación, allanamiento o secuestro de documentación.',
    ],

    whatIncludes: [
      'Análisis de documentación contable y societaria.',
      'Coordinación con peritos y estrategia de defensa técnica.',
      'Presentaciones, audiencias y recursos ante sede provincial o federal.',
    ],

    provincialVsFederal:
      'En sede provincial suele intervenir el Polo Judicial Penal de Mendoza; si la maniobra impacta en organismos, fondos o delitos de competencia federal, la defensa se orienta a la Justicia Federal con asiento en Mendoza.',

    bulletPoints: [
      'Fraude fiscal, societario y contable',
      'Administración desleal y apropiación indebida',
      'Alzamiento de bienes e insolvencias punibles',
      'Intervención en investigaciones por corrupción y delitos económicos ante fiscalías y tribunales competentes de Mendoza',
    ],

    iconName: 'ShieldAlert',

    image:
      ASSETS.serviceDelitosEconomicos,

    courtTypes: [
      'Polo Judicial Penal de Mendoza',
      'Cámara Federal de Apelaciones de Mendoza',
      'Suprema Corte de Justicia de Mendoza',
    ],
  },

  {
    id: 'litigacion-compleja',
    category: 'litigacion',

    title:
      'Litigación Penal Compleja y Juicio Oral',

    shortDesc:
      'Dirección letrada con intervención directa en sala, preparación pericial e interrogatorios estratégicos.',

    fullDesc:
      'Representación rigurosa en audiencias y debates de máxima complejidad. Diseño de estrategias procesales orientadas al sobreseimiento temprano o la absolución fundada en la prueba disponible y en la tutela de garantías constitucionales y procesales.',

    whenNeeded: [
      'Cuando el caso ya está en instrucción y se prevé debate oral.',
      'Cuando hay prueba discutida, pericias contradictorias o riesgo de medidas restrictivas.',
      'Cuando la estrategia exige control de acusación, testigos y evidencia técnica.',
    ],

    whatIncludes: [
      'Preparación de teoría del caso y estrategia probatoria.',
      'Audiencias, impugnaciones, recursos y acompañamiento técnico.',
      'Coordinación de peritos y preparación para juicio oral.',
    ],

    provincialVsFederal:
      'En Mendoza suele intervenir ante los tribunales penales provinciales y la Suprema Corte de Justicia de Mendoza; si el expediente corresponde al fuero federal, la táctica cambia según el tipo de delito y la competencia territorial.',

    bulletPoints: [
      'Intervención en juicios orales de alta repercusión',
      'Recursos de apelación y casación ante la Suprema Corte de Justicia de Mendoza',
      'Impugnación de pruebas ilícitas e intervenciones telefónicas',
      'Coordinación de informes periciales forenses',
    ],

    iconName: 'Scale',

    image:
      ASSETS.serviceLitigacionCompleja,

    courtTypes: [
      'Suprema Corte de Justicia de Mendoza',
      'Tribunales Penales Colegiados de Mendoza',
      'Justicia Federal con asiento en Mendoza',
    ],
  },

  {
    id: 'compliance-penal',
    category: 'compliance',

    title:
      'Compliance Penal y Programas de Integridad',

    shortDesc:
      'Diseño, auditoría e implementación de programas de integridad y prevención de delitos conforme a la Ley 27.401.',

    fullDesc:
      'Estructuración de matrices de riesgos penales a medida de la actividad empresarial. Implementación de canales de denuncia, protocolos de investigación interna y políticas de integridad orientadas a mitigar contingencias penales de la persona jurídica.',

    whenNeeded: [
      'Cuando la empresa quiere prevenir contingencias penales antes de una inspección o denuncia.',
      'Cuando el directorio necesita un programa de integridad para licitaciones, contratos o crecimiento regional.',
      'Cuando hubo un incidente interno y hace falta ordenar la respuesta sin improvisación.',
    ],

    whatIncludes: [
      'Diagnóstico de riesgos y brechas de cumplimiento.',
      'Diseño de canales de denuncia, protocolos y capacitaciones.',
      'Asistencia ante investigaciones internas y eventuales defensas de la persona jurídica.',
    ],

    provincialVsFederal:
      'La prevención penal corporativa puede requerir revisión de delitos locales y, según la actividad o el impacto de la maniobra, ajustes frente a riesgos que terminen siendo investigados en jurisdicción federal.',

    bulletPoints: [
      'Matriz de riesgos penales sectorializada',
      'Canales de denuncia y protocolos internos alineados con la Ley 27.401',
      'Protocolos de investigación interna y régimen sancionador',
      'Defensa penal corporativa de la persona jurídica',
    ],

    iconName: 'FileCheck',

    image:
      ASSETS.serviceCompliancePenal,

    isFeatured: true,
  },

  {
    id: 'delitos-societarios',
    category: 'corporate',

    title:
      'Derecho Penal Societario y Tributario',

    shortDesc:
      'Asesoramiento y defensa del órgano de administración frente a contingencias penales, fiscales y societarias.',

    fullDesc:
      'Protección integral para consejeros, directores generales y administradores de hecho y de derecho frente a imputaciones por acuerdos abusivos, falsedad en balances o delito contra la Hacienda Pública.',

    whenNeeded: [
      'Cuando hay denuncias por actos de administración, balances, fiscalidad o decisiones societarias cuestionadas.',
      'Cuando un socio, director o gerente queda expuesto a una imputación personal.',
      'Cuando hace falta ordenar la respuesta penal y societaria de la empresa o del órgano de administración.',
    ],

    whatIncludes: [
      'Análisis de estructuras societarias y trazabilidad de decisiones.',
      'Defensa de directivos y administradores con enfoque preventivo y litigioso.',
      'Acompañamiento frente a auditorías, denuncias y requerimientos de organismos.',
    ],

    provincialVsFederal:
      'En Mendoza, estos conflictos pueden tramitarse en sede provincial o federal según el tipo de delito, el bien jurídico afectado y la autoridad que intervenga; la estrategia cambia de manera sustancial según la competencia.',

    bulletPoints: [
      'Responsabilidad penal de directivos y consejeros',
      'Delitos contra la Hacienda Pública y la Seguridad Social',
      'Falsedad documental en balances y cuentas anuales',
      'Imposición de acuerdos abusivos o lesivos',
    ],

    iconName: 'Briefcase',

    image:
      ASSETS.serviceDelitosSocietarios,
  },

  {
    id: 'ciberdelincuencia',
    category: 'penal',

    title:
      'Ciberdelitos y Fraude Digital',

    shortDesc:
      'Respuesta procesal inmediata ante estafas informáticas, sabotaje digital, fuga de datos y revelación de secretos.',

    fullDesc:
      'Intervención jurídica especializada en cibercrimen. Coordinación con peritos informáticos forenses para la trazabilidad de fondos criptográficos y medidas cautelares de bloqueo judicial de cuentas bancarias.',

    whenNeeded: [
      'Cuando aparecen estafas por mail, redes sociales, home banking o suplantación de identidad.',
      'Cuando hay fuga de datos, accesos indebidos o prueba digital que debe resguardarse rápido.',
      'Cuando la evidencia tecnológica puede perderse si no se actúa de inmediato.',
    ],

    whatIncludes: [
      'Preservación de evidencia digital y coordinación pericial.',
      'Impulso de medidas cautelares y trazabilidad de transferencias o activos.',
      'Defensa o querella con enfoque técnico y documental.',
    ],

    provincialVsFederal:
      'Muchas estafas informáticas se investigan en sede provincial, pero si el fraude involucra sistemas, activos o estructuras con alcance interjurisdiccional o federal, la competencia puede migrar y la estrategia debe adaptarse.',

    bulletPoints: [
      'Estafas telemáticas complejas y BEC (Business Email Compromise)',
      'Espionaje industrial y revelación de secretos empresariales',
      'Bloqueo cautelar de cuentas bancarias y activos digitales',
      'Defensa y acusación particular con pericial forense',
    ],

    iconName: 'Lock',

    image:
      ASSETS.serviceCiberdelincuencia,
  },

  {
    id: 'urgencias-penales',
    category: 'penal',

    title:
      'Urgencias Penales y Medidas Cautelares',

    shortDesc:
      'Atención 24/7 para detenciones policiales, registros judiciales y comparecencias de prisión provisional.',

    fullDesc:
      'Respuesta inmediata en las primeras 24 horas críticas. Personación en comisaría y juzgado de guardia para garantizar el derecho a no declarar perjudicialmente y solicitar la libertad provisional sin fianza.',

    whenNeeded: [
      'Cuando hay detención, allanamiento, citación urgente o comparecencia en guardia.',
      'Cuando el expediente requiere reacción en las primeras 24 horas.',
      'Cuando la persona necesita un penalista disponible fuera del horario habitual.',
    ],

    whatIncludes: [
      'Contacto urgente, análisis inicial y acompañamiento inmediato.',
      'Presentación ante comisaría, fiscalía o juzgado de guardia.',
      'Definición de estrategia urgente sobre declaración, libertad o cautelares.',
    ],

    provincialVsFederal:
      'La urgencia penal puede darse en ambos fueros: si el hecho tramita ante el Polo Judicial Penal de Mendoza o ante un juzgado federal, el tipo de guardia y las decisiones iniciales cambian, pero la primera reacción siempre es crítica.',

    bulletPoints: [
      'Asistencia inmediata al detenido en comisaría o juzgado',
      'Presencia letrada en entradas y registros (sedes y domicilios)',
      'Oposición fundada a medidas de prisión provisional',
      'Línea directa de urgencia penal 24 horas',
    ],

    iconName: 'AlertCircle',

    image:
      ASSETS.serviceUrgenciasPenales,
  },

  {
    id: 'investigaciones-internas',
    category: 'compliance',

    title:
      'Investigaciones Internas y Forensic',

    shortDesc:
      'Esclarecimiento de irregularidades corporativas, forensic documental y entrevistas de investigación.',

    fullDesc:
      'Desarrollo de investigaciones forenses internas con estricto respeto a las garantías procesales y laborales. Análisis de evidencias digitales y confección de informes periciales para el consejo de administración.',

    whenNeeded: [
      'Cuando surge una irregularidad interna y se necesita aclarar hechos sin contaminar la prueba.',
      'Cuando el directorio quiere saber si hubo fraude, desvío de fondos o manipulación documental.',
      'Cuando la respuesta interna debe quedar lista para auditoría o eventual defensa penal corporativa.',
    ],

    whatIncludes: [
      'Plan de investigación, entrevistas y resguardo documental.',
      'Análisis forense digital y contable.',
      'Informe ejecutivo para dirección o comité de crisis.',
    ],

    provincialVsFederal:
      'La investigación interna puede anticipar una contingencia provincial o federal; por eso conviene ordenar la evidencia y las decisiones internas antes de que la discusión llegue a una fiscalía.',

    bulletPoints: [
      'Detección de fraudes internos y malversación',
      'Auditoría forense contable y documental',
      'Preservación de cadena de custodia digital',
      'Informes técnicos de descargo para la fiscalía',
    ],

    iconName: 'Search',

    image:
      ASSETS.serviceInvestigacionesInternas,
  },

  {
    id: 'penal-medioambiental',
    category: 'corporate',

    title:
      'Derecho Penal Ambiental y Urbanístico',

    shortDesc:
      'Defensa técnica frente a imputaciones por delitos contra el medio ambiente, territorio y seguridad industrial.',

    fullDesc:
      'Asesoramiento procesal y pericial ante sanciones penales derivadas de emisiones, vertidos, gestión de residuos y licencias urbanísticas. Protección penal para directores técnicos y responsables medioambientales.',

    whenNeeded: [
      'Cuando hay denuncias por impacto ambiental, permisos o habilitaciones cuestionadas.',
      'Cuando una actividad productiva puede derivar en responsabilidad penal de directivos o técnicos.',
      'Cuando la empresa necesita ordenar documentación y defensa preventiva ante controles o inspecciones.',
    ],

    whatIncludes: [
      'Revisión de expedientes administrativos y penales.',
      'Coordinación de peritajes ambientales y técnicos.',
      'Defensa de responsables operativos y directivos.',
    ],

    provincialVsFederal:
      'Según el hecho, la cuestión puede tramitar ante órganos provinciales de Mendoza o ante autoridades federales si el bien jurídico comprometido o el contexto regulatorio lo exigen.',

    bulletPoints: [
      'Delitos contra los recursos naturales y el medio ambiente',
      'Delitos sobre la ordenación del territorio y urbanismo',
      'Responsabilidad penal en siniestros y seguridad laboral',
      'Coordinación de peritajes ambientales y topográficos',
    ],

    iconName: 'Building2',

    image:
      ASSETS.servicePenalMedioambiental,
  },
];

/**
 * ============================================================
 * TIMELINE
 * ============================================================
 */

export const TIMELINE: TimelineMilestone[] = [
  {
    period: '2020 — Actualidad',

    role:
      'Socia Fundadora & Directora',

    entity:
      'Sandobar Abogados — Penal Económico y Compliance (Mendoza)',

    description:
      'Dirección del estudio jurídico, enfocado en litigación penal de alta complejidad, asesoría a directorios y defensa en causas ante el Polo Judicial Penal de Mendoza y los fueros federales con asiento en la provincia.',

    achievements: [
      'Más de 85 resoluciones estimatorias y sobreseimientos en causas complejas en Mendoza',
      'Implantación de programas de integridad y compliance en empresas líderes de la región',
      'Reconocimiento por publicaciones y foros jurídicos de derecho penal',
    ],
  },

  {
    period: '2014 — 2020',

    role:
      'Socia de Litigación Penal',

    entity:
      'Firma Procesal y Corporativa (Mendoza / Federal)',

    description:
      'Dirección del área de Derecho Penal Económico, coordinando equipos en debates orales, peritajes contables e investigaciones internas ante tribunales provinciales y federales.',

    achievements: [
      'Defensa letrada principal en juicios orales ante Tribunales Penales Colegiados y Fuero Federal',
      'Especialización en delitos de cuello blanco, tributarios y ciberfraude societario',
      'Asesoramiento a directorios y empresas vitivinícolas, energéticas y de servicios',
    ],
  },

  {
    period: '2010 — 2014',

    role:
      'Abogada Senior de Litigación',

    entity:
      'Estudio Jurídico Especializado en Fuero Penal',

    description:
      'Intervención en investigación penal preparatoria, redacción de recursos de casación ante la Suprema Corte de Justicia de Mendoza y asistencia en turnos de guardia.',

    achievements: [
      'Elaboración de más de 120 recursos de casación y apelaciones procesales',
      'Participación en causas complejas de insolvencias societarias y defraudaciones',
    ],
  },

  {
    period: '2008 — 2010',

    role:
      'Asociada Junior & Práctica Forense',

    entity:
      'Gabinete Jurídico Forense',

    description:
      'Asistencia en audiencias de formalización, declaraciones indagatorias y preparación de pruebas periciales y testimoniales.',

    achievements: [
      'Matriculación con Distinción Académica en el Colegio de Abogados de Mendoza',
    ],
  },
];

/**
 * ============================================================
 * ACADEMIC CREDENTIALS
 * ============================================================
 */

export const ACADEMIC_CREDENTIALS: AcademicRecord[] = [
  {
    year: '2008',

    title:
      'Abogacía (Diploma de Honor)',

    institution:
      'Facultad de Derecho — Universidad Nacional de Cuyo (UNCuyo)',

    detail:
      'Especialización en Derecho Penal y Procesal Penal con máxima calificación en Derecho Constitucional y trabajo final de graduación.',
  },

  {
    year: '2011',

    title:
      'Posgrado / Especialización en Derecho Penal y Ciencias Penales',

    institution:
      'Universidad Nacional de Cuyo / Universidad de Buenos Aires (UBA)',

    detail:
      'Profundización dogmática en teoría del delito, proceso penal acusatorio y delitos contra el orden económico y financiero.',
  },

  {
    year: '2016',

    title:
      'Especialista Superior en Compliance Penal & Integridad Corporativa',

    institution:
      'Instituto de Altos Estudios Jurídicos & Certificación Internacional',

    detail:
      'Certificación profesional en diseño de programas de prevención de delitos e investigaciones corporativas conforme a la Ley 27.401 de Responsabilidad Penal de las Personas Jurídicas.',
  },

  {
    year: '2019',

    title:
      'Diplomatura en Análisis Pericial Económico-Forense y Cibercrimen',

    institution:
      'Colegio de Abogados de Mendoza & Consejo Profesional de Ciencias Económicas',

    detail:
      'Capacitación en análisis de contabilidad forense, trazabilidad digital, valoración de activos y detección de fraudes complejos.',
  },
];

/**
 * ============================================================
 * FAQS
 * ============================================================
 */

export const FAQS: FAQItem[] = [
  {
    id: 'faq-honorarios',

    category: 'honorarios',

    question:
      '¿Cómo se determinan los honorarios?',

    answer:
      'Se establece una provisión de fondos inicial basada en la complejidad del asunto y las horas estimadas de estudio preliminar. Todo con total transparencia antes de comenzar.',
  },

  {
    id: 'faq-urgencia',

    category: 'urgencias',

    question:
      '¿Qué ocurre si necesito asistencia inmediata?',

    answer:
      'Una urgencia es una situación que requiere asistencia legal inmediata, como una detención, un registro judicial o una comparecencia inminente. Para estos casos, disponemos de una línea de guardia 24/7.',
  },

  {
    id: 'faq-empresas',

    category: 'empresas',

    question:
      '¿Ofrecen asesoramiento a empresas y directorios?',

    answer:
      'Sí, diseñamos estrategias de prevención penal (Compliance) y asumimos la defensa corporativa de directivos y órganos de administración frente a responsabilidades societarias.',
  },

  {
    id: 'faq-modalidad',

    category: 'general',

    question:
      '¿Es posible realizar una consulta a distancia?',

    answer:
      'Sí. Para garantizar la confidencialidad, utilizamos plataformas seguras que permiten mantener el secreto profesional con la misma eficacia que una reunión presencial en el despacho.',
  },

  {
    id: 'faq-pago',

    category: 'honorarios',

    question:
      '¿Se puede fraccionar el pago de los honorarios?',

    answer:
      'Entendemos las necesidades de nuestros clientes. Los honorarios profesionales pueden estructurarse en hitos procesales, acordados previamente en la hoja de encargo.',
  },

  {
    id: 'faq-jurisdiccion',

    category: 'general',

    question:
      '¿En qué jurisdicción intervienen?',

    answer:
      'Actuamos principalmente en Mendoza y tribunales federales, con capacidad de intervención y coordinación en todo el territorio nacional para casos de alta complejidad.',
  },

  {
    id: 'faq-motivo-consulta',
    category: 'general',
    question: '¿Cuándo conviene consultar a un penalista antes de que avance la causa?',
    answer:
      'Conviene consultar cuanto antes: una intervención temprana permite ordenar prueba, evaluar riesgo penal y definir si corresponde estrategia de defensa, querella o una medida urgente en el Polo Judicial Penal de Mendoza o en el fuero federal.',
  },

  {
    id: 'faq-provincial-federal',
    category: 'general',
    question: '¿Cómo sé si mi caso es provincial o federal?',
    answer:
      'La competencia depende del delito, del bien jurídico afectado y del organismo involucrado. En líneas generales, hechos comunes como lesiones, amenazas o estafas suelen tramitar en Mendoza provincial, mientras que cuestiones vinculadas a contrabando, lavado, narcotráfico o delitos federales requieren otra estrategia y otro tribunal.',
  },

  {
    id: 'faq-urgencia-24',
    category: 'urgencias',
    question: '¿Qué hago si hubo una detención o un allanamiento en Mendoza?',
    answer:
      'No declare sin defensa técnica y reúna toda la documentación o aviso recibido. En esos escenarios la respuesta debe ser inmediata para preservar derechos, controlar la medida y definir si corresponde presentarse en guardia o en sede judicial.',
  },

  {
    id: 'faq-primera-consulta',
    category: 'honorarios',
    question: '¿Qué se analiza en la primera consulta?',
    answer:
      'Se revisan los hechos, la documentación disponible, la urgencia y la jurisdicción posible. A partir de eso se define si hace falta actuar de inmediato, ampliar prueba, preparar una querella o encarar una defensa técnica o corporativa.',
  },

  {
    id: 'faq-compliance-empresas',
    category: 'empresas',
    question: '¿El compliance penal sirve para pymes o solo para grandes empresas?',
    answer:
      'Sirve para ambos perfiles. En pymes ayuda a ordenar procesos y reducir contingencias; en empresas más grandes permite prevenir riesgos, capacitar equipos y documentar decisiones. La Ley 27.401 vuelve especialmente importante este trabajo cuando hay interacción con proveedores, directorios o contrataciones públicas.',
  },

  {
    id: 'faq-delitos-societarios',
    category: 'empresas',
    question: '¿Qué son los delitos societarios y cuándo aparecen?',
    answer:
      'Suelen aparecer cuando hay discusiones por balances, administración, decisiones del directorio, uso de fondos o falsedad documental. Si usted busca un abogado penal económico en Mendoza, esta suele ser una de las áreas más sensibles porque mezcla derecho penal, societario y tributario.',
  },

  {
    id: 'faq-documentacion',
    category: 'procedimiento',
    question: '¿Qué documentación conviene llevar a la consulta?',
    answer:
      'Conviene llevar citaciones, actas, correos, capturas, contratos, informes, nombres de intervinientes y todo dato de expediente o fiscalía que ya exista. Cuanto más concreto sea el material, más precisa será la evaluación inicial.',
  },
];
