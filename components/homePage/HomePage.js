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
                        <p>Serving as the true guardian of your digital wealth, SSP Wallet ensures ownership by putting the keys back into the hands of users. With a focus on usability, accessibility, and intuitive design, SSP provides a seamless transition to Web3. Leveraging industry-leading encryption, SSP offers powerful security features, including a multi-signature structure and two-factor authentication. Adhering to a strict "No-storing" policy, SSP eliminates the risks associated with data breaches. As an entirely decentralized and open-source project, SSP evolves with global contributions, allowing users to actively participate in building a decentralized future. The SSP Wallet, available as a Chrome extension, integrates effortlessly with major DApp platforms.</p>
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