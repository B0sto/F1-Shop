import { queryOptions, keepPreviousData } from "@tanstack/react-query"

import { getCollections } from "@/services/providers/api/collectionsApi"
import { getDiscounts } from "@/services/providers/api/discountsApi"
import { getTeams } from "@/services/providers/api/teamApi"
import { getVintages } from "@/services/providers/api/vintagesApi"

export const teamsQuery = queryOptions({
  queryKey: ["teams"],
  queryFn: getTeams,
})

export const collectionsQuery = (page: number, search: string) =>
  queryOptions({
    queryKey: ["collections", page, search],
    queryFn: () =>
      getCollections({
        page,
        limit: 3,
        search,
      }),
      placeholderData: keepPreviousData
  });

export const discountsQuery = queryOptions({
  queryKey: ["discounts"],
  queryFn: getDiscounts,
})

export const vintagesQuery = queryOptions({
  queryKey: ["vintages"],
  queryFn: getVintages,
})
