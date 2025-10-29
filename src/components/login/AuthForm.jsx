import React, { useState, useEffect } from "react";
import "./AuthForm.css";
import { useNavigate } from "react-router-dom"; // Pour la redirection
import logo from "../../images/ISET/sigles/sigle.png";
const AuthForm = () => {
  const [email, setEmail] = useState(""); // État pour le prénom
  const [password, setPassword] = useState(""); // État pour le mot de passe
  const [error, setError] = useState(""); // État pour les erreurs
  const [showPassword, setShowPassword] = useState(false); // État pour afficher/masquer le mot de passe
  const navigate = useNavigate(); // Hook pour la navigation

  const [isRightPanelActive, setIsRightPanelActive] = useState(true);
  const [webAuth, setWebAuth] = useState(null);
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    loginEmail: "",
    loginPassword: "",
  });
  const [errors, setErrors] = useState({
    login: "",
    signup: "",
  });

  useEffect(() => {
    // Load Auth0 script dynamically
    const script = document.createElement("script");
    script.src = "https://cdn.auth0.com/js/auth0/9.18/auth0.min.js";
    script.async = true;
    script.onload = () => initializeAuth0();
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const initializeAuth0 = () => {
    const config = JSON.parse(
      decodeURIComponent(
        escape(
          window.atob(
            "eyJhc3NldHNVcmwiOiIiLCJhdXRoMERvbWFpbiI6ImNhbmRpZGF0ZXMtcHJvZC5ldS5hdXRoMC5jb20iLCJhdXRoMFRlbmFudCI6ImNhbmRpZGF0ZXMtcHJvZCIsImNsaWVudENvbmZpZ3VyYXRpb25CYXNlVXJsIjoiaHR0cHM6Ly9jYW5kaWRhdGVzLXByb2QuZXUuYXV0aDAuY29tLyIsImNhbGxiYWNrT25Mb2NhdGlvbkhhc2giOmZhbHNlLCJjYWxsYmFja1VSTCI6Imh0dHBzOi8vaGlyZS5pbnRlcnZpZXdlci5haS9jYWxsYmFjayIsImNkbiI6Imh0dHBzOi8vY2RuLmF1dGgwLmNvbS8iLCJjbGllbnRJRCI6InNUaHJvY0pacU9jcTYyTHpsMjBoSFgxV01Ld0w2WE82IiwiZGljdCI6eyJzaWduaW4iOnsidGl0bGUiOiJJbnRlcnZpZXdlci5BSSBGb3IgQ2FuZGlkYXRlcyJ9fSwiZXh0cmFQYXJhbXMiOnsicHJvdG9jb2wiOiJvYXV0aDIiLCJyZXNwb25zZV90eXBlIjoidG9rZW4gaWRfdG9rZW4iLCJzY29wZSI6Im9wZW5pZCBlbWFpbCBwcm9maWxlIHJlYWQ6Y3VycmVudF91c2VyIiwiYXVkaWVuY2UiOiJodHRwczovL2NhbmRpZGF0ZXMtcHJvZC5ldS5hdXRoMC5jb20vYXBpL3YyLyIsIm5vbmNlIjoibzhwb3k3b1pWbm1UM3QzUEhBSGlTQjFRTlF1OGg4Y2kiLCJhdXRoMENsaWVudCI6ImV5SnVZVzFsSWpvaVlYVjBhREF1YW5NaUxDSjJaWEp6YVc5dUlqb2lPUzR4Tmk0eUluMD0iLCJfY3NyZiI6IkJxOVM2bHVOLW5qVUxDaVUyZ2RGYTh4bjVldTN1azVfNmg2ZyIsIl9pbnRzdGF0ZSI6ImRlcHJlY2F0ZWQiLCJzdGF0ZSI6ImhLRm8yU0JDU25WMk1WOWhlRzFpVW5ScVVuZDRWWEpsWVhkQ2MxUTBZM2hMUTNwclE2RnVwV3h2WjJsdW8zUnBaTmtnWVRSTFJrdEZWbVJrWlVjeGFsQlZiVVJIYVZCYVpHcEZabEZCVkRWdVowT2pZMmxrMlNCelZHaHliMk5LV25GUFkzRTJNa3g2YkRJd2FFaFlNVmROUzNkTU5saFBOZyJ9LCJpbnRlcm5hbE9wdGlvbnMiOnsicHJvdG9jb2wiOiJvYXV0aDIiLCJyZXNwb25zZV90eXBlIjoidG9rZW4gaWRfdG9rZW4iLCJzY29wZSI6Im9wZW5pZCBlbWFpbCBwcm9maWxlIHJlYWQ6Y3VycmVudF91c2VyIiwiYXVkaWVuY2UiOiJodHRwczovL2NhbmRpZGF0ZXMtcHJvZC5ldS5hdXRoMC5jb20vYXBpL3YyLyIsIm5vbmNlIjoibzhwb3k3b1pWbm1UM3QzUEhBSGlTQjFRTlF1OGg4Y2kiLCJhdXRoMENsaWVudCI6ImV5SnVZVzFsSWpvaVlYVjBhREF1YW5NaUxDSjJaWEp6YVc5dUlqb2lPUzR4Tmk0eUluMD0iLCJfY3NyZiI6IkJxOVM2bHVOLW5qVUxDaVUyZ2RGYTh4bjVldTN1azVfNmg2ZyIsIl9pbnRzdGF0ZSI6ImRlcHJlY2F0ZWQiLCJzdGF0ZSI6ImhLRm8yU0JDU25WMk1WOWhlRzFpVW5ScVVuZDRWWEpsWVhkQ2MxUTBZM2hMUTNwclE2RnVwV3h2WjJsdW8zUnBaTmtnWVRSTFJrdEZWbVJrWlVjeGFsQlZiVVJIYVZCYVpHcEZabEZCVkRWdVowT2pZMmxrMlNCelZHaHliMk5LV25GUFkzRTJNa3g2YkRJd2FFaFlNVmROUzNkTU5saFBOZyJ9LCJ3aWRnZXRVcmwiOiJodHRwczovL2Nkbi5hdXRoMC5jb20vdzIvYXV0aDAtd2lkZ2V0LTUuMi5taW4uanMiLCJpc1RoaXJkUGFydHlDbGllbnQiOmZhbHNlLCJhdXRob3JpemF0aW9uU2VydmVyIjp7InVybCI6Imh0dHBzOi8vY2FuZGlkYXRlcy1wcm9kLmV1LmF1dGgwLmNvbSIsImlzc3VlciI6Imh0dHBzOi8vY2FuZGlkYXRlcy1wcm9kLmV1LmF1dGgwLmNvbS8ifSwiY29sb3JzIjp7InBhZ2VfYmFja2dyb3VuZCI6IiMwMDAwMDAiLCJwcmltYXJ5IjoiIzAwNTlkNiJ9fQ=="
          )
        )
      )
    );

    const leeway = config.internalOptions.leeway;
    if (leeway) {
      const convertedLeeway = parseInt(leeway);
      if (!isNaN(convertedLeeway)) {
        config.internalOptions.leeway = convertedLeeway;
      }
    }

    const params = Object.assign(
      {
        overrides: {
          __tenant: config.auth0Tenant,
          __token_issuer: config.authorizationServer.issuer,
        },
        domain: config.auth0Domain,
        clientID: config.clientID,
        redirectUri: config.callbackURL,
        responseType: "code",
      },
      config.internalOptions
    );

    const auth0Instance = new window.auth0.WebAuth(params);
    setWebAuth(auth0Instance);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault(); // Empêche le rechargement de la page

    try {
      // Envoi de la requête POST à l'API
      const response = await fetch("http://localhost:8080/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Échec de la connexion");
      }

      const data = await response.json(); // Récupération des données de la réponse

      // Stockage du token dans le localStorage
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data)); // Stocke les infos utilisateur

      // Redirection en fonction du rôle
      if (data.roles.includes("ROLE_STUDENT")) {
        navigate("/iset/etudiant");
      } else if (data.roles.includes("ROLE_PROF")) {
        navigate("/iset/prof");
      } else if (data.roles.includes("ROLE_ADMIN")) {
        navigate("/iset/admin");
      } else if (data.roles.includes("ROLE_ENTREPRISE")) {
        navigate("/iset/entreprise");
      } else {
        setError("Rôle non reconnu");
      }
    } catch (err) {
      setError("Identifiants incorrects ou erreur de connexion");
      console.error(err);
    }
  };
  // const handleLogin = (e) => {
  //   e.preventDefault();
  //   const { loginEmail, loginPassword } = formData;

  //   if (!webAuth) {
  //     console.error('Auth0 not initialized');
  //     return;
  //   }

  //   webAuth.login({
  //     realm: 'Username-Password-Authentication',
  //     username: loginEmail,
  //     password: loginPassword,
  //   }, function (err) {
  //     if (err) {
  //       const { code } = err;
  //       if (code === "invalid_user_password") {
  //         const customError = {
  //           "description": "Invalid login credentials.\n If you don't have an account, Click on Sign up."
  //         };
  //         displayError(customError, 'login');
  //       } else {
  //         displayError(err, 'login');
  //       }
  //     }
  //   });
  // };

  const handleSignup = (e) => {
    e.preventDefault();
    const { firstname, lastname, email, password } = formData;

    if (!webAuth) {
      console.error("Auth0 not initialized");
      return;
    }

    sessionStorage.setItem("firstname", firstname);
    sessionStorage.setItem("lastname", lastname);

    webAuth.redirect.signupAndLogin(
      {
        connection: "Username-Password-Authentication",
        email: email,
        password: password,
        user_metadata: {
          firstname: firstname,
          lastname: lastname,
        },
      },
      function (err) {
        if (err) displayError(err, "signup");
      }
    );
  };

  const loginWithGoogle = () => {
    if (!webAuth) {
      console.error("Auth0 not initialized");
      return;
    }

    webAuth.authorize(
      {
        connection: "google-oauth2",
      },
      function (err) {
        if (err) displayError(err, "login");
      }
    );
  };

  const signUpWithGoogle = () => {
    if (!webAuth) {
      console.error("Auth0 not initialized");
      return;
    }

    webAuth.authorize(
      {
        connection: "google-oauth2",
      },
      function (err) {
        if (err) displayError(err, "signup");
      }
    );
  };

  const resetPassword = (e) => {
    e.preventDefault();
    const { loginEmail } = formData;

    if (!webAuth) {
      console.error("Auth0 not initialized");
      return;
    }

    if (!loginEmail) {
      alert("Please enter your email.");
      return;
    }

    webAuth.changePassword(
      {
        connection: "Username-Password-Authentication",
        email: loginEmail,
      },
      function (err, resp) {
        if (err) {
          console.log(err.message);
          alert(err.message);
        } else {
          console.log(resp);
          alert(resp);
        }
      }
    );
  };

  const displayError = (err, type) => {
    setErrors((prev) => ({
      ...prev,
      [type]: err.policy || err.description,
    }));
  };

  const togglePanel = () => {
    setIsRightPanelActive(!isRightPanelActive);
  };

  const toggleMobileView = (showSignUp) => {
    setIsRightPanelActive(!showSignUp);
  };

  return (
    <div className="auth-container">
      <div className="iaiLogo">
        {/* <img src="https://interviewer-ai-assets.s3.ap-southeast-1.amazonaws.com/Dark%403x.png" alt="Interviewer.AI Logo" /> */}
        <img src={logo} height="50" alt="ISET Logo" />
      </div>

      <div
        className={`container ${
          isRightPanelActive ? "right-panel-active" : ""
        }`}
        id="container"
      >
        {/* Sign Up Form */}
        <div
          className={`form-container sign-in-container login ${
            !isRightPanelActive ? "move-to-top-mobile" : ""
          }`}
        >
          <form onSubmit={handleSignup}>
            <h1>Create Account</h1>
            <div className="social-container">
              <button
                type="button"
                className="social"
                onClick={signUpWithGoogle}
              >
                <svg
                  width="20"
                  height="25"
                  viewBox="0 0 30 30"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_7586_27075)">
                    <path
                      d="M29.9995 15.3322C30.0177 14.301 29.909 13.2714 29.6761 12.2656H15.3057V17.8322H23.7409C23.5811 18.8082 23.2216 19.7425 22.6838 20.5788C22.1461 21.4152 21.4413 22.1363 20.6118 22.6988L20.5824 22.8852L25.1263 26.3348L25.4409 26.3656C28.3319 23.7489 29.999 19.8988 29.999 15.3322"
                      fill="#4285F4"
                    ></path>
                    <path
                      d="M15.3053 30.0002C19.4378 30.0002 22.9072 28.6668 25.4415 26.3668L20.6114 22.6999C19.319 23.5835 17.5843 24.2002 15.3053 24.2002C13.3698 24.1891 11.4869 23.581 9.92394 22.4621C8.36095 21.3432 7.19717 19.7704 6.59772 17.9668L6.41834 17.9818L1.69359 21.5651L1.63184 21.7334C2.90433 24.2187 4.85718 26.3081 7.27203 27.7681C9.68687 29.228 12.4685 30.0009 15.3059 30.0002"
                      fill="#34A853"
                    ></path>
                    <path
                      d="M6.59849 17.9663C6.2637 17.0115 6.09094 16.0093 6.08711 14.9997C6.09327 13.9917 6.25965 12.9909 6.58026 12.0331L6.57173 11.8343L1.78904 8.19336L1.6326 8.26627C0.559144 10.3549 0 12.661 0 14.9996C0 17.3382 0.559144 19.6442 1.6326 21.7328L6.59849 17.9663Z"
                      fill="#FBBC05"
                    ></path>
                    <path
                      d="M15.3059 5.80104C17.4991 5.76767 19.6203 6.56814 21.2243 8.03447L25.5441 3.90104C22.7735 1.35387 19.1045 -0.0437296 15.3059 0.00104346C12.4685 0.000381881 9.68692 0.773197 7.27208 2.23308C4.85724 3.69295 2.90437 5.78234 1.63184 8.26761L6.58126 12.0345C7.18661 10.2312 8.35424 8.65956 9.91954 7.54122C11.4848 6.42288 13.3688 5.81421 15.3059 5.80104Z"
                      fill="#EB4335"
                    ></path>
                  </g>
                  <defs>
                    <clipPath id="clip0_7586_27075">
                      <rect width="30" height="30" fill="white"></rect>
                    </clipPath>
                  </defs>
                </svg>
              </button>
            </div>
            <span>or use your email for registration</span>

            <div className="two-col-flex">
              <input
                type="text"
                id="firstname"
                name="firstname"
                placeholder="Your first name"
                value={formData.firstname}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                id="lastname"
                name="lastname"
                placeholder="Your last name"
                value={formData.lastname}
                onChange={handleChange}
                required
              />
            </div>

            <input
              type="email"
              id="signup-email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              id="signup-password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            {errors.signup && <div className="error">{errors.signup}</div>}
            <button type="submit" className="loginOtpButton">
              Sign Up
            </button>

            <div className="mobile-elements">
              <p>OR</p>
              <button
                type="button"
                className="loginOtpButton"
                onClick={() => toggleMobileView(false)}
              >
                Login
              </button>
            </div>

            <div className="termsSection">
              <label htmlFor="termsAndConditions">
                By signing up you agree to our
                <a
                  href=""
                  target="_blank"
                  rel="noopener noreferrer"
                  className="termLink"
                >
                  Terms of service
                </a>
                and
                <a
                  href=""
                  target="_blank"
                  rel="noopener noreferrer"
                  className="termLink"
                >
                  Privacy policy.
                </a>
              </label>
            </div>
          </form>
        </div>

        {/* Login Form */}
        <div
          className={`form-container sign-up-container sign-up ${
            isRightPanelActive ? "move-to-top-mobile" : ""
          }`}
        >
          <form onSubmit={handleLogin}>
            <h1>Sign in with</h1>
            <div className="social-container">
              <button
                type="button"
                className="googleButton"
                onClick={loginWithGoogle}
              >
                <div className="googleLogoContainer">
                  <svg
                    width="20"
                    height="25"
                    viewBox="0 0 30 30"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_7586_27075)">
                      <path
                        d="M29.9995 15.3322C30.0177 14.301 29.909 13.2714 29.6761 12.2656H15.3057V17.8322H23.7409C23.5811 18.8082 23.2216 19.7425 22.6838 20.5788C22.1461 21.4152 21.4413 22.1363 20.6118 22.6988L20.5824 22.8852L25.1263 26.3348L25.4409 26.3656C28.3319 23.7489 29.999 19.8988 29.999 15.3322"
                        fill="#4285F4"
                      ></path>
                      <path
                        d="M15.3053 30.0002C19.4378 30.0002 22.9072 28.6668 25.4415 26.3668L20.6114 22.6999C19.319 23.5835 17.5843 24.2002 15.3053 24.2002C13.3698 24.1891 11.4869 23.581 9.92394 22.4621C8.36095 21.3432 7.19717 19.7704 6.59772 17.9668L6.41834 17.9818L1.69359 21.5651L1.63184 21.7334C2.90433 24.2187 4.85718 26.3081 7.27203 27.7681C9.68687 29.228 12.4685 30.0009 15.3059 30.0002"
                        fill="#34A853"
                      ></path>
                      <path
                        d="M6.59849 17.9663C6.2637 17.0115 6.09094 16.0093 6.08711 14.9997C6.09327 13.9917 6.25965 12.9909 6.58026 12.0331L6.57173 11.8343L1.78904 8.19336L1.6326 8.26627C0.559144 10.3549 0 12.661 0 14.9996C0 17.3382 0.559144 19.6442 1.6326 21.7328L6.59849 17.9663Z"
                        fill="#FBBC05"
                      ></path>
                      <path
                        d="M15.3059 5.80104C17.4991 5.76767 19.6203 6.56814 21.2243 8.03447L25.5441 3.90104C22.7735 1.35387 19.1045 -0.0437296 15.3059 0.00104346C12.4685 0.000381881 9.68692 0.773197 7.27208 2.23308C4.85724 3.69295 2.90437 5.78234 1.63184 8.26761L6.58126 12.0345C7.18661 10.2312 8.35424 8.65956 9.91954 7.54122C11.4848 6.42288 13.3688 5.81421 15.3059 5.80104Z"
                        fill="#EB4335"
                      ></path>
                    </g>
                    <defs>
                      <clipPath id="clip0_7586_27075">
                        <rect width="30" height="30" fill="white"></rect>
                      </clipPath>
                    </defs>
                  </svg>
                </div>
              </button>
            </div>
            <span>Sign in to your existing account</span>
            <input
              type="email"
              id="login-email"
              name="loginEmail"
              placeholder="Enter your email"
              // value={formData.loginEmail}
              // onChange={handleChange}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              id="login-password"
              name="loginPassword"
              placeholder="Enter your password"
              // value={formData.loginPassword}
              // onChange={handleChange}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {errors.login && <div className="error">{errors.login}</div>}
            <span className="forgot-password">
              <button
                title="Forgot Password"
                id="link-reset"
                onClick={resetPassword}
              >
                Forgot Password?
              </button>
            </span>
            <button type="submit" className="loginOtpButton">
              Log In
            </button>

            <div className="mobile-elements">
              <p>OR</p>
              <button
                type="button"
                className="loginOtpButton"
                onClick={() => toggleMobileView(true)}
              >
                Sign up
              </button>
            </div>

            <div className="footer">
              <p>
                Copyright © {new Date().getFullYear()} ISET Jendouba | All
                rights reserved.
              </p>
            </div>
          </form>
        </div>

        {/* Overlay */}
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              {/* <h1>Hello!</h1>
              <p>
                Know your AI Video interview scores.<br />
                Ace every virtual interview.
              </p> */}
              <h1>Welcome to BudgetKeeper!</h1>
              <p>
                Take control of your finances.
                <br />
                Track expenses, set budgets, and save smarter.
              </p>
              <button className="ghost" id="signIn" onClick={togglePanel}>
                Sign Up &gt;
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1>Welcome Back!</h1>
              <p>Sign in to your existing account</p>
              <button className="ghost" id="signUp" onClick={togglePanel}>
                Sign In &gt;
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
