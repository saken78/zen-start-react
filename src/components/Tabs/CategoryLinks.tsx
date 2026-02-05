import type React from "react";
import { useEffect, useMemo, useState } from "react";
import { BookmarkPill } from "@/components/Bookmark";
import { useConfig } from "@/hooks/useConfig";
import { bookmarkCategoryMapping, getCategoryConfig, parseBookmarks } from "@/lib/bookmarks";
import type { Category, Link } from "@/types/config";
import { LinkCard } from "./LinkCard";

interface CategoryLinksProps {
  categories: Category[];
  links: Link[];
}

export const CategoryLinks: React.FC<CategoryLinksProps> = ({ categories, links }) => {
  const { config } = useConfig();
  const [bookmarksContent, setBookmarksContent] = useState("");

  // Fetch bookmarks
  useEffect(() => {
    fetch("/bookmark.md")
      .then((response) => response.text())
      .then((text) => setBookmarksContent(text))
      .catch((error) => {
        console.error("Failed to load bookmarks:", error);
      });
  }, []);

  // Parse bookmarks
  const bookmarkCategories = useMemo(() => {
    return parseBookmarks(bookmarksContent);
  }, [bookmarksContent]);

  // Map category names to bookmarks
  const getBookmarksForCategory = (categoryName: string) => {
    const mappedName = bookmarkCategoryMapping[categoryName] || categoryName;

    for (const bc of bookmarkCategories) {
      if (bc.name.toLowerCase() === mappedName.toLowerCase()) {
        return bc.links;
      }
      // Also check if any bookmark category name matches part of the category name
      if (
        mappedName.toLowerCase().includes(bc.name.toLowerCase()) ||
        bc.name.toLowerCase().includes(mappedName.toLowerCase())
      ) {
        return bc.links;
      }
    }
    return [];
  };

  return (
    <div className='flex flex-col gap-6'>
      {categories.map((category) => {
        const categoryLinks = links.filter((link) => link.category_id === category.id);
        const categoryBookmarks = getBookmarksForCategory(category.name);
        const hasContent = categoryLinks.length > 0 || categoryBookmarks.length > 0;

        // Skip empty categories
        if (!hasContent) return null;

        return (
          <div key={category.id} className='flex flex-col gap-3'>
            {/* Category heading */}
            {category.name && (
              <h2 className='text-xs font-bold uppercase tracking-widest text-subtext0 opacity-50'>
                {category.name}
                {categoryBookmarks.length > 0 && (
                  <span className='ml-2 text-[10px] opacity-75'>
                    ({categoryLinks.length + categoryBookmarks.length})
                  </span>
                )}
              </h2>
            )}

            {/* Links grid */}
            <div className='flex flex-wrap gap-2.5'>
              {categoryLinks.map((link) => (
                <LinkCard key={link.id} link={link} accentColor={config.palette?.green} />
              ))}

              {/* Bookmark pills */}
              {categoryBookmarks.map((bookmark, index) => {
                const bookmarkConfig = getCategoryConfig(
                  bookmarkCategories.find((bc) => bc.links.some((l) => l.url === bookmark.url))
                    ?.name || "",
                );

                return (
                  <BookmarkPill
                    key={`bm-${bookmark.url}-${index}`}
                    title={bookmark.name}
                    url={bookmark.url}
                    color={bookmarkConfig.color}
                  />
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};
