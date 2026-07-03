import { describe, it, expect, vi, beforeEach } from "vitest";
import { login, logout, register, refresh, getMe, updateMe, deleteMe } from "../src/services/providers/api/authApi";

vi.mock("@/services/apiClient", () => ({
    apiClient: {
        post: vi.fn(),
        get: vi.fn(),
        put: vi.fn(),
        delete: vi.fn(),
    },
}));

vi.mock("@/services/authToken", () => ({
    authToken: {
        set: vi.fn(),
    },
}));

import { apiClient } from "../src/services/apiClient";
import { authToken } from "../src/services/authToken";

const mockUser = {
    id: "1",
    username: "john",
    email: "john@test.com",
    createdAt: "2024-01-01",
    totalSpent: 100,
};

const mockAuthResponse = {
    success: true,
    data: {
        user: mockUser,
        accessToken: "fake-token",
    },
};

beforeEach(() => {
    vi.clearAllMocks();
});

describe("auth service", () => {
    it("login sets token and returns user", async () => {
        (apiClient.post as any).mockResolvedValue({ data: mockAuthResponse });

        const result = await login({ email: "test@test.com", password: "1234" });

        expect(apiClient.post).toHaveBeenCalledWith("/api/auth/login", {
            email: "test@test.com",
            password: "1234",
        });

        expect(authToken.set).toHaveBeenCalledWith("fake-token");
        expect(result).toEqual(mockUser);
    });

    it("logout clears token", async () => {
        (apiClient.post as any).mockResolvedValue({});

        await logout();

        expect(apiClient.post).toHaveBeenCalledWith("/api/auth/logout");
        expect(authToken.set).toHaveBeenCalledWith(null);
    });

    it("register sets token and returns user", async () => {
        (apiClient.post as any).mockResolvedValue({ data: mockAuthResponse });

        const payload = {
            username: "john",
            email: "john@test.com",
            password: "1234",
        };

        const result = await register(payload);

        expect(apiClient.post).toHaveBeenCalledWith("/api/auth/register", payload);
        expect(authToken.set).toHaveBeenCalledWith("fake-token");
        expect(result).toEqual(mockUser);
    });

    it("refresh sets token and returns user", async () => {
        (apiClient.post as any).mockResolvedValue({ data: mockAuthResponse });

        const result = await refresh();

        expect(apiClient.post).toHaveBeenCalledWith("/api/auth/refresh");
        expect(authToken.set).toHaveBeenCalledWith("fake-token");
        expect(result).toEqual(mockUser);
    });

    it("getMe returns user", async () => {
        (apiClient.get as any).mockResolvedValue({
            data: { success: true, data: { user: mockUser } },
        });

        const result = await getMe();

        expect(apiClient.get).toHaveBeenCalledWith("/api/auth/me");
        expect(result).toEqual(mockUser);
    });

    it("updateMe sends FormData and returns user", async () => {
        (apiClient.put as any).mockResolvedValue({ data: mockAuthResponse });

        const payload = {
            username: "updated",
            email: "updated@test.com",
            address: "Tbilisi",
        };

        const result = await updateMe(payload as any);

        expect(apiClient.put).toHaveBeenCalled();

        const [url, formData] = (apiClient.put as any).mock.calls[0];

        expect(url).toBe("/api/auth/me");
        expect(formData).toBeInstanceOf(FormData);

        expect(formData.get("username")).toBe("updated");
        expect(formData.get("email")).toBe("updated@test.com");
        expect(formData.get("address")).toBe("Tbilisi");

        expect(result).toEqual(mockUser);
    });

    it("deleteMe returns response data", async () => {
        (apiClient.delete as any).mockResolvedValue({ data: "deleted" });

        const result = await deleteMe();

        expect(apiClient.delete).toHaveBeenCalledWith("/api/auth/me");
        expect(result).toBe("deleted");
    });
});