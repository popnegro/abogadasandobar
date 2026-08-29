import React from 'react';
import { Link } from 'react-router-dom';
import {
  Shield,
  Phone,
  Mail,
  MapPin,
  Scale,
  Clock,
} from 'lucide-react';
import { ActiveTab, TAB_TO_PATH } from '../types';
import { CONTACT_INFO } from '../data/contactData';

interface FooterProps {
  onOpenConsultationModal?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenConsultationModal,
}) => {
  const focusRing =
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7F203D] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1C1A18]';

  const handleInternalNavigation = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer
      id="main-footer"
      className="relative z-20 border-t border-[#302D28]/30 bg-[#1C1A18] text-[#FFF8F2]"
      itemScope
      itemType="https://schema.org/LegalService"
    >
      <div className="mx-auto max-w-7xl px-4 pt-16 pb-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 border-b border-[#FFF8F2]/10 pb-14 md:grid-cols-2 lg:grid-cols-12 lg:gap-12">
          <div className="space-y-5 lg:col-span-4">
            <span className="block pb-1 text-xs font-bold uppercase tracking-widest text-[#DDD2C5]">
              Jurisdicción &amp; Cobertura
            </span>
            <p className="text-sm font-light leading-relaxed text-[#F4EFE8]/75" itemProp="description">
              Estudio jurídico especializado en Derecho Penal Económico,
              Litigación de Alta Complejidad y Programas de Integridad
              Corporativa en la Provincia de Mendoza y Fueros Federales de Cuyo.
            </p>
            <div className="space-y-2.5 border-t border-[#FFF8F2]/10 pt-3 text-sm text-[#DDD2C5]">
              <div className="flex items-center gap-2.5">
                <Scale className="h-4 w-4 shrink-0 text-[#7F203D]" aria-hidden="true" />
                <span className="font-semibold text-white/90">{CONTACT_INFO.matriculaProvincial}</span>
              </div>
              <div className="flex items-start gap-2.5 text-sm text-white/70">
                <Shield className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400/80" aria-hidden="true" />
                <span>{CONTACT_INFO.matriculaFederal}</span>
              </div>
            </div>
            <Link to={TAB_TO_PATH.experiencia} onClick={handleInternalNavigation} className={`inline-flex pt-1 text-xs font-semibold uppercase tracking-wider text-[#D9A9B8] transition-colors hover:text-white ${focusRing}`}>
              Conocer experiencia →
            </Link>
          </div>

          <div className="space-y-4 lg:col-span-5">
            <span className="block pb-1 text-xs font-bold uppercase tracking-widest text-[#DDD2C5]">Cobertura territorial</span>
            <div className="space-y-4 text-sm text-[#F4EFE8]/85">
              <div className="space-y-1">
                <span className="block text-xs font-bold uppercase tracking-wider text-[#DDD2C5]">1ª Circunscripción (Gran Mendoza)</span>
                <p className="text-sm font-light leading-relaxed text-[#F4EFE8]/70">Ciudad de Mendoza, Godoy Cruz, Guaymallén, Las Heras, Maipú, Luján de Cuyo, Lavalle. Polo Judicial Penal.</p>
              </div>
              <div className="space-y-1">
                <span className="block text-xs font-bold uppercase tracking-wider text-[#DDD2C5]">2ª &amp; 3ª Circunscripción</span>
                <p className="text-sm font-light leading-relaxed text-[#F4EFE8]/70">San Rafael, Gral. Alvear, Malargüe, San Martín, Rivadavia, Junín, Santa Rosa y La Paz.</p>
              </div>
              <div className="space-y-1">
                <span className="block text-xs font-bold uppercase tracking-wider text-[#DDD2C5]">4ª Circunscripción (Valle de Uco)</span>
                <p className="text-sm font-light leading-relaxed text-[#F4EFE8]/70">Tunuyán, Tupungato, San Carlos.</p>
              </div>
              <div className="space-y-1">
                <span className="block text-xs font-bold uppercase tracking-wider text-[#DDD2C5]">Fuero Penal Federal</span>
                <p className="text-sm font-light leading-relaxed text-[#F4EFE8]/70">Juzgados Federales 1, 2 y 3 de Mendoza, TOF y Cámara Federal de Apelaciones.</p>
              </div>
            </div>
            <Link to={TAB_TO_PATH.servicios} onClick={handleInternalNavigation} className={`inline-flex pt-1 text-xs font-semibold uppercase tracking-wider text-[#D9A9B8] transition-colors hover:text-white ${focusRing}`}>
              Ver servicios →
            </Link>
          </div>

          <div className="space-y-4 lg:col-span-3">
            <span className="block pb-1 text-xs font-bold uppercase tracking-widest text-[#DDD2C5]">Sede &amp; Contacto</span>
            <div className="flex items-start gap-3" itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#7F203D]" aria-hidden="true" />
              <div>
                <span className="block text-sm font-medium text-white" itemProp="streetAddress">Peatonal Sarmiento 250, 2do piso oficina B</span>
                <span className="block text-sm leading-relaxed text-white/70">
                  <span itemProp="addressLocality">Mendoza</span>, <span itemProp="addressRegion">Mendoza</span>, <span itemProp="addressCountry">Argentina</span>
                </span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="h-4 w-4 shrink-0 text-[#7F203D]" aria-hidden="true" />
              <a href={`tel:${CONTACT_INFO.phone.replace(/\s+/g, '')}`} className={`text-sm text-[#F4EFE8]/85 transition-colors hover:text-white ${focusRing}`} itemProp="telephone">{CONTACT_INFO.phone}</a>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="h-4 w-4 shrink-0 text-[#7F203D]" aria-hidden="true" />
              <a href={`mailto:${CONTACT_INFO.email}`} className={`text-sm text-[#F4EFE8]/85 transition-colors hover:text-white ${focusRing}`} itemProp="email">{CONTACT_INFO.email}</a>
            </div>
            <div className="flex items-center gap-3 text-sm text-[#F4EFE8]/70">
              <Clock className="h-4 w-4 shrink-0 text-[#7F203D]" aria-hidden="true" />
              <span>Lunes a Viernes: 08:30 - 19:30 hs</span>
            </div>
            <Link to={TAB_TO_PATH.contacto} onClick={handleInternalNavigation} className={`inline-flex pt-1 text-xs font-semibold uppercase tracking-wider text-[#D9A9B8] transition-colors hover:text-white ${focusRing}`}>
              Ver información de contacto →
            </Link>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-6 pt-10 text-xs text-[#F4EFE8]/70 md:flex-row">
          <nav aria-label="Navegación del pie de página" className="order-2 md:order-1">
            <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-medium sm:gap-6 md:justify-start">
              {([
                ['servicios', 'Servicios'],
                ['experiencia', 'Experiencia'],
                ['metodo', 'Método'],
                ['faq', 'Preguntas frecuentes'],
                ['contacto', 'Contacto'],
              ] as [ActiveTab, string][]).map(([tab, label]) => (
                <Link key={tab} to={TAB_TO_PATH[tab]} onClick={handleInternalNavigation} className={`transition-colors hover:text-white ${focusRing}`}>
                  {label}
                </Link>
              ))}
            </div>
          </nav>
          <div className="order-1 text-center text-xs md:order-2 md:text-right">
            <span>© {new Date().getFullYear()} Emilia Sandobar. Todos los derechos reservados.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
