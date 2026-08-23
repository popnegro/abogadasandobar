import React from 'react';
import { ArrowRight } from 'lucide-react';

import { ActiveTab } from '../types';
import { ASSETS, SERVICES } from '../data/lawyerData';
import { getServiceIcon } from '../utils/iconUtils';
import { PublicCasesSection } from './PublicCasesSection';

interface HomeSectionProps {
  setActiveTab: (tab: ActiveTab) => void;
  onRequestConsultation: () => void;
}

export const HomeSection: React.FC<HomeSectionProps> = ({
  setActiveTab,
  onRequestConsultation,
}) => {
  const darkFocusRing =
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7F203D] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FAF6F0]';

  const lightFocusRing =
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#181614]';

  const handleNavigateToServices = () => {
    setActiveTab('servicios');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateToService = (serviceId: string) => {
    setActiveTab('servicios');

    window.setTimeout(() => {
      const targetId =
        serviceId === 'delitos-economicos'
          ? 'derecho-penal-economico-financiero'
          : serviceId;

      const element = document.getElementById(targetId);

      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 50);
  };

  const handleNavigateToContact = () => {
    setActiveTab('contacto');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div id="home-section" className="relative w-full">
      <section
        id="hero-banner"
        aria-labelledby="hero-title"
        className="relative flex min-h-[600px] w-full items-center justify-center overflow-hidden pb-16 pt-28 lg:min-h-[640px] lg:pb-20 lg:pt-32"
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${ASSETS.heroOffice})` }}
          aria-hidden="true"
        />

        <div
          className="absolute inset-0 bg-gradient-to-br from-[#181614]/95 via-[#231F1C]/90 to-[#2A2522]/80"
          aria-hidden="true"
        />

        <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col justify-center px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-12">
            <div className="space-y-6 lg:col-span-7 lg:space-y-8">
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                   <h2 className="mb-6 max-w-4xl font-serif text-xl font-bold leading-snug text-white sm:text-2xl lg:text-3xl">
                  Abogada Emilia Sandobar
                </h2>
                <h1
                  id="hero-title"
                  className="mb-4 font-serif text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl"
                >
                  Defensa Penal y Asesoría Corporativa
                  <span className="text-[#D9A9B8]"> en Mendoza</span>
                </h1>

                <p className="max-w-2xl text-base font-light leading-relaxed text-white sm:text-lg lg:text-xl">
                  Atención personalizada y máxima confidencialidad, con
                  representación y asesoramiento legal durante todas las etapas
                  del proceso judicial en Mendoza, incluyendo el Polo Judicial
                  Penal y los fueros federales.
                </p>

                <div className="mt-8 hidden flex-col gap-3 sm:flex sm:flex-row sm:items-center">
                  <button
                    type="button"
                    onClick={handleNavigateToContact}
                    className={`ds-btn-primary w-full sm:w-auto ${lightFocusRing}`}
                  >
                    <span>Evaluar urgencia penal</span>
                    <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
                  </button>

                  <button
                    type="button"
                    onClick={handleNavigateToServices}
                    className={`ds-btn-secondary w-full border-white/50 text-white hover:border-white/70 hover:bg-white/10 sm:w-auto ${lightFocusRing}`}
                  >
                    <span>Consulta corporativa</span>
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      <section
        id="home-services-section"
        aria-labelledby="services-title"
        className="w-full border-b border-[#302D28]/10 bg-[#FAF6F0] py-16 lg:py-24"
      >
        <div className="mx-auto max-w-7xl space-y-12 px-4 sm:px-6 lg:space-y-16 lg:px-8">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div className="max-w-3xl space-y-4">
              <p className="ds-eyebrow">
                Áreas de práctica especializada
              </p>

              <h2 id="services-title" className="ds-section-title">
                Servicios de Abogacía
              </h2>

              <p className="ds-section-lead">
                Intervención técnica y estratégica en causas penales complejas,
                asesoramiento corporativo preventivo y defensa jurídica ante
                tribunales provinciales, federales y el Polo Judicial Penal de Mendoza.
              </p>
            </div>

            <button
              type="button"
              onClick={handleNavigateToServices}
              className={`ds-btn-informative group shrink-0 pb-1 sm:text-sm ${darkFocusRing}`}
            >
              <span>Ver todos los servicios</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </button>
          </div>

          <div className="relative">
            <div className="space-y-4 sm:hidden">
              {SERVICES.slice(0, 4).map((service, index) => (
                <button
                  key={service.id}
                  type="button"
                  id={`home-service-card-mobile-${service.id}`}
                  onClick={() => handleNavigateToService(service.id)}
                  aria-label={`Ver información sobre ${service.title}`}
                  className={`group ds-card flex w-full cursor-pointer flex-col justify-between space-y-5 p-5 text-left ${darkFocusRing}`}
                >
                  <span className="flex items-center justify-between">
                    <span className="font-serif text-sm font-bold text-[#7F203D]" aria-hidden="true">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span
                      className="flex h-10 w-10 items-center justify-center bg-[#7F203D]/10 text-[#7F203D] transition-colors duration-300 group-hover:bg-[#7F203D] group-hover:text-white"
                      aria-hidden="true"
                    >
                      {getServiceIcon(
                        service.iconName,
                        'h-5 w-5 text-[#7F203D] group-hover:text-white',
                      )}
                    </span>
                  </span>

                  <span className="block ds-card-title group-hover:text-[#7F203D]">
                    {service.title}
                  </span>

                  <span className="block text-sm font-light leading-relaxed text-[#302D28]/80">
                    {service.shortDesc}
                  </span>

                  <span className="flex items-center justify-between border-t border-[#302D28]/10 pt-4 text-xs font-semibold text-[#7F203D]">
                    <span className="uppercase tracking-wider">Ver área de práctica</span>
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                  </span>
                </button>
              ))}
            </div>

            <div
              id="home-services-carousel"
              role="list"
              aria-label="Servicios jurídicos especializados"
              className="-mx-4 hidden snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-6 sm:overflow-x-visible sm:px-0 sm:pb-0 sm:snap-none lg:grid-cols-4"
            >
              {SERVICES.slice(0, 8).map((service, index) => (
                <div
                  key={service.id}
                  role="listitem"
                  className="w-[82vw] shrink-0 snap-center sm:w-auto sm:shrink sm:snap-align-none"
                >
                  <button
                    type="button"
                    id={`home-service-card-${service.id}`}
                    onClick={() => handleNavigateToService(service.id)}
                    aria-label={`Ver información sobre ${service.title}`}
                  className={`group ds-card flex h-full w-full cursor-pointer flex-col justify-between space-y-6 p-6 text-left sm:p-7 ${darkFocusRing}`}
                >
                    <span className="block w-full">
                      <span className="flex items-center justify-between">
                        <span className="font-serif text-sm font-bold text-[#7F203D]" aria-hidden="true">
                          {String(index + 1).padStart(2, '0')}
                        </span>

                        <span
                          className="flex h-10 w-10 items-center justify-center bg-[#7F203D]/10 text-[#7F203D] transition-colors duration-300 group-hover:bg-[#7F203D] group-hover:text-white"
                          aria-hidden="true"
                        >
                          {getServiceIcon(
                            service.iconName,
                            'h-5 w-5 text-[#7F203D] group-hover:text-white',
                          )}
                        </span>
                      </span>

                      <span className="mt-4 block ds-card-title group-hover:text-[#7F203D] sm:text-xl">
                        {service.title}
                      </span>

                      <span className="mt-4 block text-sm font-light leading-relaxed text-[#302D28]/80">
                        {service.shortDesc}
                      </span>
                    </span>

                    <span className="flex items-center justify-between border-t border-[#302D28]/10 pt-4 text-xs font-semibold text-[#7F203D]">
                      <span className="uppercase tracking-wider">Ver área de práctica</span>
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                    </span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <PublicCasesSection onRequestConsultation={onRequestConsultation} />
    </div>
  );
};
