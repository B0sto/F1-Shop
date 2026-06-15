import type { ApiResponse } from "@/types/ApiResponseType";
import type { DriverCollectionType } from "@/types/DriverCollectionType";
import axios from "axios"

export const getCollections = async (): Promise<ApiResponse<DriverCollectionType>> => {
    try {
        const res = await axios.get<ApiResponse<DriverCollectionType>>(`${import.meta.env.VITE_API}/api/collections`);
        return res.data;
    } catch (error) {
        throw new Error("Error while fetching collections", { cause: error })
    }

}