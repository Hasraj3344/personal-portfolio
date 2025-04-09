// App.js or a test page
import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import fb from '../assets/fb.png';
import x from '../assets/x.png';
import linkedin from '../assets/linkedin.png';

function NavbarComponent({ onToggle }) {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" sticky="top" onToggle={(isOpen) => onToggle(isOpen)}>
      <Container>
      <Navbar.Brand as={Link} to="/">
      <h2>Haswanth</h2>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto text-center"> {/* ✅ float right & center on collapse */}
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/about">About</Nav.Link>
            <Nav.Link as={Link} to="/projects">Projects</Nav.Link>
            <Nav.Link as={Link} to="/contact">Contact</Nav.Link>
            <a href='#' className='btn-talk'>Let's Talk</a>
          </Nav>
        </Navbar.Collapse>
      </Container>
      {/* Footer */}
      <footer className="custom-footer">
        <div className="social-icons">
          <a href="#"><img src={fb} alt="FB" /></a>
          <a href="#"><img src={linkedin} alt="Linkedin" /></a>
          <a href="#"><img src={x} alt="X" /></a>
        </div>
        <button className="vvd" onClick={() => console.log('connect')}>
          <span>Let's Connect</span>
        </button>
      </footer>
    </Navbar>
  );
}

export default NavbarComponent;
