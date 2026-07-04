import { apiClient } from "@/services/apiClient";
import type { ApiResponse } from "@/types/ApiResponseType";
import type { CartItem } from "@/types/CartItemType";
import type { Cart } from "@/types/CartType";
import type { CheckoutType } from "@/types/CheckoutType";
import type { Order } from "@/types/OrderType";

export type OrderItem = Pick<
  CartItem,
  "productId" | "source" | "name" | "image" | "size" | "quantity" | "unitPrice" | "totalPrice"
>;

export type OrderCustomer = Omit<CheckoutType, "cardNumber">;

export type OrderPayment = {
  cardLast4: string;
  expirationDate: string;
  
};

export type CheckoutResult = {
  order: Order;
  cart: Cart;
};

const ORDERS_URL = "/orders";

export const checkout = async (payload: CheckoutType): Promise<CheckoutResult> => {
  const res = await apiClient.post<ApiResponse<CheckoutResult>>(`${ORDERS_URL}/checkout`, payload);

  return res.data.data;
};

export const getOrders = async (): Promise<Order[]> => {
  const res = await apiClient.get<ApiResponse<Order[]>>(ORDERS_URL);

  return res.data.data;
};

export const getRecentOrders = async (limit?: number): Promise<Order[]> => {
  const res = await apiClient.get<ApiResponse<Order[]>>(`${ORDERS_URL}/recent`, {
    params: limit ? { limit } : undefined,
  });

  return res.data.data;
};

export const getOrderById = async (orderId: string): Promise<Order> => {
  const res = await apiClient.get<ApiResponse<Order>>(`${ORDERS_URL}/${orderId}`);

  return res.data.data;
};
