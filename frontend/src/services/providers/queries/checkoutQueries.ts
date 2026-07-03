import { queryOptions } from "@tanstack/react-query";
import { getOrderById, getOrders, getRecentOrders } from "@/services/providers/api/checkoutApi";

export const recentPurchasesQuery = queryOptions({
    queryKey: ["recentOrders", 3],
    queryFn: () => getRecentOrders(3),
});

export const ordersQuery = queryOptions({
    queryKey: ["orders"],
    queryFn: getOrders
})

export const orderByIdQuery = (orderId: string) =>
    queryOptions({
        queryKey: ["orders", orderId],
        queryFn: () => getOrderById(orderId),
        enabled: !!orderId,
    });