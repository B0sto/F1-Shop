import { Outlet, createRootRoute } from '@tanstack/react-router'

import Loader from '@/components/common/Loader'

export const Route = createRootRoute({
    component: RootComponent,
})

function RootComponent() {
    return (
        <div className="mx-auto min-h-screen w-full max-w-480 overflow-x-hidden">
            <Loader />
            <Outlet />
        </div>
    )
}