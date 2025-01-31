import React from "react";
import { CheckoutFailurePage } from "@/components/checkoutFailurePage/checkoutFailurePage";
import Head from "next/head";
export default function Support() {
  return (
    <>
      <Head>
        <title>SSP Wallet | Checkout Failure</title>
        <meta name="description" content="SSP Wallet website" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <CheckoutFailurePage />
    </>
  )
}