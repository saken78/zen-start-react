import * as Icons from "lucide-react";
import type React from "react";
import { useMemo } from "react";
import { getCategoryConfig, parseBookmarks } from "@/lib/bookmarks";
import { BookmarkCard } from "./BookmarkCard";

interface BookmarksSectionProps {
  bookmarksContent: string;
  title?: string;
}

export const BookmarksSection: React.FC<BookmarksSectionProps> = ({
  bookmarksContent,
  title = "Bookmarks",
}) => {
  const categories = useMemo(() => {
    return parseBookmarks(bookmarksContent);
  }, [bookmarksContent]);

  if (categories.length === 0) {
    return null;
  }

  return (
    <div className='space-y-6'>
      {title && <h2 className='text-lg font-bold text-text mb-4'>{title}</h2>}

      <div
        className='grid gap-4'
        style={{
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
        }}
      >
        {categories.map((category) => {
          const config = getCategoryConfig(category.name);
          const IconComponent = (Icons as unknown as Record<string, React.ComponentType<any>>)[
            config.icon
          ];

          return (
            <div
              key={category.name}
              className='bg-surface1/10 rounded-xl p-4 border border-surface1/20'
            >
              {/* Category Header */}
              <div className='flex items-center gap-2 mb-3 pb-2 border-b border-surface1/20'>
                {IconComponent && (
                  <IconComponent className='w-4 h-4' style={{ color: config.color }} />
                )}
                <h3 className='text-sm font-bold text-text capitalize'>{category.name}</h3>
                <span className='text-xs text-subtext0 ml-auto'>{category.links.length}</span>
              </div>

              {/* Links */}
              <div className='space-y-1.5 max-h-48 overflow-y-auto scrollbar-thin'>
                {category.links.map((link, index) => (
                  <BookmarkCard
                    key={`${link.url}-${index}`}
                    title={link.name}
                    url={link.url}
                    categoryColor={config.color}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
