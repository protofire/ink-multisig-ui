// material-ui
// third-party
import { generate, presetPalettes } from "@ant-design/colors";
import { createTheme, Theme } from "@mui/material/styles";

// project import
import ThemeOption from "./theme";
import { Settings } from "./types";

// ==============================|| DEFAULT THEME - PALETTE  ||============================== //

type LookSettings = Pick<Settings, "mode" | "skin">;
const MAIN_COLOR = "#ffe873"; // Shandy color

const Palette = ({ mode }: LookSettings): Theme => {
  const colors = presetPalettes;
  colors.primary = generate(MAIN_COLOR);
  const lightColor = "76, 48, 20";
  const darkColor = "234, 234, 255";
  const mainModeColor = mode === "light" ? lightColor : darkColor;

  const greyPrimary = [
    "#ffffff",
    "#fafafa",
    "#f5f5f5",
    "#f0f0f0",
    "#d9d9d9",
    "#bfbfbf",
    "#8c8c8c",
    "#595959",
    "#262626",
    "#141414",
    "#000000",
    "#201a1b",
    "#352f30",
    "#837376",
  ];
  const greyAscent = ["#fafafa", "#bfbfbf", "#434343", "#1f1f1f"];
  const greyConstant = ["#fafafb", "#e6ebf1"];

  colors.grey = [...greyPrimary, ...greyAscent, ...greyConstant];

  const paletteColor = ThemeOption(colors);

  return createTheme({
    palette: {
      mode,
      common: {
        black: "#000",
        white: "#fff",
      },
      ...paletteColor,
      text: {
        primary: `rgba(${mainModeColor}, 0.87)`,
        secondary: `rgba(${mainModeColor}, 0.68)`,
        disabled: `rgba(${mainModeColor}, 0.38)`,
      },
      action: {
        active: `rgba(${mainModeColor}, 0.54)`,
        hover: `rgba(${mainModeColor}, 0.05)`,
        hoverOpacity: 0.05,
        selected: `rgba(${mainModeColor}, 0.08)`,
        disabled: `rgba(${mainModeColor}, 0.26)`,
        disabledBackground: `rgba(${mainModeColor}, 0.12)`,
        focus: `rgba(${mainModeColor}, 0.12)`,
      },
      divider: `rgba(${mainModeColor}, 0.12)`,
      background:
        mode === "dark"
          ? {
              paper: "#1a1a1a",
              default: "#121212",
            }
          : {
              paper: "#FFFFF",
              default: "#F7F7F9",
            },
    },
  });
};

export default Palette;
