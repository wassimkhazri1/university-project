// exportPDF.js
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export const exportPDF = (matiereStats) => {
  const doc = new jsPDF();
  doc.text("Statistiques des absences", 14, 16);

  const tableData = Object.entries(matiereStats).map(([matiere, count]) => [
    matiere,
    count,
  ]);

  autoTable(doc, {
    head: [["Matière", "Absences"]],
    body: tableData,
  });

  doc.save("AbsenceStats.pdf");
};
