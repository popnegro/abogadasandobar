import React, { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { ActiveTab } from '../types';
import { ASSETS } from '../data/lawyerData';
import { Breadcrumb } from './Breadcrumb';

interface ServicesSectionProps { setActiveTab: (tab: ActiveTab) => void; onRequestConsultation: (service?: string) => void; }

const AREAS = [
  { id: 'penal', hash: 'derecho-penal', number: '01', title: 'DERECHO PENAL', description: 'Defensa penal, representación de víctimas y litigación en causas provinciales y federales.', pattern: 'radial-gradient(circle at 18% 25%,rgba(217,169,184,.20),transparent 28%),linear-gradient(135deg,#241D20 0%,#4B2632 48%,#181614 100%)' },
  { id: 'empresas', hash: 'soluciones-legales-empresas', number: '02', title: 'SOLUCIONES LEGALES A EMPRESAS', description: 'Asesoramiento preventivo, compliance y protección jurídica para empresas y equipos directivos.', pattern: 'radial-gradient(circle at 78% 20%,rgba(217,169,184,.18),transparent 30%),linear-gradient(135deg,#181614 0%,#303033 52%,#4A363A 100%)' },
  { id: 'seguros', hash: 'representacion-penal-y-seguros', number: '03', title: 'REPRESENTACIÓN PENAL Y SEGUROS', description: 'Asistencia jurídica coordinada ante siniestros que requieren análisis penal y gestión jurídica integral.', pattern: 'radial-gradient(circle at 24% 78%,rgba(217,169,184,.18),transparent 28%),linear-gradient(135deg,#211B1A 0%,#3A3330 52%,#5A3D45 100%)' },
  { id: 'accidentes', hash: 'reclamos-indemnizatorios', number: '04', title: 'RECLAMOS INDEMNIZATORIOS', description: 'Representación ante lesiones y daños derivados de accidentes de tránsito.', pattern: 'radial-gradient(circle at 82% 72%,rgba(217,169,184,.20),transparent 28%),linear-gradient(135deg,#181614 0%,#283032 50%,#4B363D 100%)' },
];

const SERVICE_COPY: Record<string, { area: string; title: string; description: string; bullets: string[] }[]> = {
  penal: [
    { area: 'penal', title: 'Defensa Penal Integral', description: 'Representación de personas imputadas en causas provinciales y federales, desde los primeros actos del proceso hasta el juicio, la etapa recursiva y la ejecución penal.', bullets: ['Causas provinciales y federales', 'Defensa durante todas las etapas del proceso', 'Juicio, recursos y ejecución penal'] },
    { area: 'penal', title: 'Querellas y Representación de Víctimas', description: 'Intervención activa para impulsar la investigación, producir prueba y proteger los derechos de las víctimas durante todas las etapas del proceso penal.', bullets: ['Impulso de la investigación', 'Producción y análisis de prueba', 'Protección de derechos de las víctimas'] },
    { area: 'penal', title: 'Litigación Penal Adversarial', description: 'Diseño de la teoría del caso, preparación de la prueba e intervención directa en audiencias y juicios orales de alta complejidad.', bullets: ['Teoría del caso y preparación probatoria', 'Recursos de apelación y casación ante la Suprema Corte de Mendoza', 'Impugnación de pruebas ilícitas'] },
    { area: 'penal', title: 'Urgencias Penales y Medidas de Coerción', description: 'Atención prioritaria ante aprehensiones, detenciones, allanamientos, citaciones inminentes o pedidos de prisión preventiva.', bullets: ['Aprehensiones y detenciones', 'Allanamientos y citaciones', 'Medidas de coerción y prisión preventiva'] },
    { area: 'penal', title: 'Estafas, Ciberdelitos y Evidencia Digital', description: 'Representación penal en investigaciones por maniobras patrimoniales complejas y asesoramiento ante estafas digitales, suplantación de identidad, acceso indebido a cuentas y amenazas.', bullets: ['Preservación de evidencia digital', 'Coordinación con especialistas informáticos', 'Investigaciones por maniobras patrimoniales complejas'] },
  ],
  empresas: [
    { area: 'empresas', title: 'Acompañamiento Legal, Compliance y Programas de Integridad', description: 'A través de una alianza profesional, asesoramiento corporativo, preventivo y estratégico para empresas y equipos directivos.', bullets: ['Constitución y estructuración de sociedades', 'Contratos y due diligence legal', 'Matrices de riesgos, prevención y capacitación', 'Programas de integridad conforme a la Ley 27.401'] },
    { area: 'empresas', title: 'Registro y Protección de Marcas', description: 'Asesoramiento integral para proteger la identidad comercial mediante el registro y seguimiento de marcas ante el Instituto Nacional de la Propiedad Industrial.', bullets: ['Búsqueda de antecedentes y disponibilidad', 'Presentación y seguimiento ante el INPI', 'Oposiciones, renovaciones, transferencias y licencias'] },
  ],
  seguros: [
    { area: 'seguros', title: 'Para particulares y asegurados', description: 'Intervención penal y asistencia jurídica coordinada cuando un siniestro exige preservar prueba, analizar responsabilidades y definir una estrategia desde el primer momento.', bullets: ['Análisis jurídico inicial del hecho', 'Asistencia ante denuncias, citaciones y declaraciones', 'Defensa en investigaciones por lesiones u homicidio culposo', 'Relevamiento y análisis de expedientes penales'] },
    { area: 'seguros', title: 'Para productores de seguros', description: 'Canal profesional de consulta y derivación para evaluar la dimensión penal del siniestro y coordinar la asistencia jurídica del asegurado.', bullets: ['Orientación ante denuncias o citaciones', 'Coordinación durante las distintas etapas', 'Análisis de actuaciones y documentación', 'Comunicación organizada con compañía y profesionales'] },
    { area: 'seguros', title: 'Para compañías de seguros', description: 'Asistencia profesional externa ante siniestros con contingencia penal o que requieran intervención coordinada en la Provincia de Mendoza.', bullets: ['Análisis de expedientes penales', 'Informes sobre riesgos y responsabilidades', 'Defensa penal e intervención en audiencias', 'Coordinación con equipos jurídicos internos y externos'] },
  ],
  accidentes: [
    { area: 'accidentes', title: 'Reclamos indemnizatorios por accidentes de tránsito', description: 'Representación de personas que hayan sufrido lesiones en accidentes de tránsito, desde la evaluación inicial hasta la negociación o reclamación judicial de la indemnización correspondiente.', bullets: ['Análisis del accidente y responsabilidades', 'Documentación médica y prueba del hecho', 'Evaluación de lesiones e incapacidad', 'Gastos médicos, pérdida de ingresos y consecuencias no patrimoniales', 'Negociación, mediación y acción judicial'] },
  ],
};

export const ServicesSection: React.FC<ServicesSectionProps> = ({ setActiveTab, onRequestConsultation }) => {
  const focus = 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7F203D] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FAF6F0]';
  const [activeArea, setActiveArea] = useState('penal');

  useEffect(() => {
    const validHashes = new Set(AREAS.map((area) => area.hash));
    const getHashArea = () => window.location.hash.replace(/^#/, '');
    const initial = getHashArea();
    const initialArea = AREAS.find((area) => area.hash === initial);
    if (initialArea) {
      setActiveArea(initialArea.id);
      requestAnimationFrame(() => document.getElementById(initialArea.hash)?.scrollIntoView({ block: 'start' }));
    }

    const sections = AREAS.map((area) => document.getElementById(area.hash)).filter(Boolean) as HTMLElement[];
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) {
        const area = AREAS.find((item) => item.hash === visible.target.id);
        if (area) setActiveArea(area.id);
      }
    }, { rootMargin: '-18% 0px -62% 0px', threshold: [0.1, 0.35, 0.6] });
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const handleAreaChange = (id: string) => {
    const area = AREAS.find((item) => item.id === id);
    if (!area) return;
    setActiveArea(id);
    window.history.replaceState(null, '', `/servicios-abogacia-mendoza#${area.hash}`);
    document.getElementById(area.hash)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return <div id="services-section" className="w-full bg-[#FAF6F0]">
    <section id="services-hero" aria-labelledby="services-hero-title" className="relative flex min-h-[480px] w-full items-center overflow-hidden bg-[#181614] pb-16 pt-28 lg:min-h-[540px] lg:pb-20 lg:pt-32">
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${ASSETS.heroServices})` }} aria-hidden="true" /><div className="absolute inset-0 bg-gradient-to-br from-[#181614]/95 via-[#231F1C]/90 to-[#2A2522]/75" aria-hidden="true" />
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8"><div className="mb-8 lg:mb-10"><Breadcrumb items={[{ label: 'Servicios', active: true }]} onNavigate={setActiveTab} variant="primary" /></div><div className="max-w-4xl space-y-6"><h1 id="services-hero-title" className="font-serif text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl">Servicios de Abogacía<span className="block text-[#D9A9B8]">en Mendoza</span></h1><p className="max-w-3xl text-base font-light leading-relaxed text-white/85 sm:text-lg lg:text-xl">Defensa penal, litigación compleja y asesoramiento corporativo para personas y organizaciones que necesitan una estrategia jurídica rigurosa y una intervención profesional directa.</p></div></div>
    </section>
    <section id="services-catalog" aria-labelledby="services-catalog-title" className="w-full bg-[#FAF6F0] py-16 lg:py-24"><div className="mx-auto max-w-7xl space-y-12 px-4 sm:px-6 lg:space-y-16 lg:px-8"><div className="max-w-3xl space-y-4"><p className="text-xs font-bold uppercase tracking-widest text-[#7F203D]">Áreas de práctica especializada</p><h2 id="services-catalog-title" className="font-serif text-3xl font-bold leading-[1.15] tracking-tight text-[#302D28] sm:text-4xl">Un abordaje jurídico especializado</h2><p className="text-base font-light leading-relaxed text-[#302D28]/80 sm:text-lg">Servicios orientados a la prevención, defensa y resolución de contingencias penales y corporativas.</p></div>
      <nav aria-label="Áreas de práctica" className="sticky top-[4.5rem] z-20 -mx-4 overflow-x-auto border-y border-[#DDD2C5] bg-[#FAF6F0]/95 px-4 py-3 backdrop-blur lg:static lg:mx-0 lg:px-0"><div className="flex min-w-max gap-2">{AREAS.map(area => <button key={area.id} type="button" aria-current={activeArea === area.id ? 'true' : undefined} onClick={() => handleAreaChange(area.id)} className={`border px-4 py-2 text-[11px] font-bold uppercase tracking-wider transition-colors ${activeArea === area.id ? 'border-[#7F203D] bg-[#7F203D] text-white' : 'border-[#DDD2C5] text-[#7F203D] hover:bg-[#7F203D] hover:text-white'} ${focus}`}>{area.number} · {area.title}</button>)}</div></nav>
      <div className="space-y-10">{AREAS.map(area => <section key={area.id} id={area.hash} aria-labelledby={`services-area-title-${area.id}`} className="scroll-mt-28 overflow-hidden border border-[#DDD2C5] bg-[#FFF8F2] shadow-sm">
        <div className="relative min-h-[190px] overflow-hidden" style={{ backgroundImage: `url(${ASSETS.heroServices}), ${area.pattern}` }}><div className="absolute inset-0 bg-gradient-to-r from-[#181614]/95 via-[#231F1C]/75 to-[#231F1C]/45" aria-hidden="true" /><div className="relative flex min-h-[190px] items-end p-6 sm:p-8 lg:p-10"><div className="max-w-3xl"><span className="mb-3 block font-serif text-sm font-bold tracking-[.22em] text-[#D9A9B8]">{area.number}</span><h3 id={`services-area-title-${area.id}`} className="font-serif text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl">{area.title}</h3><p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/75 sm:text-base">{area.description}</p></div></div></div>
        <div className="grid grid-cols-1 divide-y divide-[#302D28]/10 sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-3">{SERVICE_COPY[area.id].map((service, index) => <article key={service.title} className="group flex min-h-[300px] flex-col p-6 sm:p-7 lg:p-8"><div className="mb-5 flex items-center justify-between"><span className="font-serif text-xs font-bold text-[#7F203D]/70">{String(index + 1).padStart(2, '0')}</span><span className="h-px w-10 bg-[#7F203D]/30" aria-hidden="true" /></div><h4 className="font-serif text-xl font-bold leading-snug text-[#302D28] transition-colors group-hover:text-[#7F203D]">{service.title}</h4><p className="mt-4 text-sm leading-relaxed text-[#302D28]/75">{service.description}</p><ul className="mt-5 space-y-2 border-t border-[#302D28]/10 pt-4">{service.bullets.map(point => <li key={point} className="flex items-start gap-2 text-xs leading-relaxed text-[#302D28]/70"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#7F203D]" aria-hidden="true" /><span>{point}</span></li>)}</ul><button type="button" onClick={() => onRequestConsultation(service.title)} className={`mt-auto flex items-center justify-between border-t border-[#302D28]/10 pt-4 text-left text-xs font-bold uppercase tracking-wider text-[#7F203D] ${focus}`}><span>Consultar sobre este servicio</span><ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" /></button></article>)}</div>
      </section>)}</div>
    </div></section>
    <section id="services-final-cta" aria-labelledby="services-final-cta-title" className="w-full bg-[#302D28] py-16 text-white lg:py-24"><div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"><div className="flex flex-col gap-8 border border-white/15 bg-white/5 p-7 sm:p-10 lg:flex-row lg:items-center lg:justify-between lg:gap-12 lg:p-12"><div className="max-w-3xl space-y-4"><p className="text-xs font-bold uppercase tracking-widest text-[#D9A9B8]">Consulta profesional</p><h2 id="services-final-cta-title" className="font-serif text-3xl font-bold leading-tight text-white sm:text-4xl">¿Necesita evaluar una situación jurídica específica?</h2><p className="max-w-2xl text-base font-light leading-relaxed text-white/75 sm:text-lg">Una primera consulta permite analizar el contexto, identificar las cuestiones relevantes y determinar los próximos pasos.</p></div><button type="button" onClick={() => onRequestConsultation()} className="group inline-flex shrink-0 items-center justify-center gap-3 bg-[#7F203D] px-7 py-4 text-xs font-bold uppercase tracking-widest text-white transition-colors hover:bg-[#691931] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D9A9B8] focus-visible:ring-offset-2 focus-visible:ring-offset-[#302D28] sm:px-8 sm:text-sm"><span>Solicitar consulta</span><ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></button></div></div></section>
  </div>;
};
