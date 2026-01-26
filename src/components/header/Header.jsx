import { useState } from "react";
import EtudiantHeader from "../etudiants/EtudiantHeader";
import EnseignantHeader from "../enseignants/EnseignantHeader";
import logo from "../../images/ISET/sigles/logo.png";
import logo1 from "../../images/ISET/sigles/logo1.png";
import LoginModal from "../login/LoginModal";
import "./Header.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import { DropdownMenu, DropdownItem, NavLink } from "reactstrap";

//CreatedAndDevelopedByWassimKhazri
//https://www.linkedin.com/in/wassim-khazri-ab923a14b/
import Logout from "../login/Logout";
import EtudiantProfil from "../etudiants/EtudiantProfil";
import EnseignantProfil from "../enseignants/EnseignantProfil";
import AdminProfil from "../admins/AdminProfil";
import AjoutNote from "../admins/AjoutNote";
import AddMatiereForm from "../admins/AddMatiereForm";
import EntrepriseHeader from "../entreprises/EntrepriseHeader";
import EntrepriseProfil from "../entreprises/EntrepriseProfil";
import NotificationBell from "../NotificationBell";
//import NotificationPanel from "./NotificationPanel";

function Header() {
  const [showLoginModal, setShowLoginModal] = useState(false);

  // Récupérer le token depuis le localStorage
  const token = localStorage.getItem("token");

  // Récupérer user depuis le localStorage
  const user = JSON.parse(localStorage.getItem("user")) || {};
  const roles = user.roles || [];
  const userId = user.id || null;
  const userName = user.username || null;
  const isAdmin = roles.includes("ROLE_ADMIN");
  const isProf = roles.includes("ROLE_PROF");
  const isStudent = roles.includes("ROLE_STUDENT");

  const role = roles.length > 0 ? roles[0] : null;

  const [addModalOpen, setAddModalOpen] = useState(false);
  const handleOpenAddModal = () => {
    setAddModalOpen(true);
  };

  const [addModalOpen1, setAddModalOpen1] = useState(false);
  const handleOpenAddModal1 = () => {
    setAddModalOpen1(true);
  };

  return (
    <>
      <header className="header">
        <div className="container-fluid">
          <div>
            <div
              className="arabic text-center"
              style={{
                fontFamily: "Scheherazade, serif",
                fontSize: "1.8rem",
                direction: "rtl",
                fontWeight: "500",
              }}
            >
              المعهد العالي للدراسات التكنولوجية بجندوبة
            </div>
            <div
              className="french text-center"
              style={{ fontSize: "1rem", fontWeight: "300" }}
            >
              Institut supérieur des études technologiques de Jendouba
            </div>
          </div>
        </div>
        <nav className="nav navbar navbar-expand-lg">
          <div className="container-fluid">
            <div>
              <a className="col-auto" href="/">
                <img src={logo1} alt="Logo ISET" style={{ height: "70px" }} />
              </a>
            </div>
          </div>
          <div className="container-fluid">
            {/* Bouton toggle pour mobile */}
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <i className="fas fa-bars"></i>
            </button>

            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav ms-auto ">
                <li className="nav-item active">
                  <a href="#about" className="nav-link">
                    À propos
                  </a>
                </li>
                <li className="nav-item active">
                  <a href="#contact" className="nav-link">
                    Contact
                  </a>
                </li>
                {/* Afficher l'en-tête spécifique seulement si l'utilisateur est connecté */}
                {token && (
                  <li className="nav-item active">
                    {role === "ROLE_STUDENT" && <EtudiantHeader />}
                    {role === "ROLE_PROF" && <EnseignantHeader />}
                    {role === "ROLE_ENTREPRISE" && <EntrepriseHeader />}
                  </li>
                )}

                {/* Dropdown Départements */}
                <li className="nav-item dropdown">
                  <a
                    href="#"
                    className="nav-link dropdown-toggle"
                    id="departementsDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                  >
                    Départements
                  </a>
                  <div
                    className="dropdown-menu dropdown-fullwidth"
                    style={{ width: "auto", minWidth: "200px" }}
                  >
                    <div className="row">
                      <div className="col-md-2">
                        <h6 className="dropdown-header">Génie Electrique</h6>
                        <a href="/presentationelec" className="dropdown-item">
                          Présentation
                        </a>
                        <a
                          href="/elec/listenseignants"
                          className="dropdown-item"
                        >
                          Liste d'Enseignants
                        </a>
                        <a href="/elec/news" className="dropdown-item">
                          Nouveautés
                        </a>
                      </div>
                      <div className="col-md-3">
                        <h6 className="dropdown-header">Génie Mécanique</h6>
                        <a href="/presentationmec" className="dropdown-item">
                          Présentation
                        </a>
                        <a
                          href="/mec/listenseignants"
                          className="dropdown-item"
                        >
                          Liste d'Enseignants
                        </a>
                        <a href="/mec/news" className="dropdown-item">
                          Nouveautés
                        </a>
                      </div>
                      <div className="col-md-3">
                        <h6 className="dropdown-header">
                          Sciences Économiques
                        </h6>
                        <a href="/presentationeco" className="dropdown-item">
                          Présentation
                        </a>
                        <a
                          href="/eco/listenseignants"
                          className="dropdown-item"
                        >
                          Liste d'Enseignants
                        </a>
                        <a href="/eco/news" className="dropdown-item">
                          Nouveautés
                        </a>
                      </div>
                      <div className="col-md-3">
                        <h6 className="dropdown-header">
                          Technologies Informatique
                        </h6>
                        <a href="/presentationinfo" className="dropdown-item">
                          Présentation
                        </a>
                        <a
                          href="/info/listenseignants"
                          className="dropdown-item"
                        >
                          Liste d'Enseignants
                        </a>
                        <a href="/info/news" className="dropdown-item">
                          Nouveautés
                        </a>
                      </div>
                    </div>
                  </div>
                </li>

                {/* Dropdown L'institut */}
                <li className="nav-item dropdown">
                  <a
                    href="#"
                    className="nav-link dropdown-toggle"
                    id="institueDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    L'institut
                  </a>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="institueDropdown"
                  >
                    <li>
                      <a href="/iset/presentation" className="dropdown-item">
                        Présentation
                      </a>
                    </li>
                    <li>
                      <a href="/iset/infrastructure" className="dropdown-item">
                        Infrastructure
                      </a>
                    </li>
                    <li>
                      <a href="/iset/esp-4c" className="dropdown-item">
                        Espace 4C
                      </a>
                    </li>
                    <li>
                      <a href="/iset/organigramme" className="dropdown-item">
                        Organigramme
                      </a>
                    </li>
                    <li>
                      <a href="/iset/documents" className="dropdown-item">
                        Documents Administratifs
                      </a>
                    </li>

                    {token && (
                      <>
                        {(isAdmin || isProf || isStudent) && (
                          <li>
                            <a href="/iset/proflist" className="dropdown-item">
                              List des enseignants
                            </a>
                          </li>
                        )}
                        {(isAdmin || isProf) && (
                          <li>
                            <a href="/list" className="dropdown-item">
                              Listes des etudiants
                            </a>
                          </li>
                        )}
                        {isAdmin && (
                          <li>
                            <a
                              href="/iset/entrepriselist"
                              className="dropdown-item"
                            >
                              List des entreprises
                            </a>
                          </li>
                        )}
                        {(isAdmin || isProf || isStudent) && (
                          <li>
                            <a href="/iset/offerlist" className="dropdown-item">
                              List des offres
                            </a>
                          </li>
                        )}
                        {isAdmin && (
                          <li>
                            <a
                              className="dropdown-item"
                              onClick={handleOpenAddModal1}
                            >
                              Ajouter Matiere
                            </a>
                          </li>
                        )}
                        {isAdmin && (
                          <li>
                            <a
                              className="dropdown-item"
                              onClick={handleOpenAddModal}
                            >
                              Ajouter Note
                            </a>
                          </li>
                        )}
                      </>
                    )}
                  </ul>
                </li>

                {/* Dropdown Enseignement */}
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    id="espacesDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                  >
                    Enseignement
                  </a>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="enseignementDropdown"
                  >
                    <li>
                      <a className="dropdown-item" href="/iset/lmd">
                        Reforme LMD en Tunisie
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="/iset/licence">
                        Licences
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="/iset/mastere">
                        Mastères
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Lauréats
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        candidatures aux mastères
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        plaquette pédagogique
                      </a>
                    </li>
                  </ul>
                </li>
              </ul>
              {token && isStudent && (
                <li className="nav-item">
                  <NotificationBell
                    userId={userId}
                    isAuthenticated={!!token}
                    userRole={role}
                  />
                </li>
              )}
              {/* Profil utilisateur ou bouton Login */}
              <li className="nav-item dropdown" right>
                {token ? (
                  <>
                    {role === "ROLE_STUDENT" && <EtudiantProfil />}
                    {role === "ROLE_PROF" && <EnseignantProfil />}
                    {role === "ROLE_ADMIN" && <AdminProfil />}
                    {role === "ROLE_ENTREPRISE" && <EntrepriseProfil />}
                    <DropdownMenu className="dropdown-navbar" tag="ul" right>
                      <NavLink tag="li" className="nav-item">
                        <strong> {user.username}</strong>
                      </NavLink>
                      <NavLink tag="li">
                        <DropdownItem
                          className="nav-item"
                          href="/iset/myprofile"
                        >
                          Profile
                        </DropdownItem>
                      </NavLink>
                      <NavLink tag="li">
                        <DropdownItem className="nav-item" href="#">
                          Settings
                        </DropdownItem>
                      </NavLink>
                      <DropdownItem divider tag="li" />
                      <NavLink tag="li">
                        <Logout />
                      </NavLink>
                    </DropdownMenu>
                  </>
                ) : (
                  <a
                    className="nav-link"
                    onClick={() => setShowLoginModal(true)}
                  >
                    Login
                  </a>
                )}
              </li>
            </div>
          </div>
        </nav>
      </header>

      <LoginModal
        show={showLoginModal}
        onClose={() => setShowLoginModal(false)}
      />
      <AjoutNote open={addModalOpen} onClose={() => setAddModalOpen(false)} />
      <AddMatiereForm
        open={addModalOpen1}
        onClose={() => setAddModalOpen1(false)}
      />
    </>
  );
}

export default Header;
