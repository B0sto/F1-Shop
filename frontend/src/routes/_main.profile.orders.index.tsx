import OrdersScreen from '@/pages/OrdersScreen'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_main/profile/orders/')({
  component: OrdersRoute,
})

function OrdersRoute() {
  return <OrdersScreen />
}
