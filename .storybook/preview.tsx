import { StoryFn, type Preview } from "@storybook/react";
import ThemeCustomization from "@/themes";
import React from "react";


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
};

export default preview;

export const withMuiTheme = (Story: StoryFn) => {
  const settings = {
    navOpen: true,
    mode: "dark",
    skin: "default",
    drawerWidth: 240,
  };
  
  return (
    <ThemeCustomization settings={settings}>
      <Story />
    </ThemeCustomization>
  )
}

export const decorators = [withMuiTheme];