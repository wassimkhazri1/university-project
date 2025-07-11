import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, CircularProgress, Alert } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import JobCard from "./JobCard";
import AddEnseignant from "../../components/enseignants/AddEnseignant";
import "./JobList.css";

const API = "http://localhost:8080/api/job-offers";

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [addModalOpen, setAddModalOpen] = useState(false);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user")) || {};
  const isAdmin = user.roles?.includes("ROLE_ADMIN");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/iset/login");
          return;
        }

        const response = await fetch(API, {
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        });

        if (!response.ok) {
          throw new Error(`Erreur HTTP : ${response.status}`);
        }

        const data = await response.json();
        setJobs(data);
      } catch (err) {
        setError("Erreur lors de la récupération des données.");
        console.error("Erreur:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <div className="job-list-container">
      <AddEnseignant
        open={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        onSave={(newJob) => setJobs([...jobs, newJob])}
      />

      <div className="job-list-header">
        <h1>Liste des offres</h1>
        {isAdmin && (
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={() => setAddModalOpen(true)}
          >
            Ajouter une Offre
          </Button>
        )}
      </div>

      <div className="job-list-grid">
        {jobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    </div>
  );
};

export default JobList;