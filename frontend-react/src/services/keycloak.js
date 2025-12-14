import Keycloak from 'keycloak-js';

// Configuration Keycloak
const keycloakConfig = {
  url: 'http://localhost:8081',
  realm: 'elearning-realm',
  clientId: 'react-client'
};

// Créer l'instance Keycloak
const keycloak = new Keycloak(keycloakConfig);

// Initialiser Keycloak
export const initKeycloak = (onAuthenticatedCallback) => {
  return keycloak.init({
    onLoad: 'check-sso',
    silentCheckSsoRedirectUri: window.location.origin + '/silent-check-sso.html',
    pkceMethod: 'S256',
    checkLoginIframe: false
  })
  .then((authenticated) => {
    if (authenticated) {
      console.log('User is authenticated');
      if (onAuthenticatedCallback) {
        onAuthenticatedCallback();
      }
    } else {
      console.log('User is not authenticated');
    }
    return authenticated;
  })
  .catch((error) => {
    console.error('Failed to initialize Keycloak:', error);
    return false;
  });
};

// Fonctions d'authentification
export const login = () => {
  return keycloak.login({
    redirectUri: window.location.origin
  });
};

export const logout = () => {
  return keycloak.logout({
    redirectUri: window.location.origin
  });
};

export const register = () => {
  return keycloak.register();
};

// Gestion du token
export const getToken = () => {
  return keycloak.token;
};

export const isAuthenticated = () => {
  return keycloak.authenticated;
};

export const updateToken = (minValidity = 5) => {
  return keycloak.updateToken(minValidity);
};

// Récupérer les informations utilisateur
export const getUserInfo = () => {
  return keycloak.loadUserInfo();
};

export const getUsername = () => {
  return keycloak.tokenParsed?.preferred_username;
};

export const getEmail = () => {
  return keycloak.tokenParsed?.email;
};

export const getFullName = () => {
  return keycloak.tokenParsed?.name;
};

export const getFirstName = () => {
  return keycloak.tokenParsed?.given_name;
};

export const getLastName = () => {
  return keycloak.tokenParsed?.family_name;
};

// Gestion des rôles
export const getRoles = () => {
  return keycloak.tokenParsed?.realm_access?.roles || [];
};

export const hasRole = (role) => {
  return keycloak.hasRealmRole(role);
};

export const hasAnyRole = (roles) => {
  return roles.some(role => keycloak.hasRealmRole(role));
};

export const isAdmin = () => {
  return hasRole('admin') || hasRole('ADMIN');
};

export const isStudent = () => {
  return hasRole('student') || hasRole('STUDENT');
};

// Exporter l'instance Keycloak
export default keycloak;