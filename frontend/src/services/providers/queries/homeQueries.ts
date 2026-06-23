import { queryOptions } from "@tanstack/react-query"

import { getCollections } from "@/services/providers/api/collectionsApi"
import { getDiscounts } from "@/services/providers/api/discountsApi"
import { getTeams } from "@/services/providers/api/teamApi"
import { getVintages } from "@/services/providers/api/vintagesApi"

export const teamsQuery = queryOptions({
  queryKey: ["teams"],
  queryFn: getTeams,
})

export const collectionsQuery = queryOptions({
  queryKey: ["collections"],
  queryFn: getCollections,
})

export const discountsQuery = queryOptions({
  queryKey: ["discounts"],
  queryFn: getDiscounts,
})

export const vintagesQuery = queryOptions({
  queryKey: ["vintages"],
  queryFn: getVintages,
})
