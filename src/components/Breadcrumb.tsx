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
  variant = 'primary'
}) => {
  const isPrimary = variant === 'primary';

  return (
    <nav 
      aria-label="Breadcrumb" 
      className="flex items-center text-xs sm:text-sm font-medium"
    >
      <ol className="flex items-center flex-wrap gap-1.5 sm:gap-2">
        {/* Home Item */}
        <li className="inline-flex items-center">
          <button
            onClick={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
              onNavigate('inicio');
            }}
            className={`inline-flex items-center gap-1.5 transition-colors cursor-pointer rounded px-1 py-0.5 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 ${
              isPrimary 
                ? 'text-white/70 hover:text-white hover:bg-white/10' 
                : 'text-[#302D28]/60 hover:text-[#7F203D] hover:bg-[#302D28]/5'
            }`}
            title="Ir a Inicio"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Inicio</span>
          </button>
        </li>

        {/* Dynamic Items */}
        {items.map((item, index) => {
          const isLast = index === items.length - 1 || item.active;

          return (
            <li key={index} className="inline-flex items-center gap-1.5 sm:gap-2">
              <ChevronRight 
                className={`w-3.5 h-3.5 shrink-0 ${
                  isPrimary ? 'text-white/40' : 'text-[#302D28]/30'
                }`} 
                aria-hidden="true" 
              />
              
              {isLast || !item.tab ? (
                <span 
                  className={`font-semibold tracking-wide ${
                    isPrimary ? 'text-white' : 'text-[#7F203D]'
                  }`}
                  aria-current={isLast ? 'page' : undefined}
                >
                  {item.label}
                </span>
              ) : (
                <button
                  onClick={() => {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                    if (item.tab) onNavigate(item.tab);
                  }}
                  className={`transition-colors cursor-pointer rounded px-1 py-0.5 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 ${
                    isPrimary 
                      ? 'text-white/70 hover:text-white hover:bg-white/10' 
                      : 'text-[#302D28]/60 hover:text-[#7F203D] hover:bg-[#302D28]/5'
                  }`}
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
