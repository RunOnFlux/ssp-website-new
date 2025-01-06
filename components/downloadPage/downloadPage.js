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
export function DownloadPage() {
    return (
        <React.Fragment>
            <section className={styles.section1}>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-7 col-md-6">
                            <Link target="_blank" href="https://chromewebstore.google.com/u/3/detail/ssp-wallet/mgfbabcnedcejkfibpafadgkhmkifhbd" style={{ color: 'inherit', textDecoration: 'none' }} >
                                <div className={styles.card1}>
                                    <div className={styles.headerText1}>
                                        <div>
                                            <h4>ssp wallet extension</h4>
                                            <h6>install ssp for your browser</h6>
                                        </div>
                                        <div className={styles.imgContainer}>
                                            <Image alt="img" src={chrome} />
                                        </div>
                                    </div>
                                    <div className={styles.walletSeed}>
                                        {/* <Image alt="img" src={walletSeed}/> */}
                                        <div className={styles.extension}>
                                            <Image alt="logo" src={iconLogo} />
                                            <h5>Welcome to SSP Wallet</h5>
                                            <p>Dual signature wallet for the decentralized world.</p>
                                            <p>Secure. Simple. Powerful.</p>
                                            <p className={styles.link1}>Get Started!</p>
                                            <p className={styles.link2}>Restore with Seed</p>
                                        </div>
                                        <h6>supported browsers</h6>
                                        <Image alt="img" src={chrome} />
                                        &nbsp; &nbsp; &nbsp; &nbsp;
                                        <Image alt="img" src={brave} />
                                    </div>
                                </div>
                            </Link>
                        </div>
                        <div className={`${styles.card001} col-lg-5 col-md-6`}>
                            <div>
                                <Link target="_blank" href="https://play.google.com/store/apps/details?id=io.runonflux.sspkey">
                                    <div className={styles.card2}>
                                        <div className={styles.headerText2}>
                                            <div>
                                                <h4>ssp key for android</h4>
                                                <h6>install ssp for android</h6>
                                            </div>
                                            <div className={styles.imgContainer2}>
                                                <Image alt="img" src={playstore} />
                                            </div>
                                        </div>
                                        <div className={styles.doubleImages}>
                                            <Image alt="img" src={screen1} />
                                            <QRCode
                                                size={128}
                                                style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                                                value={"https://play.google.com/store/apps/details?id=io.runonflux.sspkey"}
                                                viewBox={`0 0 128 128`}
                                                bgColor="#F9DB10"
                                            />
                                        </div>
                                    </div>
                                </Link>
                                <Link target="_blank" href="https://apps.apple.com/us/app/ssp-key/id6463717332">
                                    <div className={styles.card2}>
                                        <div className={styles.headerText2}>
                                            <div>
                                                <h4>ssp key for ios</h4>
                                                <h6>install ssp for iPhone</h6>
                                            </div>
                                            <div className={styles.imgContainer2}>
                                                <Image alt="img" src={appStore} />
                                            </div>
                                        </div>
                                        <div className={styles.doubleImages}>
                                            <Image alt="img" src={iphone} />
                                            <QRCode
                                                size={128}
                                                style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                                                value={"https://apps.apple.com/us/app/ssp-key/id6463717332"}
                                                viewBox={`0 0 128 128`}
                                                bgColor="#F9DB10"
                                            />
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </React.Fragment >
    )
}