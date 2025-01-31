import React from "react";
import { FeaturesPage } from "@/components/featuresPage/featuresPage";
import Head from "next/head";
export default function Features(){
    return(
        <>
        <Head>
        <title>SSP Wallet | Features</title>
        <meta name="description" content="SSP Wallet website" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
        <FeaturesPage/>
        </>
    )
}