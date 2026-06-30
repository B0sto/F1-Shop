import type { CartItemSource } from "./CartItemSourceType";

export type CartItem = {
  _id: string;
  productId: string;
  source: CartItemSource;
  name: string;
  image: string;
  size: string;
  sizes?: string[];
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  selected: boolean;
};
