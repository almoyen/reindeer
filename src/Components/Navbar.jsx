import React from "react";
import Icon from "../Images/Icon.svg";
import { useHistory } from "react-router";
import { Container, Navbar, Nav } from "react-bootstrap";

function Header() {
  const history = useHistory();
  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container fluid>
          <Navbar.Brand
            onClick={() => history.push("/")}
            style={{ cursor: "pointer" }}
          >
            <img
              alt="icon"
              src={Icon}
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{" "}
            <strong>Reindeer</strong>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto"></Nav>
            <Nav>
              <Nav.Link onClick={() => history.push("/login")}>login</Nav.Link>
              <Nav.Link eventKey={2} onClick={() => history.push("/register")}>
                register
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default Header;
