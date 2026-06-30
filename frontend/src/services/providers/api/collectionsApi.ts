// import type { ApiResponse } from "@/types/ApiResponseType";
// import type { DriverCollectionType } from "@/types/DriverCollectionType";
import axios from "axios"

type CollectionParams = {
    page: number;
    limit: number;
    search?: string;
}

export const getCollections = async ({
    page,
    limit,
    search = "",
}: CollectionParams) => {
    const res = await axios.get(`${import.meta.env.VITE_API}/api/collections`, {
        params: {
            page,
            limit,
            search
        }
    })

    return res.data
}