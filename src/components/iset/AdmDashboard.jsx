import React, { useState } from "react";
import {
  Box,
  Button,
  Drawer,
  IconButton,
  AppBar,
  Toolbar,
  Typography,
  useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import "./AdmDashboard.css"; // Import du fichier CSS
import BienvenueSection from "../blocks/BienvenueSection";
import AboutSection from "../blocks/AboutSection";
import ContactSection from "../blocks/ContactSection";
import Profile from "./Profile";
import AjoutEvent from "../admins/AjoutEvent";
import AdminDashboard from "../admins/AdminDashboard";
import MesNotes from "../etudiants/MesNotes";
import AddMatiereForm from "../admins/AddMatiereForm";

const AdmDashboard = () => {
  const [activeView, setActiveView] = useState("home");
  const [openDrawer, setOpenDrawer] = useState(false);
  const isMobile = useMediaQuery("(max-width:768px)");

  const roles = JSON.parse(localStorage.getItem("user")) || [];
  const role = roles.roles;
  const isAdmin = role?.includes("ROLE_ADMIN"); // Vérifie si ROLE_ADMIN est présent
  const isProf = role?.includes("ROLE_PROF"); // Vérifie si ROLE_PROF est présent
  const isStudent = role?.includes("ROLE_STUDENT"); // Vérifie si ROLE_STUDENT est présent
  const isEntreprise = role?.includes("ROLE_ENTREPRISE");

  const [addModalOpen1, setAddModalOpen1] = useState(false);
  const handleOpenAddModal1 = () => {
    setAddModalOpen1(true);
  };
  const [addModalOpen2, setAddModalOpen2] = useState(false);
  const handleOpenAddModal2 = () => {
    setAddModalOpen2(true);
  };
  const renderContent = () => {
    switch (activeView) {
      case "home":
        return (
          <>
            <BienvenueSection />
            <AboutSection />
            <ContactSection />
          </>
        );
      case "profile":
        return <Profile />;
      case "settings":
        return <h2>Paramètres</h2>;
      case "events":
        return (
          <AjoutEvent
            open={addModalOpen2}
            onClose={() => setAddModalOpen2(false)}
          />
        );
      case "addmatiere":
        return (
          <AddMatiereForm
            open={addModalOpen1}
            onClose={() => setAddModalOpen1(false)}
          />
        );
      case "dashs":
        return <AdminDashboard />;
      case "notes":
        return <MesNotes />;
      default:
        return <h2>Bienvenue</h2>;
    }
  };

  const SidebarContent = (
    <Box className="sidebar">
      <Button
        className={activeView === "home" ? "btn1-active" : "btn1"}
        onClick={() => {
          setActiveView("home");
          setOpenDrawer(false);
        }}
      >
        Accueil
      </Button>
      <Button
        className={activeView === "profile" ? "btn1-active" : "btn1"}
        onClick={() => {
          setActiveView("profile");
          setOpenDrawer(false);
        }}
      >
        Profil
      </Button>
      <Button
        className={activeView === "settings" ? "btn1-active" : "btn1"}
        onClick={() => {
          setActiveView("settings");
          setOpenDrawer(false);
        }}
      >
        Paramètres
      </Button>
      {isAdmin && (
        <Button
          className={activeView === "events" ? "btn1-active" : "btn1"}
          onClick={() => {
            setActiveView("events");
            setOpenDrawer(false);
            handleOpenAddModal2();
          }}
        >
          Ajouter Event
        </Button>
      )}

      {isAdmin && (
        <Button
          className={activeView === "addmatiere" ? "btn1-active" : "btn1"}
          onClick={() => {
            setActiveView("addmatiere");
            setOpenDrawer(false);
            handleOpenAddModal1();
          }}
        >
          Ajouter Matière
        </Button>
      )}
      {isAdmin && (
        <Button
          className={activeView === "dashs" ? "btn1-active" : "btn1"}
          onClick={() => {
            setActiveView("dashs");
            setOpenDrawer(false);
          }}
        >
          Dash
        </Button>
      )}
      {isStudent && (
        <Button
          className={activeView === "notes" ? "btn1-active" : "btn1"}
          onClick={() => {
            setActiveView("notes");
            setOpenDrawer(false);
          }}
        >
          Mes Notes
        </Button>
      )}
    </Box>
  );

  return (
    <Box display="flex" minHeight="80vh" flexDirection="column">
      {/* AppBar */}
      <AppBar position="static" className="appbar">
        <Toolbar>
          {isMobile && (
            <IconButton
              edge="start"
              color="inherit"
              onClick={() => setOpenDrawer(true)}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Typography variant="h6" className="appbar-title">
            Mon Dashboard
          </Typography>
        </Toolbar>
      </AppBar>

      <Box display="flex" flex={1}>
        {/* Sidebar Desktop */}
        {!isMobile && SidebarContent}

        {/* Drawer Mobile */}
        {isMobile && (
          <Drawer
            anchor="left"
            open={openDrawer}
            onClose={() => setOpenDrawer(false)}
          >
            {SidebarContent}
          </Drawer>
        )}

        {/* Main Content */}
        <Box flex={1} className="main-content">
          {renderContent()}
        </Box>
      </Box>
    </Box>
  );
};

export default AdmDashboard;
