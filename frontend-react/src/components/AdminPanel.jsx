import React, { useState } from 'react'
import { Card, Tabs, Tab, Alert } from 'react-bootstrap'
import CourseForm from './CourseForm'

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('courses')

  const handleCourseCreated = () => {
    console.log('Cours créé avec succès')
  }

  return (
    <div>
      <h2 className="mb-4">Panneau d'Administration</h2>
      
      <Tabs
        activeKey={activeTab}
        onSelect={(k) => setActiveTab(k)}
        className="mb-3"
      >
        <Tab eventKey="courses" title="Gestion des Cours">
          <div className="mt-4">
            <Card className="shadow mb-4">
              <Card.Body>
                <Card.Title>Créer un Nouveau Cours</Card.Title>
                <CourseForm onSuccess={handleCourseCreated} />
              </Card.Body>
            </Card>
          </div>
        </Tab>
        
        <Tab eventKey="stats" title="Statistiques">
          <div className="mt-4">
            <Alert variant="info">
              Statistiques de la plateforme - Fonctionnalité en développement
            </Alert>
          </div>
        </Tab>
      </Tabs>
    </div>
  )
}

export default AdminPanel