# 🎨 University Manager — Frontend React

Interface utilisateur de l'application **University Manager**, développée avec **React** (Create React App) et connectée à l'API REST Spring Boot.

> Partie du projet full-stack **University Manager** par [Wassim Khazri](https://github.com/wassimkhazri1)

---

## ✨ Fonctionnalités

- 🔐 Authentification JWT (login, gestion du token)
- 👨‍🎓 Interface de gestion des étudiants (liste, création, édition, suppression)
- 📊 Saisie et consultation des notes
- 📅 Suivi des absences
- 📄 Téléchargement des attestations PDF
- 📈 Export Excel depuis l'interface
- 💬 Chat temps réel (WebSocket + STOMP + SockJS)
- 🤖 Interface du chatbot IA
- 📰 NewsTicker pour les annonces

---

## 🛠️ Stack technique

| Élément | Techno |
|---|---|
| Framework | React |
| Bootstrap | Create React App |
| Langage | JavaScript (ES6+) |
| Appels API | Fetch / Axios vers backend Spring Boot |
| Communication temps réel | STOMP + SockJS |
| Package manager | npm |

---

## 🚀 Lancement

### Prérequis
- Node.js 18+
- npm
- Le **backend Spring Boot** doit tourner sur `http://localhost:8080`

### Étapes

```bash
# 1. Installer les dépendances
npm install

# 2. Lancer en mode développement
npm start
```
L'application sera accessible sur `http://localhost:3000`.

### Build production

```bash
npm run build
```
Le build optimisé sera dans le dossier `build/`.

---

## 📁 Structure

```
frontend/
├── public/
├── src/
│   ├── components/     # Composants réutilisables
│   ├── pages/          # Pages de l'application
│   ├── services/       # Appels API (fetch/axios)
│   └── ...
└── package.json
```

---

## 🔗 Backend associé

Le backend est disponible sur la branche `main` :
👉 [github.com/wassimkhazri1/university-project](https://github.com/wassimkhazri1/university-project)

---

## 👤 Auteur

**Wassim Khazri**
- 📧 wassim_khazri@hotmail.fr
- 💼 [LinkedIn](https://www.linkedin.com/in/wassim-khazri-ab923a14b/)
- 🐙 [GitHub](https://github.com/wassimkhazri1)
