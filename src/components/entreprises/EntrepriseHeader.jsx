import React, { useState } from "react";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "../CommonHeader.css";
//CreatedAndDevelopedByWassimKhazri
//https://www.linkedin.com/in/wassim-khazri-ab923a14b/
const EntrepriseHeader = () => {
  return (
    <div>
      {/*Container wrapper*/}
      <div className="container-fluid">
        {/*Collapsible wrapper*/}
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          {/*Navbar brand*/}
          <div className="container">
            <div className="row align-items-center t4-nav-height">
              {/* Colonne navigation */}
              <div className="col-12 col-lg-9 d-flex align-items-center">
                {/* Menu principal */}
                <div
                  id="t4-megamenu-mainfr"
                  className="collapse navbar-collapse slide animate"
                  data-duration="400"
                >
                  <ul className="navbar-nav">
                    {/* Exemple de dropdown classique */}
                    <li className="nav-item dropdown">
                      <a
                        href="#"
                        className="nav-link dropdown-toggle"
                        id="institueDropdown"
                        role="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        Espace Entreprise
                      </a>
                      <ul
                        className="dropdown-menu"
                        aria-labelledby="institueDropdown"
                      >
                        <li>
                          <a href="#" className="dropdown-item">
                            Nos formations vous intéressent ?
                          </a>
                        </li>
                        <li>
                          <a href="#" className="dropdown-item">
                            Propositions de stages
                          </a>
                        </li>
                        <li>
                          <a href="#" className="dropdown-item">
                            Ajouter votre entreprise
                          </a>
                        </li>

                        <li>
                          <a href="/offre" className="dropdown-item">
                            Proposer offre d'emploi
                          </a>
                        </li>
                        <li>
                          <a href="/list-offre" className="dropdown-item">
                            Listes des offres
                          </a>
                        </li>
                      </ul>
                    </li>
                  </ul>
                  {/* 
//CreatedAndDevelopedByWassimKhazri
//https://www.linkedin.com/in/wassim-khazri-ab923a14b/ 
                          */}
                </div>
              </div>
              {/*Colonne offcanvas / trigger mobile*/}
              <div className="col-12 col-lg-3 d-flex align-items-center justify-content-end">
                <button
                  id="triggerButton"
                  className="btn d-lg-none"
                  type="button"
                  data-bs-toggle="offcanvas"
                  data-bs-target="#offcanvasRight"
                  aria-controls="offcanvasRight"
                >
                  <i className="fa fa-bars toggle-bars"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EntrepriseHeader;
//CreatedAndDevelopedByWassimKhazri
//https://www.linkedin.com/in/wassim-khazri-ab923a14b/
