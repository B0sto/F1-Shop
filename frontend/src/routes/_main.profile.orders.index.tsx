import OrdersScreen from '@/pages/OrdersScreen'
import { meQuery } from '@/services/providers/queries/authQueries';
import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_main/profile/orders/')({
  beforeLoad: async ({ context }) => {
    const user = await context.queryClient.ensureQueryData(meQuery);

    if (!user) {
      throw redirect({
        to: "/home",
      });
    }
  },
  component: OrdersRoute,
})

function OrdersRoute() {
  return <OrdersScreen />
}
