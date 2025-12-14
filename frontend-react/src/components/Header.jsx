import React from 'react'
import { Navbar, Nav, Container, Button, Badge } from 'react-bootstrap'
import { useAuth } from '../context/AuthContext'

const Header = () => {
  const { user, logout, isAdmin, isStudent } = useAuth()

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
      <Container>
        <Navbar.Brand href="/">
          <i className="bi bi-mortarboard-fill me-2"></i>
          Plateforme E-Learning
        </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Accueil</Nav.Link>
            <Nav.Link href="/courses">Cours</Nav.Link>
            {isAdmin && (
              <Nav.Link href="/admin">Administration</Nav.Link>
            )}
          </Nav>
          
          {user && (
            <div className="d-flex align-items-center">
              <div className="text-light me-3">
                <small>Connecté en tant que</small>
                <div className="fw-bold">
                  {user.given_name} {user.family_name}
                  {isAdmin && (
                    <Badge bg="danger" className="ms-2">ADMIN</Badge>
                  )}
                  {isStudent && !isAdmin && (
                    <Badge bg="success" className="ms-2">ÉTUDIANT</Badge>
                  )}
                </div>
              </div>
              <Button variant="outline-light" size="sm" onClick={logout}>
                <i className="bi bi-box-arrow-right me-1"></i>
                Déconnexion
              </Button>
            </div>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header