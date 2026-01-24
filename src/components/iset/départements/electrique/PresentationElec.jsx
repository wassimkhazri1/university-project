import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./PresentationElec.css";
//CreatedAndDevelopedByWassimKhazri
//https://www.linkedin.com/in/wassim-khazri-ab923a14b/

function PresentationElec() {
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
            <span style={{ marginRight: "8px" }}>Génie Electrique</span>{" "}
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
        <p>
          <h3 className="blue">Présentation</h3>
          Le département de génie électrique de l’Institut Supérieur des Études
          Technologiques de Jendouba a été créé dans le but de s’appuyer sur la
          réalité industrielle. Son objectif est de former des cadres qualifiés
          en génie électrique. Ainsi le département est muni d’un équipement de
          pointe assurant au mieux l’évolution technologique du domaine génie
          électrique, électronique et informatique industriel.
        </p>
        <h3 className="blue">Débouchée</h3>
        <p>
          Les titulaires d’une licence en génie électrique sont capables
          d’intervenir pour l’installation, le pilotage ou la maintenance des
          systèmes industriels en :
          <ul>
            <li>Electronique,</li>
            <li>Electrotechnique,</li>
            <li>Instrumentation et mesure,</li>
            <li>Automatisme et Informatique Industrielle,</li>
            <li>Sécurité Contrôle et commande des procédés industriels</li>
            <li>Maintenance des systèmes électriques</li>
          </ul>
          Ainsi, il peut s'intégrer aux :
          <ul>
            <li>industries électriques et électroniques,</li>
            <li>
              industries manufacturières et agro-alimentaires, secteurs de la
              santé, de l'audiovisuel et de télécommunications.
            </li>
          </ul>
        </p>
        <h3 className="blue">Organisation des études</h3>
        <p>
          Les études en licence appliquée en génie électrique s’étalent sur 3
          années (L1, L2, et L3) organisées en 6 semestres. Le sixième semestre
          est réservé à la réalisation d’un stage de fin d’études permettant à
          l’étudiant de mettre en œuvre toutes ses connaissances et son
          savoir-faire. L’étudiant est appelé à faire deux stages l’un
          d’initiation et l’autre de perfectionnement, respectivement aux
          niveaux de L1 et L2. Les études se font sous forme de cours, des TD et
          TP. Les TP présentent plus que 50% du volume horaire global, ils sont
          présentés sous forme d’ateliers dans les laboratoires du département.
        </p>

        <h3 className="blue">Spécialités</h3>
        <p>
          <ul>
            <li>Maintenance Industrielle</li>
            <li>Automatisation</li>
            <li>Réseaux Électriques</li>
          </ul>
        </p>
      </div>
    </div>
  );
}
//CreatedAndDevelopedByWassimKhazri
//https://www.linkedin.com/in/wassim-khazri-ab923a14b/
export default PresentationElec;
