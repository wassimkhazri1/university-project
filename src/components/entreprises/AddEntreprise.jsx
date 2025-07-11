import React, { useState } from "react";
import axios from "axios";
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
  Alert,
} from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

function AddEntreprise({ open, onClose, onSave }) {
  const [entreprise, setEntreprise] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setEntreprise((prev) => ({
        ...prev,
        [parent]: { ...prev[parent], [child]: value },
      }));
    } else {
      setEntreprise((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Aucun token trouvé !");
      //CreatedAndDevelopedByWassimKhazri
      //https://www.linkedin.com/in/wassim-khazri-ab923a14b/
      await axios.post("http://localhost:8080/api/entreprises", entreprise, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setSuccess(true);
      setTimeout(onClose, 1500); // Ferme la modale après succès
      window.location.reload();
    } catch (error) {
      setError(error.response?.data?.message || "Erreur lors de l'ajout");
      console.error("Erreur:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Ajouter une nouvelle entreprise</DialogTitle>
      <DialogContent dividers>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            {/* Ligne 1 - Nom et Prénom */}
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Nom"
                name="nom"
                value={entreprise.nom}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Prénom"
                name="prenom"
                value={entreprise.prenom}
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
                value={entreprise.email}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Carte d'Identité"
                name="cinNumber"
                value={entreprise.cinNumber}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Matricule"
                name="matricule"
                value={entreprise.matricule}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="nom d'Entreprise"
                name="nomcompany"
                value={entreprise.nomcompany}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Owner"
                name="owner"
                value={entreprise.owner}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="rhresponsible"
                name="rhresponsible"
                value={entreprise.rhresponsible}
                onChange={handleChange}
                required
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Adresse"
                name="adresse"
                value={entreprise.adresse}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Fax"
                name="fax"
                value={entreprise.fax}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Web"
                name="web"
                value={entreprise.web}
                onChange={handleChange}
                required
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="linkedin"
                name="linkedin"
                value={entreprise.linkedin}
                onChange={handleChange}
                required
              />
            </Grid>

            {/* Ligne 3 - Téléphone et Password */}
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Téléphone"
                name="telephone"
                value={entreprise.telephone}
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
                value={entreprise.password}
                onChange={handleChange}
                required
              />
            </Grid>

            {/* Bouton Submit */}
          </Grid>
        </form>

        {/* Notifications */}
        <Snackbar
          open={success}
          autoHideDuration={3000}
          onClose={() => setSuccess(false)}
        >
          <Alert severity="success">
            Entreprise a été ajoutée avec succès!
          </Alert>
        </Snackbar>

        <Snackbar
          open={!!error}
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
}
//CreatedAndDevelopedByWassimKhazri
//https://www.linkedin.com/in/wassim-khazri-ab923a14b/

export default AddEntreprise;
