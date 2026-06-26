import { apiClient } from "@/services/apiClient";
import { authToken } from "@/services/authToken";

type AuthUser = {
    id: string;
    username: string;
    email: string;
    address?: string;
    avatar?: string;
    createdAt: string
}

type AuthResponse = {
    success: boolean
    data: {
        user: AuthUser
        accessToken: string
    }
}


export const login = async (payload: { email: string; password: string }) => {
    const res = await apiClient.post<AuthResponse>("/api/auth/login", payload)

    authToken.set(res.data.data.accessToken);

    return res.data.data.user;
}

export const logout = async () => {
    await apiClient.post("/api/auth/logout");
    authToken.set(null);
}


export const register = async (payload: {
    username: string
    email: string
    password: string
    address?: string
    avatar?: string
}) => {
    const res = await apiClient.post<AuthResponse>("/api/auth/register", payload);

    authToken.set(res.data.data.accessToken);

    return res.data.data.user;

}


export const refresh = async () => {
    const res = await apiClient.post<AuthResponse>("/api/auth/refresh");

    authToken.set(res.data.data.accessToken);

    return res.data.data.user;
}


export const getMe = async () => {
    const res = await apiClient.get<{
        success: boolean
        data: {
            user: AuthUser
        }
    }>('/api/auth/me')

    return res.data.data.user
}