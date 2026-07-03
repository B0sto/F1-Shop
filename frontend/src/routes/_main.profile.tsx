import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_main/profile')({
  component: ProfileRoute,
})

function ProfileRoute() {
  return <Outlet />
}
