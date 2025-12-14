import { initKeycloak, getToken, logout, updateToken, loadUserInfo } from './keycloak'

export const initializeAuth = (onAuthenticated, onError) => {
  return initKeycloak(onAuthenticated, onError)
}

export const getAuthToken = () => getToken()

export const userLogout = () => logout()

export const refreshToken = () => updateToken()

export const getUserProfile = () => loadUserInfo()

export const hasRole = (roles, requiredRole) => {
  return roles.includes(requiredRole)
}

export const isAdmin = (roles) => {
  return hasRole(roles, 'ROLE_ADMIN')
}

export const isStudent = (roles) => {
  return hasRole(roles, 'ROLE_STUDENT')
}