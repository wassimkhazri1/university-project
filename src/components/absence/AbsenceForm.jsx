import { useState, useEffect, useCallback } from "react";
import { addAbsence } from "../../services/api";
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
  FormControlLabel,
  Checkbox,
  MenuItem,
} from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

const API_BASE_URL = "http://localhost:8080/api";
const MATIERES_CACHE_KEY = "matieres_cache";

export default function AbsenceForm({ open, onClose, studentId }) {
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split("T")[0],
    justified: false,
    reason: "",
    count: 1,
    etudiant: { id: studentId },
    matiere: { id: "" },
  });
  const [matieres, setMatieres] = useState([]);
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const fetchMatieres = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      const cachedData = localStorage.getItem(MATIERES_CACHE_KEY);

      if (cachedData) {
        setMatieres(JSON.parse(cachedData));
      }

      const response = await axios.get(`${API_BASE_URL}/matieres`, {
        headers: { Authorization: `Bearer ${token}` },
        timeout: 10000,
      });

      const formattedData = response.data.map((mat) => ({
        value: mat.id,
        label: `${mat.nom} - (${mat.codeIntitule})`,
      }));

      setMatieres(formattedData);
      localStorage.setItem(MATIERES_CACHE_KEY, JSON.stringify(formattedData));
    } catch (error) {
      console.error("Erreur lors du chargement des matières:", error);

      if (!matieres.length) {
        try {
          const backupData = await import("./matieresBackup.json");
          setMatieres(backupData.default);
        } catch (e) {
          setSnackbar({
            open: true,
            message: "Impossible de charger les matières",
            severity: "error",
          });
        }
      }
    }
  }, [matieres.length]);

  useEffect(() => {
    if (open) {
      fetchMatieres();
    }
  }, [open, fetchMatieres]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSelectChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: { id: value },
    }));
  };

  const handleSubmit = async (e) => {
    const token = localStorage.getItem("token");
    e.preventDefault();

    try {
      const response = await addAbsence({
        ...formData,
        etudiant: { id: studentId }, // Format attendu par le backend
      });

      setSnackbar({
        open: true,
        message: "Absence ajoutée avec succès!",
        severity: "success",
      });
      onClose();
    } catch (err) {
      console.error("Erreur complète:", {
        status: err.response?.status,
        data: err.response?.data,
        config: err.config,
      });

      setSnackbar({
        open: true,
        message:
          err.response?.data?.message ||
          `Erreur technique (${err.response?.status || "no-status"})`,
        severity: "error",
      });
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  return (
    <>
      <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
        <DialogTitle>Ajouter une absence</DialogTitle>
        <DialogContent dividers>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Date d'absence"
                  type="date"
                  fullWidth
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  required
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  label="Nombre d'heures"
                  type="number"
                  fullWidth
                  name="count"
                  value={formData.count}
                  onChange={handleChange}
                  inputProps={{ min: 1 }}
                  required
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  label="Étudiant"
                  fullWidth
                  // value={`${etudiant.nom} ${etudiant.prenom}`}
                  value={studentId}
                  InputProps={{
                    readOnly: true,
                  }}
                  variant="outlined"
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  select
                  fullWidth
                  label="Matière"
                  name="matiere"
                  value={formData.matiere.id}
                  onChange={handleSelectChange}
                  required
                  variant="outlined"
                >
                  {matieres.map((matiere) => (
                    <MenuItem key={matiere.value} value={matiere.value}>
                      {matiere.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      name="justified"
                      checked={formData.justified}
                      onChange={handleChange}
                    />
                  }
                  label="Justifiée"
                />
              </Grid>

              {formData.justified && (
                <Grid item xs={12}>
                  <TextField
                    label="Motif"
                    fullWidth
                    name="reason"
                    multiline
                    rows={3}
                    value={formData.reason}
                    onChange={handleChange}
                  />
                </Grid>
              )}
            </Grid>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} disabled={loading}>
            Annuler
          </Button>
          <Button
            type="submit"
            onClick={handleSubmit}
            variant="contained"
            color="primary"
            disabled={loading}
            startIcon={
              loading ? <CircularProgress size={20} /> : <PersonAddIcon />
            }
          >
            {loading ? "Enregistrement..." : "Ajouter"}
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
}
