import { Head, Html, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta
          name="description"
          content="Ink Multisig UI is a user-friendly interface for interacting with a Multi-Signature smart contract in the Polkadot ecosystem."
        />
        <link rel="icon" href="/Simplr.ico" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
