import React, { useState, useEffect } from 'react'
import { Card, Button, Row, Col, Alert, Spinner, Badge } from 'react-bootstrap'
import { courseService } from '../services/api'
import { useAuth } from '../context/AuthContext'

const CourseList = () => {
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { isAdmin } = useAuth()

  useEffect(() => {
    fetchCourses()
  }, [])

  const fetchCourses = async () => {
    try {
      const response = await courseService.getAllCourses()
      setCourses(response.data)
    } catch (err) {
      setError('Erreur lors du chargement des cours')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce cours ?')) {
      try {
        await courseService.deleteCourse(id)
        fetchCourses()
      } catch (err) {
        console.error('Erreur lors de la suppression:', err)
      }
    }
  }

  if (loading) {
    return (
      <div className="text-center my-5">
        <Spinner animation="border" variant="primary" />
        <p className="mt-2">Chargement des cours...</p>
      </div>
    )
  }

  if (error) {
    return <Alert variant="danger">{error}</Alert>
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Cours Disponibles</h2>
        {isAdmin && (
          <Button variant="success">
            <i className="bi bi-plus-circle me-1"></i>
            Nouveau Cours
          </Button>
        )}
      </div>

      {courses.length === 0 ? (
        <Alert variant="info">
          Aucun cours disponible pour le moment.
        </Alert>
      ) : (
        <Row xs={1} md={2} lg={3} className="g-4">
          {courses.map((course) => (
            <Col key={course.id}>
              <Card className="h-100 shadow-sm">
                <Card.Body>
                  <Card.Title>{course.title}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    {course.instructor}
                  </Card.Subtitle>
                  <Card.Text className="text-truncate">
                    {course.description}
                  </Card.Text>
                  <div className="mb-3">
                    <Badge bg="primary" className="me-1">
                      {course.duration}h
                    </Badge>
                    <Badge bg="secondary" className="me-1">
                      {course.category}
                    </Badge>
                    <Badge bg="success">
                      {course.price} €
                    </Badge>
                  </div>
                </Card.Body>
                <Card.Footer className="bg-transparent">
                  <div className="d-flex justify-content-between">
                    <Button variant="outline-primary" size="sm">
                      Détails
                    </Button>
                    {isAdmin && (
                      <div>
                        <Button
                          variant="outline-warning"
                          size="sm"
                          className="me-2"
                        >
                          Modifier
                        </Button>
                        <Button
                          variant="outline-danger"
                          size="sm"
                          onClick={() => handleDelete(course.id)}
                        >
                          Supprimer
                        </Button>
                      </div>
                    )}
                  </div>
                </Card.Footer>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </div>
  )
}

export default CourseList