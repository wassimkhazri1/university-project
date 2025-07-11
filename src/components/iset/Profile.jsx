import React, { useState } from 'react';
import GenererPdf from '../genererPdf/GenererPdf';
import plan from "../../images/ISET/plan1.png";
import GenererPdf1 from './GenererPdf1';
//CreatedAndDevelopedByWassimKhazri
//https://www.linkedin.com/in/wassim-khazri-ab923a14b/ 
function Profile() {
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <div className='row'
    style={{
      backgroundImage: `url(${plan})`,
      backgroundPosition: "center",
      backgroundSize: "cover"
  }}
    >
      <p><strong>Bienvenue {user.username}</strong></p>

      <a
        data-mdb-dropdown-init
        className="dropdown-toggle d-flex align-items-center hidden-arrow col-3"
        href="#"
        id="navbarDropdownMenuAvatar"
        role="button"
        aria-expanded="false"
      >
        {user.photo ? (
          <img
            src={user.photo}
            alt="Profile"
            className="rounded-circle"
            style={{ width: "350px", height: "350px" }}
          />
        ) : (
          <img
            src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp"
            className="rounded-circle"
            height="25"
            alt="Black and White Portrait of a Man"
            loading="lazy"
            style={{ width: "350px", height: "350px" }}
          /> 
        )}
      </a>
      
      <a className='col-8' id="divdiv">
      
      <GenererPdf1 />
    {/*   <GenererPdf /> */}
    </a>
    </div>
  );

}
//CreatedAndDevelopedByWassimKhazri
//https://www.linkedin.com/in/wassim-khazri-ab923a14b/ 
export default Profile;