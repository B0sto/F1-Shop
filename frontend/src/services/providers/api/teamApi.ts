import { apiClient } from "@/services/apiClient";
import type { ApiResponse } from "@/types/ApiResponseType";
import type { Team } from "@/types/TeamType";

export const getTeams = async (): Promise<ApiResponse<Team[]>> => {
    try {
        const res = await apiClient.get<ApiResponse<Team[]>>("/api/teams");
        
        return res.data;
    } catch (error) {
        throw new Error("Error while fetching teams", { cause: error });
    }
}
