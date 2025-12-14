
# Sécurisation d'une Application E-Learning avec OAuth2/OpenID Connect

**Keycloak + React + Spring Boot**

---

## 📋 Table des Matières
- [Objectif Général](#objectif-général)
- [Contexte du Projet](#contexte-du-projet)
- [Architecture](#architecture)
- [Prérequis](#prérequis)
- [Installation et Configuration](#installation-et-configuration)
- [Structure du Projet](#structure-du-projet)
- [Guide d'Implémentation](#guide-dimplémentation)
- [API Endpoints](#api-endpoints)
- [Tests et Validation](#tests-et-validation)
- [Captures d'Écran](#captures-d'écran)
- [Dépannage](#dépannage)
- [Auteurs](#auteurs)
- [Licence](#licence)
- [Références](#références)
- [Objectifs pédagogiques](#objectifs-pédagogiques)

---

## 🎯 Objectif Général
Mettre en place une authentification moderne basée sur OAuth2 + OIDC dans une architecture composée :
- **Serveur d'identité** : Keycloak
- **Backend API** : Spring Boot
- **Frontend SPA** : React

L'objectif est de créer une plateforme E-Learning sécurisée où :
- **STUDENT** peut consulter les cours
- **ADMIN** peut gérer les cours

---

## 🏢 Contexte du Projet
L'université déploie une nouvelle plateforme e-learning. La sécurité, la gestion centralisée des utilisateurs et le Single Sign-On sont des exigences essentielles.

**Mission** :
- Configurer Keycloak
- Sécuriser Spring Boot avec OAuth2 Resource Server
- Intégrer React avec OIDC via keycloak-js
- Gérer les rôles et les accès aux différentes sections de l'application

---

## 🏗️ Architecture

```mermaid
graph TB
    A[Utilisateur] --> B[Application React]
    B --> C[Keycloak Server]
    C --> D[Authentification]
    D --> B
    B --> E[Spring Boot API]
    E --> F[(Base de données)]
    
    subgraph "Infrastructure"
        C
        E
        F
    end
    
    style A fill:#e1f5fe
    style B fill:#f3e5f5
    style C fill:#fff3e0
    style E fill:#e8f5e8
````

**Flux d'authentification** :

1. L'utilisateur accède à l'application React
2. Redirection vers Keycloak pour l'authentification
3. Keycloak retourne un JWT token
4. React utilise le token pour appeler l'API Spring Boot
5. Spring Boot valide le token auprès de Keycloak
6. Autorisation basée sur les rôles

---

## 📦 Prérequis

### Logiciels

* **Java** 17 ou supérieur
* **Node.js** 18 ou supérieur
* **Docker** et **Docker Compose**
* **Maven** 3.6+
* **Postman** (pour les tests API)

### Ports utilisés

* **Keycloak** : 8081
* **Spring Boot** : 8080
* **React** : 3000 (ou 5173 avec Vite)

---

## 🚀 Installation et Configuration

### 1. Cloner le projet

```bash
git clone https://github.com/Wijdaneh/Plateforme-e-learning-avec-Spring-Boot-React-et-Keycloak.git
cd Plateforme-e-learning-avec-Spring-Boot-React-et-Keycloak
```

### 2. Démarrer Keycloak avec Docker

```bash
cd keycloak
docker-compose up -d
```

### 3. Démarrer le backend Spring Boot

```bash
cd backend-springboot
mvn clean install
mvn spring-boot:run
```

### 4. Démarrer le frontend React

```bash
cd frontend-react
npm install
npm run dev
```

---

## 📁 Structure du Projet

```
Plateforme-e-learning-avec-Spring-Boot-React-et-Keycloak/
├── backend-springboot/
│   ├── src/main/java/com/elearning/
│   │   ├── config/
│   │   ├── controller/
│   │   ├── dto/
│   │   ├── model/
│   │   ├── repository/
│   │   └── service/
│   ├── src/main/resources/
│   │   ├── application.yml
│   │   ├── schema.sql
│   │   └── data.sql
│   └── pom.xml
├── frontend-react/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.jsx
│   │   └── index.jsx
│   ├── package.json
│   └── vite.config.js
├── keycloak/
│   ├── docker-compose.yml
│   └── realm-export.json
├── scripts/
│   ├── setup.ps1
│   ├── start-all.ps1
│   └── stop-all.ps1
└── README.md
```

---

## 🛠️ Guide d'Implémentation

### Partie 1 — Configuration Keycloak

1. Accéder à [http://localhost:8081](http://localhost:8081) avec `admin/admin`
2. Créer le Realm `elearning-realm`
3. Créer le client `react-client` (type Public, Redirect URI `http://localhost:3000/*`)
4. Créer les rôles `ROLE_ADMIN` et `ROLE_STUDENT`
5. Créer les utilisateurs :

   * `user1` → ROLE_STUDENT
   * `admin1` → ROLE_ADMIN

### Partie 2 — Configuration Spring Boot

1. Dépendances Maven : Web, Security, OAuth2 Resource Server, Data JPA
2. Configurer JWT avec issuer Keycloak
3. Endpoints :

   * GET `/api/courses` → STUDENT + ADMIN
   * POST `/api/courses` → ADMIN
   * GET `/api/me` → retourne claims token
4. Sécuriser avec `@PreAuthorize`

### Partie 3 — Configuration React

1. Installer `keycloak-js` et dépendances
2. Initialiser Keycloak dans `keycloak.js`
3. Créer `AuthContext.jsx` pour gérer authentification, rôles et logout
4. Protéger les pages :

   * Section Cours → STUDENT + ADMIN
   * Section Gestion des cours → ADMIN
5. Afficher informations utilisateur

### Partie 4 — Communication React → Spring Boot

1. Envoyer le token : `Authorization: Bearer <access_token>`
2. Gérer erreurs 401 (token invalide) et 403 (rôle insuffisant)
3. Redirection Keycloak si expiration

---

## 📡 API Endpoints

| Méthode | Endpoint            | Rôle requis    | Description              |
| ------- | ------------------- | -------------- | ------------------------ |
| GET     | `/api/courses`      | STUDENT, ADMIN | Liste des cours          |
| GET     | `/api/courses/{id}` | STUDENT, ADMIN | Détails d'un cours       |
| POST    | `/api/courses`      | ADMIN          | Créer un cours           |
| PUT     | `/api/courses/{id}` | ADMIN          | Modifier un cours        |
| DELETE  | `/api/courses/{id}` | ADMIN          | Supprimer un cours       |
| GET     | `/api/me`           | STUDENT, ADMIN | Informations utilisateur |

Exemple réponse `/me` :

```json
{
    "username": "user1",
    "email": "user1@univ.fr",
    "firstName": "John",
    "lastName": "Doe",
    "roles": ["ROLE_STUDENT"]
}
```

---

## 🧪 Tests et Validation

1. Obtenir token via Postman :

```http
POST http://localhost:8081/realms/elearning-realm/protocol/openid-connect/token
Content-Type: application/x-www-form-urlencoded
grant_type=password&client_id=react-client&username=user1&password=votremotdepasse
```

2. Tester API avec token :

```http
GET http://localhost:8080/api/courses
Authorization: Bearer <access_token>
```

3. Vérifier rôles :

* STUDENT : accès GET ✅, POST ❌
* ADMIN : accès GET ✅, POST ✅

---

## 📸 Captures d'Écran

* Page login Keycloak
* Interface React STUDENT
* Interface React ADMIN
* Réponse API `/me`

---

## 🔧 Dépannage

* Keycloak ne démarre pas : vérifier ports, Docker logs
* Erreur CORS : vérifier configuration Spring Boot
* Token expiré : configurer refresh automatique
* Erreur 403 : vérifier rôles et annotations `@PreAuthorize`

---

## 👥 Auteurs

* **Wijdane H.** - Développement et documentation
* **Université** - Projet académique

---

## 📄 Licence

Usage réservé à des fins éducatives.

---

## 📚 Références

* [Keycloak Documentation](https://www.keycloak.org/documentation)
* [Spring Security OAuth2](https://docs.spring.io/spring-security/reference/servlet/oauth2/index.html)
* [React Keycloak Adapter](https://www.npmjs.com/package/keycloak-js)
* [OpenID Connect Specification](https://openid.net/connect/)

---

## 🎓 Objectifs pédagogiques

* Compréhension d'OAuth2 et OpenID Connect
* Configuration Keycloak
* Sécurisation API Spring Boot avec JWT
* Intégration OIDC dans React
* Gestion des rôles et autorisations
* Mise en œuvre SSO
* Tests sécurité avec Postman

---

