import { apiClient } from "@/services/apiClient";

type CollectionParams = {
    page: number;
    limit: number;
    search?: string;
    drivers?: string[];
    minPrice?: number;
    maxPrice?: number;
}

export const getCollections = async ({
    page,
    limit,
    search = "",
    drivers,
    minPrice,
    maxPrice,
}: CollectionParams) => {
    const res = await apiClient.get("/api/collections", {
        params: {
            page,
            limit,
            search,
            drivers: drivers?.join(","),
            minPrice,
            maxPrice,
        }
    })

    return res.data
}
