import LoginScreen from '@/pages/LoginScreen'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/login')({
  component: LoginRoute,
})

function LoginRoute() {
  return <LoginScreen/>
}
