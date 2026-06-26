import useFilter from "@/hooks/useFilter.ts";
import useInput from "@/hooks/useInput.ts";

const useSearch = <T>(items: T[], getSearchValue: (item: T) => string) => {
    const [query, setQuery] = useInput("");

    const filteredItems = useFilter(items, query, getSearchValue);

    return {
        query,
        setQuery,
        filteredItems,
    }
}

export default useSearch;