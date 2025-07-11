import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import './IsetPresentation.css';
import BackToTop from "../BackToTop";
//CreatedAndDevelopedByWassimKhazri
//https://www.linkedin.com/in/wassim-khazri-ab923a14b/ 
function IsetPresentation() {
  return (
    <div className="container mt-4 text-start">
            <h3 className="blue">Création & Présentation</h3>
      <p>
      L’institut supérieur des études technologiques de Jendouba (ISETJ) est une institution universitaire sous la tutelle de la direction générale des études technologiques (DGET).
      </p>
      <h3 className="blue">Atouts de l'ISET</h3>
      <p>
        L'ISET de Jendouba est un environnement sain 
        et serein où l'étudiant peut se livrer entièrement à 
        ses études et profiter des activités tant sportives 
        que culturelles mises à sa disposition.
      </p>
      
      <h3 className="blue">Spécialités</h3>
      <p>
        Au terme de son apprentissage, l'étudiant de l'ISET est titulaire d'une licence appliquée dans l'une des quatre filières :
      </p>
      {/* Exemple d'accordéon Bootstrap */}
      <div className="accordion" id="specialitesAccordion">
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingOne">
            <button
              className="accordion-button"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseOne"
              aria-expanded="true"
              aria-controls="collapseOne"
            >
              Génie Électrique
            </button>
          </h2>
          <div
            id="collapseOne"
            className="accordion-collapse collapse show"
            aria-labelledby="headingOne"
            data-bs-parent="#specialitesAccordion"
          >
            <div className="accordion-body">
              <ul>
                <li>Maintenance Industrielle</li>
                <li>Automatisation</li>
                <li>Réseaux Électriques</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="accordion-item">
          <h2 className="accordion-header" id="headingTwo">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseTwo"
              aria-expanded="false"
              aria-controls="collapseTwo"
            >
              Génie Mécanique
            </button>
          </h2>
          <div
            id="collapseTwo"
            className="accordion-collapse collapse"
            aria-labelledby="headingTwo"
            data-bs-parent="#specialitesAccordion"
          >
            <div className="accordion-body">
              <ul>
                <li>Maintenance Industrielle</li>
                <li>Construction et Fabrication Mécanique</li>
                <li>Technologie du Bois</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="accordion-item">
          <h2 className="accordion-header" id="headingThree">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseThree"
              aria-expanded="false"
              aria-controls="collapseThree"
            >
              Administration d'affaires
            </button>
          </h2>
          <div
            id="collapseThree"
            className="accordion-collapse collapse"
            aria-labelledby="headingThree"
            data-bs-parent="#specialitesAccordion"
          >
            <div className="accordion-body">
              <ul>
                <li>Gestion Comptable &amp; Financière (AACF)</li>
                <li>Gestion de PME / PMI</li>
                <li>Management des Commerces Internationaux</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingFour">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseFour"
              aria-expanded="false"
              aria-controls="collapseFour"
            >
              Technologies de l'Informatique
            </button>
          </h2>
          <div
            id="collapseFour"
            className="accordion-collapse collapse"
            aria-labelledby="headingFour"
            data-bs-parent="#specialitesAccordion"
          >
            <div className="accordion-body">
              <ul>
                <li>Développement de Systèmes d'Information (DSI)</li>
                <li>Réseaux des Systèmes d'Information (RSI)</li>
                <li>Systèmes Embarqués &amp; Mobiles (SEM)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <BackToTop />
    </div>
  );
}
//CreatedAndDevelopedByWassimKhazri
//https://www.linkedin.com/in/wassim-khazri-ab923a14b/
export default IsetPresentation;
