import CheckoutScreen from '@/pages/CheckoutScreen'
import { cartQuery } from '@/services/providers/queries/cartQueries'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_main/checkout')({
    loader: ({context}) => {
        context.queryClient.ensureQueryData(cartQuery)
    },
    component: CheckoutScreen,
})