import axios from "axios";

const api = axios.create({
  baseURL: "https://localhost:8000/api",
  headers: {
    "Content-Type": "aplication/json",
  },
});

api.interceptors.request.use(async (config) => {
  const token = await sessionStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
