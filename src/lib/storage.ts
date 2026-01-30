import type { Config } from "@/types/config";

const CONFIG_KEY = "zen-start-config";

export const loadConfig = (): Config | null => {
  try {
    const stored = localStorage.getItem(CONFIG_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch (error) {
    console.error("Failed to load config from localStorage:", error);
    return null;
  }
};

export const saveConfig = (config: Config): void => {
  try {
    localStorage.setItem(CONFIG_KEY, JSON.stringify(config));
  } catch (error) {
    console.error("Failed to save config to localStorage:", error);
  }
};

export const clearConfig = (): void => {
  try {
    localStorage.removeItem(CONFIG_KEY);
  } catch (error) {
    console.error("Failed to clear config from localStorage:", error);
  }
};

export const loadLastVisitedTab = (): number | null => {
  try {
    const stored = localStorage.getItem("lastVisitedTab");
    return stored ? parseInt(stored, 10) : null;
  } catch (error) {
    console.error("Failed to load last visited tab:", error);
    return null;
  }
};

export const saveLastVisitedTab = (tabIndex: number): void => {
  try {
    localStorage.setItem("lastVisitedTab", tabIndex.toString());
  } catch (error) {
    console.error("Failed to save last visited tab:", error);
  }
};
