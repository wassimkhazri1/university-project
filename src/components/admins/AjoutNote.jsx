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

const AjoutNote = ({ open, onClose }) => {
  const [formData, setFormData] = useState({
    etudiant: { id: "" },
    matiere: { id: "" },
    noteTd: "",
    coefTd: "",
    noteExamen: "",
    coefExamen: "",
    coefMoyenne: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [etudiants, setEtudiants] = useState([]);
  const [filter, setFilter] = useState("");
  const [matieres, setMatieres] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchEtudiants = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("Aucun token trouvé !");
          return;
        }

        const response = await axios.get(
          "http://localhost:8080/api/etudiants",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        setEtudiants(
          response.data.map((etud) => ({
            value: etud.id,
            label: `${etud.matricule} - ${etud.nom} ${etud.prenom}`,
          })),
        );
      } catch (error) {
        console.error("Erreur lors de la récupération des notes:", error);
      }
    };

    fetchEtudiants();
  }, []);
  // Charger toutes les matières
  useEffect(() => {
    const fetchMatieres = async () => {
      // setApiStatus(prev => ({...prev, matieres: 'loading'}));
      try {
        const token = localStorage.getItem("token");
        const cacheKey = "matieres_cache";
        const cachedData = localStorage.getItem(cacheKey);

        if (cachedData) {
          setMatieres(JSON.parse(cachedData));
        }
        const response = await axios.get("http://localhost:8080/api/matieres", {
          headers: { Authorization: `Bearer ${token}` },
          timeout: 10000,
        });
        const formattedData = response.data.map((mat) => ({
          value: mat.id,
          label: `${mat.nom} - (${mat.codeIntitule})`,
        }));

        setMatieres(formattedData);
        localStorage.setItem(cacheKey, JSON.stringify(formattedData));
        // setApiStatus(prev => ({...prev, matieres: 'success'}));
      } catch (error) {
        console.error("Erreur:", error);
        // setApiStatus(prev => ({...prev, matieres: 'error'}));
        if (!matieres.length) {
          // Charger les données mockées en dernier recours
          try {
            const backupData = await import("./matieresBackup.json");
            setMatieres(backupData.default);
          } catch (e) {
            Swal.fire({
              title: "Erreur",
              text: "Impossible de charger les matières",
              icon: "error",
            });
          }
        }
      }
    };
    if (open) fetchMatieres();
  }, [open]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "etudiantId") {
      setFormData({
        ...formData,
        etudiant: { id: value },
      });
    } else if (name === "matiereId") {
      setFormData({
        ...formData,
        matiere: { id: value },
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.coefMoyenne) newErrors.coefMoyenne = "Ce champ est requis";
    if (!formData.coefExamen) newErrors.coefExamen = "Ce champ est requis";
    if (!formData.noteExamen) newErrors.noteExamen = "Ce champ est requis";
    if (!formData.coefTd) newErrors.coefTd = "Ce champ est requis";
    if (!formData.noteTd) newErrors.noteTd = "Ce champ est requis";
    // if (!formData.coefMoyenne) newErrors.coefMoyenne = "Ce champ est requis";
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
      const token = localStorage.getItem("token");
      //    if (!token) throw new Error("Aucun token trouvé !");
      if (!token) {
        Swal.fire({
          title: "Erreur",
          text: "Authentification requise. Veuillez vous reconnecter.",
          icon: "error",
          confirmButtonText: "OK",
        });
        return;
      }
      // const response =
      await axios.post("http://localhost:8080/api/notes", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      Swal.fire({
        title: "Succès!",
        text: "Note ajoutée avec succès",
        icon: "success",
        confirmButtonText: "OK",
      });

      // Réinitialiser le formulaire
      setFormData({
        etudiant: { id: "" },
        matiere: { id: "" },
        noteTd: "",
        coefTd: "",
        noteExamen: "",
        coefExamen: "",
        coefMoyenne: "",
      });
      // Close the modal after successful submission
      onClose();
    } catch (error) {
      let errorMessage = "Erreur lors de l'ajout de la note";

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

      // Swal.fire({
      //   title: "Erreur",
      //   html: `
      //     <div>
      //       <p>${errorMessage}</p>
      //       ${
      //         error.response?.data?.details
      //           ? `<ul>
      //           ${error.response.data.details
      //             .map((d) => `<li>${d}</li>`)
      //             .join("")}
      //         </ul>`
      //           : ""
      //       }
      //     </div>
      //   `,
      //   icon: "error",
      //   confirmButtonText: "OK",
      // });
      // onClose();
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Ajouter note</DialogTitle>
      <DialogContent dividers>
        <form onSubmit={handleSubmit}>
          <Grid item xs={12} spacing={2}>
            <Grid item xs={6}>
              <TextField
                label="Rechercher un étudiant"
                variant="outlined"
                fullWidth
                margin="normal"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                select
                fullWidth
                label="Étudiant"
                name="etudiantId"
                value={formData.etudiant.id}
                onChange={handleChange}
                required
                variant="outlined"
                margin="normal"
              >
                {etudiants
                  .filter((etud) =>
                    etud.label.toLowerCase().includes(filter.toLowerCase()),
                  )
                  .map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
              </TextField>
            </Grid>
            <Grid item xs={6}>
              <TextField
                select
                fullWidth
                label="Matiere"
                name="matiereId"
                value={formData.matiere.id}
                onChange={handleChange}
                required
                variant="outlined"
                margin="normal"
              >
                {matieres.map((matiere) => (
                  <MenuItem key={matiere.value} value={matiere.value}>
                    {matiere.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            {/* Ligne pour Note TD et Coef TD */}
            <Grid item xs={12} container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Note TD"
                  type="number"
                  step="0.01"
                  name="noteTd"
                  value={formData.noteTd}
                  onChange={handleChange}
                  variant="outlined"
                  margin="normal"
                  required
                  error={!!errors.noteTd}
                  helperText={errors.noteTd}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Coefficient TD"
                  type="number"
                  step="0.01"
                  name="coefTd"
                  value={formData.coefTd}
                  onChange={handleChange}
                  variant="outlined"
                  margin="normal"
                  required
                  error={!!errors.coefTd}
                  helperText={errors.coefTd}
                />
              </Grid>
            </Grid>

            {/* Ligne pour Note Examen et Coef Examen */}
            <Grid item xs={12} container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Note Examen"
                  type="number"
                  step="0.01"
                  name="noteExamen"
                  value={formData.noteExamen}
                  onChange={handleChange}
                  variant="outlined"
                  margin="normal"
                  required
                  error={!!errors.noteExamen}
                  helperText={errors.noteExamen}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Coefficient Examen"
                  type="number"
                  step="0.01"
                  name="coefExamen"
                  value={formData.coefExamen}
                  onChange={handleChange}
                  variant="outlined"
                  margin="normal"
                  required
                  error={!!errors.coefExamen}
                  helperText={errors.coefExamen}
                />
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Coefficient Moyenne"
                type="number"
                step="0.01"
                name="coefMoyenne"
                value={formData.coefMoyenne}
                onChange={handleChange}
                variant="outlined"
                margin="normal"
                required
                error={!!errors.coefMoyenne}
                helperText={errors.coefMoyenne}
              />
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
          <Alert severity="success">Note ajouté avec succès!</Alert>
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

export default AjoutNote;
