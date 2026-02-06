import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api/etudiants",
});

// Intercepteur pour ajouter le token dans les en-têtes
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // Récupère le token depuis le localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Ajoute le token dans l'en-tête
    } else {
      console.error("Aucun token trouvé !");
      // Vous pouvez rediriger l'utilisateur vers la page de connexion ici si nécessaire
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export const getEtudiants = () => api.get("/");
export const getEtudiantsByNiveau = (niveauid) => api.get(`/${niveauid}`);
export const addEtudiant = (etudiant) => api.post("/", etudiant);
export const updateEtudiant = (id, etudiant) => api.put(`/${id}`, etudiant);
export const deleteEtudiant = (id) => api.post(`/delete/${id}`);
export const exportToPdf = () =>
  api.get("/export/pdf", { responseType: "blob" });
//export const getEtudiantById = (id) => api.get(`/id/${id}`);
// Récupérer un étudiant par ID
export const getEtudiantById = (id) => {
  const token = localStorage.getItem("token");
  return api.get(`/id/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

const api1 = axios.create({
  baseURL: "http://localhost:8080/api/professeurs",
});
api1.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // Récupère le token depuis le localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Ajoute le token dans l'en-tête
    } else {
      console.error("Aucun token trouvé !");
      // Vous pouvez rediriger l'utilisateur vers la page de connexion ici si nécessaire
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export const deleteEnseignant = (id) => api1.post(`/delete/${id}`);

// delete offer

const api2 = axios.create({
  baseURL: "http://localhost:8080/api/job-offers",
});
api2.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // Récupère le token depuis le localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Ajoute le token dans l'en-tête
    } else {
      console.error("Aucun token trouvé !");
      // Vous pouvez rediriger l'utilisateur vers la page de connexion ici si nécessaire
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);
export const deleteOffer = (id) => api2.delete(`/${id}`);

const absenceApi = axios.create({
  baseURL: "http://localhost:8080/api", // Note: pas de slash à la fin
});

// Intercepteur amélioré
absenceApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (!token) {
    console.error("Aucun token trouvé dans le localStorage");
    // Rediriger vers /login si nécessaire
    window.location.href = "/login";
    return Promise.reject(new Error("Authentification requise"));
  }

  config.headers = {
    ...config.headers,
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  console.debug("Configuration de la requête:", config);
  return config;
});

export const addAbsence = (data) => absenceApi.post("/absences", data); // Note: slash au début

const API_URL = axios.create({
  baseURL: "http://localhost:8080/api/absences",
});

export const getStudentAbsences = async (studentId) => {
  const response = await axios.get(`${API_URL}/student/${studentId}`);
  return response.data;
};

// delete offer

const api3 = axios.create({
  baseURL: "http://localhost:8080/api/entreprises",
});
api3.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // Récupère le token depuis le localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Ajoute le token dans l'en-tête
    } else {
      console.error("Aucun token trouvé !");
      // Vous pouvez rediriger l'utilisateur vers la page de connexion ici si nécessaire
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);
export const deleteEntreprise = (id) => api3.post(`/delete/${id}`);
// export const deleteEntreprise = (id) => api3.delete(`/${id}`);
