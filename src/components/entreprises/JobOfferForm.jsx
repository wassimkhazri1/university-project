import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  TextField,
  Checkbox,
  Button,
  Paper,
  Grid,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
//CreatedAndDevelopedByWassimKhazri
//https://www.linkedin.com/in/wassim-khazri-ab923a14b/
const JobOfferForm = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");
  const [entreprise, setEntreprise] = useState({});
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);

  const API_URL = `http://localhost:8080/api/entreprises/id/${user.id}`;

  useEffect(() => {
    const getEntreprise = async () => {
      try {
        const response = await axios.get(API_URL, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setEntreprise(response.data);
        setFormData((prev) => ({
          ...prev,
          company: response.data.nomcompany || "",
          responsible: response.data.rhresponsible || "",
          address: response.data.adresse || "",
          phone: response.data.telephone || "",
          email: response.data.email || "",
          fax: response.data.fax || "",
          website: response.data.web || "",
        }));
      } catch (err) {
        setError("Erreur lors du chargement des informations de l'entreprise");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    getEntreprise();
  }, [API_URL, token]);

  // if (loading) return <div>Chargement...</div>;
  // if (error) return <div>{error}</div>;

  // Génère un CAPTCHA aléatoire (ex: "5mR78vo")
  const generateCaptcha = () => {
    const chars =
      "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    let captcha = "";
    for (let i = 0; i < 7; i++) {
      captcha += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return captcha;
  };

  // Stocke le CAPTCHA actuel avec useMemo pour éviter les regénérations inutiles
  //const currentCaptcha = useMemo(() => generateCaptcha(), []);
  const [currentCaptcha, setCurrentCaptcha] = useState(generateCaptcha());
  const [formData, setFormData] = useState({
    company: "",
    responsible: "",
    address: "",
    phone: "",
    email: "",
    fax: "",
    website: "",
    masterOptions: {
      constructionFabrication: false,
      maintenanceIndustrielle: false,
      electriciteIndustrielle: false,
      automatismeInfoIndustrielle: false,
      maintenanceSystemesElectriques: false,
      devSystemesInfo: false,
      systemesEmbarques: false,
      adminReseaux: false,
      multimediaWeb: false,
      managementAffaires: false,
    },
    jobPositions: "",
    jobTitle: "",
    description: "",
    startDate: "",
    expiryDate: "",
    captcha: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData({
        ...formData,
        masterOptions: {
          ...formData.masterOptions,
          [name]: checked,
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  {
    /*  const handleSubmit = (e) => {
    e.preventDefault();

        // Vérification du CAPTCHA
        if (formData.captcha !== currentCaptcha) {
            alert('Code CAPTCHA incorrect !');
            setCurrentCaptcha(generateCaptcha()); // Régénère un nouveau CAPTCHA
            return;
          }

    console.log('Form submitted:', formData);
    // Logique d'envoi des données
  };
*/
  }
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const handleSubmit = async (e) => {
    e.preventDefault();

    // CAPTCHA validation
    if (formData.captcha !== currentCaptcha) {
      alert("Code CAPTCHA incorrect !");
      setCurrentCaptcha(generateCaptcha());
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Aucun token trouvé !");

      // Transform masterOptions into formations array
      const formations = masterOptionsRows
        .filter((row) => formData.masterOptions[row.name])
        .map((row) => row.label);

      const payload = {
        ...formData,
        formations, // Add the transformed formations array
        // Remove masterOptions if not needed by backend
        //   masterOptions: undefined
      };

      await axios.post("http://localhost:8080/api/job-offers", payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setSuccess(true);
      window.location.reload();
    } catch (error) {
      setError(
        error.response?.data?.message ||
          error.message ||
          "Erreur lors de l'ajout"
      );
      console.error("Erreur:", error);
    } finally {
      setLoading(false);
    }
    //CreatedAndDevelopedByWassimKhazri
    //https://www.linkedin.com/in/wassim-khazri-ab923a14b/
  };

  // Configuration pour afficher les options de formation dans un DataGrid
  const masterOptionsRows = [
    {
      id: 1,
      label: "Licence en Génie Mécanique:Construction et Fabrication Mécanique",
      name: "constructionFabrication",
    },
    {
      id: 2,
      label: "Licence en Génie Mécanique:Maintenance Industrielle",
      name: "maintenanceIndustrielle",
    },
    {
      id: 3,
      label: "Licence en Génie Electrique:Electricité Industrielle",
      name: "electriciteIndustrielle",
    },
    {
      id: 4,
      label:
        "Licence en Génie Electrique:Automatisme et Informatique Industrielle",
      name: "automatismeInfoIndustrielle",
    },
    {
      id: 5,
      label: "Licence en Génie Electrique:Maintenance des Systèmes Electriques",
      name: "maintenanceSystemesElectriques",
    },
    {
      id: 6,
      label:
        "Licence en Technologie de l'Informatique:Développement des Systèmes d'Information",
      name: "devSystemesInfo",
    },
    {
      id: 7,
      label:
        "Licence en Technologie de l'Informatique:Systèmes Embarqués et Mobiles",
      name: "systemesEmbarques",
    },
    {
      id: 8,
      label:
        "Licence en Technologie de l'Informatique:Administration Service Réseaux",
      name: "adminReseaux",
    },
    {
      id: 9,
      label:
        "Licence en Technologie de l'Informatique:Multimédia et Développement web",
      name: "multimediaWeb",
    },
    {
      id: 10,
      label: "Licence en Management des Affaires:Management des Affaires",
      name: "managementAffaires",
    },
  ];

  const masterOptionsColumns = [
    {
      field: "checkbox",
      headerName: "",
      width: 50,
      renderCell: (params) => (
        <Checkbox
          name={params.row.name}
          checked={formData.masterOptions[params.row.name]}
          onChange={handleChange}
        />
      ),
    },
    { field: "label", headerName: "Options de formation", flex: 1 },
  ];

  return (
    <Box sx={{ maxWidth: 800, margin: "0 auto", padding: 3 }}>
      <Paper elevation={3} sx={{ padding: 3 }}>
        <Typography variant="h4" gutterBottom>
          PROPOSER OFFRE D'EMPLOI
        </Typography>
        <Typography variant="body1" gutterBottom>
          Les entreprises désirant soumettre directement une offre d'emploi sur
          le site peuvent le faire via le formulaire suivant :
        </Typography>

        <form onSubmit={handleSubmit}>
          {/* Section Informations Entreprise */}
          <Typography variant="h6" sx={{ mt: 3, mb: 2 }}>
            Informations sur l'entreprise
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Entreprise *"
                name="company"
                value={formData.company}
                onChange={handleChange}
                disabled
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Responsable *"
                name="responsible"
                value={formData.responsible}
                onChange={handleChange}
                disabled
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Adresse *"
                name="address"
                value={formData.address}
                onChange={handleChange}
                disabled
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Téléphone *"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                disabled
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Email *"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                disabled
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Fax"
                name="fax"
                value={formData.fax}
                onChange={handleChange}
                disabled
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Site web"
                name="website"
                value={formData.website}
                onChange={handleChange}
                disabled
              />
            </Grid>
          </Grid>

          {/* Section Options de formation avec DataGrid */}
          <Typography variant="h6" sx={{ mt: 3, mb: 2 }}>
            Options de formation
          </Typography>
          <Box sx={{ height: 400, width: "100%" }}>
            <DataGrid
              rows={masterOptionsRows}
              columns={masterOptionsColumns}
              hideFooter
              disableSelectionOnClick
              disableColumnMenu
            />
          </Box>

          {/* Section Détails de l'offre */}
          <Typography variant="h6" sx={{ mt: 3, mb: 2 }}>
            Détails de l'offre
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Nombre des postes"
                name="jobPositions"
                type="number"
                value={formData.jobPositions}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Titre de l'offre *"
                name="jobTitle"
                value={formData.jobTitle}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description *"
                name="description"
                multiline
                rows={4}
                value={formData.description}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Début *"
                name="startDate"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={formData.startDate}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Expire *"
                name="expiryDate"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={formData.expiryDate}
                onChange={handleChange}
                required
              />
            </Grid>
          </Grid>

          {/* Section CAPTCHA */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
            <Typography variant="h6" sx={{ mt: 3, mb: 2 }}>
              Code de vérification: <strong>{currentCaptcha}</strong>
            </Typography>
            <TextField
              label="Retapez le code *"
              name="captcha"
              value={formData.captcha}
              onChange={handleChange}
              required
            />
          </Box>

          {/* Bouton de soumission */}
          <Box sx={{ mt: 3, display: "flex", justifyContent: "flex-end" }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
            >
              Envoyer
            </Button>
          </Box>
        </form>
      </Paper>
    </Box>
  );
};

export default JobOfferForm;
