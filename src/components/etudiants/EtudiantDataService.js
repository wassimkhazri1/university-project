import http from "../http-common"; // Make sure this points to your Axios instance
const get = (id) => {
  return http.get(`/etudiants/${id}`);
};
//CreatedAndDevelopedByWassimKhazri
//https://www.linkedin.com/in/wassim-khazri-ab923a14b/ 
const update = (id, data) => {
  return http.put(`/etudiants/${id}`, data);
};

const EtudiantDataService = {
  get,
  update,
};

export default EtudiantDataService;
//CreatedAndDevelopedByWassimKhazri
//https://www.linkedin.com/in/wassim-khazri-ab923a14b/ 