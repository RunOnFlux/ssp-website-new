import React from "react";
import styles from "./index.module.css";
import Image from "next/image";
import footerLogo from "../../public/images/footer.svg";
import Link from "next/link"
export function Footer(){
    return(
        <React.Fragment>
            <footer className={styles.footer}>
                <div className="container">
                    <div className="row">
                        <div className="col">
                        <Link href="https://runonflux.io" target="_blank"><Image alt="logo" src={footerLogo}/></Link>
                        </div>
                    </div>
                </div>
            </footer>
        </React.Fragment>
    )
}