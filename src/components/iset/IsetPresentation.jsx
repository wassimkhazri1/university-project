import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./IsetPresentation.css";
//CreatedAndDevelopedByWassimKhazri
//https://www.linkedin.com/in/wassim-khazri-ab923a14b/

function IsetPresentation() {
  return (
    <div className="hero text-start p-4">
      {/* Titre principal */}
      <div style={{ display: "flex", alignItems: "center" }}>
        {" "}
        <h1
          className="mb-4"
          style={{
            color: "#0d3e5f",
          }}
        >
          <em>
            <span style={{ marginRight: "8px" }}>Présentation</span>{" "}
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
        {/* Intro */}
        <p>
          L’Institut Supérieur des Études Technologiques de Jendouba (ISETJ) est
          une institution universitaire placée sous la tutelle de la Direction
          Générale des Études Technologiques (DGET).
        </p>

        {/* Atouts */}
        <section className="mb-4">
          <h3 className="text-primary">Atouts de l'ISET</h3>
          <p>
            L’ISET de Jendouba offre un environnement sain et serein où
            l’étudiant peut se consacrer pleinement à ses études et profiter des
            activités sportives et culturelles mises à sa disposition.
          </p>
        </section>

        {/* Spécialités avec Cards */}
        <section className="mb-4">
          <h3 className="text-primary">Spécialités</h3>
          <p>
            À l’issue de son parcours, l’étudiant obtient une licence appliquée
            dans l’une des quatre filières suivantes :
          </p>

          <div className="row g-4">
            {/* Génie Électrique */}
            <div className="col-md-6">
              <div className="card h-100 shadow-sm">
                <div className="card-header bg-primary text-white fw-bold">
                  Génie Électrique
                </div>
                <div className="card-body">
                  <ul>
                    <li>Maintenance Industrielle</li>
                    <li>Automatisation</li>
                    <li>Réseaux Électriques</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Génie Mécanique */}
            <div className="col-md-6">
              <div className="card h-100 shadow-sm">
                <div className="card-header bg-primary text-white fw-bold">
                  Génie Mécanique
                </div>
                <div className="card-body">
                  <ul>
                    <li>Maintenance Industrielle</li>
                    <li>Construction et Fabrication Mécanique</li>
                    <li>Technologie du Bois</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Administration d’Affaires */}
            <div className="col-md-6">
              <div className="card h-100 shadow-sm">
                <div className="card-header bg-primary text-white fw-bold">
                  Administration d’Affaires
                </div>
                <div className="card-body">
                  <ul>
                    <li>Gestion Comptable & Financière (AACF)</li>
                    <li>Gestion de PME / PMI</li>
                    <li>Management des Commerces Internationaux</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Technologies de l’Informatique */}
            <div className="col-md-6">
              <div className="card h-100 shadow-sm">
                <div className="card-header bg-primary text-white fw-bold">
                  Technologies de l’Informatique
                </div>
                <div className="card-body">
                  <ul>
                    <li>Développement de Systèmes d’Information (DSI)</li>
                    <li>Réseaux des Systèmes d’Information (RSI)</li>
                    <li>Systèmes Embarqués & Mobiles (SEM)</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default IsetPresentation;
