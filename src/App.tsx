import React, { useState, useEffect } from 'react';
import { ActiveTab } from './types';
import { Navbar } from './components/Navbar';
import { HomeSection } from './components/HomeSection';
import { ServicesSection } from './components/ServicesSection';
import { AboutSection } from './components/AboutSection';
import { FAQSection } from './components/FAQSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { Phone, ArrowUp } from 'lucide-react';
import { LAWYER_INFO } from './data/lawyerData';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('inicio');
  const [contactPracticeArea, setContactPracticeArea] = useState<string | undefined>(undefined);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleRequestConsultation = (initialArea?: string) => {
    setContactPracticeArea(initialArea);
    setActiveTab('contacto');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <div className="min-h-screen flex flex-col bg-[#FFF8F2] text-[#302D28] font-sans selection:bg-[#7F203D] selection:text-white">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} onRequestConsultation={() => handleRequestConsultation()} />
      <main className="flex-grow w-full">
        {activeTab === 'inicio' && <HomeSection setActiveTab={setActiveTab} onRequestConsultation={() => handleRequestConsultation()} />}
        {activeTab === 'servicios' && <ServicesSection setActiveTab={setActiveTab} onRequestConsultation={(area) => handleRequestConsultation(area)} />}
        {(activeTab === 'sobre-mi' || activeTab === 'experiencia') && <AboutSection setActiveTab={setActiveTab} onOpenConsultationModal={() => handleRequestConsultation()} />}
        {activeTab === 'faq' && <FAQSection setActiveTab={setActiveTab} onOpenConsultationModal={() => handleRequestConsultation()} />}
        {activeTab === 'contacto' && <ContactSection setActiveTab={setActiveTab} initialPracticeArea={contactPracticeArea} />}
      </main>
      <Footer setActiveTab={setActiveTab} onOpenConsultationModal={() => handleRequestConsultation()} />

      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3">
        {showScrollTop && <button id="scroll-to-top-btn" onClick={scrollToTop} className="w-11 h-11 rounded-full bg-[#FFF8F2] border border-[#DDD2C5] text-[#302D28] shadow-md flex items-center justify-center hover:bg-[#F4EFE8] transition-all focus-visible:ring-2 focus-visible:ring-[#7F203D] focus-visible:ring-offset-2" aria-label="Volver arriba"><ArrowUp className="w-5 h-5 text-[#7F203D]" /></button>}
        <a id="floating-urgency-phone" href={`tel:${LAWYER_INFO.urgencyPhone.replace(/\s+/g, '')}`} className="flex items-center gap-2 px-4 py-3 bg-[#7F203D] hover:bg-[#691931] text-white text-xs font-semibold rounded-full shadow-lg transition-transform hover:scale-105 focus-visible:ring-2 focus-visible:ring-[#7F203D] focus-visible:ring-offset-2" title="Guardia Penal 24 Horas">
          <Phone className="w-4 h-4 animate-pulse" /><span className="hidden sm:inline">Urgencias Penales 24h:</span><span>{LAWYER_INFO.urgencyPhone}</span>
        </a>
      </div>
    </div>
  );
}
