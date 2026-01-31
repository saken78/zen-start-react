import type React from "react";
import { useEffect, useState } from "react";
import { useConfig } from "@/hooks/useConfig";
import type { Tab } from "@/types/config";
import { TabPanel } from "./TabPanel";

interface TabsProps {
  tabs: Tab[];
}

export const Tabs: React.FC<TabsProps> = ({ tabs }) => {
  const { config, updateNested } = useConfig();
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  // Load last visited tab from config
  useEffect(() => {
    if (
      config.openLastVisitedTab &&
      config.lastVisitedTab !== undefined &&
      config.lastVisitedTab < tabs.length
    ) {
      setActiveTabIndex(config.lastVisitedTab);
    }
  }, [config.openLastVisitedTab, config.lastVisitedTab, tabs.length]);

  // Save active tab to config
  const handleTabChange = (index: number) => {
    if (index >= 0 && index < tabs.length) {
      setActiveTabIndex(index);
      if (config.openLastVisitedTab) {
        updateNested("lastVisitedTab", index);
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
      if (e.key === "ArrowRight") {
        e.preventDefault();
        handleTabChange((currentIndex + 1) % tabCount);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        handleTabChange((currentIndex - 1 + tabCount) % tabCount);
      }

      // Vim keys (h/l)
      else if (e.key === "l" && !e.ctrlKey && !e.altKey && !e.metaKey) {
        e.preventDefault();
        handleTabChange((currentIndex + 1) % tabCount);
      } else if (e.key === "h" && !e.ctrlKey && !e.altKey && !e.metaKey) {
        e.preventDefault();
        handleTabChange((currentIndex - 1 + tabCount) % tabCount);
      }

      // Number keys (1-9)
      else if (e.key >= "1" && e.key <= "9") {
        const tabIndex = parseInt(e.key) - 1;
        if (tabIndex < tabCount) {
          e.preventDefault();
          handleTabChange(tabIndex);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeTabIndex, tabs.length]);

  // Mouse wheel navigation - DISABLED
  // Users can navigate using tab indicators (bottom left) or keyboard (arrows/h/l keys/numbers)

  const activeTab = tabs[activeTabIndex];

  return (
    <div className='relative w-full h-full bg-base'>
      {/* Tab panels */}
      {tabs.map((tab, index) => (
        <TabPanel key={tab.id} tab={tab} isActive={index === activeTabIndex} />
      ))}

      {/* Tab indicators (bottom left) */}
      <div className='absolute bottom-4 left-4 z-50 flex items-center gap-1 pointer-events-auto'>
        {tabs.map((tab, index) => (
          <button
            key={tab.id}
            onClick={() => handleTabChange(index)}
            className={`w-6 h-6 rounded-full transition-all duration-300 flex items-center justify-center text-xs font-bold ${
              index === activeTabIndex ? "bg-green text-base" : "bg-surface1 text-text hover:bg-surface2"
            }`}
            title={`${tab.name} (${index + 1})`}
            aria-label={`Tab ${index + 1}: ${tab.name}`}
            type="button"
          >
            {index + 1}
          </button>
        ))}
      </div>

      {/* Tab name display (top right) */}
      {activeTab && (
        <div className='absolute top-4 right-4 z-20'>
          <span className='text-xs font-bold uppercase tracking-wider text-text opacity-75'>
            {activeTab.name} ({activeTabIndex + 1}/{tabs.length})
          </span>
        </div>
      )}
    </div>
  );
};
