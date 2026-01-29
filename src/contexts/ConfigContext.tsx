import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { Config, PaletteName } from '@/types/config';
import { loadConfig, saveConfig } from '@/lib/storage';
import { getPalette } from '@/lib/palette';
import { defaultConfig } from '@/config/userconfig';

interface ConfigContextType {
  config: Config;
  updateConfig: <K extends keyof Config>(key: K, value: Config[K]) => void;
  updateNested: <K extends keyof Config>(
    key: K,
    value: Partial<Config[K]>
  ) => void;
  resetConfig: () => void;
  switchPalette: (paletteName: PaletteName) => void;
}

const ConfigContext = createContext<ConfigContextType | undefined>(undefined);

export const ConfigProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [config, setConfig] = useState<Config>(() => {
    const stored = loadConfig();
    if (stored) {
      // Ensure palette is always set
      return {
        ...stored,
        palette: stored.palette || getPalette(stored.currentPalette || 'macchiato'),
      };
    }
    return {
      ...defaultConfig,
      palette: getPalette(defaultConfig.currentPalette || 'macchiato'),
    };
  });

  // Auto-save to localStorage whenever config changes
  useEffect(() => {
    saveConfig(config);
  }, [config]);

  const updateConfig = useCallback(
    <K extends keyof Config>(key: K, value: Config[K]) => {
      setConfig((prev) => ({
        ...prev,
        [key]: value,
      }));
    },
    []
  );

  const updateNested = useCallback(
    <K extends keyof Config>(key: K, value: Partial<Config[K]>) => {
      setConfig((prev) => ({
        ...prev,
        [key]: {
          ...prev[key],
          ...value,
        },
      }));
    },
    []
  );

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
