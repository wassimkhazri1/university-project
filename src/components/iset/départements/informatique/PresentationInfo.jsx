import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./PresentationInfo.css";

function PresentationInfo() {
  return (
    <div className="hero text-start p-4">
      <div style={{ display: "flex", alignItems: "center" }}>
        {" "}
        <h1
          className="mb-4"
          style={{
            color: "#0d3e5f",
          }}
        >
          <em>
            <span style={{ marginRight: "8px" }}>
              Technologies de l'Informatique
            </span>{" "}
          </em>
        </h1>
        <hr
          style={{
            flexGrow: 1,
            height: "3px",
            backgroundColor: "#0d3e5f",
            border: "none",
          }}
        />{" "}
      </div>
      <div className="container">
        {/* Parcours DSI */}
        <section className="mb-4">
          {/* <h4 className="text-primary"> */}
          <h4 style={{ color: "#0d3e5f" }}>
            Parcours : Développement des Systèmes d’Information (DSI)
          </h4>
          <h6 className="fw-bold mt-2">Métiers visés :</h6>
          <ul>
            <li>Développeur d’Applications de gestion</li>
            <li>Développeur de sites Web et mobile</li>
            <li>Développeur Multimédia</li>
            <li>Développeur de bases de données</li>
            <li>Technico-commercial en solutions logicielles</li>
          </ul>
          <h6 className="fw-bold mt-2">Compétences recherchées :</h6>
          <ul>
            <li>Analyse et conception des systèmes d’information</li>
            <li>Développement de bases de données</li>
            <li>Applications de gestion et multimédia</li>
            <li>Sites Web dynamiques</li>
            <li>Rédaction de cahier des charges et dossiers techniques</li>
            <li>Formation des utilisateurs</li>
          </ul>
        </section>

        {/* Parcours RSI */}
        <section className="mb-4">
          {/* <h4 className="text-primary"> */}
          <h4 style={{ color: "#0d3e5f" }}>
            Parcours : Réseaux et Services Informatiques (RSI)
          </h4>
          <h6 className="fw-bold mt-2">Métiers visés :</h6>
          <ul>
            <li>Administrateur réseaux</li>
            <li>Administrateur systèmes</li>
            <li>Architecte réseaux et systèmes</li>
          </ul>
          <h6 className="fw-bold mt-2">Compétences recherchées :</h6>
          <ul>
            <li>Mettre en œuvre et optimiser un réseau local</li>
            <li>Installer et configurer des ressources réseaux</li>
            <li>Politique de sécurisation d’un réseau</li>
            <li>Maintenance de logiciels et applications distribuées</li>
          </ul>
        </section>

        {/* Parcours MDW */}
        <section className="mb-4">
          {/* <h4 className="text-primary"> */}
          <h4 style={{ color: "#0d3e5f" }}>
            Parcours : Multimédia et Développement Web (MDW)
          </h4>
          <h6 className="fw-bold mt-2">Métiers visés :</h6>
          <ul>
            <li>Webmaster développeur</li>
            <li>Webmaster designer</li>
            <li>Administrateur de portail web</li>
            <li>Intégrateur de technologies web</li>
          </ul>
          <h6 className="fw-bold mt-2">Compétences recherchées :</h6>
          <ul>
            <li>Développement et intégration de sites web dynamiques</li>
            <li>Déploiement et administration de portails web</li>
            <li>Production d’images de synthèse</li>
            <li>Applications multimédia</li>
          </ul>
        </section>

        {/* Parcours SEM */}
        <section className="mb-4">
          {/* <h4 className="text-primary"> */}
          <h4 style={{ color: "#0d3e5f" }}>
            Parcours : Systèmes Embarqués et Mobiles (SEM)
          </h4>
          <h6 className="fw-bold mt-2">Métiers visés :</h6>
          <ul>
            <li>
              Responsable R&D, conception de produit, veille technologique
            </li>
            <li>Responsable production, essais, procédés de fabrication</li>
            <li>Chargé d’affaires, acheteur, formateur produits</li>
          </ul>
          <h6 className="fw-bold mt-2">Compétences recherchées :</h6>
          <ul>
            <li>Développement de logiciels embarqués et temps réel</li>
            <li>
              Conception de systèmes électroniques et informatiques embarqués
            </li>
            <li>Développement de systèmes mobiles</li>
            <li>Exploitation et maintenance des systèmes embarqués</li>
          </ul>
        </section>
      </div>
    </div>
  );
}

export default PresentationInfo;
