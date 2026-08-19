import React, { useState } from 'react';
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
  onOpenConsultationModal,
}) => {
  const [openIds, setOpenIds] = useState<string[]>([
    'faq-honorarios',
  ]);

  const toggleFAQ = (id: string) => {
    setOpenIds((currentOpenIds) =>
      currentOpenIds.includes(id)
        ? currentOpenIds.filter((item) => item !== id)
        : [...currentOpenIds, id],
    );
  };

  return (
    <div id="faq-section" className="w-full">
      <PageHero
        title="Claridad, Honorarios &"
        titleAccent="Certeza"
        subtitle="Respuestas directas y transparentes sobre el marco de actuación, previsión de honorarios, guardia procesal 24 horas y confidencialidad letrada."
        backgroundImage={ASSETS.deskDocs}
        breadcrumbLabel="Preguntas Frecuentes"
        setActiveTab={setActiveTab}
      />

      <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="space-y-16 lg:space-y-24">
          <section aria-label="Preguntas frecuentes" className="border-t border-[#302D28]/20">
            {FAQS.map((faq, index) => {
              const isOpen = openIds.includes(faq.id);

              return (
                <div key={faq.id} id={`faq-item-${faq.id}`} className="group border-b border-[#302D28]/20">
                  <button
                    id={`faq-btn-${faq.id}`}
                    type="button"
                    onClick={() => toggleFAQ(faq.id)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${faq.id}`}
                    className="flex w-full cursor-pointer items-start justify-between gap-6 px-4 py-8 text-left transition-colors hover:bg-[#F4EFE8]/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7F203D] focus-visible:ring-offset-2 md:gap-12 md:py-10"
                  >
                    <div className="flex items-start gap-6 md:gap-10">
                      <span className="shrink-0 pt-0.5 font-serif text-base font-medium text-[#7F203D] sm:pt-1 sm:text-lg" aria-hidden="true">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <span className="font-serif text-lg font-bold leading-snug text-[#302D28] transition-colors group-hover:text-[#7F203D] sm:text-xl lg:text-2xl">
                        {faq.question}
                      </span>
                    </div>
                    <span
                      className={`flex shrink-0 items-center justify-center pt-1 text-[#302D28] transition-transform duration-300 ${isOpen ? 'rotate-180 text-[#7F203D]' : ''}`}
                      aria-hidden="true"
                    >
                      <ChevronDown className="h-5 w-5 sm:h-6 sm:w-6" />
                    </span>
                  </button>

                  {isOpen && (
                    <div
                      id={`faq-answer-${faq.id}`}
                      role="region"
                      aria-labelledby={`faq-btn-${faq.id}`}
                      className="pb-8 pl-12 pr-6 text-base font-light leading-loose text-[#302D28]/80 sm:pl-16 sm:pr-16 sm:text-lg md:pb-10 md:pl-20 md:pr-24"
                    >
                      <p>{faq.answer}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </section>

          <section aria-labelledby="faq-consultation-title" className="pt-8">
            <div className="flex flex-col gap-6 border border-[#DDD2C5] bg-[#FFF8F2] p-6 sm:p-8 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
              <div className="max-w-3xl space-y-2">
                <span className="block text-xs font-bold uppercase tracking-widest text-[#7F203D]">Consulta personalizada</span>
                <h2 id="faq-consultation-title" className="font-serif text-2xl font-bold leading-tight text-[#302D28] sm:text-3xl">
                  ¿Tiene una consulta procesal específica?
                </h2>
                <p className="text-sm font-light leading-relaxed text-[#302D28] sm:text-base">
                  Cada procedimiento tiene singularidades únicas. Exponga su caso con absoluta reserva.
                </p>
              </div>

              <div className="shrink-0">
                <button
                  id="faq-open-consultation"
                  type="button"
                  onClick={onOpenConsultationModal}
                  className="group inline-flex w-full cursor-pointer items-center justify-center gap-3 border border-[#7F203D] bg-[#7F203D] px-6 py-3.5 text-xs font-bold uppercase tracking-widest text-white transition-colors hover:border-[#691931] hover:bg-[#691931] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7F203D] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FFF8F2] sm:w-auto sm:text-sm"
                >
                  <span>Solicitar consulta</span>
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </button>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};
