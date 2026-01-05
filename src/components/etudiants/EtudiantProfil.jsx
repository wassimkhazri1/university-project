import React, { useState } from "react";
function EtudiantProfil() {
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <a
      data-mdb-dropdown-init
      className="dropdown-toggle d-flex align-items-center hidden-arrow col-auto"
      href="#"
      id="navbarDropdownMenuAvatar"
      role="button"
      aria-expanded="false"
    >
      {/*
           CreatedAndDevelopedByWassimKhazri
           https://www.linkedin.com/in/wassim-khazri-ab923a14b/ 
           */}
      {user.photo ? (
        <img
          src={user.photo}
          alt="Profile"
          className="rounded-circle"
          style={{ width: "150px", height: "150px" }}
        />
      ) : (
        <img
          src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp"
          className="rounded-circle"
          height="25"
          alt="Black and White Portrait of a Man"
          loading="lazy"
        />
      )}
      {/*  <p>
        <strong> {user.username}</strong>
      </p>
      */}
    </a>
  );
}

export default EtudiantProfil;
