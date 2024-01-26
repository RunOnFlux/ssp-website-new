import React from "react";
import { SupportPage } from "@/components/supportPage/supportPage";
import Head from "next/head";
export default function Support(){
    return(
        <>
           <Head>
        <title>SSP-Wallet | Support</title>
        <meta name="description" content="SSP Wallet website" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
        <SupportPage/>
        </>
    )
}