import React from "react";

//CreatedAndDevelopedByWassimKhazri
//https://www.linkedin.com/in/wassim-khazri-ab923a14b/ 
function Language() {
    return (
       <div> 
<nav className="navbar navbar-expand-lg navbar-light bg-body-tertiary">
  <div className="container-fluid">
    <ul className="navbar-nav">
      {/*Icon dropdown*/}
      <li className="nav-item dropdown">
        <a
          data-mdb-dropdown-init
          className="nav-link dropdown-toggle"
          href="#"
          id="navbarDropdown"
          role="button"
          aria-expanded="false"
        >
          <i className="flag-united-kingdom flag m-0"></i>
        </a>
        <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
          <li>
            <a className="dropdown-item" href="#"
              ><i className="flag-united-kingdom flag"></i>English
              <i className="fa fa-check text-success ms-2"></i></a>
          </li>
          <li><hr className="dropdown-divider" /></li>
          <li>
            <a className="dropdown-item" href="#"><i className="flag-poland flag"></i>Polski</a>
          </li>
          <li>
            <a className="dropdown-item" href="#"><i className="flag-china flag"></i>中文</a>
          </li>
          <li>
            <a className="dropdown-item" href="#"><i className="flag-japan flag"></i>日本語</a>
          </li>
          <li>
            <a className="dropdown-item" href="#"><i className="flag-germany flag"></i>Deutsch</a>
          </li>
          <li>
            <a className="dropdown-item" href="#"><i className="flag-france flag"></i>Français</a>
          </li>
          <li>
            <a className="dropdown-item" href="#"><i className="flag-spain flag"></i>Español</a>
          </li>
          <li>
            <a className="dropdown-item" href="#"><i className="flag-russia flag"></i>Русский</a>
          </li>
          <li>
            <a className="dropdown-item" href="#"><i className="flag-portugal flag"></i>Português</a>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</nav>
</div>
);
};
//CreatedAndDevelopedByWassimKhazri
//https://www.linkedin.com/in/wassim-khazri-ab923a14b/ 
export default Language;