import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import logo from "../images/ISET/sigles/sigle.png";
//CreatedAndDevelopedByWassimKhazri
//https://www.linkedin.com/in/wassim-khazri-ab923a14b/ 
const menuItems = [
  {
    label: "Accueil",
    link: "/",
  },
  {
    label: "L'institue",
    subMenu: [
      { label: "Présentation", link: "/iset/presentation" },
      { label: "Esp 4C", link: "/iset/esp-4c" },
      { label: "Mots du directeur", link: "/iset/mot-directeur" },
    ],
  },
  {
    label: "Vie à l'Institut",
    subMenu: [
      { label: "Associations", link: "/iset/associations" },
      { label: "Événements", link: "/iset/evenements" },
    ],
  },
  {
    label: "Contact",
    link: "/contact",
  },
];

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          <img src={logo} alt="Logo" width="50" height="50" />
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            {menuItems.map((item, index) => (
              <li className="nav-item" key={index}>
                {item.subMenu ? (
                  <div className="nav-item dropdown">
                    <a
                      className="nav-link dropdown-toggle"
                      href="#"
                      id={`dropdown-${index}`}
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      {item.label}
                    </a>
                    <ul className="dropdown-menu" aria-labelledby={`dropdown-${index}`}>
                      {item.subMenu.map((subItem, subIndex) => (
                        <li key={subIndex}>
                          <a className="dropdown-item" href={subItem.link}>{subItem.label}</a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <a className="nav-link" href={item.link}>{item.label}</a>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};
//CreatedAndDevelopedByWassimKhazri
//https://www.linkedin.com/in/wassim-khazri-ab923a14b/ 
export default Navbar;
