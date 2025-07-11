import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";
//CreatedAndDevelopedByWassimKhazri
//https://www.linkedin.com/in/wassim-khazri-ab923a14b/
const EditEntreprise = ({ open, onClose, entreprise, onSave }) => {
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    email: "",
    cinNumber: "",
    telephone: "",
    password: "",
    roles: [{ id: 4, name: "ROLE_ENTREPRISE" }],
    matricule: "",
    nomcompany: "",
    owner: "",
    rhresponsible: "",
    adresse: "",
    fax: "",
    web: "",
    linkedin: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (entreprise) {
      setFormData({
        id: entreprise.id,
        nom: entreprise.nom || "",
        prenom: entreprise.prenom || "",
        email: entreprise.email || "",
        cinNumber: entreprise.cinNumber || "",
        telephone: entreprise.telephone || "",
        password: "",
        roles: entreprise.roles || [{ id: 4, name: "ROLE_ENTREPRISE" }],
        matricule: entreprise.matricule || "",

        nomcompany: entreprise.nomcompany || "",
        owner: entreprise.owner || "",
        rhresponsible: entreprise.rhresponsible || "",
        adresse: entreprise.adresse || "",
        fax: entreprise.fax || "",
        web: entreprise.web || "",
        linkedin: entreprise.linkedin || "",
      });
    }
  }, [entreprise]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Gestion des champs imbriqués
    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value,
        },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `http://localhost:8080/api/entreprises/${entreprise.id}`,
        formData, // Envoie formData tel quel, sans hachage du mot de passe
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      //  onSave(response.data);
      setSuccess(true);
      onClose();
      window.location.reload();
    } catch (err) {
      setError(err.response?.data?.message || "Erreur lors de la modification");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
        <DialogTitle>Modifier l'entreprise  {formData.nomcompany}</DialogTitle>

        <DialogContent dividers>
          <Grid container spacing={2}>
            {/* Colonne 1 - Informations personnelles */}
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Nom"
                name="nom"
                value={formData.nom}
                onChange={handleChange}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Prénom"
                name="prenom"
                value={formData.prenom}
                onChange={handleChange}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                margin="normal"
              />
              <TextField
                fullWidth
                label="CIN"
                name="cinNumber"
                value={formData.cinNumber}
                onChange={handleChange}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Téléphone"
                name="telephone"
                value={formData.telephone}
                onChange={handleChange}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                margin="normal"
                // disabled
              />
            </Grid>

            {/* Colonne 2 - Informations scolaires */}
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Matricule"
                name="matricule"
                value={formData.matricule}
                onChange={handleChange}
                margin="normal"
                disabled
              />

              <TextField
                fullWidth
                label="Nom company"
                name="nomcompany"
                value={formData.nomcompany}
                onChange={handleChange}
                margin="normal"
                // disabled
              />
              <TextField
                fullWidth
                label="Owner"
                name="owner"
                value={formData.owner}
                onChange={handleChange}
                margin="normal"
                // disabled
              />
              <TextField
                fullWidth
                label="RH responsible"
                name="rhresponsible"
                value={formData.rhresponsible}
                onChange={handleChange}
                margin="normal"
                // disabled
              />
              <TextField
                fullWidth
                label="Adresse"
                name="adresse"
                value={formData.adresse}
                onChange={handleChange}
                margin="normal"
                // disabled
              />
              <TextField
                fullWidth
                label="Fax"
                name="fax"
                value={formData.fax}
                onChange={handleChange}
                margin="normal"
                // disabled
              />
              <TextField
                fullWidth
                label="web"
                name="web"
                value={formData.web}
                onChange={handleChange}
                margin="normal"
                // disabled
              />
              <TextField
                fullWidth
                label="linkedin"
                name="linkedin"
                value={formData.linkedin}
                onChange={handleChange}
                margin="normal"
                // disabled
              />
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions>
          <Button onClick={onClose} color="secondary">
            Annuler
          </Button>
          <Button
            onClick={handleSubmit}
            color="primary"
            variant="contained"
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : "Enregistrer"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Notifications */}
      <Snackbar
        open={success}
        autoHideDuration={3000}
        onClose={() => setSuccess(false)}
      >
        <Alert severity="success">Modification réussie !</Alert>
      </Snackbar>

      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={() => setError(null)}
      >
        <Alert severity="error">{error}</Alert>
      </Snackbar>
    </>
  );
};
//CreatedAndDevelopedByWassimKhazri
//https://www.linkedin.com/in/wassim-khazri-ab923a14b/

export default EditEntreprise;
