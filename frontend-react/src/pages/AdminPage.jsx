import React from 'react'
import { Container, Alert } from 'react-bootstrap'
import AdminPanel from '../components/AdminPanel'
import ProtectedRoute from '../components/ProtectedRoute'
import { useAuth } from '../context/AuthContext'

const AdminPage = () => {
  const { isAdmin } = useAuth()

  if (!isAdmin) {
    return (
      <Container className="py-5">
        <Alert variant="danger">
          <h4 className="alert-heading">Accès Refusé</h4>
          <p>Vous devez être administrateur pour accéder à cette page.</p>
        </Alert>
      </Container>
    )
  }

  return (
    <ProtectedRoute requiredRoles={['ROLE_ADMIN']}>
      <Container className="py-4">
        <AdminPanel />
      </Container>
    </ProtectedRoute>
  )
}

export default AdminPage