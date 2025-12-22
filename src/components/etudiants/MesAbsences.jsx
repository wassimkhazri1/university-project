import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Visibility } from '@mui/icons-material';
import { CircularProgress, IconButton, Tooltip } from "@mui/material";
import DetailsAbsence from '../absence/DetailsAbsence';

const MesAbsences = () => {
    const [absences, setAbsences] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedMatiere, setSelectedMatiere] = useState(null);
    const [detailsModalOpen, setDetailsModalOpen] = useState(false);
    const [user, setUser] = useState(null);

    const fetchData = async () => {
        setLoading(true);
        setError(null);
        
        try {
            const userString = localStorage.getItem('user');
            const token = localStorage.getItem('token');
            
            if (!userString || !token) {
                throw new Error('Authentification requise');
            }

            const userData = JSON.parse(userString);
            setUser(userData);
            
            const absencesResponse = await axios.get(
                `http://localhost:8080/api/absences/student/${userData.id}`, 
                { headers: { Authorization: `Bearer ${token}` } }
            );

            setAbsences(absencesResponse.data || []);
        } catch (error) {
            console.error("Erreur lors de la récupération des données:", error);
            setError(error.response?.data?.message || error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleDetails = (matiereId) => {
        const matiereDetails = Object.entries(aggregated).find(
            ([_, data]) => data.matiereId === matiereId
        );
        
        if (matiereDetails) {
            setSelectedMatiere({
                nom: matiereDetails[0],
                id: matiereId,
                count: matiereDetails[1].count
            });
            setDetailsModalOpen(true);
        }
    };

    // Agréger les absences par matière
    const aggregated = {};
    absences.forEach(absence => {
        if (!aggregated[absence.matiereNom]) {
            aggregated[absence.matiereNom] = {
                count: 0,
                matiereId: absence.matiereId
            };
        }
        aggregated[absence.matiereNom].count += absence.count;
    });

    if (loading) {
        return (
            <div className="d-flex justify-content-center mt-5">
                <CircularProgress />
            </div>
        );
    }

    if (error) {
        return <div className="alert alert-danger mt-3">Erreur: {error}</div>;
    }

    return (
        <div>
            <DetailsAbsence
                open={detailsModalOpen}
                onClose={() => setDetailsModalOpen(false)}
                matiere={selectedMatiere}
                studentId={user?.id}
            />
            
            <div className="container mt-4">
                <h1 className="mb-4">Mes Absences</h1>
                
                <div className="table-responsive">
                    <table className="table table-striped table-bordered">
                        <thead className="thead-dark">
                            <tr>
                                <th>ID Matière</th>
                                <th>Matière</th>
                                <th>Nombre d'absences</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Object.entries(aggregated).length > 0 ? (
                                Object.entries(aggregated).map(([matiereNom, data]) => {
                                    let rowClass = '';
                                    if (data.count >= 3) {
                                        rowClass = 'table-danger';
                                    } else if (data.count === 2) {
                                        rowClass = 'table-warning';
                                    } else if (data.count === 1) {
                                        rowClass = 'table-success';
                                    }
                                    
                                    return (
                                        <tr key={data.matiereId} className={rowClass}>
                                            <td>{data.matiereId}</td>
                                            <td>{matiereNom}</td>
                                            <td>{data.count}</td>
                                            <td>
                                                <Tooltip title="Voir les détails">
                                                    <IconButton
                                                        onClick={() => handleDetails(data.matiereId)}
                                                        color="primary"
                                                        aria-label={`Détails des absences pour ${matiereNom}`}
                                                    >
                                                        <Visibility fontSize="small" />
                                                    </IconButton>
                                                </Tooltip>
                                            </td>
                                        </tr>
                                    );
                                })
                            ) : (
                                <tr>
                                    <td colSpan="4" className="text-center">Aucune absence disponible</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default MesAbsences;