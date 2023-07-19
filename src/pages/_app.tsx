import "@/styles/globals.css";
import "react-loading-skeleton/dist/skeleton.css";

import { Theme, ThemeProvider } from "@mui/material/styles";
import { SafeThemeProvider } from "@safe-global/safe-react-components";
import type { AppProps } from "next/app";

import { PolkadotContextProvider } from "@/context/usePolkadotContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SafeThemeProvider mode="light">
      {(safeTheme: Theme) => (
        <ThemeProvider theme={safeTheme}>
          <PolkadotContextProvider>
            <Component {...pageProps} />
          </PolkadotContextProvider>
        </ThemeProvider>
      )}
    </SafeThemeProvider>
  );
}
