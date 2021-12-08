import React from 'react'
import Icon from '../Images/ReinDeer_logo.png'
import CartIcon from '../Images/shopping_cart_item.png'
import { useHistory } from 'react-router'
import { Container, Navbar, Nav, NavDropdown } from 'react-bootstrap'
function Header() {
  const history = useHistory()
  return (
    <>
      <Navbar
        collapseOnSelect
        expand="lg"
        bg="dark"
        variant="dark"
        fluid
        style={{ position: 'relative', width: '100%' }}
      >
        <Container fluid className="NavItems">
          <Navbar.Brand
            style={{
              cursor: 'pointer',
              paddingLeft: '5rem',
              paddingBottom: '2.5rem',
              position: 'relative',
            }}
          >
            <img
              alt="icon"
              src={Icon}
              style={{ position: 'fixed' }}
              width="100"
              onClick={() => history.push('/')}
              height="30"
              className="d-inline-block align-top pt-2"
            />{' '}
            {/*             <strong>Reindeer</strong>
             */}
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />

          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto"></Nav>
            <Nav
              className="ml-auto paddingLeft5"
              style={{ marginRight: '7rem' }}
            >
              <Nav.Link
                style={{ width: '60px', backgroundColor: 'dark' }}
                onClick={() => history.push('/login')}
              >
                login
              </Nav.Link>
              <Nav.Link
                style={{ width: '60px', backgroundColor: 'dark' }}
                eventKey={2}
                onClick={() => history.push('/register')}
                className="float-right"
              >
                register
              </Nav.Link>

              <NavDropdown
                title="en"
                id="basic-nav"
                style={{ width: '60px', marginLeft: '20px' }}
              ></NavDropdown>

              <Nav.Link
                className="float-end"
                style={{ width: '50px', backgroundColor: 'dark' }}
                eventKey={2}
                onClick={() => history.push('/Cart')}
              >
                <img
                  alt="icon"
                  src={CartIcon}
                  width="24"
                  height="24"
                  className="d-inline-block align-top"
                />
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  )
}

export default Header
