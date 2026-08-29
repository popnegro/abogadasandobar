import React from 'react';
import { ArrowRight } from 'lucide-react';
import { ActiveTab } from '../types';
import { ASSETS } from '../data/lawyerData';
import { Breadcrumb } from './Breadcrumb';

interface ExperienceSectionProps {
  setActiveTab?: (tab: ActiveTab) => void;
  onOpenConsultationModal: () => void;
}

export const ExperienceSection: React.FC<ExperienceSectionProps> = ({
  setActiveTab = () => {},
  onOpenConsultationModal,
}) => (
  <div id="experience-section" className="w-full bg-[#FAF6F0]">
    <section id="experience-hero" aria-labelledby="experience-hero-title" className="relative flex min-h-[480px] w-full items-center overflow-hidden bg-[#181614] pb-16 pt-28 lg:min-h-[540px] lg:pb-20 lg:pt-32">
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${ASSETS.heroAbout})` }} aria-hidden="true" />
      <div className="absolute inset-0 bg-gradient-to-br from-[#181614]/95 via-[#231F1C]/90 to-[#2A2522]/75" aria-hidden="true" />
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 lg:mb-10">
          <Breadcrumb items={[{ label: 'Experiencia', active: true }]} onNavigate={setActiveTab} variant="primary" />
        </div>
        <div className="max-w-4xl space-y-6">
          <h1 id="experience-hero-title" className="font-serif text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl">
            Trayectoria y experiencia
            <span className="block text-[#D9A9B8]">profesional</span>
          </h1>
          <p className="max-w-3xl text-base font-light leading-relaxed text-white/85 sm:text-lg lg:text-xl">
            Formación penal, análisis riguroso de la prueba e intervención directa en causas provinciales y federales, tanto en defensa como en representación de víctimas.
          </p>
        </div>
      </div>
    </section>

    <main className="mx-auto max-w-7xl space-y-16 px-4 py-16 sm:px-6 lg:space-y-24 lg:px-8 lg:py-24">
      <section id="trayectoria-profesional" aria-labelledby="experience-title" className="space-y-12">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-20">
          <div className="w-full lg:col-span-5">
            <img src={ASSETS.portrait} alt="Retrato de la Abogada Emilia Sandobar" className="h-auto w-full rounded-sm object-cover shadow-md" loading="lazy" decoding="async" />
          </div>

          <div className="space-y-8 lg:col-span-7">
            <h2 id="experience-title" className="font-serif text-3xl font-bold leading-[1.1] tracking-tight text-[#302D28] sm:text-4xl">
              Defensa inquebrantable, rigor técnico y confidencialidad absoluta.
            </h2>

            <p className="max-w-prose text-lg font-light leading-relaxed text-[#302D28]/80 sm:text-xl lg:max-w-none">
              Emilia Sandobar: Abogada egresada de la Facultad de Derecho de la Universidad Nacional de Cuyo, con práctica profesional y formación de posgrado en Derecho Penal. Interviene ante la justicia provincial y federal, ejerciendo tanto la defensa técnica como la representación de querellantes particulares.
            </p>

            <p className="max-w-prose text-base font-light leading-relaxed text-[#302D28]/80 sm:text-lg lg:max-w-none">
              Su ejercicio profesional se distingue por el análisis minucioso de la prueba, la anticipación estratégica ante la acusación pública y privada, y un trato directo, honesto y transparente en situaciones de máxima exigencia.
            </p>

            <div className="border-t border-[#302D28]/15 pt-8 space-y-4">
              <h3 className="font-serif text-2xl font-bold text-[#302D28] sm:text-3xl">Formación y práctica profesional</h3>
              <p className="text-base font-light leading-relaxed text-[#302D28]/80 sm:text-lg">
                Participación en jornadas e integrante en proyectos de investigación dentro de la Facultad de Derecho de la UNCuyo.
              </p>
              <p className="text-base font-light leading-relaxed text-[#302D28]/80 sm:text-lg">
                Análisis normativo y elaboración de proyectos vinculados con justicia, seguridad y políticas públicas como asesora de la Honorable Cámara de Senadores de la provincia de Mendoza.
              </p>
            </div>

            <div className="pt-4">
              <button type="button" onClick={onOpenConsultationModal} className="group flex cursor-pointer items-center gap-3 text-xs font-bold uppercase tracking-widest text-[#7F203D] transition-colors hover:text-[#691931] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7F203D] focus-visible:ring-offset-2 sm:text-sm">
                <span>Solicitar consulta</span>
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
);
