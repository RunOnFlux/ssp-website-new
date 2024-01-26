import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import { HomePage } from "@/components/homePage/HomePage";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>SSP-Wallet | Home</title>
        <meta name="description" content="SSP Wallet website" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HomePage/>
         </>
  );
}
