import { ArrowLeft } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

import { cartQuery } from "@/services/providers/queries/cartQueries";
import CartCheckoutCard from "./CartCheckoutCard";
import CartRow from "./CartRow";

const pageClass =
    "min-h-full h-screen w-full px-4 py-8 font-akshar text-white sm:px-8 min-[1180px]:px-0 min-[1180px]:py-0";
const headerClass =
    "mb-8 flex items-center gap-4 min-[1180px]:relative min-[1180px]:mb-0 min-[1180px]:h-39.5 min-[1180px]:justify-center";
const layoutClass =
    "min-[1180px]:grid min-[1180px]:grid-cols-[minmax(760px,1fr)_minmax(280px,22vw)] min-[1180px]:items-start min-[1180px]:gap-7.75 min-[1180px]:pl-22";
const tableHeaderClass =
    "hidden grid-cols-[minmax(160px,1.35fr)_minmax(90px,0.7fr)_minmax(80px,0.6fr)_minmax(120px,0.8fr)_minmax(95px,0.7fr)] text-[22px] leading-none min-[1180px]:grid";
const checkoutClass =
    "mt-8 flex flex-col items-center bg-[#0a0a0a] px-6 py-8 text-center min-[1180px]:sticky min-[1180px]:top-0 min-[1180px]:mt-0 min-[1180px]:h-155 min-[1180px]:px-0 min-[1180px]:pt-47.5 min-[1180px]:pb-20";

const Cart = () => {
    const { data: cart, isLoading } = useQuery(cartQuery);
    const cartItems = cart?.items ?? [];

    return (
        <section className={pageClass}>
            <header className={headerClass}>
                <button
                    type="button"
                    aria-label="Go back"
                    className="cursor-pointer text-white transition-colors hover:text-[#F90301] min-[1180px]:absolute min-[1180px]:top-17 min-[1180px]:left-22"
                    onClick={() => window.history.back()}
                >
                    <ArrowLeft className="size-10 stroke-[2.8] min-[1180px]:size-12" />
                </button>

                <h1 className="text-[38px] leading-none font-light sm:text-[50px] min-[1180px]:pt-13.75 min-[1180px]:text-[58px]">
                    SHOPPING CART
                </h1>
            </header>



            <div className={layoutClass}>
                <div className="min-w-0">
                    <div className={tableHeaderClass}>
                        <p className="col-start-1">PRODUCT</p>
                        <p className="col-start-2 justify-self-center">PRICE</p>
                        <p className="col-start-3 justify-self-center">QTY</p>
                        <p className="col-start-4 justify-self-center">SIZE</p>
                        <p className="col-start-5 justify-self-center">TOTAL</p>
                    </div>

                    <div className="space-y-8 min-[1180px]:mt-6 min-[1180px]:space-y-7.5">
                        {isLoading && <p className="text-[18px]">Loading cart...</p>}

                        {!isLoading && cartItems.length === 0 && (
                            <p className="text-[18px]">Your cart is empty.</p>
                        )}

                        {cartItems.map((item) => (
                            <CartRow key={item._id} item={item} />
                        ))}
                    </div>
                </div>

                <CartCheckoutCard
                    total={cart?.subtotal ?? 0}
                    disabled={cartItems.length === 0}
                    className={checkoutClass}
                />
            </div>
        </section>
    );
};

export default Cart;
