import React from "react";
import axios from "axios";
import styles from "./index.module.css";
import Form from 'react-bootstrap/Form';
import { useState } from "react"
import Accordion from 'react-bootstrap/Accordion';
import github from "../../public/images/github.svg"
import youtube from "../../public/images/youtube.svg"
import twitter from "../../public/images/twitter.svg"
import Image from "next/image";
import Link from "next/link";
export function SupportPage() {

    const [validated, setValidated] = useState(false);
    const [ticketSent, setTicketSent] = useState(false);
    const [ticketSubmitting, setTicketSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState(false);

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        const data = {
            "email": event.target[0].value,
            "type": event.target[1].value,
            "subject": event.target[2].value,
            "description": event.target[3].value,
        }
        console.log(data);
        event.preventDefault();
        // send this to our api
        if (form.checkValidity() === false) {
            event.stopPropagation();
        }
        setSubmitError(false);
        event.preventDefault();
        setValidated(true);
        setTicketSubmitting(true);

        // add challgenge header
        const headers = {
            "x-challenge": "ssp",
        }

        axios.post("https://relay.ssp.runonflux.io/v1/ticket", data, { headers }).then((res) => {
            console.log(res);
            // clean the form
            event.target[0].value = "";
            event.target[1].value = "";
            event.target[2].value = "";
            event.target[3].value = "";
            // display ticket sent message above the form
            setTicketSent(true);
            setValidated(false);
            setTicketSubmitting(false);
        }).catch((err) => {
            console.log(err);
            setSubmitError(true);
            setTicketSubmitting(false);
        });
    };

    return (
        <React.Fragment>
            <section className={styles.section1}>
                <div className="container-fluid">
                    <div className="row">
                        <div className={styles.cardHeader}>
                            <div>
                                <h3>SSP SUPPORT</h3>
                                <h6>hi! How Can We Help You?</h6></div>
                        </div>
                    </div>
                </div>
            </section>

            <section className={styles.section2}>
                <div className="container-fluid">
                    <div className="row">
                        {!ticketSent && !ticketSubmitting && (
                            <Form validated={validated} onSubmit={handleSubmit}>
                                <h2>SUBMIT A TICKET</h2>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label><span className={styles.red}>*</span>Email</Form.Label>
                                    <Form.Control required type="email" placeholder="Enter email" />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicSelect">
                                    <Form.Label><span className={styles.red}>*</span>Topic</Form.Label>
                                    <Form.Select required aria-label="Type">
                                        <option value="Question">Help Needed</option>
                                        <option value="Feature Request">Feature Request</option>
                                        <option value="Problem">Bug Report</option>
                                    </Form.Select>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label><span className={styles.red}>*</span>Subject</Form.Label>
                                    <Form.Control required type="text" placeholder="Enter Subject" />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                    <Form.Label><span className={styles.red}>*</span>Description</Form.Label>
                                    <Form.Control as="textarea" rows={5} placeholder="Please describe your concern with as much detail as possible. NEVER submit seed phrase or private key or any other sensitive information!" />
                                </Form.Group>

                                <button className={styles.btn} variant="primary" type="submit">
                                    Submit
                                </button>
                            </Form>)}
                        {ticketSent && <><h2>Ticket created successfully.</h2><p>Check your email for more details.<br /> Your support.runonflux.io team.</p></>}
                        {ticketSubmitting && <><h2>Submitting ticket...</h2><p>Please wait.<br /> Your support.runonflux.io team.</p></>}
                        {submitError && <><h2>There was an error submitting your ticket.</h2><p>Please try again later.<br /> Your support.runonflux.io team.</p></>}
                    </div>
                </div>
            </section>

            <section className={styles.section3}>
                <div className="container-fluid">
                    <div className="row">
                        <h2>Frequently asked questions</h2>
                    </div>
                    <div className="row">
                        <Accordion >
                            <Accordion.Item eventKey="0">
                                <Accordion.Header>How to use SSP?</Accordion.Header>
                                <Accordion.Body>
                                    SSP requires 2 pieces: SSP Wallet and SSP Key. SSP Wallet is a chrome extension, SSP Key is a mobile application. Both are required to use SSP. You can download them from the download page. Check out the Guide for more details.
                                </Accordion.Body>
                            </Accordion.Item>

                            <Accordion.Item eventKey="1">
                                <Accordion.Header>How to add my coin?</Accordion.Header>
                                <Accordion.Body>
                                    Please reach out to our support team or follow up on github! SSP is entirely open source and we welcome contributions.
                                </Accordion.Body>
                            </Accordion.Item>

                            <Accordion.Item eventKey="2">
                                <Accordion.Header>I lost my seed phrase.</Accordion.Header>
                                <Accordion.Body>
                                    If SSP is still installed on your device, you can find your seed phrase in SSP Details. If you lost your seed phrase and SSP is not installed on your device, there is no way to recover your wallet. SSP requires 2 independent seed phrases to operate - one for SSP Wallet and one for SSP Key. Please make sure to keep both of your seed phrases safe and secure.
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="3">
                                <Accordion.Header>When Mobile SSP Wallet?</Accordion.Header>
                                <Accordion.Body>
                                    Good news! We are actively working on expanding SSP Wallet to mobile. You can expect to see it in the coming months.
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="4">
                                <Accordion.Header>How to switch devices?</Accordion.Header>
                                <Accordion.Body>
                                    You can use as many devices as you wish. Simply Restore your Wallet or Key with corresponding seed phrase.
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="5">
                                <Accordion.Header>SSP requires restore?</Accordion.Header>
                                <Accordion.Body>
                                    SSP uses strong encryption that is unique per device. If you are switching devices, you will need to restore your wallet or key with corresponding seed phrase. That is also the case for traveling, swapping of computer copmonents, changing timezone, resolutions or any critical system settings. Strong encryption prevents any form of copying SSP data to another machine unlike other wallets. This prevents any kind of hacker attempts of stealing SSP data from your machine. Dual signature and device specific encryption makes SSP the most secure wallet on the market.
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="6">
                                <Accordion.Header>What is SSP Relay?</Accordion.Header>
                                <Accordion.Body>
                                    SSP Relay is an open source relay between your SSP Wallet and SSP Key. It provides market information, blockchain fees information, allows seamless syncing of transaction requests between your SSP Wallet and SSP Key and provides notification servies to your SSP Key. No sensitive information is ever sent to SSP Relay. It is entirely open source and you can run your own instance of SSP Relay if you wish. 
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="7">
                                <Accordion.Header>Do you support Replace-By-Fee (RBF)?</Accordion.Header>
                                <Accordion.Body>
                                    Yes! SSP fully supports transaction replacement by Replace-By-Fee (RBF). If your transaction is underpriced and not getting mined, you can simply bump the fee. Moreover you can even change the receiver and amount! Granted that the overall fee and fee per vByte is higher than previous transaction. RBF is not guaranteed by blockchain and transaction replacement might fail and some blockchains do not support RBF.
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="8">
                                <Accordion.Header>What are transaction fees?</Accordion.Header>
                                <Accordion.Body>
                                    Every transaction on blockchain requires a blockchain network fee. This fee goes to miners, block creators. SSP has zero fees! Fees on blockchains such as Bitcoin tend to be very expensive reaching tens of USD per transaction. SSP uses automatic fees for transactions favoring fast transaction confirmation. Sofisticated picking of UTXOs ensures optimal inputs composition for entire SSP wallet and transaction size. You can change fee to manual if you wish however use with caution. 
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="9">
                                <Accordion.Header>Transaction can&apos;t be constructed?</Accordion.Header>
                                <Accordion.Body>
                                    Blockchains have limitations in terms of transaction sizes in Bytes. Transactions that require lots of UTXOs to be constructed may exceed this transaction size limits. This is especially noticable for miners who should resend between their wallets and thus consolidate their UTXOs first before attempting to send large amounts.
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="10">
                                <Accordion.Header>Can I run Flux Nodes</Accordion.Header>
                                <Accordion.Body>
                                    Absolutely! SSP supports Flux Nodes operation in seamless manner - there are already millions of Flux locked in SSP powered Flux Nodes. Navigate to Nodes tab and set your node up! Fusion Parallel Asset Rewards Claiming is also available in SSP. 
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                    </div>
                    <div className="row mt-3 mb-2">
                        <h2>Learn More by visiting our socials</h2>
                        <div className={styles.socialIcons}>
                            <Link href="https://github.com/RunOnFlux" target="_blank"><Image alt="icons" src={github} /></Link>
                            <Link href="https://www.youtube.com/channel/UCphbdfb1MXYgUPsdhQPcnGw" target="_blank"><Image alt="icons" src={youtube} /></Link>
                            <Link href="https://twitter.com/RunOnFlux" target="_blank"><Image alt="icons" src={twitter} /></Link>
                        </div>
                    </div>
                </div>
            </section>
        </React.Fragment>
    )
}