import React, { useState } from 'react';
import axios from 'axios';
//CreatedAndDevelopedByWassimKhazri
//https://www.linkedin.com/in/wassim-khazri-ab923a14b/
const AddMatiereForm = () => {
  // State for form data
  const [formData, setFormData] = useState({
    nom: '',
    codeIntitule: '',
    nature: null,
    niveauScol: null,
    semestre: null
  });

  // Options for radio buttons
  const niveauScolOptions = [
    { id: 1, nom: 'PREMIERE_ANNEE' },
    { id: 2, nom: 'DEUXIEME_ANNEE' },
    { id: 3, nom: 'TROISIEME_ANNEE' }
  ];

  const semestreOptions = [
    { id: 1, nom: 'SEMESTRE1' },
    { id: 2, nom: 'SEMESTRE2' }
  ];

  const natureOptions = [
    { id: 1, nom: 'FONDAMENTALE' },
    { id: 2, nom: 'DECOUVERTE' },
    { id: 3, nom: 'TRANSVERSALE' }
  ];

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle radio button changes
  const handleRadioChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value
    });
  };
//CreatedAndDevelopedByWassimKhazri
//https://www.linkedin.com/in/wassim-khazri-ab923a14b/
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:8080/api/matieres',{
        nom: formData.nom,
        codeIntitule: formData.codeIntitule,
        nature: formData.nature,
        niveauScol: formData.niveauScol,
        semestre: formData.semestre
      },
      {
        headers: { 
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    );
      
      console.log('Subject added successfully:', response.data);
      alert('Matière ajoutée avec succès!');
      
      // Reset form
      setFormData({
        nom: '',
        codeIntitule: '',
        nature: null,
        niveauScol: null,
        semestre: null
      });
      
    } catch (error) {
      console.error('Error adding subject:', error);
      alert('Erreur lors de l\'ajout de la matière');
    }
  };

  return (
    <div className="container mt-4">
      <h2>Ajouter une nouvelle matière</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Nom de la matière:</label>
          <input
            type="text"
            className="form-control"
            name="nom"
            value={formData.nom}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Code Intitulé:</label>
          <input
            type="text"
            className="form-control"
            name="codeIntitule"
            value={formData.codeIntitule}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Nature:</label>
          <div className="d-flex gap-3">
            {natureOptions.map((option) => (
              <div key={option.id} className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="nature"
                  id={`nature-${option.id}`}
                  checked={formData.nature?.id === option.id}
                  onChange={() => handleRadioChange('nature', option)}
                />
                <label className="form-check-label" htmlFor={`nature-${option.id}`}>
                  {option.nom}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label">Niveau Scolaire:</label>
          <div className="d-flex gap-3">
            {niveauScolOptions.map((option) => (
              <div key={option.id} className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="niveauScol"
                  id={`niveauScol-${option.id}`}
                  checked={formData.niveauScol?.id === option.id}
                  onChange={() => handleRadioChange('niveauScol', option)}
                />
                <label className="form-check-label" htmlFor={`niveauScol-${option.id}`}>
                  {option.nom}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label">Semestre:</label>
          <div className="d-flex gap-3">
            {semestreOptions.map((option) => (
              <div key={option.id} className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="semestre"
                  id={`semestre-${option.id}`}
                  checked={formData.semestre?.id === option.id}
                  onChange={() => handleRadioChange('semestre', option)}
                />
                <label className="form-check-label" htmlFor={`semestre-${option.id}`}>
                  {option.nom}
                </label>
              </div>
            ))}
          </div>
        </div>

        <button type="submit" className="btn btn-primary">
          Ajouter la matière
        </button>
      </form>
    </div>
  );
};

export default AddMatiereForm;

//CreatedAndDevelopedByWassimKhazri
//https://www.linkedin.com/in/wassim-khazri-ab923a14b/