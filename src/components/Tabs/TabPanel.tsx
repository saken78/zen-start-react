import React from 'react';
import type { Tab } from '@/types/config';
import { CategoryLinks } from './CategoryLinks';

interface TabPanelProps {
  tab: Tab;
  isActive: boolean;
}

export const TabPanel: React.FC<TabPanelProps> = ({ tab, isActive }) => {
  return (
    <div
      className={`absolute inset-0 transition-opacity duration-300 ${
        isActive ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      {/* Background image */}
      {tab.background_url && (
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('${tab.background_url}')`,
          }}
        />
      )}

      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-black/30" />

      {/* Content */}
      <div className="relative z-10 h-full overflow-y-auto">
        <div className="flex items-start gap-4 h-full">
          {/* Tab label - vertical text on left */}
          {tab.name && (
            <div className="flex items-center justify-center pt-6 pl-4 min-w-fit">
              <span
                className="text-xl font-bold text-white/30 uppercase tracking-widest"
                style={{
                  writingMode: 'vertical-rl',
                  transform: 'rotate(180deg)',
                  letterSpacing: '0.3em',
                }}
              >
                {tab.name}
              </span>
            </div>
          )}

          {/* Links section */}
          <div className="flex-1">
            <CategoryLinks categories={tab.categories} links={tab.links} />
          </div>
        </div>
      </div>
    </div>
  );
};
