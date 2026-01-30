export interface PaletteColors {
  rosewater: string;
  flamingo: string;
  pink: string;
  mauve: string;
  red: string;
  maroon: string;
  peach: string;
  yellow: string;
  green: string;
  teal: string;
  sky: string;
  sapphire: string;
  blue: string;
  lavender: string;
  text: string;
  subtext1: string;
  subtext0: string;
  overlay2: string;
  overlay1: string;
  overlay0: string;
  surface2: string;
  surface1: string;
  surface0: string;
  base: string;
  mantle: string;
  crust: string;
}

export type PaletteName = 'latte' | 'frappe' | 'macchiato' | 'mocha';

export interface Link {
  id: string;
  name: string;
  url: string;
  icon?: string;
  icon_color?: string;
  category_id: string;
}

export interface Category {
  id: string;
  name: string;
  links?: Link[];
}

export interface Tab {
  id: string;
  name: string;
  background_url: string;
  categories: Category[];
  links: Link[];
}

export interface TemperatureConfig {
  location: string;
  scale: 'C' | 'F';
  enabled: boolean;
}

export interface ClockConfig {
  format: string;
  iconColor?: string;
  enabled: boolean;
}

export interface Config {
  overrideStorage: boolean;
  temperature: TemperatureConfig;
  clock: ClockConfig;
  disabled: string[];
  fastlink: string;
  openLastVisitedTab: boolean;
  lastVisitedTab: number;
  tabs: Tab[];
  palette?: PaletteColors;
  currentPalette?: PaletteName;
}
