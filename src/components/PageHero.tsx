import React from 'react';
import { Breadcrumb } from './Breadcrumb';
import { ActiveTab } from '../types';

interface PageHeroProps {
  title: string;
  subtitle: string;
  backgroundImage: string;
  breadcrumbLabel: string;
  setActiveTab: (tab: ActiveTab) => void;
  titleAccent?: string;
  cta?: React.ReactNode;
}

export const PageHero: React.FC<PageHeroProps> = ({
  title,
  subtitle,
  backgroundImage,
  breadcrumbLabel,
  setActiveTab,
  titleAccent,
  cta,
}) => {
  const derivedAccentMatch = titleAccent
    ? null
    : title.match(/^(.*?)(?:\s+&\s+|\s+y\s+)([^&]+)$/i);

  const baseTitle = titleAccent
    ? title
    : derivedAccentMatch?.[1]?.trim() || title;

  const accent = titleAccent
    ? titleAccent
    : derivedAccentMatch?.[2]?.trim();

  return (
    <section
      aria-labelledby="page-hero-title"
      className="relative flex min-h-[480px] w-full items-center overflow-hidden bg-[#181614] pt-28 pb-16 sm:min-h-[500px] lg:min-h-[540px] lg:pt-32 lg:pb-20"
    >
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000"
        style={{ backgroundImage: `url("${backgroundImage}")` }}
        aria-hidden="true"
      />

      <div
        className="absolute inset-0 bg-gradient-to-br from-[#181614]/95 via-[#231F1C]/90 to-[#2A2522]/75"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col justify-center px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Breadcrumb
            items={[{ label: breadcrumbLabel, active: true }]}
            onNavigate={setActiveTab}
            variant="primary"
          />
        </div>

        <div className="max-w-4xl space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <h1
            id="page-hero-title"
            className="font-serif text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl"
          >
            {baseTitle}
            {accent && <span className="block text-[#D9A9B8]">{accent}</span>}
          </h1>

          <p className="max-w-3xl text-base font-light leading-relaxed text-white/85 sm:text-lg lg:text-xl">
            {subtitle}
          </p>

          {cta && <div className="pt-2">{cta}</div>}
        </div>
      </div>
    </section>
  );
};
