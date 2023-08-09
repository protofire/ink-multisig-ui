import { PaletteColor, TypeText, useTheme } from "@mui/material";
import { Meta } from "@storybook/react";

export default {
  title: "Theme/Colors",
  parameters: {
    layout: "centered",
  },
} as Meta;

type PaletteKeys = "primary" | "secondary" | "text";

export const ColorPalette = () => {
  const theme = useTheme();
  const palettesToShow: PaletteKeys[] = ["primary", "secondary", "text"];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      {palettesToShow.map((paletteKey) => {
        const palette = theme.palette[paletteKey];

        const colorsToShow =
          paletteKey === "text" ? Object.keys(palette) : ["main"];

        return (
          <div key={paletteKey}>
            <h3>{paletteKey}</h3>
            {colorsToShow.map((colorKey) => {
              const colorValue = palette[colorKey as PaletteColor | TypeText];

              return (
                <div
                  key={colorKey}
                  style={{ display: "flex", alignItems: "center", gap: "8px" }}
                >
                  <div
                    style={{
                      width: "50px",
                      height: "50px",
                      backgroundColor: colorValue,
                    }}
                  ></div>
                  <span>
                    {colorKey}: {colorValue}
                  </span>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};
