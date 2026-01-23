// src/services/candidatureService.js

import axios from "axios";

const API_URL = "http://localhost:8080/api/candidatures";

export const getCandidatures = () => {
  return axios.get(API_URL);
};

export const createCandidature = (cvFile, lettreFile) => {
  const formData = new FormData();
  formData.append("cv", cvFile);
  formData.append("lettreMotivation", lettreFile);

  return axios.post(API_URL, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const downloadCv = (id) => {
  return axios.get(`${API_URL}/${id}/download/cv`, {
    responseType: "blob",
  });
};

export const downloadLettre = (id) => {
  return axios.get(`${API_URL}/${id}/download/lettre`, {
    responseType: "blob",
  });
};

export const deleteCandidature = (id) => {
  return axios.delete(`${API_URL}/${id}`);
};
//CreatedAndDevelopedByWassimKhazri
//https://www.linkedin.com/in/wassim-khazri-ab923a14b/
