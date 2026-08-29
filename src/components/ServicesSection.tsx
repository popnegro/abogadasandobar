import React from 'react';
import { ArrowRight } from 'lucide-react';
import { ActiveTab } from '../types';
import { ASSETS, SERVICES } from '../data/lawyerData';
import { getServiceIcon } from '../utils/iconUtils';
import { Breadcrumb } from './Breadcrumb';

interface ServicesSectionProps {
  setActiveTab: (tab: ActiveTab) => void;
  onRequestConsultation: () => void;
}

const AREA_HEADERS = [
  { number: '01', title: 'DERECHO PENAL', description: 'Defensa, representación de víctimas y litigación penal.', pattern: 'bg-[radial-gradient(circle_at_18%_25%,rgba(217,169,184,.20),transparent_28%),linear-gradient(135deg,#241D20_0%,#4B2632_48%,#181614_100%)]' },
  { number: '02', title: 'SOLUCIONES LEGALES A EMPRESAS', description: 'Prevención, compliance y protección jurídica para organizaciones.', pattern: 'bg-[radial-gradient(circle_at_78%_20%,rgba(217,169,184,.18),transparent_30%),linear-gradient(135deg,#181614_0%,#303033_52%,#4A363A_100%)]' },
  { number: '03', title: 'REPRESENTACIÓN PENAL Y SEGUROS', description: 'Asistencia jurídica coordinada ante siniestros con contingencia penal.', pattern: 'bg-[radial-gradient(circle_at_24%_78%,rgba(217,169,184,.18),transparent_28%),linear-gradient(135deg,#211B1A_0%,#3A3330_52%,#5A3D45_100%)]' },
  { number: '04', title: 'RECLAMOS INDEMNIZATORIOS', description: 'Representación ante lesiones y daños derivados de accidentes de tránsito.', pattern: 'bg-[radial-gradient(circle_at_82%_72%,rgba(217,169,184,.20),transparent_28%),linear-gradient(135deg,#181614_0%,#283032_50%,#4B363D_100%)]' },
];

export const ServicesSection: React.FC<ServicesSectionProps> = ({ setActiveTab, onRequestConsultation }) => {
  const darkFocusRing = 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7F203D] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FAF6F0]';
  const handleNavigateToContact = () => { window.scrollTo({ top: 0, behavior: 'smooth' }); setActiveTab('contacto'); };
  return (
    <div id="services-section" className="w-full bg-[#FAF6F0]">
      <section id="services-hero" aria-labelledby="services-hero-title" className="relative flex min-h-[480px] w-full items-center overflow-hidden bg-[#181614] pb-16 pt-28 lg:min-h-[540px] lg:pb-20 lg:pt-32">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${ASSETS.heroServices})` }} aria-hidden="true" />
        <div className="absolute inset-0 bg-gradient-to-br from-[#181614]/95 via-[#231F1C]/90 to-[#2A2522]/75" aria-hidden="true" />
        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8"><div className="mb-8 lg:mb-10"><Breadcrumb items={[{ label: 'Servicios', active: true }]} onNavigate={setActiveTab} variant="primary" /></div><div className="max-w-4xl space-y-6"><h1 id="services-hero-title" className="font-serif text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl">Servicios de Abogacía<span className="block text-[#D9A9B8]">en Mendoza</span></h1><p className="max-w-3xl text-base font-light leading-relaxed text-white/85 sm:text-lg lg:text-xl">Defensa penal, litigación compleja y asesoramiento corporativo para personas y organizaciones que necesitan una estrategia jurídica rigurosa y una intervención profesional directa.</p></div></div>
      </section>
      <section id="services-catalog" aria-labelledby="services-catalog-title" className="w-full bg-[#FAF6F0] py-16 lg:py-24"><div className="mx-auto max-w-7xl space-y-12 px-4 sm:px-6 lg:space-y-16 lg:px-8"><div className="max-w-3xl space-y-4"><p className="text-xs font-bold uppercase tracking-widest text-[#7F203D]">Áreas de práctica especializada</p><h2 id="services-catalog-title" className="font-serif text-3xl font-bold leading-[1.15] tracking-tight text-[#302D28] sm:text-4xl">Un abordaje jurídico especializado</h2><p className="text-base font-light leading-relaxed text-[#302D28]/80 sm:text-lg">Servicios orientados a la prevención, defensa y resolución de contingencias penales y corporativas.</p></div>
        <div className="space-y-6">
          {AREA_HEADERS.map((area) => (
            <section key={area.number} className="overflow-hidden border border-[#DDD2C5] bg-[#FFF8F2] shadow-sm">
              <div className={`relative min-h-[190px] overflow-hidden ${area.pattern}`}>
                <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'linear-gradient(120deg, transparent 0 48%, rgba(255,255,255,.10) 49%, transparent 50%), linear-gradient(30deg, transparent 0 48%, rgba(255,255,255,.07) 49%, transparent 50%)', backgroundSize: '88px 88px' }} aria-hidden="true" />
                <div className="relative flex min-h-[190px] items-end p-6 sm:p-8 lg:p-10"><div className="max-w-3xl"><span className="mb-3 block font-serif text-sm font-bold tracking-[.22em] text-[#D9A9B8]">{area.number}</span><h3 className="font-serif text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl">{area.title}</h3><p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/75 sm:text-base">{area.description}</p></div></div>
              </div>
              <div className="grid grid-cols-1 divide-y divide-[#302D28]/10 sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-3">
                {SERVICES.filter((service) => service.category === area.title).map((service, index) => (
                  <article key={service.id} id={`service-card-${service.id}`} className="group flex min-h-[250px] flex-col p-6 sm:p-7 lg:p-8">
                    <div className="mb-5 flex items-center justify-between"><div className="flex h-9 w-9 items-center justify-center bg-[#7F203D]/10 text-[#7F203D]">{getServiceIcon(service.iconName, 'h-5 w-5 text-[#7F203D]')}</div><span className="font-serif text-xs font-bold text-[#7F203D]/70">{String(index + 1).padStart(2, '0')}</span></div>
                    <h4 className="font-serif text-xl font-bold leading-snug text-[#302D28] transition-colors group-hover:text-[#7F203D]">{service.title}</h4><p className="mt-4 text-sm leading-relaxed text-[#302D28]/75">{service.shortDesc}</p>
                    <ul className="mt-5 space-y-2 border-t border-[#302D28]/10 pt-4">{service.bulletPoints.slice(0, 3).map((point) => <li key={point} className="flex items-start gap-2 text-xs leading-relaxed text-[#302D28]/70"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#7F203D]" aria-hidden="true" /><span>{point}</span></li>)}</ul>
                    <button type="button" onClick={handleNavigateToContact} className={`mt-auto flex items-center justify-between border-t border-[#302D28]/10 pt-4 text-left text-xs font-bold uppercase tracking-wider text-[#7F203D] ${darkFocusRing}`} aria-label={`Consultar sobre ${service.title}`}><span>Consultar sobre este servicio</span><ArrowRight className="h-4 w-4" aria-hidden="true" /></button>
                  </article>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div></section>
      <section id="services-final-cta" aria-labelledby="services-final-cta-title" className="w-full bg-[#302D28] py-16 text-white lg:py-24"><div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"><div className="flex flex-col gap-8 border border-white/15 bg-white/5 p-7 sm:p-10 lg:flex-row lg:items-center lg:justify-between lg:gap-12 lg:p-12"><div className="max-w-3xl space-y-4"><p className="text-xs font-bold uppercase tracking-widest text-[#D9A9B8]">Consulta profesional</p><h2 id="services-final-cta-title" className="font-serif text-3xl font-bold leading-tight text-white sm:text-4xl">¿Necesita evaluar una situación jurídica específica?</h2><p className="max-w-2xl text-base font-light leading-relaxed text-white/75 sm:text-lg">Una primera consulta permite analizar el contexto, identificar las cuestiones relevantes y determinar los próximos pasos.</p></div><button type="button" onClick={onRequestConsultation} className="group inline-flex shrink-0 items-center justify-center gap-3 bg-[#7F203D] px-7 py-4 text-xs font-bold uppercase tracking-widest text-white transition-colors hover:bg-[#691931] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D9A9B8] focus-visible:ring-offset-2 focus-visible:ring-offset-[#302D28] sm:px-8 sm:text-sm"><span>Solicitar consulta</span><ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" /></button></div></div></section>
    </div>
  );
};
