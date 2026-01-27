import React from "react";
import { useNavigate } from "react-router-dom";
import Block2 from "../../components/blocks/Block2";
import "./BienvenueSection.css";

function BienvenueSection() {
  const token = localStorage.getItem("token");
  const roles = JSON.parse(localStorage.getItem("user")) || [];
  const isAdmin = roles.roles?.includes("ROLE_ADMIN"); // Vérifie si ROLE_ADMIN est présent
  const isProf = roles.roles?.includes("ROLE_PROF"); // Vérifie si ROLE_PROF est présent
  const isStudent = roles.roles?.includes("ROLE_STUDENT"); // Vérifie si ROLE_STUDENT est présent
  const isEntreprise = roles.roles?.includes("ROLE_ENTREPRISE");
  const navigate = useNavigate();
  const handleClick = () => {
    // Si vous êtes déjà sur la page d'accueil
    const aboutElement = document.getElementById("about");
    if (aboutElement) {
      aboutElement.scrollIntoView({ behavior: "smooth" });
    } else {
      // Sinon, naviguer puis défilement
      navigate("/");
      // Attendre que la page soit chargée
      setTimeout(() => {
        const element = document.getElementById("about");
        if (element) element.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  };
  return (
    <>
      {!token && !isStudent && !isAdmin && !isProf && !isEntreprise ? (
        <section>
          <Block2 />
        </section>
      ) : (
        <section className="hero1">
          <h1 className="fade-in">Bienvenue à l'ISET de Jendouba</h1>
          <p className="slide-up">
            Institut Supérieur des Études Technologiques
          </p>
          <button onClick={handleClick} className="cta-button">
            <h1 className="fade-in">En savoir plus</h1>
          </button>
        </section>
      )}
    </>
  );
}
{
  /* 
//CreatedAndDevelopedByWassimKhazri
//https://www.linkedin.com/in/wassim-khazri-ab923a14b/ 
*/
}
export default BienvenueSection;
