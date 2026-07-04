import { apiClient } from "@/services/apiClient";
import { authToken } from "@/services/authToken";
import type { UpdateUserType } from "@/types/UpdateUserType";

type AuthUser = {
    id: string;
    username: string;
    email: string;
    address?: string;
    avatar?: string;
    createdAt: string
    totalSpent: number;
}

type AuthResponse = {
    success: boolean
    data: {
        user: AuthUser
        accessToken: string
    }
}


export const login = async (payload: { email: string; password: string }) => {
    const res = await apiClient.post<AuthResponse>("/auth/login", payload)

    authToken.set(res.data.data.accessToken);

    return res.data.data.user;
}

export const logout = async () => {
    await apiClient.post("/auth/logout");
    authToken.set(null);
}


export const register = async (payload: {
    username: string
    email: string
    password: string
    address?: string
    avatar?: string
}) => {
    const res = await apiClient.post<AuthResponse>("/auth/register", payload);

    authToken.set(res.data.data.accessToken);

    return res.data.data.user;

}


export const refresh = async () => {
    const res = await apiClient.post<AuthResponse>("/auth/refresh");

    authToken.set(res.data.data.accessToken);

    return res.data.data.user;
}


export const getMe = async () => {
    const res = await apiClient.get<{
        success: boolean
        data: {
            user: AuthUser
        }
    }>('/auth/me')

    return res.data.data.user
}


export const updateMe = async (userData: UpdateUserType) => {
    const formData = new FormData();

    if (userData.username) formData.append("username", userData.username);
    if (userData.email) formData.append("email", userData.email);
    if (userData.address) formData.append("address", userData.address);
    if (userData.avatar) formData.append("avatar", userData.avatar);

    const res = await apiClient.put<AuthResponse>('/auth/me', formData);

    return res.data.data.user;
}


export const deleteMe = async () => {
    const res = await apiClient.delete<AuthResponse>("/auth/me");

    return res.data;
}