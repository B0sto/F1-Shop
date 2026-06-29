import { clearCart } from "@/services/providers/api/cartApi";
import { cartQuery } from "@/services/providers/queries/cartQueries";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

type CartCheckoutCardProps = {
    total: number;
    className?: string;
    disabled?: boolean;
};

const CartCheckoutCard = ({ total, className = "", disabled = false }: CartCheckoutCardProps) => {
    const queryClient = useQueryClient();

    const { mutate: cartClear, isPending } = useMutation({
        mutationFn: clearCart,

        onSuccess: (cart) => {
            queryClient.setQueryData(cartQuery.queryKey, cart);
            toast.success("Cart is Cleared")
        },

        onError: () => {
            toast.error("Failed to clear cart");
        }
    })

    

    return (
        <div className={className}>
            <div className="text-[34px] leading-10 max-[1179px]:text-[30px] max-[1179px]:leading-9.5">
                <div className="flex gap-8 max-[1179px]:justify-center">
                    <span>TOTAL:</span>
                    <span>${total}</span>
                </div>
                <p className="pl-8 max-[1179px]:pl-0">+shipping</p>
            </div>

            <button
                type="button"
                disabled={isPending || disabled}
                onClick={() => cartClear()}
                className="mt-8 cursor-pointer text-[18px] leading-none text-white/70 underline-offset-4 transition-colors hover:text-[#F90301] hover:underline disabled:cursor-not-allowed disabled:opacity-50 max-[1179px]:mt-6"
            >
                Clear cart
            </button>

            <button
                type="button"
                disabled={disabled}
                className="mt-auto h-11 w-46.25 cursor-pointer rounded-full bg-[#ff1010] text-[22px] leading-none text-white transition-colors hover:bg-[#F90301] disabled:cursor-not-allowed disabled:opacity-50 max-[1179px]:mt-8 max-[1179px]:w-48"
            >
                CHECKOUT
            </button>
        </div>
    );
}

export default CartCheckoutCard;
