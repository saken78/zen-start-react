import type React from 'react';
import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { CONFIG_VERSION, defaultConfig } from '@/config/userconfig';
import { getPalette } from '@/lib/palette';
import { clearConfig, loadConfig, saveConfig } from '@/lib/storage';
import type { Config, PaletteName } from '@/types/config';

interface ConfigContextType {
  config: Config;
  updateConfig: <K extends keyof Config>(key: K, value: Config[K]) => void;
  updateNested: <K extends keyof Config>(key: K, value: Partial<Config[K]>) => void;
  resetConfig: () => void;
  switchPalette: (paletteName: PaletteName) => void;
}

export const ConfigContext = createContext<ConfigContextType | undefined>(undefined);

export const ConfigProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [config, setConfig] = useState<Config>(() => {
    // Check localStorage version
    const storedVersion = localStorage.getItem('config-version');

    // If version mismatch, clear old config and use defaults
    if (storedVersion !== CONFIG_VERSION) {
      localStorage.setItem('config-version', CONFIG_VERSION);
      clearConfig();
      return {
        ...defaultConfig,
        palette: getPalette(defaultConfig.currentPalette || 'macchiato'),
      };
    }

    const stored = loadConfig();
    if (stored && defaultConfig.overrideStorage === false) {
      // Use stored config if not overriding
      return {
        ...stored,
        palette: stored.palette || getPalette(stored.currentPalette || 'macchiato'),
      };
    }

    // Use default config
    return {
      ...defaultConfig,
      palette: getPalette(defaultConfig.currentPalette || 'macchiato'),
    };
  });

  // Auto-save to localStorage whenever config changes
  useEffect(() => {
    saveConfig(config);
  }, [config]);

  const updateConfig = useCallback(<K extends keyof Config>(key: K, value: Config[K]) => {
    setConfig((prev) => ({
      ...prev,
      [key]: value,
    }));
  }, []);

  const updateNested = useCallback(<K extends keyof Config>(key: K, value: Partial<Config[K]>) => {
    setConfig((prev) => ({
      ...prev,
      [key]: {
        ...(prev[key] as Record<string, any>),
        ...value,
      },
    }));
  }, []);

  const resetConfig = useCallback(() => {
    setConfig({
      ...defaultConfig,
      palette: getPalette(defaultConfig.currentPalette || 'macchiato'),
    });
  }, []);

  const switchPalette = useCallback((paletteName: PaletteName) => {
    const newPalette = getPalette(paletteName);
    setConfig((prev) => ({
      ...prev,
      currentPalette: paletteName,
      palette: newPalette,
    }));
  }, []);

  return (
    <ConfigContext.Provider
      value={{
        config,
        updateConfig,
        updateNested,
        resetConfig,
        switchPalette,
      }}
    >
      {children}
    </ConfigContext.Provider>
  );
};

export const useConfigContext = () => {
  const context = useContext(ConfigContext);
  if (!context) {
    throw new Error('useConfigContext must be used within ConfigProvider');
  }
  return context;
};
