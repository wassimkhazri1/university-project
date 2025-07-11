import React, { useEffect } from "react";
import './BackToTop.css';

function BackToTop() {
  useEffect(() => {
    // Get the button after the component has mounted
    const mybutton = document.getElementById("btn-back-to-top");

    // When the user scrolls down 20px from the top of the document, show the button
    window.onscroll = function () {
      scrollFunction();
    };

    function scrollFunction() {
      if (
        document.body.scrollTop > 20 ||
        document.documentElement.scrollTop > 20
      ) {
        mybutton.style.display = "block";
      } else {
        mybutton.style.display = "none";
      }
    }

    // When the user clicks on the button, scroll to the top of the document
    mybutton.addEventListener("click", backToTop);

    function backToTop() {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    }

    // Cleanup function to remove the event listener when component unmounts
    return () => {
      mybutton.removeEventListener("click", backToTop);
    };
  }, []); // Empty dependency array means this effect runs once after initial render

  return (
    <div>
      <button
        type="button"
        data-mdb-button-init 
        data-mdb-ripple-init 
        className="btn btn-danger btn-floating btn-lg"
        id="btn-back-to-top"
        style={{ display: 'none' }} // Initially hidden
      >
        <i className="fas fa-arrow-up"></i>
      </button>
    </div>
  );
}

export default BackToTop;
//CreatedAndDevelopedByWassimKhazri
//https://www.linkedin.com/in/wassim-khazri-ab923a14b/ 
