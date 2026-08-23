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
        backgroundImage={ASSETS.heroFaq}
        breadcrumbLabel="Preguntas Frecuentes"
        setActiveTab={setActiveTab}
      />

      <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="space-y-16 lg:space-y-24">
          <section aria-label="Preguntas frecuentes" className="border-t border-[#302D28]/20">
            <div className="max-w-4xl space-y-4 py-8 sm:py-10">
              <p className="ds-eyebrow">
                Preguntas frecuentes
              </p>
              <h2 className="ds-section-title">
                Dudas habituales sobre defensa penal y asesoría corporativa
              </h2>
              <p className="ds-section-lead max-w-3xl">
                Respuestas pensadas para leer rápido, entender el encuadre jurídico y saber cuándo conviene dar el próximo paso.
              </p>
            </div>

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
                    className="ds-accordion-trigger"
                  >
                    <div className="flex items-start gap-6 md:gap-10">
                      <span className="shrink-0 pt-0.5 font-serif text-base font-medium text-[#7F203D] sm:pt-1 sm:text-lg" aria-hidden="true">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <span className="ds-card-title group-hover:text-[#7F203D] sm:text-xl lg:text-2xl">
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
                      className="ds-accordion-panel"
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
                <span className="ds-eyebrow">Consulta personalizada</span>
                <h2 id="faq-consultation-title" className="font-serif text-3xl font-bold leading-tight text-[#302D28] sm:text-4xl">
                  ¿Tiene una consulta procesal específica?
                </h2>
                <p className="ds-section-lead text-[#302D28]">
                  Cada procedimiento tiene singularidades únicas. Exponga su caso con absoluta reserva y reciba una evaluación enfocada en urgencia penal, defensa corporativa o estrategia de querella.
                </p>
              </div>

              <div className="shrink-0">
                <button
                  id="faq-open-consultation"
                  type="button"
                  onClick={onOpenConsultationModal}
                  className="ds-btn-primary group w-full sm:w-auto sm:text-sm"
                >
                  <span>Solicitar evaluación confidencial</span>
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
