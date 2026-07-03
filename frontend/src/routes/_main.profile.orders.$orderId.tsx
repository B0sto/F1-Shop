import OrderDetailsScreen from '@/pages/OrderDetailsScreen'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_main/profile/orders/$orderId')({
  component: OrderDetailsRoute,
})

function OrderDetailsRoute() {
  return <OrderDetailsScreen />
}
