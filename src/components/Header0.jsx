import React, { useState } from "react";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './Header.css';
import logo from "../images/ISET/sigles/sigle.png";
import { useNavigate } from "react-router-dom"; // Pour la redirection
import ProfList from "./enseignants/ProfList";
import EtudiantHeader from "./etudiants/EtudiantHeader";
import EnseignantHeader from "./enseignants/EnseignantHeader";
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
const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState(""); // État pour les erreurs
  const navigate = useNavigate(); // Hook pour la navigation
  const [showProfs, setShowProfs] = useState(false);
  const [content, setContent] = useState('');

     // Récupérer user depuis le localStorage
     const user = JSON.parse(localStorage.getItem("user"));
      // Récupérer les rôles depuis le localStorage
      const roles = JSON.parse(localStorage.getItem("user")) || [];
      const role = roles.roles;
      const isAdmin = roles.roles?.includes("ROLE_ADMIN"); // Vérifie si ROLE_ADMIN est présent
      const isProf = roles.roles?.includes("ROLE_PROF"); // Vérifie si ROLE_PROF est présent
      const isStudent = roles.roles?.includes("ROLE_STUDENT"); // Vérifie si ROLE_STUDENT est présent
      const isEntreprise = roles.roles?.includes("ROLE_ENTREPRISE"); // Vérifie si ROLE_ENTREPRISE est présent
      console.log(role);

  const handleProfsClick = (event, type) => {
    event.preventDefault(); // Prevent default link behavior
if(role == "ROLE_STUDENT" || role == "ROLE_PROF" || role == "ROLE_ADMIN"){
    // Load content based on the type
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
  }else{
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
//CreatedAndDevelopedByWassimKhazri
//https://www.linkedin.com/in/wassim-khazri-ab923a14b/
  return (
    // <div className="navbar navbar-expand-lg navbar-light bg-light">
    <header className="bg-light">
            <div className="container-fluid">
        <div className="row align-items-center py-2">
          {/* Logo */}
          {/* <div className="col-auto"  href="#">
            <img src={logo} height="50" alt="ISET Logo" />
          </div> */}
                <a className="col-auto" href="/">
        <img
          src={logo}
          height="50"
          alt="MDB Logo"
          loading="lazy"
        />
      </a>
          {/* Titre */}
          <div className="col text-center">
            <h1 className="mb-0">Institut Supérieur des Etudes Technologiques de Jendouba</h1>
            <p className="mb-0">المعهد العالي للدراسات التكنولوجية بجندوبة</p>
          </div>
          
          {/* Profil utilisateur */}
          <div className="col-auto">
            <div className="dropdown dropleft float-right">
              {role == "ROLE_STUDENT" && <EtudiantProfil />}
              {role == "ROLE_PROF" && <EnseignantProfil />}
              {role == "ROLE_ADMIN" && <AdminProfil />}
              {role == "ROLE_ENTREPRISE" && <EntrepriseProfil />}
        <ul
          className="dropdown-menu dropdown-menu-end"
          aria-labelledby="navbarDropdownMenuAvatar"
        >
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
      {/* </div> */}
            </div>
          </div>
        </div>
      </div>
    {/* <div   style={{
      flexGrow: "1",
      backgroundImage: `url(${plan2})`, // Utilisation de la variable logo
      backgroundSize: 'cover', // Ajuste l'image pour couvrir tout le div
      backgroundPosition: 'center', // Centre l'image
      backgroundRepeat: 'no-repeat' // Empêche la répétition de l'image
    }}> */}
    {/* Nouvelle modale d'ajout */}
<AjoutNote
  open={addModalOpen}
  onClose={() => setAddModalOpen(false)}
/>
<AddMatiereForm
  open={addModalOpen1}
  onClose={() => setAddModalOpen1(false)}
/>
    {/*Navbar*/}
<nav className="navbar navbar-expand navbar-expand-lg ">
 {/*Container wrapper*/}
  <div >
   {/*Toggle button*/}
    <button
      data-mdb-collapse-init
      className="navbar-toggler"
      type="button"
      data-mdb-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <i className="fas fa-bars"></i>
    </button>

    {/*Collapsible wrapper*/}
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
     {/*Navbar brand*/}
      {/* <a className="navbar-brand mt-2 mt-lg-0" href="#">
        <img
          src={logo}
          height="50"
          alt="MDB Logo"
          loading="lazy"
        />
      </a> */}
      <div className="container">
  <div className="row align-items-center t4-nav-height">
    {/* Colonne navigation */}
    <div className="col-12 col-lg-9 d-flex align-items-center">
  
       {/* Bouton pour la version mobile */}
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#t4-megamenu-mainfr" aria-controls="t4-megamenu-mainfr" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        {/* Menu principal */}
        <div id="t4-megamenu-mainfr" className="collapse navbar-collapse slide animate" data-duration="400">
          <ul className="navbar-nav">
          {/* Exemple d'item simple */}
            <li className="nav-item active">
              <a href="/" className="nav-link" aria-current="page">Accueil</a>
            </li>          
            <li className="nav-item active">
        {/* Afficher l'en-tête spécifique en fonction du rôle */}
        {role == "ROLE_STUDENT" && <EtudiantHeader />}
      {role == "ROLE_PROF" && <EnseignantHeader />}
      {role == "ROLE_ENTREPRISE" && <EntrepriseHeader />}
    {/*   {role === "ROLE_ADMIN" && <AdminHeader />} */}
    </li>
               {/*Exemple d'un mega menu personnalisé */}
               <li className="nav-item dropdown">
              <a href="#" className="nav-link dropdown-toggle" id="departementsDropdown" role="button" data-bs-toggle="dropdown">
                Départements
              </a>

              <div className="dropdown-menu dropdown-fullwidth">
                  <div className="row">
                    <div className="col-md-4">
                      <h6 className="dropdown-header">Génie Electrique</h6>
                      <a href="/presentationelec" className="dropdown-item">Présentation</a>
                      <a href="/elec/listenseignants" className="dropdown-item">Liste d'Enseignants</a>
                      <a href="/elec/news" className="dropdown-item">Nouveautés</a>
                    </div>
                    <div className="col-md-4">
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
                    <div className="col-md-4">
                      <h6 className="dropdown-header">Technologies Informatique</h6>
                      <a href="/presentationinfo" className="dropdown-item">Présentation</a>
                      <a href="/info/listenseignants" className="dropdown-item">Liste d'Enseignants</a>
                      <a href="/info/news" className="dropdown-item">Nouveautés</a>
                    </div>
                  </div>
                </div>
            
            </li>
            <li>
            </li>
            {/* Exemple de dropdown classique */}
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
                {/*<li><a onClick={handleLogin} className="dropdown-item">cv des enseignants</a></li>*/}
                {(isAdmin || isProf || isStudent) && (
                <li><a href="/iset/proflist" className="dropdown-item" >List des enseignants</a></li>
              )}
              {/*CreatedAndDevelopedByWassimKhazri */}
              {/* https://www.linkedin.com/in/wassim-khazri-ab923a14b/ */}
                {(isAdmin || isProf) && (
                <li><a href="/list" className="dropdown-item">Listes des etudiants</a></li>
              )}
               {(isAdmin) && (
                <li><a href="/iset/entrepriselist" className="dropdown-item" >List des entreprises</a></li>
              )}
                {(isAdmin || isProf || isStudent) && (
                <li><a href="/iset/offerlist" className="dropdown-item" >List des offres</a></li>
              )}
                {(isAdmin) && (
                <li><a  className="dropdown-item" onClick={handleOpenAddModal1}>Ajouter Matiere</a></li>
              )}
                {(isAdmin) && (
                <li><a  className="dropdown-item"  onClick={handleOpenAddModal}>Ajouter Note</a></li>
              )}
              {/*  Ajoute d'autres liens si besoin */}
              </ul>
            </li>
            <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" href="#" id="espacesDropdown" role="button" data-bs-toggle="dropdown">
                            Enseignement
                        </a>
                        {/* 
                        CreatedAndDevelopedByWassimKhazri
                        https://www.linkedin.com/in/wassim-khazri-ab923a14b/
                        */}
                        <ul className="dropdown-menu" aria-labelledby="enseignementDropdown">

                                    <li><a className="dropdown-item" href="">Reforme LMD en Tunisie</a></li>
                                    <li><a className="dropdown-item" href="#">Licences</a></li>
                                    <li><a className="dropdown-item" href="#">Mastères</a></li>
                                    <li><a className="dropdown-item" href="#">Lauréats</a></li>
                                    <li><a className="dropdown-item" href="#">candidatures aux mastères</a></li>
                                    <li><a className="dropdown-item" href="#">plaquette pédagogique</a></li>
    
                                    </ul>
							
</li>


            {/*Ajoute d'autres items selon tes besoins*/}
          </ul>
        </div>
    </div>
  </div>
</div>
      {/*Left links*/}
    </div>
    {/*Collapsible wrapper*/}

    {/*Right elements*/}
    <div className="d-flex align-items-center">
           {/*Avatar*/}
          

    </div>
    {/*Right elements*/}
  </div>
  {/*Container wrapper*/}

</nav>
</header>
    // </div>
    
  );
};

export default Header;
//CreatedAndDevelopedByWassimKhazri
//https://www.linkedin.com/in/wassim-khazri-ab923a14b/