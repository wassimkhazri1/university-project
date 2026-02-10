import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./NewsTicker.css";
import { getTickers } from "../../services/api";
const API = "http://localhost:8080/api/tickers";
function NewsTicker() {
  const [tickers, setTickers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/");
          return;
        }
        const tickersResponse = await fetch(API, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        const tickersData = await tickersResponse.json();
        setTickers(tickersData);
        // Vérification du statut HTTP
        if (!tickersResponse.ok) {
          throw new Error(`Erreur HTTP : ${tickersResponse.status}`);
        }
      } catch (error) {
        setError(
          error.message || "Erreur lors de la récupération des données.",
        );
        console.error("Erreur complète:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  if (tickers.length === 0) return null;

  return (
    <div className="ticker-container">
      <div className="ticker-wrapper">
        {/* On boucle deux fois sur la liste pour créer l'effet de boucle infinie sans saut */}
        <div className="ticker-content">
          {tickers.map((ticker) => (
            <span key={ticker.id} className="ticker-item">
              {ticker.message}
              <span className="ticker-separator"> • </span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default NewsTicker;
