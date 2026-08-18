import React from 'react';
import { Shield, Phone, Mail, MapPin, Scale, Clock } from 'lucide-react';
import { ActiveTab } from '../types';
import { LAWYER_INFO, ASSETS } from '../data/lawyerData';

interface FooterProps {
  setActiveTab: (tab: ActiveTab) => void;
  onOpenConsultationModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab, onOpenConsultationModal }) => {
  const handleNav = (tab: ActiveTab) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const focusRing = 'focus-visible:ring-2 focus-visible:ring-[#7F203D] focus-visible:ring-offset-2';

  return (
    <footer
      id="main-footer"
      className="bg-[#1C1A18] text-[#FFF8F2] border-t border-[#302D28]/30 relative z-20"
      itemScope
      itemType="https://schema.org/LegalService"
    >
      <div className="bg-[#7F203D] text-white py-4 px-4 sm:px-6 lg:px-8 border-b border-white/10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs sm:text-sm">
          <div className="flex items-center gap-3 text-center md:text-left">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
            <p className="font-medium text-white/95">
              <strong className="font-bold">Guardia Penal Activa en Mendoza:</strong> Asistencia urgente 24hs por detenciones o allanamientos en el Polo Judicial Penal y Gran Mendoza.
            </p>
          </div>
          <div className="flex items-center gap-4 shrink-0">
            <a
              href={`tel:${LAWYER_INFO.urgencyPhone.replace(/\s+/g, '')}`}
              className={`inline-flex items-center gap-2 bg-white/15 hover:bg-white/25 text-white px-3.5 py-1.5 rounded text-xs font-bold uppercase tracking-wider transition-colors ${focusRing}`}
            >
              <Phone className="w-3.5 h-3.5" aria-hidden="true" />
           <span>Llamar a Guardia 24hs · {LAWYER_INFO.urgencyPhone}</span>
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-14 border-b border-[#FFF8F2]/10">
          <div className="lg:col-span-4 space-y-5">
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 flex items-center justify-center overflow-hidden bg-transparent">
                <img src={ASSETS.logoMonogram} alt="Logo de Emilia Sandobar" className="w-full h-full object-contain" />
              </div>
              <div>
                <span className="font-serif font-bold text-xl text-white block tracking-tight" itemProp="name">Dra. Emilia Sandobar</span>
                <span className="text-xs text-[#DDD2C5]/80 font-sans tracking-wide block" itemProp="jobTitle">Abogada Penalista & Asesora Corporativa</span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[#F4EFE8]/75 font-light leading-loose" itemProp="description">
              Estudio jurídico especializado en Derecho Penal Económico, Litigación de Alta Complejidad y Programas de Integridad Corporativa en la Provincia de Mendoza y Fueros Federales de Cuyo.
            </p>

            <div className="space-y-2 pt-2 border-t border-[#FFF8F2]/10 text-xs text-[#DDD2C5]">
              <div className="flex items-center gap-2.5">
                <Scale className="w-4 h-4 text-[#7F203D] shrink-0" aria-hidden="true" />
                <span className="font-semibold text-white/90">{LAWYER_INFO.collegianNumber}</span>
              </div>
              <div className="flex items-center gap-2.5 text-white/70 text-xs">
                <Shield className="w-4 h-4 text-emerald-400/80 shrink-0" aria-hidden="true" />
                <span>Habilitación: Suprema Corte de Mendoza & Fuero Federal</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3 space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-[#DDD2C5] block pb-1 border-b border-[#FFF8F2]/10">Jurisdicción & Cobertura</span>
            <div className="space-y-3 text-xs text-[#F4EFE8]/85">
              <div className="space-y-0.5">
                <span className="font-bold text-xs uppercase tracking-wider text-[#DDD2C5]">1ª Circunscripción (Gran Mendoza)</span>
                <p className="text-xs text-[#F4EFE8]/70 font-light mt-0.5">Ciudad de Mendoza, Godoy Cruz, Guaymallén, Las Heras, Maipú, Luján de Cuyo, Lavalle. Polo Judicial Penal.</p>
              </div>
              <div className="space-y-0.5">
                <span className="font-bold text-xs uppercase tracking-wider text-[#DDD2C5]">2ª & 3ª Circunscripción</span>
                <p className="text-xs text-[#F4EFE8]/70 font-light mt-0.5">San Rafael, Gral. Alvear, Malargüe, San Martín, Rivadavia, Junín, Santa Rosa y La Paz.</p>
              </div>
              <div className="space-y-0.5">
                <span className="font-bold text-xs uppercase tracking-wider text-[#DDD2C5]">4ª Circunscripción (Valle de Uco)</span>
                <p className="text-xs text-[#F4EFE8]/70 font-light mt-0.5">Tunuyán, Tupungato, San Carlos.</p>
              </div>
              <div className="space-y-0.5">
                <span className="font-bold text-xs uppercase tracking-wider text-[#DDD2C5]">Fuero Penal Federal</span>
                <p className="text-xs text-[#F4EFE8]/70 font-light mt-0.5">Juzgados Federales 1, 2 y 3 de Mendoza, TOF y Cámara Federal de Apelaciones.</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-[#DDD2C5] block pb-1 border-b border-[#FFF8F2]/10">Sede & Contacto</span>
            <div className="space-y-3 text-sm text-[#F4EFE8]/85" itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#7F203D] shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <span className="font-medium text-white block" itemProp="streetAddress">Av. España 948, 4º Piso</span>
                  <span className="text-xs text-white/70 block"><span itemProp="addressLocality">Ciudad de Mendoza</span>, <span itemProp="postalCode">M5500</span>, <span itemProp="addressRegion">Mendoza</span>, <span itemProp="addressCountry">Argentina</span></span>
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#7F203D] shrink-0" aria-hidden="true" />
                <a href={`tel:${LAWYER_INFO.phone.replace(/\s+/g, '')}`} className={`hover:text-white transition-colors ${focusRing} text-xs`} itemProp="telephone">Llamar al Estudio · {LAWYER_INFO.phone}</a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#7F203D] shrink-0" aria-hidden="true" />
                <a href={`mailto:${LAWYER_INFO.email}`} className={`hover:text-white transition-colors ${focusRing} text-xs`} itemProp="email">Enviar email · {LAWYER_INFO.email}</a>
              </div>
              <div className="flex items-start gap-2.5 pt-1 text-xs text-[#F4EFE8]/70">
                <Clock className="w-3.5 h-3.5 text-[#DDD2C5] shrink-0 mt-0.5" aria-hidden="true" />
                <span>Lun a Vie: 08:30 - 19:30 hs</span>
              </div>
            </div>
            <div className="pt-3">
              <button
                id="footer-consultation-btn"
                onClick={onOpenConsultationModal}
                className={`w-full py-3 px-3 bg-[#7F203D] hover:bg-[#691931] text-white text-xs font-bold uppercase tracking-wider  shadow transition-colors cursor-pointer text-center ${focusRing}`}
              >
                Solicitar consulta
              </button>
            </div>
          </div>
        </div>

        <div className="pt-10 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-[#F4EFE8]/70">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 sm:gap-6 text-xs font-medium order-2 md:order-1">
            {[
              ['inicio', 'Inicio'], ['servicios', 'Servicios'], ['sobre-mi', 'Sobre Mí'],
              ['experiencia', 'Experiencia'], ['faq', 'Preguntas Frecuentes'], ['contacto', 'Contacto']
            ].map(([tab, label]) => (
              <a key={tab} href="#" onClick={(e) => { e.preventDefault(); handleNav(tab as ActiveTab); }} className={`hover:text-white transition-colors cursor-pointer ${focusRing}`}>
                {label}
              </a>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-6 text-xs text-center md:text-right order-1 md:order-2">
            <span>© {new Date().getFullYear()} Dra. Emilia Sandobar. Todos los derechos reservados.</span>
            <div className="flex items-center gap-3 text-[#DDD2C5]/70 flex-wrap justify-center">
              <span>Mat. Prov. 9.842 Mendoza</span>
              <span className="hidden sm:inline">·</span>
              <a href="https://www.colabogmza.com.ar/assets/uploads/ley_4976_5059.pdf" target="_blank" rel="noopener noreferrer" className={`hover:text-white transition-colors ${focusRing}`}>
                Secreto Profesional Ley 4976
              </a>
              <span className="hidden sm:inline">·</span>
              <a href="http://servicios.infoleg.gob.ar/infolegInternet/anexos/60000-64999/64790/texact.htm" target="_blank" rel="noopener noreferrer" className={`hover:text-white transition-colors ${focusRing}`}>
                Ley 25.326
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
