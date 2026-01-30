# Zen-Start React - Development TODO

> This file tracks remaining tasks for the Zen-Start React migration. Not committed to git.

## 📋 Phase 4: Component Migration (HIGH PRIORITY)

### Clock Component

- [~] Create `src/components/Clock/Clock.tsx`
- [~] Implement useEffect for 1-second interval
- [~] Format time using `date-fns` based on config.clock.format
- [~] Apply Tailwind styling with Catppuccin colors
- [~] Add icon from lucide-react
- [~] Test time updates correctly
- [~] Test different time formats

### Weather Component

- [ ] Create `src/components/Weather/Weather.tsx`
- [ ] Implement useWeather hook integration
- [ ] Add temperature scale toggle (°C/°F)
- [ ] Show weather icon based on condition
- [ ] Display location on hover
- [ ] Handle loading state (skeleton or spinner)
- [ ] Handle error state gracefully
- [ ] Test with different locations
- [ ] Test temperature conversion

### Tabs System - Part 1: LinkCard

- [ ] Create `src/components/Tabs/LinkCard.tsx`
- [ ] Accept link data as props
- [ ] Render icon from lucide-react
- [ ] Apply Tailwind styling for link cards
- [ ] Add hover effects (translate + color change)
- [ ] Add shadow effects from tailwind config
- [ ] Test icon rendering

### Tabs System - Part 2: CategoryLinks

- [ ] Create `src/components/Tabs/CategoryLinks.tsx`
- [ ] Map through categories
- [ ] Display category headings
- [ ] Render LinkCard components for each link
- [ ] Apply Tailwind grid layout
- [ ] Test layout with multiple links

### Tabs System - Part 3: TabPanel

- [ ] Create `src/components/Tabs/TabPanel.tsx`
- [ ] Display background image from config
- [ ] Show vertical tab name label (on left side)
- [ ] Render CategoryLinks
- [ ] Implement fade-in animation
- [ ] Apply Catppuccin colors dynamically
- [ ] Test background image loading

### Tabs System - Part 4: Main Tabs Component

- [ ] Create `src/components/Tabs/Tabs.tsx`
- [ ] Track active tab index with useState
- [ ] Render all TabPanel components
- [ ] Implement keyboard navigation:
  - [ ] Arrow keys (left/right) to switch tabs
  - [ ] Numbers (1-9) to jump to tab
  - [ ] h/l keys (vim-style) to switch tabs
- [ ] Implement mouse wheel scrolling:
  - [ ] Scroll up = previous tab
  - [ ] Scroll down = next tab
- [ ] Implement smooth transitions
- [ ] Load last visited tab if enabled
- [ ] Save last visited tab
- [ ] Test all navigation methods

### StatusBar Component

- [ ] Create `src/components/StatusBar/StatusBar.tsx`
- [ ] Create tab indicator component showing numbers (1, 2, 3...)
- [ ] Integrate Clock widget
- [ ] Integrate Weather widget
- [ ] Add fastlink button with logo/icon
- [ ] Show active tab indicator (underline)
- [ ] Apply Catppuccin colors to indicators
- [ ] Test all interactions
- [ ] Position correctly at bottom

---

## 📋 Phase 5: New Features (MEDIUM PRIORITY)

### Settings Panel

- [ ] Install shadcn/ui components: `dialog`, `input`, `label`, `select`
- [ ] Create `src/components/SettingsDialog.tsx`
- [ ] Form fields:
  - [ ] Weather location (text input)
  - [ ] Temperature scale (select: C/F)
  - [ ] Clock format (text input)
  - [ ] Open last visited tab (checkbox)
- [ ] Add save button
- [ ] Add reset to defaults button
- [ ] Update ConfigContext on save
- [ ] Add settings button to StatusBar
- [ ] Test all form inputs
- [ ] Test data persistence

### Theme Switcher

- [ ] Create `src/contexts/ThemeContext.tsx` (or extend ConfigContext)
- [ ] Create `src/components/ThemeSwitcher.tsx`
- [ ] Create dropdown menu for 4 themes:
  - [ ] Latte (light)
  - [ ] Frappe (medium)
  - [ ] Macchiato (dark) - default
  - [ ] Mocha (darkest)
- [ ] Update CSS variables dynamically
- [ ] Save current theme to localStorage
- [ ] Apply theme on app load
- [ ] Add theme switcher to StatusBar
- [ ] Test switching themes
- [ ] Verify all colors update

### Command Palette

- [ ] Install shadcn/ui `command` component
- [ ] Create `src/components/CommandPalette.tsx`
- [ ] Add keyboard shortcut: Cmd+K (Mac) / Ctrl+K (Windows)
- [ ] Implement fuzzy search for links
- [ ] Show commands:
  - [ ] Search links (navigate to URL)
  - [ ] Open settings
  - [ ] Switch theme
  - [ ] Go to specific tab
- [ ] Keyboard navigation:
  - [ ] Arrow up/down
  - [ ] Enter to execute
  - [ ] ESC to close
- [ ] Add command palette trigger button
- [ ] Test search functionality
- [ ] Test all commands

---

## 📋 Phase 6: Final Integration & Testing

### App Integration

- [ ] Update `src/App.tsx`:
  - [ ] Wrap with ConfigProvider
  - [ ] Add Tabs component
  - [ ] Add CommandPalette global component
  - [ ] Set background image
- [ ] Update `src/main.tsx` if needed
- [ ] Remove boilerplate CSS/components

### Testing & QA

- [ ] Cross-browser testing:
  - [ ] Chrome
  - [ ] Firefox
  - [ ] Safari
  - [ ] Edge
- [ ] Responsive testing (mobile viewports)
- [ ] localStorage persistence across sessions
- [ ] Weather API integration
- [ ] All keyboard shortcuts
- [ ] All mouse interactions
- [ ] Tab switching smooth transitions
- [ ] No console errors
- [ ] No TypeScript errors

### Performance Optimization

- [ ] Analyze bundle size: `npm run build`
- [ ] Add React.memo to components where needed
- [ ] Optimize re-renders:
  - [ ] useCallback for event handlers
  - [ ] useMemo for expensive computations
- [ ] Lazy load components if needed
- [ ] Test performance on slow devices
- [ ] Measure and optimize metrics

### Documentation

- [ ] Update README.md with final status
- [ ] Document all environment variables
- [ ] Add deployment instructions
- [ ] Document component APIs
- [ ] Create CONTRIBUTING.md (optional)

### Build & Deploy

- [ ] Run production build: `npm run build`
- [ ] Test production build: `npm run preview`
- [ ] Set up GitHub Actions CI/CD (optional)
- [ ] Deploy to Vercel/Netlify
- [ ] Setup custom domain (optional)
- [ ] Monitor for errors

---

## 🔄 Icon Mapping (Lucide → Original)

Map Tabler Icons to Lucide React equivalents:

```typescript
const iconMap = {
  // Brand icons
  "brand-github": Github,
  "brand-reddit": Reddit,
  "brand-youtube": Youtube,
  "brand-twitch": Twitch,
  "brand-mastodon": Rss, // Fallback
  "brand-linkedin": Linkedin,

  // General icons
  mail: Mail,
  "calendar-filled": Calendar,
  lock: Lock,
  cloud: Cloud,
  search: Search,
  settings: Settings,
  menu: Menu,
  x: X,
  // ... add more as needed
};
```

---

## 🎯 Success Criteria (Definition of Done)

### Phase 4 Complete When:

- ✅ All 4 components render correctly
- ✅ Tab switching works (keyboard, mouse, click)
- ✅ Clock updates every second
- ✅ Weather fetches and displays
- ✅ All Tailwind styles applied
- ✅ Catppuccin colors visible

### Phase 5 Complete When:

- ✅ Settings dialog works
- ✅ Can switch themes
- ✅ Command palette responsive
- ✅ All features integrated

### Phase 6 Complete When:

- ✅ No errors in console
- ✅ No TypeScript errors
- ✅ All features tested
- ✅ Production build < 200KB gzipped
- ✅ Works in all browsers
- ✅ localStorage persists data

---

## 📊 Time Estimates

| Phase     | Tasks            | Estimated Hours |
| --------- | ---------------- | --------------- |
| 4         | Components       | 5-6 hours       |
| 5         | Features         | 4-5 hours       |
| 6         | Testing & Deploy | 2-3 hours       |
| **TOTAL** |                  | **11-14 hours** |

---

## 🚀 Nice-to-Haves (Future)

- [ ] Unit tests with Vitest
- [ ] E2E tests with Playwright
- [ ] Dark mode CSS class support
- [ ] More shadcn/ui components
- [ ] Drag-and-drop link reordering
- [ ] Export/import config as JSON
- [ ] Browser extension version
- [ ] Multi-language support
- [ ] Custom background upload
- [ ] Link search/filter

---

## 📝 Notes

- All components use TypeScript for type safety
- Tailwind config has Catppuccin colors predefined
- ConfigContext handles all state management
- Weather API has 1-hour caching
- Icons come from lucide-react (tree-shakable)
- shadcn/ui provides base UI components
- No external state management library needed

Last updated: 2026-01-29
