  <Navbar bg="light" sticky="top">

    <Navbar.Brand>
		  {menuLateral}
          <a class="navbar-brand cool logo" href="#">
          {/*<ModalMenu signOut={this.signOut}/>*/}
            <span>SuperHeroes App</span>
          </a>
    </Navbar.Brand>
    <Nav className="me-auto">
        <Nav.Link href="#home">Home</Nav.Link>
        <Nav.Link href="#link">Link</Nav.Link>
    </Nav>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="ml-auto cool">
    {
      this.state.login 
      ? (
        <>
            Estás logueado
            {/*<ModalCog signOut={this.signOut}/>*/}
        </>
      ) :
        <>
        No estás logueado
        </>
    }
    </Nav>
  </Navbar.Collapse>
</Navbar>

