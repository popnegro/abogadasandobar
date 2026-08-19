import React from 'react';
import { ArrowRight, Scale } from 'lucide-react';

interface PublicCasesSectionProps {
  onRequestConsultation: () => void;
}

export const PublicCasesSection: React.FC<PublicCasesSectionProps> = ({
  onRequestConsultation,
}) => {
  const focusRing =
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D9A9B8] focus-visible:ring-offset-2 focus-visible:ring-offset-[#302D28]';

  return (
    <section
      id="public-cases-section"
      aria-labelledby="public-cases-title"
      className="w-full bg-[#302D28] py-16 text-white lg:py-24"
    >
      <div className="mx-auto max-w-7xl space-y-12 px-4 sm:px-6 lg:space-y-16 lg:px-8">

        {/* =====================================================
            HEADER
        ====================================================== */}
        <div className="flex flex-col justify-between gap-6 border-b border-white/15 pb-8 md:flex-row md:items-end">
          <div className="max-w-3xl space-y-4">

            <span className="block text-[10px] font-bold uppercase tracking-widest text-[#D9A9B8] sm:text-xs">
              Jurisprudencia y actuación pública
            </span>

            <h2
              id="public-cases-title"
              className="font-serif text-3xl font-bold leading-[1.15] tracking-tight text-white sm:text-4xl"
            >
              Casos de interés público
            </h2>

            <p className="text-base font-light leading-relaxed text-white/80 sm:text-lg">
              La Dra. Sandobar ha participado en litigios de alta complejidad
              procesal y repercusión social, ejerciendo la defensa técnica y
              representación de querellas en investigaciones
              penales preparatorias de relevancia.
            </p>
          </div>

          <button
            type="button"
            onClick={onRequestConsultation}
            className={`group inline-flex shrink-0 cursor-pointer items-center gap-3 text-xs font-bold uppercase tracking-widest text-white/90 transition-colors hover:text-white sm:text-sm ${focusRing}`}
          >
            <span>Consultar sobre un caso similar</span>

            <ArrowRight
              className="h-4 w-4 transition-transform group-hover:translate-x-1"
              aria-hidden="true"
            />
          </button>
        </div>

        {/* =====================================================
            CASES GRID
        ====================================================== */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">

          {/* ===================================================
              CASE 01
          ==================================================== */}
          <article className="group flex flex-col justify-between border border-white/15 bg-white/5 p-8 transition-colors duration-300 hover:border-[#D9A9B8]/50 sm:p-10">

            <div className="space-y-6">

              {/* Icon */}
              <div
                className="flex h-12 w-12 items-center justify-center bg-[#7F203D]/25"
                aria-hidden="true"
              >
                <Scale
                  className="h-6 w-6 text-[#D9A9B8]"
                  aria-hidden="true"
                />
              </div>

              {/* Heading */}
              <div className="space-y-3">

                <span className="block text-[10px] font-bold uppercase tracking-widest text-[#D9A9B8] sm:text-xs">
                  Mendoza, Argentina
                </span>

                <h3 className="font-serif text-xl font-bold leading-snug text-white transition-colors group-hover:text-[#D9A9B8] sm:text-2xl">
                  Caso: Liga Mendocina de Fútbol
                </h3>
              </div>

              {/* Description */}
              <p className="text-sm font-light leading-relaxed text-white/80 sm:text-base">
                La Dra. Sandobar representó como abogada querellante a una
                profesional de la salud damnificada por la presunta
                utilización y falsificación de su firma y sello profesional
                para la emisión de certificados de aptitud física.
              </p>

              {/* Intervention */}
              <div className="border-l-2 border-[#D9A9B8] bg-[#7F203D]/15 p-4 text-sm font-light leading-relaxed text-white/85">
                <span className="mb-2 block text-[10px] font-bold uppercase tracking-widest text-[#D9A9B8]">
                  Intervención
                </span>

                Análisis y aporte de prueba caligráfica, acompañamiento de la
                investigación penal preparatoria y defensa de los intereses de
                la profesional damnificada.
              </div>

            </div>
          </article>

          {/* ===================================================
              CASE 02
          ==================================================== */}
          <article className="group flex flex-col justify-between border border-white/15 bg-white/5 p-8 transition-colors duration-300 hover:border-[#D9A9B8]/50 sm:p-10">

            <div className="space-y-6">

              {/* Icon */}
              <div
                className="flex h-12 w-12 items-center justify-center bg-[#7F203D]/25"
                aria-hidden="true"
              >
                <Scale
                  className="h-6 w-6 text-[#D9A9B8]"
                  aria-hidden="true"
                />
              </div>

              {/* Heading */}
              <div className="space-y-3">

                <span className="block text-[10px] font-bold uppercase tracking-widest text-[#D9A9B8] sm:text-xs">
                  Violencia de género
                </span>

                <h3 className="font-serif text-xl font-bold leading-snug text-white transition-colors group-hover:text-[#D9A9B8] sm:text-2xl">
                  Amenazas y medidas de protección
                </h3>
              </div>

              {/* Description */}
              <p className="text-sm font-light leading-relaxed text-white/80 sm:text-base">
                Abordaje jurídico de situaciones de violencia y amenazas,
                priorizando la celeridad, la confidencialidad y la adopción de
                medidas de protección adecuadas a cada situación.
              </p>

              {/* Intervention */}
              <div className="border-l-2 border-[#D9A9B8] bg-[#7F203D]/15 p-4 text-sm font-light leading-relaxed text-white/85">
                <span className="mb-2 block text-[10px] font-bold uppercase tracking-widest text-[#D9A9B8]">
                  Intervención
                </span>

                Evaluación inicial del riesgo, presentación de denuncias y
                solicitud de medidas judiciales de protección conforme a las
                circunstancias de cada caso.
              </div>

            </div>
          </article>

        </div>
      </div>
    </section>
  );
};