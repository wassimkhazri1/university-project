import React from "react";
import { useNavigate } from "react-router-dom";

function Logout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    if (window.confirm("Êtes-vous sûr de vouloir vous déconnecter ?")) {
    // Supprimer les informations de l'utilisateur du localStorage
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    // Rediriger vers la page de connexion
    navigate("/iset/login");
    }
  };
//CreatedAndDevelopedByWassimKhazri
//https://www.linkedin.com/in/wassim-khazri-ab923a14b/ 
  return (
    <a href="" className="dropdown-item" onClick={handleLogout}>
      Logout
    </a>
  );
}

export default Logout;