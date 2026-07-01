import { apiClient } from "@/services/apiClient";

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
    const res = await apiClient.get("/api/collections", {
        params: {
            page,
            limit,
            search
        }
    })

    return res.data
}
