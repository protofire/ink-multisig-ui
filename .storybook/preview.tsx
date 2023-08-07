import { StoryFn, type Preview, StoryContext } from "@storybook/react";
import ThemeCustomization from "@/themes";
import { Settings } from "@/themes/types";

import React, {useEffect, useMemo, useState} from "react";


const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
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