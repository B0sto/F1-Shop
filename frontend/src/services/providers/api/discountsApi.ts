import { apiClient } from "@/services/apiClient";
import type { ApiResponse } from "@/types/ApiResponseType";
import type { SpecialDiscountCardType } from "@/types/SpecialDiscountCardType";

export const getDiscounts = async (): Promise<ApiResponse<SpecialDiscountCardType[]>> => {
    try {
        const res = await apiClient.get<ApiResponse<SpecialDiscountCardType[]>>("/discounts");
        return res.data;
    } catch (error) {
        throw new Error("Error while fetching discounts", { cause: error })
    }

}
