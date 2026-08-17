import React from 'react';
import { Shield, Phone, Mail, MapPin, Scale, Clock, ExternalLink, Building, CheckCircle, FileText, AlertCircle } from 'lucide-react';
import { ActiveTab } from '../types';
import { LAWYER_INFO, SERVICES } from '../data/lawyerData';

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
              <Phone className="w-3.5 h-3.5" />
              <span>Guardia 24hs: {LAWYER_INFO.urgencyPhone}</span>
            </a>
            <button
              onClick={onOpenConsultationModal}
              className={`hidden lg:inline-flex items-center gap-2 bg-white text-[#7F203D] hover:bg-[#FAF6F0] px-3.5 py-1.5 rounded text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer ${focusRing}`}
            >
              <span>Pedir Turno</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-14 border-b border-[#FFF8F2]/10">
          <div className="lg:col-span-4 space-y-5">
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11  bg-[#7F203D] text-[#FFF8F2] flex items-center justify-center font-serif font-bold text-xl shadow-inner">ES</div>
              <div>
                <span className="font-serif font-bold text-xl text-white block tracking-tight" itemProp="name">Dra. Emilia Sandobar</span>
                <span className="text-xs text-[#DDD2C5]/80 font-sans tracking-wide block" itemProp="jobTitle">Abogada Penalista & Asesora Corporativa</span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[#F4EFE8]/75 font-light leading-relaxed" itemProp="description">
              Estudio jurídico especializado en Derecho Penal Económico, Litigación de Alta Complejidad y Programas de Integridad Corporativa en la Provincia de Mendoza y Fueros Federales de Cuyo.
            </p>

            <div className="space-y-2 pt-2 border-t border-[#FFF8F2]/10 text-xs text-[#DDD2C5]">
              <div className="flex items-center gap-2.5">
                <Scale className="w-4 h-4 text-[#7F203D] shrink-0" />
                <span className="font-semibold text-white/90">{LAWYER_INFO.collegianNumber}</span>
              </div>
              <div className="flex items-center gap-2.5 text-white/70 text-[11px]">
                <Shield className="w-4 h-4 text-emerald-400/80 shrink-0" />
                <span>Habilitación: Suprema Corte de Mendoza & Fuero Federal</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3 space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-[#DDD2C5] block pb-1 border-b border-[#FFF8F2]/10">Áreas & Servicios Mendoza</span>
            <ul className="space-y-2 text-xs sm:text-sm text-[#F4EFE8]/80">
              {SERVICES.map((s) => (
                <li key={s.id}>
                  <button
                    onClick={() => handleNav('servicios')}
                    className={`hover:text-white hover:translate-x-1 transition-all text-left flex items-start gap-1.5 group cursor-pointer ${focusRing}`}
                  >
                    <span className="text-[#7F203D] group-hover:text-white transition-colors">›</span>
                    <span className="line-clamp-1">{s.title}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3 space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-[#DDD2C5] block pb-1 border-b border-[#FFF8F2]/10">Jurisdicción & Cobertura</span>
            <div className="space-y-3 text-xs text-[#F4EFE8]/80">
              <div>
                <span className="font-bold text-white block text-[11px] uppercase tracking-wider text-[#DDD2C5]">1ª Circunscripción (Gran Mendoza)</span>
                <p className="text-[11px] text-[#F4EFE8]/70 font-light mt-0.5">Ciudad de Mendoza, Godoy Cruz, Guaymallén, Las Heras, Maipú, Luján de Cuyo, Lavalle. Polo Judicial Penal.</p>
              </div>
              <div>
                <span className="font-bold text-white block text-[11px] uppercase tracking-wider text-[#DDD2C5]">2ª & 3ª Circunscripción</span>
                <p className="text-[11px] text-[#F4EFE8]/70 font-light mt-0.5">San Rafael, Gral. Alvear, Malargüe, San Martín, Rivadavia, Junín, Santa Rosa y La Paz.</p>
              </div>
              <div>
                <span className="font-bold text-white block text-[11px] uppercase tracking-wider text-[#DDD2C5]">4ª Circunscripción (Valle de Uco)</span>
                <p className="text-[11px] text-[#F4EFE8]/70 font-light mt-0.5">Tunuyán, Tupungato, San Carlos.</p>
              </div>
              <div>
                <span className="font-bold text-white block text-[11px] uppercase tracking-wider text-[#DDD2C5]">Fuero Penal Federal</span>
                <p className="text-[11px] text-[#F4EFE8]/70 font-light mt-0.5">Juzgados Federales 1, 2 y 3 de Mendoza, TOF y Cámara Federal de Apelaciones.</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-[#DDD2C5] block pb-1 border-b border-[#FFF8F2]/10">Sede & Contacto</span>
            <div className="space-y-3 text-xs text-[#F4EFE8]/85" itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#7F203D] shrink-0 mt-0.5" />
                <div>
                  <span className="font-medium text-white block" itemProp="streetAddress">Av. España 948, 4º Piso</span>
                  <span className="text-[11px] text-white/70 block"><span itemProp="addressLocality">Ciudad de Mendoza</span>, <span itemProp="postalCode">M5500</span>, <span itemProp="addressRegion">Mendoza</span>, <span itemProp="addressCountry">Argentina</span></span>
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#7F203D] shrink-0" />
                <a href={`tel:${LAWYER_INFO.phone.replace(/\s+/g, '')}`} className={`hover:text-white transition-colors ${focusRing}`} itemProp="telephone">{LAWYER_INFO.phone}</a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#7F203D] shrink-0" />
                <a href={`mailto:${LAWYER_INFO.email}`} className={`hover:text-white transition-colors ${focusRing}`} itemProp="email">{LAWYER_INFO.email}</a>
              </div>
              <div className="flex items-start gap-2.5 pt-1 text-[11px] text-[#F4EFE8]/70">
                <Clock className="w-3.5 h-3.5 text-[#DDD2C5] shrink-0 mt-0.5" />
                <span>Lun a Vie: 08:30 - 19:30 hs</span>
              </div>
            </div>
            <div className="pt-2">
              <button
                id="footer-consultation-btn"
                onClick={onOpenConsultationModal}
                className={`w-full py-2.5 px-3 bg-[#7F203D] hover:bg-[#691931] text-white text-xs font-bold uppercase tracking-wider  shadow transition-colors cursor-pointer text-center ${focusRing}`}
              >
                Cita Confidencial
              </button>
            </div>
          </div>
        </div>

        <div className="py-8 border-b border-[#FFF8F2]/10 space-y-3">
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#DDD2C5]/70 block">Términos & Servicios Indexados en Mendoza:</span>
          <div className="flex flex-wrap gap-2 text-[11px] text-[#F4EFE8]/70">
            {[
              'Abogado Penalista Mendoza', 'Defensa Penal en Polo Judicial Mendoza', 'Delitos Económicos y Financieros Mendoza',
              'Guardia Penal 24hs Mendoza', 'Asistencia al Detenido Gran Mendoza', 'Compliance Penal Corporativo Mendoza',
              'Ciberdelitos & Fraude Digital Cuyo', 'Tribunales Penales Colegiados Mendoza', 'Cámara Federal de Apelaciones de Mendoza',
              'Suprema Corte de Justicia de Mendoza', 'Responsabilidad Penal Directivos Mendoza', 'Derecho Penal Tributario AFIP Mendoza',
              'Abogado Penalista San Rafael', 'Abogado Penalista Godoy Cruz', 'Abogado Penalista Guaymallén'
            ].map((tag, idx) => (
              <span key={idx} className="bg-[#262320] border border-white/5 px-2.5 py-1  text-[#DDD2C5]/80 hover:text-white hover:border-[#7F203D] transition-colors cursor-default">{tag}</span>
            ))}
          </div>
        </div>

        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-[#F4EFE8]/60">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 sm:gap-6 text-xs font-medium">
            {[
              ['inicio', 'Inicio'], ['servicios', 'Servicios'], ['sobre-mi', 'Sobre Mí'],
              ['experiencia', 'Experiencia'], ['faq', 'Preguntas Frecuentes'], ['contacto', 'Contacto']
            ].map(([tab, label]) => (
              <button key={tab} onClick={() => handleNav(tab as ActiveTab)} className={`hover:text-white transition-colors cursor-pointer ${focusRing}`}>
                {label}
              </button>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-6 text-[11px] text-center md:text-right">
            <span>© {new Date().getFullYear()} Dra. Emilia Sandobar. Todos los derechos reservados.</span>
            <div className="flex items-center gap-3 text-[#DDD2C5]/60">
              <span>Mat. Prov. 9.842 Mendoza</span><span>·</span><span>Secreto Profesional Ley 4976</span><span>·</span><span>Ley 25.326</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
