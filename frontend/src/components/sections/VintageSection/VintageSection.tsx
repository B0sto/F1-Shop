import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState, type CSSProperties } from "react";
import SectionTitle from "@/components/common/SectionTitle";
import VintageCard from "./VintageCard";
import { useQuery } from "@tanstack/react-query";
import { getVintages } from "@/services/providers/api/vintagesApi";
import type { VintageCardType } from "@/types/VintageCardType";

const VintageSection = () => {
    const [active, setActive] = useState(0);

    const { data: response } = useQuery({
        queryKey: ["vintages"],
        queryFn: getVintages
    })

    const vintageProducts: VintageCardType[] = response?.data ?? [];
    const hasProducts = vintageProducts.length > 0;

    const isFirstCard = active === 0;
    const isLastCard = !hasProducts || active >= vintageProducts.length - 1;

    const prev = () => {
        setActive((current) => Math.max(current - 1, 0));
    };

    const next = () => {
        setActive((current) => Math.min(current + 1, Math.max(vintageProducts.length - 1, 0)));
    };

    const getCardStyle = (index: number): CSSProperties => {
        const offset = index - active;
        const absOffset = Math.abs(offset);

        const rotation = offset === 0 ? 0 : offset > 0 ? 40 : -40;

        const translateY = Math.pow(absOffset, 2) * 220;

        return {
            transform: `
      translateX(${offset * 620}px)
      translateY(${translateY}px)
      rotate(${rotation}deg)
      scale(${offset === 0 ? 1 : 0.92})
    `,
            zIndex: 100 - absOffset,
            opacity: absOffset > 3 ? 0 : 1,
            pointerEvents: absOffset > 3 ? "none" : "auto",
        };
    };

    return (
        <section className="pt-1">
            <SectionTitle
                title="Vintage F1 Collection"
                className="px-4 pb-12 font-akshar text-white sm:px-8 sm:pb-16 lg:px-12 xl:px-16 2xl:px-36"
            />

            <article className="relative w-screen overflow-hidden bg-[url('/vintageBg.jpg')] bg-cover bg-center text-white">
                <div className="absolute inset-0 bg-black/40" />

                <div className="absolute right-4 top-4 z-30 flex gap-3 md:hidden">
                    <button
                        type="button"
                        aria-label="Previous vintage product"
                        onClick={prev}
                        disabled={isFirstCard}
                        className="flex size-11 cursor-pointer items-center justify-center rounded-full bg-white/15 text-white transition-all duration-300 hover:bg-white/25 disabled:cursor-default disabled:opacity-35 disabled:hover:bg-white/15 sm:size-12"
                    >
                        <ChevronLeft size={28} />
                    </button>

                    <button
                        type="button"
                        aria-label="Next vintage product"
                        onClick={next}
                        disabled={isLastCard}
                        className="flex size-11 cursor-pointer items-center justify-center rounded-full bg-white/15 text-white transition-all duration-300 hover:bg-white/25 disabled:cursor-default disabled:opacity-35 disabled:hover:bg-white/15 sm:size-12"
                    >
                        <ChevronRight size={28} />
                    </button>
                </div>

                <div className="relative z-10 flex min-h-155 w-full items-center justify-center px-4 pt-20 pb-12 md:hidden">
                    <div className="relative flex h-125 w-full max-w-95 items-center justify-center overflow-hidden">
                        {vintageProducts.map((product, index) => (
                            <div
                                key={product.imgSrc}
                                style={getCardStyle(index)}
                                className="absolute transition-all duration-700 ease-in-out"
                            >
                                <VintageCard {...product} />
                            </div>
                        ))}
                    </div>
                </div>

                <div className="relative z-10 hidden min-h-190 w-full items-center justify-center md:flex">
                    <div className="relative flex h-140 w-105 items-center justify-center">
                        {vintageProducts.map((product, index) => (
                            <div
                                key={product.imgSrc}
                                style={getCardStyle(index)}
                                className="absolute transition-all duration-700 ease-in-out"
                            >
                                <button
                                    type="button"
                                    aria-label={`Show ${product.name}`}
                                    onClick={() => setActive(index)}
                                    className="absolute inset-0 z-10 cursor-pointer rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                                />
                                <div className="pointer-events-none relative z-0">
                                    <VintageCard {...product} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </article>
        </section>
    );
};

export default VintageSection;
