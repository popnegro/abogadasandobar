import React, { useState } from 'react';
import { BrowserRouter, useLocation, useNavigate, Navigate, Routes, Route } from 'react-router-dom';
import { ActiveTab, PATH_TO_TAB, TAB_TO_PATH } from './types';
import { Navbar } from './components/Navbar';
import { HomeSection } from './components/HomeSection';
import { ServicesSection } from './components/ServicesSection';
import { AboutSection } from './components/AboutSection';
import { FAQSection } from './components/FAQSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { SeoManager } from './components/SeoManager';
import { LAWYER_INFO } from './data/lawyerData';

function PageShell() {
  const location = useLocation();
  const navigate = useNavigate();
  const [contactPracticeArea, setContactPracticeArea] = useState<string | undefined>(undefined);

  const activeTab: ActiveTab = PATH_TO_TAB[location.pathname] ?? 'home';

  const setActiveTab = (tab: ActiveTab) => {
    navigate(TAB_TO_PATH[tab]);
  };

  const handleRequestConsultation = (initialArea?: string) => {
    setContactPracticeArea(initialArea);
    navigate(TAB_TO_PATH.contacto);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="relative flex min-h-screen flex-col bg-[#FFF8F2] font-sans text-[#302D28] selection:bg-[#7F203D] selection:text-white">
      <SeoManager />
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} onRequestConsultation={() => handleRequestConsultation()} />
      <main className="w-full flex-grow pb-24 lg:pb-0">
        <Routes>
          <Route path="/" element={<Navigate to="/inicio" replace />} />
          <Route path="/inicio" element={<HomeSection setActiveTab={setActiveTab} onRequestConsultation={() => handleRequestConsultation()} />} />
          <Route path="/servicios-abogacia-mendoza" element={<ServicesSection setActiveTab={setActiveTab} onRequestConsultation={(area) => handleRequestConsultation(area)} />} />
          <Route path="/experiencia" element={<AboutSection setActiveTab={setActiveTab} onOpenConsultationModal={() => handleRequestConsultation()} />} />
          <Route path="/nuestro-metodo" element={<AboutSection setActiveTab={setActiveTab} onOpenConsultationModal={() => handleRequestConsultation()} />} />
          <Route path="/preguntas-frecuentes" element={<FAQSection setActiveTab={setActiveTab} onOpenConsultationModal={() => handleRequestConsultation()} />} />
          <Route path="/contacto" element={<ContactSection setActiveTab={setActiveTab} initialPracticeArea={contactPracticeArea} />} />
          <Route path="*" element={<Navigate to="/inicio" replace />} />
        </Routes>
      </main>
      <Footer setActiveTab={setActiveTab} onOpenConsultationModal={() => handleRequestConsultation()} />

      <div
        className="fixed inset-x-0 bottom-0 z-40 border-t border-[#DDD2C5]/80 bg-[#FFF8F2]/95 px-4 py-3 backdrop-blur-md lg:hidden"
        style={{ paddingBottom: 'calc(0.75rem + env(safe-area-inset-bottom))' }}
        aria-label="Acciones rápidas móviles"
      >
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-3">
          <a
            href={LAWYER_INFO.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Abrir WhatsApp de ${LAWYER_INFO.phone}`}
            className="inline-flex items-center justify-center gap-2 border border-[#25D366] bg-[#25D366] px-4 py-3 text-xs font-bold uppercase tracking-widest text-white shadow-sm transition-colors hover:bg-[#20bd5a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FFF8F2]"
          >
            WhatsApp
          </a>

          <button
            type="button"
            onClick={() => handleRequestConsultation()}
            className="inline-flex items-center justify-center gap-2 bg-[#7F203D] px-4 py-3 text-xs font-bold uppercase tracking-widest text-white shadow-sm transition-colors hover:bg-[#691931] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7F203D] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FFF8F2]"
          >
            Guardia 24 hs.
          </button>
        </div>
      </div>

      <a
        href={LAWYER_INFO.whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Contactar por WhatsApp al ${LAWYER_INFO.phone}`}
        title={`WhatsApp ${LAWYER_INFO.phone}`}
        className="fixed bottom-6 right-6 z-50 hidden h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-all hover:scale-105 hover:bg-[#20bd5a] focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2 lg:flex"
      >
        <img src="/assets/icons/whatsapp.svg" alt="" className="w-8 h-8" aria-hidden="true" />
      </a>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <PageShell />
    </BrowserRouter>
  );
}
