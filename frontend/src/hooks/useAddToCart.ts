// frontend/src/hooks/useAddToCart.ts
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { addCartItem } from "@/services/providers/api/cartApi";
import { meQuery } from "@/services/providers/queries/authQueries";
import type { CartItemSource } from "@/types/CartItemSourceType";
import type { ProductType } from "@/types/ProductType";

type AddToCartInput = {
    product: ProductType;
    source: CartItemSource;
    unitPrice?: number;
    size?: string | number;
    sizes?: Array<string | number>;
};

export const useAddToCart = () => {
    const queryClient = useQueryClient();
    const { data: user } = useQuery(meQuery);

    const { mutate, isPending } = useMutation({
        mutationFn: addCartItem,

        onSuccess: () => {
            toast.success("Added to cart");
            queryClient.invalidateQueries({ queryKey: ["cart"] });
        },

        onError: () => {
            toast.error("Failed to add to cart");
        },
    });

    const addToCart = ({ product, source, unitPrice, size, sizes }: AddToCartInput) => {
        if (!user) {
            toast.error("You should be logged in to add products to cart");
            return;
        }

        if (!product._id) {
            toast.error("Product is missing an id");
            return;
        }

        mutate({
            productId: product._id,
            source,
            name: product.name,
            image: product.imgSrc,
            unitPrice: unitPrice ?? product.price,
            size: size?.toString(),
            sizes: sizes?.map((itemSize) => itemSize.toString()),
        });
    };

    return {
        addToCart,
        isAddingToCart: isPending,
    };
};
