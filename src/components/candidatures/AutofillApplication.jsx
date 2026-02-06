import React, { useState, useCallback } from "react";
import "./AutofillApplication.css";
import axios from "axios";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";

const AutofillApplication = ({ open, onClose, job }) => {
  const jobOfferId = job.id;
  const [isDragging, setIsDragging] = useState(false);
  const [cvFile, setCvFile] = useState(null);
  const [lettreFile, setLettreFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [activeDropZone, setActiveDropZone] = useState(null); // To track which file is being dragged

  const handleDragEnter = useCallback((e, zone) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
    setActiveDropZone(zone);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    setActiveDropZone(null);
  }, []);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback((e, setFileFunction) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    setActiveDropZone(null);

    const files = e.dataTransfer.files;
    if (files.length) {
      handleFile(files[0], setFileFunction);
    }
  }, []);

  const handleFileChange = (e, setFileFunction) => {
    const file = e.target.files[0];
    if (file) {
      handleFile(file, setFileFunction);
    }
  };

  const handleFile = (file, setFileFunction) => {
    const validExtensions = [".doc", ".docx", ".pdf", ".odt", ".rtf"];
    const fileExtension = file.name
      .substring(file.name.lastIndexOf("."))
      .toLowerCase();

    if (validExtensions.includes(fileExtension)) {
      setFileFunction(file);
    } else {
      alert(
        "Format de fichier non supporté. Veuillez uploader un fichier .doc, .docx, .pdf, .odt ou .rtf.",
      );
    }
  };

  const handleSubmit = async () => {
    if (!cvFile) {
      setError("Veuillez uploader votre CV");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("cv", cvFile);
      formData.append("lettreMotivation", lettreFile || "");
      formData.append("jobOfferId", jobOfferId); // Ajout de l'ID de l'offre

      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:8080/api/candidatures",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        },
      );

      setSuccess(true);
      onClose();
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Erreur lors de la soumission de la candidature",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
        <DialogTitle>Poser votre candidature</DialogTitle>

        <DialogContent dividers>
          <Grid container spacing={3}>
            {/* CV Upload Section */}
            <Grid item xs={12} md={6}>
              <p className="subtitle">Votre CV (obligatoire)</p>
              <div
                className={`upload-area ${isDragging && activeDropZone === "cv" ? "dragging" : ""}`}
                onDragEnter={(e) => handleDragEnter(e, "cv")}
                onDragLeave={handleDragLeave}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, setCvFile)}
              >
                <input
                  type="file"
                  id="cv-upload"
                  accept=".doc,.docx,.pdf,.odt,.rtf"
                  onChange={(e) => handleFileChange(e, setCvFile)}
                  style={{ display: "none" }}
                />
                <label htmlFor="cv-upload" className="upload-label">
                  {cvFile ? (
                    <div className="file-selected">
                      <p>CV sélectionné : {cvFile.name}</p>
                      <button onClick={() => setCvFile(null)}>
                        Changer de fichier
                      </button>
                    </div>
                  ) : (
                    <>
                      <p>Déposez votre CV ici ou cliquez pour sélectionner</p>
                      <p className="file-types">
                        Formats acceptés : .doc, .docx, .pdf, .odt, .rtf
                      </p>
                    </>
                  )}
                </label>
              </div>
            </Grid>

            {/* Motivation Letter Upload Section */}
            <Grid item xs={12} md={6}>
              <p className="subtitle">Lettre de motivation (optionnelle)</p>
              <div
                className={`upload-area ${isDragging && activeDropZone === "lettre" ? "dragging" : ""}`}
                onDragEnter={(e) => handleDragEnter(e, "lettre")}
                onDragLeave={handleDragLeave}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, setLettreFile)}
              >
                <input
                  type="file"
                  id="lettre-upload"
                  accept=".doc,.docx,.pdf,.odt,.rtf"
                  onChange={(e) => handleFileChange(e, setLettreFile)}
                  style={{ display: "none" }}
                />
                <label htmlFor="lettre-upload" className="upload-label">
                  {lettreFile ? (
                    <div className="file-selected">
                      <p>Lettre sélectionnée : {lettreFile.name}</p>
                      <button onClick={() => setLettreFile(null)}>
                        Changer de fichier
                      </button>
                    </div>
                  ) : (
                    <>
                      <p>
                        Déposez votre lettre ici ou cliquez pour sélectionner
                      </p>
                      <p className="file-types">
                        Formats acceptés : .doc, .docx, .pdf, .odt, .rtf
                      </p>
                      <p className="optional">(Optionnel)</p>
                    </>
                  )}
                </label>
              </div>
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
            disabled={loading || !cvFile}
          >
            {loading ? (
              <CircularProgress size={24} />
            ) : (
              "Soumettre la candidature"
            )}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Notifications */}
      <Snackbar
        open={success}
        autoHideDuration={3000}
        onClose={() => setSuccess(false)}
      >
        <Alert severity="success">Candidature soumise avec succès !</Alert>
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

export default AutofillApplication;
