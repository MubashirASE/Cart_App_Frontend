import axios from "axios";

const API_URL = axios.create({
  baseURL: "http://localhost:3001",
});

export default API_URL; 