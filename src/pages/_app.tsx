import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { InkConfig } from 'useink'
import { SafeThemeProvider } from '@safe-global/safe-react-components'
import { Theme, ThemeProvider } from '@mui/material/styles';
import { RococoContractsTestnet } from '@/config/chain';
import dynamic from 'next/dynamic';

const UseInkProvider: React.ComponentType<React.PropsWithChildren<InkConfig>> =
  dynamic(() => import('useink').then(({ UseInkProvider }) => UseInkProvider), {
    ssr: false,
  });

export default function App({ Component, pageProps }: AppProps) {
  return (<SafeThemeProvider mode="light">
  {(safeTheme: Theme) => (
      <ThemeProvider theme={safeTheme}>
  <UseInkProvider
      config={{
        dappName: 'ink multisignature',
        chains: [
          RococoContractsTestnet,
        ]
      }}
    >
      <Component {...pageProps} />
    </UseInkProvider>
      </ThemeProvider> )}
    </SafeThemeProvider>)
}
