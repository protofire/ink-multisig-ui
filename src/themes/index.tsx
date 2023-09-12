import { CssBaseline, GlobalStyles, StyledEngineProvider } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Public_Sans } from "next/font/google";
import { ReactNode, useMemo } from "react";

import { Settings } from "@/themes/types";

import GlobalStyling from "./GlobalStyling";
import componentsOverride from "./overrides";
import Palette from "./palette";
import CustomShadows from "./shadows";
import typographyOptions from "./typography";

// ==============================|| DEFAULT THEME - MAIN  ||============================== //

const publicSans = Public_Sans({
  subsets: ["latin"],
});

export default function ThemeCustomization({
  children,
  settings,
}: {
  children: ReactNode;
  settings: Settings;
}) {
  const { mode, skin } = settings;
  const theme = Palette({ mode, skin });

  const themeTypography = typographyOptions(
    [publicSans.style.fontFamily].join(",")
  );

  const themeCustomShadows = useMemo(() => CustomShadows(theme), [theme]);

  const themeOptions = useMemo(
    () => ({
      breakpoints: {
        values: {
          xs: 0,
          sm: 768,
          md: 1024,
          lg: 1266,
          xl: 1536,
        },
      },
      spacing: 8,
      Direction: "ltr",
      mixins: {
        toolbar: {
          minHeight: 60,
          paddingTop: 8,
          paddingBottom: 8,
        },
      },
      palette: theme.palette,
      customShadows: themeCustomShadows,
      typography: themeTypography,
    }),
    [theme.palette, themeCustomShadows, themeTypography]
  );

  let themes = createTheme(themeOptions);
  themes = createTheme(themes, {
    components: { ...componentsOverride(themes) },
  });

  return (
    <div className={publicSans.className}>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={themes}>
          <CssBaseline />
          <GlobalStyles styles={() => GlobalStyling(theme) as any} />
          {children}
        </ThemeProvider>
      </StyledEngineProvider>
    </div>
  );
}
