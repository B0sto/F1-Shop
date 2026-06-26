const useFilter = <T>(
    items: T[],
    query: string,
    getSearchValue: (item: T) => string
): T[] => {
    const normalizedQuery = query.toLowerCase().trim();

    if (!normalizedQuery) return items;

    return items.filter(item => getSearchValue(item).toLowerCase().includes(normalizedQuery));
}

export default useFilter;