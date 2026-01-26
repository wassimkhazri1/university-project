import React from "react";
import logo from "../../images/ISET/etudiant.png"; // ou une autre image de l'ISET
import logo1 from "../../images/ISET/sigles/logo1.png";
import "./ContactSection.css";

function ContactSection() {
  return (
    <section id="contact" className="section contact">
      <h2>Contactez-nous</h2>
      <div className="contact-container">
        {/* Formulaire */}
        <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
          <input type="text" name="name" placeholder="Votre nom" required />
          <input type="email" name="email" placeholder="Votre email" required />
          <textarea
            name="message"
            rows="5"
            placeholder="Votre message..."
            required
          ></textarea>
          <button type="submit">Envoyer</button>
        </form>

        {/* Image + Infos */}
        <div className="contact-info">
          <img src={logo1} alt="ISET Jendouba" className="contact1-img" />
          <img src={logo} alt="ISET Jendouba" className="contact-img" />
          <div className="contact-details">
            <p>
              <strong>Email :</strong> contact@iset-jendouba.tn
            </p>
            <p>
              <strong>Téléphone :</strong> +216 78 123 456
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
{
  /* 
//CreatedAndDevelopedByWassimKhazri
//https://www.linkedin.com/in/wassim-khazri-ab923a14b/ 
*/
}
export default ContactSection;
