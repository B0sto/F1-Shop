import type { CartItem } from "./CartItemType";

export type Cart = {
  _id: string;
  user: string;
  items: CartItem[];
  subtotal: number;
};