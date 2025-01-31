import React from "react";
import styles from "./index.module.css"
import Image from "next/image";
import QRCode from "react-qr-code";
import chrome from "../../public/images/chrome.svg"
import brave from "../../public/images/brave.svg"
import walletSeed from "../../public/images/Wallet Seed.svg"
// import browsers from "../../public/images/browsers.svg"
import playstore from "../../public/images/playstore.svg"
import screen1 from "../../public/images/android-screenshot-maker-of-a-samsung-galaxy-s9-plus-in-portrait-position-1319 (1) 2.svg";
import iphone from "../../public/images/iphone.svg"
import barcode from "../../public/images/barcode.svg"
import appStore from "../../public/images/appstore.svg"
import iconLogo from "../../public/images/Icon Logo Black.svg";
import Link from "next/link"
export function CheckoutFailurePage() {
    return (
        <React.Fragment>
            <section className={styles.section1}>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-12 col-md-12">
                            <div className={styles.checkoutCard}>
                                <div className={styles.checkoutSuccess}>
                                    <div>
                                        <h4>Checkout Failed!</h4>
                                        <h6>Your order has failed, try again later</h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </React.Fragment >
    )
}