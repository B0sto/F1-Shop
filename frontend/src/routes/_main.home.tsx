import { createFileRoute } from '@tanstack/react-router'

import HomeScreen from '@/pages/HomeScreen'
import { collectionsQuery, discountsQuery, teamsQuery, vintagesQuery } from '@/services/providers/queries/homeQueries'

export const Route = createFileRoute('/_main/home')({
  loader: ({ context }) => {
    context.queryClient.prefetchQuery(teamsQuery)
    context.queryClient.prefetchQuery(collectionsQuery(1, ""))
    context.queryClient.prefetchQuery(discountsQuery)
    context.queryClient.prefetchQuery(vintagesQuery)
  },
  component: HomeRoute
})


function HomeRoute() {
  return <HomeScreen />
}
