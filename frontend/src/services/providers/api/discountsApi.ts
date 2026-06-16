import type { ApiResponse } from "@/types/ApiResponseType";
import type { SpecialDiscountCardType } from "@/types/SpecialDiscountCardType";
import axios from "axios"

export const getDiscounts = async (): Promise<ApiResponse<SpecialDiscountCardType[]>> => {
    try {
        const res = await axios.get<ApiResponse<SpecialDiscountCardType[]>>(`${import.meta.env.VITE_API}/api/discounts`);
        return res.data;
    } catch (error) {
        throw new Error("Error while fetching discounts", { cause: error })
    }

}