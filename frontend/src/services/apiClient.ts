import axios from "axios";
import { authToken } from "./authToken";

export const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API,
    withCredentials: true
})

apiClient.interceptors.request.use((config) => {
    const token = authToken.get();

    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }

    return config;
})