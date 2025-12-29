import React from "react";
import "./CareerServices.css"; // Assure-toi que le style est bien défini ici
const services = [
  {
    title: "Conseil et orientation",
    image: "Conseil.jpg",
    description: `Vous allez faire un choix de parcours académique ou professionnel ? Prenez rendez-vous avec un conseiller d’orientation pour vous aider à faire le meilleur choix. Le conseiller d’orientation vous accompagne dans la recherche de formation, la sélection des établissements ou la définition de vos objectifs professionnels. Il vous aide également à rédiger votre CV, à rechercher un emploi, à postuler à des offres de stage, d’emploi, etc.`,
    button: "Prendre Rendez-Vous",
  },
  {
    title: "Formation et certification",
    image: "formation.jpeg",
    description: `Vous souhaitez renforcer vos compétences métier ? Découvrez les services de formation et de certification proposés par notre structure. Choisissez votre formation, suivez les cours et obtenez votre certification. Ces services sont destinés aux étudiants, aux professionnels et aux demandeurs d’emploi.`,
    button: "Participer",
  },
  {
    title: "Stage",
    image: "stage.jpg",
    description: `Vous êtes à la recherche d’un stage ? Découvrez les offres disponibles et n’hésitez pas à postuler à une ou plusieurs offres.`,
    button: "Postuler",
  },
  {
    title: "Emploi",
    image: "emploi.jpg",
    description: `Vous êtes bientôt diplômé(e) ou demandeur d’emploi ? Mettez à jour votre profil professionnel et postulez aux offres d’emploi disponibles. Vous pouvez également envoyer votre CV pour une candidature spontanée.`,
    button: "Postuler",
  },
  {
    title: "Événement",
    image: "evenement.jpg",
    description: `Vous souhaitez assister à un événement académique ? Découvrez ce que notre structure propose et inscrivez-vous pour participer aux événements organisés.`,
    button: "Participer",
  },
];

const CareerServices = () => {
  return (
    <div className="career-services">
      {services.map((service, index) => (
        <div key={index} className="service-card">
          <img
            src={require(`../../images/ISET/etudiant/${service.image}`)}
            alt={service.title}
            className="service-image"
          />
          <div className="service-content">
            <h2>{service.title}</h2>
            <p>{service.description}</p>
            <button className="service-button">{service.button}</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CareerServices;
