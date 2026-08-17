import React from 'react';
import { Scale, FileCheck, ArrowRight, Lock, ShieldAlert, Briefcase, AlertCircle, Search, Building2 } from 'lucide-react';
import { ActiveTab } from '../types';
import { ASSETS, SERVICES } from '../data/lawyerData';

interface HomeSectionProps {
  setActiveTab: (tab: ActiveTab) => void;
  onRequestConsultation: () => void;
}

export const HomeSection: React.FC<HomeSectionProps> = ({ setActiveTab, onRequestConsultation }) => {
  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'ShieldAlert': return <ShieldAlert className="w-5 h-5 text-[#7F203D]" />;
      case 'Scale': return <Scale className="w-5 h-5 text-[#7F203D]" />;
      case 'FileCheck': return <FileCheck className="w-5 h-5 text-[#7F203D]" />;
      case 'Briefcase': return <Briefcase className="w-5 h-5 text-[#7F203D]" />;
      case 'Lock': return <Lock className="w-5 h-5 text-[#7F203D]" />;
      case 'AlertCircle': return <AlertCircle className="w-5 h-5 text-[#7F203D]" />;
      case 'Search': return <Search className="w-5 h-5 text-[#7F203D]" />;
      case 'Building2': return <Building2 className="w-5 h-5 text-[#7F203D]" />;
      default: return <Scale className="w-5 h-5 text-[#7F203D]" />;
    }
  };

  const handleNavigateToServices = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setActiveTab('servicios');
  };

  return (
    <div id="home-section" className="space-y-0 lg:space-y-0 relative">
      <section id="hero-banner" className="relative min-h-[90vh] lg:min-h-screen w-full flex items-center justify-center pt-28 lg:pt-36 pb-16 lg:pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 scale-100" style={{ backgroundImage: `url(${ASSETS.heroOffice})` }} />
        <div className="absolute inset-0 bg-gradient-to-br from-[#181614]/95 via-[#231F1C]/90 to-[#2A2522]/70" aria-hidden="true" />
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
          <div className="mb-8 lg:mb-12 w-max"><span className="text-xs sm:text-sm font-bold tracking-widest uppercase text-white/75">Abogada Emilia Sandobar - Mendoza</span></div>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-8 space-y-6 lg:space-y-8">
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                <h1 className="font-serif text-[32px] sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight text-white mb-6">Defensa Penal y Asesoría Corporativa en Mendoza</h1>
                <p className="text-base sm:text-lg lg:text-xl text-white/80 font-light max-w-2xl leading-relaxed">Atención personalizada y máxima confidencialidad, con representación y asesoramiento legal durante todas las etapas del proceso judicial.</p>
              </div>
            </div>
            <div className="lg:col-span-4 w-full max-w-md mx-auto lg:mx-0 lg:ml-auto">
              <div className="bg-white/5 backdrop-blur-md border border-white/10 p-6 sm:p-8  animate-in fade-in duration-700 space-y-6">
                <h2 className="font-serif text-xl sm:text-2xl font-bold text-white">¿Necesita asistencia jurídica?</h2>
                <div className="space-y-3">
                  <button type="button" onClick={onRequestConsultation} className="w-full px-8 py-4 bg-[#7F203D] text-white font-bold text-xs uppercase tracking-widest  hover:bg-[#691931] transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md focus-visible:ring-2 focus-visible:ring-[#7F203D] focus-visible:ring-offset-2"><span>Solicitar consulta</span><ArrowRight className="w-4 h-4" aria-hidden="true" /></button>
                  <button type="button" onClick={() => setActiveTab('contacto')} className="w-full py-3 bg-transparent border border-white/30 text-white font-bold text-xs uppercase tracking-widest  hover:bg-white/10 transition-colors flex items-center justify-center gap-2 cursor-pointer focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2"><span>Ver canales de contacto</span></button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="home-services-section" className="w-full bg-[#FAF6F0] py-16 lg:py-24 border-b border-[#302D28]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 lg:space-y-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-4 max-w-3xl"><span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[#7F203D] block">Áreas de Práctica Especializada</span><h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#302D28] tracking-tight leading-[1.15]">Servicios & Dirección Jurídica</h2><p className="text-base sm:text-lg text-[#302D28]/80 font-light leading-relaxed">Intervención técnica y estratégica en causas penales complejas, blindaje directivo y asesoramiento corporativo preventivo ante cualquier tribunal.</p></div>
            <button type="button" onClick={handleNavigateToServices} className="inline-flex items-center gap-3 text-xs sm:text-sm font-bold uppercase tracking-widest text-[#7F203D] hover:text-[#691931] transition-colors group cursor-pointer shrink-0 pb-1 focus-visible:ring-2 focus-visible:ring-[#7F203D] focus-visible:ring-offset-2"><span>Ver todos los servicios</span><ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" /></button>
          </div>
          <div className="relative">
            <div id="home-services-carousel" className="flex sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 overflow-x-auto sm:overflow-x-visible snap-x snap-mandatory sm:snap-none pb-4 sm:pb-0 -mx-4 px-4 sm:mx-0 sm:px-0 no-scrollbar" aria-label="Carrusel de servicios">
              {SERVICES.slice(0, 8).map((service, index) => (
                <button type="button" key={service.id} id={`home-service-card-${service.id}`} onClick={handleNavigateToServices} className="w-[82vw] sm:w-auto shrink-0 sm:shrink snap-center sm:snap-align-none bg-[#FFF8F2] border border-[#DDD2C5] p-6 sm:p-7 flex flex-col justify-between text-left hover:border-[#7F203D] hover:shadow-md transition-all duration-300 group cursor-pointer  space-y-6 focus-visible:ring-2 focus-visible:ring-[#7F203D] focus-visible:ring-offset-2">
                  <span className="block w-full"><span className="flex items-center justify-between"><span className="font-serif text-sm font-bold text-[#7F203D]/60 group-hover:text-[#7F203D] transition-colors">{String(index + 1).padStart(2, '0')}</span><span className="w-10 h-10  bg-[#7F203D]/10 flex items-center justify-center text-[#7F203D] group-hover:bg-[#7F203D] group-hover:text-white transition-colors duration-300">{getServiceIcon(service.iconName)}</span></span><span className="block mt-4 font-serif text-lg sm:text-xl font-bold text-[#302D28] group-hover:text-[#7F203D] transition-colors leading-snug">{service.title}</span><span className="block mt-4 text-xs sm:text-sm text-[#302D28]/70 font-light leading-relaxed line-clamp-3">{service.shortDesc}</span></span>
                  <span className="pt-4 border-t border-[#302D28]/10 flex items-center justify-between text-xs font-semibold text-[#7F203D]"><span className="uppercase tracking-wider">Ver áreas de práctica</span><ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" aria-hidden="true" /></span>
                </button>
              ))}
            </div>
            <div className="sm:hidden flex items-center justify-center gap-2 pt-3 text-[11px] text-[#302D28]/60 font-light" aria-hidden="true"><span>Desliza para ver más áreas</span><ArrowRight className="w-3.5 h-3.5 text-[#7F203D]" aria-hidden="true" /></div>
          </div>
        </div>
      </section>
    </div>
  );
};
