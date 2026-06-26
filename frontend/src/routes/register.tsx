import RegisterScreen from '@/pages/RegisterScreen'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/register')({
  component: RegisterRoute,
})

function RegisterRoute() {
  return <RegisterScreen />
}
