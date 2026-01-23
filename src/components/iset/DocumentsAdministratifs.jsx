import { useState, useEffect } from "react";
import axios from "axios";
import "./RegmentInterne.css";
import ParticlesBackground from "../login/ParticlesBackground";
import { ReactComponent as PdfIcon } from "../../icons/pdf.svg";
import { ReactComponent as RarIcon } from "../../icons/rar.svg";
import { ReactComponent as FileIcon } from "../../icons/file.svg";

const DocumentsAdministratifs = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [docName, setDocName] = useState(null);

  const roles = JSON.parse(localStorage.getItem("user")) || [];
  const isAdmin = roles.roles?.includes("ROLE_ADMIN"); // Vérifie si ROLE_ADMIN est présent

  const [showConfirm, setShowConfirm] = useState(false);
  const [docToDelete, setDocToDelete] = useState(null);
  // Charger les documents depuis l'API
  useEffect(() => {
    axios
      .get("http://localhost:8080/api/documents")
      .then((response) => setFiles(response.data))
      .catch((error) =>
        console.error("Erreur lors du chargement des documents", error),
      );
  }, []);

  const fileIcons = {
    pdf: <PdfIcon style={{ width: "24px", height: "24px" }} />,
    rar: <RarIcon style={{ width: "24px", height: "24px" }} />,
    default: <FileIcon style={{ width: "24px", height: "24px" }} />,
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    try {
      await axios.delete(`http://localhost:8080/api/documents/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFiles(files.filter((file) => file.id !== id));
      alert("Document supprimé !");
    } catch (error) {
      console.error("Erreur lors de la suppression", error);
      alert("Échec de la suppression");
    }
  };

  const confirmDelete = (id) => {
    console.log("Demande de suppression pour ID:", id);
    setDocToDelete(id);
    setShowConfirm(true);
  };

  const handleDeleteConfirmed = async () => {
    console.log("Suppression confirmée pour ID:", docToDelete);
    if (!docToDelete) return; // sécurité

    const token = localStorage.getItem("token");
    try {
      await axios.delete(`http://localhost:8080/api/documents/${docToDelete}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFiles(files.filter((file) => file.id !== docToDelete));
      setShowConfirm(false);
      setDocToDelete(null);
      alert("Document supprimé !");
    } catch (error) {
      console.error("Erreur lors de la suppression", error);
      alert("Échec de la suppression");
    }
  };

  // Télécharger un document
  const handleDownload = (id, fileName) => {
    const link = document.createElement("a");
    link.href = `http://localhost:8080/api/documents/${id}/download`;
    link.download = fileName;
    link.style.display = "none";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Upload d’un nouveau document
  const handleUpload = async () => {
    if (!selectedFile) return alert("Veuillez choisir un fichier !");
    const formData = new FormData();
    formData.append("documentFile", selectedFile);
    formData.append("name", docName);

    try {
      const response = await axios.post(
        "http://localhost:8080/api/documents",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        },
      );
      setFiles([...files, response.data]); // ajouter le nouveau document à la liste
      setSelectedFile(null);
      alert("Document ajouté avec succès !");
    } catch (error) {
      console.error("Erreur lors de l'upload", error);
      alert("Échec de l'upload");
    }
  };

  const filteredFiles = files.filter((file) =>
    (file.name || file.documentPath)
      .toLowerCase()
      .includes(searchTerm.toLowerCase()),
  );
  console.log("showConfirm:", showConfirm);
  return (
    <div className="reglement-container">
      {/* <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: -1,
        }}
      >
         <ParticlesBackground bgColor="#000000" /> 
      </div> */}

      <h2>Documents Administratifs</h2>

      {/* Champ de recherche */}
      <input
        type="text"
        placeholder="🔍 Rechercher un document..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />

      {/* Bouton Upload */}
      {isAdmin && (
        <div className="upload-section">
          <input
            type="text"
            placeholder="Nom du document"
            onChange={(e) => setDocName(e.target.value)}
          />
          <input
            type="file"
            onChange={(e) => setSelectedFile(e.target.files[0])}
          />
          <button onClick={handleUpload} className="upload-button">
            📤 Ajouter un document
          </button>
        </div>
      )}
      {/* Liste des documents */}
      <div className="download-grid">
        {filteredFiles.map((file, index) => (
          <div
            key={file.id}
            className="file-actions fade-in"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <button
              onClick={() => handleDownload(file.id, file.documentPath)}
              className="download-button"
            >
              {
                fileIcons[
                  file.documentPath.endsWith(".pdf")
                    ? "pdf"
                    : file.documentPath.endsWith(".rar")
                      ? "rar"
                      : "default"
                ]
              }
              {file.name || file.documentPath}
            </button>

            <button
              onClick={() => confirmDelete(file.id)}
              className="delete-button"
            >
              🗑 Supprimer
            </button>
          </div>
        ))}
      </div>

      {/* ✅ La modal doit être en dehors du map */}
      {showConfirm && (
        <div className="modal-overlay">
          <div className="modal">
            <p>Êtes-vous sûr de vouloir supprimer ce document ?</p>
            <div className="modal-actions">
              <button onClick={handleDeleteConfirmed} className="yes-button">
                ✅ Oui
              </button>
              <button
                onClick={() => setShowConfirm(false)}
                className="no-button"
              >
                ❌ Non
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DocumentsAdministratifs;
