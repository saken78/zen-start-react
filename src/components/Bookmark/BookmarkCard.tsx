import { ExternalLink } from "lucide-react";
import type React from "react";

interface BookmarkCardProps {
  title: string;
  url: string;
  categoryColor?: string;
}

export const BookmarkCard: React.FC<BookmarkCardProps> = ({
  title,
  url,
  categoryColor = "#64748b",
}) => {
  return (
    <a
      href={url}
      target='_blank'
      rel='noopener noreferrer'
      className='group flex items-center justify-between p-3 bg-surface0/30 hover:bg-surface0/60 rounded-lg border border-surface1/30 hover:border-surface1/60 transition-all duration-150 hover:translate-y-px'
    >
      <div className='flex items-center gap-2 min-w-0'>
        <div
          className='w-2 h-2 rounded-full flex-shrink-0'
          style={{ backgroundColor: categoryColor }}
        />
        <span className='text-sm text-text group-hover:text-[color:var(--accent)] truncate transition-colors'>
          {title}
        </span>
      </div>
      <ExternalLink className='w-3 h-3 text-subtext1 group-hover:text-text flex-shrink-0 ml-2 opacity-0 group-hover:opacity-100 transition-opacity' />
    </a>
  );
};
