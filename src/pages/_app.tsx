import "@/styles/globals.css";
import "react-loading-skeleton/dist/skeleton.css";
import "react-toastify/dist/ReactToastify.css";

import { CacheProvider, EmotionCache } from "@emotion/react";
import { NextPage } from "next";
import type { AppProps } from "next/app";
import dynamic from "next/dynamic";
import { Router } from "next/router";
import NProgress from "nprogress";
import { InkConfig } from "useink";

import { AppToastNotifications } from "@/components/AppToastNotification";
import { AppNotificationsContextProvider } from "@/components/AppToastNotification/AppNotificationsContext";
import { Guard } from "@/components/guards";
import { AppLayout } from "@/components/layout/AppLayout";
import { MultisigEventListener } from "@/components/MultisigEventListener";
import { CHAINS } from "@/config/chain";
import { CallerXsignersAccountProvider } from "@/context/CallerXsigerAccounts";
import { SettingsThemeConsumer } from "@/context/SettingsThemeConsumer";
import { LocalDbProvider } from "@/context/uselocalDbContext";
import { PolkadotContextProvider } from "@/context/usePolkadotContext";
import ThemeCustomization from "@/themes";
import createEmotionCache from "@/utils/createEmotionCache";

// Progressbar Loader
Router.events.on("routeChangeStart", () => {
  NProgress.start();
});
Router.events.on("routeChangeError", () => {
  NProgress.done();
});
Router.events.on("routeChangeComplete", () => {
  NProgress.done();
});

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

export interface ExtendedProps extends AppProps {
  emotionCache: EmotionCache;
  Component: NextPage & {
    getLayout?: (_page: React.ReactElement) => React.ReactNode;
    connectedWalletRequired?: boolean;
  };
}

const UseInkProvider: React.ComponentType<React.PropsWithChildren<InkConfig>> =
  dynamic(() => import("useink").then(({ UseInkProvider }) => UseInkProvider), {
    ssr: false,
  });

export default function App(props: ExtendedProps) {
  const { Component, pageProps, emotionCache = clientSideEmotionCache } = props;
  const connectedWalletRequired = Component.connectedWalletRequired ?? true;
  const getLayout =
    Component.getLayout ?? ((page) => <AppLayout>{page}</AppLayout>);

  return (
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
                      <MultisigEventListener />
                      <CallerXsignersAccountProvider>
                        <Guard
                          connectedWalletRequired={connectedWalletRequired}
                        >
                          {getLayout(<Component {...pageProps} />)}
                        </Guard>
                      </CallerXsignersAccountProvider>
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
  );
}
