import { createFileRoute, Outlet } from '@tanstack/react-router'

import HeaderComponent from '@/components/sections/Header/HeaderComponent'
import Footer from '@/components/sections/Footer/Footer'
import { useRef } from 'react'
import { useScrollToTop } from '@/hooks/useScrollToTop'

export const Route = createFileRoute('/_main')({
  component: MainLayout,
})

function MainLayout() {
  const mainRef = useRef<HTMLElement | null>(null);

  useScrollToTop(mainRef);

  return (
    <div className="h-dvh overflow-hidden bg-[#110D0D]">
      <HeaderComponent />

      <main ref={mainRef} className="h-[calc(100dvh-4rem)] overflow-x-hidden overflow-y-auto sm:h-[calc(100dvh-75px)] mt-16 sm:mt-19">
        <div className="mb-20">
          <Outlet />
        </div>

        <Footer />
      </main>
    </div>
  )
}
