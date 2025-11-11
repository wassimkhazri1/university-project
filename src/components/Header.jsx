import React, { useState } from "react";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './Header.css';
import logo from "../images/ISET/sigles/sigle.png";
import logo1 from "../images/ISET/sigles/logo.png";
import { useNavigate } from "react-router-dom";
import ProfList from "./enseignants/ProfList";
import EtudiantHeader from "./etudiants/EtudiantHeader";
import EnseignantHeader from "./enseignants/EnseignantHeader";
import ParticlesBackground from "../../src/components/login/ParticlesBackground";
//CreatedAndDevelopedByWassimKhazri
//https://www.linkedin.com/in/wassim-khazri-ab923a14b/ 
import Logout from "../components/login/Logout";
import EtudiantProfil from "../components/etudiants/EtudiantProfil";
import EnseignantProfil from "../components/enseignants/EnseignantProfil";
import AdminProfil from "../components/admins/AdminProfil";
import plan2 from "../images/ISET/plan2.png";
import EtudiantList from "./etudiants/EtudiantList";
import AjoutNote from "./admins/AjoutNote";
import AddMatiereForm from "./admins/AddMatiereForm";
import EntrepriseHeader from "./entreprises/EntrepriseHeader";
import EntrepriseProfil from "./entreprises/EntrepriseProfil";
import LoginModal from "../components/login/LoginModal";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [showProfs, setShowProfs] = useState(false);
  const [content, setContent] = useState('');
  const [showLoginModal, setShowLoginModal] = useState(false);
  // Récupérer le token depuis le localStorage
  const token = localStorage.getItem("token");
  
  // Récupérer user depuis le localStorage
  const user = JSON.parse(localStorage.getItem("user"));
  // Récupérer les rôles depuis le localStorage
  const roles = JSON.parse(localStorage.getItem("user")) || [];
  const role = roles.roles;
  const isAdmin = roles.roles?.includes("ROLE_ADMIN");
  const isProf = roles.roles?.includes("ROLE_PROF");
  const isStudent = roles.roles?.includes("ROLE_STUDENT");
  const isEntreprise = roles.roles?.includes("ROLE_ENTREPRISE");
  console.log(role);

  const handleProfsClick = (event, type) => {
    event.preventDefault();
    if(role == "ROLE_STUDENT" || role == "ROLE_PROF" || role == "ROLE_ADMIN"){
      switch (type) {
        case 'proflist':
          setContent(<ProfList />);
          break;
        case 'etudiantlist':
          setContent(<EtudiantList />);
          break;  
        case 'stages':
          setContent('This is the Stages & PFE content.');
          break;
        case 'laureats':
          setContent('This is the Nos lauréats content.');
          break;
        default:
          setContent('');
      }
    } else {
      navigate('/iset/login');
    }
  };

  const [addModalOpen, setAddModalOpen] = useState(false);
  const handleOpenAddModal = () => {
    setAddModalOpen(true);
  };
  
  const [addModalOpen1, setAddModalOpen1] = useState(false);
  const handleOpenAddModal1 = () => {
    setAddModalOpen1(true);
  };

    return (
    <header className="header">
      {/* Arrière-plan de particules */}
      <div style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: -1,
        bgColor:"#85dde9ff"
      }}>
        {/* <ParticlesBackground bgColor="#85dde9ff" /> */}
      </div>

      {/* Modales */}
      <AjoutNote open={addModalOpen} onClose={() => setAddModalOpen(false)} />
      <AddMatiereForm open={addModalOpen1} onClose={() => setAddModalOpen1(false)} />

      {/* Navbar */}
      <nav className="navbar navbar-expand navbar-expand-lg">
        <div className="container-fluid">
          {/* Logo à gauche */}
          <a className="navbar-brand" href="/">
            <img src={logo1} alt="Logo" style={{ height: '50px' }} />
          </a>

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

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {/* Menu à droite */}
            <ul className="navbar-nav ms-auto"> {/* ms-auto pousse le menu à droite */}
              
              {/* Afficher l'en-tête spécifique seulement si l'utilisateur est connecté */}
              {token && (
                <li className="nav-item active">
                  {role == "ROLE_STUDENT" && <EtudiantHeader />}
                  {role == "ROLE_PROF" && <EnseignantHeader />}
                  {role == "ROLE_ENTREPRISE" && <EntrepriseHeader />}
                </li>
              )}

              {/* Les éléments du menu */}
              <li className="nav-item dropdown">
                <a href="#" className="nav-link dropdown-toggle" id="departementsDropdown" role="button" data-bs-toggle="dropdown">
                  Départements
                </a>
                <div className="dropdown-menu dropdown-fullwidth">
                  <div className="row">
                    <div className="col-md-2">
                      <h6 className="dropdown-header">Génie Electrique</h6>
                      <a href="/presentationelec" className="dropdown-item">Présentation</a>
                      <a href="/elec/listenseignants" className="dropdown-item">Liste d'Enseignants</a>
                      <a href="/elec/news" className="dropdown-item">Nouveautés</a>
                    </div>
                    <div className="col-md-3">
                      <h6 className="dropdown-header">Génie Mécanique</h6>
                      <a href="/presentationmec" className="dropdown-item">Présentation</a>
                      <a href="/mec/listenseignants" className="dropdown-item">Liste d'Enseignants</a>
                      <a href="/mec/news" className="dropdown-item">Nouveautés</a>
                    </div>
                    <div className="col-md-4">
                      <h6 className="dropdown-header">Sciences Économiques</h6>
                      <a href="/presentationeco" className="dropdown-item">Présentation</a>
                      <a href="/eco/listenseignants" className="dropdown-item">Liste d'Enseignants</a>
                      <a href="/eco/news" className="dropdown-item">Nouveautés</a>
                    </div>
                    <div className="col-md-5">
                      <h6 className="dropdown-header">Technologies Informatique</h6>
                      <a href="/presentationinfo" className="dropdown-item">Présentation</a>
                      <a href="/info/listenseignants" className="dropdown-item">Liste d'Enseignants</a>
                      <a href="/info/news" className="dropdown-item">Nouveautés</a>
                    </div>
                  </div>
                </div>
              </li>

              {/* Les autres éléments du menu */}
              <li className="nav-item dropdown">
                <a href="#" className="nav-link dropdown-toggle" id="institueDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  L'institue
                </a>
                <ul className="dropdown-menu" aria-labelledby="institueDropdown">
                  <li><a href="/iset/presentation" className="dropdown-item">Présentation</a></li>
                  <li><a href="/iset/infrastructure" className="dropdown-item">Infrastructure</a></li>
                  <li><a href="/iset/esp-4c" className="dropdown-item">Espace 4C</a></li>
                  <li><a href="/iset/esp-4c" className="dropdown-item">Organigramme</a></li>
                  <li><a href="/iset/documents" className="dropdown-item">Documents Administratifs</a></li>
                  
                  {token && (
                    <>
                      {(isAdmin || isProf || isStudent) && (
                        <li><a href="/iset/proflist" className="dropdown-item">List des enseignants</a></li>
                      )}
                      {(isAdmin || isProf) && (
                        <li><a href="/list" className="dropdown-item">Listes des etudiants</a></li>
                      )}
                      {(isAdmin) && (
                        <li><a href="/iset/entrepriselist" className="dropdown-item">List des entreprises</a></li>
                      )}
                      {(isAdmin || isProf || isStudent) && (
                        <li><a href="/iset/offerlist" className="dropdown-item">List des offres</a></li>
                      )}
                      {(isAdmin) && (
                        <li><a className="dropdown-item" onClick={handleOpenAddModal1}>Ajouter Matiere</a></li>
                      )}
                      {(isAdmin) && (
                        <li><a className="dropdown-item" onClick={handleOpenAddModal}>Ajouter Note</a></li>
                      )}
                    </>
                  )}
                </ul>
              </li>

              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="espacesDropdown" role="button" data-bs-toggle="dropdown">
                  Enseignement
                </a>
                <ul className="dropdown-menu" aria-labelledby="enseignementDropdown">
                  <li><a className="dropdown-item" href="">Reforme LMD en Tunisie</a></li>
                  <li><a className="dropdown-item" href="#">Licences</a></li>
                  <li><a className="dropdown-item" href="#">Mastères</a></li>
                  <li><a className="dropdown-item" href="#">Lauréats</a></li>
                  <li><a className="dropdown-item" href="#">candidatures aux mastères</a></li>
                  <li><a className="dropdown-item" href="#">plaquette pédagogique</a></li>
                </ul>
              </li>

              {/* Profil utilisateur ou bouton Login */}
              <li className="nav-item dropdown dropleft float-right">
                {token ? (
                  <>
                    {role == "ROLE_STUDENT" && <EtudiantProfil />}
                    {role == "ROLE_PROF" && <EnseignantProfil />}
                    {role == "ROLE_ADMIN" && <AdminProfil />}
                    {role == "ROLE_ENTREPRISE" && <EntrepriseProfil />}
                    
                    <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdownMenuAvatar">
                      <li>
                        <a className="dropdown-item" href="/iset/myprofile">My profile</a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">Settings</a>
                      </li>
                      <li>
                        <Logout />
                      </li>
                    </ul>
                  </>
                ) : (
                  <button
                    className="btn btn-outline-primary btn-sm"
                    onClick={() => setShowLoginModal(true)}
                  >
                    <a>Login</a>
                  </button>
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <LoginModal show={showLoginModal} onClose={() => setShowLoginModal(false)} />
    </header>
  );
};

export default Header;
//CreatedAndDevelopedByWassimKhazri
//https://www.linkedin.com/in/wassim-khazri-ab923a14b/