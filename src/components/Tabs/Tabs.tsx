import React, { useState, useEffect } from 'react';
import type { Tab } from '@/types/config';
import { TabPanel } from './TabPanel';
import { useConfig } from '@/hooks/useConfig';

interface TabsProps {
  tabs: Tab[];
}

export const Tabs: React.FC<TabsProps> = ({ tabs }) => {
  const { config, updateNested } = useConfig();
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  // Load last visited tab from config
  useEffect(() => {
    if (config.openLastVisitedTab && config.lastVisitedTab !== undefined && config.lastVisitedTab < tabs.length) {
      setActiveTabIndex(config.lastVisitedTab);
    }
  }, [config.openLastVisitedTab, config.lastVisitedTab, tabs.length]);

  // Save active tab to config
  const handleTabChange = (index: number) => {
    if (index >= 0 && index < tabs.length) {
      setActiveTabIndex(index);
      if (config.openLastVisitedTab) {
        updateNested('lastVisitedTab', index);
      }
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Skip if user is typing in input/textarea
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      const currentIndex = activeTabIndex;
      const tabCount = tabs.length;

      // Arrow keys
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        handleTabChange((currentIndex + 1) % tabCount);
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handleTabChange((currentIndex - 1 + tabCount) % tabCount);
      }

      // Vim keys (h/l)
      else if (e.key === 'l' && !e.ctrlKey && !e.altKey && !e.metaKey) {
        e.preventDefault();
        handleTabChange((currentIndex + 1) % tabCount);
      } else if (e.key === 'h' && !e.ctrlKey && !e.altKey && !e.metaKey) {
        e.preventDefault();
        handleTabChange((currentIndex - 1 + tabCount) % tabCount);
      }

      // Number keys (1-9)
      else if (e.key >= '1' && e.key <= '9') {
        const tabIndex = parseInt(e.key) - 1;
        if (tabIndex < tabCount) {
          e.preventDefault();
          handleTabChange(tabIndex);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeTabIndex, tabs.length]);

  // Mouse wheel navigation
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      // Only scroll tabs, not page content
      if (e.deltaY > 0) {
        e.preventDefault();
        handleTabChange((activeTabIndex + 1) % tabs.length);
      } else if (e.deltaY < 0) {
        e.preventDefault();
        handleTabChange((activeTabIndex - 1 + tabs.length) % tabs.length);
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [activeTabIndex, tabs.length]);

  const activeTab = tabs[activeTabIndex];

  return (
    <div className="relative w-full h-full bg-base">
      {/* Tab panels */}
      {tabs.map((tab, index) => (
        <TabPanel key={tab.id} tab={tab} isActive={index === activeTabIndex} />
      ))}

      {/* Tab indicators (bottom left) */}
      <div className="absolute bottom-4 left-4 z-20 flex items-center gap-1">
        {tabs.map((tab, index) => (
          <button
            key={tab.id}
            onClick={() => handleTabChange(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === activeTabIndex
                ? 'bg-green w-6'
                : 'bg-surface1 hover:bg-surface2'
            }`}
            title={`${tab.name} (${index + 1})`}
            aria-label={`Tab ${index + 1}: ${tab.name}`}
          />
        ))}
      </div>

      {/* Tab name display (top right) */}
      {activeTab && (
        <div className="absolute top-4 right-4 z-20">
          <span className="text-xs font-bold uppercase tracking-wider text-text opacity-75">
            {activeTab.name} ({activeTabIndex + 1}/{tabs.length})
          </span>
        </div>
      )}
    </div>
  );
};
