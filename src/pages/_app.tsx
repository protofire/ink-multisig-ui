import "@/styles/globals.css";
import "react-loading-skeleton/dist/skeleton.css";

import createCache from "@emotion/cache";
import { CacheProvider, EmotionCache } from "@emotion/react";
import { Theme, ThemeProvider } from "@mui/material/styles";
import { SafeThemeProvider } from "@safe-global/safe-react-components";
import { NextPage } from "next";
import type { AppProps } from "next/app";
import dynamic from "next/dynamic";
import { InkConfig } from "useink";

import { AppLayout } from "@/components/layout/AppLayout";
import { WalletConnectionGuard } from "@/components/WalletConnectionGuard";
import { CHAINS_ALLOWED } from "@/config/chain";
import { SettingsConsumer } from "@/context/settingsTheme";
import { PolkadotContextProvider } from "@/context/usePolkadotContext";
import ThemeCustomization from "@/themes";

interface ExtendedProps extends AppProps {
  emotionCache: EmotionCache;
  Component: NextPage & {
    getLayout?: (_page: React.ReactElement) => React.ReactNode;
    walletRequired?: boolean;
  };
}
const clientSideEmotionCache = createCache({ key: "css" });

const UseInkProvider: React.ComponentType<React.PropsWithChildren<InkConfig>> =
  dynamic(() => import("useink").then(({ UseInkProvider }) => UseInkProvider), {
    ssr: false,
  });

export default function App(props: ExtendedProps) {
  const { Component, pageProps, emotionCache = clientSideEmotionCache } = props;
  const walletRequired = Component.walletRequired ?? true;
  const getLayout =
    Component.getLayout ?? ((page) => <AppLayout>{page}</AppLayout>);
  <SettingsConsumer>
    {({ settings }) => {
      return (
        <CacheProvider value={emotionCache}>
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
                    <WalletConnectionGuard walletRequired={walletRequired}>
                      <ThemeCustomization settings={settings}>
                        {getLayout(<Component {...pageProps} />)}
                      </ThemeCustomization>
                    </WalletConnectionGuard>
                  </PolkadotContextProvider>
                </UseInkProvider>
              </ThemeProvider>
            )}
          </SafeThemeProvider>
        </CacheProvider>
      );
    }}
  </SettingsConsumer>;
}
