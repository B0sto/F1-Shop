import { Funnel, Search } from "lucide-react"
import DriverCollectionShowcase from "./DriverCollectionShowcase"
import Pagination from "@/components/common/Pagination";
import SectionTitle from "@/components/common/SectionTitle"
import { useQuery } from "@tanstack/react-query";
import { collectionsQuery } from "@/services/providers/queries/homeQueries.ts";
import { useEffect, useState } from "react";
import useDebounce from "@/hooks/useDebounce";
import { FilterCollectionsModal } from "./FilterCollectionsModal"

const CollectionsSection = () => {
    const [page, setPage] = useState(1);
    const [query, setQuery] = useState("");
    const debouncedQuery = useDebounce(query, 300);

    const [selectedDrivers, setSelectedDrivers] = useState<string[]>([]);
    const [minPrice, setMinPrice] = useState<number | undefined>(undefined);
    const [maxPrice, setMaxPrice] = useState<number | undefined>(undefined);

    const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

    useEffect(() => {
        const shouldScroll = sessionStorage.getItem("scrollToCollections")
        if (shouldScroll === "true") {
            sessionStorage.removeItem("scrollToCollections")
            const element = document.getElementById("collections")
            if (element) {
                element.scrollIntoView({ behavior: "smooth" })
            }
        }
    }, [])

    useEffect(() => {
        setPage(1)
    }, [debouncedQuery, selectedDrivers, minPrice, maxPrice]);

    const { data: response, isFetching } = useQuery(
        collectionsQuery(page, debouncedQuery, selectedDrivers, minPrice, maxPrice)
    );

    const collections = response?.data ?? [];
    const pagination = response?.pagination;
    const allDrivers: string[] = response?.allDrivers ?? [];

    const handleApplyFilters = (drivers: string[], min: number | undefined, max: number | undefined) => {
        setSelectedDrivers(drivers);
        setMinPrice(min);
        setMaxPrice(max);
        setPage(1);
        setIsFilterModalOpen(false);
    };

    const handleResetFilters = () => {
        setSelectedDrivers([]);
        setMinPrice(undefined);
        setMaxPrice(undefined);
        setPage(1);
        setIsFilterModalOpen(false);
    };

    const hasActiveFilters = selectedDrivers.length > 0 || minPrice !== undefined || maxPrice !== undefined;

    return (
        <section id="collections" className="px-4 pb-12 text-white font-akshar sm:px-8 sm:pb-16 lg:px-12 xl:px-16 2xl:px-36">
            <div className="mb-6 sm:mb-8 lg:mb-10">
                <SectionTitle title="Collections" />
            </div>

            <div className="relative flex w-full items-center gap-x-3">
                <Search size={20} className="text-black absolute top-1/2 transform -translate-y-1/2 left-3" />
                <input type="text" className="h-10 w-full rounded-full bg-white pr-3 pl-11 text-black sm:h-8.75"
                    aria-label="Search Collections" value={query} onChange={(e) => setQuery(e.target.value)} />

                <div
                    className="relative cursor-pointer select-none p-1 transition-colors duration-300"
                    onClick={() => setIsFilterModalOpen(true)}
                    aria-label="Open Filters"
                >
                    <Funnel className={`shrink-0 size-6 ${hasActiveFilters ? "text-[#F90301]" : "text-white hover:text-[#F90301]"}`} />
                    {hasActiveFilters && (
                        <span className="absolute top-0 right-0 flex h-2.5 w-2.5 rounded-full bg-[#F90301] border border-[#110D0D]" />
                    )}
                </div>
            </div>

            <div className={isFetching ? "opacity-30 transition-opacity" : "opacity-100 transition-opacity"}>
                {collections.length === 0 ? (
                    <div className="mt-16 text-center text-white/50 text-[18px]">
                        No collections found matching the filter criteria.
                    </div>
                ) : (
                    <DriverCollectionShowcase collections={collections} />
                )}
            </div>

            <Pagination
                page={pagination?.page ?? page}
                totalPages={pagination?.totalPages ?? 1}
                onPageChange={setPage}
            />

            <FilterCollectionsModal
                isOpen={isFilterModalOpen}
                onClose={() => setIsFilterModalOpen(false)}
                allDrivers={allDrivers}
                selectedDrivers={selectedDrivers}
                minPrice={minPrice}
                maxPrice={maxPrice}
                onApply={handleApplyFilters}
                onReset={handleResetFilters}
            />
        </section>
    )
}

export default CollectionsSection
