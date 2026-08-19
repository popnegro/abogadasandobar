import React from 'react';
import { Breadcrumb } from './Breadcrumb';
import { ActiveTab } from '../types';

interface PageHeroProps {
  title: string;
  subtitle: string;
  backgroundImage: string;
  breadcrumbLabel: string;
  setActiveTab: (tab: ActiveTab) => void;
  cta?: React.ReactNode;
}

export const PageHero: React.FC<PageHeroProps> = ({
  title,
  subtitle,
  backgroundImage,
  breadcrumbLabel,
  setActiveTab,
  cta,
}) => {
  return (
    <section
      aria-labelledby="page-hero-title"
      className="
        relative flex min-h-[480px] w-full items-center
        overflow-hidden
        bg-[#181614]
        pt-28 pb-16
        sm:min-h-[500px]
        lg:min-h-[540px]
        lg:pt-32 lg:pb-20
      "
    >
      {/* ========================================================
          HERO IMAGE
      ======================================================== */}
      <div
        className="
          absolute inset-0
          bg-cover
          bg-center
          bg-no-repeat
          transition-transform
          duration-1000
        "
        style={{
          backgroundImage: `url("${backgroundImage}")`,
        }}
        aria-hidden="true"
      />

      {/* ========================================================
          HERO OVERLAY
      ======================================================== */}
      <div
        className="
          absolute inset-0
          bg-gradient-to-br
          from-[#181614]/95
          via-[#231F1C]/90
          to-[#2A2522]/75
        "
        aria-hidden="true"
      />

      {/* ========================================================
          HERO CONTENT
      ======================================================== */}
      <div
        className="
          relative z-10
          mx-auto flex w-full max-w-7xl
          flex-col justify-center
          px-4
          sm:px-6
          lg:px-8
        "
      >
        {/* ======================================================
            BREADCRUMB
        ======================================================= */}
        <div className="mb-8">
          <Breadcrumb
            items={[
              {
                label: breadcrumbLabel,
                active: true,
              },
            ]}
            onNavigate={setActiveTab}
            variant="primary"
          />
        </div>

        {/* ======================================================
            TITLE + SUBTITLE
        ======================================================= */}
        <div
          className="
            max-w-4xl
            space-y-6
            animate-in
            fade-in
            slide-in-from-bottom-4
            duration-700
          "
        >
          <h1
            id="page-hero-title"
            className="
              font-serif
              text-4xl
              font-bold
              leading-[1.05]
              tracking-tight
              text-white
              sm:text-5xl
              lg:text-6xl
            "
          >
            {title}
          </h1>

          <p
            className="
              max-w-3xl
              text-base
              font-light
              leading-relaxed
              text-white/85
              sm:text-lg
              lg:text-xl
            "
          >
            {subtitle}
          </p>

          {/* ====================================================
              OPTIONAL CTA
          ===================================================== */}
          {cta && (
            <div className="pt-2">
              {cta}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};