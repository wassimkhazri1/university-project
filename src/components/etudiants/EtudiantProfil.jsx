import React, { useEffect, useState } from "react";
import { getEtudiantById } from "../../services/api";

function EtudiantProfil() {
  const [photoSrc, setPhotoSrc] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user?.id) {
      getEtudiantById(user.id)
        .then((response) => {
          const etudiant = response.data;
          if (etudiant.photo) {
            // Si tu stockes déjà "data:image/jpeg;base64,..."
            setPhotoSrc(etudiant.photo);
            // Sinon, ajoute le préfixe :
            // setPhotoSrc(`data:image/jpeg;base64,${etudiant.photo}`);
          } else {
            setPhotoSrc("https://mdbcdn.b-cdn.net/img/new/avatars/2.webp");
          }
        })
        .catch((error) => {
          console.error("Erreur lors de la récupération de l'étudiant:", error);
          setPhotoSrc("https://mdbcdn.b-cdn.net/img/new/avatars/2.webp");
        });
    }
  }, []);

  return (
    <a
      data-mdb-dropdown-init
      className="dropdown-toggle d-flex align-items-center hidden-arrow col-auto"
      href="#"
      id="navbarDropdownMenuAvatar"
      role="button"
      aria-expanded="false"
    >
      <img
        src={photoSrc}
        alt="Profile"
        className="rounded-circle"
        style={{ width: "40px", height: "40px" }}
      />
    </a>
  );
}

export default EtudiantProfil;
