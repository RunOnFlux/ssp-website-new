/* eslint-disable react/no-unescaped-entities */
import React from "react";
import styles from "./index.module.css"
import Image from "next/image";
import sspImage from "../../public/images/ssp animation 3_6 1.svg"
// import picture1 from "../../public/images/ssp animation 4 for site (1).webm";
import icons from "../../public/images/icons.svg"
import { VideoComponent } from "../videoComponent/videoComponent";
import Link from 'next/link'
export function HomePage(){
  
    return(
        <section className={styles.section1}>
            <div className="container-fluid">
                <div className="row">
                   <div className="col-lg-6 mb-5">
                    <h1>Secure, Simple,<br/> Powerful</h1><br/>
                    <Link href="/download"> Get Started</Link>
                    <Image alt="ssp-animation" src={sspImage}/>
                   </div>
                   <div className="col-lg-6">
                    <div className={styles.card1}>
                        <h3>Revolutionize </h3>
                        <h6>your wallet with <span>ssp</span></h6>
                        <p>SSP Wallet ensures user ownership with private keys back in their hands, emphasizing Security, Simplicity, and Powerful features. It pioneers cutting-edge encryption and mobile-integrated multi-signature mechanisms for a strong two-key authentication process. With a commitment to not storing any data information, SSP guarantees a secure environment. As a decentralized, open-source project, SSP evolves globally, empowering users to shape this Web3 wallet. Available as a Chrome extension, it seamlessly integrates with major DApp platforms..</p>
                    </div>
                        <div className={styles.cardPicture}>
                        {/* <Image alt="picture" src={picture1} /> */}
                        <VideoComponent/>
                        </div>

                        <div className={styles.icons}>
                        <Image alt="picture" src={icons} />
                        </div>
                    
                   </div>
                </div>
            </div>
        </section>
    )
}