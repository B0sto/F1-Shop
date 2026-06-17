import type { ApiResponse } from "@/types/ApiResponseType";
import type { VintageCardType } from "@/types/VintageCardType";
import axios from "axios";

export const getVintages = async (): Promise<ApiResponse<VintageCardType[]>> => {
    try {
        const res = await axios.get<ApiResponse<VintageCardType[]>>(`${import.meta.env.VITE_API}/api/vintages`);
        
        return res.data;
    } catch (error) {
        throw new Error("Error while fetching vintages", { cause: error });
    }
}
