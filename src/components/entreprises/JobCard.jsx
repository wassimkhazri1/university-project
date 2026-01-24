import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IconButton, Tooltip } from "@mui/material"; // Import manquant
import { PlaylistAdd } from "@mui/icons-material";
import "./JobCard.css"; // Importez le fichier CSS pour les styles
import { deleteOffer } from "../../services/api";
import plan2 from "../../images/ISET/plan2.png";
import AutofillApplication from "../candidatures/AutofillApplication";
//CreatedAndDevelopedByWassimKhazri
//https://www.linkedin.com/in/wassim-khazri-ab923a14b/
const JobCard = ({ job }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    setIsFlipped(!isFlipped); // Inverse l'état de la carte
    setIsExpanded(!isExpanded);
  };
  const jobid = job.id;
  console.log("This is jobId:" + jobid);
  const handleDelete = (jobid) => {
    if (window.confirm("Voulez-vous vraiment supprimer cette offre ?")) {
      console.log("Supprimer l'offre ID :", jobid);
      deleteOffer(jobid).then(() => navigate("/iset/offerlist"));
      // deleteOffer(jobid).then(navigate("/iset/offerlist"));
    }
  };

  // Fonction pour ouvrir la modale
  const handleOpenAddModal = () => {
    setAddModalOpen(true);
  };

  return (
    <div
      className={`card ${isFlipped ? "flipped" : ""} ${isExpanded ? "expanded" : ""}`}
      onClick={handleClick}
      role="button" // Ajout pour l'accessibilité
      tabIndex={0} // Permet de naviguer avec le clavier
      onKeyDown={(e) => e.key === "Enter" && handleClick()} // Gestion des événements clavier
      aria-label={`Carte de l'offre ${job.jobTitle} chez ${job.company}. Cliquez pour plus de détails.`} // Description pour les lecteurs d'écran
    >
      <AutofillApplication
        key={job.id}
        job={job}
        open={addModalOpen}
        onClose={() => setAddModalOpen(false)}
      />
      <div className="card-front">
        <div className="card-content">
          <div className="card-info">
            <strong>Company :</strong>
            <h3>{job.company}</h3>
          </div>
          <div className="card-info">
            <strong>Job Title :</strong>
            <h3>{job.jobTitle}</h3>
          </div>
        </div>
      </div>

      <div className="card-back text-start">
        <div className="card-info">
          <strong>Email :</strong>{" "}
          <a href={`mailto:${job.email}`}>{job.email}</a>
        </div>
        <div className="card-info">
          <strong>Téléphone :</strong>{" "}
          <a href={`tel:${job.phone}`}>{job.phone}</a>
        </div>
        <div className="card-info">
          <strong>Job Positions :</strong>
          {job.jobPositions}
        </div>
        <div className="card-info">
          <strong>Description :</strong>
          {job.description}
        </div>
        <div className="card-info">
          <strong>Start Date :</strong>
          {job.startDate}
        </div>
        <div className="card-info">
          <strong>Expiry Date :</strong>
          {job.expiryDate}
        </div>
        <div className="card-info">
          <strong>Formations :</strong>
          {job.formations}
        </div>
        <div>
          <Tooltip title="Poser ta candidature">
            <IconButton
              onClick={handleOpenAddModal}
              color="primary"
              size="large"
            >
              <PlaylistAdd />
            </IconButton>
          </Tooltip>
        </div>
      </div>
    </div>
  );
};
//CreatedAndDevelopedByWassimKhazri
//https://www.linkedin.com/in/wassim-khazri-ab923a14b/
export default JobCard;
