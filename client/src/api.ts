import axios from "axios";

// all API calls go through this. in development it points to the local
// server, in production we set VITE_API_URL to the deployed server url.
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000",
});

// attach the login token (if we have one) to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = "Bearer " + token;
  }
  return config;
});

export default api;
