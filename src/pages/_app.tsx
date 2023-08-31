import "@/styles/globals.css";
import "react-loading-skeleton/dist/skeleton.css";
import "react-toastify/dist/ReactToastify.css";

import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { CacheProvider, EmotionCache } from "@emotion/react";
import { NextPage } from "next";
import type { AppProps } from "next/app";
import dynamic from "next/dynamic";
import { InkConfig } from "useink";

import { AppToastNotifications } from "@/components/AppToastNotification";
import { AppNotificationsContextProvider } from "@/components/AppToastNotification/AppNotificationsContext";
import { WalletConnectionGuard } from "@/components/guards/WalletConnectionGuard";
import { AppLayout } from "@/components/layout/AppLayout";
import { CHAINS } from "@/config/chain";
import { SettingsThemeConsumer } from "@/context/SettingsThemeConsumer";
import { LocalDbProvider } from "@/context/uselocalDbContext";
import { PolkadotContextProvider } from "@/context/usePolkadotContext";
import ThemeCustomization from "@/themes";
import createEmotionCache from "@/utils/createEmotionCache";

export const squidClient = new ApolloClient({
  uri: "https://squid.subsquid.io/ink-multisig-shibuya/v/v2/graphql",
  cache: new InMemoryCache(),
});

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

export interface ExtendedProps extends AppProps {
  emotionCache: EmotionCache;
  Component: NextPage & {
    getLayout?: (_page: React.ReactElement) => React.ReactNode;
    walletRequired?: boolean;
  };
}

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
    <ApolloProvider client={squidClient}>
      <CacheProvider value={emotionCache}>
        <UseInkProvider
          config={{
            dappName: "XSigners Wallet",
            chains: CHAINS,
          }}
        >
          <PolkadotContextProvider>
            <LocalDbProvider>
              <SettingsThemeConsumer>
                {({ settings }) => {
                  return (
                    <ThemeCustomization settings={settings}>
                      <AppNotificationsContextProvider>
                        <WalletConnectionGuard walletRequired={walletRequired}>
                          {getLayout(<Component {...pageProps} />)}
                        </WalletConnectionGuard>
                        <AppToastNotifications />
                      </AppNotificationsContextProvider>
                    </ThemeCustomization>
                  );
                }}
              </SettingsThemeConsumer>
            </LocalDbProvider>
          </PolkadotContextProvider>
        </UseInkProvider>
      </CacheProvider>
    </ApolloProvider>
  );
}
