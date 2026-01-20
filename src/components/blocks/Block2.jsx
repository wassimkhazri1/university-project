import { useState } from "react";
import etudiant from "../../images/ISET/etudiant.png";
import enseignant from "../../images/ISET/enseignant.png";
import entreprise from "../../images/ISET/entreprise.png";
import LoginModal from "../login/LoginModal";

function Block2() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  return (
    <div>
      <div id="carouselExampleCaptions" className="carousel slide">
        <div className="carousel-indicators">
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="0"
            class="active"
            aria-current="true"
            aria-label="Slide 1"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="1"
            aria-label="Slide 2"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="2"
            aria-label="Slide 3"
          ></button>
        </div>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src={etudiant} className="d-block w-100" alt="..." />
            <div className="carousel-caption d-none d-md-block">
              <h1>
                <a onClick={() => setShowLoginModal(true)}>Espace étudiants</a>
              </h1>
            </div>
          </div>
          {/*    
CreatedAndDevelopedByWassimKhazri
https://www.linkedin.com/in/wassim-khazri-ab923a14b/
*/}
          <div className="carousel-item">
            <img src={enseignant} className="d-block w-100" alt="..." />
            <div className="carousel-caption d-none d-md-block">
              <h1>
                <a onClick={() => setShowLoginModal(true)}>
                  Espace enseignants
                </a>
              </h1>
            </div>
          </div>
          <div className="carousel-item">
            <img src={entreprise} className="d-block w-100" alt="..." />
            <div className="carousel-caption d-none d-md-block">
              <h1>
                <a onClick={() => setShowLoginModal(true)}>
                  Espace entreprises
                </a>
              </h1>
            </div>
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
      <LoginModal
        show={showLoginModal}
        onClose={() => setShowLoginModal(false)}
      />
    </div>
  );
}

export default Block2;
//CreatedAndDevelopedByWassimKhazri
//https://www.linkedin.com/in/wassim-khazri-ab923a14b/
