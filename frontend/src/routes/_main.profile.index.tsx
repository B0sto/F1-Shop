import ProfileScreen from '@/pages/ProfileScreen'
import { meQuery } from '@/services/providers/queries/authQueries';
import { recentPurchasesQuery } from '@/services/providers/queries/checkoutQueries'
import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_main/profile/')({
  beforeLoad: async ({ context }) => {
    const user = await context.queryClient.ensureQueryData(meQuery);

    if (!user) {
      throw redirect({
        to: "/home",
      });
    }
  },
  loader: ({ context }) => {
    context.queryClient.prefetchQuery(recentPurchasesQuery);
  },
  component: ProfileRoute,
})

function ProfileRoute() {
  return <ProfileScreen />
}
