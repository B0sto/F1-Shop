import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ArrowLeft, Calendar, CreditCard, LockKeyhole, Mail, MapPin, ShieldCheck, User } from "lucide-react";

import { cartQuery } from "@/services/providers/queries/cartQueries";

import CheckoutField from "@/components/sections/Cart/CheckoutField";
import { useForm, type SubmitHandler } from "react-hook-form";
import {
    detailsSchema,
    verificationSchema,
    type DetailsForm,
    type VerificationForm,
} from "@/components/sections/Cart/checkoutSchema/checkoutSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { checkout } from "@/services/providers/api/checkoutApi";
import { toast } from "sonner";
import { useNavigate } from "@tanstack/react-router";
import { meQuery } from "@/services/providers/queries/authQueries";

const SHIPPING_PRICE = 10;

const CheckoutScreen = () => {
    const [step, setStep] = useState<"details" | "verification">("details");
    const [savedDetails, setSavedDetails] = useState<DetailsForm | null>(null);
    const navigate = useNavigate();

    const { data: cart } = useQuery(cartQuery);
    const { data: user } = useQuery(meQuery);
    const queryClient = useQueryClient();

    const subtotal = cart?.subtotal ?? 0;
    const shipping = subtotal > 0 ? SHIPPING_PRICE : 0;
    const total = subtotal + shipping;

    const {
        register: registerDetails,
        handleSubmit: handleSubmitDetails,
        formState: { errors: detailsErrors },
    } = useForm<DetailsForm>({
        resolver: zodResolver(detailsSchema),
    });

    const {
        register: registerVerify,
        handleSubmit: handleSubmitVerify,
        setError: setVerifyError,
        formState: { errors: verifyErrors },
    } = useForm<VerificationForm>({
        resolver: zodResolver(verificationSchema),
    });

    const checkoutMutation = useMutation({
        mutationFn: checkout,
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: cartQuery.queryKey });
            console.log("Order Created Successfully", data.order);
        },
        onError: (error) => {
            const message = axios.isAxiosError<{ message?: string }>(error)
                ? error.response?.data.message
                : "Unable to checkout";

            setVerifyError("root", { type: "server", message });
        },
    });

    const onDetailsSubmit: SubmitHandler<DetailsForm> = (data) => {
        setSavedDetails(data);
        setStep("verification");
    };

    const onVerificationSubmit: SubmitHandler<VerificationForm> = async () => {
        if (!savedDetails) return;

        checkoutMutation.mutate(savedDetails);
        toast.success("Successfuly created order");
        await navigate({ to: "/home" });
    };

    return (
        <section className="w-full px-4 py-8 font-akshar text-white sm:px-8 lg:px-12 xl:px-16 2xl:px-36">
            <header className="relative mb-8 flex min-h-24 items-center justify-center">
                <button
                    type="button"
                    aria-label="Go back"
                    className="absolute left-0 cursor-pointer text-white transition-colors hover:text-[#F90301]"
                    onClick={() => window.history.back()}
                >
                    <ArrowLeft className="size-10 stroke-[2.8]" />
                </button>
                <h1 className="mt-2 text-[42px] leading-none font-light sm:text-[58px] text-center">
                    CHECKOUT
                </h1>
            </header>

            <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px] xl:gap-8">
                {step === "details" ? (
                    <form
                        onSubmit={handleSubmitDetails(onDetailsSubmit)}
                        className="rounded-lg border border-white/10 bg-[#080808] p-5 sm:p-7 lg:p-9 space-y-8"
                    >
                        <div className="mb-8 grid grid-cols-2 text-center">
                            <button
                                type="button"
                                className="h-11 border-b border-[#F90301] text-[14px] uppercase tracking-[0.16em] text-white"
                            >
                                Details
                            </button>
                            <button
                                type="button"
                                disabled
                                className="h-11 border-b border-white/10 text-[14px] uppercase tracking-[0.16em] text-white/45 cursor-not-allowed"
                            >
                                Verification
                            </button>
                        </div>

                        <section>
                            <h2 className="mb-5 text-[24px] leading-none font-light">YOUR INFO</h2>
                            <div className="rounded-md border border-white/10 bg-white/3 p-4 space-y-3 text-[15px]">
                                <div className="flex items-center gap-3 text-white/80">
                                    <User className="size-4 text-white/50" />
                                    <span>Username: {user?.username}</span>
                                </div>
                                <div className="flex items-center gap-3 text-white/80">
                                    <Mail className="size-4 text-white/50" />
                                    <span>Email: {user?.email}</span>
                                </div>
                                <div className="flex items-center gap-3 text-white/80">
                                    <MapPin className="size-4 text-white/50" />
                                    <span>Address: {user?.address || "No address on file"}</span>
                                </div>
                            </div>
                        </section>

                        <section>
                            <h2 className="mb-5 text-[24px] leading-none font-light">CARD DETAILS</h2>
                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="md:col-span-2">
                                    <CheckoutField
                                        {...registerDetails("cardNumber")}
                                        label="Card number"
                                        placeholder="1111 1111 1111 1111"
                                        icon={CreditCard}
                                        maxLength={19}
                                    />
                                    {detailsErrors.cardNumber && (
                                        <p className="mt-1 text-sm text-red-500">{detailsErrors.cardNumber.message}</p>
                                    )}
                                </div>
                                <div>
                                    <CheckoutField
                                        {...registerDetails("cvv")}
                                        label="CVV"
                                        placeholder="123"
                                        icon={LockKeyhole}
                                        maxLength={3}
                                    />
                                    {detailsErrors.cvv && (
                                        <p className="mt-1 text-sm text-red-500">{detailsErrors.cvv.message}</p>
                                    )}
                                </div>
                                <div>
                                    <CheckoutField
                                        {...registerDetails("expirationDate")}
                                        label="Expiration date"
                                        placeholder="MM / YY"
                                        icon={Calendar}
                                        maxLength={7}
                                    />
                                    {detailsErrors.expirationDate && (
                                        <p className="mt-1 text-sm text-red-500">{detailsErrors.expirationDate.message}</p>
                                    )}
                                </div>
                            </div>
                        </section>

                        <button
                            type="submit"
                            className="h-11 w-full cursor-pointer rounded-full bg-[#F90301] text-[18px] leading-none text-white transition-colors hover:bg-[#c90201] md:w-52"
                        >
                            NEXT
                        </button>
                    </form>
                ) : (
                    <form
                        onSubmit={handleSubmitVerify(onVerificationSubmit)}
                        className="rounded-lg border border-white/10 bg-[#080808] p-5 sm:p-7 lg:p-9"
                    >
                        <div className="mb-8 grid grid-cols-2 text-center">
                            <button
                                type="button"
                                onClick={() => setStep("details")}
                                className="h-11 cursor-pointer border-b border-white/10 text-[14px] uppercase tracking-[0.16em] text-white/45 hover:text-white"
                            >
                                Details
                            </button>
                            <button
                                type="button"
                                className="h-11 border-b border-[#F90301] text-[14px] uppercase tracking-[0.16em] text-white"
                            >
                                Verification
                            </button>
                        </div>

                        <section className="mx-auto flex min-h-85 w-full max-w-130 flex-col items-center justify-center text-center">
                            <div className="mb-5 flex size-16 items-center justify-center rounded-full border border-white/15 bg-white/5">
                                <ShieldCheck className="size-8 text-white/75" />
                            </div>

                            <h2 className="text-[28px] leading-none font-light">VERIFICATION</h2>
                            <label className="mt-8 w-full max-w-70">
                                <span className="mb-2 block text-[13px] tracking-wide text-white/70">Verification code</span>
                                <input
                                    type="text"
                                    inputMode="numeric"
                                    maxLength={5}
                                    placeholder="00000"
                                    {...registerVerify("verificationCode")}
                                    className="h-11 w-full rounded-sm border border-white/15 bg-[#120f0f] px-3 text-[15px] text-white outline-none transition-colors placeholder:text-white/25 focus:border-white/50 text-center tracking-[0.6em] placeholder:tracking-[0.6em]"
                                />
                            </label>

                            {verifyErrors.verificationCode && (
                                <p className="mt-2 text-sm text-red-500">{verifyErrors.verificationCode.message}</p>
                            )}
                            {verifyErrors.root && (
                                <p className="mt-2 text-sm text-red-500">{verifyErrors.root.message}</p>
                            )}

                            <button
                                type="submit"
                                disabled={checkoutMutation.isPending}
                                className="mt-8 h-11 w-full max-w-70 cursor-pointer rounded-full bg-[#F90301] text-[18px] leading-none text-white transition-colors hover:bg-[#c90201] disabled:bg-red-800"
                            >
                                {checkoutMutation.isPending ? "SENDING..." : "COMPLETE ORDER"}
                            </button>
                        </section>
                    </form>
                )}

                <aside className="h-full rounded-lg border border-white/10 bg-[#080808] p-5 sm:p-7 lg:sticky lg:top-6">
                    <h2 className="text-[26px] leading-none font-light">ORDER SUMMARY</h2>

                    <div className="mt-6 space-y-4 text-[16px]">
                        {cart?.items.map((item) => (
                            <div key={item._id} className="flex items-center justify-between gap-4 border-b border-white/10 pb-4">
                                <div className="flex flex-col">
                                    <span className="text-white/90">{item.name}</span>
                                    <span className="text-white/50 text-[14px]">
                                        ${item.unitPrice} × {item.quantity}
                                    </span>
                                </div>
                                <span>${item.totalPrice}</span>
                            </div>
                        ))}
                    </div>

                    <div className="mt-6 space-y-4 text-[18px]">
                        <div className="flex items-center justify-between gap-4">
                            <span className="text-white/60">Products</span>
                            <span>${subtotal}</span>
                        </div>
                        <div className="flex items-center justify-between gap-4">
                            <span className="text-white/60">Shipping</span>
                            <span>${shipping}</span>
                        </div>
                    </div>

                    <div className="mt-7 flex items-center justify-between border-t border-white/15 pt-5 text-[28px] leading-none">
                        <span>Total</span>
                        <span>${total}</span>
                    </div>
                </aside>
            </div>
        </section>
    );
};

export default CheckoutScreen;