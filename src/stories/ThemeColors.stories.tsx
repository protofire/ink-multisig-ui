import { PaletteColor, TypeText, useTheme } from "@mui/material";
import { Meta } from "@storybook/react";

export default {
  title: "Theme/Colors",
  parameters: {
    layout: "centered",
  },
} as Meta;

type PaletteKeys = "primary" | "secondary" | "text";
type PaletteColorKeys = keyof PaletteColor;
type TextKeys = keyof TypeText;

export const ColorPalette = () => {
  const theme = useTheme();
  const palettesToShow: PaletteKeys[] = ["primary", "secondary", "text"];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      {palettesToShow.map((paletteKey) => {
        let palette: PaletteColor | TypeText;
        if ("primary" in theme.palette[paletteKey]) {
          palette = theme.palette[paletteKey] as TypeText;
        } else {
          palette = theme.palette[paletteKey] as PaletteColor;
        }

        return (
          <div key={paletteKey}>
            <h3>{paletteKey}</h3>
            {paletteKey === "text" ? (
              Object.keys(palette).map((colorKey) => {
                const colorValue = (palette as TypeText)[colorKey as TextKeys];

                return (
                  <div
                    key={colorKey}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
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
              })
            ) : (
              <div
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                <div
                  style={{
                    width: "50px",
                    height: "50px",
                    backgroundColor: (palette as PaletteColor).main,
                  }}
                ></div>
                <span>main: {(palette as PaletteColor).main}</span>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
