import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Container, Navbar, NavDropdown, Nav } from 'react-bootstrap';
import logo from '../logoBatman1.png';


class AppNavbar extends Component {
    render() {
        let name = <>Hola <b>Usuario</b></>;
        return (
            <Navbar bg="dark" variant="dark" expand="sm" fixed="top">
              <Container>
                <Navbar.Brand as={Link} to="/">
                    <span>
                        <img src={logo} alt='logo' width={50}/> SuperHeroChallenge
                    </span>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                  <Nav className="me-auto">
                    <Nav.Link as={Link} to="/">Inicio</Nav.Link>
                    <Nav.Link as={Link} to="/buscar">Buscar</Nav.Link>
                  </Nav>
                  <Nav className="ml-auto cool">
                {
                  this.props.estaAutenticado
                  ? (
                    <>
                    <NavDropdown title={name} id="basic-nav-dropdown">
                      <NavDropdown.Item onClick={this.props.salir}>Salir</NavDropdown.Item>
                    </NavDropdown>
                    </>
                  ) :
                    <Nav.Link href="#">Hola Anónimo</Nav.Link>
                }
                  </Nav>
                </Navbar.Collapse>
              </Container>
            </Navbar>
        );
    }
}

export default AppNavbar;
