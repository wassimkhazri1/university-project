import { useEffect, useState } from "react";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import {
  DataGrid,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarDensitySelector,
  GridToolbarContainer,
} from "@mui/x-data-grid";
import { CircularProgress, IconButton, Tooltip } from "@mui/material"; // Import manquant
import { Edit, Delete } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material"; // Ajout de l'import manquant
import AddIcon from "@mui/icons-material/Add"; // Import de l'icône
import axios from "axios";
import { deleteEntreprise } from "../../services/api";
import "../etudiants/EtudiantList.css";
import AddEntreprise from "./AddEntreprise";
import EditEntreprise from "./EditEntreprise";
//const API = "http://localhost:8080";
function EntrepriseList() {
  const [entreprises, setEntreprises] = useState([]);
  const navigate = useNavigate(); // Hook pour la navigation
  const [selectedEntreprise, setSelectedEntreprise] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);

  // const [loading, setLoading] = useState(true);
  const [error] = useState("");
  const handleEdit = (id) => {
    const entreprise = entreprises.find((e) => e.id === id);
    setSelectedEntreprise(entreprise);
    setEditModalOpen(true);
    //window.location.reload();
  };

  const handleSave = async (updatedEntreprise) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `http://localhost:8080/api/entreprises/${updatedEntreprise.id}`,
        updatedEntreprise,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setEntreprises(
        entreprises.map((e) =>
          e.id === updatedEntreprise.id ? response.data : e,
        ),
      );
      setEditModalOpen(false);
    } catch (error) {
      console.error("Erreur lors de la mise à jour:", error);
      // Gérer l'affichage d'une erreur à l'utilisateur
    }
  };
  // États pour la modale d'ajout
  const [addModalOpen, setAddModalOpen] = useState(false);

  // Fonction pour ouvrir la modale
  const handleOpenAddModal = () => {
    setAddModalOpen(true);
  };
  const handleDelete = (id) => {
    if (window.confirm("Voulez-vous vraiment supprimer cette entreprise ?")) {
      deleteEntreprise(id).then(navigate("/iset/entrepriselist"));
      window.location.reload();
    }
  };
  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "nom", headerName: "Nom", width: 120 },
    { field: "prenom", headerName: "Prénom", width: 120 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "cinNumber", headerName: "CIN", width: 120 },
    { field: "telephone", headerName: "Téléphone", width: 120 },
    { field: "matricule", headerName: "Matricule", width: 120 },
    { field: "nomcompany", headerName: "NomCompany", width: 120 },
    { field: "owner", headerName: "Owner", width: 120 },
    { field: "rhresponsible", headerName: "RH Responsible", width: 150 },
    { field: "adresse", headerName: "Adresse", width: 120 },
    { field: "fax", headerName: "Fax", width: 150 },
    { field: "web", headerName: "Web", width: 120 },
    { field: "linkedin", headerName: "linkedIn", width: 150 },
    {
      field: "actions",
      headerName: "Actions",
      width: 120,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      renderCell: (params) => (
        <div>
          {/* Bouton Éditer */}
          <Tooltip title="Modifier">
            <IconButton
              onClick={() => handleEdit(params.row.id)}
              color="primary"
            >
              <Edit fontSize="small" />
            </IconButton>
          </Tooltip>

          {/* Bouton Supprimer */}
          <Tooltip title="Supprimer">
            <IconButton
              onClick={() => handleDelete(params.row.id)}
              color="error"
            >
              <Delete fontSize="small" />
            </IconButton>
          </Tooltip>
        </div>
      ),
    },
  ];
  // Transformez vos données pour qu'elles correspondent à la structure des colonnes
  const transformedData = entreprises.map((entreprise) => ({
    id: entreprise.id,
    nom: entreprise.nom,
    prenom: entreprise.prenom,
    email: entreprise.email,
    cinNumber: entreprise.cinNumber,
    telephone: entreprise.telephone,
    matricule: entreprise.matricule,
    nomcompany: entreprise.nomcompany,
    owner: entreprise.owner,
    rhresponsible: entreprise.rhresponsible,
    adresse: entreprise.adresse,
    fax: entreprise.fax,
    web: entreprise.web,
    linkedin: entreprise.linkedin,
  }));
  useEffect(() => {
    // Fonction pour récupérer les Entreprises depuis l'API
    const fetchEntreprises = async () => {
      try {
        const token = localStorage.getItem("token"); // Récupère le token depuis le localStorage
        if (!token) {
          console.error("Aucun token trouvé !");
          return;
        }

        const response = await axios.get(
          "http://localhost:8080/api/entreprises",
          {
            headers: {
              Authorization: `Bearer ${token}`, // Ajoute le token dans l'en-tête
            },
          },
        );
        setEntreprises(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des notes:", error);
        //  navigate("/iset/login");
      }
    };

    fetchEntreprises();
  }, []);

  const handleExport = () => {
    // Create CSV content with UTF-8 BOM
    const headers = columns.map((col) => col.headerName).join(",");
    const rows = transformedData
      .map((row) =>
        columns
          .map((col) => `"${String(row[col.field] || "").replace(/"/g, '""')}"`)
          .join(","),
      )
      .join("\n");

    const csvContent = "\uFEFF" + headers + "\n" + rows;

    // Create download link
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "entreprises.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const CustomToolbar = () => {
    return (
      <GridToolbarContainer>
        <GridToolbarColumnsButton />
        <GridToolbarFilterButton />
        <GridToolbarDensitySelector />
        <Button startIcon={<SaveAltIcon />} onClick={handleExport}>
          Export
        </Button>
        {isAdmin && (
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={handleOpenAddModal}
            sx={{ ml: 1 }}
          >
            Ajouter une Entreprise
          </Button>
        )}
      </GridToolbarContainer>
    );
  };

  const roles = JSON.parse(localStorage.getItem("user")) || [];
  const isAdmin = roles.roles?.includes("ROLE_ADMIN"); // Vérifie si ROLE_ADMIN est présent
  return (
    <div>
      <EditEntreprise
        open={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        entreprise={selectedEntreprise}
        onSave={handleSave}
      />
      {/* Nouvelle modale d'ajout */}

      {/* <AddEtudiant */}
      <AddEntreprise
        open={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        onSave={(newEntreprise) => {
          // Ajoute le nouvel étudiant à ta liste
          setEntreprises([...entreprises, newEntreprise]);
        }}
      />
      <div style={{ display: "flex", alignItems: "center" }}>
        {" "}
        <h1
          className="mb-4"
          style={{
            color: "#0d3e5f",
          }}
        >
          <em>
            <span style={{ marginRight: "8px" }}>
              Liste des Entreprises
            </span>{" "}
          </em>
        </h1>
        <hr
          style={{
            flexGrow: 1,
            height: "3px",
            backgroundColor: "#0d3e5f",
            border: "none",
          }}
        />{" "}
      </div>
      {/* CreatedAndDevelopedByWassimKhazri
https://www.linkedin.com/in/wassim-khazri-ab923a14b/  */}

      <div style={{ height: 600, width: "100%", position: "relative" }}>
        {
          /*loading &&*/ <CircularProgress
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          />
        }
        {error && <div style={{ color: "red" }}>{error.message}</div>}

        <DataGrid
          rows={transformedData}
          columns={columns}
          // loading={loading}
          slots={{
            toolbar: CustomToolbar,
          }}
          // slots={{
          //   toolbar: GridToolbar,
          // }}
          initialState={{
            pagination: {
              paginationModel: { pageSize: 10, page: 0 },
            },
          }}
          pageSizeOptions={[5, 10, 25]}
          checkboxSelection={false}
          disableRowSelectionOnClick
        />
      </div>
    </div>
  );
}

export default EntrepriseList;
//CreatedAndDevelopedByWassimKhazri
//https://www.linkedin.com/in/wassim-khazri-ab923a14b/
