import Swal from 'sweetalert2';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
//CreatedAndDevelopedByWassimKhazri
//https://www.linkedin.com/in/wassim-khazri-ab923a14b/
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
  // import axios from 'axios';
import axiosRetry from 'axios-retry';

// Configuration globale d'Axios
axiosRetry(axios, { 
  retries: 3,
  retryDelay: (retryCount) => retryCount * 1000,
  retryCondition: (error) => {
    return axiosRetry.isNetworkError(error) || 
           axiosRetry.isRetryableError(error) ||
           error.response?.status >= 500;
  }
});
const AjoutNote = ({ open, onClose, onSave }) => {
    const [formData, setFormData] = useState({
      etudiant: { id: '' },
      matiere: { id: '' },
      noteTd: '',
      coefTd: '',
      noteExamen: '',
      coefExamen: '',
      coefMoyenne: ''
    });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(null);
    const [etudiants, setEtudiants] = useState([]);
    const [matieres, setMatieres] = useState([]);
    const [matieresDisponibles, setMatieresDisponibles] = useState([]);
    const [filterEtudiant, setFilterEtudiant] = useState('');
    const [filterMatiere, setFilterMatiere] = useState('');


      // Nouveau state pour le statut API
  const [apiStatus, setApiStatus] = useState({
    etudiants: 'idle', // 'loading', 'success', 'error'
    matieres: 'idle',
    matieresDispo: 'idle'
  });
  
    // Charger les étudiants
    useEffect(() => {
      const fetchEtudiants = async () => {
        setApiStatus(prev => ({...prev, etudiants: 'loading'}));
        try {
          const token = localStorage.getItem('token');
                  const cacheKey = 'etudiants_cache';
        
        // 1. Vérifier le cache
        const cachedData = localStorage.getItem(cacheKey);
        if (cachedData) {
          setEtudiants(JSON.parse(cachedData));
        }


          const response = await axios.get('http://localhost:8080/api/etudiants', {
            headers: { Authorization: `Bearer ${token}` },
            timeout: 10000
          });
          const formattedData = response.data.map(etud => ({
          value: etud.id,
          label: `${etud.matricule} - ${etud.nom} ${etud.prenom}`
        }));
        
        setEtudiants(formattedData);
        localStorage.setItem(cacheKey, JSON.stringify(formattedData));
        setApiStatus(prev => ({...prev, etudiants: 'success'}));
        } catch (error) {
          console.error("Erreur:", error);
          setApiStatus(prev => ({...prev, etudiants: 'error'}));
                  if (!etudiants.length) {
          Swal.fire({
            title: 'Attention',
            text: 'Impossible de charger la liste des étudiants. Veuillez réessayer plus tard.',
            icon: 'warning'
          });
        }
        }
      };
     if(open) fetchEtudiants();
    }, [open]);
  
    // Charger toutes les matières
    useEffect(() => {
      const fetchMatieres = async () => {
        setApiStatus(prev => ({...prev, matieres: 'loading'}));
        try {
          const token = localStorage.getItem('token');
                  const cacheKey = 'matieres_cache';
        const cachedData = localStorage.getItem(cacheKey);
        
        if (cachedData) {
          setMatieres(JSON.parse(cachedData));
        }
          const response = await axios.get('http://localhost:8080/api/matieres', {
            headers: { Authorization: `Bearer ${token}` },
            timeout: 10000
          });
          const formattedData = response.data.map(mat => ({
          value: mat.id,
          label: `${mat.nom} - (${mat.codeIntitule})`
        }));
        
        setMatieres(formattedData);
        localStorage.setItem(cacheKey, JSON.stringify(formattedData));
        setApiStatus(prev => ({...prev, matieres: 'success'}));
        } catch (error) {
          console.error("Erreur:", error);
          setApiStatus(prev => ({...prev, matieres: 'error'}));
                  if (!matieres.length) {
          // Charger les données mockées en dernier recours
          try {
            const backupData = await import('./matieresBackup.json');
            setMatieres(backupData.default);
          } catch (e) {
            Swal.fire({
              title: 'Erreur',
              text: 'Impossible de charger les matières',
              icon: 'error'
            });
          }
        }
        }
      };
      if(open) fetchMatieres();
    }, [open]);
  // Nouveau composant de statut
  // const ApiStatusIndicator = ({ status }) => {
  //   switch(status) {
  //     case 'loading': 
  //       return <CircularProgress size={20} />;
  //     case 'error':
  //       return <Alert severity="error" sx={{ mb: 2 }}>Problème de connexion</Alert>;
  //     default:
  //       return null;
  //   }
  // };

    // Charger les matières disponibles quand l'étudiant change
    useEffect(() => {
      const fetchMatieresDisponibles = async () => {
        if (!formData.etudiant.id) {
          setMatieresDisponibles([]);
          return;
        }
        
        try {
          const token = localStorage.getItem('token');
          console.log("formData: " + `${formData.etudiant.id}`);  
//CreatedAndDevelopedByWassimKhazri
//https://www.linkedin.com/in/wassim-khazri-ab923a14b/
          // 1. Récupérer les notes existantes de l'étudiant
          const responseNotes = await axios.get(
            `http://localhost:8080/api/notes/etudiant/${formData.etudiant.id}`,
            { headers: { Authorization: `Bearer ${token}` } }
          );
          
          // 2. Filtrer les matières déjà notées
          const matieresNotees = responseNotes.data.map(note => note.matiere.id);
          const matieresDispo = matieres.filter(
            matiere => !matieresNotees.includes(matiere.value)
          );
          
          setMatieresDisponibles(matieresDispo);
        } catch (error) {
          console.error("Erreur:", error);
        }
      };
      
      fetchMatieresDisponibles();
    }, [formData.etudiant.id, matieres]);
  

  
    const handleChange = (e) => {
        const { name, value } = e.target;
        
        if (name === 'etudiantId') {
          setFormData({
            ...formData,
            etudiant: { id: value }
          });
        } else if (name === 'matiereId') {
          setFormData({
            ...formData,
            matiere: { id: value }
          });
        } else {
          setFormData({
            ...formData,
            [name]: value
          });
        }
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        setTimeout(onClose);
        
        try {
            const token = localStorage.getItem('token');
        //    if (!token) throw new Error("Aucun token trouvé !"); 
        if (!token) {
          Swal.fire({
            title: 'Erreur',
            text: 'Authentification requise. Veuillez vous reconnecter.',
            icon: 'error',
            confirmButtonText: 'OK'
          });
          return;
        }
          const response = await axios.post('http://localhost:8080/api/notes', formData,{
            headers: { Authorization: `Bearer ${token}` }
          });
          Swal.fire({
            title: 'Succès!',
            text: 'Note ajoutée avec succès',
            icon: 'success',
            confirmButtonText: 'OK'
          });
    
          
          // Réinitialiser le formulaire
          setFormData({
            etudiant: { id: '' },
            matiere: { id: '' },
            noteTd: '',
            coefTd: '',
            noteExamen: '',
            coefExamen: '',
            coefMoyenne: ''
          });
        } catch (error) {
          let errorMessage = "Erreur lors de l'ajout de la note";
          
          if (error.response) {
            // Erreurs venant du serveur
            switch (error.response.status) {
              case 404:
                errorMessage = error.response.data.message || "Ressource non trouvée";
                break;
              case 409:
                errorMessage = error.response.data.message || "Une note existe déjà pour cet étudiant dans cette matière";
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
          } else if (error.request) {
            errorMessage = "Pas de réponse du serveur";
          } else {
            errorMessage = error.message;
          }
    
          Swal.fire({
            title: 'Erreur',
            html: `
              <div>
                <p>${errorMessage}</p>
                ${error.response?.data?.details ? 
                  `<ul>
                    ${error.response.data.details.map(d => `<li>${d}</li>`).join('')}
                  </ul>` : ''
                }
              </div>
            `,
            icon: 'error',
            confirmButtonText: 'OK'
          });
    
        }
      };


    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
        <DialogTitle>Ajouter note</DialogTitle>
        <DialogContent dividers>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
          <TextField
            label="Rechercher un étudiant"
            value={filterEtudiant}
            onChange={(e) => setFilterEtudiant(e.target.value)}
            fullWidth margin="normal"
          />
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
              .filter(etud => 
                etud.label.toLowerCase().includes(filterEtudiant.toLowerCase())
              )
              .map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))
            }
          </TextField>
  
          {/* Sélection de la matière (modifiée) */}
          <TextField
            label="Rechercher une matière"
            value={filterMatiere}
            onChange={(e) => setFilterMatiere(e.target.value)}
            fullWidth margin="normal"
          />
          <TextField
            select
            fullWidth
            label="Matière"
            name="matiereId"
            value={formData.matiere.id}
            onChange={handleChange}
            required
            variant="outlined"
            margin="normal"
            disabled={!formData.etudiant.id}
          >
            {matieresDisponibles
              .filter(mat => 
                mat.label.toLowerCase().includes(filterMatiere.toLowerCase())
              )
              .map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))
            }
            {matieresDisponibles.length === 0 && formData.etudiant.id && (
              <MenuItem disabled>
                Toutes les matières ont déjà une note pour cet étudiant
              </MenuItem>
            )}
          </TextField>
          <div className="form-group">
          <label>Note TD:</label>
          <input
            type="number"
            step="0.01"
            name="noteTd"
            value={formData.noteTd}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        
        <div className="form-group">
          <label>Coefficient TD:</label>
          <input
            type="number"
            step="0.01"
            name="coefTd"
            value={formData.coefTd}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        
        <div className="form-group">
          <label>Note Examen:</label>
          <input
            type="number"
            step="0.01"
            name="noteExamen"
            value={formData.noteExamen}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        
        <div className="form-group">
          <label>Coefficient Examen:</label>
          <input
            type="number"
            step="0.01"
            name="coefExamen"
            value={formData.coefExamen}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
{/*        
CreatedAndDevelopedByWassimKhazri
https://www.linkedin.com/in/wassim-khazri-ab923a14b/
*/}
        <div className="form-group">
          <label>Coefficient Moyenne:</label>
          <input
            type="number"
            step="0.01"
            name="coefMoyenne"
            value={formData.coefMoyenne}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
            </Grid>
        </form>
 {/* Notifications */}
 <Snackbar open={success} autoHideDuration={3000} onClose={() => setSuccess(false)}>
        <Alert severity="success">Étudiant ajouté avec succès!</Alert>
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
  };
  export default AjoutNote;
  //CreatedAndDevelopedByWassimKhazri
//https://www.linkedin.com/in/wassim-khazri-ab923a14b/