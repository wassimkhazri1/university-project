//CreatedAndDevelopedByWassimKhazri
//https://www.linkedin.com/in/wassim-khazri-ab923a14b/
import React, { useEffect, useState } from "react";
import { Grid, Typography } from "@mui/material";
import { getEtudiantById } from "../../services/api";
import GenererPdf1 from "./GenererPdf1";

function Profile() {
  const [photoSrc, setPhotoSrc] = useState(null);
  const [etudiant, setEtudiant] = useState(null);

  const user = JSON.parse(localStorage.getItem("user"));
  const roles = user?.roles || [];
  const isStudent = roles.includes("ROLE_STUDENT");

  useEffect(() => {
    if (user?.id) {
      getEtudiantById(user.id)
        .then((response) => {
          const data = response.data;
          setEtudiant(data);
          if (data.photo) {
            setPhotoSrc(
              data.photo.startsWith("data:image")
                ? data.photo
                : `data:image/jpeg;base64,${data.photo}`,
            );
          } else {
            setPhotoSrc("https://mdbcdn.b-cdn.net/img/new/avatars/2.webp");
          }
        })
        .catch((error) => {
          console.error("Erreur lors de la récupération de l'étudiant:", error);
          setPhotoSrc("https://mdbcdn.b-cdn.net/img/new/avatars/2.webp");
        });
    }
  }, [user]);

  return (
    <Grid
      container
      spacing={2}
      sx={{
        backgroundColor: "#f5f5f5",
        borderRadius: 2,
        p: 3,
        boxShadow: 3,
      }}
    >
      {/* Colonne gauche : photo */}
      <Grid item xs={12} md={4} sx={{ textAlign: "center" }}>
        <img
          src={photoSrc}
          alt="Profile"
          style={{
            borderRadius: "50%",
            width: "150px",
            height: "150px",
            objectFit: "cover",
          }}
        />
      </Grid>

      {/* Colonne droite : infos + boutons */}
      <Grid item xs={12} md={8}>
        <Typography variant="h6" color="primary">
          {etudiant?.nom} {etudiant?.prenom}
        </Typography>
        <Typography variant="body1" sx={{ mb: 2, color: "#001f4d" }}>
          Bienvenue {user?.username}
        </Typography>

        {/* Boutons hexagonaux */}
        {isStudent && <GenererPdf1 />}
      </Grid>
    </Grid>
  );
}

export default Profile;
