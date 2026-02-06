import React, { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Login from "./components/login/Login";
import ContactSection from "./components/blocks/ContactSection";
import BienvenueSection from "./components/blocks/BienvenueSection";
import ScrollToTopButton from "./components/blocks/ScrollToTopButton";
import Block2 from "./components/blocks/Block2";
import Header from "./components/header/Header";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import AttestationForm from "./components/attestation/AttestationForm";
import VoiceCommandPdf from "./components/VoiceCommandPdf";
//CreatedAndDevelopedByWassimKhazri
//https://www.linkedin.com/in/wassim-khazri-ab923a14b/
import IsetPresentation from "./components/iset/IsetPresentation";
import IsetInfrastructure from "./components/iset/IsetInfrastructure";
import Espace4c from "./components/iset/Espace4c";
import EnseignantHeader from "./components/enseignants/EnseignantHeader";
import EntrepriseHeader from "./components/entreprises/EntrepriseHeader";
import ProfList from "./components/enseignants/ProfList";
import Profile from "./components/iset/Profile";
import ProtectedRoute from "./ProtectedRoute";
import AccountDropdown from "./components/AccountDropDown";
import MesNotes from "./components/etudiants/MesNotes";
import Language from "./components/Language";
import EtudiantList from "./components/etudiants/EtudiantList";
import AddEtudiant from "./components/etudiants/AddEtudiant";
import EtudiantServices from "./components/etudiants/EtudiantServices";
import CareerServices from "./components/etudiants/CareerServices";
import EditEtudiant from "./components/etudiants/EditEtudiant";
import PresentationInfo from "./components/iset/départements/informatique/PresentationInfo";
import PresentationElec from "./components/iset/départements/electrique/PresentationElec";
import PresentationMec from "./components/iset/départements/mécanique/PresentationMec";
import PresentationEco from "./components/iset/départements/économique/PresentationEco";
import Lmd from "./components/iset/Lmd";
import Licence from "./components/iset/Licence";
import Mastere from "./components/iset/Mastere";
import Organigramme from "./components/iset/Organigramme";
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
import DocumentsAdministratifs from "./components/iset/DocumentsAdministratifs1";
import HomePage from "./components/HomePage";
import AboutSection from "./components/blocks/AboutSection";
import Footer from "./components/footer/Footer";
import AdminDashboard from "./components/admins/AdminDashboard";
import Chatbot from "./components/iset/Chatbot";

function App() {
  const token = localStorage.getItem("token");
  const roles = JSON.parse(localStorage.getItem("user")) || [];
  const role = roles.roles;
  const isAdmin = roles.roles?.includes("ROLE_ADMIN"); // Vérifie si ROLE_ADMIN est présent
  const isProf = roles.roles?.includes("ROLE_PROF"); // Vérifie si ROLE_PROF est présent
  const isStudent = roles.roles?.includes("ROLE_STUDENT"); // Vérifie si ROLE_STUDENT est présent
  const isEntreprise = roles.roles?.includes("ROLE_ENTREPRISE");
  const navigate = useNavigate();
  const handleClick = () => {
    // Si vous êtes déjà sur la page d'accueil
    const aboutElement = document.getElementById("about");
    if (aboutElement) {
      aboutElement.scrollIntoView({ behavior: "smooth" });
    } else {
      // Sinon, naviguer puis défilement
      navigate("/");
      // Attendre que la page soit chargée
      setTimeout(() => {
        const element = document.getElementById("about");
        if (element) element.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  };

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/iset/login" element={<Login />} />
        <Route path="/attestation" element={<AttestationForm />} />
        <Route path="/pdf" element={<VoiceCommandPdf />} />
        <Route path="/iset/presentation" element={<IsetPresentation />} />
        <Route path="/iset/infrastructure" element={<IsetInfrastructure />} />
        <Route path="/iset/esp-4c" element={<Espace4c />} />
        <Route path="/iset/block2" element={<Block2 />} />
        <Route path="/iset/account" element={<AccountDropdown />} />
        <Route path="/iset/enseignant" element={<EnseignantHeader />} />
        <Route path="/iset/entreprise" element={<EntrepriseHeader />} />
        <Route path="/iset/login" element={<Login />} />
        <Route path="/iset/langue" element={<Language />} />

        <Route path="/iset/myprofile" element={<Profile />} />
        <Route path="/presentationinfo" element={<PresentationInfo />} />
        <Route path="/presentationelec" element={<PresentationElec />} />
        <Route path="/presentationmec" element={<PresentationMec />} />
        <Route path="/presentationeco" element={<PresentationEco />} />
        <Route path="/iset/proflist" element={<ProfList />} />
        <Route path="/list" element={<EtudiantList />} />
        <Route path="/iset/entrepriselist" element={<EntrepriseList />} />
        <Route path="/add" element={<AddEtudiant />} />
        <Route path="/edit/:id" element={<EditEtudiant />} />
        <Route path="/Etudiant" element={<EtudiantServices />} />
        <Route path="/Career" element={<CareerServices />} />
        <Route path="/iset/lmd" element={<Lmd />} />
        <Route path="/iset/licence" element={<Licence />} />
        <Route path="/iset/mastere" element={<Mastere />} />
        <Route path="/iset/organigramme" element={<Organigramme />} />
        {isEntreprise && <Route path="/offre" element={<JobOfferForm />} />}
        {isEntreprise && (
          <Route path="/list-offre" element={<ListJobsByEntreprise />} />
        )}
        <Route path="/iset/offerlist" element={<JobList />} />
        <Route path="/candidaturelist" element={<CandidatureList />} />
        <Route path="/addmatiere" element={<AddMatiereForm />} />
        <Route path="/addnote" element={<AjoutNote />} />
        <Route path="/candidature" element={<AutofillApplication />} />
        <Route path="/authpage" element={<AuthPage />} />
        <Route path="/hexmenu" element={<HexMenu />} />
        <Route path="/polygon" element={<PolygonMenu />} />
        <Route path="/iset/documents" element={<DocumentsAdministratifs />} />
        <Route path="/absence" element={<AbsenceForm />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/homepage" element={<HomePage />} />

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
      <BienvenueSection />
      <AboutSection />
      <ContactSection />
      <Chatbot />
      <ScrollToTopButton />
      <Footer />
    </div>
  );
}

export default App;
