import React from "react";
import { DownloadPage } from "@/components/downloadPage/downloadPage";
import Head from "next/head";
export default function Download(){
    return(
        <>
          <Head>
        <title>SSP-Wallet | Download</title>
        <meta name="description" content="SSP Wallet website" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
        <DownloadPage/>
        </>
    )
}