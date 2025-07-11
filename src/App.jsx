import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import AttestationForm from "./components/attestation/AttestationForm";
import VoiceCommandPdf from "./components/VoiceCommandPdf";
import Acceuil from "./components/acceuil/Acceuil";
//CreatedAndDevelopedByWassimKhazri
//https://www.linkedin.com/in/wassim-khazri-ab923a14b/
import Header from "./components/Header";
import Footer from "./components/Footer";
import IsetPresentation from "./components/iset/IsetPresentation";
import IsetInfrastructure from "./components/iset/IsetInfrastructure";
import Espace4c from "./components/iset/Espace4c";
import Home from "./components/iset/Home";
import HomTest from "./components/iset/HomTest";
import Block2 from "./components/blocks/Block2";
import EnseignantHeader from "./components/enseignants/EnseignantHeader";
import EntrepriseHeader from "./components/entreprises/EntrepriseHeader";
import Login from "./components/login/Login";
import ProfList from "./components/enseignants/ProfList";
import Profile from "./components/iset/Profile";
import ProtectedRoute from "./ProtectedRoute";
import AccountDropdown from "./components/AccountDropDown";
import MesNotes from "./components/etudiants/MesNotes";
import Language from "./components/Language";
import Nav from "./components/Nav";
import EtudiantList from "./components/etudiants/EtudiantList";
import AddEtudiant from "./components/etudiants/AddEtudiant";
import EditEtudiant from "./components/etudiants/EditEtudiant";
import PresentationInfo from "./components/iset/départements/informatique/PresentationInfo";
import PresentationElec from "./components/iset/départements/electrique/PresentationElec";
import PresentationMec from "./components/iset/départements/mécanique/PresentationMec";
import PresentationEco from "./components/iset/départements/économique/PresentationEco";
import Lmd from "./components/iset/Lmd";
import JobOfferForm from "./components/entreprises/JobOfferForm";
import JobList from "./components/entreprises/JobList";
import CandidatureList from "./components/candidatures/CandidatureList";
import AddMatiereForm from "./components/admins/AddMatiereForm";
import AjoutNote from "./components/admins/AjoutNote";
import AutofillApplication from "./components/candidatures/AutofillApplication";
import AuthPage from "./components/acceuil/AuthPage";
import HexMenu from "./components/acceuil/HexMenu";
import PolygonMenu from "./components/acceuil/PolygonMenu";

import EntrepriseList from "./components/entreprises/EntrepriseList";
import ListJobsByEntreprise from "./components/entreprises/ListJobsByEntreprise";
import AbsenceForm from "./components/absence/AbsenceForm";
import MesAbsences from "./components/etudiants/MesAbsences";
import DocumentsAdministratifs from "./components/iset/DocumentsAdministratifs";
function App() {
    const roles = JSON.parse(localStorage.getItem("user")) || [];
    const role = roles.roles;
    const isAdmin = roles.roles?.includes("ROLE_ADMIN"); // Vérifie si ROLE_ADMIN est présent
    const isProf = roles.roles?.includes("ROLE_PROF"); // Vérifie si ROLE_PROF est présent
    const isStudent = roles.roles?.includes("ROLE_STUDENT"); // Vérifie si ROLE_STUDENT est présent
    const isEntreprise = roles.roles?.includes("ROLE_ENTREPRISE");
  return (
    <div className="App">
      <Header />
      {/*<Navbar /> */}
      <Routes>
        <Route path="/attestation" element={<AttestationForm />} />
        <Route path="/pdf" element={<VoiceCommandPdf />} />
        <Route path="/acceuil" element={<Acceuil />} />
        <Route path="/iset/presentation" element={<IsetPresentation />} />
        <Route path="/iset/infrastructure" element={<IsetInfrastructure />} />
        <Route path="/iset/esp-4c" element={<Espace4c />} />
        <Route path="/" element={<Home />} />
        <Route path="/iset/home" element={<HomTest />} />
        <Route path="/iset/block2" element={<Block2 />} />
        <Route path="/iset/account" element={<AccountDropdown />} />
        <Route path="/iset/enseignant" element={<EnseignantHeader />} />
        <Route path="/iset/entreprise" element={<EntrepriseHeader />} />
        <Route path="/iset/login" element={<Login />} />
        <Route path="/iset/langue" element={<Language />} />
        <Route path="/iset/nav" element={<Nav />} />
        <Route path="/iset/myprofile" element={<Profile />} />
        <Route path="/presentationinfo" element={<PresentationInfo />} />
        <Route path="/presentationelec" element={<PresentationElec />} />
        <Route path="/presentationmec" element={<PresentationMec />} />
        <Route path="/presentationEco" element={<PresentationEco />} />
        <Route path="/iset/proflist" element={<ProfList />} />
        <Route path="/list" element={<EtudiantList />} />
        <Route path="/iset/entrepriselist" element={<EntrepriseList />} />
        {/* <Route path="/add" component={AddEtudiant} /> */}
        <Route path="/add" element={<AddEtudiant />} />
        {/*<Route path="/edit/:id" component={EditEtudiant} />*/}
        <Route path="/edit/:id" element={<EditEtudiant />} />
        <Route path="/iset/lmd" element={<Lmd />} />
        {isEntreprise && <Route path="/offre" element={<JobOfferForm />} />
        }
        {isEntreprise && <Route path="/list-offre" element={<ListJobsByEntreprise />} />
       }
        <Route path="/iset/offerlist" element={<JobList />} />
        <Route path="/candidaturelist" element={<CandidatureList />} />
        <Route path="/addmatiere" element={<AddMatiereForm />} />
        <Route path="/addnote" element={<AjoutNote />} />
        <Route path="/candidature" element={<AutofillApplication />} />
        <Route path="/authpage" element={<AuthPage />} />
        <Route path="/hexmenu" element={<HexMenu />} />
        <Route path="/polygon" element={<PolygonMenu />} />
        <Route path="/iset/documents" element={<DocumentsAdministratifs />} />
        <Route path="/absence" element={<AbsenceForm />}/>

        <Route
          path="/iset/mesnotes"
          element={
            <ProtectedRoute requiredRole="ROLE_STUDENT">
              <MesNotes />
            </ProtectedRoute>
          }
        />
                <Route
          path="/iset/mesabsences"
          element={
            <ProtectedRoute requiredRole="ROLE_STUDENT">
              <MesAbsences />
            </ProtectedRoute>
          }
        />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;

//CreatedAndDevelopedByWassimKhazri
//https://www.linkedin.com/in/wassim-khazri-ab923a14b/
