import "@/styles/globals.css";
import "react-loading-skeleton/dist/skeleton.css";

import { Theme, ThemeProvider } from "@mui/material/styles";
import { SafeThemeProvider } from "@safe-global/safe-react-components";
import type { AppProps } from "next/app";
import dynamic from "next/dynamic";
import { InkConfig } from "useink";

import { CHAINS_ALLOWED } from "@/config/chain";
import { PolkadotContextProvider } from "@/context/usePolkadotContext";

const UseInkProvider: React.ComponentType<React.PropsWithChildren<InkConfig>> =
  dynamic(() => import("useink").then(({ UseInkProvider }) => UseInkProvider), {
    ssr: false,
  });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SafeThemeProvider mode="light">
      {(safeTheme: Theme) => (
        <ThemeProvider theme={safeTheme}>
          <UseInkProvider
            config={{
              dappName: "ink multisignature",
              chains: CHAINS_ALLOWED,
            }}
          >
            <PolkadotContextProvider>
              <Component {...pageProps} />
            </PolkadotContextProvider>
          </UseInkProvider>
        </ThemeProvider>
      )}
    </SafeThemeProvider>
  );
}
