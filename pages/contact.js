import React from "react";

import { ContactPage } from "@/components/contactPage/contactPage";
import Head from "next/head";
export default function Contact(){
    return(
        <>
      
        <Head>
        <title>SSP-Wallet | Contact</title>
        <meta name="description" content="SSP Wallet website" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
        <ContactPage/>
        </>
    )
}