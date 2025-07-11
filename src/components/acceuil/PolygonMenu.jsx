import React from "react";
import "./PolygonMenu.css";
//CreatedAndDevelopedByWassimKhazri
//https://www.linkedin.com/in/wassim-khazri-ab923a14b/
const PolygonMenu = () => {
  return (
    <div className="polygon-grid">
      {/* Première rangée avec 4 éléments */}
      <div className="polygon-item top-row">SIGN UP</div>
      <div className="polygon-item top-row">SIGN IN</div>
      <div className="polygon-item top-row">INFORMATION</div>
      <div className="polygon-item top-row">STATISTICS</div>
      
      {/* Deuxième rangée avec 3 éléments centrés */}
      <div className="polygon-item bottom-row">NEWS</div>
      <div className="polygon-item bottom-row">SITE RULES</div>
      <div className="polygon-item bottom-row">SUPPORT</div>
    </div>
  );
};

export default PolygonMenu;
//CreatedAndDevelopedByWassimKhazri
//https://www.linkedin.com/in/wassim-khazri-ab923a14b/