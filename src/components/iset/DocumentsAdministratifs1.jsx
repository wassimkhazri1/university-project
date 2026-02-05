import { useState, useEffect } from "react";
import {
  Modal,
  Toast,
  Button,
  Container,
  Row,
  Col,
  Card,
  Form,
  InputGroup,
} from "react-bootstrap";
import axios from "axios";
import "./RegmentInterne.css"; // Assure-toi de mettre à jour le CSS ci-dessous
import {
  FaFilePdf,
  FaFileArchive,
  FaFileAlt,
  FaTrash,
  FaDownload,
  FaSearch,
  FaPlusCircle,
} from "react-icons/fa";

const DocumentsAdministratifs = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [docName, setDocName] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);
  const [docToDelete, setDocToDelete] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastColor, setToastColor] = useState("#28a745");

  const user = JSON.parse(localStorage.getItem("user")) || {};
  const isAdmin = user.roles?.includes("ROLE_ADMIN");

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/documents");
      setFiles(response.data);
    } catch (error) {
      console.error("Erreur chargement", error);
    }
  };

  const getFileIcon = (fileName) => {
    if (fileName.endsWith(".pdf"))
      return <FaFilePdf className="text-danger" size={30} />;
    if (fileName.endsWith(".rar") || fileName.endsWith(".zip"))
      return <FaFileArchive className="text-warning" size={30} />;
    return <FaFileAlt className="text-primary" size={30} />;
  };

  const handleDeleteConfirmed = async () => {
    const token = localStorage.getItem("token");
    try {
      await axios.delete(`http://localhost:8080/api/documents/${docToDelete}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFiles(files.filter((f) => f.id !== docToDelete));
      triggerToast("Document supprimé avec succès !", "#28a745");
      setShowConfirm(false);
    } catch (error) {
      triggerToast("Erreur lors de la suppression", "#dc3545");
    }
  };

  const triggerToast = (msg, color) => {
    setToastMessage(msg);
    setToastColor(color);
    setShowToast(true);
  };

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
    <Container className="py-5 bg-light-soft">
      {/* Header stylé */}
      <div className="d-flex align-items-center mb-5">
        <h1 className="display-6 fw-bold mb-0" style={{ color: "#0d3e5f" }}>
          Documents{" "}
          <span className="text-secondary fw-light">Administratifs</span>
        </h1>
        <div
          className="ms-4 flex-grow-1"
          style={{ height: "2px", backgroundColor: "#0d3e5f", opacity: 0.2 }}
        ></div>
      </div>

      <Row className="g-4">
        {/* Barre de Recherche et Action Admin */}
        <Col lg={12} className="mb-4">
          <div className="d-flex flex-wrap gap-3 justify-content-between align-items-center bg-white p-3 shadow-sm rounded-4">
            <InputGroup style={{ maxWidth: "400px" }}>
              <InputGroup.Text className="bg-transparent border-end-0">
                <FaSearch color="#0d3e5f" />
              </InputGroup.Text>
              <Form.Control
                className="border-start-0"
                placeholder="Rechercher un document..."
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </InputGroup>

            {isAdmin && (
              <div className="d-flex gap-2 align-items-center">
                <Form.Control
                  placeholder="Nom du doc"
                  size="sm"
                  onChange={(e) => setDocName(e.target.value)}
                />
                <Form.Control
                  type="file"
                  size="sm"
                  onChange={(e) => setSelectedFile(e.target.files[0])}
                />
                <Button
                  variant="primary"
                  className="btn-custom-blue d-flex align-items-center gap-2"
                  onClick={handleUpload}
                >
                  <FaPlusCircle /> Ajouter
                </Button>
              </div>
            )}
          </div>
        </Col>

        {/* Grid des Documents */}
        {filteredFiles.map((file, index) => (
          <Col md={6} lg={4} key={file.id}>
            <Card className="h-100 border-0 shadow-sm hover-card transition">
              <Card.Body className="d-flex align-items-start gap-3">
                {" "}
                {/* Changé align-items-center en start */}
                {/* Icône à gauche */}
                <div className="icon-box bg-light p-3 rounded-3 flex-shrink-0">
                  {getFileIcon(file.documentPath)}
                </div>
                {/* Contenu textuel et boutons */}
                <div className="flex-grow-1 overflow-hidden">
                  {/* Nom du fichier : On enlève text-truncate si tu veux voir le nom complet, 
              ou on le garde mais on donne de l'espace */}
                  <h6
                    className="mb-0 text-dark fw-bold text-truncate"
                    title={file.name || file.documentPath}
                  >
                    {file.name || "Document sans nom"}
                  </h6>

                  <small className="text-muted d-block mb-2 mt-1">
                    {file.documentPath.split(".").pop().toUpperCase()}
                  </small>

                  {/* Boutons : On les met dans un conteneur flex qui wrap (revient à la ligne si besoin) */}
                  <div className="d-flex flex-wrap gap-3 mt-2 border-top pt-2">
                    <Button
                      variant="link"
                      className="p-0 text-decoration-none text-primary fw-semibold small d-flex align-items-center"
                      onClick={() =>
                        window.open(
                          `http://localhost:8080/api/documents/${file.id}/download`,
                        )
                      }
                    >
                      <FaDownload size={14} className="me-1" /> Télécharger
                    </Button>

                    {isAdmin && (
                      <Button
                        variant="link"
                        className="p-0 text-decoration-none text-danger fw-semibold small d-flex align-items-center"
                        onClick={() => {
                          setDocToDelete(file.id);
                          setShowConfirm(true);
                        }}
                      >
                        <FaTrash size={12} className="me-1" /> Supprimer
                      </Button>
                    )}
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

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
    </Container>
  );
};

export default DocumentsAdministratifs;
