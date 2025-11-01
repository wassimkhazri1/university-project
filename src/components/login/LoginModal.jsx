import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import 'bootstrap-icons/font/bootstrap-icons.css';
import logo from "../../images/ISET/sigles/sigle.png";
import "./LoginModal.css";

const LoginModal = ({ show, onClose }) => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [captcha, setCaptcha] = useState("");
  const [captchaInput, setCaptchaInput] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  // Générer un CAPTCHA aléatoire
  const generateCaptcha = () => {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789";
    let code = "";
    for (let i = 0; i < 6; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptcha(code);
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Vérification du code captcha
    if (captchaInput !== captcha) {
      setError("❌ Code de sécurité incorrect !");
       alert("❌ Code incorrect !");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://localhost:8080/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: login,
          password: password,
        }),
      });

      if (!response.ok) {
        throw new Error("Échec de la connexion");
      }

      const data = await response.json();

      // Sauvegarde du token et des infos utilisateur
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data));

      // Redirection selon le rôle
      if (data.roles.includes("ROLE_STUDENT")) {
        navigate("/iset/etudiant");
      } else if (data.roles.includes("ROLE_PROF")) {
        navigate("/iset/prof");
      } else if (data.roles.includes("ROLE_ADMIN")) {
        navigate("/iset/admin");
      } else if (data.roles.includes("ROLE_ENTREPRISE")) {
        navigate("/iset/entreprise");
      } else {
        setError("Rôle utilisateur non reconnu.");
        return;
      }
     alert(`✅ Bienvenue ${login}`);

      // Fermer la modale après succès
      onClose();
    } catch (err) {
      setError("Identifiants incorrects ou erreur de connexion.");
      console.error(err);
    } finally {
      setLoading(false);
    }
}
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (captchaInput.trim() !== captcha.trim()) {
//       alert("❌ Code incorrect !");
//       generateCaptcha(); // régénérer après une erreur
//       setCaptchaInput("");
//       return;
//     }
//     alert(`✅ Bienvenue ${login}`);
//     onClose();
//   };

  return (
    <div
      className={`modal fade custom-modal ${show ? "show d-block" : ""}`}
      tabIndex="-1"
      role="dialog"
      style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
    >
      <div className="modal-dialog modal-lg modal-dialog-centered" role="document">
        <div className="modal-content glassy-card border-0 shadow-lg animate-fade-in">
          <div className="d-flex flex-row">
            {/* Partie gauche - Formulaire */}
            <div className="p-4 flex-grow-1" style={{ width: "50%" }}>
              <h4 className="fw-bold mb-1 text-primary">Se connecter</h4>
              <p className="text-muted mb-4">Étudiant / Enseignant / Administration</p>

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <div className="input-group">
                    <span className="input-group-text bg-transparent text-primary">
                      <i className="bi bi-person-fill"></i>
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Login"
                      value={login}
                      onChange={(e) => setLogin(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <div className="input-group">
                    <span className="input-group-text bg-transparent text-primary">
                      <i className="bi bi-lock-fill"></i>
                    </span>
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Mot de passe"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="mb-3 d-flex align-items-center captcha-container">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Retapez le code"
                    value={captchaInput}
                    onChange={(e) => setCaptchaInput(e.target.value)}
                    required
                  />
                  <div className="captcha-box ms-2">{captcha}</div>
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-primary ms-2 rounded-circle refresh-btn"
                    onClick={generateCaptcha}
                    title="Rafraîchir le code"
                  >
                    <i className="bi bi-arrow-clockwise"></i>
                  </button>
                </div>

                <a href="#" className="small text-primary d-block mb-3">
                  Mot de passe oublié ?
                </a>

                <button type="submit" className="btn btn-primary w-100 rounded-pill shadow-sm">
                  <i className="bi bi-box-arrow-in-right me-2"></i> Se connecter
                </button>
              </form>

              <div className="text-center mt-3">
                <button
                  type="button"
                  className="btn btn-outline-secondary btn-sm rounded-pill"
                  onClick={onClose}
                >
                  Retour à l'accueil
                </button>
              </div>
            </div>

            {/* Partie droite */}
            <div
              className="d-none d-md-flex flex-column justify-content-center align-items-center right-panel p-4"
              style={{ width: "50%" }}
            >
              <img src={logo} alt="ISET Logo" className="mb-3" style={{ width: "100px" }} />
              <p className="fw-semibold text-center mb-1 text-dark">
                المعهد العالي للدراسات التكنولوجية بجندوبة
              </p>
              <p className="text-dark text-center small">
                Institut Supérieur des Études Technologiques de Jendouba
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
