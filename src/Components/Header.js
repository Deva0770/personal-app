import React, { Component } from 'react';
 import { Navbar, Nav } from 'react-bootstrap';
 // To use routing functionalities
 import {
    BrowserRouter as Router
  } from "react-router-dom";

 import '../index.css';
 
 class Header extends Component {
    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-md-12">
                        <Router>
                            <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
                                <Navbar.Brand href="#home">Car Service</Navbar.Brand>
                                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                                <Navbar.Collapse id="basic-navbar-nav">
                                <Nav className="mr-auto">
                                    <Nav.Link href="/">Home</Nav.Link>
                                    <Nav.Link href="/addcarservice">Add Car Service</Nav.Link>
                                </Nav>
                                </Navbar.Collapse>
                            </Navbar>
                        </Router>
                    </div>
                </div>
                
            </div>
        );
    }
 }
export default Header;