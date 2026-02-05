export interface BookmarkCategory {
  name: string;
  links: BookmarkLink[];
}

export interface BookmarkLink {
  name: string;
  url: string;
}

export function parseBookmarks(content: string): BookmarkCategory[] {
  const lines = content.split("\n");
  const categories: BookmarkCategory[] = [];
  let currentCategory: BookmarkCategory | null = null;

  for (const line of lines) {
    const trimmed = line.trim();

    // Skip empty lines
    if (!trimmed) continue;

    // Check if this is a URL (starts with http)
    if (trimmed.startsWith("http")) {
      if (currentCategory) {
        currentCategory.links.push({
          name: extractDomain(trimmed),
          url: trimmed,
        });
      }
    }
    // This is a category name
    else {
      // Save previous category
      if (currentCategory && currentCategory.links.length > 0) {
        categories.push(currentCategory);
      }

      // Start new category
      currentCategory = {
        name: trimmed,
        links: [],
      };
    }
  }

  // Don't forget the last category
  if (currentCategory && currentCategory.links.length > 0) {
    categories.push(currentCategory);
  }

  return categories;
}

function extractDomain(url: string): string {
  try {
    const hostname = new URL(url).hostname;
    return hostname.replace("www.", "");
  } catch {
    return url;
  }
}

// Map bookmark categories to app categories
export const bookmarkCategoryMapping: Record<string, string> = {
  learn: "Learning & Resources",
  JS: "Development Tools",
  AI: "AI & Chat",
  rentry: "Tools & Services",
  "cloud-server": "Tools & Services",
  jdownloader: "Tools & Services",
  streaming: "Entertainment",
  anime: "Entertainment",
  iptv: "Entertainment",
  "ghibli-upscaled": "Content Creation",
  MUSIC: "Entertainment",
  ebook: "Learning & Resources",
  virustotal: "Security & Privacy",
  adguard: "Security & Privacy",
  tempmail: "Tools & Services",
  warp: "Tools & Services",
  Pirated: "Entertainment",
  Medium: "Learning & Resources",
  GSERVICE: "Tools & Services",
};

// Categories with their icons and colors
export const categoryConfig: Record<string, { icon: string; color: string }> = {
  "saken-xcc": { icon: "brand-github", color: "#40c463" },
  learn: { icon: "book", color: "#f59e0b" },
  warp: { icon: "terminal", color: "#01a2f9" },
  "cloud-server": { icon: "server", color: "#3b82f6" },
  logos: { icon: "image", color: "#8b5cf6" },
  ebook: { icon: "book", color: "#10b981" },
  "188": { icon: "globe", color: "#6366f1" },
  MUSIC: { icon: "music", color: "#ec4899" },
  GSERVICE: { icon: "cloud", color: "#4285f4" },
  "ghibli-upscaled": { icon: "film", color: "#f97316" },
  iptv: { icon: "tv", color: "#14b8a6" },
  rentry: { icon: "file-text", color: "#f43f5e" },
  jdownloader: { icon: "download", color: "#eab308" },
  streaming: { icon: "play", color: "#ef4444" },
  Pirated: { icon: "alert-triangle", color: "#a855f7" },
  anime: { icon: "tv", color: "#f472b6" },
  virustotal: { icon: "shield", color: "#22c55e" },
  adguard: { icon: "shield", color: "#06b6d4" },
  tempmail: { icon: "mail", color: "#64748b" },
  JS: { icon: "code", color: "#f7df1e" },
  AI: { icon: "brain", color: "#8b5cf6" },
  Medium: { icon: "file-text", color: "#000000" },
};

// Get category config with fallback
export function getCategoryConfig(categoryName: string) {
  return categoryConfig[categoryName] || { icon: "folder", color: "#64748b" };
}
