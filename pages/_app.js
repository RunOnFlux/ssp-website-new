import "@/styles/globals.css";
import React from "react";
import Layout from "@/components/layout";
import 'bootstrap/dist/css/bootstrap.css';
import { useEffect } from "react";
export default function App({ Component, pageProps }) {
  useEffect(() => {
    import ('bootstrap/dist/js/bootstrap.js')
}, []);
  return (


  <Layout>
        <Component {...pageProps} />
  </Layout>

  )
  ;
}
