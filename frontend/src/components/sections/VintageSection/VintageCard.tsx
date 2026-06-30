import Button from "@/components/common/Button";
import type { VintageCardType } from "@/types/VintageCardType";

const VintageCard = (product: VintageCardType) => {
    const { imgSrc, name, price } = product;

    return (
        <div className="flex min-h-125 w-[calc(100vw-32px)] max-w-95 flex-col items-center justify-center bg-[#FFFAFA]/40 px-5 font-akshar md:min-h-140 md:w-95">
            <div className="aspect-square w-60 md:w-75">
                <img
                    src={imgSrc}
                    alt={name}
                    loading="lazy"
                    className="h-full w-full object-contain"
                />
        </div>

            <div className="text-center text-[28px] leading-tight md:text-[34px]">
                <p className="mx-auto max-w-52">{name}</p>
                <p className="mt-3">
                    Price : <span>{price} $</span>
                </p>
            </div>

            <Button
                product={product}
                source="vintage"
                className="mt-6 mb-4 bg-[#B2B0B1] text-[19px] hover:bg-[#9a9999] md:text-[20px]"
            />
        </div>
    );
};

export default VintageCard;
