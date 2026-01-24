import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./PresentationEco.css";
//CreatedAndDevelopedByWassimKhazri
//https://www.linkedin.com/in/wassim-khazri-ab923a14b/
function PresentationEco() {
  return (
    <div className="hero  text-start p-4">
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
              Sciences Économiques et de Gestion
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
        <p>
          <h3 className="blue">Présentation</h3>
          Le département sciences économiques et gestion propose une licence en
          administration des affaires.
        </p>
        <p>
          <h3 className="blue">Objectifs</h3>
          <ul>
            <li>
              Proposer une formation flexible et comparable aux standards
              internationaux
            </li>
            <li>
              Assurer une formation polyvalente et apte à s’adapter aux
              mutations de l’environnement mondial
            </li>
            <li>Garantir l’employabilité</li>
          </ul>
        </p>
        <p>
          <h3 className="blue">Principes</h3>
          <ul>
            <li>Créer des parcours de formation souple et efficace</li>
            <li>Inclure l’étudiant dans le choix de ses parcours</li>
            <li>Favoriser la mobilité nationale et internationale</li>
            <li>
              Offrir à l’étudiant la possibilité de restructure son parcours en
              cours de formation
            </li>
            <li>
              Offrir à l’étudiant la possibilité d’insertion professionnelle à
              tous les niveaux.
            </li>
          </ul>
        </p>
      </div>
    </div>
  );
}
//CreatedAndDevelopedByWassimKhazri
//https://www.linkedin.com/in/wassim-khazri-ab923a14b/
export default PresentationEco;
