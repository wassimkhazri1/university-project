// exportExcel.js
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export const exportExcel = (globalStats, matiereStats, studentStats) => {
  const data = [
    { Type: "Global", ...globalStats },
    ...Object.entries(matiereStats).map(([matiere, count]) => ({
      Matiere: matiere,
      Absences: count,
    })),
    ...Object.entries(studentStats).map(([student, count]) => ({
      Etudiant: student,
      Absences: count,
    })),
  ];

  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Stats");

  const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
  const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
  saveAs(blob, "AbsenceStats.xlsx");
};
