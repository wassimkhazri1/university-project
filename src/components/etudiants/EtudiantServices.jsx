import React from "react";
import "./EtudiantServices.css";
import conseil from "../../images/ISET/etudiant/Conseil.jpg";
import formation from "../../images/ISET/etudiant/formation.jpeg";
import stage from "../../images/ISET/etudiant/stage.jpg";
import emploi from "../../images/ISET/etudiant/emploi.jpg";
import evenement from "../../images/ISET/etudiant/evenement.jpg";

const services = [
  {
    title: "Conseil et orientation",
    text: "Vous êtes futur étudiant ou en poursuite professionnelle ? Prenez rendez-vous avec nos conseillers pour vous aider à la réflexion et au choix académique.",
    image: conseil,
    button: "Prendre Rendez-Vous",
  },
  {
    title: "Formation et certification",
    text: "Vous voulez renforcer vos compétences avec nos formations et certifications proposées pour faciliter votre intégration dans le monde professionnel.",
    image: formation,
    button: "Participer",
  },
  {
    title: "Stage",
    text: "Vous êtes à la recherche d’un stage ? Découvrez nos offres disponibles et postulez à plusieurs opportunités.",
    image: stage,
    button: "Postuler",
  },
  {
    title: "Emploi",
    text: "Vous êtes à la recherche d’un emploi ? Accédez à des offres adaptées à votre formation.",
    image: emploi,
    button: "Postuler",
  },
  {
    title: "Événement",
    text: "Découvrez nos événements à venir pour enrichir votre parcours académique et professionnel.",
    image: evenement,
    button: "Participer",
  },
];

export default function EtudiantServices() {
  return (
    <section className="services-container">
      {services.map((item, index) => (
        <div className="service-card" key={index}>
          <img src={item.image} alt={item.title} />
          <div className="service-content">
            <h3>{item.title}</h3>
            <p>{item.text}</p>
            <button>{item.button}</button>
          </div>
        </div>
      ))}
    </section>
  );
}
