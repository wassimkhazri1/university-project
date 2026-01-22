import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material"; // Ajout de l'import manquant
import AddIcon from "@mui/icons-material/Add"; // Import de l'icône
import JobCard from "./JobCard";

const API = "http://localhost:8080/api/job-offers";
const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // États pour la modale d'ajout
  const [addModalOpen, setAddModalOpen] = useState(false);
  //CreatedAndDevelopedByWassimKhazri
  //https://www.linkedin.com/in/wassim-khazri-ab923a14b/
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

        // Log du token pour vérifier qu'il est bien récupéré
        console.log("Token envoyé : ", token);
        const jobsResponse = await fetch(API, {
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
        const jobsData = await jobsResponse.json();
        console.log("Données reçues :", jobsData);
        setJobs(jobsData);
        // Vérification du statut HTTP
        if (!jobsResponse.ok) {
          throw new Error(`Erreur HTTP : ${jobsResponse.status}`);
        }
      } catch (error) {
        setError("Erreur lors de la récupération des données.");
        console.error("Erreur complète:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Chargement en cours...</div>;
  }

  if (error) {
    return <div className="text-danger">{error}</div>;
  }

  const roles = JSON.parse(localStorage.getItem("user")) || [];
  const isAdmin = roles.roles?.includes("ROLE_ADMIN"); // Vérifie si ROLE_ADMIN est présent
  return (
    <div>
      {/* Nouvelle modale d'ajout */}
      {/* <AddEnseignant
        open={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        onSave={(newJob) => {
          // Ajoute le nouvel étudiant à ta liste
          setJobs([...jobs, newJob]);
        }}
      /> */}
      {/* 
//CreatedAndDevelopedByWassimKhazri
//https://www.linkedin.com/in/wassim-khazri-ab923a14b/ 
    */}
      <div style={{ display: "flex", alignItems: "center" }}>
        {" "}
        <h1
          className="mb-4"
          style={{
            color: "#0d3e5f",
          }}
        >
          <em>
            <span style={{ marginRight: "8px" }}>Liste des offres</span>{" "}
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
            Ajouter une Offre
          </Button>
        </div>
      )}
      <div className="row prof-list">
        {jobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    </div>
  );
};

export default JobList;
