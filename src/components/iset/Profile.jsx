// CreatedAndDevelopedByWassimKhazri
// https://www.linkedin.com/in/wassim-khazri-ab923a14b/
import React, { useEffect, useState } from "react";
import { Grid, Typography, Paper, Divider, Box } from "@mui/material";
import { getEtudiantById } from "../../services/api";
import GenererPdf from "./GenererPdf";

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
    <Paper
      elevation={4}
      sx={{
        borderRadius: 3,
        p: 3,
        background: "linear-gradient(135deg, #f9fafb, #eef2f7)",
      }}
    >
      <Grid container spacing={3} alignItems="center">
        {/* Colonne gauche : photo */}
        <Grid item xs={12} md={4} sx={{ textAlign: "center" }}>
          <Box
            sx={{
              display: "inline-block",
              borderRadius: "50%",
              overflow: "hidden",
              boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
              transition: "transform 0.3s ease",
              "&:hover": { transform: "scale(1.05)" },
            }}
          >
            <img
              src={photoSrc}
              alt="Profile"
              style={{
                width: "150px",
                height: "150px",
                objectFit: "cover",
              }}
            />
          </Box>
        </Grid>

        {/* Colonne droite : infos + boutons */}
        <Grid item xs={12} md={8}>
          <Typography variant="h5" color="primary" fontWeight="bold">
            {etudiant?.nom} {etudiant?.prenom}
          </Typography>
          <Typography variant="subtitle1" sx={{ mb: 1, color: "#374151" }}>
            Bienvenue <strong>{user?.username}</strong>
          </Typography>

          <Divider sx={{ my: 2 }} />

          {/* Boutons / actions */}
          {isStudent && (
            <Box sx={{ mt: 2 }}>
              <GenererPdf />
            </Box>
          )}
        </Grid>
      </Grid>
    </Paper>
  );
}

export default Profile;
