import Button from "@/components/common/Button";
import SizeSelector from "@/components/common/SizeSelector"
import type { SpecialDiscountCardType } from "@/types/SpecialDiscountCardType"
import { useState } from "react";

const calculateDiscount = (price: number, percent: number) => Math.floor(price - (price * percent / 100));

const SpecialDiscountCard = (
    product
        : SpecialDiscountCardType) => {
    const { imgSrc, name, price, discount, sizes } = product;
    const discountedPrice = calculateDiscount(price, discount);
    const [selectedSize, setSelectedSize] = useState<string | number>(sizes[0] ?? "One Size");

    return (
        <div className="relative flex min-h-95 w-full max-w-82 flex-col items-center border border-white px-5 pb-2 pt-4 font-akshar text-center sm:max-w-78 lg:max-w-82">
            <span className="absolute top-1 left-2 text-[#ED1E1E]">-{discount}%</span>
            <div className="flex h-43 w-full items-center justify-center">
                <img src={imgSrc} alt={name} loading="lazy" className="max-h-full max-w-full object-contain" />
            </div>

            <div className="mt-4 flex flex-1 flex-col items-center justify-center gap-y-2.5">
                <p className="text-[18px] text-center">{name}</p>
                <div>
                    <div className="flex items-center gap-x-1.5 justify-center">
                        <p>Price:</p>
                        <span className="line-through decoration-black decoration-2">{price}$</span>
                        <span className="text-[#F61111]">{calculateDiscount(price, discount)}$</span>
                    </div>
                    <div className="flex items-center gap-1 mt-1">
                        <SizeSelector sizes={sizes} value={selectedSize} onChange={setSelectedSize} />
                    </div>
                </div>
            </div>

            <Button
                text="Buy Now"
                product={product}
                source="discount"
                unitPrice={discountedPrice}
                size={selectedSize}
                sizes={sizes}
                className="mt-3 mb-2 bg-[#282525] text-[18px] hover:bg-[#4e4a4a]"
            />
        </div>
    )
}

export default SpecialDiscountCard
