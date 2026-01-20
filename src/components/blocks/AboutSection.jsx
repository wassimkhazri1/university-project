import React from "react";
import logo from "../../images/ISET/etudiant.png"; // ou une autre image de l'ISET
import "./AboutSection.css";
import Block3 from "./Block3";

function AboutSection() {
  return (
    <section id="about" className="section about">
      <h2>À propos</h2>
      <p>
        L'ISET Jendouba forme des techniciens supérieurs dans des domaines
        innovants et adaptés au marché. Notre campus dynamique favorise
        l’apprentissage, la recherche et l’entrepreneuriat.
      </p>
      <Block3 />
    </section>
  );
}
{
  /* 
//CreatedAndDevelopedByWassimKhazri
//https://www.linkedin.com/in/wassim-khazri-ab923a14b/ 
*/
}
export default AboutSection;
