import Swal from "sweetalert2";
import React, { useEffect, useState } from "react";
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

const AjoutEvent = ({ open, onClose }) => {
  const user = JSON.parse(localStorage.getItem("user")) || "{}";
  const userId = user.id || null;
  const [formData, setFormData] = useState({
    message: "",
    personneId: userId,
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const [filter, setFilter] = useState("");

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.message) newErrors.message = "Ce champ est requis";
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
      const token = localStorage.getItem("token");
      // const response =
      await axios.post("http://localhost:8080/api/tickers", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      Swal.fire({
        title: "Succès!",
        text: "Event ajoutée avec succès",
        icon: "success",
        confirmButtonText: "OK",
      });

      // Réinitialiser le formulaire
      setFormData({
        message: "",
        personneId: userId,
      });
      // Close the modal after successful submission
      onClose();
    } catch (error) {
      let errorMessage = "Erreur lors de l'ajout de Message";

      if (error.response) {
        // Erreurs venant du serveur
        switch (error.response.status) {
          case 404:
            errorMessage =
              error.response.data.message || "Ressource non trouvée";
            break;
          case 409:
            errorMessage =
              error.response.data.message ||
              "Une note existe déjà pour cet étudiant dans cette matière";
            break;
          case 400:
            errorMessage = error.response.data.message || "Données invalides";
            break;
          case 401:
            errorMessage = "Non autorisé. Veuillez vous reconnecter.";
            break;
          default:
            errorMessage = `Erreur serveur: ${error.response.status}`;
        }
        //CreatedAndDevelopedByWassimKhazri
        //https://www.linkedin.com/in/wassim-khazri-ab923a14b/
      } else if (error.request) {
        errorMessage = "Pas de réponse du serveur";
      } else {
        errorMessage = error.message;
      }
      console.error("Error adding subject:", error);
      setSnackbarMessage(`${errorMessage}`);
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Ajouter Event</DialogTitle>
      <DialogContent dividers>
        <form onSubmit={handleSubmit}>
          <Grid item xs={12} spacing={2}>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                variant="outlined"
                margin="normal"
              ></TextField>
            </Grid>
          </Grid>
        </form>
        <Snackbar
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert
            onClose={handleCloseSnackbar}
            severity={snackbarSeverity}
            sx={{ width: "100%" }}
          >
            {snackbarMessage}
          </Alert>
        </Snackbar>
        <Snackbar
          open={success}
          autoHideDuration={3000}
          onClose={() => setSuccess(false)}
        >
          <Alert severity="success">Event ajouté avec succès!</Alert>
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

export default AjoutEvent;
