import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:8080/api", // Your API base URL
  headers: {
    "Content-Type": "application/json",
  },
});
//CreatedAndDevelopedByWassimKhazri
//https://www.linkedin.com/in/wassim-khazri-ab923a14b/ 