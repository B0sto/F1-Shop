import { queryOptions } from "@tanstack/react-query";
import { getRecentOrders } from "@/services/providers/api/checkoutApi";

export const recentPurchasesQuery = queryOptions({
    queryKey: ["recentOrders", 3],
    queryFn: () => getRecentOrders(3),
});