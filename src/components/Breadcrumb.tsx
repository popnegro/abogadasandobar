import React from 'react';
import { ChevronRight, Home } from 'lucide-react';
import { ActiveTab } from '../types';

export interface BreadcrumbItem {
  label: string;
  tab?: ActiveTab;
  active?: boolean;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  onNavigate: (tab: ActiveTab) => void;
  variant?: 'light' | 'dark' | 'primary';
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({
  items,
  onNavigate,
  variant = 'primary',
}) => {
  const isPrimary = variant === 'primary';

  const handleNavigate = (tab: ActiveTab) => {
    onNavigate(tab);

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <nav
      aria-label="Breadcrumb"
      className="flex items-center text-xs font-medium sm:text-sm"
    >
      <ol className="flex flex-wrap items-center gap-1.5 sm:gap-2">
        {/* Inicio */}
        <li className="inline-flex items-center">
          <button
            type="button"
            onClick={() => handleNavigate('home')}
            className={[
              'inline-flex items-center gap-1.5 rounded px-1 py-0.5',
              'cursor-pointer transition-colors',
              'focus:outline-none focus-visible:ring-2',
              'focus-visible:ring-[#7F203D] focus-visible:ring-offset-2',
              isPrimary
                ? 'text-white/70 hover:bg-white/10 hover:text-white'
                : 'text-[#302D28]/60 hover:bg-[#302D28]/5 hover:text-[#7F203D]',
            ].join(' ')}
            aria-label="Ir a Inicio"
          >
            <Home
              className="h-3.5 w-3.5 shrink-0"
              aria-hidden="true"
            />

            <span>Inicio</span>
          </button>
        </li>

        {/* Elementos dinámicos */}
        {items.map((item, index) => {
          const isLast = index === items.length - 1 || item.active;

          return (
            <li
              key={`${item.label}-${index}`}
              className="inline-flex items-center gap-1.5 sm:gap-2"
            >
              <ChevronRight
                className={[
                  'h-3.5 w-3.5 shrink-0',
                  isPrimary
                    ? 'text-white/40'
                    : 'text-[#302D28]/30',
                ].join(' ')}
                aria-hidden="true"
              />

              {isLast || !item.tab ? (
                <span
                  className={[
                    'font-semibold tracking-wide',
                    isPrimary
                      ? 'text-white'
                      : 'text-[#7F203D]',
                  ].join(' ')}
                  aria-current={isLast ? 'page' : undefined}
                >
                  {item.label}
                </span>
              ) : (
                <button
                  type="button"
                  onClick={() => handleNavigate(item.tab!)}
                  className={[
                    'cursor-pointer rounded px-1 py-0.5',
                    'transition-colors',
                    'focus:outline-none focus-visible:ring-2',
                    'focus-visible:ring-[#7F203D]',
                    'focus-visible:ring-offset-2',
                    isPrimary
                      ? 'text-white/70 hover:bg-white/10 hover:text-white'
                      : 'text-[#302D28]/60 hover:bg-[#302D28]/5 hover:text-[#7F203D]',
                  ].join(' ')}
                >
                  {item.label}
                </button>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};