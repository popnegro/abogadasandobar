import React from 'react';
import { useLocation } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

import { ActiveTab } from '../types';
import {
  ASSETS,
  LAWYER_INFO,
  STATS,
} from '../data/lawyerData';

import { Breadcrumb } from './Breadcrumb';
import { AnimatedCounter } from './AnimatedCounter';

interface AboutSectionProps {
  setActiveTab?: (tab: ActiveTab) => void;
  onOpenConsultationModal: () => void;
}

const METHOD_STEPS = [
  {
    step: '01',
    title: 'Escuchamos',
    desc: 'Recabamos con absoluta discreción los hechos, el contexto y la urgencia de su situación jurídica.',
  },
  {
    step: '02',
    title: 'Evaluamos',
    desc: 'Analizamos la viabilidad procesal y los riesgos patrimoniales o personales asociados al escenario.',
  },
  {
    step: '03',
    title: 'Definimos',
    desc: 'Trazamos la estrategia de defensa o prevención corporativa, estableciendo metas claras y medibles.',
  },
  {
    step: '04',
    title: 'Actuamos',
    desc: 'Ejecutamos la hoja de ruta con firmeza dogmática en sede judicial o en mesas de negociación.',
  },
] as const;

export const AboutSection: React.FC<AboutSectionProps> = ({
  setActiveTab = () => {},
  onOpenConsultationModal,
}) => {
  const location = useLocation();

  const isMethodRoute = location.pathname === '/nuestro-metodo';

  const pageTitle = isMethodRoute
    ? 'Nuestro método'
    : 'Trayectoria y experiencia';

  const pageTitleHighlight = isMethodRoute
    ? 'de trabajo'
    : 'profesional';

  const pageSubtitle = isMethodRoute
    ? 'Un proceso de trabajo estructurado para comprender cada situación, evaluar sus riesgos y construir una estrategia jurídica rigurosa.'
    : `Más de ${LAWYER_INFO.experienceYears} años liderando litigación de alta complejidad, análisis pericial y defensa penal estratégica ante los máximos tribunales y audiencias provinciales.`;

  return (
    <div id="about-section" className="w-full bg-[#FAF6F0]">

      {/* ========================================================
          PAGE HERO
      ======================================================== */}
      <section
        id="about-hero"
        aria-labelledby="about-hero-title"
        className="relative flex min-h-[480px] w-full items-center overflow-hidden bg-[#181614] pb-16 pt-28 lg:min-h-[540px] lg:pb-20 lg:pt-32"
      >
        {/* Background */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${
              isMethodRoute
                ? ASSETS.heroMethod
                : ASSETS.heroAbout
            })`,
          }}
          aria-hidden="true"
        />

        {/* Overlay */}
        <div
          className="absolute inset-0 bg-gradient-to-br from-[#181614]/95 via-[#231F1C]/90 to-[#2A2522]/75"
          aria-hidden="true"
        />

        {/* Hero content */}
        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">

          {/* Breadcrumb */}
          <div className="mb-8 lg:mb-10">
            <Breadcrumb
              items={[
                {
                  label: isMethodRoute
                    ? 'Nuestro método'
                    : 'Experiencia',
                  active: true,
                },
              ]}
              onNavigate={setActiveTab}
              variant="primary"
            />
          </div>

          <div className="max-w-4xl space-y-6">

            <h1
              id="about-hero-title"
              className="font-serif text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl"
            >
              {pageTitle}
              <span className="block text-[#D9A9B8]">
                {pageTitleHighlight}
              </span>
            </h1>

            <p className="max-w-3xl text-base font-light leading-relaxed text-white/85 sm:text-lg lg:text-xl">
              {pageSubtitle}
            </p>

          </div>
        </div>
      </section>

      {/* ========================================================
          CONTENT
      ======================================================== */}
      <main className="mx-auto max-w-7xl space-y-16 px-4 py-16 sm:px-6 lg:space-y-24 lg:px-8 lg:py-24">

        {/* ======================================================
            MANIFIESTO
        ====================================================== */}
        <section
          id="trayectoria-manifiesto"
          className="space-y-12"
          aria-labelledby="manifesto-title"
        >
          <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-20">

            {/* IMAGE */}
            <div className="w-full lg:col-span-5">
              <img
                src={ASSETS.portrait}
                alt="Retrato de la Abogada Emilia Sandobar"
                className="h-auto w-full rounded-sm object-cover shadow-md"
                loading="lazy"
                decoding="async"
              />
            </div>

            {/* TEXT */}
            <div className="space-y-8 lg:col-span-7">

              <h2
                id="manifesto-title"
                className="font-serif text-3xl font-bold leading-[1.1] tracking-tight text-[#302D28] sm:text-4xl"
              >
                Defensa inquebrantable, rigor técnico y
                confidencialidad absoluta.
              </h2>

              <p className="max-w-prose text-lg font-light leading-relaxed text-[#302D28]/80 sm:text-xl lg:max-w-none">
                El rigor técnico y la lealtad procesal son la
                única garantía real de una defensa inquebrantable.
                Entendemos que cada situación jurídica compromete
                el prestigio, el patrimonio y, en ocasiones, la
                libertad de nuestros clientes.
              </p>

              <p className="max-w-prose text-base font-light leading-relaxed text-[#302D28]/80 sm:text-lg lg:max-w-none">
                Su ejercicio profesional se distingue por el
                análisis pericial minucioso de la prueba, la
                anticipación estratégica ante la acusación pública
                y privada, y un trato directo, honesto y
                transparente en situaciones de máxima exigencia.
              </p>

              <div className="pt-8">
                <button
                  type="button"
                  onClick={onOpenConsultationModal}
                  className="group flex cursor-pointer items-center gap-3 text-xs font-bold uppercase tracking-widest text-[#7F203D] transition-colors hover:text-[#691931] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7F203D] focus-visible:ring-offset-2 sm:text-sm"
                >
                  <span>Solicitar consulta</span>

                  <ArrowRight
                    className="h-5 w-5 transition-transform group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </button>
              </div>

            </div>
          </div>
        </section>

        {/* ======================================================
            EXPERIENCIA / AUTORIDAD
        ====================================================== */}
        <section
          id="autoridad-respaldo"
          className="space-y-8 lg:space-y-12"
          aria-labelledby="authority-title"
        >
          <div className="flex flex-col gap-6 border-t border-[#302D28]/20 pt-8">

            <div className="max-w-3xl space-y-3">
              <p className="ds-eyebrow">
                Autoridad &amp; Respaldo
              </p>
              <h2
                id="authority-title"
                className="ds-section-title"
              >
                Trayectoria y respaldo verificable
              </h2>
              <p className="ds-section-lead max-w-2xl">
                Datos institucionales, cobertura territorial y habilitación profesional, presentados de forma clara para facilitar el escaneo.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4" aria-label="Estadísticas de autoridad y respaldo">
              {STATS.map((stat, index) => (
                <article
                  key={`${stat.label}-${index}`}
                  className="ds-stat-card"
                >
                  <div className="flex h-full flex-col justify-between space-y-4">

                    <div className="space-y-1">

                      <AnimatedCounter
                        value={stat.value}
                        duration={1200}
                        className="block font-serif text-4xl font-bold text-[#7F203D] lg:text-5xl"
                      />

                      <span className="block text-xs font-bold uppercase tracking-wider text-[#7F203D] sm:text-sm">
                        {stat.label}
                      </span>

                    </div>

                    {stat.detail && (
                      <p className="text-xs font-light leading-relaxed text-[#302D28] sm:text-sm">
                        {stat.detail}
                      </p>
                    )}

                  </div>
                </article>
              ))}
            </div>

          </div>
        </section>

        {/* ======================================================
            MÉTODO
        ====================================================== */}
        <section
          id="metodo-proceso"
          className="scroll-mt-28 space-y-12 lg:space-y-16"
          aria-labelledby="method-title"
        >
          <div className="flex items-baseline justify-between border-t border-[#302D28]/20 pt-8">
            <div className="max-w-3xl space-y-3">
              <p className="ds-eyebrow">
                Método &amp; Proceso
              </p>
              <h2
                id="method-title"
                className="ds-section-title"
              >
                Cómo trabajamos cada caso
              </h2>
            </div>

          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-10 lg:grid-cols-4 lg:gap-12">

            {METHOD_STEPS.map((item) => (
              <article
                key={item.step}
                className="group"
              >
                <div className="relative h-full w-full border-t border-[#302D28]/20 pr-8 pt-6 sm:pt-8 lg:pr-12">

                  {/* PROCESS INDICATOR */}
                  <div
                    className="absolute -top-[4px] left-0 h-2 w-2 rounded-full bg-[#7F203D] shadow-[0_0_0_4px_#FFF8F2] transition-transform duration-500 group-hover:scale-150"
                    aria-hidden="true"
                  />

                  <div className="space-y-4">

                    <span className="block font-serif text-sm font-bold uppercase tracking-widest text-[#7F203D] lg:text-base">
                      Etapa {item.step}
                    </span>

                    <h3 className="ds-card-title group-hover:text-[#7F203D] sm:text-2xl">
                      {item.title}
                    </h3>

                    <p className="max-w-[280px] text-sm font-light leading-relaxed text-[#302D28]/70 sm:max-w-none sm:text-base">
                      {item.desc}
                    </p>

                  </div>
                </div>
              </article>
            ))}

          </div>
        </section>

      </main>
    </div>
  );
};
