import { Minus, Plus, Trash2 } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import axios from "axios";

import SizeSelector from "@/components/common/SizeSelector";
import { deleteCartItem, updateCartItem, type UpdateCartItemPayload } from "@/services/providers/api/cartApi";
import { cartQuery } from "@/services/providers/queries/cartQueries";
import CartCheckbox from "./CartCheckbox";
import type { CartItem } from "@/types/CartItemType";

type CartRowProps = {
    item: CartItem;
};

const quantityButtonClass =
    "flex size-8 items-center justify-center rounded-full text-white transition-colors hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40";
const rowClass =
    "grid gap-4 border-b border-white/20 pb-6 min-[1180px]:min-h-43.75 min-[1180px]:grid-cols-[minmax(160px,1.35fr)_minmax(90px,0.7fr)_minmax(80px,0.6fr)_minmax(120px,0.8fr)_minmax(95px,0.7fr)] min-[1180px]:gap-0 min-[1180px]:border-b-0 min-[1180px]:pb-0";
const labelClass = "text-white/70 min-[1180px]:hidden";
const valueCellClass =
    "flex items-center justify-between text-[18px] leading-none min-[1180px]:block min-[1180px]:justify-self-center min-[1180px]:text-[24px]";

const CartRow = ({ item }: CartRowProps) => {
    const queryClient = useQueryClient();
    const itemSizes = item.sizes ?? [];
    const hasSizeOptions = itemSizes.length > 1;
    const maxQuantity = 15;

    const { mutate: removeItem, isPending: isRemoving } = useMutation({
        mutationFn: deleteCartItem,
        onSuccess: () => {
            toast.success("Removed from cart");
            queryClient.invalidateQueries({ queryKey: cartQuery.queryKey });
        },
        onError: () => {
            toast.error("Failed to remove item");
        },
    });

    const { mutate: updateItem, isPending: isUpdatingItem } = useMutation({
        mutationFn: (payload: UpdateCartItemPayload) => updateCartItem(item._id, payload),
        onSuccess: (cart) => {
            queryClient.setQueryData(cartQuery.queryKey, cart);
        },
        onError: (error) => {
            const message = axios.isAxiosError<{ message?: string }>(error)
                ? error.response?.data.message ?? "Failed to update cart item"
                : "Failed to update cart item";

            toast.error(message);
        },
    });

    const handleDecrease = () => {
        if (item.quantity <= 1) return;

        updateItem({ quantity: item.quantity - 1 });
    };

    const handleIncrease = () => {
        if (item.quantity >= maxQuantity) {
            toast.error("You can buy max 15 of each product");
            return;
        }

        updateItem({ quantity: item.quantity + 1 });
    };

    const handleSizeChange = (size: string | number) => {
        updateItem({ size: size.toString() });
    };

    const handleToggleSelected = () => {
        updateItem({ selected: !item.selected });
    }

    return (
        <article className={rowClass}>
            <div className="flex min-w-0 gap-4 min-[1180px]:col-start-1 min-[1180px]:block">
                <div className="relative flex size-32 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-[#f4f4f4] min-[1180px]:h-31.5 min-[1180px]:w-33">
                    <img src={item.image} alt={item.name} className="h-full w-full object-contain" />
                    <CartCheckbox selected={item.selected} disabled={isUpdatingItem} onToggle={handleToggleSelected} />
                </div>

                <p className="min-w-0 text-[18px] leading-6 text-white min-[1180px]:mt-3.25 min-[1180px]:w-37.5 min-[1180px]:text-[12px] min-[1180px]:leading-4">
                    {item.name}
                </p>
            </div>

            <div className={`${valueCellClass} min-[1180px]:col-start-2 min-[1180px]:pt-13.75`}>
                <span className={labelClass}>Price</span>
                <span>${item.unitPrice}</span>
            </div>

            <div className="flex items-center justify-between text-[18px] leading-none min-[1180px]:col-start-3 min-[1180px]:items-start min-[1180px]:justify-center min-[1180px]:pt-13.75 min-[1180px]:text-[24px]">
                <span className={labelClass}>Qty</span>

                <div className="flex items-center gap-1">
                    <button
                        type="button"
                        aria-label={`Decrease ${item.name} quantity`}
                        className={quantityButtonClass}
                        disabled={item.quantity <= 1 || isUpdatingItem}
                        onClick={handleDecrease}
                    >
                        <Minus className="size-4" />
                    </button>

                    <span className="w-7 text-center">{item.quantity}</span>

                    <button
                        type="button"
                        aria-label={`Increase ${item.name} quantity`}
                        className={quantityButtonClass}
                        disabled={isUpdatingItem}
                        onClick={handleIncrease}
                    >
                        <Plus className="size-4" />
                    </button>
                </div>
            </div>

            <div className={`${valueCellClass} min-[1180px]:col-start-4 min-[1180px]:pt-14.5`}>
                <span className={labelClass}>Size</span>
                {hasSizeOptions ? (
                    <SizeSelector
                        sizes={itemSizes}
                        value={item.size}
                        onChange={handleSizeChange}
                    />
                ) : (
                    <span>{item.size}</span>
                )}
            </div>

            <div className="flex items-center justify-between min-[1180px]:col-start-5 min-[1180px]:block min-[1180px]:justify-self-center min-[1180px]:pt-13.75">
                <div className="flex items-center gap-4 text-[18px] leading-none min-[1180px]:block min-[1180px]:text-[24px]">
                    <span className={labelClass}>Total</span>
                    <span>${item.totalPrice}</span>
                </div>

                <button
                    type="button"
                    aria-label={`Remove ${item.name}`}
                    className="block cursor-pointer text-white transition-colors hover:text-[#F90301] disabled:cursor-not-allowed disabled:opacity-40 min-[1180px]:mx-auto min-[1180px]:mt-9.25"
                    disabled={isRemoving}
                    onClick={() => removeItem(item._id)}
                >
                    <Trash2 className="size-8 stroke-[2.8] min-[1180px]:size-9" />
                </button>
            </div>
        </article>
    );
}

export default CartRow;
