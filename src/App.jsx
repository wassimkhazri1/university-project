import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import './App.css';
import logo from "./images/ISET/sigles/logo.png";
import Login from "./components/login/Login";
import LoginModal from "./components/login/LoginModal";
import DepartmentsSection from "./DepartmentDropdown";

function App() {
      const [showLoginModal, setShowLoginModal] = useState(false);
  return (
    <div className="App">
        <Routes>
            <Route path="/iset/login" element={<Login />} /> 
        </Routes>
      <header className="header">
        <div className="logo"><img src={logo}></img></div>
        <nav className="nav">
          <a href="#about">À propos</a>
          <a href="#departments">Départements</a>
          <a href="#contact">Contact</a>
          <a onClick={() => setShowLoginModal(true)}>Login</a>
        </nav>
        <LoginModal show={showLoginModal} onClose={() => setShowLoginModal(false)} />
      </header>

      <section className="hero">
        <h1 className="fade-in">Bienvenue à l'ISET de Jendouba</h1>
        <p className="slide-up">Institut Supérieur des Études Technologiques</p>
        <button className="cta-button">En savoir plus</button>
      </section>

      <section id="about" className="section about">
        <h2>À propos</h2>
        <p>
          L'ISET Jendouba forme des techniciens supérieurs dans des domaines innovants et adaptés au marché.
          Notre campus dynamique favorise l’apprentissage, la recherche et l’entrepreneuriat.
        </p>
      </section>



    <DepartmentsSection />
      {/* <section id="departments" className="section departments">
        <h2>Départements</h2>
        <div className="grid">
          <div className="card">Informatique</div>
          <div className="card">Électronique</div>
          <div className="card">Génie mécanique</div>
          <div className="card">Gestion</div>
        </div>
      </section> */}

      <section id="contact" className="section contact">
        <h2>Contact</h2>
        <p>Email : contact@iset-jendouba.tn</p>
        <p>Téléphone : +216 78 123 456</p>
      </section>

      <footer className="footer">
        <p>&copy; 2025 ISET Jendouba. Tous droits réservés.</p>
      </footer>
    </div>
  );
}

export default App;
