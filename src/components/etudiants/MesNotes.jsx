import React, { useEffect, useState } from "react";
import axios from "axios";
import { Height } from "@mui/icons-material";

const MesNotes = () => {
  const [notes, setNotes] = useState([]);
  const [moyenne, setMoyenne] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Combined data fetching for both notes and moyenne
  useEffect(() => {
    const fetchData = async () => {
      //   setLoading(true);
      //   setError(null);

      try {
        const userString = localStorage.getItem("user");
        const token = localStorage.getItem("token");

        if (!userString || !token) {
          throw new Error("Authentication required");
        }

        const user = JSON.parse(userString);

        // Fetch notes and moyenne in parallel
        const [notesResponse, moyenneResponse] = await Promise.all([
          axios.get("http://localhost:8080/api/notes/mes-notes", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get(`http://localhost:8080/api/moyennes/${user.id}`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        setNotes(notesResponse.data);

        // Vérifier si moyenneResponse.data existe
        if (moyenneResponse.data) {
          setMoyenne(moyenneResponse.data);
        } else {
          // Si aucune moyenne n'existe, on la crée
          await axios.post(
            `http://localhost:8080/api/moyennes/${user.id}`,
            null,
            {
              headers: { Authorization: `Bearer ${token}` },
            },
          );

          // Puis on refait une requête GET pour récupérer la nouvelle moyenne
          const newMoyenneResponse = await axios.get(
            `http://localhost:8080/api/moyennes/${user.id}`,
            {
              headers: { Authorization: `Bearer ${token}` },
            },
          );

          setMoyenne(newMoyenneResponse.data);
        }
        // setNotes(notesResponse.data);
        // setMoyenne(moyenneResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error.response?.data?.message || error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  return (
    <div className="container mt-4">
      <div style={{ display: "flex", alignItems: "center" }}>
        {" "}
        <h1
          className="mb-4"
          style={{
            color: "#0d3e5f",
          }}
        >
          <em>
            <span style={{ marginRight: "8px" }}>Mes Notes</span>{" "}
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
      <div className="table-responsive">
        <table className="table table-striped table-bordered">
          <thead className="thead-dark">
            <tr>
              <th>Matière</th>
              <th>Note TD</th>
              <th>Note Examen</th>
              <th>Crédits</th>
              <th>Note Normale</th>
              <th>Note Rattrapage</th>
              <th>Moyenne</th>
            </tr>
          </thead>
          <tbody>
            {notes.length > 0 ? (
              notes.map((note) => (
                <tr key={note.id}>
                  <td>{note.matiereNom || "N/A"}</td>
                  <td>{note.noteTd?.toFixed(2) || "N/A"}</td>
                  <td>{note.noteExamen?.toFixed(2) || "N/A"}</td>
                  <td>{note.credits || "N/A"}</td>
                  <td>{note.noteNormale?.toFixed(2) || "N/A"}</td>
                  <td>{note.noteRattrapage?.toFixed(2) || "N/A"}</td>
                  <td>{note.moyenne?.toFixed(2) || "N/A"}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center">
                  Aucune note disponible
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {moyenne && (
        <div className="card mt-4" style={{ height: "auto" }}>
          <div className="card-header bg-primary text-white">
            <h5 className="mb-0">Moyenne Générale</h5>
          </div>
          <div className="card-body">
            <h2 className="text-center">{moyenne.moy?.toFixed(2) || "N/A"}</h2>
          </div>
        </div>
      )}
    </div>
  );
};

export default MesNotes;
