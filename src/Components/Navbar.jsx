//import logo from "./logo.svg";
import Icon from "../Images/Icon.svg";
import React from "react";
import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap";
import { useHistory } from "react-router";

function Header() {
  const history = useHistory();
  return (
    <>
      <Navbar
        collapseOnSelect
        expand="lg"
        bg="dark"
        variant="dark"
        /*  style={{ zIndex: 2 }} */
      >
        <Container fluid>
          <Navbar.Brand
            /* href="/" */ onClick={() => history.push("/")}
            style={{ cursor: "pointer" }}
          >
            <img
              alt="icon"
              src={Icon}
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{" "}
            <strong>reindeer</strong>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link onClick={() => history.push("/features")}>
                Features
              </Nav.Link>
              <Nav.Link onClick={() => history.push("/pricing")}>
                Pricing
              </Nav.Link>
              <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
                <NavDropdown.Item onClick={() => history.push("/action/3.1")}>
                  Action
                </NavDropdown.Item>
                <NavDropdown.Item onClick={() => history.push("/action/3.2")}>
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Item onClick={() => history.push("/action/3.3")}>
                  Something
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={() => history.push("/action/3.4")}>
                  Separated link
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Nav>
              <Nav.Link onClick={() => history.push("/deets")}>
                More deets
              </Nav.Link>
              <Nav.Link eventKey={2} onClick={() => history.push("/memes")}>
                Dank memes
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default Header;
