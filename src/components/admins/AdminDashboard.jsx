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
  Paper,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
} from "@mui/material";

// Enregistrement Chart.js
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

function AdminDashboard() {
  const [globalStats, setGlobalStats] = useState({});
  const [matiereStats, setMatiereStats] = useState({});
  const [studentStats, setStudentStats] = useState({});
  const [monthlyStats, setMonthlyStats] = useState({});
  const [yearlyStats, setYearlyStats] = useState({});
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear()); // année par défaut

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
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        )
        .then((res) => setMonthlyStats(res.data));

      axios
        .get("http://localhost:8080/api/absences/stats/byYear", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => setYearlyStats(res.data));
    };

    // Premier chargement
    fetchStats();

    // Refresh toutes les 5 minutes
    const interval = setInterval(fetchStats, 5 * 60 * 1000);

    return () => clearInterval(interval); // Nettoyage
  }, [selectedYear]);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h4" color="primary">
          📊 Dashboard Admin - Statistiques des absences
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => exportExcel(globalStats, matiereStats, studentStats)}
        >
          {" "}
          Exporter en Excel{" "}
        </Button>{" "}
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => exportPDF(matiereStats)}
          sx={{ ml: 2 }}
        >
          {" "}
          Exporter en PDF{" "}
        </Button>
      </Grid>

      {/* Sélecteur d’année */}
      <Grid item xs={12}>
        <FormControl sx={{ minWidth: 200 }}>
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
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6">Répartition des absences</Typography>
          <Pie
            data={{
              labels: ["Justifiées", "Non justifiées"],
              datasets: [
                {
                  data: [
                    globalStats.justifiedAbsences,
                    globalStats.nonJustifiedAbsences,
                  ],
                  backgroundColor: ["#4caf50", "#f44336"],
                },
              ],
            }}
          />
        </Paper>
      </Grid>

      {/* Absences par matière */}
      <Grid item xs={12} md={6}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6">Absences par matière</Typography>
          <Bar
            data={{
              labels: Object.keys(matiereStats),
              datasets: [
                {
                  label: "Absences",
                  data: Object.values(matiereStats),
                  backgroundColor: "#2196f3",
                },
              ],
            }}
          />
        </Paper>
      </Grid>

      {/* Absences par étudiant */}
      <Grid item xs={12}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6">Absences par étudiant</Typography>
          <Bar
            data={{
              labels: Object.keys(studentStats),
              datasets: [
                {
                  label: "Absences",
                  data: Object.values(studentStats),
                  backgroundColor: "#ff9800",
                },
              ],
            }}
          />
        </Paper>
      </Grid>

      {/* Absences par mois */}
      <Grid item xs={12} md={6}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6">
            Évolution mensuelle ({selectedYear})
          </Typography>
          <Line
            data={{
              labels: Object.keys(monthlyStats).map((m) => `Mois ${m}`),
              datasets: [
                {
                  label: "Absences",
                  data: Object.values(monthlyStats),
                  borderColor: "#3f51b5",
                  fill: false,
                },
              ],
            }}
          />
        </Paper>
      </Grid>

      {/* Absences par année */}
      <Grid item xs={12} md={6}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6">Évolution annuelle</Typography>
          <Line
            data={{
              labels: Object.keys(yearlyStats).map((y) => `Année ${y}`),
              datasets: [
                {
                  label: "Absences",
                  data: Object.values(yearlyStats),
                  borderColor: "#f44336",
                  fill: false,
                },
              ],
            }}
          />
        </Paper>
      </Grid>
    </Grid>
  );
}

export default AdminDashboard;
