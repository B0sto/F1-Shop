import type { ApiResponse } from "@/types/ApiResponseType";
import type { Team } from "@/types/TeamType";
import axios from "axios";

export const getTeams = async (): Promise<ApiResponse<Team[]>> => {
    try {
        const res = await axios.get<ApiResponse<Team[]>>(`${import.meta.env.VITE_API}/api/teams`);
        
        return res.data;
    } catch (error) {
        console.log(error);
        throw new Error("Error while fetching teams", { cause: error });
    }
}
