'use client'; // If you're using app directory

import { Navbar, Container } from 'react-bootstrap';

export default function CustomNavbar() {
  return (
    <Navbar className="custom-navbar" expand="lg">
      <Container className="justify-content-center">
        <Navbar.Brand className="navbar-title">Github Star Predictor</Navbar.Brand>
      </Container>
    </Navbar>
  );
}
