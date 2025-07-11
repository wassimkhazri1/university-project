// src/components/CandidatureItem.js

import React from 'react';
import { downloadCv, downloadLettre, deleteCandidature } from "../../services/candidatures/candidatureService";

const CandidatureItem = ({ candidature, onDelete }) => {
    const handleDownloadCv = async () => {
//CreatedAndDevelopedByWassimKhazri
//https://www.linkedin.com/in/wassim-khazri-ab923a14b/
        try {
            const response = await downloadCv(candidature.id);
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `cv_${candidature.id}.${getFileExtension(candidature.cvPath)}`);
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (error) {
            console.error('Erreur lors du téléchargement', error);
        }
    };

    const handleDownloadLettre = async () => {
        try {
            const response = await downloadLettre(candidature.id);
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `lettre_${candidature.id}.${getFileExtension(candidature.lettreMotivationPath)}`);
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (error) {
            console.error('Erreur lors du téléchargement', error);
        }
    };

    const handleDelete = async () => {
        try {
            await deleteCandidature(candidature.id);
            onDelete(candidature.id);
        } catch (error) {
            console.error('Erreur lors de la suppression', error);
        }
    };

    const getFileExtension = (filename) => {
        return filename.split('.').pop();
    };

    return (
        <div className="card mb-3">
            <div className="card-body">
                <h5 className="card-title">Candidature #{candidature.id}</h5>
                <div className="d-flex gap-2 mb-2">
                    <button onClick={handleDownloadCv} className="btn btn-outline-primary">
                        Télécharger CV
                    </button>
                    <button onClick={handleDownloadLettre} className="btn btn-outline-primary">
                        Télécharger Lettre
                    </button>
                </div>
                <button onClick={handleDelete} className="btn btn-danger">
                    Supprimer
                </button>
{/*                
CreatedAndDevelopedByWassimKhazri
https://www.linkedin.com/in/wassim-khazri-ab923a14b/
*/}
            </div>
        </div>
    );
};

export default CandidatureItem;