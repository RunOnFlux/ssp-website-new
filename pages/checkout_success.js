import React from "react";
import { CheckoutSuccessPage } from "@/components/checkoutSuccessPage/checkoutSuccessPage";
import Head from "next/head";
export default function Support() {
  return (
    <>
      <Head>
        <title>SSP Wallet | Checkout Success</title>
        <meta name="description" content="SSP Wallet website" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <CheckoutSuccessPage />
    </>
  )
}