import SectionTitle from "@/components/common/SectionTitle";
import { orderByIdQuery } from "@/services/providers/queries/checkoutQueries";
import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

const OrderDetailsScreen = () => {
    const { orderId } = useParams({ from: "/_main/profile/orders/$orderId" });
    const { data: order, isLoading } = useQuery(orderByIdQuery(orderId));

    if (isLoading) {
        return (
            <section className="min-h-full px-4 py-8 font-akshar text-white sm:px-8 lg:px-12 xl:px-16 2xl:px-36">
                <p className="text-white/60">Loading order...</p>
            </section>
        );
    }

    if (!order) {
        return (
            <section className="min-h-full px-4 py-8 font-akshar text-white sm:px-8 lg:px-12 xl:px-16 2xl:px-36">
                <p className="text-white/60">Order not found.</p>
            </section>
        );
    }

    return (
        <section className="min-h-full px-4 py-8 font-akshar text-white sm:px-8 sm:py-10 lg:px-12 lg:py-12 xl:px-16 2xl:px-36">
            <div className="mx-auto w-full max-w-350">
                <div className="mb-7 flex items-center gap-4">
                    <Link
                        to="/profile/orders"
                        className="text-white transition-colors hover:text-[#F90301]"
                        aria-label="Go back"
                    >
                        <ArrowLeft className="size-7" />
                    </Link>
                    <SectionTitle title={`Order #${order._id.slice(0, 8).toUpperCase()}`} className="text-white" />
                </div>

                <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px] xl:gap-8">
                    <div className="space-y-4">
                        <div className="rounded-lg border border-white/10 bg-[#080808] p-5 sm:p-7">
                            <h2 className="mb-4 text-[20px] leading-none font-light">ITEMS</h2>
                            <div className="space-y-4">
                                {order.items.map((item, idx) => (
                                    <div
                                        key={`${item.productId}-${idx}`}
                                        className="flex items-center gap-4 border-b border-white/10 pb-4 last:border-b-0 last:pb-0"
                                    >
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="size-16 rounded-md object-cover"
                                        />
                                        <div className="flex-1">
                                            <p className="text-white/90">{item.name}</p>
                                            <p className="text-[14px] text-white/50">
                                                {item.size} · ${item.unitPrice} × {item.quantity}
                                            </p>
                                        </div>
                                        <p className="text-white">${item.totalPrice}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="rounded-lg border border-white/10 bg-[#080808] p-5 sm:p-7">
                            <h2 className="mb-4 text-[20px] leading-none font-light">PAYMENT</h2>
                            <div className="space-y-2 text-[15px] text-white/80">
                                <p>Card ending in •••• {order.payment.cardLast4}</p>
                                <p>Expires {order.payment.expirationDate}</p>
                            </div>
                        </div>
                    </div>

                    <aside className="h-full rounded-lg border border-white/10 bg-[#080808] p-5 sm:p-7 lg:sticky lg:top-6">
                        <h2 className="text-[20px] leading-none font-light">SUMMARY</h2>
                        <div className="mt-5 space-y-3 text-[16px]">
                            <div className="flex items-center justify-between gap-4">
                                <span className="text-white/60">Status</span>
                                <span className="capitalize">{order.status}</span>
                            </div>
                            <div className="flex items-center justify-between gap-4">
                                <span className="text-white/60">Date</span>
                                <span>
                                    {new Date(order.createdAt).toLocaleDateString("en-US", {
                                        month: "long",
                                        day: "numeric",
                                        year: "numeric",
                                    })}
                                </span>
                            </div>
                            <div className="flex items-center justify-between gap-4">
                                <span className="text-white/60">Subtotal</span>
                                <span>${order.subtotal}</span>
                            </div>
                            <div className="flex items-center justify-between gap-4">
                                <span className="text-white/60">Shipping</span>
                                <span>${order.shipping}</span>
                            </div>
                        </div>
                        <div className="mt-6 flex items-center justify-between border-t border-white/15 pt-5 text-[24px] leading-none">
                            <span>Total</span>
                            <span>${order.total}</span>
                        </div>
                    </aside>
                </div>
            </div>
        </section>
    );
}

export default OrderDetailsScreen