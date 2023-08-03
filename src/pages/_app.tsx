import "@/styles/globals.css";
import "react-loading-skeleton/dist/skeleton.css";

import createCache from "@emotion/cache";
import { CacheProvider, EmotionCache } from "@emotion/react";
import { NextPage } from "next";
import type { AppProps } from "next/app";
import dynamic from "next/dynamic";
import { InkConfig } from "useink";

import { WalletConnectionGuard } from "@/components/guards/WalletConnectionGuard";
import { AppLayout } from "@/components/layout/AppLayout";
import { CHAINS_ALLOWED } from "@/config/chain";
import { SettingsThemeConsumer } from "@/context/SettingsThemeConsumer";
import { LocalDbProvider } from "@/context/uselocalDbContext";
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

  return (
    <CacheProvider value={emotionCache}>
      <UseInkProvider
        config={{
          dappName: "XSigners Wallet",
          chains: CHAINS_ALLOWED,
        }}
      >
        <PolkadotContextProvider>
          <LocalDbProvider>
            <SettingsThemeConsumer>
              {({ settings }) => {
                return (
                  <ThemeCustomization settings={settings}>
                    <WalletConnectionGuard walletRequired={walletRequired}>
                      {getLayout(<Component {...pageProps} />)}
                    </WalletConnectionGuard>
                  </ThemeCustomization>
                );
              }}
            </SettingsThemeConsumer>
          </LocalDbProvider>
        </PolkadotContextProvider>
      </UseInkProvider>
    </CacheProvider>
  );
}
