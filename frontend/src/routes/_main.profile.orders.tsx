import { meQuery } from '@/services/providers/queries/authQueries';
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_main/profile/orders')({
  beforeLoad: async ({ context }) => {
    const user = await context.queryClient.ensureQueryData(meQuery);

    if (!user) {
      throw redirect({
        to: "/home",
      });
    }
  },
  component: OrdersLayout,
})

function OrdersLayout() {
  return <Outlet />
}
