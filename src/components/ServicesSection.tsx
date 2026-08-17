import React, { useState, useEffect } from 'react';
import { ShieldAlert, Scale, FileCheck, Briefcase, Lock, AlertCircle, ArrowRight, Building2, Search, X } from 'lucide-react';
import { ActiveTab, ServiceItem } from '../types';
import { SERVICES } from '../data/lawyerData';
import { Breadcrumb } from './Breadcrumb';
import { PageHero } from './PageHero';
import { ASSETS } from '../data/lawyerData';

interface ServicesSectionProps {
  setActiveTab?: (tab: ActiveTab) => void;
  onRequestConsultation: (initialArea?: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ setActiveTab = () => {}, onRequestConsultation }) => {
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  useEffect(() => {
    if (selectedService) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => { document.body.style.overflow = originalOverflow; };
    }
  }, [selectedService]);

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'ShieldAlert': return <ShieldAlert className="w-6 h-6" />;
      case 'Scale': return <Scale className="w-6 h-6" />;
      case 'FileCheck': return <FileCheck className="w-6 h-6" />;
      case 'Briefcase': return <Briefcase className="w-6 h-6" />;
      case 'Lock': return <Lock className="w-6 h-6" />;
      case 'AlertCircle': return <AlertCircle className="w-6 h-6" />;
      case 'Search': return <Search className="w-6 h-6" />;
      case 'Building2': return <Building2 className="w-6 h-6" />;
      default: return <Scale className="w-6 h-6" />;
    }
  };

  return (
    <div id="services-section" className="w-full">
      <PageHero 
        title="Especialización Jurídica Integral" 
        subtitle="Intervención jurídica rigurosa en todas las fases del proceso penal y consultoría de cumplimiento corporativo para prevenir contingencias de alto impacto." 
        eyebrow="Soluciones Legales & Especialización" 
        breadcrumbLabel="Servicios" 
        backgroundImage={ASSETS.library} 
        setActiveTab={setActiveTab} 
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 space-y-16 lg:space-y-24">
        <div className="border-t border-[#302D28]/20">
          {SERVICES.map((service, index) => (
            <div key={service.id} role="button" tabIndex={0} aria-haspopup="dialog" aria-label={`Conocer alcance de ${service.title}`} className="group flex flex-col md:flex-row md:items-center justify-between py-8 md:py-12 border-b border-[#302D28]/20 hover:bg-[#F4EFE8] transition-colors cursor-pointer px-4 -mx-4 focus-visible:ring-2 focus-visible:ring-[#7F203D] focus-visible:ring-offset-2" onClick={() => setSelectedService(service)} onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); setSelectedService(service); } }}>
              <div className="flex items-start gap-6 md:gap-12 md:w-3/4"><span className="font-serif text-lg text-[#7F203D] font-medium shrink-0 pt-1" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span><div className="space-y-2 md:space-y-4"><h2 className="font-serif text-2xl md:text-4xl text-[#302D28] font-bold group-hover:text-[#7F203D] transition-colors">{service.title}</h2><p className="text-base md:text-lg text-[#302D28]/70 font-light leading-relaxed max-w-2xl">{service.shortDesc}</p></div></div>
              <div className="hidden md:flex items-center justify-end md:w-1/4" aria-hidden="true"><span className="flex items-center gap-2 text-xs uppercase tracking-widest font-semibold text-[#302D28]/60 group-hover:text-[#7F203D] transition-colors"><span>Conocer alcance</span><ArrowRight className="w-4 h-4" /></span></div>
            </div>
          ))}
        </div>
      </div>

      {selectedService && (
        <div id="service-detail-modal" role="dialog" aria-modal="true" aria-labelledby="service-modal-title" className="fixed inset-0 z-50 bg-[#181614]/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6">
          <div className="bg-[#FFF8F2] rounded-none max-w-2xl w-full p-8 sm:p-12 space-y-8 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button id="close-service-modal" type="button" onClick={() => setSelectedService(null)} aria-label="Cerrar detalle del servicio" className="absolute top-6 right-6 p-2 text-[#302D28]/60 hover:text-[#302D28] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#302D28] focus-visible:ring-offset-2"><X className="w-6 h-6" aria-hidden="true" /></button>
            <div className="space-y-6"><span className="text-[10px] sm:text-xs uppercase tracking-widest font-bold text-[#7F203D]">Ficha Técnica Especializada</span><h2 id="service-modal-title" className="font-serif text-3xl sm:text-4xl font-bold text-[#302D28] leading-tight">{selectedService.title}</h2></div>
            <div className="space-y-4 text-base sm:text-lg text-[#302D28]/80 leading-relaxed font-light"><p className="font-medium text-[#302D28]">{selectedService.shortDesc}</p><p>{selectedService.fullDesc}</p></div>
            <div className="pt-8 border-t border-[#302D28]/20 space-y-4"><span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[#7F203D] block">Alcance Procesal & Defensa</span><ul className="grid grid-cols-1 gap-3 text-sm text-[#302D28]">{selectedService.bulletPoints.map((pt, i) => <li key={i} className="flex items-start gap-3"><span className="w-1.5 h-1.5 rounded-full bg-[#7F203D] shrink-0 mt-1.5" aria-hidden="true" /><span className="font-light">{pt}</span></li>)}</ul></div>
            {selectedService.courtTypes && <div className="pt-4 flex items-center gap-2 text-xs text-[#302D28]/60 uppercase tracking-wider"><span className="font-bold">Tribunales Habituales:</span><span>{selectedService.courtTypes.join(' · ')}</span></div>}
            <div className="pt-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-6">
              <button type="button" onClick={() => setSelectedService(null)} className="text-[10px] sm:text-xs uppercase tracking-widest font-bold text-[#302D28]/60 hover:text-[#302D28] transition-colors focus-visible:ring-2 focus-visible:ring-[#302D28] focus-visible:ring-offset-2">Cerrar</button>
              <button type="button" onClick={() => { const areaTitle = selectedService.title; setSelectedService(null); onRequestConsultation(areaTitle); }} className="px-8 py-3.5 bg-[#302D28] hover:bg-[#181614] text-white text-xs uppercase tracking-widest font-bold transition-colors flex items-center justify-center gap-3 focus-visible:ring-2 focus-visible:ring-[#302D28] focus-visible:ring-offset-2"><span>Solicitar Consulta sobre esta Área</span><ArrowRight className="w-4 h-4" aria-hidden="true" /></button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
