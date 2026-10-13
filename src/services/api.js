import axios from "axios";

const API = axios.create({
    baseURL: "https://resqhub-backend-production.up.railway.app/api"
});

export default API;
