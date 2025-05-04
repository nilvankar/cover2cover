import React, { useState } from 'react';
import { Navbar, Container, Button, Form, Offcanvas, } from 'react-bootstrap';
import { 
  House,
  InfoCircle,
  List,
} from 'react-bootstrap-icons';

const Header = ({darkMode}) => {
  const [showSidebar, setShowSidebar] = useState(false);

  const handleCloseSidebar = () => setShowSidebar(false);
  const handleShowSidebar = () => setShowSidebar(true);

  return (
    <>
      <Navbar bg={darkMode ? 'dark' : 'light'} variant={darkMode ? 'dark' : 'light'} expand="lg" sticky="top" className="shadow-sm">
        <Container fluid>
          {/* Sidebar Toggle Button */}
          <Button 
            variant="link" 
            onClick={handleShowSidebar}
            className="me-2 p-2"
            aria-label="Toggle navigation"
          >
            <List size={24} />
          </Button>

          

          <Navbar.Toggle aria-controls="navbarSearch" />

          <Navbar.Collapse id="navbarSearch">
            <Form className="d-flex mx-auto my-2 my-lg-0" style={{ maxWidth: '500px', width: '100%' }}>
              <Form.Control
                type="search"
                placeholder="Search students, reports..."
                className="me-2"
                aria-label="Search"
              />
              <Button variant="outline-primary">
                Search
              </Button>
            </Form>

          
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Sidebar Offcanvas */}
      <Offcanvas show={showSidebar} onHide={handleCloseSidebar} placement="start">
        <Offcanvas.Header closeButton>
          
        </Offcanvas.Header>
        <Offcanvas.Body>
          <nav className="nav flex-column">
            <a className="nav-link d-flex align-items-center py-3" href="/">
              <House className="me-2" /> Home
            </a>
            <a className="nav-link d-flex align-items-center py-3" href="/about">
              <InfoCircle className="me-2" /> About
            </a>
            
            <a className="nav-link d-flex align-items-center py-3" href="/recommend">
              <i className="bi bi-currency-dollar me-2"></i> Recommend
            </a>
           
          </nav>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default Header;