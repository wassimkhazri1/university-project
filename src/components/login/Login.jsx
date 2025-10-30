import React, { useState } from "react";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { useNavigate } from "react-router-dom"; // Pour la redirection
import plan2 from "../../images/ISET/plan2.png";
import TermsModal from './TermsModal';
import ParticlesBackground from "./ParticlesBackground";

//CreatedAndDevelopedByWassimKhazri
//https://www.linkedin.com/in/wassim-khazri-ab923a14b/ 
function Login() {
  const [activeTab, setActiveTab] = useState("login");
  const [email, setEmail] = useState(""); // État pour le prénom
  const [password, setPassword] = useState(""); // État pour le mot de passe
  const [error, setError] = useState(""); // État pour les erreurs
  const [showPassword, setShowPassword] = useState(false); // État pour afficher/masquer le mot de passe
  const navigate = useNavigate(); // Hook pour la navigation

  const handleLogin = async (e) => {
    e.preventDefault(); // Empêche le rechargement de la page

    try {
      // Envoi de la requête POST à l'API
      const response = await fetch("http://localhost:8080/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Échec de la connexion");
      }

      const data = await response.json(); // Récupération des données de la réponse

      // Stockage du token dans le localStorage
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data)); // Stocke les infos utilisateur

      // Redirection en fonction du rôle
      if (data.roles.includes("ROLE_STUDENT")) {
        navigate("/iset/etudiant");
      } else if (data.roles.includes("ROLE_PROF")) {
        navigate("/iset/prof");
      } else if (data.roles.includes("ROLE_ADMIN")) {
        navigate("/iset/admin");
    
      }else if (data.roles.includes("ROLE_ENTREPRISE")) {
        navigate("/iset/entreprise");
        
      }
       else {
        setError("Rôle non reconnu");
      }
    } catch (err) {
      setError("Identifiants incorrects ou erreur de connexion");
      console.error(err);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center "   style={{
      flexGrow: "1",
     // backgroundImage: `url(${plan2})`, // Utilisation de la variable logo
      backgroundSize: 'cover', // Ajuste l'image pour couvrir tout le div
      backgroundPosition: 'center', // Centre l'image
      backgroundRepeat: 'no-repeat' // Empêche la répétition de l'image
    }}>
                  {/* Arrière-plan de particules */}
      <div style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: -1
      }}>
        {/* <ParticlesBackground /> */}
        <ParticlesBackground bgColor="#000000" />
      </div>
      <div className="card p-4 shadow-sm" style={{ maxWidth: "350px",height: "500px", width: "100%" }}>
        {/* Onglets */}
        <ul className="nav nav-pills nav-justified mb-3">
          {["login", "register"].map((tab) => (
            <li className="nav-item" key={tab}>
              <button
                className={`nav-link ${activeTab === tab ? "active" : ""}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab === "login" ? "Sign in" : "Register"}
              </button>
            </li>
          ))}
        </ul>

        {/* Contenu des onglets */}
        <div className="tab-content">
          {activeTab === "login" ? (
            <form onSubmit={handleLogin}>
              <p className="text-center">Sign in with:</p>
              <div className="d-flex justify-content-center mb-3">
                {["facebook-f", "google", "twitter", "github"].map((icon) => (
                  <button key={icon} type="button" className="btn btn-link btn-floating mx-1">
                    <i className={`fab fa-${icon}`}></i>
                  </button>
                ))}
              </div>
              <div className="form-outline mb-3">
              <p className="text-center">or:</p>
              </div>
              {/* Inputs Login */}
              <div className="form-outline mb-3">
                <input
                  type="text"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                 // placeholder="Prenom"
                  required
                />
                <label className="form-label">Email</label>
              </div>
                <div className="form-outline mb-3">
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                 // placeholder="Enter your password"
                  required
                />
                <i className="bi bi-eye-slash" id="togglePassword"></i>
                        <button
          type="button"
          className="btn btn-outline-secondary"
          onClick={() => setShowPassword(!showPassword)} // Basculer l'état
        >
          {showPassword ? "Masquer" : "Afficher"}
        </button>
                <label className="form-label">Password</label>
              </div>

              {/* Affichage des erreurs */}
              {error && <p className="text-danger text-center">{error}</p>}

              {/* Options Login */}
              <div className="d-flex justify-content-between mb-3">
                <div className="form-check">
                  <input className="form-check-input" type="checkbox" id="rememberMe" />
                  <label className="form-check-label" htmlFor="rememberMe">Remember me</label>
                </div>
                <a href="#!">Forgot password?</a>
              </div>

              <button type="submit" className="btn btn-primary w-100">Sign in</button>

              <p className="text-center mt-3">
                Not a member? <a href="#!" onClick={() => setActiveTab("register")}>Register</a>
              </p>
            </form>
          ) : (
            <form>

              {/* Inputs Register */}
              {["Name", "Username", "Email", "Password", "Repeat password"].map((label, index) => (
                <div className="form-outline mb-3" key={index}>
                  <input type={index >= 3 ? "password" : "text"} className="form-control" />
                  <label className="form-label">{label}</label>
                </div>
              ))}

              {/* <div className="form-check text-center mb-3">
                <input className="form-check-input me-2" type="checkbox" id="terms" />
                <label className="form-check-label" htmlFor="terms">
                  I have read and agree to the terms
                </label>
              </div> */}

              <div className="form-check text-center mb-3">
  <input className="form-check-input me-2" type="checkbox" id="terms" />
  <label className="form-check-label" htmlFor="terms">
    I have read and agree to the{' '}
    <a href="#" data-bs-toggle="modal" data-bs-target="#termsModal">
      terms and conditions
    </a>
  </label>
</div>

              <button type="submit" className="btn btn-primary w-100">Register</button>
            </form>
          )}
        </div>
      </div>
      <TermsModal />
    </div>
  );
}

export default Login;

//CreatedAndDevelopedByWassimKhazri
//https://www.linkedin.com/in/wassim-khazri-ab923a14b/ 