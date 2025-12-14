import React from 'react'
import { Container } from 'react-bootstrap'
import CourseList from '../components/CourseList'
import ProtectedRoute from '../components/ProtectedRoute'

const CoursesPage = () => {
  return (
    <ProtectedRoute requiredRoles={['ROLE_STUDENT', 'ROLE_ADMIN']}>
      <Container className="py-4">
        <CourseList />
      </Container>
    </ProtectedRoute>
  )
}

export default CoursesPage