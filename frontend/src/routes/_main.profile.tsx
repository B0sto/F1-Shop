import ProfileScreen from '@/pages/ProfileScreen'
import { recentPurchasesQuery } from '@/services/providers/queries/checkoutQueries'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_main/profile')({
  loader: ({ context }) => {
    context.queryClient.prefetchQuery(recentPurchasesQuery);
  },
  component: ProfileRoute,
})

function ProfileRoute() {
  return <ProfileScreen />
}
