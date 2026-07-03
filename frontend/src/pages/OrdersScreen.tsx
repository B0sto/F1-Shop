import SectionTitle from "@/components/common/SectionTitle";
import { ordersQuery } from "@/services/providers/queries/checkoutQueries";
import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

const OrdersScreen = () => {
    const { data: orders = [], isLoading } = useQuery(ordersQuery);

    return (
        <section className="min-h-full px-4 py-8 font-akshar text-white sm:px-8 sm:py-10 lg:px-12 lg:py-12 xl:px-16 2xl:px-36">
            <div className="mx-auto w-full max-w-350">
                <div className="mb-7 flex items-center gap-4">
                    <Link
                        to="/profile"
                        className="text-white transition-colors hover:text-[#F90301]"
                        aria-label="Go back"
                    >
                        <ArrowLeft className="size-7" />
                    </Link>
                    <SectionTitle title="All Orders" className="text-white" />
                </div>

                {isLoading && <p className="text-white/60">Loading orders...</p>}

                {!isLoading && orders.length === 0 && (
                    <p className="text-white/60">You have no orders yet.</p>
                )}

                <div className="space-y-4">
                    {orders.map((order) => (
                        <Link
                            key={order._id}
                            to="/profile/orders/$orderId"
                            params={{ orderId: order._id }}
                            className="block rounded-lg border border-white/10 bg-[#080808] p-5 transition-colors hover:border-white/25"
                        >
                            <div className="flex items-center justify-between gap-4">
                                <div>
                                    <p className="text-[16px] text-white">
                                        Order #{order._id.slice(0, 8).toUpperCase()}
                                    </p>
                                    <p className="text-[14px] text-white/50">
                                        {new Date(order.createdAt).toLocaleDateString("en-US", {
                                            month: "long",
                                            day: "numeric",
                                            year: "numeric",
                                        })}
                                        {" · "}
                                        {order.items.length} item{order.items.length > 1 ? "s" : ""}
                                    </p>
                                </div>
                                <p className="text-[18px] text-white">${order.total}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default OrdersScreen