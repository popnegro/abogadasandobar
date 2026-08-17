export type ActiveTab = 'inicio' | 'servicios' | 'sobre-mi' | 'experiencia' | 'faq' | 'contacto';

export interface ServiceItem {
  id: string;
  category: 'penal' | 'corporate' | 'litigacion' | 'compliance';
  title: string;
  shortDesc: string;
  fullDesc: string;
  bulletPoints: string[];
  iconName: string;
  isFeatured?: boolean;
  courtTypes?: string[];
}

export interface TimelineMilestone {
  period: string;
  role: string;
  entity: string;
  description: string;
  achievements: string[];
}

export interface AcademicRecord {
  year: string;
  title: string;
  institution: string;
  detail: string;
}

export interface FAQItem {
  id: string;
  category: 'general' | 'honorarios' | 'urgencias' | 'empresas';
  question: string;
  answer: string;
}

export interface ContactFormData {
  clientType: 'particular' | 'empresa';
  fullName: string;
  email: string;
  phone: string;
  practiceArea: string;
  urgency: 'ordinaria' | 'urgente' | 'detencion_inmediata';
  message: string;
  acceptedPrivacy: boolean;
}
