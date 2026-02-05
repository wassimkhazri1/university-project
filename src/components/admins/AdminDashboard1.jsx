//CreatedAndDevelopedByWassimKhazri
//https://www.linkedin.com/in/wassim-khazri-ab923a14b/

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Pie, Bar, Line } from "react-chartjs-2";
import { exportExcel } from "./exportExcel";
import { exportPDF } from "./exportPDF";

import {
  Grid,
  Typography,
  Card,
  CardHeader,
  CardContent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  IconButton,
} from "@mui/material";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

// Icons
import PeopleIcon from "@mui/icons-material/People";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import PieChartIcon from "@mui/icons-material/PieChart";
import BarChartIcon from "@mui/icons-material/BarChart";
import SchoolIcon from "@mui/icons-material/School";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import TimelineIcon from "@mui/icons-material/Timeline";

// Chart.js registration
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
);

// ✅ Composant StatCard
function StatCard({ title, value, color, icon }) {
  return (
    <Card sx={{ p: 2, boxShadow: 3, borderRadius: 3 }}>
      <CardContent sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        {icon}
        <div>
          <Typography variant="subtitle2" color="textSecondary">
            {title}
          </Typography>
          <Typography variant="h6" sx={{ color, fontWeight: "bold" }}>
            {value}
          </Typography>
        </div>
      </CardContent>
    </Card>
  );
}

function AdminDashboard() {
  const [globalStats, setGlobalStats] = useState({});
  const [matiereStats, setMatiereStats] = useState({});
  const [studentStats, setStudentStats] = useState({});
  const [monthlyStats, setMonthlyStats] = useState({});
  const [yearlyStats, setYearlyStats] = useState({});
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  // 🔄 Toggle mode clair/sombre
  const [darkMode, setDarkMode] = useState(false);
  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
      primary: { main: "#0d3e5f" },
      secondary: { main: "#2196f3" },
    },
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
      <Grid container spacing={3}>
        {/* Titre + Toggle Dark Mode */}
        <Grid
          item
          xs={12}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h4" color="primary" fontWeight="bold">
            📊 Dashboard Admin - Statistiques des absences
          </Typography>
          <IconButton onClick={() => setDarkMode(!darkMode)} color="inherit">
            {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </Grid>

        {/* Boutons Export */}
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => exportExcel(globalStats, matiereStats, studentStats)}
          >
            Exporter en Excel
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => exportPDF(matiereStats)}
            sx={{ ml: 2 }}
          >
            Exporter en PDF
          </Button>
        </Grid>

        {/* Résumé global */}
        <Grid item xs={12} md={4}>
          <StatCard
            title="Total Absences"
            value={
              (globalStats.justifiedAbsences || 0) +
              (globalStats.nonJustifiedAbsences || 0)
            }
            color="#0d3e5f"
            icon={<PeopleIcon color="primary" />}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <StatCard
            title="Justifiées"
            value={globalStats.justifiedAbsences}
            color="#0d3e5f"
            icon={<CheckCircleIcon sx={{ color: "#0d3e5f" }} />}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <StatCard
            title="Non Justifiées"
            value={globalStats.nonJustifiedAbsences}
            color="#ffcc00"
            icon={<CancelIcon sx={{ color: "#ffcc00" }} />}
          />
        </Grid>

        {/* Sélecteur d’année */}
        <Grid item xs={12}>
          <FormControl sx={{ minWidth: 200, boxShadow: 2, borderRadius: 2 }}>
            <InputLabel>Année</InputLabel>
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
        </Grid>

        {/* Global Pie Chart */}
        <Grid item xs={12} md={6}>
          <Card sx={{ p: 2, boxShadow: 4, borderRadius: 3 }}>
            <CardHeader
              avatar={<PieChartIcon color="primary" />}
              title="Répartition des absences"
              titleTypographyProps={{ variant: "h6", fontWeight: "bold" }}
            />
            <CardContent>
              <Pie
                data={{
                  labels: ["Justifiées", "Non justifiées"],
                  datasets: [
                    {
                      data: [
                        globalStats.justifiedAbsences,
                        globalStats.nonJustifiedAbsences,
                      ],
                      backgroundColor: ["#0d3e5f", "#ffcc00"],
                    },
                  ],
                }}
              />
            </CardContent>
          </Card>
        </Grid>

        {/* Absences par matière */}
        <Grid item xs={12} md={6}>
          <Card sx={{ p: 2, boxShadow: 4, borderRadius: 3 }}>
            <CardHeader
              avatar={<BarChartIcon color="secondary" />}
              title="Absences par matière"
              titleTypographyProps={{ variant: "h6", fontWeight: "bold" }}
            />
            <CardContent>
              <Bar
                data={{
                  labels: Object.keys(matiereStats),
                  datasets: [
                    {
                      label: "Absences",
                      data: Object.values(matiereStats),
                      backgroundColor: "#2196f3",
                      borderRadius: 6,
                    },
                  ],
                }}
              />
            </CardContent>
          </Card>
        </Grid>
        {/* Absences par étudiant */}
        <Grid item xs={12}>
          <Card sx={{ p: 2, boxShadow: 4, borderRadius: 3 }}>
            <CardHeader
              avatar={<SchoolIcon sx={{ color: "#ff9800" }} />}
              title="Absences par étudiant"
              titleTypographyProps={{ variant: "h6", fontWeight: "bold" }}
            />
            <CardContent>
              <Bar
                data={{
                  labels: Object.keys(studentStats),
                  datasets: [
                    {
                      label: "Absences",
                      data: Object.values(studentStats),
                      backgroundColor: "#ff9800",
                      borderRadius: 6,
                    },
                  ],
                }}
                options={{
                  responsive: true,
                  plugins: {
                    legend: { display: false },
                  },
                  scales: {
                    x: {
                      ticks: { color: theme.palette.text.primary },
                    },
                    y: {
                      ticks: { color: theme.palette.text.primary },
                    },
                  },
                }}
              />
            </CardContent>
          </Card>
        </Grid>

        {/* Absences par mois */}
        <Grid item xs={12} md={6}>
          <Card sx={{ p: 2, boxShadow: 4, borderRadius: 3 }}>
            <CardHeader
              avatar={<CalendarMonthIcon sx={{ color: "#3f51b5" }} />}
              title={`Évolution mensuelle (${selectedYear})`}
              titleTypographyProps={{ variant: "h6", fontWeight: "bold" }}
            />
            <CardContent>
              <Line
                data={{
                  labels: Object.keys(monthlyStats).map((m) => `Mois ${m}`),
                  datasets: [
                    {
                      label: "Absences",
                      data: Object.values(monthlyStats),
                      borderColor: "#3f51b5",
                      backgroundColor: "rgba(63,81,181,0.2)",
                      tension: 0.3,
                      fill: true,
                    },
                  ],
                }}
                options={{
                  responsive: true,
                  plugins: {
                    legend: { display: false },
                  },
                  scales: {
                    x: {
                      ticks: { color: theme.palette.text.primary },
                    },
                    y: {
                      ticks: { color: theme.palette.text.primary },
                    },
                  },
                }}
              />
            </CardContent>
          </Card>
        </Grid>

        {/* Absences par année */}
        <Grid item xs={12} md={6}>
          <Card sx={{ p: 2, boxShadow: 4, borderRadius: 3 }}>
            <CardHeader
              avatar={<TimelineIcon sx={{ color: "#f44336" }} />}
              title="Évolution annuelle"
              titleTypographyProps={{ variant: "h6", fontWeight: "bold" }}
            />
            <CardContent>
              <Line
                data={{
                  labels: Object.keys(yearlyStats).map((y) => `Année ${y}`),
                  datasets: [
                    {
                      label: "Absences",
                      data: Object.values(yearlyStats),
                      borderColor: "#f44336",
                      backgroundColor: "rgba(244,67,54,0.2)",
                      tension: 0.3,
                      fill: true,
                    },
                  ],
                }}
                options={{
                  responsive: true,
                  plugins: {
                    legend: { display: false },
                  },
                  scales: {
                    x: {
                      ticks: { color: theme.palette.text.primary },
                    },
                    y: {
                      ticks: { color: theme.palette.text.primary },
                    },
                  },
                }}
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default AdminDashboard;
