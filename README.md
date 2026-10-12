# 🎓 University Manager — Application de Gestion Universitaire

Application full-stack de gestion universitaire développée avec **Spring Boot 3** et **Java 17**.
Elle couvre la gestion des étudiants, des notes, des absences, la génération d'attestations PDF,
l'export Excel, un chat temps réel et un assistant IA intégré.

> Développé par **Wassim Khazri** — [LinkedIn](https://www.linkedin.com/in/wassim-khazri-ab923a14b/) | [GitHub](https://github.com/wassimkhazri1)

---

## ✨ Fonctionnalités principales

- 👨‍🎓 **Gestion des étudiants** : CRUD complet (création, modification, suppression, recherche)
- 📊 **Gestion des notes** : saisie, calcul de moyennes, consultation par étudiant
- 📅 **Gestion des absences** : suivi et justification
- 📄 **Génération d'attestations PDF** (iText)
- 📈 **Export Excel** des données (Apache POI)
- 💬 **Chat temps réel** (WebSocket + STOMP + SockJS)
- 🤖 **Chatbot IA** intégré (Spring WebFlux)
- 🔐 **Authentification sécurisée JWT** (Spring Security + JJWT)
- 📰 **NewsTicker** pour les annonces

---

## 🛠️ Stack technique

| Couche | Technologies |
|---|---|
| **Backend** | Java 17, Spring Boot 3.3.3, Spring Web, Spring Data JPA, Spring Security, Spring WebFlux |
| **Sécurité** | JWT (jjwt 0.11.5), Spring Security |
| **Temps réel** | WebSocket, STOMP, SockJS |
| **Base de données** | MySQL |
| **Génération documents** | iText PDF, Apache POI (Excel) |
| **Validation** | Jakarta Validation |
| **Build** | Maven |
| **Tests** | JUnit, Spring Boot Test, Spring Security Test |
| **Autres** | Lombok |

---

## 🚀 Lancement du projet

### Prérequis
- Java 17+
- Maven 3.8+
- MySQL 8+

### Étapes

```bash
# 1. Cloner le projet
git clone https://github.com/wassimkhazri1/university-project
cd university-project

# 2. Configurer la base de données dans src/main/resources/application.properties
#    spring.datasource.url=jdbc:mysql://localhost:3306/university_db
#    spring.datasource.username=VOTRE_USER
#    spring.datasource.password=VOTRE_PASSWORD

## 🎨 Frontend
Le frontend React est disponible sur la branche [`frontend`](https://github.com/wassimkhazri1/university-project/tree/frontend).
# 3. Lancer l'application
./mvnw spring-boot:run
