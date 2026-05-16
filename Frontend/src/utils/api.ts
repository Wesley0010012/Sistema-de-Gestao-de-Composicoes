import axios from "axios";

export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "/api";

export const api = axios.create({
  baseURL: API_BASE_URL,
});

api.interceptors.request.use((config) => {
  const rawToken = localStorage.getItem("composers_admin_token");
  if (!rawToken) return config;

  const token = JSON.parse(rawToken) as { token: string; type: string };
  config.headers.Authorization = `${token.type} ${token.token}`;

  return config;
});
