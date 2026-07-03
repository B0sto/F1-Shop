// frontend/src/hooks/useAddToCart.ts
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import axios from "axios";

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
    const navigate = useNavigate();
    const { data: user } = useQuery(meQuery);

    const { mutate, isPending } = useMutation({
        mutationFn: addCartItem,

        onSuccess: () => {
            toast.success("Added to cart", {
                action: {
                    label: "View cart",
                    onClick: () => navigate({ to: "/cart" }),
                },
            });
            queryClient.invalidateQueries({ queryKey: ["cart"] });
        },

        onError: (error) => {
            const message = axios.isAxiosError<{ message?: string }>(error)
                ? error.response?.data.message ?? "Failed to add to cart"
                : "Failed to add to cart";

            toast.error(message);
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
