import axios from "axios";
import { authToken } from "./authToken";

export const apiClient = axios.create({
    baseURL: import.meta.env.DEV ? import.meta.env.VITE_API : "/api",
    withCredentials: true
})

apiClient.interceptors.request.use((config) => {
    const token = authToken.get();

    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }

    return config;
})