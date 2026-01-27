import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import GenererPdf from "../genererPdf/GenererPdf";
import plan1 from "../../images/ISET/plan1.png";
import plan from "../../images/ISET/plan3.jpg";
import plan2 from "../../images/ISET/entreprise1.png";
import GenererPdf1 from "./GenererPdf1";
import { getEtudiantById } from "../../services/api";
//CreatedAndDevelopedByWassimKhazri
//https://www.linkedin.com/in/wassim-khazri-ab923a14b/
function Profile() {
  const [photoSrc, setPhotoSrc] = useState(null);
  const user = JSON.parse(localStorage.getItem("user"));
  const roles = JSON.parse(localStorage.getItem("user")) || [];
  const isStudent = roles.roles?.includes("ROLE_STUDENT"); // Vérifie si ROLE_STUDENT est présent
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
      style={{
        backgroundImage: `url(${plan2})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        maxWidth: "100%",
        height: "auto",
      }}
    >
      <Grid
        container
        spacing={2}
        style={{
          backgroundImage: `url(/images/ISET/plan3.jpg)`,
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        {/* Colonne gauche */}
        <Grid item xs={12}>
          <p>
            <strong style={{ color: "#001f4d" }}>
              Bienvenue {user.username}
            </strong>
          </p>
        </Grid>

        <Grid item xs={12} md={4}>
          <img
            src={photoSrc}
            alt="Profile"
            className="rounded-circle img-fluid"
            style={{ maxWidth: "100%", height: "auto" }}
          />
        </Grid>

        {/* Colonne droite */}
        <Grid item xs={12} md={8} id="divdiv">
          {isStudent && <GenererPdf1 />}
        </Grid>
      </Grid>
    </div>
  );
}
//CreatedAndDevelopedByWassimKhazri
//https://www.linkedin.com/in/wassim-khazri-ab923a14b/
export default Profile;
