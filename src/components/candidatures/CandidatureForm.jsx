//CreatedAndDevelopedByWassimKhazri
//https://www.linkedin.com/in/wassim-khazri-ab923a14b/
import React, { useState } from 'react';
import { createCandidature } from '../../services/candidatures/candidatureService';

const CandidatureForm = ({ onCandidatureCreated }) => {
    const [cvFile, setCvFile] = useState(null);
    const [lettreFile, setLettreFile] = useState(null);
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!cvFile || !lettreFile) {
            setError('Veuillez sélectionner les deux fichiers');
            return;
        }
//CreatedAndDevelopedByWassimKhazri
//https://www.linkedin.com/in/wassim-khazri-ab923a14b/
        setIsSubmitting(true);
        setError('');

        try {
            const response = await createCandidature(cvFile, lettreFile);
            onCandidatureCreated(response.data);
            setCvFile(null);
            setLettreFile(null);
        } catch (err) {
            setError('Erreur lors de l\'envoi des fichiers');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="card mt-4">
            <div className="card-body">
                <h5 className="card-title">Ajouter une candidature</h5>
                {error && <div className="alert alert-danger">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="cv" className="form-label">CV (PDF, DOC, DOCX)</label>
                        <input 
                            type="file" 
                            className="form-control" 
                            id="cv" 
                            accept=".pdf,.doc,.docx"
                            onChange={(e) => setCvFile(e.target.files[0])}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="lettre" className="form-label">Lettre de Motivation (PDF, DOC, DOCX)</label>
                        <input 
                            type="file" 
                            className="form-control" 
                            id="lettre" 
                            accept=".pdf,.doc,.docx"
                            onChange={(e) => setLettreFile(e.target.files[0])}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                        {isSubmitting ? 'Envoi en cours...' : 'Envoyer'}
                    </button>
                </form>
            </div>
        </div>
    );
};
//CreatedAndDevelopedByWassimKhazri
//https://www.linkedin.com/in/wassim-khazri-ab923a14b/
export default CandidatureForm;