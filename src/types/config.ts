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
  name: string;
  url: string;
  icon?: string;
  icon_color?: string;
}

export interface Category {
  name: string;
  links: Link[];
}

export interface Tab {
  name: string;
  background_url: string;
  categories: Category[];
}

export interface TemperatureConfig {
  location: string;
  scale: 'C' | 'F';
}

export interface ClockConfig {
  format: string;
  iconColor?: string;
}

export interface Config {
  overrideStorage: boolean;
  temperature: TemperatureConfig;
  clock: ClockConfig;
  disabled: string[];
  fastlink: string;
  openLastVisitedTab: boolean;
  tabs: Tab[];
  palette?: PaletteColors;
  currentPalette?: PaletteName;
}
