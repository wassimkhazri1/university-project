import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./IsetInfrastructure.css";
import ima from "../../images/ISET/articles/4c.png";
//CreatedAndDevelopedByWassimKhazri
//https://www.linkedin.com/in/wassim-khazri-ab923a14b/
function Espace4c() {
  return (
    // <div className="container mt-4 text-start">
    <div className="row hero  text-start">
      <h2 className="blue">
        Centre de carrières et de certification de compétences
      </h2>
      {/*
        //CreatedAndDevelopedByWassimKhazri
        //https://www.linkedin.com/in/wassim-khazri-ab923a14b/ 
        */}
      <p className="col-md-2 offset-md-2">
        <img
          style={{ display: " block; margin-left: auto; margin-right: auto" }}
          src={ima}
          alt=""
          width="395"
          height="642"
          loading="lazy"
          data-path="local-images:/ISET/articles/4c.png"
        />
      </p>
      <p className="col-md-4 offset-md-2">
        <br />
        <br />
        Le Centre de Carriéres et de Certification de Compétences (4C) de l'ISET
        de Jendouba offre aux étudiants et aux diplomes des services
        (informations, conseil et formation) pour les aider a trouver et a
        conserver un emploi. Il a démarrées activité au début; de l'année
        universitaire 2015/2016.
      </p>
    </div>
  );
}

export default Espace4c;
//CreatedAndDevelopedByWassimKhazri
//https://www.linkedin.com/in/wassim-khazri-ab923a14b/
