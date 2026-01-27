import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import { Button } from "@mui/material"; // Ajout de l'import manquant
import AddIcon from "@mui/icons-material/Add"; // Import de l'icône
import ProfCard from "./ProfCard";
//CreatedAndDevelopedByWassimKhazri
//https://www.linkedin.com/in/wassim-khazri-ab923a14b/
import AddEnseignant from "./AddEnseignant";
import "../iset/RegmentInterne.css";
//import './ProfList.css';
const API = "http://localhost:8080/api/professeurs";
const ProfList = () => {
  const roles = JSON.parse(localStorage.getItem("user")) || [];
  const isAdmin = roles.roles?.includes("ROLE_ADMIN"); // Vérifie si ROLE_ADMIN est présent
  // Exemple de données de professeurs
  const [profs, setProfs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  //CreatedAndDevelopedByWassimKhazri
  //https://www.linkedin.com/in/wassim-khazri-ab923a14b/
  const [editModalOpen, setEditModalOpen] = useState(false);

  // États pour la modale d'ajout
  const [addModalOpen, setAddModalOpen] = useState(false);

  // Fonction pour ouvrir la modale
  const handleOpenAddModal = () => {
    setAddModalOpen(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/iset/login");
          return;
        }
        const profsResponse = await fetch(API, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        {
          /*     const notesResponse = await fetch(API + "/api/notes/mes-notes", {
            headers: authHeader() 
          }); */
        }
        const profsData = await profsResponse.json();
        setProfs(profsData);
        // Vérification du statut HTTP
        if (!profsResponse.ok) {
          throw new Error(`Erreur HTTP : ${profsResponse.status}`);
        }
      } catch (error) {
        setError(
          error.message || "Erreur lors de la récupération des données.",
        );
        console.error("Erreur complète:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <CircularProgress color="primary" />;
  }

  if (error) {
    return <div className="text-danger">{error}</div>;
  }

  const filteredProfs = profs.filter((prof) =>
    `${prof.prenom} ${prof.nom}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase()),
  );
  return (
    <div>
      {/* Nouvelle modale d'ajout */}
      <AddEnseignant
        open={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        onSave={(newProf) => {
          // Ajoute le nouvel étudiant à ta liste
          setProfs([...profs, newProf]);
        }}
      />
      <div style={{ display: "flex", alignItems: "center" }}>
        {" "}
        <h1
          className="mb-4"
          style={{
            color: "#0d3e5f",
          }}
        >
          <em>
            <span style={{ marginRight: "8px" }}>
              Liste des Enseignants
            </span>{" "}
          </em>
        </h1>
        <hr
          style={{
            flexGrow: 1,
            height: "3px",
            backgroundColor: "#0d3e5f",
            border: "none",
          }}
        />{" "}
      </div>
      {isAdmin && (
        <div style={{ marginBottom: "20px" }}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={handleOpenAddModal}
            sx={{ mb: 2 }}
          >
            Ajouter un Enseignant
          </Button>
        </div>
      )}
      {error && (
        <div style={{ color: "red", marginBottom: "10px" }}>{error}</div>
      )}
      {/* Champ de recherche */}
      <div className="container">
        <input
          type="text"
          placeholder="🔍 Rechercher un prof..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />{" "}
      </div>
      <div className="row prof-list">
        {filteredProfs.length > 0 ? (
          filteredProfs.map((prof) => <ProfCard key={prof.id} prof={prof} />)
        ) : (
          <p>Aucun enseignant trouvé.</p>
        )}
      </div>
    </div>
  );
};

export default ProfList;

//CreatedAndDevelopedByWassimKhazri
//https://www.linkedin.com/in/wassim-khazri-ab923a14b/
