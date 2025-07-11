import React from 'react';

const TermsModal = () => {
  return (
    <div className="modal fade" id="termsModal" tabIndex="-1" aria-labelledby="termsModalLabel" aria-hidden="true">
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="termsModalLabel">Terms and Conditions</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <h4>1. Acceptance of Terms</h4>
            <p>
              By accessing or using our service, you agree to be bound by these terms. 
              If you do not agree to all the terms, you may not access or use the service.
            </p>
            
            <h4>2. User Responsibilities</h4>
            <p>
              You are responsible for maintaining the confidentiality of your account information 
              and for all activities that occur under your account.
            </p>
            
            <h4>3. Privacy Policy</h4>
            <p>
              Your use of the service is also subject to our Privacy Policy, which explains how we collect, 
              use and protect your personal information.
            </p>
            
            <h4>4. Modifications to Terms</h4>
            <p>
              We reserve the right to modify these terms at any time. Your continued use of the service 
              after such modifications constitutes your acceptance of the new terms.
            </p>
            
            <h4>5. Termination</h4>
            <p>
              We may terminate or suspend your account immediately, without prior notice, 
              for any reason whatsoever, including without limitation if you breach the terms.
            </p>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-primary" data-bs-dismiss="modal">
              I Understand
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsModal;