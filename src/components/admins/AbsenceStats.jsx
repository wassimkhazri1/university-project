//CreatedAndDevelopedByWassimKhazri
//https://www.linkedin.com/in/wassim-khazri-ab923a14b/

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar, Pie } from "react-chartjs-2";

function AbsenceStats() {
  const [globalStats, setGlobalStats] = useState({});
  const [matiereStats, setMatiereStats] = useState({});
  const [studentStats, setStudentStats] = useState({});

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/absences/stats/global")
      .then((res) => setGlobalStats(res.data));

    axios
      .get("http://localhost:8080/api/absences/stats/byMatiere")
      .then((res) => setMatiereStats(res.data));

    axios
      .get("http://localhost:8080/api/absences/stats/byStudent")
      .then((res) => setStudentStats(res.data));
  }, []);

  return (
    <div>
      <h2>📊 Statistiques des absences</h2>

      {/* Global Pie Chart */}
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

      {/* Absences par matière */}
      <Bar
        data={{
          labels: Object.keys(matiereStats),
          datasets: [
            {
              label: "Absences par matière",
              data: Object.values(matiereStats),
              backgroundColor: "#2196f3",
            },
          ],
        }}
      />

      {/* Absences par étudiant */}
      <Bar
        data={{
          labels: Object.keys(studentStats),
          datasets: [
            {
              label: "Absences par étudiant",
              data: Object.values(studentStats),
              backgroundColor: "#ff9800",
            },
          ],
        }}
      />
    </div>
  );
}

export default AbsenceStats;
