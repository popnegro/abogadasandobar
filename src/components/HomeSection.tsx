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
  /*
   * ============================================================
   * FOCUS RINGS
   * ============================================================
   */

  const darkFocusRing =
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7F203D] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FAF6F0]';

  const lightFocusRing =
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#181614]';

  /*
   * ============================================================
   * NAVIGATION
   * ============================================================
   */

  const handleNavigateToServices = () => {
    setActiveTab('servicios');

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const handleNavigateToService = (serviceId: string) => {
    setActiveTab('servicios');

    /*
     * Dejamos que ServicesSection se monte antes de intentar
     * posicionarnos sobre el servicio solicitado.
     */
    window.setTimeout(() => {
      const targetId =
        serviceId === 'delitos-economicos'
          ? 'derecho-penal-economico-financiero'
          : serviceId;

      const element = document.getElementById(targetId);

      if (element) {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      } else {
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        });
      }
    }, 50);
  };

  const handleNavigateToContact = () => {
    setActiveTab('contacto');

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div
      id="home-section"
      className="relative w-full"
    >
      {/* ========================================================
          HERO
      ======================================================== */}
      <section
        id="hero-banner"
        aria-labelledby="hero-title"
        className="relative flex min-h-[600px] w-full items-center justify-center overflow-hidden pb-16 pt-28 lg:min-h-[640px] lg:pb-20 lg:pt-32"
      >
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${ASSETS.heroOffice})`,
          }}
          aria-hidden="true"
        />

        {/* Contrast overlay */}
        <div
          className="absolute inset-0 bg-gradient-to-br from-[#181614]/95 via-[#231F1C]/90 to-[#2A2522]/80"
          aria-hidden="true"
        />

        {/* Hero content */}
        <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col justify-center px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-12">

            {/* ==================================================
                HERO COPY
            ================================================== */}
            <div className="space-y-6 lg:col-span-8 lg:space-y-8">
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">

                <h1
                  id="hero-title"
                  className="mb-3 font-serif text-2xl font-bold leading-tight text-white sm:text-2xl lg:text-3xl"
                >
                  Abogada Emilia Sandobar
                </h1>

                <h2 className="mb-6 max-w-4xl font-serif text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl">
                  Defensa Penal y Asesoría Corporativa en Mendoza
                </h2>

                <p className="max-w-2xl text-base font-light leading-relaxed text-white sm:text-lg lg:text-xl">
                  Atención personalizada y máxima confidencialidad, con
                  representación y asesoramiento legal durante todas las etapas
                  del proceso judicial.
                </p>

              </div>
            </div>

            {/* ==================================================
                HERO CTA
            ================================================== */}
            <div className="mx-auto w-full max-w-md lg:col-span-4 lg:ml-auto lg:mr-0">
              <div
                className="space-y-6 border border-white/20 bg-[#181614]/80 p-6 backdrop-blur-md sm:p-8"
                aria-labelledby="hero-cta-title"
              >
                <h2
                  id="hero-cta-title"
                  className="font-serif text-xl font-bold leading-tight text-white sm:text-2xl"
                >
                  ¿Necesita asistencia jurídica?
                </h2>

                <div className="space-y-3">
                  {/* Primary CTA */}
                  <button
                    type="button"
                    onClick={handleNavigateToContact}
                    className={`flex w-full cursor-pointer items-center justify-center gap-2 bg-[#7F203D] px-8 py-3.5 text-xs font-bold uppercase tracking-widest text-white shadow-md transition-colors hover:bg-[#691931] ${lightFocusRing}`}
                  >
                    <span>Solicitar consulta</span>

                    <ArrowRight
                      className="h-4 w-4 shrink-0"
                      aria-hidden="true"
                    />
                  </button>

                  {/* Secondary CTA */}
                  <button
                    type="button"
                    onClick={handleNavigateToServices}
                    className={`flex w-full cursor-pointer items-center justify-center gap-2 border border-white/50 bg-transparent py-3 text-xs font-bold uppercase tracking-widest text-white transition-colors hover:bg-white/10 ${lightFocusRing}`}
                  >
                    <span>Ver servicios</span>
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================
          SERVICES
      ======================================================== */}
      <section
        id="home-services-section"
        aria-labelledby="services-title"
        className="w-full border-b border-[#302D28]/10 bg-[#FAF6F0] py-16 lg:py-24"
      >
        <div className="mx-auto max-w-7xl space-y-12 px-4 sm:px-6 lg:space-y-16 lg:px-8">

          {/* Section heading */}
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div className="max-w-3xl space-y-4">

              <p className="text-xs font-bold uppercase tracking-widest text-[#7F203D]">
                Áreas de práctica especializada
              </p>

              <h2
                id="services-title"
                className="font-serif text-3xl font-bold leading-[1.15] tracking-tight text-[#302D28] sm:text-4xl"
              >
                Servicios de Abogacía en Mendoza
              </h2>

              <p className="text-base font-light leading-relaxed text-[#302D28]/80 sm:text-lg">
                Intervención técnica y estratégica en causas penales complejas,
                asesoramiento corporativo preventivo y defensa jurídica ante
                tribunales provinciales y federales.
              </p>
            </div>

            {/* Services navigation */}
            <button
              type="button"
              onClick={handleNavigateToServices}
              className={`group inline-flex shrink-0 cursor-pointer items-center gap-3 pb-1 text-xs font-bold uppercase tracking-widest text-[#7F203D] transition-colors hover:text-[#691931] sm:text-sm ${darkFocusRing}`}
            >
              <span>Ver todos los servicios</span>

              <ArrowRight
                className="h-4 w-4 transition-transform group-hover:translate-x-1"
                aria-hidden="true"
              />
            </button>
          </div>

          {/* ==================================================
              SERVICES CAROUSEL
          ================================================== */}
          <div className="relative">
            <div
              id="home-services-carousel"
              role="list"
              aria-label="Servicios jurídicos especializados"
              className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-6 sm:overflow-x-visible sm:px-0 sm:pb-0 sm:snap-none lg:grid-cols-4"
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
                    className={`group flex h-full w-full cursor-pointer flex-col justify-between space-y-6 border border-[#DDD2C5] bg-[#FFF8F2] p-6 text-left transition-all duration-300 hover:border-[#7F203D] hover:shadow-md sm:p-7 ${darkFocusRing}`}
                  >
                    <span className="block w-full">

                      {/* Card header */}
                      <span className="flex items-center justify-between">
                        <span
                          className="font-serif text-sm font-bold text-[#7F203D]"
                          aria-hidden="true"
                        >
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

                      {/* Title */}
                      <span className="mt-4 block font-serif text-lg font-bold leading-snug text-[#302D28] transition-colors group-hover:text-[#7F203D] sm:text-xl">
                        {service.title}
                      </span>

                      {/* Description */}
                      <span className="mt-4 block text-sm font-light leading-relaxed text-[#302D28]/80">
                        {service.shortDesc}
                      </span>
                    </span>

                    {/* Card CTA */}
                    <span className="flex items-center justify-between border-t border-[#302D28]/10 pt-4 text-xs font-semibold text-[#7F203D]">
                      <span className="uppercase tracking-wider">
                        Ver área de práctica
                      </span>

                      <ArrowRight
                        className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1"
                        aria-hidden="true"
                      />
                    </span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          PUBLIC CASES
      ======================================================== */}
      <PublicCasesSection
        onRequestConsultation={onRequestConsultation}
      />
    </div>
  );
};