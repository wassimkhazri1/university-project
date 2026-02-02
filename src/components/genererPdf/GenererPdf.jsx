import React, { useState } from "react";
import { Button } from "@mui/material"; // Ajout de l'import manquant
import { useNavigate } from "react-router-dom"; // Pour la redirection
import axios from "axios";
const GenererPdf = () => {
  const navigate = useNavigate(); // Hook pour la navigation
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [success1, setSuccess1] = useState(false);
  const [error1, setError1] = useState(null);
  const [success2, setSuccess2] = useState(false);
  const [error2, setError2] = useState(null);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const userString = localStorage.getItem("user");
    if (!userString) {
      navigate("/iset/login");
      return;
    }
    try {
      const user = JSON.parse(userString); // Conversion en objet
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Aucun token trouvé !");
      //CreatedAndDevelopedByWassimKhazri
      //https://www.linkedin.com/in/wassim-khazri-ab923a14b/
      const response = await axios.post(
        `http://localhost:8080/api/attestationEtudiant/generate/${user.id}`,
        user,
        {
          headers: { Authorization: `Bearer ${token}` },
          responseType: "blob", // Important pour les fichiers
        },
      );

      // Créer un URL pour le blob
      const fileURL = window.URL.createObjectURL(new Blob([response.data]));

      // Créer un lien temporaire et déclencher le téléchargement
      const link = document.createElement("a");
      link.href = fileURL;
      link.setAttribute("download", "Attestation.pdf");
      document.body.appendChild(link);
      link.click();

      // Nettoyer
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(fileURL);

      setSuccess1(true);
      <p style={{ color: "green" }}>Attestation générée avec succès!</p>;
    } catch (error1) {
      setError1(
        error1.response?.data?.message || "Erreur lors de la génération",
      );
      console.error("Erreur:", error1);
      <p style={{ color: "red" }}>{error1}</p>;
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit1 = async (e) => {
    e.preventDefault();
    setLoading(true);
    const userString = localStorage.getItem("user");
    if (!userString) {
      navigate("/iset/login");
      return;
    }
    try {
      const user = JSON.parse(userString); // Conversion en objet
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Aucun token trouvé !");
      //CreatedAndDevelopedByWassimKhazri
      //https://www.linkedin.com/in/wassim-khazri-ab923a14b/
      const response1 = await axios.get(
        `http://localhost:8080/api/notes/exportpdf/${user.id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
          responseType: "blob", // Important pour les fichiers
        },
      );

      // Créer un URL pour le blob
      const fileURL = window.URL.createObjectURL(new Blob([response1.data]));

      // Créer un lien temporaire et déclencher le téléchargement
      const link = document.createElement("a");
      link.href = fileURL;
      link.setAttribute("download", "Releve.pdf");
      document.body.appendChild(link);
      link.click();

      // Nettoyer
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(fileURL);

      setSuccess2(true);
    } catch (error2) {
      setError2(
        error2.response1?.data?.message || "Erreur lors de la génération",
      );
      console.error("Erreur:", error2);
    } finally {
      setLoading(false);
    }
  };
  //CreatedAndDevelopedByWassimKhazri
  //https://www.linkedin.com/in/wassim-khazri-ab923a14b/
  return (
    <div>
      <div>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          disabled={loading}
          sx={{ mb: 2 }}
          startIcon={<i className="fas fa-file-export"></i>} // Icône Font Awesome
        >
          {loading ? "Génération en cours..." : "Exporter Attestation en PDF"}
        </Button>

        {success1 && (
          <div style={{ color: "green" }}>
            <i className="fas fa-check-circle"></i> Attestation générée avec
            succès!
          </div>
        )}
        {error1 && (
          <div style={{ color: "red" }}>
            <i className="fas fa-exclamation-circle"></i> {error1}
          </div>
        )}
      </div>
      <div>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit1}
          disabled={loading}
          sx={{ mb: 2 }}
          startIcon={<i className="fas fa-file-export"></i>} // Icône Font Awesome
        >
          {loading ? "Génération en cours..." : "Exporter Relevé en PDF"}
        </Button>

        {success2 && (
          <div style={{ color: "green" }}>
            <i className="fas fa-check-circle"></i> Relevé des notes générée
            avec succès!
          </div>
        )}
        {error2 && (
          <div style={{ color: "red" }}>
            <i className="fas fa-exclamation-circle"></i> {error2}
          </div>
        )}
      </div>
    </div>
  );
};
//CreatedAndDevelopedByWassimKhazri
//https://www.linkedin.com/in/wassim-khazri-ab923a14b/
export default GenererPdf;
