// src/components/CandidatureList.js

import React, { useState, useEffect } from 'react';
import { getCandidatures } from '../../services/candidatures/candidatureService';
import CandidatureItem from './CandidatureItem';
import CandidatureForm from "./CandidatureForm";

const CandidatureList = () => {
    const [candidatures, setCandidatures] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchCandidatures = async () => {
            try {
                const response = await getCandidatures();
                setCandidatures(response.data);
            } catch (err) {
                setError('Erreur lors du chargement des candidatures');
            } finally {
                setLoading(false);
            }
        };

        fetchCandidatures();
    }, []);

    const handleCandidatureCreated = (newCandidature) => {
        setCandidatures([newCandidature, ...candidatures]);
    };

    const handleDelete = (id) => {
        setCandidatures(candidatures.filter(c => c.id !== id));
    };

    if (loading) return <div>Chargement...</div>;
    if (error) return <div className="alert alert-danger">{error}</div>;

    return (
        <div>
            <h2>Liste des candidatures</h2>
            <CandidatureForm onCandidatureCreated={handleCandidatureCreated} />
            <div className="mt-4">
                {candidatures.length === 0 ? (
                    <p>Aucune candidature enregistrée</p>
                ) : (
                    candidatures.map(candidature => (
                        <CandidatureItem 
                            key={candidature.id} 
                            candidature={candidature} 
                            onDelete={handleDelete}
                        />
                    ))
                )}
                {/* 
                //CreatedAndDevelopedByWassimKhazri
                //https://www.linkedin.com/in/wassim-khazri-ab923a14b/
                */}
            </div>
        </div>
    );
};

export default CandidatureList;