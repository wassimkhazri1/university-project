import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, requiredRole }) => {
  // Récupérer les informations de l'utilisateur depuis le localStorage
  const user = JSON.parse(localStorage.getItem("user"));

  // Vérifier si l'utilisateur est connecté et a le bon rôle
  if (!user || !user.token) {
    return <Navigate to="/iset/login" />; // Rediriger vers la page de connexion
  }

  if (requiredRole && !user.roles.includes(requiredRole)) {
    return <Navigate to="/unauthorized" />; // Rediriger vers une page "Non autorisé"
  }

  return children; // Rendre le composant enfant si tout est OK
};

export default ProtectedRoute;
//CreatedAndDevelopedByWassimKhazri
//https://www.linkedin.com/in/wassim-khazri-ab923a14b/ 