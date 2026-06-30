import type { ProductType } from "./ProductType";

export type SpecialDiscountCardType = ProductType & {
  _id: string;
  discount: number;
  sizes: Array<string | number>;
};