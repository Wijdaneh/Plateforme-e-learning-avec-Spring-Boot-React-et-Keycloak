# 🎓 Plateforme E-Learning Sécurisée

## 📋 Description
Application d'e-learning moderne avec authentification OAuth2/OpenID Connect utilisant Keycloak, Spring Boot et React.

## 🏗 Architecture
- **Frontend**: React avec Keycloak JS
- **Backend**: Spring Boot avec Spring Security OAuth2
- **Authentification**: Keycloak (OIDC)
- **Base de données**: H2 (développement)

## 🚀 Installation

### Prérequis
- Docker & Docker Compose
- Java 17+
- Node.js 18+
- Maven

### Étapes
1. **Keycloak**: `cd keycloak && docker-compose up -d`
2. **Backend**: `cd backend-springboot && mvn spring-boot:run`
3. **Frontend**: `cd frontend-react && npm install && npm run dev`

## 🔗 URLs
- **Application**: http://localhost:3000
- **API Backend**: http://localhost:8081/api
- **Keycloak Admin**: http://localhost:8080/admin (admin/admin)
- **Swagger UI**: http://localhost:8081/api/swagger-ui.html

## 👥 Utilisateurs de test
- **Admin**: admin1 / password
- **Étudiant**: user1 / password