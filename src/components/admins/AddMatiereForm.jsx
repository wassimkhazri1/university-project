import Swal from "sweetalert2";
import React, { useState } from 'react';
import axios from 'axios';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
    FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  TextField,
  Button,
  Grid,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import AddIcon from '@mui/icons-material/Add';

const AddMatiereForm = ({ open, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    nom: '',
    codeIntitule: '',
    nature: null,
    niveauScol: null,
    semestre: null
  });

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [errors, setErrors] = useState({});

  const niveauScolOptions = [
    { id: 1, nom: 'PREMIERE_ANNEE' },
    { id: 2, nom: 'DEUXIEME_ANNEE' },
    { id: 3, nom: 'TROISIEME_ANNEE' }
  ];

  const semestreOptions = [
    { id: 1, nom: 'SEMESTRE1' },
    { id: 2, nom: 'SEMESTRE2' }
  ];

  const natureOptions = [
    { id: 1, nom: 'FONDAMENTALE' },
    { id: 2, nom: 'DECOUVERTE' },
    { id: 3, nom: 'TRANSVERSALE' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleRadioChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value
    });
  };
const validate = () => {
  const newErrors = {};
  if (!formData.nom) newErrors.nom = "Ce champ est requis";
  if (!formData.codeIntitule) newErrors.codeIntitule = "Ce champ est requis";
  // Ajoutez d'autres validations ici
  return newErrors;
};
  const handleSubmit = async (e) => {
    e.preventDefault();
          const validationErrors = validate();
  if (Object.keys(validationErrors).length > 0) {
    setErrors(validationErrors);
    return;
  }
    
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:8080/api/matieres', {
        nom: formData.nom,
        codeIntitule: formData.codeIntitule,
        nature: formData.nature,
        niveauScol: formData.niveauScol,
        semestre: formData.semestre
      }, {
        headers: { 
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
           Swal.fire({
              title: "Succès!",
              text: "Matière ajoutée avec succès!",
              icon: "success",
              confirmButtonText: "OK",
            });

        // setSnackbarMessage('Matière ajoutée avec succès!');
        // setSnackbarSeverity('success');
        // setOpenSnackbar(true);
      
      // Reset form
      setFormData({
        nom: '',
        codeIntitule: '',
        nature: null,
        niveauScol: null,
        semestre: null
      });
      onClose();
      
    } catch (error) {
      console.error('Error adding subject:', error);
      setSnackbarMessage('Erreur lors de l\'ajout de la matière');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (

          <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Ajouter matière</DialogTitle>
      <DialogContent dividers>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          {/* Nom de la matière */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Nom de la matière"
              name="nom"
              value={formData.nom}
              onChange={handleInputChange}
              required
              variant="outlined"
                error={!!errors.nom}
                helperText={errors.nom}
            />
          </Grid>

          {/* Code Intitulé */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Code Intitulé"
              name="codeIntitule"
              value={formData.codeIntitule}
              onChange={handleInputChange}
              required
              variant="outlined"
                error={!!errors.codeIntitule}
                helperText={errors.codeIntitule}
            />
          </Grid>

          {/* Nature */}
          <Grid item xs={12}>
            <FormControl component="fieldset">
              <FormLabel component="legend">Nature</FormLabel>
              <RadioGroup row name="nature" value={formData.nature?.id || ''}>
                {natureOptions.map((option) => (
                  <FormControlLabel
                    key={option.id}
                    value={option.id}
                    control={<Radio />}
                    label={option.nom}
                    onChange={() => handleRadioChange('nature', option)}
                  />
                ))}
              </RadioGroup>
            </FormControl>
          </Grid>

          {/* Niveau Scolaire */}
          <Grid item xs={12}>
            <FormControl component="fieldset">
              <FormLabel component="legend">Niveau Scolaire</FormLabel>
              <RadioGroup row name="niveauScol" value={formData.niveauScol?.id || ''}>
                {niveauScolOptions.map((option) => (
                  <FormControlLabel
                    key={option.id}
                    value={option.id}
                    control={<Radio />}
                    label={option.nom}
                    onChange={() => handleRadioChange('niveauScol', option)}
                  />
                ))}
              </RadioGroup>
            </FormControl>
          </Grid>

          {/* Semestre */}
          <Grid item xs={12}>
            <FormControl component="fieldset">
              <FormLabel component="legend">Semestre</FormLabel>
              <RadioGroup row name="semestre" value={formData.semestre?.id || ''}>
                {semestreOptions.map((option) => (
                  <FormControlLabel
                    key={option.id}
                    value={option.id}
                    control={<Radio />}
                    label={option.nom}
                    onChange={() => handleRadioChange('semestre', option)}
                  />
                ))}
              </RadioGroup>
            </FormControl>
          </Grid>
        </Grid>
      </form>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
              {/* Notifications */}
              <Snackbar
                open={success}
                autoHideDuration={3000}
                onClose={() => setSuccess(false)}
              >
                <Alert severity="success">Étudiant ajouté avec succès!</Alert>
              </Snackbar>
      
              <Snackbar
                open={error}
                autoHideDuration={6000}
                onClose={() => setError(null)}
              >
                <Alert severity="error">{error}</Alert>
              </Snackbar>
            </DialogContent>
            <DialogActions>
              <Button onClick={onClose}>Annuler</Button>
              <Button
                onClick={handleSubmit}
                variant="contained"
                startIcon={
                  loading ? <CircularProgress size={20} /> : <PersonAddIcon />
                }
                disabled={loading}
              >
                {loading ? "Enregistrement..." : "Ajouter"}
              </Button>
            </DialogActions>
          </Dialog>

  );
};

export default AddMatiereForm;