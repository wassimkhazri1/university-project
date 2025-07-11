import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Typography
} from '@mui/material';

const DetailsAbsence = ({ open, onClose, matiere, studentId }) => {
  const [absencesDetails, setAbsencesDetails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAbsenceDetails = async () => {
      if (open && matiere?.id && studentId) {
        setLoading(true);
        setError(null);
        try {
          const token = localStorage.getItem('token');
          
          const response = await axios.get(
            `http://localhost:8080/api/absences/student/${studentId}/${matiere.id}`,
            { 
              headers: { Authorization: `Bearer ${token}` } 
            }
          );
          
          setAbsencesDetails(response.data || []);
        } catch (err) {
          console.error("Erreur lors de la récupération des détails:", err);
          setError(err.response?.data?.message || err.message || "Une erreur est survenue");
        } finally {
          setLoading(false);
        }
      }
    };

    fetchAbsenceDetails();

    // Nettoyage lors de la fermeture
    return () => {
      if (!open) {
        setAbsencesDetails([]);
        setError(null);
      }
    };
  }, [open, matiere?.id, studentId]);

  return (
    <Dialog 
      open={open} 
      onClose={onClose} 
      maxWidth="md" 
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3
        }
      }}
    >
      <DialogTitle sx={{ bgcolor: 'primary.main', color: 'white' }}>
        <Typography variant="h6">
          Détails des absences - {matiere?.nom || 'Matière inconnue'}
        </Typography>
        <Typography variant="subtitle1">
          Total: {matiere?.count || 0} absence(s)
        </Typography>
      </DialogTitle>
      
      <DialogContent sx={{ mt: 2 }}>
        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', padding: 20 }}>
            <CircularProgress />
          </div>
        ) : error ? (
          <div className="alert alert-danger" style={{ margin: 16 }}>
            Erreur: {error}
          </div>
        ) : (
          <TableContainer component={Paper} elevation={0}>
            <Table size="small">
              <TableHead>
                <TableRow sx={{ bgcolor: 'grey.100' }}>
                  <TableCell sx={{ fontWeight: 'bold' }}>Date</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Statut</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Justification</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {absencesDetails.length > 0 ? (
                  absencesDetails.map((absence, index) => (
                    <TableRow 
                      key={index}
                      sx={{ 
                        '&:nth-of-type(odd)': { bgcolor: 'action.hover' },
                        '&:last-child td': { borderBottom: 0 }
                      }}
                    >
                      <TableCell>
                        {absence.date ? new Date(absence.date).toLocaleDateString('fr-FR') : 'N/A'}
                      </TableCell>
                      <TableCell>
                        {absence.count ? `${absence.count} heure(s)` : 'N/A'}
                      </TableCell>
                      <TableCell>
                        {absence.justifie ? (
                          <span style={{ color: 'green' }}>Justifiée</span>
                        ) : (
                          <span style={{ color: 'red' }}>Non justifiée</span>
                        )}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={3} align="center" sx={{ py: 3 }}>
                      <Typography color="textSecondary">
                        Aucune absence détaillée disponible
                      </Typography>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </DialogContent>
      
      <DialogActions sx={{ p: 2 }}>
        <Button 
          onClick={onClose} 
          color="primary"
          variant="contained"
          sx={{ borderRadius: 2 }}
        >
          Fermer
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DetailsAbsence;