import React from "react";
import item1 from "../../images/ISET/articles/item-1.png";
import item2 from "../../images/ISET/articles/item-2.png";
import item3 from "../../images/ISET/articles/item-3.png";
import "./Block1.css"; // Importez votre fichier CSS
import plan2 from "../../images/ISET/plan2.png";

function Block1() {
  return (
    <div
      id="acm-hero-wrap-111"
      className="acm-hero style-1"
      style={{
        backgroundImage: `url(${plan2})`
      }}
    >
      {/*
      CreatedAndDevelopedByWassimKhazri
      https://www.linkedin.com/in/wassim-khazri-ab923a14b/
      */}
      <div className="container">
        <div className="item">
          <div className="hero-content">
            <div className="hero-content-inner">
              <h1 className="hero-title" data-aos="fade-up">ISET Jendouba</h1>
              <div className="row g-3">
                <div className="col-12 col-lg-5 order-2 order-lg-1">
                  <p className="lead description" data-aos="fade-up">
                    L'ISET de Jendouba est un environnement sain et serein où
                    l'étudiant peut se livrer entièrement à ses études et
                    profiter des activités tant sportives que culturelles mises
                    à sa disposition.
                  </p>
                  <div className="acm-action">
                    <a
                      href="/iset/presentation"
                      className="btn custom-btn" // Appliquez la classe custom-btn
                      data-aos="fade-up"
                      data-aos-delay="100"
                    >
                      <span className="bold-text animated-text">À propos</span> <i className="fas fa-arrow-right"></i>
                    </a>
                    <div className="play-icon">
                    </div>
                  </div>
                  <div
                    className="hero-more-info d-flex"
                    data-aos="fade-up"
                    data-aos-delay="300"
                  >
                    <img
                      className="amp"
                      src="https://isetj.rnu.tn/images/ISET/articles/hero.jpg"
                      alt="ISET Jendouba"
                    />
                  </div>
                  <div className="avatar-title">
                    Développez vos compétences dans un cadre stimulant et
                    inspirant
                  </div>
                </div>
                <div
                  className="col-12 col-lg-6 offset-lg-1 order-1 order-lg-2"
                  data-aos="fade-left"
                  data-aos-delay="400"
                >
                  <div
                    style={{
                      boxShadow: "5px 6px 5px 0px rgba(0, 0, 0, 0.3)",
                      borderRadius: "4px",
                    }}
                    id="carouselExampleControls"
                    className="carousel slide"
                    data-ride="carousel"
                  >
                    <div className="carousel-inner">
                      <div className="carousel-item active">
                        <img
                          style={{
                            boxShadow: "5px 6px 5px 0px rgba(0, 0, 0, 0.3)",
                            borderRadius: "4px",
                          }}
                          className="d-block w-100"
                          src={item1}
                          alt="First slide"
                        />
                        <div className="carousel-caption d-none d-md-block">
                          <h1><a className="bold-text animated-text" href="/iset/login">Espace étudiants</a></h1>
                        </div>
                      </div>
                      <div className="carousel-item">
                        <img
                          style={{
                            boxShadow: "5px 6px 5px 0px rgba(0, 0, 0, 0.3)",
                            borderRadius: "4px",
                          }}
                          className="d-block w-100"
                          src={item2}
                          alt="Second slide"
                        />
                        <div className="carousel-caption d-none d-md-block">
                        <h1><a className="bold-text animated-text" href="/iset/login">Espace enseignants</a></h1>
                        </div>
                      </div>
                      <div className="carousel-item">
                        <img
                          style={{
                            boxShadow: "5px 6px 5px 0px rgba(0, 0, 0, 0.3)",
                            borderRadius: "4px",
                          }}
                          className="d-block w-100"
                          src={item3}
                          alt="Third slide"
                        />
                        <div className="carousel-caption d-none d-md-block">
                        <h1><a className="bold-text animated-text" href="/iset/login">Espace entreprises</a></h1>
                        </div>
                      </div>
                    </div>
                    <button
                      className="carousel-control-prev"
                      type="button"
                      data-bs-target="#carouselExampleControls"
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
                      data-bs-target="#carouselExampleControls"
                      data-bs-slide="next"
                    >
                      <span
                        className="carousel-control-next-icon"
                        aria-hidden="true"
                      ></span>
                      <span className="visually-hidden">Next</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Block1;
//CreatedAndDevelopedByWassimKhazri
//https://www.linkedin.com/in/wassim-khazri-ab923a14b/