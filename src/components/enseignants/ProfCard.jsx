import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IconButton, Tooltip } from '@mui/material'; // Import manquant
import axios from 'axios';
import { Edit, Delete } from "@mui/icons-material";
import EditEnseignant from "./EditEnseignant";
import './ProfCard.css'; // Importez le fichier CSS pour les styles
import { deleteEnseignant } from '../../services/api';
import plan2 from "../../images/ISET/plan2.png";

const ProfCard = ({ prof }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [selectedEnseignant, setSelectedEnseignant] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [profs, setProfs] = useState([]);
  const navigate = useNavigate();

  const handleClick = () => {
    setIsFlipped(!isFlipped); // Inverse l'état de la carte
  };
  const profid = prof.id;
  console.log("This is ProfId:"+ profid);
  const handleDelete = (profid) => {
    if (window.confirm("Voulez-vous vraiment supprimer cet enseignant ?")) {
      console.log("Supprimer l'étudiant ID :", profid);
      deleteEnseignant(profid).then(navigate("/iset/proflist"));
    }
  };
//CreatedAndDevelopedByWassimKhazri
//https://www.linkedin.com/in/wassim-khazri-ab923a14b/
 const handleSave = async (prof) => {
   try {
     const token = localStorage.getItem('token');
     const response = await axios.put(
       `http://localhost:8080/api/enseignants/${prof.id}`,
       prof,
       {
         headers: {
           Authorization: `Bearer ${token}`
         }
       }
     );
     
     setProfs(profs.map(p => 
       p.id === prof.id ? response.data : p
     ));
     setEditModalOpen(false);
   } catch (error) {
     console.error("Erreur lors de la mise à jour:", error);
     // Gérer l'affichage d'une erreur à l'utilisateur
   }
 };
 
  const handleEdit = () => {
   // const prof = profs.find(p => p.id === id);
    setSelectedEnseignant( prof );
    setEditModalOpen(true);
  };

  return (

<div
  className={`card ${isFlipped ? "flipped" : ""}`}
  onClick={handleClick}
  role="button" // Ajout pour l'accessibilité
  tabIndex={0} // Permet de naviguer avec le clavier
  onKeyDown={(e) => e.key === "Enter" && handleClick()} // Gestion des événements clavier
  aria-label={`Carte de ${prof.nom} ${prof.prenom}. Cliquez pour plus de détails.`} // Description pour les lecteurs d'écran
>
      <EditEnseignant
    open={editModalOpen}
    onClose={() => setEditModalOpen(false)}
    enseignant={selectedEnseignant}
    onSave={handleSave}
  />
  <div className="card-front" style={{
        backgroundImage: `url(${plan2})`
      }}>
    <h3 className="card-title">{prof.nom} {prof.prenom}</h3>
  </div>
  <div className="card-back text-start">
    <p className="card-info"><strong>Email :</strong> <a href={`mailto:${prof.email}`}>{prof.email}</a></p>
    <p className="card-info"><strong>Téléphone :</strong> <a href={`tel:${prof.telephone}`}>{prof.telephone}</a></p>
    <div>
            {/* Bouton Éditer */}
            <Tooltip title="Modifier">
              <IconButton
                onClick={() => handleEdit()}
                color="primary"
              >
                <Edit fontSize="small" />
              </IconButton>
            </Tooltip>
    {/*
//CreatedAndDevelopedByWassimKhazri
//https://www.linkedin.com/in/wassim-khazri-ab923a14b/
    */}
            {/* Bouton Supprimer */}
            <Tooltip title="Supprimer">
              <IconButton
                onClick={() => handleDelete(prof.id)}
                color="error"
              >
                <Delete fontSize="small" />
              </IconButton>
            </Tooltip>
          </div>
  </div>
</div>
  );
};

export default ProfCard;