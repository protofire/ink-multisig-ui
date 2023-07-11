import { Inter } from "next/font/google";
import Head from "next/head";

import { FunctionsForm } from "@/components/FunctionsForm";
import TopBar from "@/components/layout/TopBar";
import styles from "@/styles/Home.module.css";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>ink Wallet</title>
        <meta name="description" content="ink Multisignature wallet" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/Simplr.ico" />
      </Head>
      <TopBar />
      <main className={`${styles.main} ${inter.className}`}>
        <FunctionsForm />
      </main>
    </>
  );
}
