import React from 'react';
import { Breadcrumb } from './Breadcrumb';
import { ActiveTab } from '../types';

interface PageHeroProps {
  title: string;
  subtitle: string;
  eyebrow: string;
  backgroundImage: string;
  breadcrumbLabel: string;
  setActiveTab: (tab: ActiveTab) => void;
  cta?: React.ReactNode;
}

export const PageHero: React.FC<PageHeroProps> = ({ title, subtitle, eyebrow, backgroundImage, breadcrumbLabel, setActiveTab, cta }) => {
  return (
    <section className="relative min-h-[60vh] lg:min-h-[70vh] w-full flex flex-col justify-center pt-32 pb-20 overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 scale-100"
        style={{ backgroundImage: `url(${backgroundImage})` }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-gradient-to-br from-[#181614]/80 via-[#231F1C]/70 to-[#2A2522]/60"
        aria-hidden="true"
      />
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center h-full">
        <div className="mb-8">
          <Breadcrumb items={[{ label: breadcrumbLabel, active: true }]} onNavigate={setActiveTab} variant="primary" />
        </div>
        <div className="space-y-6 max-w-3xl animate-in fade-in slide-in-from-bottom-4 duration-700">
          <span className="text-xs sm:text-sm font-bold tracking-widest uppercase text-white/70 block">{eyebrow}</span>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.15]">{title}</h1>
          <p className="text-base sm:text-lg lg:text-xl text-white/80 font-light max-w-2xl leading-relaxed">{subtitle}</p>
          {cta && <div className="pt-4">{cta}</div>}
        </div>
      </div>
    </section>
  );
};
