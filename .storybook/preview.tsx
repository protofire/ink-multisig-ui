import React, {useMemo} from "react";
import { StoryFn, type Preview, StoryContext } from "@storybook/react";
import { MINIMAL_VIEWPORTS } from "@storybook/addon-viewport";

import ThemeCustomization from "@/themes";
import { Settings } from "@/themes/types";

const customViewports = {
  iphone7: {
    name: "iPhone 7",
    styles: {
      width: "375px",
      height: "667px",
    },
  },
  samsungGalaxyS21Ultra: {
    name: "Samsung Galaxy S21 Ultra",
    styles: {
      width: "384px",
      height: "854px",
    },
  },
};

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    viewport: {
      viewports: {
      ...customViewports,
      ...MINIMAL_VIEWPORTS
      }
    }
  },
  globalTypes: {
    theme: {
      name: "Theme",
      title: "Theme",
      description: "Theme for your components",
      defaultValue: "light",
      toolbar: {
        icon: "paintbrush",
        dynamicTitle: true,
        items: [
          { value: "light", left: "☀️", title: "Light mode" },
          { value: "dark", left: "🌙", title: "Dark mode" },
        ],
      },
    },
  }
};

export default preview;

const defaultSettings: Settings = {
  navOpen: true,
  mode: "dark",
  skin: "default",
  drawerWidth: 240,
};


export const withMuiTheme = (Story: StoryFn, context: StoryContext) => {
  const { theme: themeKey } = context.globals;
  const _settings = useMemo(() => ({...defaultSettings, mode: themeKey}), [themeKey])
  
  return (
    <ThemeCustomization settings={_settings}>
      <Story />
    </ThemeCustomization>
  )
}

export const decorators = [withMuiTheme];