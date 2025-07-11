import React from 'react';
import './AuthPage.css'; // We'll create this CSS file next

const AuthButtons = () => {
  return (
    <div className="auth-buttons-container">
      <div className="main-buttons">
        <button className="auth-button">SIGN UP</button>
        <button className="auth-button">SIGN IN</button>
      </div>
{/*      
CreatedAndDevelopedByWassimKhazri
https://www.linkedin.com/in/wassim-khazri-ab923a14b/
*/}
      <div className="secondary-links">
        <a href="#" className="link-button">INFORMATION</a>
        <a href="https://videowiew.biz/statist" className="link-button">STATISTICS</a>
        <a href="#" className="link-button">NEWS</a>
        <a href="#" className="link-button">RULES</a>
        <a href="#" className="link-button">SUPPORT</a>
      </div>
      
      <div className="activation-note">
        <p>Active: awharememe, pour activer Windows</p>
      </div>
    </div>
  );
};

export default AuthButtons;
//CreatedAndDevelopedByWassimKhazri
//https://www.linkedin.com/in/wassim-khazri-ab923a14b/