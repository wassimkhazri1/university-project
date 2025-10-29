import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import blue from "../../images/ISET/articles/blue.png";
import plan2 from "../../images/ISET/image8.svg";
import hafedh from "../../images/ISET/sigles/dir4.jpg";

function Block3() {
  return (
    <div className="container mt-4 text-start" 
    style={{
      backgroundImage: {plan2}
    }}
    >
        <div className="acm-features style-1">
          <div className="container">
          <div className="text-center">
          <h1>Pourquoi ISET Jendouba?</h1>
          </div>
            <div className="row text-left cols-3 d-flex justify-content-center">
              <div className="col-12 col-md-6 col-lg-4 aos-init aos-animate" data-aos="fade-up" data-aos-delay="100">
                  <div className="features-item no-link">
                    <div className="item-inner">
                      {/* Carte 1 */}
                      <div className="col-sm-8">
                      <p style={{color:"#6c757d"}}>
                        L’ISET Jendouba s’est imposé comme une institution phare de
                        l’enseignement supérieur en Tunisie.
                      </p>
                      </div>
                    </div>
                  </div>
                  <div className="row ">
                  <div className="col-sm-4">
                      <img
                        src={hafedh} // Remplace avec l'image du directeur
                        className="rounded-circle"
                        height="60"
                        alt="Directeur"
                      />
                  </div> 
                  <div className="col-sm-8">
                      <p className="font-bold">Docteur Hafedh Ferchichi</p>
                      <p className="text-gray-500 text-sm" style={{color:"#6c757d"}}>Directeur du ISET Jendouba</p>
                  </div>


                </div>
                <hr className="my-4" />
                <p className="text-blue-600 font-bold text-2xl">20+</p>
                <p className="text-gray-500 text-sm" style={{color:"#6c757d"}}>ans d'excellence académique</p>
              </div>
            
            <div className="col-12 col-md-6 col-lg-4 aos-init aos-animate" data-aos="fade-up" data-aos-delay="100">
                <div className="features-item no-link">
                  <div className="item-inner">
                    {/* Carte 2 */}
                      <p className="col-sm-8" style={{color:"#6c757d"}}>
                        Chaque année, l’ISET Jendouba accueille une communauté dynamique et
                        diversifiée des étudiants, provenant de différentes régions et
                        horizons.
                      </p>
                      <hr className="my-4" />
                      <p className="text-blue-600 font-bold text-2xl">1000+</p>
                      <p className="text-gray-500 text-sm"style={{color:"#6c757d"}}>Étudiants Inscrits Chaque Année</p>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-md-6 col-lg-4 aos-init aos-animate" data-aos="fade-up" data-aos-delay="100">
                  <div className="features-item no-link">
                    <div className="item-inner">
                    {/* Carte 3 */}
                      <p className="" style={{color:"#6c757d"}}>
                        L’ISET Jendouba offre à ses étudiants et enseignants un environnement
                        d’apprentissage moderne pour répondre aux exigences pédagogiques et
                        technologiques.
                      </p>
                      <hr className="my-4" />
                      <p className="text-blue-600 font-bold text-2xl">30+</p>
                      <p className="text-gray-500 text-sm" style={{color:"#6c757d"}}>
                        Laboratoires et Salles Spécialisées
                      </p>
                      </div>
{/*                      
CreatedAndDevelopedByWassimKhazri
https://www.linkedin.com/in/wassim-khazri-ab923a14b/
*/}
                    </div>
                  </div>
                </div>
              </div>
            </div>  
          </div> 

  );
}

export default Block3;
