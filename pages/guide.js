import React from "react";
import { GuidePage } from "@/components/guidePage/guidePage";
import Head from "next/head";
export default function Guide(){
    return(
        <>
           <Head>
        <title>SSP-Wallet | Guide</title>
        <meta name="description" content="SSP Wallet website" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
        <GuidePage/>
        </>
    )
}