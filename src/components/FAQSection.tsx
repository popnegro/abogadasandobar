import React, { useState, useMemo } from 'react';
import { ChevronDown, ArrowRight } from 'lucide-react';
import { ActiveTab } from '../types';
import { FAQS, ASSETS } from '../data/lawyerData';
import { PageHero } from './PageHero';

interface FAQSectionProps {
  setActiveTab?: (tab: ActiveTab) => void;
  onOpenConsultationModal: () => void;
}

export const FAQSection: React.FC<FAQSectionProps> = ({
  setActiveTab = () => {},
  onOpenConsultationModal
}) => {
  const [openIds, setOpenIds] = useState<string[]>(['faq-honorarios']);

  const filteredFaqs = useMemo(() => FAQS, []);

  const toggleFAQ = (id: string) => {
    if (openIds.includes(id)) {
      setOpenIds(openIds.filter(item => item !== id));
    } else {
      setOpenIds([...openIds, id]);
    }
  };

  return (
    <div id="faq-section" className="w-full">
      <PageHero
        title="Claridad, Honorarios & Certeza"
        subtitle="Respuestas directas y transparentes sobre el marco de actuación, previsión de honorarios, guardia procesal 24 horas y confidencialidad letrada."
        eyebrow="Resolución de Dudas & Transparencia"
        breadcrumbLabel="Preguntas Frecuentes"
        backgroundImage={ASSETS.library}
        setActiveTab={setActiveTab}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 space-y-16 lg:space-y-24">
        <div className="border-t border-[#302D28]/20">
          {filteredFaqs.map((faq, index) => {
            const isOpen = openIds.includes(faq.id);
            return (
              <div
                key={faq.id}
                id={`faq-item-${faq.id}`}
                className="border-b border-[#302D28]/20 group"
              >
                <button
                  id={`faq-btn-${faq.id}`}
                  onClick={() => toggleFAQ(faq.id)}
                  className="w-full py-8 md:py-10 text-left flex items-start justify-between gap-6 md:gap-12 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7F203D] focus-visible:ring-offset-2 hover:bg-[#F4EFE8]/60 transition-colors px-4 -mx-4 cursor-pointer"
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${faq.id}`}
                >
                  <div className="flex items-start gap-6 md:gap-10">
                    <span className="font-serif text-base sm:text-lg text-[#7F203D] font-medium shrink-0 pt-0.5 sm:pt-1">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="font-serif text-xl sm:text-2xl lg:text-3xl font-bold text-[#302D28] group-hover:text-[#7F203D] transition-colors leading-snug">
                      {faq.question}
                    </span>
                  </div>
                  <div className={`flex items-center justify-center shrink-0 text-[#302D28] transition-transform duration-300 pt-1 ${isOpen ? 'rotate-180 text-[#7F203D]' : ''}`}>
                    <ChevronDown className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                </button>

                {isOpen && (
                  <div
                    id={`faq-answer-${faq.id}`}
                    role="region"
                    aria-labelledby={`faq-btn-${faq.id}`}
                    className="pl-12 sm:pl-16 md:pl-20 pb-8 md:pb-10 pr-6 sm:pr-16 md:pr-24 text-base sm:text-lg text-[#302D28]/80 leading-loose font-light"
                  >
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="pt-8 border-t border-[#302D28]/10 flex flex-col sm:flex-row items-baseline justify-between gap-6">
          <div className="space-y-2">
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#302D28]">
              ¿Tiene una consulta procesal específica?
            </h3>
            <p className="text-sm sm:text-base text-[#302D28]/70 font-light">
              Cada procedimiento tiene singularidades únicas. Exponga su caso con absoluta reserva.
            </p>
          </div>

          <button
            id="faq-open-consultation"
            onClick={onOpenConsultationModal}
            className="group flex items-center gap-3 text-xs sm:text-sm font-bold uppercase tracking-widest text-[#7F203D] hover:text-[#691931] transition-colors shrink-0 cursor-pointer focus-visible:ring-2 focus-visible:ring-[#7F203D] focus-visible:ring-offset-2"
          >
            <span>Solicitar consulta</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};
