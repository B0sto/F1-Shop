import { Link } from "@tanstack/react-router"
import F1Logo from "../../icons/F1Logo"
import Navigation from "./Navigation"


const HeaderComponent = () => {

  return (
    <header className="fixed inset-x-0 top-0 z-999 flex h-16 items-center justify-between gap-3 bg-black px-4 sm:h-18.75 sm:gap-4 sm:px-6 lg:px-10">
      <Link to="/home" className="flex items-center gap-x-3 sm:gap-x-5 lg:gap-x-8 shrink-0 min-w-0">
        <F1Logo className="size-12 sm:size-14 lg:size-16 object-contain"/>

        <h3 className="font-irish text-2xl sm:text-[32px] lg:text-[40px] text-[#F90301] whitespace-nowrap">
          LULU SHOP
        </h3>
      </Link>

      <Navigation />

    </header>

  )
}

export default HeaderComponent
