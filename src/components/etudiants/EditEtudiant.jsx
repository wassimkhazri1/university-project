import React, { useState, useEffect } from 'react';
import axios from 'axios';
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
  InputLabel,
  MenuItem,
  FormControl,
  Select
} from '@mui/material';
//CreatedAndDevelopedByWassimKhazri
//https://www.linkedin.com/in/wassim-khazri-ab923a14b/ 
const EditEtudiant = ({ open, onClose, etudiant, onSave }) => {
  const [formData, setFormData] = useState({
 
    nom: '',
    prenom: '',
    email: '',
    cinNumber: '',
    telephone: '',
    password: '',
    roles: [{ id: 1, name: 'ROLE_STUDENT' }],
    groupe: { id: '', nom: '' },
    classe: { id: '', nom: '' },
    niveauScol: { id: '', nom: '' },
    branche: { id: '', nom: '' },
    matricule: ''
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  // Données pour les selects
  const [groupes] = useState([
    { id: 1, nom: "GROUPE 1" },
    { id: 2, nom: "GROUPE 2" }
  ]);

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
    { id: 10, nom: "CLASSE J" }
  ]);

  const [niveaux] = useState([
    { id: 1, nom: "PREMIERE_ANNEE" },
    { id: 2, nom: "DEUXIEME_ANNEE" },
    { id: 3, nom: "TROISIEME_ANNE" }
    
  ]);

  const [branches] = useState([
    { id: 1, nom: "INFORMATIQUE" },
    { id: 2, nom: "MECANIQUE" },
    { id: 3, nom: "ELECTRONIQUE" }
  ]);

  useEffect(() => {
    if (etudiant) {
      setFormData({
        id: etudiant.id,
        nom: etudiant.nom || '',
        prenom: etudiant.prenom || '',
        email: etudiant.email || '',
        cinNumber: etudiant.cinNumber || '',
        telephone: etudiant.telephone || '',
        password:'',
        roles: etudiant.roles || [{ id: 1, name: 'ROLE_STUDENT' }],
        groupe: etudiant.groupe || { id: '', nom: '' },
        classe: etudiant.classe || { id: '', nom: '' },
        niveauScol: etudiant.niveauScol || { id: '', nom: '' },
        branche: etudiant.branche || { id: '', nom: '' },
        matricule: etudiant.matricule || ''
      });
      
    }
  }, [etudiant]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Gestion des champs imbriqués
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSelectChange = (name, value) => {
    // Pour les selects d'objets (groupe, classe, etc.)
    const selectedItem = 
      name === 'groupe' ? groupes.find(g => g.id === value) :
      name === 'classe' ? classes.find(c => c.id === value) :
      name === 'niveauScol' ? niveaux.find(n => n.id === value) :
      branches.find(b => b.id === value);
    
    setFormData(prev => ({
      ...prev,
      [name]: selectedItem
    }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(
        `http://localhost:8080/api/etudiants/${etudiant.id}`,
        formData, // Envoie formData tel quel, sans hachage du mot de passe
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );
    //  onSave(response.data);
      setSuccess(true);
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || "Erreur lors de la modification");
    } finally {
      setLoading(false);
    }
  };  

  return (
    <>
      <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
        <DialogTitle>Modifier l'étudiant</DialogTitle>
        
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
              
              <FormControl fullWidth margin="normal">
                <InputLabel>Groupe</InputLabel>
                <Select
                  value={formData.groupe.id}
                  onChange={(e) => handleSelectChange('groupe', e.target.value)}
                  label="Groupe"
                >
                  {groupes.map((groupe) => (
                    <MenuItem key={groupe.id} value={groupe.id}>
                      {groupe.nom}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl fullWidth margin="normal">
                <InputLabel>Classe</InputLabel>
                <Select
                  value={formData.classe.id}
                  onChange={(e) => handleSelectChange('classe', e.target.value)}
                  label="Classe"
                >
                  {classes.map((classe) => (
                    <MenuItem key={classe.id} value={classe.id}>
                      {classe.nom}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl fullWidth margin="normal">
                <InputLabel>Niveau Scolaire</InputLabel>
                <Select
                  value={formData.niveauScol.id}
                  onChange={(e) => handleSelectChange('niveauScol', e.target.value)}
                  label="Niveau Scolaire"
                >
                  {niveaux.map((niveau) => (
                    <MenuItem key={niveau.id} value={niveau.id}>
                      {niveau.nom}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl fullWidth margin="normal">
                <InputLabel>Branche</InputLabel>
                <Select
                  value={formData.branche.id}
                  onChange={(e) => handleSelectChange('branche', e.target.value)}
                  label="Branche"
                >
                  {branches.map((branche) => (
                    <MenuItem key={branche.id} value={branche.id}>
                      {branche.nom}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              
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
      <Snackbar open={success} autoHideDuration={3000} onClose={() => setSuccess(false)}>
        <Alert severity="success">Modification réussie !</Alert>
      </Snackbar>

      <Snackbar open={!!error} autoHideDuration={6000} onClose={() => setError(null)}>
        <Alert severity="error">{error}</Alert>
      </Snackbar>
    </>
  );
};
//CreatedAndDevelopedByWassimKhazri
//https://www.linkedin.com/in/wassim-khazri-ab923a14b/ 
export default EditEtudiant;