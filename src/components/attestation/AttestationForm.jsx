import React, { useState, useEffect } from "react";

const API = "http://localhost:8080";
const AttestationForm = () => {
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  // const [firstName, setFirstName] = useState('');
  // const [lastName, setLastName] = useState('');
  // const [email, setEmail] = useState('');
  // const [cinNumber, setCinNumber] = useState('');
  // const [matricule, setMatricule] = useState('');
  // const [niveauScolaire, setNiveauScolaire] = useState('');
  // const [groupe, setGroupe] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersResponse = await fetch(API + "/api/users/1");
        const usersData = await usersResponse.json();
        setUser(usersData);
      } catch (error) {
        //setError('Erreur lors de la récupération des données.');
        setError("");
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    //CreatedAndDevelopedByWassimKhazri
    //https://www.linkedin.com/in/wassim-khazri-ab923a14b/
    fetchData();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = user;
    fetch(API + "/api/attestation/generate/1", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "attestation.pdf");
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
      })
      .catch((error) => console.error("Erreur:", error));
  };

  return (
    <div>
      {loading}
      {error}
      <button type="submit" onClick={handleSubmit}>
        Générer PDF
      </button>
    </div>
  );
};

export default AttestationForm;
//CreatedAndDevelopedByWassimKhazri
//https://www.linkedin.com/in/wassim-khazri-ab923a14b/
