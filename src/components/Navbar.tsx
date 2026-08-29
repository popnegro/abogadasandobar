import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Shield, X } from 'lucide-react';

import { ActiveTab, TAB_TO_PATH } from '../types';
import { ASSETS } from '../data/lawyerData';

interface NavbarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  onRequestConsultation: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab, onRequestConsultation }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems: Array<{ id: ActiveTab; label: string }> = [
    { id: 'home', label: 'Inicio' },
    { id: 'servicios', label: 'Servicios' },
    { id: 'experiencia', label: 'Experiencia' },
    { id: 'metodo', label: 'Nuestro método' },
    { id: 'faq', label: 'Preguntas frecuentes' },
  ];

  const handleNavClick = (tab: ActiveTab) => {
    setMobileMenuOpen(false);
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogoClick = () => {
    setMobileMenuOpen(false);
    setActiveTab('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleConsultationClick = () => {
    setMobileMenuOpen(false);
    onRequestConsultation();
  };

  const headerIsLight = isScrolled || mobileMenuOpen;

  return (
    <header id="main-navbar" className={['fixed inset-x-0 top-0 z-50', 'transition-all duration-300', headerIsLight ? 'border-b border-[#DDD2C5]/60 bg-[#FFF8F2] py-3 text-[#302D28] shadow-sm' : 'bg-transparent py-5 text-white'].join(' ')}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <Link id="brand-logo-btn" to={TAB_TO_PATH.home} onClick={handleLogoClick} className={['group flex items-center text-left transition-transform', 'focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7F203D] focus-visible:ring-offset-2', headerIsLight ? 'focus-visible:ring-offset-[#FFF8F2]' : 'focus-visible:ring-offset-[#181614]'].join(' ')} aria-label="Emilia Sandobar — Ir a Inicio">
            <span role="img" aria-label="Logo Emilia Sandobar" className="brand-logo inline-block h-8 aspect-[3/1] sm:h-10" style={{ backgroundColor: headerIsLight ? '#7F203D' : '#FFFFFF', WebkitMaskImage: `url(${ASSETS.logoBrandmark})`, maskImage: `url(${ASSETS.logoBrandmark})`, WebkitMaskRepeat: 'no-repeat', maskRepeat: 'no-repeat', WebkitMaskPosition: 'left center', maskPosition: 'left center', WebkitMaskSize: 'contain', maskSize: 'contain' }} />
          </Link>

          <nav aria-label="Navegación principal" className="hidden items-center gap-8 lg:flex">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              const textColor = headerIsLight ? isActive ? 'text-[#7F203D]' : 'text-[#302D28]/70 hover:text-[#7F203D]' : isActive ? 'text-white' : 'text-white/70 hover:text-white';
              const indicatorColor = headerIsLight ? 'bg-[#7F203D]' : 'bg-white';
              return <button key={item.id} id={`nav-link-${item.id}`} type="button" onClick={() => handleNavClick(item.id)} aria-current={isActive ? 'page' : undefined} className={['relative cursor-pointer pb-1 text-sm tracking-wide transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7F203D] focus-visible:ring-offset-2', headerIsLight ? 'focus-visible:ring-offset-[#FFF8F2]' : 'focus-visible:ring-offset-[#181614]', textColor, isActive ? 'font-semibold' : 'font-medium'].join(' ')}>
                {item.label}{isActive && <span className={['absolute -bottom-1 left-0 right-0 h-0.5', indicatorColor].join(' ')} aria-hidden="true" />}
              </button>;
            })}
          </nav>

          <div className="hidden items-center md:flex"><button id="cta-consultation-btn" type="button" onClick={handleConsultationClick} className={['flex cursor-pointer items-center gap-2 px-5 py-2.5 text-xs font-bold uppercase tracking-widest transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7F203D] focus-visible:ring-offset-2', headerIsLight ? 'bg-[#7F203D] text-white shadow-sm hover:bg-[#691931] focus-visible:ring-offset-[#FFF8F2]' : 'bg-white text-[#302D28] hover:bg-[#F4EFE8] focus-visible:ring-offset-[#181614]'].join(' ')}><span>Solicitar consulta</span></button></div>

          <div className="flex items-center lg:hidden"><button id="mobile-menu-toggle" type="button" onClick={() => setMobileMenuOpen((prev) => !prev)} aria-expanded={mobileMenuOpen} aria-controls="mobile-nav-drawer" aria-label={mobileMenuOpen ? 'Cerrar menú de navegación' : 'Abrir menú de navegación'} className={['cursor-pointer p-2 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7F203D] focus-visible:ring-offset-2', headerIsLight ? 'text-[#302D28] hover:bg-[#F4EFE8] focus-visible:ring-offset-[#FFF8F2]' : 'text-white hover:bg-white/10 focus-visible:ring-offset-[#181614]'].join(' ')}>{mobileMenuOpen ? <X className="h-6 w-6" aria-hidden="true" /> : <Menu className="h-6 w-6" aria-hidden="true" />}</button></div>
        </div>

        {mobileMenuOpen && <div id="mobile-nav-drawer" className="absolute inset-x-0 top-full border-b border-[#DDD2C5] bg-[#FFF8F2] px-4 pb-6 pt-4 shadow-xl lg:hidden">
          <nav aria-label="Navegación móvil" className="flex flex-col space-y-1">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return <button key={item.id} id={`mobile-nav-link-${item.id}`} type="button" onClick={() => handleNavClick(item.id)} aria-current={isActive ? 'page' : undefined} className={['w-full cursor-pointer px-4 py-3.5 text-left text-sm tracking-wide transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7F203D] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FFF8F2]', isActive ? 'bg-[#7F203D]/5 font-bold text-[#7F203D]' : 'font-medium text-[#302D28] hover:bg-[#F4EFE8]'].join(' ')}>{item.label}</button>;
            })}
          </nav>
          <div className="mt-4 border-t border-[#DDD2C5]/60 pt-4"><button id="mobile-cta-consult-btn" type="button" onClick={handleConsultationClick} className="flex w-full cursor-pointer items-center justify-center gap-2 bg-[#7F203D] px-8 py-3.5 text-xs font-bold uppercase tracking-widest text-white shadow-sm transition-colors hover:bg-[#691931] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7F203D] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FFF8F2]"><Shield className="h-4 w-4" aria-hidden="true" /><span>Solicitar consulta</span></button></div>
        </div>}
      </div>
    </header>
  );
};
