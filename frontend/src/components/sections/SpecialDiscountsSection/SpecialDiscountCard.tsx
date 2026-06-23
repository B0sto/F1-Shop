import SizeSelector from "@/components/common/SizeSelector"
import type { SpecialDiscountCardType } from "@/types/SpecialDiscountCardType"

const calculateDiscount = (price: number, percent: number) => Math.floor(price - (price * percent / 100));

const SpecialDiscountCard = ({
    imgSrc,
    name,
    price,
    discount,
    sizes,
}: SpecialDiscountCardType) => {
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
                        <SizeSelector sizes={sizes} />
                    </div>
                </div>
            </div>

            <button type="button" className="bg-[#282525] transition-all duration-300 cursor-pointer hover:bg-[#4e4a4a] px-5 py-2.5 rounded-full text-[18px] mt-3 mb-2">Buy It Now</button>
        </div>
    )
}

export default SpecialDiscountCard
