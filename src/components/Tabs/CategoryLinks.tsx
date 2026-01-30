import React from 'react';
import type { Category, Link } from '@/types/config';
import { LinkCard } from './LinkCard';
import { useConfig } from '@/hooks/useConfig';

interface CategoryLinksProps {
  categories: Category[];
  links: Link[];
}

export const CategoryLinks: React.FC<CategoryLinksProps> = ({ categories, links }) => {
  const { config } = useConfig();

  return (
    <div className="flex flex-col gap-8">
      {categories.map((category) => {
        const categoryLinks = links.filter((link) => link.category_id === category.id);

        // Skip empty categories
        if (categoryLinks.length === 0) return null;

        return (
          <div key={category.id} className="flex flex-col gap-3">
            {/* Category heading */}
            {category.name && (
              <h2 className="text-xs font-bold uppercase tracking-widest text-subtext0 opacity-60">
                {category.name}
              </h2>
            )}

            {/* Links grid */}
            <div className="flex flex-wrap gap-3">
              {categoryLinks.map((link) => (
                <LinkCard
                  key={link.id}
                  link={link}
                  accentColor={config.palette?.green}
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};
