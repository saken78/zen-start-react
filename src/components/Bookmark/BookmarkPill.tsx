import { ExternalLink } from "lucide-react";
import type React from "react";

interface BookmarkPillProps {
  title: string;
  url: string;
  color?: string;
}

export const BookmarkPill: React.FC<BookmarkPillProps> = ({ title, url, color = "#64748b" }) => {
  return (
    <a
      href={url}
      target='_blank'
      rel='noopener noreferrer'
      className='inline-flex items-center gap-1.5 px-2.5 py-1.5 bg-surface0/50 hover:bg-surface0/80 rounded-md text-xs transition-all duration-150 hover:translate-y-px border border-surface1/20 hover:border-surface1/40 group'
    >
      <span className='w-1.5 h-1.5 rounded-full flex-shrink-0' style={{ backgroundColor: color }} />
      <span className='text-text hover:text-[color:var(--accent)] transition-colors truncate max-w-[120px]'>
        {title}
      </span>
      <ExternalLink className='w-3 h-3 text-subtext1 group-hover:text-text flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity' />
    </a>
  );
};

interface BookmarkSectionProps {
  bookmarks: Array<{ name: string; url: string }>;
  title: string;
  color?: string;
}

export const BookmarkSection: React.FC<BookmarkSectionProps> = ({ bookmarks, title, color }) => {
  if (bookmarks.length === 0) return null;

  return (
    <div className='mt-3 pt-3 border-t border-surface1/20'>
      <div className='flex items-center gap-1.5 mb-2'>
        <span className='text-xs font-semibold text-subtext0 uppercase tracking-wider'>
          {title}
        </span>
        <span className='text-xs text-subtext0'>({bookmarks.length})</span>
      </div>
      <div className='flex flex-wrap gap-1.5'>
        {bookmarks.map((bookmark, index) => (
          <BookmarkPill
            key={`${bookmark.url}-${index}`}
            title={bookmark.name}
            url={bookmark.url}
            color={color}
          />
        ))}
      </div>
    </div>
  );
};
