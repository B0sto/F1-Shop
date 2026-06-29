import CartScreen from '@/pages/CartScreen'
import { cartQuery } from '@/services/providers/queries/cartQueries'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_main/cart')({
  loader: ({context}) => {
    context.queryClient.prefetchQuery(cartQuery);
  },
  component: CartRoute,
})

function CartRoute() {
  return <CartScreen />
}
