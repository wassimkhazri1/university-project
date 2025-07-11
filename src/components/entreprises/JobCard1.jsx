import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IconButton, Tooltip } from '@mui/material';
import axios from 'axios';
import { Edit, Delete } from "@mui/icons-material";
import EditEnseignant from "../../components/enseignants/EditEnseignant";
import "./JobCard.css";
import { deleteOffer } from '../../services/api';
import plan2 from "../../images/ISET/plan2.png";
import AutofillApplication from "../candidatures/AutofillApplication";

const JobCard = ({ job }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [selectedEnseignant, setSelectedEnseignant] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => setIsFlipped(!isFlipped);

  const handleDelete = (jobid) => {
    if (window.confirm("Voulez-vous vraiment supprimer cette offre ?")) {
      deleteOffer(jobid).then(navigate("/iset/offerlist"));
    }
  };

  const handleSave = async (job) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(
        `http://localhost:8080/api/job-offers/${job.id}`,
        job,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setEditModalOpen(false);
    } catch (error) {
      console.error("Erreur lors de la mise à jour:", error);
    }
  };

  const handleEdit = () => {
    setSelectedEnseignant(job);
    setEditModalOpen(true);
  };

  return (
    <div
      className={`card ${isFlipped ? "flipped" : ""}`}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && handleClick()}
      aria-label={`Offre d'emploi chez ${job.company}`}
    >
      <EditEnseignant
        open={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        enseignant={selectedEnseignant}
        onSave={handleSave}
      />

      <div className="card-front">
        <div className="card-header">
          <h3 className="company-name">{job.company}</h3>
          <p className="job-title">{job.jobTitle}</p>
        </div>
      </div>

      <div className="card-back">
        <div className="card-details">
          <p><strong>Email:</strong> <a href={`mailto:${job.email}`}>{job.email}</a></p>
          <p><strong>Téléphone:</strong> <a href={`tel:${job.phone}`}>{job.phone}</a></p>
          <p><strong>Postes:</strong> {job.jobPositions}</p>
          <p><strong>Description:</strong> {job.description}</p>
          <p><strong>Date début:</strong> {job.startDate}</p>
          <p><strong>Date expiration:</strong> {job.expiryDate}</p>
          <p><strong>Formations:</strong> {job.formations}</p>
        </div>

        <div className="card-actions">
          <Tooltip title="Modifier">
            <IconButton onClick={handleEdit} color="primary">
              <Edit fontSize="small" />
            </IconButton>
          </Tooltip>
          
          <Tooltip title="Supprimer">
            <IconButton onClick={() => handleDelete(job.id)} color="error">
              <Delete fontSize="small" />
            </IconButton>
          </Tooltip>
          
          <AutofillApplication />
        </div>
      </div>
    </div>
  );
};

export default JobCard;