import React, { useEffect } from "react";
import "./HomTest.css"; // Assure-toi d'avoir un fichier CSS associé
//CreatedAndDevelopedByWassimKhazri
//https://www.linkedin.com/in/wassim-khazri-ab923a14b/ 
const HomTest = () => {
    useEffect(() => {
      const carousel = document.querySelector("#carouselExampleControls");
      if (carousel) {
        new window.bootstrap.Carousel(carousel, {
          interval: 3000, // Temps entre chaque slide (en ms)
          ride: "carousel",
        });
      }
    }, []);
  return (
    <div className="home-container">
      <div className="text-section">
        <h2>ISET Jendouba</h2>
        <p>
          L'ISET de Jendouba est un environnement sain et serein où l'étudiant
          peut se livrer entièrement à ses études et profiter des activités tant
          sportives que culturelles mises à sa disposition.
        </p>
        <button className="btn-about">À propos →</button>
      </div>

      <div className="image-section">
      <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
  <ol className="carousel-indicators">
    <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
    <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
    <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
  </ol>
  <div className="carousel-inner">
    <div className="carousel-item active">
      <img className="d-block w-100" src="https://isetj.rnu.tn/images/joomlart/hero/item-1.jpg" alt="First slide"/>
      <div className="carousel-caption d-none d-md-block">
    <h5>First slide</h5>
    <p>This is the First slide</p>
  </div>
    </div>
    <div className="carousel-item">
      <img className="d-block w-100" src="https://isetj.rnu.tn/images/joomlart/hero/item-2.jpg" alt="Second slide"/>
      <div className="carousel-caption d-none d-md-block">
    <h5>Second slide</h5>
    <p>This is the Second slide</p>
  </div>
    </div>
    <div className="carousel-item">
      <img className="d-block w-100" src="https://isetj.rnu.tn/images/joomlart/hero/item-3.jpg" alt="Third slide"/>
      <div className="carousel-caption d-none d-md-block">
    <h5>Third slide</h5>
    <p>This is the Third slide</p>
  </div>
    </div>
  </div>
  <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="sr-only">Previous</span>
  </a>
  <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="sr-only">Next</span>
  </a>
</div>
      </div>
    </div>
  );
};

export default HomTest;
//CreatedAndDevelopedByWassimKhazri
//https://www.linkedin.com/in/wassim-khazri-ab923a14b/ 
