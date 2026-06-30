import { Funnel, Search } from "lucide-react"
import DriverCollectionShowcase from "./DriverCollectionShowcase"
import Pagination from "@/components/common/Pagination";
import SectionTitle from "@/components/common/SectionTitle"
import { useQuery } from "@tanstack/react-query";
import { collectionsQuery } from "@/services/providers/queries/homeQueries.ts";
import { useEffect, useState } from "react";
import useDebounce from "@/hooks/useDebounce";

const CollectionsSection = () => {
    const [page, setPage] = useState(1);
    const [query, setQuery] = useState("");
    const debouncedQuery = useDebounce(query, 300);

    useEffect(() => {
        setPage(1)
    }, [debouncedQuery]);

    const { data: response, isFetching } = useQuery(collectionsQuery(page, debouncedQuery));

    const collections = response?.data ?? [];
    const pagination = response?.pagination;

    return (
        <section className="px-4 pb-12 text-white font-akshar sm:px-8 sm:pb-16 lg:px-12 xl:px-16 2xl:px-36">
            <div className="mb-6 sm:mb-8 lg:mb-10">
                <SectionTitle title="Collections" />
            </div>

            <div className="relative flex w-full items-center gap-x-3">
                <Search size={20} className="text-black absolute top-1/2 transform -translate-y-1/2 left-3" />
                <input type="text" className="h-10 w-full rounded-full bg-white pr-3 pl-11 text-black sm:h-8.75"
                    aria-label="Search Collections" value={query} onChange={(e) => setQuery(e.target.value)} />

                <Funnel className="shrink-0 cursor-pointer" />
            </div>

            <div className={isFetching ? "opacity-30 transition-opacity" : "opacity-100 transition-opacity"}>
                <DriverCollectionShowcase collections={collections} />
            </div>

            <Pagination
                page={pagination?.page ?? page}
                totalPages={pagination?.totalPages ?? 1}
                onPageChange={setPage}
            />
        </section>
    )
}

export default CollectionsSection
