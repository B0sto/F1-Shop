import ProfileScreen from '@/pages/ProfileScreen'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/profile')({
  component: ProfileRoute,
})

function ProfileRoute() {
  return <ProfileScreen />
}
