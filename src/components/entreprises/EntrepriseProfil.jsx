import React, { useState, useEffect } from "react";
import axios from "axios";

function EntrepriseProfil() {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");
  const [entreprise, setEntreprise] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
      } catch (err) {
        setError("Erreur lors du chargement des informations de l'entreprise");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    getEntreprise();
  }, [API_URL, token]);

  if (loading) return <div>Chargement...</div>;
  if (error) return <div>{error}</div>;

  return (
    <a
      data-mdb-dropdown-init
      className="dropdown-toggle d-flex align-items-center hidden-arrow"
      href="#"
      id="navbarDropdownMenuAvatar"
      role="button"
      aria-expanded="false"
    >
      {user.photo ? (
        <img
          src={user.photo}
          alt="Profile"
          className="rounded-circle"
          style={{ width: "40px", height: "40px" }}
        />
      ) : (
        <img
          src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp"
          className="rounded-circle"
          height="25"
          alt="Black and White Portrait of a Man"
          loading="lazy"
        />
      )}
      <p>
        <strong>{user.username || "Nom d'entreprise non disponible"}</strong>
      </p>
    </a>
  );
}

export default EntrepriseProfil;
