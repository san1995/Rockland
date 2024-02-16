import React from "react";
import { Link } from "react-router-dom";
// nodejs library that concatenates strings
import classnames from "classnames";

// reactstrap components
import {
  Collapse,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  Button,
} from "react-bootstrap";

function UserNavbar() {



  return (
    <Navbar bg="dark" data-bs-theme="dark" fixed="top">
        <Container>
          <Navbar.Brand href="#home">Rockland Learning</Navbar.Brand>
          <Nav className="me-end">
            <Nav.Link href="#features">Rock Catalogue</Nav.Link>
            <Nav.Link href="#pricing">Quiz</Nav.Link>
            <Nav.Link href="#pricing">Forum</Nav.Link>
            <Nav.Link href="">Profile</Nav.Link>
            <Nav.Link>Logout</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
  );
}

export default UserNavbar
