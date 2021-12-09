import React from "react";
import { useHistory } from "react-router";
import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap";

import { styles } from "../config";
import Icon from "../assets/images/ReinDeer_logo.png";
import CartIcon from "../assets/images/shopping_cart_item.png";

function Header() {
  const history = useHistory();
  const { postitionRelWidthFull, navBarBrandStyle } = styles;
  const { navLinkBasicStyle, navDropDownStyle, navDropDownEveStyle } = styles;
  return (
    <>
      <Navbar
        style={postitionRelWidthFull}
        collapseOnSelect
        variant="dark"
        expand="lg"
        bg="dark"
        fluid
      >
        <Container fluid className="NavItems">
          <Navbar.Brand style={navBarBrandStyle}>
            <img
              className="d-inline-block align-top pt-2"
              onClick={() => history.push("/")}
              style={{ position: "fixed" }}
              width="100"
              height="30"
              alt="icon"
              src={Icon}
            />{" "}
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto"></Nav>
            <Nav
              className="ml-auto paddingLeft5"
              style={{ marginRight: "7rem" }}
            >
              <Nav.Link
                style={navLinkBasicStyle}
                onClick={() => history.push("/login")}
              >
                login
              </Nav.Link>
              <Nav.Link
                eventKey={2}
                className="float-right"
                style={navLinkBasicStyle}
                onClick={() => history.push("/register")}
              >
                register
              </Nav.Link>

              <NavDropdown
                title="en"
                id="basic-nav"
                style={navDropDownStyle}
              ></NavDropdown>

              <Nav.Link
                eventKey={2}
                className="float-end"
                style={navDropDownEveStyle}
                onClick={() => history.push("/Cart")}
              >
                <img
                  alt="icon"
                  width="24"
                  height="24"
                  src={CartIcon}
                  className="d-inline-block align-top"
                />
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default Header;
