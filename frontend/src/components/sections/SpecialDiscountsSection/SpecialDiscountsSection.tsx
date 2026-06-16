import SectionTitle from "@/components/common/SectionTitle"
import StarIcon from "@/components/icons/StarIcon"
import SpecialDiscountCard from "./SpecialDiscountCard"
import { useQuery } from "@tanstack/react-query"
import { getDiscounts } from "@/services/providers/api/discountsApi"



const SpecialDiscountsSection = () => {
    const { data: response } = useQuery({
        queryKey: ["discounts"],
        queryFn: getDiscounts
    })

    const specialDiscountCards = response?.data;
    console.log(specialDiscountCards)

    return (
        <section className="px-4 pb-12 text-white font-akshar sm:px-8 sm:pb-16 lg:px-12 xl:px-16 2xl:px-36">
            <div className="flex items-center gap-x-6">
                <SectionTitle title="Special Discounts" />
                <StarIcon className="h-10 w-10 shrink-0 sm:h-12 sm:w-12 lg:h-15 lg:w-15.25" />
            </div>

            <div className="mt-10 grid justify-items-center gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-10 xl:gap-y-14">
                {specialDiscountCards?.map((card) => (
                    <SpecialDiscountCard key={card.name} {...card} />
                ))}
            </div>

        </section>
    )
}

export default SpecialDiscountsSection
