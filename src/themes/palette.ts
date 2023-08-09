// material-ui
// third-party
import { generate, presetPalettes } from "@ant-design/colors";
import { createTheme, Theme } from "@mui/material/styles";

// project import
import ThemeOption from "./theme";
import { Settings } from "./types";

// ==============================|| DEFAULT THEME - PALETTE  ||============================== //

type LookSettings = Pick<Settings, "mode" | "skin">;
const MAIN_COLOR = "#E6007A"; // Mexican pink

const Palette = ({ mode }: LookSettings): Theme => {
  const colors = presetPalettes;
  colors.primary = generate(MAIN_COLOR);

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
      text:
        mode === "dark"
          ? {
              primary: paletteColor.grey[100],
              secondary: paletteColor.grey[400],
              disabled: paletteColor.grey[500],
            }
          : {
              primary: paletteColor.grey[800],
              secondary: paletteColor.grey[500],
              disabled: paletteColor.grey[400],
            },
      action: {
        disabled: paletteColor.grey[300],
      },
      divider: paletteColor.grey[200],
      background:
        mode === "dark"
          ? {
              paper: "#201A1B",
              default: "#0D0E13",
            }
          : {
              paper: "#FFFFF",
              default: "#F7F7F9",
            },
    },
  });
};

export default Palette;
