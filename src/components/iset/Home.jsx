import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./HomTest.css";
import Block3 from "../blocks/Block3";
//CreatedAndDevelopedByWassimKhazri
//https://www.linkedin.com/in/wassim-khazri-ab923a14b/

function Home() {
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
    <div>
      <Block3 />
    </div>
    //CreatedAndDevelopedByWassimKhazri
    //https://www.linkedin.com/in/wassim-khazri-ab923a14b/
  );
}

export default Home;
