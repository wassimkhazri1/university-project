import { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import { Toast, Button } from "react-bootstrap";
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
  const [showModal, setShowModal] = useState(false);

  const [showToast, setShowToast] = useState(false);

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

  const confirmDelete = (id) => {
    console.log("Demande de suppression pour ID:", id);
    setDocToDelete(id);
    setShowConfirm(true);
  };
  const [toastMessage, setToastMessage] = useState("");
  const [toastColor, setToastColor] = useState("#28a745"); // vert par défaut

  const handleDeleteConfirmed = async () => {
    const token = localStorage.getItem("token");
    try {
      await axios.delete(`http://localhost:8080/api/documents/${docToDelete}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFiles(files.filter((file) => file.id !== docToDelete));
      setShowConfirm(false);
      setDocToDelete(null);
      setToastMessage("Document supprimé avec succès !");
      setToastColor("#28a745"); // vert
      setShowToast(true);
    } catch (error) {
      console.error("Erreur lors de la suppression", error);
      setToastMessage("Échec de la suppression");
      setToastColor("#dc3545"); // rouge
      setShowToast(true);
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
  const handleCloseModal = () => {
    setShowConfirm(false);
  };

  const filteredFiles = files.filter((file) =>
    (file.name || file.documentPath)
      .toLowerCase()
      .includes(searchTerm.toLowerCase()),
  );
  return (
    // <div className="reglement-container">
    <div className="container mt-4">
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
              Documents Administratifs
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
      <div
        className="reglement-container"
        style={{ bgColor: "#86dbf5", minHeight: "0vh" }}
      >
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
          <div variant="secondary" className="upload-section">
            <input
              type="text"
              placeholder="Nom du document"
              onChange={(e) => setDocName(e.target.value)}
            />
            <input
              type="file"
              onChange={(e) => setSelectedFile(e.target.files[0])}
            />
            <Button variant="secondary" onClick={handleUpload}>
              📤 Ajouter un document
            </Button>
          </div>
        )}
        {/* Liste des documents */}
        <div className="grid download-grid">
          {filteredFiles.length > 0 ? (
            filteredFiles.map((file, index) => (
              <div
                key={file.id}
                className="file-actions fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <Button
                  variant="secondary"
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
                </Button>
                {isAdmin && (
                  <Button
                    variant="danger"
                    onClick={() => confirmDelete(file.id)}
                    className="btn delete-button"
                  >
                    🗑 Supprimer
                  </Button>
                )}
              </div>
            ))
          ) : (
            <p className="text-center">Aucune Documente Disponible</p>
          )}
        </div>
        <Modal show={showConfirm} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Confirmation de suppression</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Êtes-vous sûr de vouloir supprimer ce document ?</p>
            <div className="modal-actions">
              <Button variant="outline-danger" onClick={handleDeleteConfirmed}>
                Supprimer
              </Button>
              <Button variant="outline-secondary" onClick={handleCloseModal}>
                Annuler
              </Button>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Fermer
            </Button>
          </Modal.Footer>
        </Modal>
        <Toast
          show={showToast}
          onClose={() => setShowToast(false)}
          delay={3000}
          autohide
          style={{
            position: "fixed",
            bottom: 20,
            right: 20,
            minWidth: "250px",
            backgroundColor: toastColor,
            color: "white",
            boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
            zIndex: 9999,
          }}
        >
          <Toast.Header closeButton={false}>
            <strong className="me-auto">Notification</strong>
          </Toast.Header>
          <Toast.Body>{toastMessage}</Toast.Body>
        </Toast>
      </div>
    </div>
  );
};

export default DocumentsAdministratifs;
