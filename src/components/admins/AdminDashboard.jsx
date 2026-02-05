import React, { useEffect, useState } from "react";
import axios from "axios";
import { Pie, Bar, Line } from "react-chartjs-2";
import { exportExcel } from "./exportExcel";
import { exportPDF } from "./exportPDF";
import "./AdminDashboard.css";

// MUI Components
import {
  Grid,
  Typography,
  Card,
  CardHeader,
  CardContent,
  FormControl,
  Select,
  MenuItem,
  Button,
  IconButton,
  Box,
  Container,
  Divider,
  Paper,
  Stack,
} from "@mui/material";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import DownloadIcon from "@mui/icons-material/Download";

// Icons
import PeopleIcon from "@mui/icons-material/Group";
import CheckCircleIcon from "@mui/icons-material/CheckCircleOutline";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import PieChartIcon from "@mui/icons-material/DonutLarge";
import BarChartIcon from "@mui/icons-material/BarChart";
import TimelineIcon from "@mui/icons-material/Timeline";
//Enregistrement complet de Chart.js
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Filler, // Pour l'effet de zone sous la ligne
} from "chart.js";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Filler,
);

// ✅ StatCard Modernisé
function StatCard({ title, value, color, icon, bgColor }) {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        borderRadius: 4,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: bgColor || "white",
        border: "1px solid rgba(0,0,0,0.05)",
        boxShadow: "0 4px 12px rgba(0,0,0,0.03)",
      }}
    >
      <Box>
        <Typography
          variant="body2"
          color="textSecondary"
          sx={{ fontWeight: 600, mb: 0.5 }}
        >
          {title}
        </Typography>
        <Typography variant="h4" sx={{ color: color, fontWeight: 800 }}>
          {value || 0}
        </Typography>
      </Box>
      <Box
        sx={{
          backgroundColor: "rgba(255,255,255,0.5)",
          p: 1.5,
          borderRadius: 3,
          display: "flex",
          color: color,
        }}
      >
        {React.cloneElement(icon, { fontSize: "large" })}
      </Box>
    </Paper>
  );
}

function AdminDashboard() {
  const [globalStats, setGlobalStats] = useState({});
  const [matiereStats, setMatiereStats] = useState({});
  const [studentStats, setStudentStats] = useState({});
  const [monthlyStats, setMonthlyStats] = useState({});
  const [yearlyStats, setYearlyStats] = useState({});
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [darkMode, setDarkMode] = useState(false);

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
      primary: { main: "#0d3e5f" },
      secondary: { main: "#1976d2" },
      background: { default: darkMode ? "#121212" : "#f8f9fa" },
    },
    shape: { borderRadius: 12 },
    typography: { fontFamily: "'Poppins', sans-serif" },
  });

  useEffect(() => {
    const token = localStorage.getItem("token");

    const fetchStats = () => {
      axios
        .get("http://localhost:8080/api/absences/stats/global", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => setGlobalStats(res.data));

      axios
        .get("http://localhost:8080/api/absences/stats/byMatiere", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => setMatiereStats(res.data));

      axios
        .get("http://localhost:8080/api/absences/stats/byStudent", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => setStudentStats(res.data));

      axios
        .get(
          `http://localhost:8080/api/absences/stats/byMonth/${selectedYear}`,
          { headers: { Authorization: `Bearer ${token}` } },
        )
        .then((res) => setMonthlyStats(res.data));

      axios
        .get("http://localhost:8080/api/absences/stats/byYear", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => setYearlyStats(res.data));
    };

    fetchStats();
    const interval = setInterval(fetchStats, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [selectedYear]);

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ bgcolor: "background.default", minHeight: "100vh", py: 4 }}>
        <Container maxWidth="xl">
          {/* Header Section */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 4,
            }}
          >
            <Box>
              <Typography
                variant="h4"
                color="primary"
                sx={{ fontWeight: 800, letterSpacing: "-0.5px" }}
              >
                Tableau de Bord
              </Typography>
              <Typography variant="body1" color="textSecondary">
                Analyse en temps réel des absences - ISET Jendouba
              </Typography>
            </Box>

            <Stack direction="row" spacing={1} alignItems="center">
              <IconButton
                onClick={() => setDarkMode(!darkMode)}
                sx={{ bgcolor: "action.selected" }}
              >
                {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
              </IconButton>
              <Button
                variant="contained"
                startIcon={<DownloadIcon />}
                onClick={() =>
                  exportExcel(globalStats, matiereStats, studentStats)
                }
                sx={{ borderRadius: 3, px: 3 }}
              >
                Excel
              </Button>
              <Button
                variant="outlined"
                onClick={() => exportPDF(matiereStats)}
                sx={{ borderRadius: 3, px: 3 }}
              >
                PDF
              </Button>
            </Stack>
          </Box>

          <Divider sx={{ mb: 4 }} />

          {/* Top Stat Cards */}
          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid item xs={12} md={4}>
              <StatCard
                title="Total des Absences"
                value={
                  (globalStats.justifiedAbsences || 0) +
                  (globalStats.nonJustifiedAbsences || 0)
                }
                color="#0d3e5f"
                bgColor="#e1f5fe"
                icon={<PeopleIcon />}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <StatCard
                title="Absences Justifiées"
                value={globalStats.justifiedAbsences}
                color="#2e7d32"
                bgColor="#e8f5e9"
                icon={<CheckCircleIcon />}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <StatCard
                title="Non Justifiées"
                value={globalStats.nonJustifiedAbsences}
                color="#d32f2f"
                bgColor="#ffebee"
                icon={<ErrorOutlineIcon />}
              />
            </Grid>
          </Grid>

          {/* Charts Grid */}
          <Grid container spacing={3}>
            {/* Year Selector card */}
            <Grid item xs={12}>
              <Paper
                sx={{
                  p: 2,
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  borderRadius: 3,
                }}
              >
                <TimelineIcon color="primary" />
                <Typography variant="h6">Filtre temporel :</Typography>
                <FormControl size="small" sx={{ minWidth: 150 }}>
                  <Select
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(e.target.value)}
                  >
                    {Object.keys(yearlyStats).map((year) => (
                      <MenuItem key={year} value={year}>
                        {year}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Paper>
            </Grid>

            {/* répartition Pie Chart */}
            <Grid item xs={12} md={4}>
              <Card sx={{ height: "100%" }} className="chart-card">
                <CardHeader
                  title="Répartition Globale"
                  avatar={<PieChartIcon color="primary" />}
                />
                <CardContent
                  sx={{
                    height: 300,
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <Pie
                    data={{
                      labels: ["Justifiées", "Non justifiées"],
                      datasets: [
                        {
                          data: [
                            globalStats.justifiedAbsences,
                            globalStats.nonJustifiedAbsences,
                          ],
                          backgroundColor: ["#0d3e5f", "#ff9800"],
                          hoverOffset: 15,
                        },
                      ],
                    }}
                    options={{ maintainAspectRatio: false }}
                  />
                </CardContent>
              </Card>
            </Grid>

            {/* Matières Bar Chart */}
            <Grid item xs={12} md={8}>
              <Card sx={{ height: "100%" }} className="chart-card">
                <CardHeader
                  title="Top Absences par Matière"
                  avatar={<BarChartIcon color="secondary" />}
                />
                <CardContent sx={{ height: 300 }}>
                  <Bar
                    data={{
                      labels: Object.keys(matiereStats),
                      datasets: [
                        {
                          label: "Heures d'absence",
                          data: Object.values(matiereStats),
                          backgroundColor: "#2196f3",
                          borderRadius: 10,
                        },
                      ],
                    }}
                    options={{ maintainAspectRatio: false }}
                  />
                </CardContent>
              </Card>
            </Grid>

            {/* Monthly Line Chart */}
            <Grid item xs={12}>
              <Card className="chart-card">
                <CardHeader
                  title="Évolution des Absences"
                  subheader={`Données mensuelles pour ${selectedYear}`}
                />
                <CardContent sx={{ height: 400 }}>
                  <Line
                    data={{
                      labels: [
                        "Jan",
                        "Fév",
                        "Mar",
                        "Avr",
                        "Mai",
                        "Juin",
                        "Juil",
                        "Août",
                        "Sept",
                        "Oct",
                        "Nov",
                        "Déc",
                      ],
                      datasets: [
                        {
                          label: "Volume d'absences",
                          data: Object.values(monthlyStats),
                          borderColor: "#0d3e5f",
                          backgroundColor: "rgba(13, 62, 95, 0.1)",
                          fill: true,
                          tension: 0.4,
                          pointRadius: 6,
                          pointHoverRadius: 8,
                        },
                      ],
                    }}
                    options={{ maintainAspectRatio: false }}
                  />
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default AdminDashboard;
