import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

import { Settings } from "@/themes/types";
import { createNotImplementedWarning } from "@/utils/error";
import {
  getLocalStorageState,
  setLocalStorageState,
} from "@/utils/localStorage";

const ITEM_LOCAL_STORAGE = "settingsTheme";

export type SettingsContextValue = {
  settings: Settings;
  saveSettings: (updatedSettings: Settings) => void;
};

const defaultSettings: Settings = {
  navOpen: true,
  mode: "dark",
  skin: "default",
  drawerWidth: 240,
};

export const SettingsThemeContext = createContext<SettingsContextValue>({
  settings: defaultSettings,
  saveSettings: () => createNotImplementedWarning("saveSettings"),
});

export const SettingsThemeProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [settings, setSettings] = useState<Settings>({ ...defaultSettings });
  const initialSettings = getLocalStorageState<Settings>(
    ITEM_LOCAL_STORAGE,
    defaultSettings
  );

  useEffect(() => {
    if (initialSettings) {
      setSettings({ ...initialSettings });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const saveSettings = (updatedSettings: Settings) => {
    setLocalStorageState(ITEM_LOCAL_STORAGE, updatedSettings);
    setSettings(updatedSettings);
  };

  return (
    <SettingsThemeContext.Provider value={{ settings, saveSettings }}>
      {children}
    </SettingsThemeContext.Provider>
  );
};

export const SettingsThemeConsumer = SettingsThemeContext.Consumer;

export const useSettingsTheme = (): SettingsContextValue => {
  const context = useContext(SettingsThemeContext);
  if (context === undefined) {
    throw new Error(
      "useSettingsTheme must be used within a SettingsThemeProvider"
    );
  }
  return context;
};
