import React from "react";
import { Hammer, Info } from "lucide-react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Licence.css";
//CreatedAndDevelopedByWassimKhazri
//https://www.linkedin.com/in/wassim-khazri-ab923a14b/

const Mastere = () => {
  return (
    <div className="hero hero1 text-start p-4">
      {/* Titre principal */}
      <div style={{ display: "flex", alignItems: "center" }}>
        {" "}
        <h1
          className="mb-4"
          style={{
            color: "#0d3e5f",
          }}
        >
          <em>
            <span style={{ marginRight: "8px" }}>Mastères</span>{" "}
          </em>
        </h1>
        <hr
          style={{
            flexGrow: 1,
            height: "3px",
            backgroundColor: "#0d3e5f",
            border: "none",
          }}
        />{" "}
      </div>
      <div className="container-fluid px-md-5 mt-5">
        {" "}
        {/* container-fluid pour plus de largeur */}
        <div className="row justify-content-center">
          {/* On passe à 12 pour occuper toute la largeur sur grand écran */}
          <div className="col-12 col-lg-12 animate-card">
            <div className="card shadow border-0 text-center p-4 py-6 w-100">
              <div className="card-body">
                <Hammer
                  size={60}
                  color="#0d3e5f"
                  className="mb-4 animate-hammer"
                />

                <h2 className="fw-bold mb-3 text-primary">
                  Section en Construction
                </h2>

                <p className="text-muted fs-5 mb-4">
                  Nous préparons la liste complète des mastères proposées par
                  <strong> l’ISET Jendouba</strong>. Revenez très bientôt !
                </p>

                <div className="d-inline-flex align-items-center justify-content-center text-primary bg-light p-3 px-5 rounded-pill shadow-sm">
                  <Info size={20} className="me-2" />
                  <span className="fw-bold">Prochainement disponible</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mastere;
