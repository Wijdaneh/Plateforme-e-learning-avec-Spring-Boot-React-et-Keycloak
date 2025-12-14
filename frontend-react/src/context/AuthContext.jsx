import React, { createContext, useState, useContext, useEffect } from 'react';
import { 
  initKeycloak, 
  login, 
  logout, 
  isAuthenticated, 
  getToken,
  getUsername,
  getEmail,
  getFullName,
  getRoles,
  isAdmin,
  isStudent,
  updateToken
} from '../services/keycloak';

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Initialiser Keycloak
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const authenticated = await initKeycloak(() => {
          console.log('Authentication successful');
        });

        if (authenticated) {
          const userInfo = {
            username: getUsername(),
            email: getEmail(),
            fullName: getFullName(),
            roles: getRoles(),
            isAdmin: isAdmin(),
            isStudent: isStudent(),
            token: getToken()
          };
          setUser(userInfo);
          
          // Configurer le rafraîchissement automatique du token
          setInterval(() => {
            updateToken(30).then((refreshed) => {
              if (refreshed) {
                console.log('Token refreshed');
              }
            }).catch((error) => {
              console.error('Failed to refresh token:', error);
            });
          }, 30000); // Toutes les 30 secondes
        }
      } catch (error) {
        setError(error.message);
        console.error('Authentication error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  // Fonction de connexion
  const handleLogin = () => {
    login();
  };

  // Fonction de déconnexion
  const handleLogout = () => {
    logout();
  };

  // Vérifier l'authentification
  const checkAuth = () => {
    return isAuthenticated();
  };

  // Récupérer le token
  const getAuthToken = () => {
    return getToken();
  };

  const value = {
    user,
    isLoading,
    error,
    login: handleLogin,
    logout: handleLogout,
    isAuthenticated: checkAuth,
    getToken: getAuthToken
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};