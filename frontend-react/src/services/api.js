import axios from 'axios';
import { getToken, updateToken, login } from './keycloak';

// Configuration de base d'Axios
const api = axios.create({
  baseURL: 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Intercepteur pour ajouter le token JWT
api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Intercepteur pour gérer les erreurs d'authentification
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Si erreur 401 (non autorisé)
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Rafraîchir le token
        const refreshed = await updateToken(5);
        if (refreshed) {
          // Mettre à jour le token dans la requête
          const newToken = getToken();
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          
          // Réessayer la requête originale
          return axios(originalRequest);
        } else {
          // Rediriger vers la page de login
          login();
          return Promise.reject(new Error('Session expired. Please login again.'));
        }
      } catch (refreshError) {
        console.error('Token refresh failed:', refreshError);
        login();
        return Promise.reject(refreshError);
      }
    }

    // Si erreur 403 (interdit)
    if (error.response?.status === 403) {
      console.error('Access forbidden. Insufficient permissions.');
      // Vous pouvez rediriger vers une page d'erreur 403 ici
      // window.location.href = '/forbidden';
    }

    return Promise.reject(error);
  }
);

// Fonctions pour les cours
export const courseAPI = {
  // Récupérer tous les cours (public)
  getAllCourses: () => api.get('/courses'),
  
  // Récupérer un cours par ID (authentifié)
  getCourseById: (id) => api.get(`/courses/${id}`),
  
  // Créer un nouveau cours (admin seulement)
  createCourse: (courseData) => api.post('/courses', courseData),
  
  // Mettre à jour un cours (admin seulement)
  updateCourse: (id, courseData) => api.put(`/courses/${id}`, courseData),
  
  // Supprimer un cours (admin seulement)
  deleteCourse: (id) => api.delete(`/courses/${id}`),
  
  // Rechercher des cours (authentifié)
  searchCourses: (keyword) => api.get(`/courses/search?keyword=${keyword}`),
  
  // Récupérer les cours par catégorie (authentifié)
  getCoursesByCategory: (category) => api.get(`/courses/category/${category}`)
};

// Fonctions d'authentification
export const authAPI = {
  // Récupérer les informations de l'utilisateur connecté
  getCurrentUser: () => api.get('/auth/me'),
  
  // Tester l'accès admin
  testAdminAccess: () => api.get('/auth/test-admin'),
  
  // Tester l'accès étudiant
  testStudentAccess: () => api.get('/auth/test-student')
};

// Fonctions utilitaires pour vérifier les permissions
export const checkPermissions = {
  canViewCourses: async () => {
    try {
      const response = await authAPI.getCurrentUser();
      const roles = response.data.roles || [];
      return roles.includes('STUDENT') || roles.includes('ADMIN') || roles.includes('student') || roles.includes('admin');
    } catch (error) {
      return false;
    }
  },
  
  canManageCourses: async () => {
    try {
      const response = await authAPI.getCurrentUser();
      const roles = response.data.roles || [];
      return roles.includes('ADMIN') || roles.includes('admin');
    } catch (error) {
      return false;
    }
  }
};

export default api;