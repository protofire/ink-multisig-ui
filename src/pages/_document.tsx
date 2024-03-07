import { DocumentProps, Head, Html, Main, NextScript } from "next/document";

interface MyDocumentProps extends DocumentProps {
  emotionStyleTags: JSX.Element[];
}

export default function Document({ emotionStyleTags }: MyDocumentProps) {
  return (
    <Html lang="en">
      <Head>
        <meta
          name="description"
          content="Ink Multisig UI is a user-friendly interface for interacting with a Multi-Signature smart contract in the Polkadot ecosystem."
        />
        <link rel="shortcut icon" href="/favicon.ico" />
        {/* Insertion point for client. This connects with createEmotionCache.ts */}
        <meta name="emotion-insertion-point" content="" />
        {emotionStyleTags}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
