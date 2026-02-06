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

const EditEnseignant = ({ open, onClose, enseignant, onSave }) => {
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    email: "",
    cinNumber: "",
    telephone: "",
    password: "",
    roles: [{ id: 2, name: "ROLE_PROF" }],
    //classe: [{ id: '', nom: '' }]
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const [classes] = useState([
    { id: 1, nom: "CLASSE A" },
    { id: 2, nom: "CLASSE B" },
    { id: 3, nom: "CLASSE C" },
    { id: 4, nom: "CLASSE D" },
    { id: 5, nom: "CLASSE E" },
    { id: 6, nom: "CLASSE F" },
    { id: 7, nom: "CLASSE G" },
    { id: 8, nom: "CLASSE H" },
    { id: 9, nom: "CLASSE I" },
    { id: 10, nom: "CLASSE J" },
  ]);
  //CreatedAndDevelopedByWassimKhazri
  //https://www.linkedin.com/in/wassim-khazri-ab923a14b/
  useEffect(() => {
    if (enseignant) {
      setFormData({
        id: enseignant.id,
        nom: enseignant.nom || "",
        prenom: enseignant.prenom || "",
        email: enseignant.email || "",
        cinNumber: enseignant.cinNumber || "",
        telephone: enseignant.telephone || "",
        password: "",
        roles: enseignant.roles || [{ id: 2, name: "ROLE_PROF" }],
        //  classes: enseignant.classes || [{ id: '', nom: '' }]
      });
    }
  }, [enseignant]);

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

  {
    /*  const handleSelectChange = (name, value) => {
    // Pour les selects d'objets (groupe, classe, etc.)
    const selectedItem = 
      name === 'classe' ? classes.find(c => c.id === value):
      name === 'niveauScol' ? niveaux.find(n => n.id === value) :
    classes.find(b => b.id === value);
    
    setFormData(prev => ({
      ...prev,
      [name]: selectedItem
    }));
  };
*/
  }
  const handleSubmit = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `http://localhost:8080/api/professeurs/${enseignant.id}`,
        formData, // Envoie formData tel quel, sans hachage du mot de passe
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
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
    //CreatedAndDevelopedByWassimKhazri
    //https://www.linkedin.com/in/wassim-khazri-ab923a14b/
  };

  return (
    <>
      <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
        <DialogTitle>Modifier l'enseignant</DialogTitle>

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
              {/*           <FormControl fullWidth margin="normal">
                <InputLabel>Classe</InputLabel>
                <Select
                  value={formData.classes}
                  onChange={(e) => handleSelectChange('classe', e.target.value)}
                  label="Classe"
                >
                  {classes.map((classe) => (
                    <MenuItem key={classe.id} value={classe.id}>
                      {classe.nom}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>   */}
            </Grid>
          </Grid>
        </DialogContent>
        {/*
        //CreatedAndDevelopedByWassimKhazri
        //https://www.linkedin.com/in/wassim-khazri-ab923a14b/
        */}
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

export default EditEnseignant;
