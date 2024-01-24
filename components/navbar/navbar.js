import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Link from "next/link";
import styles from "./index.module.css"
import Logo from "../../public/images/logo.svg"
import Image from 'next/image';
import TwitterLogo from "../../public/images/twitter-logo.svg"
import { useState } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';

export function NavBar(props){
  
    return(
        <React.Fragment>
       
        <Navbar expand="lg"  fixed='top' className={styles.navbar}>
          <Container>
            <Navbar.Brand href="#">
            <Image alt="logo" src={Logo} />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${"lg"}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${"lg"}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${"lg"}`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${"lg"}`}>
                  
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                <Nav.Link className={styles.navLink} href={'/'}>Home</Nav.Link>
                  <Nav.Link className={styles.navLink} href={'/features'}>Features</Nav.Link>
                  <Nav.Link className={styles.navLink} href={'/guide'}>Guide</Nav.Link>
                  <Nav.Link className={styles.navLink} href={'/support'}>Support</Nav.Link>
                  <Nav.Link className={styles.navLink} href={'/contact'}>Contact</Nav.Link>
                  <Nav.Link className={styles.navLink} href="/download"><span>Download</span></Nav.Link>
                  <Nav.Link className={styles.navLink} href="#"><Image className={styles.twitterLogo} alt="logo" src={TwitterLogo}/></Nav.Link>
                </Nav>
             
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>











     {/* <div className="d-none d-lg-block">
       <Navbar expand="lg" className={styles.navbar} fixed="top" >
      <Container>
        <Navbar.Brand href="#">
        <Image alt="logo" src={Logo} />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" className={styles.toggler} />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link className={styles.navLink} href={'/'}>Home</Nav.Link>
            <Nav.Link className={styles.navLink} href={'/features'}>Features</Nav.Link>
            <Nav.Link className={styles.navLink} href={'/guide'}>Guide</Nav.Link>
            <Nav.Link className={styles.navLink} href={'/support'}>Support</Nav.Link>
            <Nav.Link className={styles.navLink} href={'/contact'}>Contact</Nav.Link>
            <Nav.Link className={styles.navLink} href="/download"><span>Download</span></Nav.Link>
            <Nav.Link className={styles.navLink} href="#"><Image className={styles.twitterLogo} alt="logo" src={TwitterLogo}/></Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </div>

    <div className="d-block d-lg-none">
    <Navbar collapseOnSelect expand="lg" className={styles.navbar} variant="dark" fixed="top" >
    <Container>
        <Navbar.Brand href="/">
        <Image alt="logo" src={Logo} />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav"  />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mx-auto">
            <Nav.Link className={styles.navLink} href={'/'}>Home</Nav.Link>
            <Nav.Link className={styles.navLink} href={'/features'}>Features</Nav.Link>
            <Nav.Link className={styles.navLink} href={'/guide'}>Guide</Nav.Link>
            <Nav.Link className={styles.navLink} href={'/support'}>Support</Nav.Link>
            <Nav.Link className={styles.navLink} href={'/contact'}>Contact</Nav.Link>
            <Nav.Link className={styles.navLink} href={'/download'}><span>Download</span></Nav.Link>
            <Nav.Link className={styles.navLink} href="#"><Image className={styles.twitterLogo} alt="logo" src={TwitterLogo}/></Nav.Link>
          </Nav>
        </Navbar.Collapse>
        </Container>
    </Navbar>
    </div> */}
        </React.Fragment>
    )
}