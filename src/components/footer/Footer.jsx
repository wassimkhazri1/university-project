import React from "react";
import { Box, Grid, Typography, Link, Divider } from "@mui/material";
import { FaFacebook, FaLinkedin, FaYoutube } from "react-icons/fa";
import logo1 from "../../images/ISET/sigles/logo1.png";

const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#111",
        color: "#fff",
        p: 6,
        width: "100%",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Arrière-plan décoratif */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundImage:
            "repeating-linear-gradient(135deg, rgba(255,255,255,0.05) 0px, rgba(255,255,255,0.05) 2px, transparent 2px, transparent 6px)",
          opacity: 0.2,
          zIndex: 0,
        }}
      />

      {/* Contenu du footer */}
      <Grid
        container
        spacing={4}
        sx={{
          position: "relative",
          zIndex: 1,
          justifyContent: "space-between",
        }}
      >
        {/* Logo + description */}
        <Grid item xs={12} md={4}>
          <Box display="flex" flexDirection="column" alignItems="flex-start">
            {/* <img src={logo1} alt="ISET Jendouba" style={{ width: "150px" }} />
            <Typography variant="body1" sx={{ mt: 2 }}>
              PCI Software Security Framework
            </Typography> */}
            <Box mt={1}>
              <img src={logo1} alt="ISET Jendouba" style={{ width: "100px" }} />
            </Box>
            {/* Réseaux sociaux */}
            <Typography variant="h6" gutterBottom>
              Suivez-nous
            </Typography>
            <Box sx={{ display: "flex", gap: 2, fontSize: "28px" }}>
              <Link
                target="_bland"
                href="https://www.facebook.com/groups/1668321083438698"
                sx={{ color: "#fff" }}
              >
                <FaFacebook />
              </Link>
              <Link
                target="_bland"
                href="https://www.linkedin.com/company/iset-de-jendouba-page-officielle/posts/?feedView=all"
                sx={{ color: "#fff" }}
              >
                <FaLinkedin />
              </Link>
              <Link
                target="_bland"
                href="https://youtube.com"
                sx={{ color: "#fff" }}
              >
                <FaYoutube />
              </Link>
            </Box>
          </Box>
        </Grid>

        {/* Navigation */}
        <Grid item xs={12} md={4}>
          <Grid container spacing={2}>
            {/* Première colonne */}
            <Grid
              item
              sx={{
                fontSize: "18px",
                fontWeight: 600,
                letterSpacing: "1px",
                textTransform: "uppercase",
              }}
              // xs={6}
            >
              <Box component="ul" sx={{ listStyle: "none", p: 0, m: 0 }}>
                {["Accueil", "À propos", "Nos marchés", "Nos solutions"].map(
                  (item, i) => (
                    <li key={i}>
                      <Link
                        href="#"
                        underline="none"
                        sx={{
                          color: "#fff",
                          "&:hover": { color: "#ffcc00" },
                          display: "block",
                          py: 0.5,
                        }}
                      >
                        {item}
                      </Link>
                    </li>
                  ),
                )}
              </Box>
            </Grid>
            <Grid
              item
              sx={{
                fontSize: "18px",
                fontWeight: 600,
                letterSpacing: "1px",
                textTransform: "uppercase",
              }}
              // xs={6}
            >
              <Box component="ul" sx={{ listStyle: "none", p: 0, m: 0 }}>
                {["Nos produits", "Conseil", "Maintenance", "Clients"].map(
                  (item, i) => (
                    <li key={i}>
                      <Link
                        href="#"
                        underline="none"
                        sx={{
                          color: "#fff",
                          "&:hover": { color: "#ffcc00" },
                          display: "block",
                          py: 0.5,
                        }}
                      >
                        {item}
                      </Link>
                    </li>
                  ),
                )}
              </Box>
            </Grid>
            {/* Deuxième colonne */}
            <Grid
              item
              sx={{
                fontSize: "18px",
                fontWeight: 600,
                letterSpacing: "1px",
                textTransform: "uppercase",
              }}
              xs={6}
            >
              <Box component="ul" sx={{ listStyle: "none", p: 0, m: 0 }}>
                {["Newsletters", "Média", "Contact"].map((item, i) => (
                  <li key={i}>
                    <Link
                      href="#"
                      underline="none"
                      sx={{
                        color: "#fff",
                        "&:hover": { color: "#ffcc00" },
                        display: "block",
                        py: 0.5,
                      }}
                      xs={6}
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Divider sx={{ borderColor: "#444", my: 3 }} />
      <Typography
        variant="body2"
        align="center"
        sx={{ position: "relative", zIndex: 1 }}
      >
        © {new Date().getFullYear()} ISET Jendouba - Tous droits réservés
      </Typography>
    </Box>
  );
};

export default Footer;
