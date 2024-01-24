import React from "react";
import styles from "./index.module.css";
import Form from 'react-bootstrap/Form';
import {useState} from "react"
import Accordion from 'react-bootstrap/Accordion';
export function SupportPage(){

    const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

    return(
        <React.Fragment>
                 <section className={styles.section1}>
                <div className="container">
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
            <div className="container">
                <div className="row">
                <Form validated={validated} onSubmit={handleSubmit}>
                    <h2>SUBMIT A TICKET</h2>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label><span className={styles.red}>*</span>Full Name</Form.Label>
                    <Form.Control required type="text" placeholder="Enter name" />
                   
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label><span className={styles.red}>*</span>Email</Form.Label>
                    <Form.Control required type="email" placeholder="Enter email" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicSelect">
                <Form.Label><span className={styles.red}>*</span>Issue</Form.Label>
                <Form.Select required aria-label="Default select example">
                    <option>Issue</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                    </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label><span className={styles.red}>*</span>Description</Form.Label>
                    <Form.Control as="textarea" rows={5} placeholder="Please describe your concern with as much detail as possible (include TxID’s of transaction)" />
                </Form.Group>
                <button className={styles.btn} variant="primary" type="submit">
                    Submit
                </button>
                </Form>
                </div>
            </div>
        </section>

        <section className={styles.section3}>
            <div className="container">
                <div className="row">
                    <h2>Frequently asked questions</h2>
                </div>
                <div className="row">
                <Accordion >
            <Accordion.Item eventKey="0">
                <Accordion.Header>Frequently asked questions</Accordion.Header>
                <Accordion.Body>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                aliquip ex ea commodo consequat. Duis aute irure dolor in
                reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                culpa qui officia deserunt mollit anim id est laborum.
                </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="1">
                <Accordion.Header>Frequently asked questions</Accordion.Header>
                <Accordion.Body>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                aliquip ex ea commodo consequat. Duis aute irure dolor in
                reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                culpa qui officia deserunt mollit anim id est laborum.
                </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="2">
                <Accordion.Header>Frequently asked questions</Accordion.Header>
                <Accordion.Body>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                aliquip ex ea commodo consequat. Duis aute irure dolor in
                reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                culpa qui officia deserunt mollit anim id est laborum.
                </Accordion.Body>
            </Accordion.Item>
            </Accordion>
                </div>
            </div>
        </section>
        
        </React.Fragment>
       

       

       
    )
}