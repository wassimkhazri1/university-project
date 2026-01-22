import * as React from "react";
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
import EventNoteIcon from "@mui/icons-material/EventNote";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material"; // Ajout de l'import manquant
import AddIcon from "@mui/icons-material/Add"; // Import de l'icône
import axios from "axios";
import { deleteEtudiant } from "../../services/api";
import "./EtudiantList.css";
import EditEtudiant from "./EditEtudiant";
import AddEtudiant from "./AddEtudiant";
import AbsenceForm from "../absence/AbsenceForm";
//const API = "http://localhost:8080";
function EtudiantList() {
  const roles = JSON.parse(localStorage.getItem("user")) || [];
  const isAdmin = roles.roles?.includes("ROLE_ADMIN"); // Vérifie si ROLE_ADMIN est présent
  const isProf = roles.roles?.includes("ROLE_PROF"); // Vérifie si ROLE_ADMIN est présent
  const [etudiants, setEtudiants] = useState([]);
  const navigate = useNavigate(); // Hook pour la navigation
  const [selectedEtudiant, setSelectedEtudiant] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [abssenceModalOpen, setAbssenceModalOpen] = useState(false);

  // const [loading, setLoading] = useState(true);
  const [error] = useState("");
  const handleEdit = (id) => {
    const etudiant = etudiants.find((e) => e.id === id);
    setSelectedEtudiant(etudiant);
    setEditModalOpen(true);
    //window.location.reload();
  };

  const handleSave = async (updatedEtudiant) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `http://localhost:8080/api/etudiants/${updatedEtudiant.id}`,
        updatedEtudiant,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setEtudiants(
        etudiants.map((e) => (e.id === updatedEtudiant.id ? response.data : e)),
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
    if (window.confirm("Voulez-vous vraiment supprimer cet étudiant ?")) {
      console.log("Supprimer l'étudiant ID :", id);
      deleteEtudiant(id).then(navigate("/list"));
      window.location.reload();
    }
  };

  const handleAbsence = (id) => {
    const etudiant = etudiants.find((e) => e.id === id);
    setSelectedEtudiant(etudiant.id);
    setAbssenceModalOpen(true);
    //window.location.reload();
  };

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "nom", headerName: "Nom", width: 120 },
    { field: "prenom", headerName: "Prénom", width: 120 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "cinNumber", headerName: "CIN", width: 120 },
    { field: "telephone", headerName: "Téléphone", width: 120 },
    { field: "matricule", headerName: "Matricule", width: 120 },
    { field: "groupe", headerName: "Groupe", width: 120 },
    { field: "classe", headerName: "Classe", width: 120 },
    { field: "niveauScolaire", headerName: "Niveau Scolaire", width: 150 },
    { field: "branche", headerName: "Branche", width: 120 },
    {
      field: "actions",
      headerName: "Actions",
      width: 120,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      renderCell: (params) => (
        <div>
          {isAdmin && (
            // Bouton Éditer
            <Tooltip title="Modifier">
              <IconButton
                onClick={() => handleEdit(params.row.id)}
                color="primary"
              >
                <Edit fontSize="small" />
              </IconButton>
            </Tooltip>
          )}
          {isAdmin && (
            // Bouton Supprimer
            <Tooltip title="Supprimer">
              <IconButton
                onClick={() => handleDelete(params.row.id)}
                color="error"
              >
                <Delete fontSize="small" />
              </IconButton>
            </Tooltip>
          )}
          {/* Add Absence Button */}
          <Tooltip title="Add absence" arrow>
            <IconButton
              aria-label="add absence"
              onClick={() => handleAbsence(params.row.id)}
              color="error"
              size="small"
            >
              <EventNoteIcon fontSize="small" />{" "}
              {/* EventNoteIcon or CalendarTodayIcon, PersonOffIcon */}
            </IconButton>
          </Tooltip>
        </div>
      ),
    },
  ];
  // Transformez vos données pour qu'elles correspondent à la structure des colonnes
  const transformedData = etudiants.map((etudiant) => ({
    id: etudiant.id,
    nom: etudiant.nom,
    prenom: etudiant.prenom,
    email: etudiant.email,
    cinNumber: etudiant.cinNumber,
    telephone: etudiant.telephone,
    matricule: etudiant.matricule,
    groupe: etudiant.groupe.name,
    classe: etudiant.classe.nom,
    niveauScolaire: etudiant.niveauScol.nom,
    branche: etudiant.branche.nom,
  }));
  useEffect(() => {
    // Fonction pour récupérer les etudiants depuis l'API
    const fetchEtudiants = async () => {
      try {
        const token = localStorage.getItem("token"); // Récupère le token depuis le localStorage
        if (!token) {
          console.error("Aucun token trouvé !");
          return;
        }

        const response = await axios.get(
          "http://localhost:8080/api/etudiants",
          {
            headers: {
              Authorization: `Bearer ${token}`, // Ajoute le token dans l'en-tête
            },
          },
        );
        setEtudiants(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des notes:", error);
        navigate("/iset/login");
      }
    };

    fetchEtudiants();
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
    link.download = "etudiants.csv";
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
            Ajouter un Étudiant
          </Button>
        )}
      </GridToolbarContainer>
    );
  };

  return (
    <div>
      <EditEtudiant
        open={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        etudiant={selectedEtudiant}
        onSave={handleSave}
      />
      {isProf && (
        <AbsenceForm
          open={abssenceModalOpen}
          onClose={() => setAbssenceModalOpen(false)}
          studentId={selectedEtudiant} // <-- Ceci doit être défini
          onSave={handleSave}
          // studentId={selectedEtudiant?.id} // <-- Ceci doit être défini
        />
      )}
      {/* Nouvelle modale d'ajout */}
      <AddEtudiant
        open={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        onSave={(newEtudiant) => {
          // Ajoute le nouvel étudiant à ta liste
          setEtudiants([...etudiants, newEtudiant]);
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
            <span style={{ marginRight: "8px" }}>Liste des Étudiants</span>{" "}
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

export default EtudiantList;
//CreatedAndDevelopedByWassimKhazri
//https://www.linkedin.com/in/wassim-khazri-ab923a14b/
