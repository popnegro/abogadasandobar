import React, { useState, useEffect } from 'react';
import { Menu, X, Shield } from 'lucide-react';
import { ActiveTab } from '../types';
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
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems: { id: ActiveTab; label: string }[] = [
    { id: 'servicios', label: 'Servicios' },
    { id: 'experiencia', label: 'Experiencia' },
    { id: 'faq', label: 'Preguntas frecuentes' },
  ];

  const handleNavClick = (tab: ActiveTab) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header id="main-navbar" className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-[#FFF8F2] shadow-sm border-b border-[#DDD2C5]/60 py-3 text-[#302D28]' : 'bg-transparent py-5 text-white'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <button id="brand-logo-btn" onClick={() => handleNavClick('inicio')} className="flex items-center gap-3.5 text-left group transition-transform focus:outline-none">
            <div className="w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center  overflow-hidden bg-transparent"><img src={ASSETS.logoMonogram} alt="ES Logo" className="w-full h-full object-contain" /></div>
            <div className="flex flex-col">
              <span className={`font-serif font-semibold text-lg sm:text-xl tracking-tight transition-colors ${isScrolled ? 'text-[#302D28] group-hover:text-[#7F203D]' : 'text-white'}`}>Emilia Sandobar</span>
              <span className={`text-[10px] sm:text-xs tracking-wider font-sans uppercase font-medium ${isScrolled ? 'text-[#302D28]/70' : 'text-white/80'}`}>Despacho Penal & Corporativo</span>
            </div>
          </button>

          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button key={item.id} id={`nav-link-${item.id}`} onClick={() => handleNavClick(item.id)} className={`text-sm font-medium transition-all focus:outline-none relative ${isActive ? (isScrolled ? 'text-[#7F203D] font-semibold' : 'text-white font-semibold') : (isScrolled ? 'text-[#302D28]/80 hover:text-[#302D28]' : 'text-white/80 hover:text-white')}`}>
                  {item.label}
                  {isActive && <span className={`absolute -bottom-1 left-0 right-0 h-[2px] ${isScrolled ? 'bg-[#7F203D]' : 'bg-white'}`} />}
                </button>
              );
            })}
          </nav>

          <div className="hidden md:flex items-center">
            <button id="cta-consultation-btn" onClick={onRequestConsultation} className={`flex items-center gap-2 px-5 py-2.5 text-sm font-medium  transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7F203D] focus-visible:ring-offset-2 ${isScrolled ? 'bg-[#7F203D] hover:bg-[#691931] text-white shadow-sm' : 'bg-white hover:bg-[#F4EFE8] text-[#302D28]'}`}>
              <span className="uppercase tracking-wide text-xs font-bold">Solicitar Consulta</span>
            </button>
          </div>

          <div className="flex items-center lg:hidden">
            <button id="mobile-menu-toggle" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className={`p-2  focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 transition-colors ${isScrolled ? 'text-[#302D28] hover:bg-[#F4EFE8]' : 'text-white hover:bg-white/10'}`} aria-label="Abrir menú de navegación">
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div id="mobile-nav-drawer" className="lg:hidden fixed inset-x-0 top-[72px] bg-[#FFF8F2] border-b border-[#DDD2C5] shadow-xl px-4 pt-4 pb-6 space-y-4 z-40">
          <div className="flex flex-col space-y-1">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button key={item.id} id={`mobile-nav-link-${item.id}`} onClick={() => handleNavClick(item.id)} className={`w-full text-left px-4 py-3 text-base font-medium transition-colors focus-visible:ring-2 focus-visible:ring-[#7F203D] focus-visible:ring-offset-2 ${isActive ? 'text-[#7F203D] font-semibold' : 'text-[#302D28] hover:bg-[#F4EFE8]'}`}>
                  {item.label}
                </button>
              );
            })}
          </div>
          <div className="pt-4 border-t border-[#DDD2C5]/60">
            <button id="mobile-cta-consult-btn" onClick={() => { setMobileMenuOpen(false); onRequestConsultation(); }} className="w-full py-4 bg-[#7F203D] text-white uppercase tracking-wider font-bold text-xs  shadow-sm flex items-center justify-center gap-2 focus-visible:ring-2 focus-visible:ring-[#7F203D] focus-visible:ring-offset-2">
              <Shield className="w-4 h-4" />
              <span>Solicitar Consulta</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
