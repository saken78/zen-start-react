# Zen-Start React 🌸

A modern React + TypeScript + Vite migration of [Zen-Start](https://github.com/saken78/Zen-Start), a minimalist, customizable browser start page with zen aesthetic.

## 🚀 Project Status

**Migration Progress: Phase 5/6 Complete**

- ✅ Phase 1: Vite + React + TypeScript setup
- ✅ Phase 2: Type definitions (Config, Weather, Palette)
- ✅ Phase 3: ConfigContext + Custom Hooks
- ✅ Phase 4: Component Migration (Clock, Weather, Tabs, StatusBar)
- ✅ Phase 5: New Features (Settings, Theme Switcher, Command Palette)
- ⏳ Phase 6: Final Integration & Testing

See [TODO.md](./TODO.md) for detailed task breakdown.

## 🛠 Tech Stack

- **Framework:** React 18 + TypeScript
- **Build Tool:** Vite (Lightning fast HMR)
- **Styling:** Tailwind CSS + Catppuccin theme (4 palettes)
- **UI Components:** shadcn/ui
- **Icons:** Lucide React
- **State Management:** React Context + Custom Hooks
- **Font:** JetBrains Mono Nerd Font

## 📁 Project Structure

```
src/
├── components/          # React components (WIP)
├── config/             # Configuration (userconfig.ts)
├── contexts/           # ConfigContext for global state
├── hooks/              # Custom hooks
│   ├── useConfig.ts
│   ├── useKeyboard.ts
│   ├── useLocalStorage.ts
│   └── useWeather.ts
├── lib/                # Utilities & libraries
│   ├── palette.ts      # Catppuccin themes
│   ├── storage.ts      # localStorage wrapper
│   ├── utils.ts        # shadcn/ui utilities
│   └── weatherAPI.ts   # OpenWeather API integration
├── types/              # TypeScript definitions
│   ├── config.ts
│   └── weather.ts
└── styles/
    └── index.css       # Tailwind + global styles
```

## 🎨 Features

### Core Features
- **Multi-Tab Interface** - Multiple themed tabs for organizing links
- **Weather Widget** - Real-time weather with °C/°F toggle
- **Live Clock** - Customizable time display with format tokens (h, H, i, s, p)
- **Theme Support** - 4 Catppuccin palettes (Latte, Frappe, Macchiato, Mocha)
- **Persistent Config** - Auto-save to localStorage
- **Weather Caching** - 1-hour cache to reduce API calls
- **TypeScript** - Full type safety

### Navigation & Interaction
- **Keyboard Navigation** - Arrow keys (← →), Vim keys (h/l), numbers (1-9)
- **Mouse Wheel** - Scroll to switch tabs
- **Command Palette** - Cmd+K (or Ctrl+K) for quick actions
- **Settings Dialog** - Cmd+, (or Ctrl+,) to configure appearance and behavior
- **Live Theme Switching** - Change palettes instantly across the app

### Customization
- **Settings Panel** - Configure weather location, clock format, enable/disable widgets
- **Temperature Scale** - Toggle between Celsius and Fahrenheit
- **Clock Format** - Custom format tokens: h (12h), H (24h), i (minutes), s (seconds), p (AM/PM)
- **Widget Toggle** - Enable/disable clock and weather independently

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📊 Performance Targets

| Metric | Target |
|--------|--------|
| Bundle Size (gzip) | < 200KB |
| Initial Load Time | < 200ms |
| LCP (Largest Contentful Paint) | < 100ms |
| FID (First Input Delay) | < 100ms |
| CLS (Cumulative Layout Shift) | < 0.1 |

## 🔧 Configuration

Edit `src/config/userconfig.ts` to customize:

```typescript
export const defaultConfig: Config = {
  temperature: {
    location: 'Surabaya',
    scale: 'C',
  },
  clock: {
    format: 'h:i p', // h:i p = 12:30 PM, H:i = 00:30
  },
  tabs: [
    // Add your tabs here
  ],
  // ... more options
};
```

## ⌨️ Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `↑` / `↓` | Navigate tabs (arrow keys) |
| `←` / `→` | Previous/next tab |
| `h` / `l` | Vim-style tab navigation |
| `1-9` | Jump to tab by number |
| `↑` / `↓` on mouse wheel | Scroll to switch tabs |
| `Cmd+K` / `Ctrl+K` | Open command palette |
| `Cmd+,` / `Ctrl+,` | Open settings |
| `⏱` (Click weather) | Toggle temperature scale |

## 🎯 Supported Palettes

- 🟡 **Latte** - Light theme
- 🟠 **Frappe** - Medium dark theme
- 🔵 **Macchiato** - Dark theme (default)
- ⚫ **Mocha** - Darkest theme

Switch palettes via:
- **Command Palette** - Cmd+K → "Switch to [palette] theme"
- **Settings Panel** - Cmd+, → Theme selector buttons
- **Configuration** - Edit `currentPalette` in `src/config/userconfig.ts`

## 📝 License

Based on [@saken78](https://github.com/saken78)'s original [Zen-Start](https://github.com/saken78/Zen-Start) project.

## 🔗 Related

- **Original Project:** https://github.com/saken78/Zen-Start
- **Catppuccin Theme:** https://catppuccin.com
- **shadcn/ui:** https://ui.shadcn.com
- **Lucide Icons:** https://lucide.dev
