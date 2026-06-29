import { addCartItem } from "@/services/providers/api/cartApi"
import { meQuery } from "@/services/providers/queries/authQueries"
import type { CartItemSource } from "@/types/CartItemSourceType"
import type { ProductType } from "@/types/ProductType"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

type ButtonProps = {
    text?: string
    className?: string,
    product: ProductType
    source?: CartItemSource
}

const Button = ({ text = "Add To Cart", className = "", product, source = "collection" }: ButtonProps) => {
  const queryClient = useQueryClient();
  const { data: user } = useQuery(meQuery);

  const { mutate: addToCart, isPending } = useMutation({
    mutationFn: addCartItem,

    onSuccess: () => {
      toast.success("Added to cart");
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },

    onError: () => {
      toast.error("Failed to add to cart");
    }
  })

  const handleAddToCart = () => {
    if (!user) {
      toast.error("You should be logged in to add products to cart");
      return;
    }

    if (!product._id) {
      toast.error("Product is missing an id");
      return;
    }

    addToCart({
      productId: product._id,
      source,
      name: product.name,
      image: product.imgSrc,
      unitPrice: product.price,
    });

  }

  return (
    <button type="button" className={`${className} h-7 whitespace-nowrap rounded-full px-2.5 text-[13px] transition-all duration-300 cursor-pointer sm:h-8 sm:px-3 sm:text-[14px]`} onClick={handleAddToCart}>
        {isPending ? "Adding..." : text}
    </button>
  )
}

export default Button
