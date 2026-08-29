import { SERVICES } from './lawyerData';

/**
 * Localización jurídica conservadora para Argentina/Mendoza.
 *
 * Se aplica sobre los objetos de contenido existentes para evitar una
 * reescritura destructiva de lawyerData.ts y mantener intactos los assets,
 * tipos y estructura del proyecto.
 */
const ARGENTINA_SERVICE_COPY: Record<string, Partial<(typeof SERVICES)[number]>> = {
  'delitos-economicos': {
    shortDesc:
      'Defensa técnica en defraudaciones, administración fraudulenta, insolvencia fraudulenta y lavado de activos.',
    fullDesc:
      'Asesoramiento y defensa integral en procedimientos por delitos económicos de alta complejidad. Análisis pericial contable y estructuración de estrategia defensiva durante la investigación penal preparatoria y el juicio oral ante los órganos judiciales competentes.',
    bulletPoints: [
      'Fraude fiscal, societario y contable',
      'Administración desleal y defraudaciones',
      'Insolvencia fraudulenta y afectación patrimonial de acreedores',
      'Defensa técnica ante el Ministerio Público Fiscal competente',
    ],
  },
  'compliance-penal': {
    shortDesc:
      'Diseño, auditoría e implementación de Programas de Integridad conforme al régimen de responsabilidad penal de las personas jurídicas.',
    fullDesc:
      'Estructuración de matrices de riesgos penales a medida de la actividad empresarial. Implementación de Programas de Integridad, canales internos de denuncia y protocolos de investigación conforme a la Ley 27.401.',
    bulletPoints: [
      'Matriz de riesgos penales sectorializada',
      'Programas de Integridad conforme a la Ley 27.401',
      'Canales internos de denuncia y protocolos de investigación',
      'Defensa penal corporativa de la persona jurídica',
    ],
  },
  'delitos-societarios': {
    shortDesc:
      'Asesoramiento y defensa del órgano de administración frente a contingencias penales, fiscales y societarias.',
    fullDesc:
      'Protección integral para directores, administradores y responsables de personas jurídicas frente a imputaciones por defraudaciones, falsedades documentales, delitos tributarios y otras contingencias penales societarias.',
    bulletPoints: [
      'Responsabilidad penal de directivos y administradores',
      'Delitos tributarios y previsionales',
      'Falsedad documental en balances y documentación societaria',
      'Defensa frente a acuerdos abusivos o lesivos',
    ],
  },
  'penal-medioambiental': {
    fullDesc:
      'Asesoramiento procesal y pericial ante investigaciones y procesos penales vinculados con emisiones, vertidos, gestión de residuos y ordenamiento territorial. Protección penal para directores técnicos y responsables medioambientales.',
  },
};

for (const service of SERVICES) {
  const localized = ARGENTINA_SERVICE_COPY[service.id];
  if (!localized) continue;

  Object.assign(service, localized);
}
