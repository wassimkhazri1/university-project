import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Licence.css";
//CreatedAndDevelopedByWassimKhazri
//https://www.linkedin.com/in/wassim-khazri-ab923a14b/

const Organigramme = () => {
  return (
    <div className="hero text-start p-4">
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
            <span style={{ marginRight: "8px" }}>Organigrammes</span>{" "}
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
      <div className="container">
        {/* Section en construction */}
        <section className="mb-5">
          <div className="card shadow-sm border-0">
            <div className="card-body text-center">
              <h5 className="card-title text-primary fw-bold">
                En cours de construction
              </h5>
              <p className="card-text text-muted">
                Cette section sera bientôt disponible avec la liste complète des
                organigrammes proposées par l’ISET Jendouba.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Organigramme;
