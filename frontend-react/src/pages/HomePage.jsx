import React from 'react'
import { Container, Card, Row, Col, Badge } from 'react-bootstrap'
import { useAuth } from '../context/AuthContext'

const HomePage = () => {
  const { user, isAdmin, isStudent } = useAuth()

  return (
    <Container className="py-5">
      <div className="text-center mb-5">
        <h1 className="display-4 mb-3">Bienvenue sur la Plateforme E-Learning</h1>
        <p className="lead">
          Une plateforme sécurisée pour l'apprentissage en ligne
        </p>
      </div>

      <Row className="g-4 mb-5">
        <Col md={4}>
          <Card className="h-100 shadow border-0">
            <Card.Body className="text-center">
              <div className="mb-3">
                <i className="bi bi-shield-lock" style={{ fontSize: '3rem', color: '#4361ee' }}></i>
              </div>
              <Card.Title>Sécurité</Card.Title>
              <Card.Text>
                Authentification centralisée avec Keycloak
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={4}>
          <Card className="h-100 shadow border-0">
            <Card.Body className="text-center">
              <div className="mb-3">
                <i className="bi bi-people" style={{ fontSize: '3rem', color: '#4CAF50' }}></i>
              </div>
              <Card.Title>Rôles et Permissions</Card.Title>
              <Card.Text>
                Gestion fine des accès avec rôles
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={4}>
          <Card className="h-100 shadow border-0">
            <Card.Body className="text-center">
              <div className="mb-3">
                <i className="bi bi-lightning" style={{ fontSize: '3rem', color: '#FF9800' }}></i>
              </div>
              <Card.Title>Technologies Modernes</Card.Title>
              <Card.Text>
                React, Spring Boot, OAuth2
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {user && (
        <Card className="shadow">
          <Card.Body>
            <Card.Title>Vos Informations</Card.Title>
            <Row>
              <Col md={6}>
                <p><strong>Nom complet :</strong> {user.given_name} {user.family_name}</p>
                <p><strong>Email :</strong> {user.email}</p>
                <p><strong>Rôles :</strong></p>
                <div>
                  {isAdmin && (
                    <Badge bg="danger" className="me-2">ADMINISTRATEUR</Badge>
                  )}
                  {isStudent && (
                    <Badge bg="success">ÉTUDIANT</Badge>
                  )}
                </div>
              </Col>
              <Col md={6}>
                <p><strong>Permissions :</strong></p>
                <ul>
                  <li>Consulter les cours ✓</li>
                  {isAdmin && <li>Gérer les cours ✓</li>}
                  {isAdmin && <li>Panneau admin ✓</li>}
                </ul>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      )}
    </Container>
  )
}

export default HomePage