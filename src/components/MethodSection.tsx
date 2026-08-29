import React from 'react';
import { ArrowRight } from 'lucide-react';
import { ActiveTab } from '../types';
import { ASSETS } from '../data/lawyerData';
import { Breadcrumb } from './Breadcrumb';

interface MethodSectionProps {
  setActiveTab?: (tab: ActiveTab) => void;
  onOpenConsultationModal: () => void;
}

const METHOD_STEPS = [
  { step: '01', title: 'Escuchamos', desc: 'Recabamos con absoluta discreción los hechos, el contexto y la urgencia de su situación jurídica.' },
  { step: '02', title: 'Evaluamos', desc: 'Analizamos la viabilidad procesal y los riesgos patrimoniales o personales asociados al escenario.' },
  { step: '03', title: 'Definimos', desc: 'Trazamos la estrategia de defensa o prevención corporativa, estableciendo metas claras y medibles.' },
  { step: '04', title: 'Actuamos', desc: 'Ejecutamos la hoja de ruta con firmeza técnica en sede judicial o en mesas de negociación.' },
] as const;

export const MethodSection: React.FC<MethodSectionProps> = ({ setActiveTab = () => {}, onOpenConsultationModal }) => (
  <div id="method-section" className="w-full bg-[#FAF6F0]">
    <section id="method-hero" aria-labelledby="method-hero-title" className="relative flex min-h-[480px] w-full items-center overflow-hidden bg-[#181614] pb-16 pt-28 lg:min-h-[540px] lg:pb-20 lg:pt-32">
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${ASSETS.heroMethod})` }} aria-hidden="true" />
      <div className="absolute inset-0 bg-gradient-to-br from-[#181614]/95 via-[#231F1C]/90 to-[#2A2522]/75" aria-hidden="true" />
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 lg:mb-10"><Breadcrumb items={[{ label: 'Nuestro método', active: true }]} onNavigate={setActiveTab} variant="primary" /></div>
        <div className="max-w-4xl space-y-6"><h1 id="method-hero-title" className="font-serif text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl">Nuestro método<span className="block text-[#D9A9B8]">jurídico</span></h1><p className="max-w-3xl text-base font-light leading-relaxed text-white/85 sm:text-lg lg:text-xl">Un proceso de trabajo estructurado para comprender cada situación, evaluar sus riesgos y construir una estrategia jurídica rigurosa.</p></div>
      </div>
    </section>

    <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <section id="metodo-proceso" aria-labelledby="method-title" className="space-y-12 lg:space-y-16">
        <div className="-mx-4 flex snap-x snap-mandatory gap-y-12 overflow-x-auto px-4 pb-8 sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-y-16 sm:overflow-visible sm:px-0 sm:pb-0 sm:snap-none lg:grid-cols-4 lg:gap-y-0 no-scrollbar">
          {METHOD_STEPS.map((item) => (
            <article key={item.step} className="group w-[85vw] shrink-0 snap-center sm:w-auto sm:shrink sm:snap-align-none">
              <div className="relative h-full w-full border-t border-[#302D28]/20 pr-8 pt-6 sm:pt-8 lg:pr-12">
                <div className="absolute -top-[4px] left-0 h-2 w-2 rounded-full bg-[#7F203D] shadow-[0_0_0_4px_#FFF8F2] transition-transform duration-500 group-hover:scale-150" aria-hidden="true" />
                <div className="space-y-4"><span className="block font-serif text-sm font-bold uppercase tracking-widest text-[#7F203D] lg:text-base">Etapa {item.step}</span><h3 className="font-serif text-xl font-bold text-[#302D28] transition-colors group-hover:text-[#7F203D] sm:text-2xl">{item.title}</h3><p className="max-w-[280px] text-sm font-light leading-relaxed text-[#302D28]/70 sm:max-w-none sm:text-base">{item.desc}</p></div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section aria-labelledby="method-consultation-title" className="pt-16 lg:pt-24">
        <div className="flex flex-col gap-8 border border-white/15 bg-[#302D28] p-7 text-white shadow-sm sm:p-10 lg:flex-row lg:items-center lg:justify-between lg:gap-12 lg:p-12">
          <div className="max-w-3xl space-y-4"><p className="text-xs font-bold uppercase tracking-widest text-[#D9A9B8]">Consulta profesional</p><h2 id="method-consultation-title" className="font-serif text-3xl font-bold leading-tight text-white sm:text-4xl">¿Necesita evaluar una situación jurídica específica?</h2><p className="max-w-2xl text-base font-light leading-relaxed text-white/75 sm:text-lg">Una primera consulta permite analizar el contexto, identificar las cuestiones relevantes y determinar los próximos pasos.</p></div>
          <button type="button" onClick={onOpenConsultationModal} className="group inline-flex w-full shrink-0 items-center justify-center gap-3 bg-[#7F203D] px-7 py-4 text-xs font-bold uppercase tracking-widest text-white transition-colors hover:bg-[#691931] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D9A9B8] focus-visible:ring-offset-2 focus-visible:ring-offset-[#302D28] sm:w-auto sm:px-8 sm:text-sm"><span>Solicitar consulta</span><ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></button>
        </div>
      </section>
    </main>
  </div>
);
