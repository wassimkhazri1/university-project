import "./Footer.css";
//CreatedAndDevelopedByWassimKhazri
//https://www.linkedin.com/in/wassim-khazri-ab923a14b/
const Footer = () => {
  return (
    <div className="bg-light text-center">
      {/*Grid container*/}
      <div className="container text-center p-4 pb-0">
        {/*Section: Social media*/}
        <section className="mb-4">
          {/*Facebook*/}
          <a
            className="btn btn-primary btn-circle btn-floating m-1"
            style={{ backgroundColor: " #3b5998" }}
            role="button"
            target="_bland"
            href="https://www.facebook.com/wassim.khazri.106/"
          >
            <i className="fab fa-facebook-f"></i>
          </a>
          {/*Linkedin*/}
          <a
            className="btn btn-primary btn-circle btn-floating m-1"
            style={{ backgroundColor: " #0082ca" }}
            role="button"
            target="_bland"
            href="https://www.linkedin.com/in/wassim-khazri-ab923a14b/"
          >
            <i className="fab fa-linkedin-in"></i>
          </a>
          {/*Github*/}
          <a
            className="btn btn-primary btn-circle btn-floating m-1"
            style={{ backgroundColor: " #333333" }}
            role="button"
            target="_bland"
            href="https://github.com/wassimkhazri1"
          >
            <i className="fab fa-github"></i>
          </a>
        </section>
        {/*Section: Social media*/}
        {/*Copyright*/}
        <div className="text-center p-3">
          © 2026 Copyright:
          <a
            target="_bland"
            href="https://www.linkedin.com/in/wassim-khazri-ab923a14b/"
          >
            WASSIM KHAZRI
          </a>
        </div>
      </div>
      {/*Grid container*/}
    </div>
  );
};

export default Footer;
//CreatedAndDevelopedByWassimKhazri
//https://www.linkedin.com/in/wassim-khazri-ab923a14b/
