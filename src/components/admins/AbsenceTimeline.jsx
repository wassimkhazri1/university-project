//CreatedAndDevelopedByWassimKhazri
//https://www.linkedin.com/in/wassim-khazri-ab923a14b/

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";

function AbsenceTimeline() {
  const [monthlyStats, setMonthlyStats] = useState({});
  const [yearlyStats, setYearlyStats] = useState({});

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/absences/stats/byMonth/2026")
      .then((res) => setMonthlyStats(res.data));

    axios
      .get("http://localhost:8080/api/absences/stats/byYear")
      .then((res) => setYearlyStats(res.data));
  }, []);

  return (
    <div>
      <h2>📈 Évolution des absences</h2>

      {/* Par mois */}
      <Line
        data={{
          labels: Object.keys(monthlyStats).map((m) => `Mois ${m}`),
          datasets: [
            {
              label: "Absences par mois (2026)",
              data: Object.values(monthlyStats),
              borderColor: "#3f51b5",
              fill: false,
            },
          ],
        }}
      />

      {/* Par année */}
      <Line
        data={{
          labels: Object.keys(yearlyStats).map((y) => `Année ${y}`),
          datasets: [
            {
              label: "Absences par année",
              data: Object.values(yearlyStats),
              borderColor: "#f44336",
              fill: false,
            },
          ],
        }}
      />
    </div>
  );
}

export default AbsenceTimeline;
