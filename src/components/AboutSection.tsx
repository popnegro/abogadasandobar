import React from 'react';
import { ArrowRight } from 'lucide-react';
import { ActiveTab } from '../types';
import { LAWYER_INFO, STATS, TIMELINE, ACADEMIC_CREDENTIALS } from '../data/lawyerData';
import { Breadcrumb } from './Breadcrumb';
import { PageHero } from './PageHero';
import { ASSETS } from '../data/lawyerData';

interface AboutSectionProps {
  setActiveTab?: (tab: ActiveTab) => void;
  onOpenConsultationModal: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({
  setActiveTab = () => {},
  onOpenConsultationModal
}) => {
  return (
    <div id="about-section" className="w-full">
      
      {/* INTERIOR HERO WITH PRIMARY BACKGROUND */}
      <section 
        id="about-interior-hero"
        className="w-full bg-[#7F203D] text-white pt-28 sm:pt-32 lg:pt-36 pb-14 sm:pb-16 lg:pb-20 px-4 sm:px-6 lg:px-8 border-b border-white/10"
      >
        <div className="max-w-7xl mx-auto space-y-6">
          <Breadcrumb 
            items={[{ label: 'Trayectoria & Sobre Mí', active: true }]} 
            onNavigate={setActiveTab}
            variant="primary"
          />

          <div className="space-y-4 max-w-3xl pt-2">
            
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-6xl font-bold text-white tracking-tight leading-[1.15]">
              La estrategia procesal no se improvisa, se diseña
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-white/85 font-light max-w-3xl leading-relaxed">
              Más de {LAWYER_INFO.experienceYears} años liderando litigación de alta complejidad, análisis pericial y defensa penal estratégica ante los máximos tribunales y audiencias provinciales.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 space-y-28 lg:space-y-40">
        
        {/* 02 - MANIFIESTO */}
        <section className="space-y-12">
          <h2 className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[#7F203D]">
            ¿En qué podemos ayudarte?
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
            <div className="lg:col-span-8">
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-6xl font-bold text-[#302D28] leading-[1.1] tracking-tight">
                Defensa inquebrantable, rigor técnico y confidencialidad absoluta.
              </h2>
            </div>
            
            <div className="lg:col-span-6 lg:col-start-7 space-y-8">
              <p className="text-lg sm:text-xl text-[#302D28]/80 font-light leading-relaxed max-w-prose lg:max-w-none">
                El rigor técnico y la lealtad procesal son la única garantía real de una defensa inquebrantable. Entendemos que cada situación jurídica compromete el prestigio, el patrimonio y, en ocasiones, la libertad de nuestros clientes.
              </p>
              <p className="text-base sm:text-lg text-[#302D28]/80 font-light leading-relaxed max-w-prose lg:max-w-none">
                Su ejercicio profesional se distingue por el análisis pericial minucioso de la prueba, la anticipación estratégica ante la acusación pública y privada, y un trato directo, honesto y transparente en situaciones de máxima exigencia.
              </p>
              
              <div className="pt-8">
                <button
                  onClick={onOpenConsultationModal}
                  className="group flex items-center gap-3 text-xs sm:text-sm font-bold uppercase tracking-widest text-[#7F203D] hover:text-[#691931] transition-colors cursor-pointer"
                >
                  <span>Solicitar consulta</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* 04 - EXPERIENCIA / AUTORIDAD */}
        <section className="space-y-16 lg:space-y-24">
          <div className="border-t border-[#302D28]/20 pt-8 flex flex-col md:flex-row md:items-baseline justify-between gap-6">
            <h2 className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[#7F203D]">
              Autoridad & Respaldo
            </h2>
            <div className="flex gap-12 md:gap-24">
              {STATS.map((stat, i) => (
                <div key={i} className="space-y-2">
                  <span className="font-serif text-4xl lg:text-5xl font-bold text-[#302D28] block">
                    {stat.value}
                  </span>
                  <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#302D28]/60 block">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
            <div className="lg:col-span-5 space-y-6">
              <h3 className="font-serif text-3xl lg:text-5xl font-bold text-[#302D28] leading-tight">
                Trayectoria <br /> Profesional
              </h3>
              <p className="text-base text-[#302D28]/70 font-light leading-relaxed">
                Más de {LAWYER_INFO.experienceYears} años liderando litigación de alta complejidad, con intervenciones determinantes ante la Audiencia Nacional y el Tribunal Supremo.
              </p>
            </div>
            
            <div className="lg:col-span-7 space-y-12">
              {TIMELINE.map((item, idx) => (
                <div key={idx} className="space-y-4">
                  <div className="flex items-baseline gap-4">
                    <span className="font-serif text-lg text-[#7F203D] font-semibold w-32 shrink-0">
                      {item.period.split('—')[0].trim()}
                    </span>
                    <div>
                      <h4 className="font-bold text-base sm:text-lg text-[#302D28]">
                        {item.role}
                      </h4>
                      <span className="text-sm text-[#302D28]/70 font-light block">
                        {item.entity}
                      </span>
                    </div>
                  </div>
                  <div className="pl-36">
                    <p className="text-sm text-[#302D28]/80 font-light leading-relaxed max-w-prose">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 pt-16 border-t border-[#302D28]/10">
            <div className="lg:col-span-5 space-y-6">
              <h3 className="font-serif text-3xl lg:text-5xl font-bold text-[#302D28] leading-tight">
                Rigor <br /> Académico
              </h3>
            </div>
            <div className="lg:col-span-7 space-y-12">
              {ACADEMIC_CREDENTIALS.map((cred, idx) => (
                <div key={idx} className="space-y-4">
                  <div className="flex items-baseline gap-4">
                    <span className="font-serif text-lg text-[#7F203D] font-semibold w-32 shrink-0">
                      {cred.year}
                    </span>
                    <div>
                      <h4 className="font-bold text-base sm:text-lg text-[#302D28]">
                        {cred.title}
                      </h4>
                      <span className="text-sm text-[#302D28]/70 font-light block">
                        {cred.institution}
                      </span>
                    </div>
                  </div>
                  <div className="pl-36">
                    <p className="text-sm text-[#302D28]/80 font-light leading-relaxed max-w-prose">
                      {cred.detail}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 05 - MÉTODO */}
        <section className="space-y-16">
          <div className="border-t border-[#302D28]/20 pt-8">
            <h2 className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[#7F203D]">
              Método & Proceso
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {[
              {
                step: '01',
                title: 'Escuchamos',
                desc: 'Recabamos con absoluta discreción los hechos, el contexto y la urgencia de su situación jurídica.'
              },
              {
                step: '02',
                title: 'Evaluamos',
                desc: 'Analizamos la viabilidad procesal y los riesgos patrimoniales o personales asociados al escenario.'
              },
              {
                step: '03',
                title: 'Definimos',
                desc: 'Trazamos la estrategia de defensa o prevención corporativa, estableciendo metas claras y medibles.'
              },
              {
                step: '04',
                title: 'Actuamos',
                desc: 'Ejecutamos la hoja de ruta con firmeza dogmática en sede judicial o en mesas de negociación.'
              }
            ].map((item, idx) => (
              <div key={idx} className="space-y-4">
                <span className="font-serif text-4xl lg:text-5xl text-[#302D28]/20 font-bold block">
                  {item.step}
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#302D28]">
                  {item.title}
                </h3>
                <p className="text-sm text-[#302D28]/80 font-light leading-relaxed max-w-prose">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
};
