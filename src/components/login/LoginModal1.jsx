// src/components/login/LoginModal.jsx
// Created and Developed by Wassim Khazri

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../images/ISET/sigles/sigle.png";
import "./LoginModal.css";

const LoginModal = ({ show, onClose }) => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [captcha, setCaptcha] = useState("31K1BiM");
  const [captchaInput, setCaptchaInput] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Vérification du code captcha
    if (captchaInput !== captcha) {
      setError("❌ Code de sécurité incorrect !");
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

      // Fermer la modale après succès
      onClose();
    } catch (err) {
      setError("Identifiants incorrects ou erreur de connexion.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`modal fade ${show ? "show d-block" : ""}`}
      tabIndex="-1"
      role="dialog"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog modal-lg modal-dialog-centered" role="document">
        <div className="modal-content border-0 shadow-lg">
          <div className="d-flex flex-row">
            {/* Partie gauche : formulaire */}
            <div className="p-4 flex-grow-1" style={{ width: "50%" }}>
              <h4 className="fw-bold mb-1">Se connecter</h4>
              <p className="text-muted mb-4">
                Étudiant / Enseignant / Administration
              </p>

              <form onSubmit={handleSubmit}>
                {/* Login */}
                <div className="mb-3">
                  <div className="input-group">
                    <span className="input-group-text">
                      <i className="bi bi-person-fill"></i>
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Email ou identifiant"
                      value={login}
                      onChange={(e) => setLogin(e.target.value)}
                      required
                    />
                  </div>
                </div>

                {/* Mot de passe */}
                <div className="mb-3">
                  <div className="input-group">
                    <span className="input-group-text">
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

                {/* Captcha */}
                <div className="mb-3 d-flex align-items-center">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Retapez le code"
                    value={captchaInput}
                    onChange={(e) => setCaptchaInput(e.target.value)}
                    required
                  />
                  <span
                    className="border rounded px-3 py-1 bg-light ms-2 fw-bold"
                    style={{ fontFamily: "monospace" }}
                  >
                    {captcha}
                  </span>
                </div>

                {/* Message d’erreur */}
                {error && (
                  <div className="alert alert-danger py-2 text-center">
                    {error}
                  </div>
                )}

                {/* Bouton de connexion */}
                <button
                  type="submit"
                  className="btn btn-success w-100"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span
                        className="spinner-border spinner-border-sm me-2"
                        role="status"
                      ></span>
                      Connexion...
                    </>
                  ) : (
                    <>
                      <i className="bi bi-box-arrow-in-right me-2"></i>
                      Se connecter
                    </>
                  )}
                </button>
              </form>

              <div className="text-center mt-3">
                <button
                  type="button"
                  className="btn btn-outline-secondary btn-sm"
                  onClick={onClose}
                >
                  Retour à la page d'accueil
                </button>
              </div>
            </div>

            {/* Partie droite : logo + texte */}
            <div
              className="d-none d-md-flex flex-column justify-content-center align-items-center bg-light p-4"
              style={{ width: "50%" }}
            >
              <img
                src={logo}
                alt="ISET Logo"
                className="mb-3"
                style={{ width: "100px" }}
              />
              <p
                className="fw-semibold text-center mb-1"
                style={{ fontSize: "0.9rem" }}
              >
                المعهد العالي للدراسات التكنولوجية بجندوبة
              </p>
              <p
                className="text-muted text-center"
                style={{ fontSize: "0.8rem" }}
              >
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
