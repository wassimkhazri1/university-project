import React, { useState } from 'react';
import { Button } from '@mui/material'; // Ajout de l'import manquant
import { useNavigate } from "react-router-dom"; // Pour la redirection
import { motion } from "framer-motion";
import axios from 'axios';
const GenererPdf1 = () => {

  const navigate = useNavigate(); // Hook pour la navigation
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(null);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const userString = localStorage.getItem('user');
    if (!userString) {
      navigate("/iset/login");
      return;
    }
    try {
      const user = JSON.parse(userString); // Conversion en objet
      const token = localStorage.getItem('token');
      if (!token) throw new Error("Aucun token trouvé !");
//CreatedAndDevelopedByWassimKhazri
//https://www.linkedin.com/in/wassim-khazri-ab923a14b/ 
const response = await axios.post(`http://localhost:8080/api/attestationEtudiant/generate/${user.id}`,user, {
        headers: { Authorization: `Bearer ${token}` },
        responseType: 'blob' // Important pour les fichiers
      });
      
     // Créer un URL pour le blob
     const fileURL = window.URL.createObjectURL(new Blob([response.data]));
      
     // Créer un lien temporaire et déclencher le téléchargement
     const link = document.createElement('a');
     link.href = fileURL;
     link.setAttribute('download', 'Attestation.pdf');
     document.body.appendChild(link);
     link.click();
     
     // Nettoyer
     link.parentNode.removeChild(link);
     window.URL.revokeObjectURL(fileURL);

     setSuccess(true);
   <p style={{ color: 'green' }}>Attestation générée avec succès!</p>

   } catch (error) {
     setError(error.response?.data?.message || "Erreur lors de la génération");
     console.error('Erreur:', error);
    <p style={{ color: 'red' }}>{error}</p>
   } finally {
     setLoading(false);
   }
 };
 
 const handleSubmit1 = async (e) => {
  e.preventDefault();
  setLoading(true);
  const userString = localStorage.getItem('user');
  if (!userString) {
    navigate("/iset/login");
    return;
  }
  try {
    const user = JSON.parse(userString); // Conversion en objet
    const token = localStorage.getItem('token');
    if (!token) throw new Error("Aucun token trouvé !");
//CreatedAndDevelopedByWassimKhazri
//https://www.linkedin.com/in/wassim-khazri-ab923a14b/ 
const response1 = await axios.get(`http://localhost:8080/api/notes/exportpdf/${user.id}`, {
      headers: { Authorization: `Bearer ${token}` },
      responseType: 'blob' // Important pour les fichiers
    });
    
   // Créer un URL pour le blob
   const fileURL = window.URL.createObjectURL(new Blob([response1.data]));
    
   // Créer un lien temporaire et déclencher le téléchargement
   const link = document.createElement('a');
   link.href = fileURL;
   link.setAttribute('download', 'Releve.pdf');
   document.body.appendChild(link);
   link.click();
   
   // Nettoyer
   link.parentNode.removeChild(link);
   window.URL.revokeObjectURL(fileURL);

   setSuccess(true);
   {success && <p style={{ color: 'green' }}>RELEVÉ DE NOTES générée avec succès!</p>}
 } catch (error) {
   setError(error.response1?.data?.message || "Erreur lors de la génération");
   console.error('Erreur:', error);
   {error && <p style={{ color: 'red' }}>{error}</p>}
 } finally {
   setLoading(false);
 }
};

const hexButtons = [
  { 
      label: "Génerer l\'attestation", 
      icon: <i className="fas fa-file-export"></i>,
      path: handleSubmit
  },
  { 
      label: "Génerer le relevé de notes",
      icon: <i className="fas fa-file-export"></i>,
      path: handleSubmit1
  }
];
const HexButton = ({ path, label, icon, active }) => {
  const navigate = useNavigate();
  
  return (
      <motion.div
          className={`hex-button text-white text-sm font-semibold flex flex-col items-center justify-center relative cursor-pointer ${
              active ? "border-4 border-red-500" : "border-2 border-white"
          }`}
          whileHover={{ scale: 1.5 }}
          onClick={path}
      >
          <div className="text-2xl mb-1">
              {icon}
          </div>
          <div>{label}</div>
      </motion.div>
  );
};
//CreatedAndDevelopedByWassimKhazri
//https://www.linkedin.com/in/wassim-khazri-ab923a14b/ 
  return (
    <div>
        <div className="min-h-screen bg-gradient-to-br from-blue-200 to-blue-500 flex items-center justify-center p-4"

        >
            <div className="hex-container">
                <div className="hexagon-menu clear">
                    <div className="hexagon-item">
                        <div className="hex-item">
                            {/* Première rangée */}
                            <div className="hex-row">
                                {hexButtons.slice(0, 4).map((btn, i) => (
                                    <HexButton key={i} {...btn} />
                                ))}
                            </div>
                          
                        </div>
                    </div>
                </div>
            </div>
            <div className="pt-table desktop-768">
            </div>
        </div>

    </div>
  );
};
//CreatedAndDevelopedByWassimKhazri
//https://www.linkedin.com/in/wassim-khazri-ab923a14b/ 
export default GenererPdf1;