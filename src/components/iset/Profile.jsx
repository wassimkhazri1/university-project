import React, { useEffect, useState } from "react";
import GenererPdf from "../genererPdf/GenererPdf";
import plan from "../../images/ISET/plan1.png";
import GenererPdf1 from "./GenererPdf1";
import { getEtudiantById } from "../../services/api";
//CreatedAndDevelopedByWassimKhazri
//https://www.linkedin.com/in/wassim-khazri-ab923a14b/
function Profile() {
  const [photoSrc, setPhotoSrc] = useState(null);
  const user = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
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
    <div
      className="row"
      style={{
        backgroundImage: `url(${plan})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <p>
        <strong>Bienvenue {user.username}</strong>
      </p>

      <a
        data-mdb-dropdown-init
        className="dropdown-toggle d-flex align-items-center hidden-arrow col-3"
        href="#"
        id="navbarDropdownMenuAvatar"
        role="button"
        aria-expanded="false"
      >
        {photoSrc ? (
          <img
            src={photoSrc}
            alt="Profile"
            className="rounded-circle"
            style={{ width: "350px", height: "350px" }}
          />
        ) : (
          <img
            src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp"
            className="rounded-circle"
            height="25"
            alt="Black and White Portrait of a Man"
            loading="lazy"
            style={{ width: "350px", height: "350px" }}
          />
        )}
      </a>

      <a className="col-8" id="divdiv">
        <GenererPdf1 />
        {/*   <GenererPdf /> */}
      </a>
    </div>
  );
}
//CreatedAndDevelopedByWassimKhazri
//https://www.linkedin.com/in/wassim-khazri-ab923a14b/
export default Profile;
