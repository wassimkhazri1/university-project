import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css"; // Pour les icônes FontAwesome

import App from "./App";
//CreatedAndDevelopedByWassimKhazri
//https://www.linkedin.com/in/wassim-khazri-ab923a14b/

// Wrap the App component with BrowserRouter
 const root = ReactDOM.createRoot(document.getElementById('root'));
 root.render(
//ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

//CreatedAndDevelopedByWassimKhazri
//https://www.linkedin.com/in/wassim-khazri-ab923a14b/