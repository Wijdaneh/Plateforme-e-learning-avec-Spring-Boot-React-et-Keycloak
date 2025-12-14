import React, { useState } from 'react'
import { Form, Button, Alert, Card, Row, Col } from 'react-bootstrap'
import { courseService } from '../services/api'

const CourseForm = ({ course, onSuccess }) => {
  const [formData, setFormData] = useState({
    title: course?.title || '',
    description: course?.description || '',
    instructor: course?.instructor || '',
    duration: course?.duration || 10,
    category: course?.category || 'Programming',
    price: course?.price || 0
  })
  
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: name === 'duration' || name === 'price' ? Number(value) : value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      if (course?.id) {
        await courseService.updateCourse(course.id, formData)
      } else {
        await courseService.createCourse(formData)
      }
      setSuccess(true)
      if (onSuccess) onSuccess()
      
      setTimeout(() => {
        if (!course?.id) {
          setFormData({
            title: '',
            description: '',
            instructor: '',
            duration: 10,
            category: 'Programming',
            price: 0
          })
        }
        setSuccess(false)
      }, 3000)
    } catch (err) {
      setError(err.response?.data?.message || 'Erreur lors de l\'enregistrement')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="shadow">
      <Card.Body>
        <Card.Title className="mb-4">
          {course?.id ? 'Modifier le Cours' : 'Créer un Nouveau Cours'}
        </Card.Title>
        
        {error && <Alert variant="danger">{error}</Alert>}
        {success && (
          <Alert variant="success">
            Cours {course?.id ? 'modifié' : 'créé'} avec succès !
          </Alert>
        )}

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Titre du Cours</Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              placeholder="Ex: Java Programming"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              placeholder="Description détaillée du cours"
            />
          </Form.Group>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Instructeur</Form.Label>
                <Form.Control
                  type="text"
                  name="instructor"
                  value={formData.instructor}
                  onChange={handleChange}
                  required
                  placeholder="Nom de l'instructeur"
                />
              </Form.Group>
            </Col>
            
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Catégorie</Form.Label>
                <Form.Select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                >
                  <option value="Programming">Programmation</option>
                  <option value="Backend">Backend</option>
                  <option value="Frontend">Frontend</option>
                  <option value="Database">Base de données</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Durée (heures)</Form.Label>
                <Form.Control
                  type="number"
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  min="1"
                  max="200"
                  required
                />
              </Form.Group>
            </Col>
            
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Prix (€)</Form.Label>
                <Form.Control
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  min="0"
                  step="0.01"
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <div className="d-flex justify-content-end">
            <Button
              variant="primary"
              type="submit"
              disabled={loading}
            >
              {loading ? 'Enregistrement...' : 
               course?.id ? 'Modifier' : 'Créer le Cours'}
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  )
}

export default CourseForm