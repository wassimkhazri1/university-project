import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import { saveAs } from "file-saver";
import {
  FileText,
  Download,
  Loader2,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

const GenererPdf = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const generatePdf = async (url, filename, method = "get", body = null) => {
    setLoading(true);
    setSuccess("");
    setError("");
    const userString = localStorage.getItem("user");
    if (!userString) {
      navigate("/iset/login");
      return;
    }
    try {
      const user = JSON.parse(userString);
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Aucun token trouvé !");

      const response = await axios({
        method,
        url,
        data: body,
        headers: { Authorization: `Bearer ${token}` },
        responseType: "blob",
      });

      saveAs(response.data, filename);
      setSuccess(`${filename} téléchargé !`);
    } catch (err) {
      setError("Erreur de génération ❌");
    } finally {
      setLoading(false);
    }
  };

  const userString = localStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : {};

  const buttons = [
    {
      label: "Attestation de présence",
      sub: "Document officiel PDF",
      icon: <FileText size={20} />,
      color: "bg-indigo-600",
      action: () =>
        generatePdf(
          `http://localhost:8080/api/attestationEtudiant/generate/${user.id}`,
          "Attestation.pdf",
          "post",
          user,
        ),
    },
    {
      label: "Relevé de notes",
      sub: "Notes par semestre",
      icon: <Download size={20} />,
      color: "bg-emerald-600",
      action: () =>
        generatePdf(
          `http://localhost:8080/api/notes/exportpdf/${user.id}`,
          "Releve_Notes.pdf",
        ),
    },
  ];

  return (
    <div className="w-full">
      <div className="grid grid-cols-2 gap-4 w-full">
        {buttons.map((btn, i) => (
          <motion.div
            key={i}
            whileHover={{
              y: -4,
              shadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
            }}
            whileTap={{ scale: 0.98 }}
            onClick={btn.action}
            className="relative overflow-hidden group cursor-pointer bg-white border border-slate-100 p-4 rounded-2xl flex items-center gap-4 transition-all shadow-sm"
          >
            {/* Petit indicateur de couleur sur le côté */}
            <div
              className={`absolute left-0 top-0 bottom-0 w-1 ${btn.color}`}
            />

            <div
              className={`${btn.color} text-white p-3 rounded-xl shadow-lg shadow-indigo-100 group-hover:scale-110 transition-transform`}
            >
              {btn.icon}
            </div>

            <div className="flex-1">
              <h4 className="text-sm font-bold text-slate-800">{btn.label}</h4>
              <p className="text-[11px] text-slate-400 font-medium uppercase tracking-tight">
                {btn.sub}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Barre de Status élégante */}
      <div className="mt-4 flex justify-center min-h-[30px]">
        {loading && (
          <div className="flex items-center gap-2 text-indigo-600 animate-pulse bg-indigo-50 px-4 py-1.5 rounded-full border border-indigo-100">
            <Loader2 size={14} className="animate-spin" />
            <span className="text-xs font-bold uppercase tracking-wider">
              Traitement...
            </span>
          </div>
        )}
        {success && (
          <div className="flex items-center gap-2 text-emerald-700 bg-emerald-50 px-4 py-1.5 rounded-full border border-emerald-100 animate-in zoom-in">
            <CheckCircle size={14} />
            <span className="text-xs font-bold uppercase tracking-wider">
              {success}
            </span>
          </div>
        )}
        {error && (
          <div className="flex items-center gap-2 text-rose-700 bg-rose-50 px-4 py-1.5 rounded-full border border-rose-100">
            <AlertCircle size={14} />
            <span className="text-xs font-bold uppercase tracking-wider">
              {error}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default GenererPdf;
