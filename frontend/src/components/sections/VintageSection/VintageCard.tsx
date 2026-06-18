import type { VintageCardType } from "@/types/VintageCardType";

const VintageCard = ({ imgSrc, name, price }: VintageCardType) => {
    return (
        <div className="flex min-h-125 w-[calc(100vw-32px)] max-w-95 flex-col items-center justify-center bg-[#FFFAFA]/40 px-5 font-akshar md:min-h-140 md:w-95">
            <div className="aspect-square w-60 md:w-75">
                <img
                    src={imgSrc}
                    alt={name}
                    className="h-full w-full object-contain"
                />
            </div>

            <div className="text-center text-[28px] leading-tight md:text-[34px]">
                <p className="mx-auto max-w-52">{name}</p>
                <p className="mt-3">
                    Price : <span>{price} $</span>
                </p>
            </div>

            <button type="button" className="mt-6 mb-4 cursor-pointer rounded-full bg-[#B2B0B1] px-4 py-1 text-[20px] transition-all duration-300 hover:bg-[#9a9999] md:text-[22px]">
                Add To Cart
            </button>
        </div>
    );
};

export default VintageCard;
