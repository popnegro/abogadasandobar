export type ActiveTab =
  | 'home'
  | 'servicios'
  | 'experiencia'
  | 'metodo'
  | 'faq'
  | 'contacto';

/**
 * ============================================================
 * ROUTING
 * ============================================================
 */

export const TAB_TO_PATH: Record<ActiveTab, string> = {
  home: '/',
  servicios: '/servicios-abogacia-mendoza',
  experiencia: '/experiencia',
  metodo: '/servicios-abogacia-mendoza#services-introduction',
  faq: '/preguntas-frecuentes',
  contacto: '/contacto',
};

export const PATH_TO_TAB: Record<string, ActiveTab> = {
  '/': 'home',
  '/servicios-abogacia-mendoza': 'servicios',
  '/experiencia': 'experiencia',
  '/preguntas-frecuentes': 'faq',
  '/contacto': 'contacto',
};

/**
 * ============================================================
 * CONTACT FORM
 * ============================================================
 */

export interface ContactFormData {
  fullName: string;
  email: string;
  phone: string;
  message: string;
  privacyAccepted: boolean;
}

/**
 * ============================================================
 * SERVICES
 * ============================================================
 */

export interface ServiceItem {
  id: string;
  category: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  bulletPoints: string[];
  iconName: string;
  image: string;
  courtTypes?: string[];
  isFeatured?: boolean;
}

/**
 * ============================================================
 * EXPERIENCE / TIMELINE
 * ============================================================
 */

export interface TimelineMilestone {
  period: string;
  role: string;
  entity: string;
  description: string;
  achievements: string[];
}

/**
 * ============================================================
 * ACADEMIC RECORDS
 * ============================================================
 */

export interface AcademicRecord {
  year: string;
  title: string;
  institution: string;
  detail: string;
}

/**
 * ============================================================
 * FAQ
 * ============================================================
 */

export interface FAQItem {
  id: string;
  category: string;
  question: string;
  answer: string;
}