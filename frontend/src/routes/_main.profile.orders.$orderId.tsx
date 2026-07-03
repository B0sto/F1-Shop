import OrderDetailsScreen from '@/pages/OrderDetailsScreen'
import { meQuery } from '@/services/providers/queries/authQueries';
import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_main/profile/orders/$orderId')({
  beforeLoad: async ({ context }) => {
    const user = await context.queryClient.ensureQueryData(meQuery);

    if (!user) {
      throw redirect({
        to: "/home",
      });
    }
  },
  component: OrderDetailsRoute,
})

function OrderDetailsRoute() {
  return <OrderDetailsScreen />
}
