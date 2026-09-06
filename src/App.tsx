import React, { useEffect, useState } from 'react';
import { BrowserRouter, useLocation, useNavigate, Navigate, Routes, Route } from 'react-router-dom';
import { ActiveTab, PATH_TO_TAB, TAB_TO_PATH } from './types';
import { Navbar } from './components/Navbar';
import { HomeSection } from './components/HomeSection';
import { ServicesSection } from './components/ServicesSection';
import { ExperienceSection } from './components/ExperienceSection';
import { MethodSection } from './components/MethodSection';
import { FAQSection } from './components/FAQSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { CONTACT_INFO } from './data/contactData';
import { useRouteMetadata } from './utils/useRouteMetadata';
import { trackEvent } from './lib/analytics';
import './data/legalContentLocalization';

function PageShell() {
  const location = useLocation();
  const navigate = useNavigate();
  const [contactPracticeArea, setContactPracticeArea] = useState<string | undefined>(undefined);

  useRouteMetadata();

  useEffect(() => {
    let contactFormStarted = false;

    const handleClick = (event: MouseEvent) => {
      const target = event.target as Element | null;
      const link = target?.closest('a');
      if (!link) return;

      const href = link.getAttribute('href') ?? '';
      if (href.startsWith('https://wa.me/')) trackEvent('whatsapp_click');
      if (href.startsWith('tel:')) trackEvent('phone_click');
      if (href.startsWith('mailto:')) trackEvent('email_click');
    };

    const handleFocusIn = (event: FocusEvent) => {
      if (location.pathname !== TAB_TO_PATH.contacto || contactFormStarted) return;
      const target = event.target as Element | null;
      if (target?.matches('input, textarea, select')) {
        contactFormStarted = true;
        trackEvent('contact_form_start');
      }
    };

    const handleSubmit = (event: Event) => {
      if (location.pathname !== TAB_TO_PATH.contacto) return;
      const form = event.target as HTMLFormElement | null;
      if (form?.tagName === 'FORM') trackEvent('contact_form_submit');
    };

    document.addEventListener('click', handleClick);
    document.addEventListener('focusin', handleFocusIn);
    document.addEventListener('submit', handleSubmit);

    return () => {
      document.removeEventListener('click', handleClick);
      document.removeEventListener('focusin', handleFocusIn);
      document.removeEventListener('submit', handleSubmit);
    };
  }, [location.pathname]);

  const activeTab: ActiveTab = PATH_TO_TAB[location.pathname] ?? 'home';

  const setActiveTab = (tab: ActiveTab) => {
    navigate(TAB_TO_PATH[tab]);
  };

  const handleRequestConsultation = (initialArea?: string) => {
    const hashArea = location.hash.match(/^#services-area-(.+)$/)?.[1];
    setContactPracticeArea(initialArea ?? hashArea);
    navigate(TAB_TO_PATH.contacto);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FFF8F2] text-[#302D28] font-sans selection:bg-[#7F203D] selection:text-white relative">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} onRequestConsultation={() => handleRequestConsultation()} />
      <main className="flex-grow w-full">
        <Routes>
          <Route path="/" element={<HomeSection setActiveTab={setActiveTab} onRequestConsultation={() => handleRequestConsultation()} />} />
          <Route path="/inicio" element={<Navigate to="/" replace />} />
          <Route path="/servicios-abogacia-mendoza" element={<ServicesSection setActiveTab={setActiveTab} onRequestConsultation={(area) => handleRequestConsultation(area)} />} />
          <Route path="/abogada-penalista-mendoza" element={<ExperienceSection setActiveTab={setActiveTab} onOpenConsultationModal={() => handleRequestConsultation()} />} />
          <Route path="/experiencia" element={<Navigate to="/abogada-penalista-mendoza" replace />} />
          <Route path="/nuestro-metodo" element={<MethodSection setActiveTab={setActiveTab} onOpenConsultationModal={() => handleRequestConsultation()} />} />
          <Route path="/preguntas-frecuentes" element={<FAQSection setActiveTab={setActiveTab} onOpenConsultationModal={() => handleRequestConsultation()} />} />
          <Route path="/contacto" element={<ContactSection setActiveTab={setActiveTab} initialPracticeArea={contactPracticeArea} />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer setActiveTab={setActiveTab} onOpenConsultationModal={() => handleRequestConsultation()} />

      <a
        href={CONTACT_INFO.whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Contactar por WhatsApp al ${CONTACT_INFO.phone}`}
        title={`WhatsApp ${CONTACT_INFO.phone}`}
        className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 bg-[#25D366] text-white rounded-full shadow-lg hover:bg-[#20bd5a] hover:scale-105 transition-all focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2"
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
