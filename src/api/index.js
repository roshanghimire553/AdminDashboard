import axios from "axios";
import { getAccessToken } from "./tokenAcess";
import { getauthorizedRole } from "./tokenAcess";

const api = axios.create({
  baseURL: "http://localhost:5000/api/",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: getAccessToken(),
    authorizedRole: getauthorizedRole(),
  },
});

export default api;
