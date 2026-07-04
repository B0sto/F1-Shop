import { apiClient } from "@/services/apiClient";
import type { ApiResponse } from "@/types/ApiResponseType";
import type { VintageCardType } from "@/types/VintageCardType";

export const getVintages = async (): Promise<ApiResponse<VintageCardType[]>> => {
    try {
        const res = await apiClient.get<ApiResponse<VintageCardType[]>>("/vintages");
        
        return res.data;
    } catch (error) {
        throw new Error("Error while fetching vintages", { cause: error });
    }
}
