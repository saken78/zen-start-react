import type React from "react";
import { useEffect, useState } from "react";
import { BookmarksSection } from "@/components/Bookmark";

interface BookmarksTabProps {
  bookmarksPath?: string;
}

export const BookmarksTab: React.FC<BookmarksTabProps> = ({ bookmarksPath = "/bookmark.md" }) => {
  const [bookmarksContent, setBookmarksContent] = useState("");

  useEffect(() => {
    // Fetch bookmarks from the file
    fetch(bookmarksPath)
      .then((response) => response.text())
      .then((text) => setBookmarksContent(text))
      .catch((error) => {
        console.error("Failed to load bookmarks:", error);
      });
  }, [bookmarksPath]);

  return (
    <div className='w-full h-full overflow-y-auto p-6'>
      <div className='max-w-6xl mx-auto'>
        <div className='mb-6'>
          <h1 className='text-2xl font-bold text-text mb-2'>📚 Bookmarks</h1>
          <p className='text-subtext0 text-sm'>Organized collection of links and resources</p>
        </div>

        {bookmarksContent ? (
          <BookmarksSection bookmarksContent={bookmarksContent} title='' />
        ) : (
          <div className='text-center py-12 text-subtext0'>
            <p>Loading bookmarks...</p>
          </div>
        )}
      </div>
    </div>
  );
};
