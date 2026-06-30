import { queryOptions } from "@tanstack/react-query";

import { getMyCart } from "@/services/providers/api/cartApi";

export const cartQuery = queryOptions({
    queryKey: ["cart"],
    queryFn: getMyCart,
})
