import type { RouterContext } from "@/router";
import Loader from "@/components/common/Loader";
import NotFoundPage from "@/pages/NotFoundPage";
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";


export const Route = createRootRouteWithContext<RouterContext>()({
    component: RootComponent,
    notFoundComponent: NotFoundPage,
})

function RootComponent() {
    return (
        <div className="mx-auto min-h-screen w-full max-w-480 overflow-x-hidden">
            <Loader />
            <Outlet />
        </div>
    )
}
