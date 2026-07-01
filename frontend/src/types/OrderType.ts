import type { OrderCustomer, OrderItem, OrderPayment } from "@/services/providers/api/checkoutApi";

export type Order = {
    _id: string;
    user: string;
    items: OrderItem[];
    customer: OrderCustomer;
    payment: OrderPayment;
    subtotal: number;
    shipping: number;
    total: number;
    status: "Delievered"
    createdAt: string;
    updatedAt: string;
};