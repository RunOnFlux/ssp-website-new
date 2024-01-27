import React from "react";
import styles from "./index.module.css"
import Image from "next/image";
import chrome from "../../public/images/chrome.svg"
import walletSeed from "../../public/images/Wallet Seed.svg"
// import browsers from "../../public/images/browsers.svg"
import playstore from "../../public/images/playstore.svg"
import screen1 from "../../public/images/android-screenshot-maker-of-a-samsung-galaxy-s9-plus-in-portrait-position-1319 (1) 2.svg";
import barcode from "../../public/images/barcode.svg"
import appStore from "../../public/images/appstore.svg"
import iconLogo from "../../public/images/Icon Logo Black.svg";
import Link from "next/link"
export function DownloadPage(){
    return(
        <React.Fragment>
            <section>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-7 col-md-6">
                            <div className={styles.card1}>
                                <div className={styles.headerText1}>
                                    <div>
                                        <h4>ssp key for web</h4>
                                        <h6>install ssp for your browser</h6>
                                    </div>
                                    <div className={styles.imgContainer}>
                                    <Link target="_blank" href="https://chromewebstore.google.com/u/3/detail/ssp-wallet/mgfbabcnedcejkfibpafadgkhmkifhbd"><Image alt="img" src={chrome}/></Link>
                                    </div>   
                                </div>
                                <div className={styles.walletSeed}>
                                        {/* <Image alt="img" src={walletSeed}/> */}
                                        <div className={styles.extension}>
                                            <Image alt="logo" src={iconLogo}/>
                                            <h5>Welcome to SSP Wallet</h5>
                                            <p>Dual signature wallet for the decentralized world.</p>
                                            <p>Secure. Simple. Powerful.</p>
                                           <Link target="_blank" href="https://chromewebstore.google.com/u/3/detail/ssp-wallet/mgfbabcnedcejkfibpafadgkhmkifhbd" className={styles.link1}>Get Started!</Link>
                                           <Link href="#" className={styles.link2}>Restore with Seed</Link>
                                        </div>
                                        <h6>supported browsers</h6>
                                        <Link target="_blank" href="https://chromewebstore.google.com/u/3/detail/ssp-wallet/mgfbabcnedcejkfibpafadgkhmkifhbd"><Image alt="img" src={chrome}/></Link>
                                    </div>
                            </div>
                        </div>
                        <div className={`${styles.card001} col-lg-5 col-md-6`}>
                            <div>
                            <div className={styles.card2}>
                            <div className={styles.headerText2}>
                                    <div>
                                        <h4>ssp key for android</h4>
                                        <h6>install ssp for android</h6>
                                    </div>
                                    <div className={styles.imgContainer2}>
                                    <Link target="_blank" href="https://play.google.com/store/apps/details?id=io.runonflux.sspkey"><Image alt="img" src={playstore}/></Link>
                                    </div>   
                                </div>
                                <div className={styles.doubleImages}>
                                    <Image alt="img" src={screen1}/>
                                    <Image alt="img" src={barcode} />
                                </div>
                            </div>

                            <div className={styles.card2}>
                            <div className={styles.headerText2}>
                                    <div>
                                        <h4>ssp key for ios</h4>
                                        <h6>install ssp for iPhone</h6>
                                    </div>
                                    <div className={styles.imgContainer2}>
                                    <Link target="_blank" href="https://apps.apple.com/us/app/ssp-key/id6463717332"><Image alt="img" src={appStore}/></Link>
                                    </div>   
                                </div>
                                <div className={styles.doubleImages}>
                                    <Image alt="img" src={screen1}/>
                                    <Image alt="img" src={barcode} />
                                </div>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </React.Fragment>
    )
}