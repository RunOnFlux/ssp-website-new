/* eslint-disable react/no-unescaped-entities */
import React from "react";
import styles from "./index.module.css"
import Link from "next/link";
export function ContactPage() {
    return (
        <React.Fragment>
            <main className={styles.main}>
                <section className={styles.section1}>
                    <div className="container-fluid">
                        <div className="row">
                            <div className={styles.cardHeader}>
                                <div>
                                    <h3>CONTACT US</h3>
                                    <h6>we’d love to hear from you</h6></div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className={styles.section2}>
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col">
                                <h5>GET IN TOUCH</h5>
                                <h6>If you're interested in discussing our wallet for partnerships, adding your coin (currently supporting only UTXO-based coins), or exploring other opportunities, feel free to contact us at: <a href="#" style={{ color: "#F9DB10" }}>info@runonflux.io</a></h6>
                                <h6>Find quick solutions in our FAQs before reaching out. Your question might already have an answer waiting for you!</h6>
                            </div>
                        </div>
                        <div className="row">
                            <div className={styles.btn}>
                                <Link href="/support">View Support</Link>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

        </React.Fragment>
    )
}