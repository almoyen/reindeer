import React from "react";
import Icon from "../Images/Icon.svg";
import { useHistory } from "react-router";
import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap";
import { Cart } from "react-bootstrap-icons";
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
            <Nav className="ml-auto paddingLeft5" pullRight>
              {/* <Nav.Link
                style={{ width: "60px", backgroundColor: "dark" }}
                onClick={() => history.push("/login")}
              >
                login
              </Nav.Link> */}
              <Nav.Link
                style={{ width: "60px", backgroundColor: "dark" }}
                eventKey={2}
                onClick={() => history.push("/register")}
                className="float-right"
              >
                register
              </Nav.Link>
              {/* <Nav.Link
                style={{ width: "40px", backgroundColor: "dark" }}
                eventKey={2}
                className="float-right"
              >
                en
              </Nav.Link> */}
              {/* <NavDropdown
                alignRight
                style={{ width: "50px", backgroundColor: "dark" }}
                title="en"
                id="basic-nav-dropdown-pull-righ"
              >
                <NavDropdown.Item
                  style={{ width: "50px", backgroundColor: "dark" }}
                  href="#action/3.1"
                >
                  fi
                </NavDropdown.Item>
              </NavDropdown> */}
              <NavDropdown
                alignLeft
                title="en"
                id="basic-nav-dropdown"
                style={{ width: "60px", marginLeft: "20px" }}
              >
                <NavDropdown.Item
                  style={{ right: "auto", left: "auto" }}
                  href="#action/3.1"
                >
                  fi
                </NavDropdown.Item>{" "}
              </NavDropdown>

              <Nav.Link
                className="float-end"
                style={{ width: "50px", backgroundColor: "dark" }}
                eventKey={2}
                onClick={() => history.push("/Cart")}
              >
                <Cart size={25} />
              </Nav.Link>
              <Nav.Link
                style={{ width: "60px", backgroundColor: "dark" }}
                onClick={() => history.push("/login")}
              >
                login
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default Header;
