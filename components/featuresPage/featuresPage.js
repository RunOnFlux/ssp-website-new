/* eslint-disable react/no-unescaped-entities */
import React from "react";
import styles from "./index.module.css"
import Image from "next/image";
import card1Img from "../../public/images/card1-img.svg"
import card2Img from "../../public/images/card2-img.svg"
import card3Img from "../../public/images/card3-img.svg"
import IconLogo from "../../public/images/Icon Logo Black.svg";
import IconLogoB from "../../public/images/ssp-logo-black.svg";
import security from "../../public/images/security.svg"
import simplicity from "../../public/images/simplicity.svg";
import powerful from "../../public/images/powerful.svg"
import Link from "next/link";
import { VideoComponent2 } from "../videoComponent/videoComponent2";
export function FeaturesPage() {
    return (
        <React.Fragment>
            <section className={styles.section1}>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col">
                            <h2>CUTTING-EDGE TECHNOLOGY</h2>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-8 col-md-12  mb-5">
                            <div className={styles.card}>
                                <VideoComponent2 />
                                <h6 className="mt-3">Sending Transaction</h6>
                                <p>This video showcases how the process of sending Bitcoin is secured.</p>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className={styles.card1}>
                            <div className="row">
                                <div className="col-md-7">
                                    <div className={styles.cardText}>
                                        <div>
                                            <h3>Secure<span><Image alt="img" src={security} /></span></h3>
                                            {/* <h6>your wallet with <span>ssp</span></h6> */}
                                            <p>SSP enhances digital asset security with dual-signature protection, mitigating the key person risk of single-signature wallets. Its BIP48-Multi-Sig design and 2FA system offer a secure alternative, safeguarding against unauthorized transactions even if your private key is compromised. With a strict "No-storing" policy, SSP eliminates the risk of data breaches, ensuring your wallet remains secure without storing passwords or data. </p>
                                            {/* <a href="#">Button1</a> */}
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-5">
                                    <div className={styles.cardImg}>
                                        <Image alt="img" src={card1Img} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className={styles.card1}>
                            <div className="row">

                                <div className="col-md-5 order-1">
                                    <div className={styles.cardImg}>
                                        <Image alt="img" src={card2Img} />
                                    </div>
                                </div>
                                <div className="col-md-7 order-0 order-md-2">
                                    <div className={styles.cardText}>
                                        <div>
                                            <h3>Simple<span><Image alt="img" src={simplicity} /></span></h3>
                                            {/* <h6>your wallet with <span>ssp</span></h6> */}
                                            <p>SSP introduces a simple, uncluttered, easy-to-use interface to improve accessibility and user experience. Our goal is to seamlessly transition users from conventional technologies to the decentralized ecosystem, making onboarding easy. Securely store your crypto, including Bitcoin, with our user-friendly approach.</p>
                                            {/* <a href="#">Button2</a> */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className={styles.card1}>
                            <div className="row">
                                <div className="col-md-7">
                                    <div className={styles.cardText}>
                                        <div>
                                            <h3>Powerful<br /> wallet<span><Image alt="img" src={powerful} /></span></h3>
                                            {/* <h6>your wallet with <span>ssp</span></h6> */}
                                            <p>SSP, a decentralized open-source project, evolves through global contributions for new features and functionalities, shaping Web3 by the people, for the people. The SSP wallet, released as a Chrome extension, enables users to engage in building a decentralized future and seamlessly integrate with major DApp platforms but also provides a secure haven for storing crypto, including Bitcoin.</p>
                                            {/* <a href="#">Button3</a> */}
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-5">
                                    <div className={styles.cardImg}>
                                        <Image alt="img" src={card3Img} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className={styles.card2}>
                            <div className="row">
                                <div className="col-md-6">
                                    <p>Ethereum implementation features state of the art Schnorr Multi Signature account abstraction accounts following ERC4337.</p>
                                    <p>SSP is the first wallet to ever introduce true multi signature accounts to Ethereum without the need of having standard EOA account! That is a major achievement for entire Ethereum, EVM ecosystem especially on the security side.</p>
                                    <p className={styles.links}>We have built the Schnorr Multi Signature Account Abstraction typescript library to be fully open sourced - same as entire SSP, available on npm following latest innovations. We encourage anyone to use the library as well and welcoming any contribution.
                                        {' '} <Link target="_blank" href="https://github.com/RunOnFlux/account-abstraction">GitHub</Link>, {' '}
                                        <Link target="_blank" href="https://www.npmjs.com/package/@runonflux/aa-schnorr-multisig-sdk">NPM</Link> </p>
                                </div>
                                <div className="col-md-6">
                                    <div className={styles.card2Text}>
                                    <Image alt="logo" src={IconLogo} />
                                        {/* <Image alt="logo" src={IconLogoB} /> */}
                                        <h6>Ethereum chain</h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="row">
                        <div className={styles.card2}>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className={styles.card2Text}>
                                        <Image alt="logo" src={IconLogo} />
                                        <h6>ADDITIONAL INFO</h6>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <p>Enpowered by Native Segwit, P2SH, Account Abstraction ERC4337</p>
                                    <p>Supported chains: Bitcoin (BTC), Ethereum (ETH) with Tokens, Litecoin (LTC), Zcash (ZEC), Ravencoin (RVN), Dogecoin (DOGE), Bitcoin Cash (BCH), Flux (FLUX)</p>
                                    <p className={styles.links}>For a full list of natively supported chains and tokens refer to: <Link href="https://docs.google.com/spreadsheets/d/1GUqGeV4hCwjKlxazY1vPY52owrEqXQ1UTchOKfkyS7c" target="_blank">SSP Asset Spreadsheet</Link></p>
                                    <p>Features coming soon: Purchase, Sell, Swap, More Chains, Extensive Documentation, WalletConenct, SSP Wallet Mobile</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col">
                            <div className={styles.btns}>
                                <Link target="_blank" href={'https://medium.com/@ssp_wallet'} className={styles.btn4}>Medium Article</Link>
                                {/* <a className={styles.btn5}>Button 5</a> */}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </React.Fragment >
    )
}