import CheckoutScreen from '@/pages/CheckoutScreen'
import { meQuery } from '@/services/providers/queries/authQueries';
import { cartQuery } from '@/services/providers/queries/cartQueries'
import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_main/checkout')({
    beforeLoad: async ({ context }) => {
        const user = await context.queryClient.ensureQueryData(meQuery);

        if (!user) {
            throw redirect({
                to: "/home",
            });
        }
    },
    loader: ({ context }) => {
        context.queryClient.ensureQueryData(cartQuery)
    },
    component: CheckoutScreen,
})