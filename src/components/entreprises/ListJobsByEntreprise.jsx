import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const API = "http://localhost:8080";

function ListJobsByEntreprise() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [candidatures, setCandidatures] = useState([]);
  const [selectedJobId, setSelectedJobId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login");
          return;
        }

        console.log("Token envoyé : ", token);
        const user = JSON.parse(localStorage.getItem("user"));
        const codeId = user.id;
        console.log("ID envoyé : ", codeId);
        const jobsResponse = await fetch(
          API + `/api/job-offers/entreprise/${codeId}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          },
        );

        const jobsData = await jobsResponse.json();
        console.log("Données reçues :", jobsData);
        setJobs(jobsData);

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

  const fetchCandidatures = async (jobId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(API + `/api/candidatures/job/${jobId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Erreur HTTP : ${response.status}`);
      }

      const data = await response.json();
      setCandidatures(data);
      setSelectedJobId(jobId);
      setShowModal(true);
    } catch (error) {
      console.error("Erreur lors de la récupération des candidatures:", error);
      setError("Erreur lors de la récupération des candidatures.");
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setCandidatures([]);
    setSelectedJobId(null);
  };

  if (loading) {
    return <div>Chargement en cours...</div>;
  }

  if (error) {
    return <div className="text-danger">{error}</div>;
  }

  return (
    <div className="container mt-5">
      <div style={{ display: "flex", alignItems: "center" }}>
        {" "}
        <h1
          className="mb-4"
          style={{
            color: "#0d3e5f",
          }}
        >
          <em>
            <span style={{ marginRight: "8px" }}>Mes Annonces</span>{" "}
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
      {/* <h1 className="text-center mb-4">Mes Annonces</h1> */}
      <div className="table-responsive">
        <table className="table table-bordered table-striped">
          <thead className="thead-dark">
            <tr>
              <th>Job Title</th>
              <th>Description</th>
              <th>Job Positions</th>
              <th>Start Date</th>
              <th>Expiry Date</th>
              <th>Web</th>
              <th>Nombre de candidatures</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(jobs) && jobs.length > 0 ? (
              jobs.map((job) => (
                <tr key={job.id}>
                  <td>{job.jobTitle}</td>
                  <td>{job.description}</td>
                  <td>{job.jobPositions}</td>
                  <td>{job.startDate}</td>
                  <td>{job.expiryDate}</td>
                  <td>{job.website}</td>
                  <td>
                    <button
                      className="btn btn-link p-0"
                      onClick={() => fetchCandidatures(job.id)}
                      disabled={job.candidatureCount === 0}
                    >
                      {job.candidatureCount}
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center">
                  Aucune annonce disponible
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal pour afficher les candidatures */}
      <Modal show={showModal} onHide={handleCloseModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Candidatures pour l'offre #{selectedJobId}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {candidatures.length > 0 ? (
            <div className="table-responsive">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>CV</th>
                    <th>Lettre de motivation</th>
                    <th>Date de candidature</th>
                  </tr>
                </thead>
                <tbody>
                  {candidatures.map((candidature) => (
                    <tr key={candidature.id}>
                      <td>
                        <a
                          href={`${API}/api/candidatures/${candidature.id}/download/cv`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Télécharger CV
                        </a>
                      </td>
                      <td>
                        {candidature.lettreMotivationPath ? (
                          <a
                            href={`${API}/api/candidatures/${candidature.id}/download/lettre`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Télécharger Lettre
                          </a>
                        ) : (
                          "Non fournie"
                        )}
                      </td>
                      <td>
                        {new Date(candidature.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p>Aucune candidature trouvée pour cette offre.</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Fermer
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ListJobsByEntreprise;
