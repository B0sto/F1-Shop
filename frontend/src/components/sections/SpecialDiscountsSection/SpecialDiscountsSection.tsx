import SectionTitle from "@/components/common/SectionTitle"
import StarIcon from "@/components/icons/StarIcon"
import SpecialDiscountCard from "./SpecialDiscountCard"
import type { SpecialDiscountCardType } from "@/types/SpecialDiscountCardType"

const specialDiscountCards: SpecialDiscountCardType[] = [
    {
        imgSrc: "/discountItem1.png",
        name: "Puma Mercedes AMG Palermo OG 39765201 Mens Black Motorsport Sneakers Shoes",
        price: 150,
        discount: 40,
        sizes: [38, 39, 40, 41, 42],
    },
    {
        imgSrc: "/discountItem2.png",
        name: "Puma Mercedes AMG Palermo OG 39765202 Mens Brown Motorsport Sneakers Shoes",
        price: 150,
        discount: 40,
        sizes: [38, 39, 40, 41, 42],
    },
    {
        imgSrc: "/discountItem3.png",
        name: "Scuderia Ferrari F1 Team Polo Shirt 2025 Red",
        price: 120,
        discount: 66,
        sizes: ["XS", "S", "M", "L", "XL"],
    },
    {
        imgSrc: "/discountItem4.png",
        name: "Replica Max Verstappen Polo",
        price: 90,
        discount: 77,
        sizes: ["XS", "S", "M", "L", "XL"],
    },
    {
        imgSrc: "/discountItem5.png",
        name: "Puma MAPF1 Mercedes AMG Petronas Suede 30802401 Mens Black Sneakers Shoes",
        price: 120,
        discount: 50,
        sizes: [38, 39, 40, 41, 42],
    },
    {
        imgSrc: "/discountItem6.png",
        name: "Mercedes X puma black T-shirt",
        price: 90,
        discount: 66,
        sizes: ["XS", "S", "M", "L", "XL"],
    },
]

const SpecialDiscountsSection = () => {
    return (
        <section className="px-4 pb-12 text-white font-akshar sm:px-8 sm:pb-16 lg:px-12 xl:px-16 2xl:px-36">
            <div className="flex items-center gap-x-6">
                <SectionTitle title="Special Discounts" />
                <StarIcon className="h-10 w-10 shrink-0 sm:h-12 sm:w-12 lg:h-15 lg:w-15.25" />
            </div>

            <div className="mt-10 grid justify-items-center gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-10 xl:gap-y-14">
                {specialDiscountCards.map((card) => (
                    <SpecialDiscountCard key={card.name} {...card} />
                ))}
            </div>

        </section>
    )
}

export default SpecialDiscountsSection
