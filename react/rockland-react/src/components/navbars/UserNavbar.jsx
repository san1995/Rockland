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

  const user_level = {"1" : "admin", "2": "business", "3": "Rock Beginner", "4":"Rock Enthusiast", "5":"Rock Expert"};

  // Get user type
  const usertype = JSON.parse(localStorage.getItem('usertype'));
  let userHome = "";

  if (usertype === "3"){
    userHome = "/rockBeginner";
  } else if (usertype === "4") {
    userHome = "/rockEnthusiast";
  } else if (usertype === "5") {
    userHome = "/rockExpert";
  }

  // Home page link different based on user type


  return (
    <Navbar bg="dark" data-bs-theme="dark" fixed="top">
        <Container>
          <Navbar.Brand href={userHome}>Rockland Learning</Navbar.Brand>
          <Nav className="me-end">
            <Nav.Link href="/RockCatalogue">Rock Catalogue</Nav.Link>
            <Nav.Link href="">Quiz</Nav.Link>
            <Nav.Link href="/forumTopics">Forum</Nav.Link>
            <Nav.Link href="">Profile</Nav.Link>
            <Nav.Link href="/">Logout</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
  );
}

export default UserNavbar
