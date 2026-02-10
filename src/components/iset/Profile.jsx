import { useEffect, useState } from "react";
import { Grid, Typography, Paper, Divider, Box, Chip } from "@mui/material";
import { getEtudiantById } from "../../services/api";
import GenererPdf from "./GenererPdf";
import { User, GraduationCap } from "lucide-react";

function Profile() {
  const [photoSrc, setPhotoSrc] = useState(null);
  const [etudiant, setEtudiant] = useState(null);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  // 1. On récupère l'utilisateur proprement
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  // 2. On extrait le tableau des rôles (vérifie si c'est user.roles ou user.roles.roles dans ta console)
  const userRoles = user.roles || [];
  const isStudent = userRoles.includes("ROLE_STUDENT");
  const [roleLabel, setRoleLabel] = useState("Chargement...");

  useEffect(() => {
    // On vérifie directement dans le tableau userRoles
    const isAdmin = userRoles.includes("ROLE_ADMIN");
    const isProf = userRoles.includes("ROLE_PROF");
    const isStudent = userRoles.includes("ROLE_STUDENT");
    const isEntreprise = userRoles.includes("ROLE_ENTREPRISE");

    if (isAdmin) {
      setRoleLabel("Administrateur");
    } else if (isProf) {
      setRoleLabel("Enseignant");
    } else if (isStudent) {
      setRoleLabel("Étudiant");
    } else if (isEntreprise) {
      setRoleLabel("Entreprise");
    } else {
      setRoleLabel("Utilisateur");
    }
  }, [userRoles]);

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
        .catch(() =>
          setPhotoSrc("https://mdbcdn.b-cdn.net/img/new/avatars/2.webp"),
        );
    }
  }, [user]);

  // 1. Ajoute un useEffect pour effacer le message automatiquement
  useEffect(() => {
    if (success || error) {
      const timer = setTimeout(() => {
        setSuccess("");
        setError("");
      }, 4000); // Disparaît après 4 secondes
      return () => clearTimeout(timer);
    }
  }, [success, error]);

  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: "24px",
        p: { xs: 3, md: 5 },
        background: "white",
        border: "1px solid #f1f5f9",
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.05)",
      }}
    >
      <Grid container spacing={5} alignItems="flex-start">
        {/* Colonne gauche : Photo et Badge */}
        <Grid item xs={12} md={4} sx={{ textAlign: "center" }}>
          <Box sx={{ position: "relative", display: "inline-block" }}>
            <Box
              sx={{
                width: 170,
                height: 170,
                borderRadius: "50%",
                p: 0.5,
                border: "4px solid #f1f5f9",
                boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)",
                overflow: "hidden",
                bgcolor: "white",
              }}
            >
              <img
                src={photoSrc}
                alt="Profile"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: "50%",
                }}
              />
            </Box>
            <Chip
              label={roleLabel}
              size="small"
              sx={{
                position: "absolute",
                bottom: 10,
                right: 10,
                bgcolor: "#4f46e5",
                color: "white",
                fontWeight: "bold",
                px: 1,
                boxShadow: "0 4px 6px rgba(0,0,0,0.2)",
              }}
            />
          </Box>
        </Grid>

        {/* Colonne droite : Informations */}
        <Grid item xs={12} md={8}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            <Typography
              variant="overline"
              sx={{ color: "#6366f1", fontWeight: 800, letterSpacing: 2 }}
            >
              Espace Personnel
            </Typography>
            <Typography
              variant="h4"
              sx={{
                color: "#1e293b",
                fontWeight: 900,
                textTransform: "capitalize",
              }}
            >
              {etudiant?.prenom} {etudiant?.nom}
            </Typography>

            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mt: 1 }}>
              <Box
                sx={{
                  display: "flex",
                  itemsCenter: "center",
                  gap: 1,
                  color: "#64748b",
                }}
              >
                <User size={16} />{" "}
                <Typography variant="body2">{user?.username}</Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  itemsCenter: "center",
                  gap: 1,
                  color: "#64748b",
                }}
              >
                <GraduationCap size={16} />{" "}
                <Typography variant="body2">ISET Jendouba</Typography>
              </Box>
            </Box>
          </Box>

          <Divider sx={{ my: 4, borderColor: "#f1f5f9" }} />

          {/* Section Documents */}
          <Typography
            variant="subtitle2"
            sx={{
              mb: 2,
              color: "#94a3b8",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: 1,
            }}
          >
            Documents Administratifs
          </Typography>

          {isStudent && (
            <Box sx={{ width: "100%", mt: 2 }}>
              <GenererPdf />
            </Box>
          )}
        </Grid>
      </Grid>
    </Paper>
  );
}

export default Profile;
