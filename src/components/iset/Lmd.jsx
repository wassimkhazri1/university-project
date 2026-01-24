import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
//CreatedAndDevelopedByWassimKhazri
//https://www.linkedin.com/in/wassim-khazri-ab923a14b/

const Lmd = () => {
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
            <span style={{ marginRight: "8px" }}>
              Réforme LMD en Tunisie
            </span>{" "}
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
        {/* Section Grand principe */}
        <section className="mb-5">
          <h3 style={{ color: "#0d3e5f" }}>Grand principe de la réforme LMD</h3>
          <ul className="mt-3">
            <li>
              <strong>Une formation en 3 grades :</strong>
              <ul className="ms-4 mt-2">
                <li>Licence : bac + 3</li>
                <li>Mastère : bac + 5</li>
                <li>Doctorat : bac + 8</li>
              </ul>
            </li>
            <li>
              Mobilité et flexibilité : orientation progressive, restructuration
              des cursus, etc.
            </li>
            <li>Semestrialisation et découpage en crédits capitalisables.</li>
            <li>
              Formation organisée en grands domaines avec des parcours-types.
            </li>
            <li>
              Favoriser la réussite de l'étudiant avec des offres diversifiées
              et un meilleur accompagnement pédagogique.
            </li>
          </ul>
        </section>

        {/* Section Objectifs */}
        <section className="mb-5">
          <h3 style={{ color: "#0d3e5f" }}>Objectifs de la réforme LMD</h3>
          <ul className="mt-3">
            <li>
              Mettre en place un système de formation flexible et comparable à
              l’international.
            </li>
            <li>
              Réformer les programmes et diversifier les parcours dans les
              créneaux porteurs.
            </li>
            <li>
              Créer des parcours souples et efficients, académiques et
              appliqués, favorisant l’insertion professionnelle.
            </li>
            <li>
              Favoriser la mobilité nationale et internationale de l’étudiant.
            </li>
            <li>
              Permettre à l’étudiant de restructurer son parcours en cours de
              formation.
            </li>
            <li>Faciliter l’équivalence des diplômes.</li>
            <li>
              Former des diplômés polyvalents capables de s’adapter à un
              contexte mondial changeant.
            </li>
            <li>
              Assurer une meilleure lisibilité des grades et des paliers
              d’insertion pour toutes les parties concernées.
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default Lmd;
