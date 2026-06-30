import { apiClient } from "@/services/apiClient";
import type { ApiResponse } from "@/types/ApiResponseType";
import type { CartItemSource } from "@/types/CartItemSourceType";
import type { Cart } from "@/types/CartType";



export type AddCartItemPayload = {
  productId: string;
  source: CartItemSource;
  name: string;
  image: string;
  unitPrice: number;
  quantity?: number;
  size?: string;
  sizes?: string[];
  selected?: boolean;
};

export type UpdateCartItemPayload = {
  quantity?: number;
  size?: string;
  selected?: boolean;
};

const CART_URL = "/api/cart";

export const getMyCart = async (): Promise<Cart> => {
  const res = await apiClient.get<ApiResponse<Cart>>(CART_URL);

  return res.data.data;
};

export const addCartItem = async (payload: AddCartItemPayload): Promise<Cart> => {
  const res = await apiClient.post<ApiResponse<Cart>>(`${CART_URL}/items`, payload);

  return res.data.data;
};

export const updateCartItem = async (
  itemId: string,
  payload: UpdateCartItemPayload,
): Promise<Cart> => {
  const res = await apiClient.patch<ApiResponse<Cart>>(`${CART_URL}/items/${itemId}`, payload);

  return res.data.data;
};

export const deleteCartItem = async (itemId: string): Promise<Cart> => {
  const res = await apiClient.delete<ApiResponse<Cart>>(`${CART_URL}/items/${itemId}`);

  return res.data.data;
};

export const clearCart = async (): Promise<Cart> => {
  const res = await apiClient.delete<ApiResponse<Cart>>(CART_URL);

  return res.data.data;
};
