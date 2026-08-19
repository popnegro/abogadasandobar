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

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  setActiveTab,
  onRequestConsultation,
}) => {
  const darkFocusRing = 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7F203D] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FAF6F0]';

  const handleNavigateToContact = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setActiveTab('contacto');
  };

  return (
    <div id="services-section" className="w-full bg-[#FAF6F0]">
      <section id="services-hero" aria-labelledby="services-hero-title" className="relative flex min-h-[480px] w-full items-center overflow-hidden bg-[#181614] pb-16 pt-28 lg:min-h-[540px] lg:pb-20 lg:pt-32">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${ASSETS.heroServices})` }} aria-hidden="true" />
        <div className="absolute inset-0 bg-gradient-to-br from-[#181614]/95 via-[#231F1C]/90 to-[#2A2522]/75" aria-hidden="true" />
        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 lg:mb-10">
            <Breadcrumb items={[{ label: 'Servicios', active: true }]} onNavigate={setActiveTab} variant="primary" />
          </div>
          <div className="max-w-4xl space-y-6">
            <h1 id="services-hero-title" className="font-serif text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl">
              Servicios de Abogacía
              <span className="block text-[#D9A9B8]">en Mendoza</span>
            </h1>
            <p className="max-w-3xl text-base font-light leading-relaxed text-white/85 sm:text-lg lg:text-xl">
              Defensa penal, litigación compleja y asesoramiento corporativo para personas y organizaciones que necesitan una estrategia jurídica rigurosa y una intervención profesional directa.
            </p>
          </div>
        </div>
      </section>

      <section id="nuestro-proceso" aria-labelledby="services-introduction-title" className="w-full border-b border-[#302D28]/10 bg-[#FAF6F0] py-16 lg:py-24 scroll-mt-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <div className="relative overflow-hidden bg-[#302D28]">
                <img src={ASSETS.serviceLitigacionCompleja} alt="Estrategia jurídica y litigación penal" className="aspect-[4/5] w-full object-cover" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#181614]/50 via-transparent to-transparent" aria-hidden="true" />
                <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                  <p className="text-xs font-bold uppercase tracking-widest text-[#D9A9B8]">Intervención profesional</p>
                </div>
              </div>
            </div>

            <div className="space-y-6 lg:col-span-7">
              <p className="text-xs font-bold uppercase tracking-widest text-[#7F203D]">Estrategia jurídica</p>
              <h2 id="services-introduction-title" className="max-w-3xl font-serif text-3xl font-bold leading-[1.1] tracking-tight text-[#302D28] sm:text-4xl lg:text-5xl">
                Estrategia jurídica con intervención directa
              </h2>
              <p className="max-w-2xl text-base font-light leading-relaxed text-[#302D28]/80 sm:text-lg">
                Cada asunto requiere comprender el contexto, identificar los riesgos y definir una estrategia procesal antes de intervenir.
              </p>
              <p className="max-w-2xl text-base font-light leading-relaxed text-[#302D28]/80 sm:text-lg">
                La práctica profesional combina análisis jurídico, preparación probatoria y participación directa en las distintas etapas del procedimiento, con especial atención a las causas penales de mayor complejidad.
              </p>
              <div className="border-l-2 border-[#7F203D] bg-[#FFF8F2] px-5 py-4 sm:px-6">
                <p className="font-serif text-base font-semibold leading-relaxed text-[#302D28] sm:text-lg">Una estrategia sólida comienza mucho antes de llegar a una audiencia.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="services-catalog" aria-labelledby="services-catalog-title" className="w-full bg-[#FAF6F0] py-16 lg:py-24">
        <div className="mx-auto max-w-7xl space-y-12 px-4 sm:px-6 lg:space-y-16 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <p className="text-xs font-bold uppercase tracking-widest text-[#7F203D]">Áreas de práctica especializada</p>
            <h2 id="services-catalog-title" className="font-serif text-3xl font-bold leading-[1.15] tracking-tight text-[#302D28] sm:text-4xl">Un abordaje jurídico especializado</h2>
            <p className="text-base font-light leading-relaxed text-[#302D28]/80 sm:text-lg">Servicios orientados a la prevención, defensa y resolución de contingencias penales y corporativas.</p>
          </div>

          <div id="services-carousel" aria-label="Áreas de práctica jurídica" className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-5 sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-6 sm:overflow-x-visible sm:px-0 sm:pb-0 sm:snap-none">
            {SERVICES.map((service, index) => (
              <article key={service.id} id={`service-card-${service.id}`} className="group flex w-[82vw] shrink-0 snap-center flex-col overflow-hidden border border-[#DDD2C5] bg-[#FFF8F2] transition-all duration-300 hover:border-[#7F203D] hover:shadow-lg sm:w-auto sm:shrink lg:min-h-[300px] lg:flex-row">
                <div className="relative aspect-[16/10] shrink-0 overflow-hidden bg-[#302D28] sm:aspect-[16/9] lg:aspect-auto lg:h-auto lg:w-[38%]">
                  <img src={service.image} alt={service.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" loading={index < 4 ? 'eager' : 'lazy'} />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#181614]/65 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-[#181614]/20" aria-hidden="true" />
                  <span className="absolute left-5 top-5 font-serif text-sm font-bold text-white" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
                  {service.isFeatured && <span className="absolute right-5 top-5 bg-[#7F203D] px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-white">Destacado</span>}
                </div>
                <div className="flex flex-1 flex-col p-6 sm:p-7 lg:p-8">
                  <div className="mb-5 flex h-10 w-10 items-center justify-center bg-[#7F203D]/10 text-[#7F203D] transition-colors duration-300 group-hover:bg-[#7F203D] group-hover:text-white" aria-hidden="true">
                    {getServiceIcon(service.iconName, 'h-5 w-5 text-[#7F203D] group-hover:text-white')}
                  </div>
                  <h3 className="font-serif text-xl font-bold leading-snug text-[#302D28] transition-colors group-hover:text-[#7F203D]">{service.title}</h3>
                  <p className="mt-4 text-sm font-light leading-relaxed text-[#302D28]/80">{service.shortDesc}</p>
                  <ul className="mt-6 space-y-2.5 border-t border-[#302D28]/10 pt-5">
                    {service.bulletPoints.slice(0, 3).map((point) => (
                      <li key={point} className="flex items-start gap-2 text-xs leading-relaxed text-[#302D28]/75">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#7F203D]" aria-hidden="true" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto pt-7">
                    <button type="button" onClick={handleNavigateToContact} className={`group/cta inline-flex w-full items-center justify-between border-t border-[#302D28]/10 pt-4 text-left text-xs font-bold uppercase tracking-wider text-[#7F203D] transition-colors hover:text-[#691931] ${darkFocusRing}`} aria-label={`Consultar sobre ${service.title}`}>
                      <span>Consultar sobre este servicio</span>
                      <ArrowRight className="h-4 w-4 shrink-0 transition-transform group-hover/cta:translate-x-1" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="flex items-center justify-center gap-3 text-[10px] font-bold uppercase tracking-widest text-[#302D28]/45 sm:hidden">
            <span>Deslice para ver más servicios</span>
            <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </div>
        </div>
      </section>

      <section id="services-final-cta" aria-labelledby="services-final-cta-title" className="w-full bg-[#302D28] py-16 text-white lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-8 border border-white/15 bg-white/5 p-7 sm:p-10 lg:flex-row lg:items-center lg:justify-between lg:gap-12 lg:p-12">
            <div className="max-w-3xl space-y-4">
              <p className="text-xs font-bold uppercase tracking-widest text-[#D9A9B8]">Consulta profesional</p>
              <h2 id="services-final-cta-title" className="font-serif text-3xl font-bold leading-tight text-white sm:text-4xl">¿Necesita evaluar una situación jurídica específica?</h2>
              <p className="max-w-2xl text-base font-light leading-relaxed text-white/75 sm:text-lg">Una primera consulta permite analizar el contexto, identificar las cuestiones relevantes y determinar los próximos pasos.</p>
            </div>
            <button type="button" onClick={onRequestConsultation} className="group inline-flex shrink-0 items-center justify-center gap-3 bg-[#7F203D] px-7 py-4 text-xs font-bold uppercase tracking-widest text-white transition-colors hover:bg-[#691931] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D9A9B8] focus-visible:ring-offset-2 focus-visible:ring-offset-[#302D28] sm:px-8 sm:text-sm">
              <span>Solicitar consulta</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
