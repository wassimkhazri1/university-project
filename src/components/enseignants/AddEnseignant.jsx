import React, { useState } from 'react';
//import { useNavigate } from 'react-router-dom';
//CreatedAndDevelopedByWassimKhazri
//https://www.linkedin.com/in/wassim-khazri-ab923a14b/
import axios from 'axios';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,  
  TextField,
  MenuItem,
  Button,
  Grid,
  CircularProgress,
  Snackbar,
  Alert
} from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

function AddEnseignant({ open, onClose, onSave }) {
//  const navigate = useNavigate();
  const [enseignant, setEnseignant] = useState({
    classe: { id: '' },
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setEnseignant(prev => ({
        ...prev,
        [parent]: { ...prev[parent], [child]: value },
      }));
    } else {
        setEnseignant(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error("Aucun token trouvé !");
      
      await axios.post('http://localhost:8080/api/enseignants', enseignant, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      setSuccess(true);
      setTimeout(onClose, 1500); // Ferme la modale après succès
    } catch (error) {
      setError(error.response?.data?.message || "Erreur lors de l'ajout");
      console.error('Erreur:', error);
    } finally {
      setLoading(false);
    }
  };

  const classes = [
    { value: '', label: 'Sélectionnez une classe' },
    { value: '1', label: 'CLASSE A' },
    { value: '2', label: 'CLASSE B' },
    { value: '3', label: 'CLASSE C' },
    { value: '4', label: 'CLASSE D' },
    { value: '5', label: 'CLASSE E' },
    { value: '6', label: 'CLASSE F' },
    { value: '7', label: 'CLASSE G' },
    { value: '8', label: 'CLASSE H' },
    { value: '9', label: 'CLASSE I' },
    { value: '10', label: 'CLASSE J' },
  ];

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
    <DialogTitle>Ajouter un nouvel enseignant</DialogTitle>
    <DialogContent dividers>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              {/* Ligne 1 - Nom et Prénom */}
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Nom"
                  name="nom"
                  value={enseignant.nom}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Prénom"
                  name="prenom"
                  value={enseignant.prenom}
                  onChange={handleChange}
                  required
                />
              </Grid>

              {/* Ligne 2 - Email et CIN */}
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Email"
                  type="email"
                  name="email"
                  value={enseignant.email}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Carte d'Identité"
                  name="cinNumber"
                  value={enseignant.cinNumber}
                  onChange={handleChange}
                  required
                />
              </Grid>
              {/*
              //CreatedAndDevelopedByWassimKhazri
              //https://www.linkedin.com/in/wassim-khazri-ab923a14b/
              */}
              {/* Ligne 3 - Téléphone et Password */}
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Téléphone"
                  name="telephone"
                  value={enseignant.telephone}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Mot de passe"
                  type="password"
                  name="password"
                  value={enseignant.password}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  select
                  fullWidth
                  label="Classe"
                  name="classe"
                  value={enseignant.classe.id}
                  onChange={handleChange}
                  required
                >
                  {classes.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
            </Grid>
          </form>


      {/* Notifications */}
      <Snackbar open={success} autoHideDuration={3000} onClose={() => setSuccess(false)}>
        <Alert severity="success">Enseignant ajouté avec succès!</Alert>
      </Snackbar>
      
      <Snackbar open={!!error} autoHideDuration={6000} onClose={() => setError(null)}>
        <Alert severity="error">{error}</Alert>
      </Snackbar>
    </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Annuler</Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          startIcon={loading ? <CircularProgress size={20} /> : <PersonAddIcon />}
          disabled={loading}
        >
          {loading ? 'Enregistrement...' : 'Ajouter'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddEnseignant;
//CreatedAndDevelopedByWassimKhazri
//https://www.linkedin.com/in/wassim-khazri-ab923a14b/