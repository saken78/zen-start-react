import type React from "react";
import { BookmarksTab } from "@/components/Bookmark/BookmarksTab";
import type { Tab } from "@/types/config";
import { CategoryLinks } from "./CategoryLinks";

interface TabPanelProps {
  tab: Tab;
  isActive: boolean;
}

export const TabPanel: React.FC<TabPanelProps> = ({ tab, isActive }) => {
  // Check if this is a bookmarks tab
  const isBookmarksTab = tab.id === "bookmarks" || tab.name?.toLowerCase() === "bookmarks";

  if (isBookmarksTab) {
    return (
      <div
        className={`absolute inset-0 transition-opacity duration-300 ${
          isActive ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Simple background */}
        <div className='absolute inset-0 bg-gradient-to-br from-surface1 to-base' />

        {/* Overlay for readability */}
        <div className='absolute inset-0 bg-black/20' />

        {/* Bookmarks content */}
        <div className='relative z-10 h-full'>
          <BookmarksTab />
        </div>
      </div>
    );
  }

  return (
    <div
      className={`absolute inset-0 transition-opacity duration-300 ${
        isActive ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      {/* Background image with fallback gradient */}
      <div
        className='absolute inset-0 bg-cover bg-center bg-gradient-to-br from-surface1 to-base'
        style={{
          backgroundImage: tab.background_url ? `url('${tab.background_url}')` : undefined,
          backgroundBlendMode: "overlay",
        }}
      />

      {/* Overlay for readability */}
      <div className='absolute inset-0 bg-black/40' />

      {/* Content */}
      <div className='relative z-10 h-full overflow-y-auto flex flex-col'>
        <div className='flex items-start gap-6 flex-1'>
          {/* Tab label - vertical text on left */}
          {tab.name && (
            <div className='flex items-start justify-center pt-8 pl-6 min-w-fit sticky top-0'>
              <span
                className='text-lg font-bold text-white/15 uppercase tracking-wider'
                style={{
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  letterSpacing: "0.25em",
                  lineHeight: "1.8",
                }}
              >
                {tab.name}
              </span>
            </div>
          )}

          {/* Links section */}
          <div className='flex-1 flex flex-col justify-start py-8 pr-12'>
            <CategoryLinks categories={tab.categories} links={tab.links} />
          </div>
        </div>
      </div>
    </div>
  );
};
