import { Funnel, Search } from "lucide-react"
import DriverCollectionShowcase from "./DriverCollectionShowcase"

const CollectionsSection = () => {
    return (
        <section className="px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-36 pb-12 sm:pb-16 text-white font-akshar">
            <h3 className=" text-4xl leading-none sm:text-5xl lg:text-[64px] mb-10">Collections</h3>

            <div className="relative flex items-center gap-x-3">
                <Search size={20} className="text-black absolute top-1/2 transform -translate-y-1/2 left-3" />
                <input type="text" className="w-full rounded-full bg-white text-black h-8.75 pr-3 pl-11" />

                <Funnel className="cursor-pointer" />
            </div>

            <DriverCollectionShowcase />
        </section>
    )
}

export default CollectionsSection
