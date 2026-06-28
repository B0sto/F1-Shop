import { createFileRoute, Outlet } from '@tanstack/react-router'

import HeaderComponent from '@/components/sections/Header/HeaderComponent'
import Footer from '@/components/sections/Footer/Footer'

export const Route = createFileRoute('/_main')({
  component: MainLayout,
})

function MainLayout() {
  return (
    <div className="h-dvh overflow-hidden bg-[#110D0D]">
      <HeaderComponent />

      <main className="h-[calc(100dvh-4rem)] overflow-x-hidden overflow-y-auto sm:h-[calc(100dvh-75px)] mt-16 sm:mt-19">
        <div className="mb-20">
          <Outlet />
        </div>

        <Footer />
      </main>
    </div>
  )
}
