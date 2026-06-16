import { Funnel, Search } from "lucide-react"
import DriverCollectionShowcase from "./DriverCollectionShowcase"

const CollectionsSection = () => {
    return (
        <section className="px-4 pb-12 text-white font-akshar sm:px-8 sm:pb-16 lg:px-12 xl:px-16 2xl:px-36">
            <h3 className="mb-6 text-4xl leading-none sm:mb-8 sm:text-5xl lg:mb-10 lg:text-[64px]">Collections</h3>

            <div className="relative flex w-full items-center gap-x-3">
                <Search size={20} className="text-black absolute top-1/2 transform -translate-y-1/2 left-3" />
                <input type="text" className="h-10 w-full rounded-full bg-white pr-3 pl-11 text-black sm:h-8.75" />

                <Funnel className="shrink-0 cursor-pointer" />
            </div>

            <DriverCollectionShowcase />
        </section>
    )
}

export default CollectionsSection
