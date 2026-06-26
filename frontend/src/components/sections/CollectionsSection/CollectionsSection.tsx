import {Funnel, Search} from "lucide-react"
import DriverCollectionShowcase from "./DriverCollectionShowcase"
import SectionTitle from "@/components/common/SectionTitle"
import {useQuery} from "@tanstack/react-query";
import {collectionsQuery} from "@/services/providers/queries/homeQueries.ts";
import useSearch from "@/hooks/useSearch.ts";

const CollectionsSection = () => {
    const {data: response} = useQuery(collectionsQuery);

    const collections = response?.data ?? [];

    const { query, setQuery, filteredItems } = useSearch(collections, (collection) => collection.driver.name);

    return (
        <section className="px-4 pb-12 text-white font-akshar sm:px-8 sm:pb-16 lg:px-12 xl:px-16 2xl:px-36">
            <div className="mb-6 sm:mb-8 lg:mb-10">
                <SectionTitle title="Collections"/>
            </div>

            <div className="relative flex w-full items-center gap-x-3">
                <Search size={20} className="text-black absolute top-1/2 transform -translate-y-1/2 left-3"/>
                <input type="text" className="h-10 w-full rounded-full bg-white pr-3 pl-11 text-black sm:h-8.75"
                       aria-label="Search Collections" value={query} onChange={(e) => setQuery(e.target.value)}/>

                <Funnel className="shrink-0 cursor-pointer"/>
            </div>

            <DriverCollectionShowcase collections={filteredItems}/>
        </section>
    )
}

export default CollectionsSection
