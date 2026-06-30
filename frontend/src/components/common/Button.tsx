import { useAddToCart } from "@/hooks/useAddToCart";
import type { CartItemSource } from "@/types/CartItemSourceType";
import type { ProductType } from "@/types/ProductType";
import type { MouseEvent } from "react";

type ButtonProps = {
  text?: string;
  className?: string;
  product: ProductType;
  source?: CartItemSource;
  unitPrice?: number;
  size?: string | number;
  sizes?: Array<string | number>;
};

const Button = ({
  text = "Add To Cart",
  className = "",
  product,
  source = "collection",
  unitPrice,
  size,
  sizes,
}: ButtonProps) => {
  const { addToCart, isAddingToCart } = useAddToCart();

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();

    addToCart({
      product,
      source,
      unitPrice,
      size,
      sizes,
    });
  };

  return (
    <button
      type="button"
      disabled={isAddingToCart}
      className={`${className} h-7 whitespace-nowrap rounded-full px-2.5 text-[13px] transition-all duration-300 cursor-pointer disabled:cursor-not-allowed disabled:opacity-60 sm:h-8 sm:px-3 sm:text-[14px]`}
      onClick={handleClick}
    >
      {isAddingToCart ? "Adding..." : text}
    </button>
  );
};

export default Button;
