import React, { useState } from "react";
//import { useNavigate } from 'react-router-dom';
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

function AddEtudiant({ open, onClose, onSave }) {
  const [photoFile, setPhotoFile] = useState(null);
  const [photoPreview, setPhotoPreview] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhotoFile(file);

      // Prévisualisation
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  //  const navigate = useNavigate();
  const [etudiant, setEtudiant] = useState({
    groupe: { id: "" },
    classe: { id: "" },
    niveauScol: { id: "" },
    branche: { id: "" },
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setEtudiant((prev) => ({
        ...prev,
        [parent]: { ...prev[parent], [child]: value },
      }));
    } else {
      setEtudiant((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Aucun token trouvé !");

      const formData = new FormData();

      // Ajout des champs texte
      Object.keys(etudiant).forEach((key) => {
        if (typeof etudiant[key] === "object") {
          // Pour les objets imbriqués (groupe.id, classe.id, etc.)
          Object.keys(etudiant[key]).forEach((childKey) => {
            formData.append(`${key}.${childKey}`, etudiant[key][childKey]);
          });
        } else {
          formData.append(key, etudiant[key]);
        }
      });

      // Ajout de la photo
      if (photoFile) {
        const reader = new FileReader();
        reader.onloadend = async () => {
          formData.append("photo", reader.result); // Base64
          await axios.post("http://localhost:8080/api/etudiants", formData, {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          });
          setSuccess(true);
          setTimeout(onClose, 1500);
          window.location.reload();
        };
        reader.readAsDataURL(photoFile);
      }
    } catch (error) {
      setError(error.response?.data?.message || "Erreur lors de l'ajout");
      console.error("Erreur:", error);
    } finally {
      setLoading(false);
    }
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setLoading(true);
  //   try {
  //     const token = localStorage.getItem("token");
  //     if (!token) throw new Error("Aucun token trouvé !");
  //     //CreatedAndDevelopedByWassimKhazri
  //     //https://www.linkedin.com/in/wassim-khazri-ab923a14b/
  //     await axios.post("http://localhost:8080/api/etudiants", etudiant, {
  //       headers: { Authorization: `Bearer ${token}` /* body: formData */ },
  //     });

  //     setSuccess(true);
  //     setTimeout(onClose, 1500); // Ferme la modale après succès
  //     window.location.reload();
  //   } catch (error) {
  //     setError(error.response?.data?.message || "Erreur lors de l'ajout");
  //     console.error("Erreur:", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // Options pour les selects
  const groupes = [
    { value: "", label: "Sélectionnez un groupe" },
    { value: "1", label: "Groupe un" },
    { value: "2", label: "Groupe deux" },
  ];

  const classes = [
    { value: "", label: "Sélectionnez une classe" },
    { value: "1", label: "CLASSE A" },
    { value: "2", label: "CLASSE B" },
    { value: "3", label: "CLASSE C" },
    { value: "4", label: "CLASSE D" },
    { value: "5", label: "CLASSE E" },
    { value: "6", label: "CLASSE F" },
    { value: "7", label: "CLASSE G" },
    { value: "8", label: "CLASSE H" },
    { value: "9", label: "CLASSE I" },
    { value: "10", label: "CLASSE J" },
  ];

  const niveaux = [
    { value: "", label: "Sélectionnez un niveau" },
    { value: "1", label: "PREMIERE ANNEE" },
    { value: "2", label: "DEUXIEME ANNEE" },
    { value: "3", label: "TROISIEME ANNEE" },
  ];

  const branches = [
    { value: "", label: "Sélectionnez une branche" },
    { value: "1", label: "INFORMATIQUE" },
    { value: "2", label: "MECANIQUE" },
    { value: "3", label: "ELECTRONIQUE" },
  ];

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Ajouter un nouvel étudiant</DialogTitle>
      <DialogContent dividers>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            {/* Ligne 1 - Nom et Prénom */}
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Nom"
                name="nom"
                value={etudiant.nom}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Prénom"
                name="prenom"
                value={etudiant.prenom}
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
                value={etudiant.email}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Carte d'Identité"
                name="cinNumber"
                value={etudiant.cinNumber}
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
                value={etudiant.telephone}
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
                value={etudiant.password}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <div className="mb-3">
                <label htmlFor="photo" className="form-label">
                  PHOTO (JPG, PNG, SVG)
                </label>
                <input
                  type="file"
                  className="form-control"
                  id="photo"
                  name="photo"
                  accept=".jpg,.jpeg,.png,.svg"
                  onChange={handleFileChange}
                  required
                />

                {/* Prévisualisation */}
                {photoPreview && (
                  <div className="mt-2">
                    <img
                      src={photoPreview}
                      alt="Prévisualisation"
                      style={{
                        width: "100px",
                        height: "100px",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                )}
              </div>
            </Grid>
            {/* Ligne 4 - Groupe et Classe */}
            <Grid item xs={6} md={6}>
              <TextField
                select
                fullWidth
                label="Groupe"
                name="groupe.id"
                value={etudiant.groupe.id}
                onChange={handleChange}
                required
              >
                {groupes.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                select
                fullWidth
                label="Classe"
                name="classe.id"
                value={etudiant.classe.id}
                onChange={handleChange}
                required
              >
                {classes.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            {/* Ligne 5 - Niveau et Branche */}
            <Grid item xs={12} md={6}>
              <TextField
                select
                fullWidth
                label="Niveau Scolaire"
                name="niveauScol.id"
                value={etudiant.niveauScol.id}
                onChange={handleChange}
                required
              >
                {niveaux.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                select
                fullWidth
                label="Branche"
                name="branche.id"
                value={etudiant.branche.id}
                onChange={handleChange}
                required
              >
                {branches.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
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
          <Alert severity="success">Étudiant ajouté avec succès!</Alert>
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
export default AddEtudiant;
