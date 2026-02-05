import React from "react";
import {
  Box,
  Grid,
  Typography,
  Link,
  Divider,
  Container,
  IconButton,
} from "@mui/material";
import { FaFacebookF, FaLinkedinIn, FaYoutube } from "react-icons/fa";
import logo1 from "../../images/ISET/sigles/logo1.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const SOCIALS = [
    {
      icon: <FaFacebookF />,
      url: "https://www.facebook.com/groups/1668321083438698",
    },
    {
      icon: <FaLinkedinIn />,
      url: "https://www.linkedin.com/company/iset-de-jendouba-page-officielle/posts/?feedView=all",
    },
    { icon: <FaYoutube />, url: "https://youtube.com" },
  ];
  const navLinkStyle = {
    color: "#aaa",
    fontSize: "0.85rem", // Légèrement plus petit
    fontWeight: 500,
    textTransform: "uppercase",
    letterSpacing: "1px",
    transition: "all 0.3s ease",
    display: "block",
    py: 0.3, // <--- RÉDUIT ICI (était à 0.8)
    "&:hover": {
      color: "#ffcc00",
      transform: "translateX(5px)",
    },
  };

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#0a0a0a",
        color: "#fff",
        py: 4, // <--- RÉDUIT ICI (était pt: 8, pb: 4)
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background patterns... */}

      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        <Grid container spacing={4}>
          {/* Section Logo */}
          <Grid align="center" item xs={12} md={4}>
            <Box sx={{ mb: 2 }}>
              {" "}
              {/* mb réduit */}
              <img
                src={logo1}
                alt="ISET Jendouba"
                style={{ width: "100px" }}
                align="center"
              />{" "}
              {/* Largeur réduite */}
              <Typography
                variant="body2"
                sx={{
                  mt: 1,
                  color: "#888",
                  fontSize: "0.8rem",
                  lineHeight: 1.5,
                }}
              >
                Institut Supérieur des Études Technologiques de Jendouba.
              </Typography>
            </Box>

            <Box sx={{ display: "flex", gap: 1, justifyContent: "center" }}>
              {SOCIALS.map((item, i) => (
                <IconButton
                  target="_blank"
                  key={i}
                  href={item.url}
                  size="small" // <--- TAILLE RÉDUITE
                  sx={{
                    color: "#fff",
                    border: "1px solid rgba(255,255,255,0.1)",
                    "&:hover": { backgroundColor: "#ffcc00", color: "#000" },
                  }}
                >
                  {item.icon}
                </IconButton>
              ))}
            </Box>
          </Grid>

          {/* Navigation - Espacement compact */}
          <Grid item xs={12} md={6} sx={{ ml: "auto" }}>
            <Grid container spacing={2} justifyContent="flex-end">
              {[
                {
                  title: "Institution",
                  links: ["Accueil", "À propos", "Nos marchés"],
                },
                {
                  title: "Services",
                  links: ["Nos produits", "Conseil", "Maintenance"],
                },
                {
                  title: "Ressources",
                  links: ["Newsletters", "Média", "Contact"],
                },
              ].map((col) => (
                <Grid item xs={4} key={col.title}>
                  <Typography
                    variant="subtitle2"
                    sx={{
                      fontWeight: 700,
                      mb: 1,
                      color: "#fff",
                      fontSize: "0.9rem",
                    }}
                  >
                    {col.title}
                  </Typography>
                  <Box component="ul" sx={{ listStyle: "none", p: 0, m: 0 }}>
                    {col.links.map((link) => (
                      <li key={link}>
                        <Link href="#" underline="none" sx={navLinkStyle}>
                          {link}
                        </Link>
                      </li>
                    ))}
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
        <Divider sx={{ borderColor: "white", my: 3 }} />{" "}
        {/* <Divider sx={{ borderColor: "rgba(255,255,255,0.05)", my: 3 }} />{" "} */}
        {/* Margin Y réduit */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box sx={{ display: "flex", gap: 3 }}>
            <Link
              href="#"
              sx={{ color: "#444", fontSize: "0.7rem", underline: "none" }}
            >
              Mentions
            </Link>
            <Link
              href="#"
              sx={{ color: "#444", fontSize: "0.7rem", underline: "none" }}
            >
              Privacy
            </Link>
          </Box>
        </Box>
      </Container>
      <Typography
        variant="body2"
        align="center"
        sx={{ position: "relative", color: "#444" }}
      >
        © {currentYear} ISET Jendouba.
      </Typography>
      <Typography
        variant="body2"
        align="center"
        sx={{ position: "relative", color: "#444" }}
      >
        Site réalisé par{" "}
        <a
          href="https://www.linkedin.com/in/wassim-khazri-ab923a14b/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Wassim Khazri
        </a>
      </Typography>
    </Box>
  );
};

export default Footer;
