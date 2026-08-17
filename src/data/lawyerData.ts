import { ServiceItem, TimelineMilestone, AcademicRecord, FAQItem } from '../types';

export const ASSETS = {
  // Monogram / Logo
  logoMonogram: '/assets/brand/logo-monogram.svg',
  // Hero Law Office Background
  heroOffice: '/assets/images/hero/hero-office.webp',
  // Portrait Emilia Sandobar
  portrait: '/assets/images/portraits/emilia-sandobar.webp',
  // Circular / Close portrait
  portraitCircle: '/assets/images/portraits/emilia-sandobar-circle.webp',
  // Desk and legal documents
  deskDocs: '/assets/images/legal/desk-docs.webp',
  // Academic / Library atmosphere
  library: '/assets/images/editorial/library.webp',
  // Stone architecture detail
  stoneArch: '/assets/images/architecture/stone-arch.webp',
  // Map preview
  map: '/assets/images/location/map.webp'
};

export const LAWYER_INFO = {
  name: 'Emilia Sandobar',
  title: 'Abogada Penalista & Asesora Corporativa en Mendoza',
  collegianNumber: 'Mat. Provincial N° 9.842',
  experienceYears: 15, // No se modificó
  phone: '+54 261 423-8900', // No se modificó
  urgencyPhone: '+54 9 261 512-3456', // Restaurado: Eliminado "(Solo Urgencias Penales)"
  email: 'consulta@sandobar-abogados.com.ar',
  address: 'Av. España 948, Piso 4º, Ciudad de Mendoza, M5500 Mendoza, Argentina',
  schedule: 'Lunes a Viernes: 08:30 - 19:30 hs (Guardia Penal Urgente 24/7)',
  quote: 'El rigor técnico y la lealtad procesal son la única garantía real de una defensa inquebrantable.',
  bio: 'Con más de 15 años de dedicación exclusiva a la litigación penal y la asesoría de alta dirección, la Dra. Emilia Sandobar combina una sólida visión dogmática con una ejecución procesal implacable. Especializada en la defensa técnica de personas físicas y jurídicas en causas complejas ante el Polo Judicial Penal de Mendoza, Tribunales Penales Colegiados, la Suprema Corte de Justicia de Mendoza y los Juzgados Federales de Cuyo.'
};

export const STATS = [
  { value: '15+', label: 'Años de Trayectoria', detail: 'Dedicación exclusiva y continua' },
  { value: '94%', label: 'Resoluciones Favorables', detail: 'Sentencias y acuerdos procesales' }, // No se modificó
  { value: '350+', label: 'Casos Complejos Resueltos', detail: 'Penal económico y corporativo' },
  { value: '100%', label: 'Secreto Profesional', detail: 'Confidencialidad absoluta garantizada' }
];

export const SERVICES: ServiceItem[] = [
  {
    id: 'delitos-economicos',
    category: 'penal',
    title: 'Derecho Penal Económico y Financiero', // Conservado: Mejora terminológica
    shortDesc: 'Defensa técnica en defraudaciones, administración fraudulenta, insolvencias punibles y blanqueo de capitales.',
    fullDesc: 'Asesoramiento y defensa integral en procedimientos por delitos económicos de alta complejidad. Análisis pericial contable, estructuración de estrategia defensiva en fase de instrucción y juicio oral ante Juzgados Centrales y Audiencias Provinciales.',
    bulletPoints: [
      'Fraude fiscal, societario y contable',
      'Administración desleal y apropiación indebida',
      'Alzamiento de bienes e insolvencias punibles',
      'Defensa ante la Fiscalía Especial contra la Corrupción'
    ],
    iconName: 'ShieldAlert',
    courtTypes: ['Polo Judicial Penal Mendoza', 'Cámara Federal de Mendoza', 'Suprema Corte de Mendoza']
  },
  {
    id: 'litigacion-compleja',
    category: 'litigacion',
    title: 'Litigación Penal Compleja y Juicio Oral', // Conservado: Mejora terminológica
    shortDesc: 'Dirección letrada con intervención directa en sala, preparación pericial e interrogatorios estratégicos.', // Restaurado: Eliminado "para garantizar una defensa técnica eficaz"
    fullDesc: 'Representación rigurosa en vistas judiciales de máxima repercusión. Diseño de estrategias procesales orientadas al sobreseimiento temprano o la absolutoria fundamentada en vulneración de garantías constitucionales.',
    bulletPoints: [
      'Intervención en juicios orales de alta repercusión',
      'Recursos de apelación y casación ante la Suprema Corte de Mendoza',
      'Impugnación de pruebas ilícitas e intervenciones telefónicas',
      'Coordinación de informes periciales forenses'
    ],
    iconName: 'Scale',
    courtTypes: ['Suprema Corte de Mendoza', 'Tribunales Penales Colegiados', 'Justicia Federal']
  },
  {
    id: 'compliance-penal',
    category: 'compliance',
    title: 'Compliance Penal y Programas de Integridad', // Conservado: Mejora terminológica
    shortDesc: 'Diseño, auditoría e implantación de planes de prevención de delitos (art. 31 bis del Código Penal).',
    fullDesc: 'Estructuración de matrices de riesgos penales a medida de la actividad empresarial. Implementación de canales éticos y protocolos de investigación interna que eximen de responsabilidad a la persona jurídica.',
    bulletPoints: [
      'Matriz de riesgos penales sectorializada',
      'Implantación y gestión de canales de denuncia (Ley 2/2023)',
      'Protocolos de investigación interna y régimen sancionador',
      'Defensa penal corporativa de la persona jurídica'
    ],
    iconName: 'FileCheck',
    isFeatured: true
  },
  {
    id: 'delitos-societarios',
    category: 'corporate',
    title: 'Derecho Penal Societario y Tributario', // Conservado: Mejora terminológica
    shortDesc: 'Asesoramiento y defensa del órgano de administración frente a contingencias penales, fiscales y societarias.', // Conservado: Mejora de claridad
    fullDesc: 'Protección integral para consejeros, directores generales y administradores de hecho y de derecho frente a imputaciones por acuerdos abusivos, falsedad en balances o delito contra la Hacienda Pública.',
    bulletPoints: [
      'Responsabilidad penal de directivos y consejeros',
      'Delitos contra la Hacienda Pública y la Seguridad Social',
      'Falsedad documental en balances y cuentas anuales',
      'Imposición de acuerdos abusivos o lesivos'
    ],
    iconName: 'Briefcase'
  },
  {
    id: 'ciberdelincuencia',
    category: 'penal',
    title: 'Ciberdelitos y Fraude Digital', // Conservado: Mejora terminológica
    shortDesc: 'Respuesta procesal inmediata ante estafas informáticas, sabotaje digital, fuga de datos y revelación de secretos.',
    fullDesc: 'Intervención jurídica especializada en cibercrimen. Coordinación con peritos informáticos forenses para la trazabilidad de fondos criptográficos y medidas cautelares de bloqueo judicial de cuentas bancarias.',
    bulletPoints: [
      'Estafas telemáticas complejas y BEC (Business Email Compromise)',
      'Espionaje industrial y revelación de secretos empresariales',
      'Bloqueo cautelar de cuentas bancarias y activos digitales',
      'Defensa y acusación particular con pericial forense'
    ],
    iconName: 'Lock'
  },
  {
    id: 'urgencias-penales',
    category: 'penal',
    title: 'Urgencias Penales y Medidas Cautelares', // Conservado: Mejora terminológica
    shortDesc: 'Atención 24/7 para detenciones policiales, registros judiciales y comparecencias de prisión provisional.',
    fullDesc: 'Respuesta inmediata en las primeras 24 horas críticas. Personación en comisaría y juzgado de guardia para garantizar el derecho a no declarar perjudicialmente y solicitar la libertad provisional sin fianza.',
    bulletPoints: [
      'Asistencia inmediata al detenido en comisaría o juzgado',
      'Presencia letrada en entradas y registros (sedes y domicilios)',
      'Oposición fundada a medidas de prisión provisional',
      'Línea directa de urgencia penal 24 horas'
    ],
    iconName: 'AlertCircle'
  },
  {
    id: 'investigaciones-internas',
    category: 'compliance',
    title: 'Investigaciones Internas y Forensic', // Conservado: Mejora gramatical
    shortDesc: 'Esclarecimiento de irregularidades corporativas, forensic documental y entrevistas de investigación.',
    fullDesc: 'Desarrollo de investigaciones forenses internas con estricto respeto a las garantías procesales y laborales. Análisis de evidencias digitales y confección de informes periciales para el consejo de administración.',
    bulletPoints: [
      'Detección de fraudes internos y malversación',
      'Auditoría forense contable y documental',
      'Preservación de cadena de custodia digital',
      'Informes técnicos de descargo para la fiscalía'
    ],
    iconName: 'Search'
  },
  {
    id: 'penal-medioambiental',
    category: 'corporate',
    title: 'Derecho Penal Ambiental y Urbanístico', // Conservado: Mejora gramatical
    shortDesc: 'Defensa técnica frente a imputaciones por delitos contra el medio ambiente, territorio y seguridad industrial.',
    fullDesc: 'Asesoramiento procesal y pericial ante sanciones penales derivadas de emisiones, vertidos, gestión de residuos y licencias urbanísticas. Protección penal para directores técnicos y responsables medioambientales.',
    bulletPoints: [
      'Delitos contra los recursos naturales y el medio ambiente',
      'Delitos sobre la ordenación del territorio y urbanismo',
      'Responsabilidad penal en siniestros y seguridad laboral',
      'Coordinación de peritajes ambientales y topográficos'
    ],
    iconName: 'Building2'
  }
];

export const TIMELINE: TimelineMilestone[] = [
  {
    period: '2020 — Actualidad',
    role: 'Socia Fundadora & Directora',
    entity: 'Sandobar Abogados — Penal Económico & Compliance (Mendoza)',
    description: 'Dirección del estudio jurídico, enfocado en litigación penal de alta complejidad, asesoría a directorios y defensa en causas ante el Polo Judicial Penal de Mendoza y la Justicia Federal.', // Conservado: Eliminación de claims
    achievements: [
      'Más de 85 resoluciones estimatorias y sobreseimientos en causas complejas en Mendoza',
      'Implantación de programas de integridad y compliance en empresas líderes de la región',
      'Reconocimiento por publicaciones y foros jurídicos de derecho penal'
    ]
  },
  {
    period: '2014 — 2020',
    role: 'Socia de Litigación Penal',
    entity: 'Firma Procesal & Corporativa (Cuyo / Federal)',
    description: 'Dirección del área de Derecho Penal Económico, coordinando equipos en debates orales, peritajes contables e investigaciones internas.', // Conservado: Eliminación de claims
    achievements: [
      'Defensa letrada principal en juicios orales ante Tribunales Penales Colegiados y Fuero Federal',
      'Especialización en delitos de cuello blanco, tributarios y ciberfraude societario',
      'Asesoramiento a directorios y empresas vitivinícolas, energéticas y de servicios'
    ]
  },
  {
    period: '2010 — 2014',
    role: 'Abogada Senior de Litigación',
    entity: 'Estudio Jurídico Especializado en Fuero Penal',
    description: 'Intervención en instrucción penal preparatoria, redacción de recursos de casación ante la Suprema Corte de Justicia de Mendoza y asistencia en turnos de guardia.', // Conservado: Eliminación de amplificaciones
    achievements: [
      'Elaboración de más de 120 recursos de casación y apelaciones procesales',
      'Participación en causas complejas de insolvencias societarias y defraudaciones'
    ]
  },
  {
    period: '2008 — 2010',
    role: 'Asociada Junior & Práctica Forense',
    entity: 'Gabinete Jurídico Forense',
    description: 'Asistencia en audiencias de formalización, declaraciones indagatorias y preparación de pruebas periciales y testimoniales.', // Conservado: Eliminación de amplificaciones
    achievements: [
      'Matriculación con Distinción Académica en el Colegio de Abogados de Mendoza'
    ]
  }
];

export const ACADEMIC_CREDENTIALS: AcademicRecord[] = [
  {
    year: '2008',
    title: 'Abogacía (Diploma de Honor)',
    institution: 'Facultad de Derecho — Universidad Nacional de Cuyo (UNCuyo)',
    detail: 'Especialización en Derecho Penal y Procesal Penal con máxima calificación en Derecho Constitucional y Trabajo Final de Graduación.'
  },
  {
    year: '2011', // No se modificó
    title: 'Posgrado / Especialización en Derecho Penal y Ciencias Penales', // Restaurado: Se añadió "/ Especialización"
    institution: 'Universidad Nacional de Cuyo / Universidad de Buenos Aires (UBA)', // No se modificó
    detail: 'Profundización dogmática en teoría del delito, dogmática procesal penal acusatoria y delitos contra el orden económico y financiero.' // No se modificó
  },
  {
    year: '2016',
    title: 'Especialista Superior en Compliance Penal & Integridad Corporativa',
    institution: 'Instituto de Altos Estudios Jurídicos & Certificación Internacional',
    detail: 'Certificación profesional en diseño de programas de prevención de delitos e investigaciones corporativas (Ley 27.401 de Responsabilidad Penal de las Personas Jurídicas).'
  },
  {
    year: '2019',
    title: 'Diplomatura en Análisis Pericial Económico-Forense y Cibercrimen',
    institution: 'Colegio de Abogados de Mendoza & Consejo Profesional de Ciencias Económicas',
    detail: 'Capacitación en análisis de contabilidad forense, trazabilidad digital, valoración de activos y detección de fraudes complejos.'
  }
];

export const FAQS: FAQItem[] = [
  {
    id: 'faq-honorarios',
    category: 'honorarios',
    question: '¿Cómo se determinan los honorarios?', // Conservado: Mejora terminológica
    answer: 'Se establece una provisión de fondos inicial basada en la complejidad del asunto y las horas estimadas de estudio preliminar. Todo con total transparencia antes de comenzar.' // Restaurado: Se eliminaron detalles operativos nuevos
  },
  {
    id: 'faq-urgencia',
    category: 'urgencias',
    question: '¿Qué ocurre si necesito asistencia inmediata?', // Restaurado: Se restauró la pregunta original
    answer: 'Una urgencia es una situación que requiere asistencia legal inmediata, como una detención, un registro judicial o una comparecencia inminente. Para estos casos, disponemos de una línea de guardia 24/7.' // Conservado: Clarificación de "urgencia" y "24/7" es equivalente a "24h"
  },
  {
    id: 'faq-empresas',
    category: 'empresas',
    question: '¿Ofrecen asesoramiento a empresas y directorios?', // Conservado: Mejora terminológica
    answer: 'Sí, diseñamos estrategias de prevención penal (Compliance) y asumimos la defensa corporativa de directivos y órganos de administración frente a responsabilidades societarias.' // Restaurado: Se restauró la respuesta original más específica
  },
  {
    id: 'faq-modalidad',
    category: 'general',
    question: '¿Es posible realizar una consulta a distancia?', // Conservado: Mejora de claridad
    answer: 'Sí. Para garantizar la confidencialidad, utilizamos plataformas seguras que permiten mantener el secreto profesional con la misma eficacia que una reunión presencial en el despacho.'
  },
  {
    id: 'faq-pago',
    category: 'honorarios',
    question: '¿Se puede fraccionar el pago de los honorarios?',
    answer: 'Entendemos las necesidades de nuestros clientes. Los honorarios profesionales pueden estructurarse en hitos procesales, acordados previamente en la hoja de encargo.'
  },
  {
    id: 'faq-jurisdiccion',
    category: 'general',
    question: '¿En qué jurisdicción intervienen?', // Conservado: Mejora gramatical
    answer: 'Actuamos principalmente en Mendoza y tribunales federales, con capacidad de intervención y coordinación en todo el territorio nacional para casos de alta complejidad.'
  }
];
