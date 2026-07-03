import CartScreen from "@/pages/CartScreen";
import { cartQuery } from "@/services/providers/queries/cartQueries";
import { meQuery } from "@/services/providers/queries/authQueries";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_main/cart")({
  beforeLoad: async ({ context }) => {
    const user = await context.queryClient.ensureQueryData(meQuery);

    if (!user) {
      throw redirect({
        to: "/home",
      });
    }
  },

  loader: ({ context }) => {
    return context.queryClient.ensureQueryData(cartQuery);
  },

  component: CartRoute,
});

function CartRoute() {
  return <CartScreen />;
}