import F1Logo from "../../svgs/F1Logo"
import Navigation from "./Navigation"


const HeaderComponent = () => {

  return (
    <header className="bg-black min-h-18.75 px-3 sm:px-6 flex items-center justify-between gap-4 max-w-480">
      <div className="flex items-center gap-x-3 sm:gap-x-8 shrink-0">
        <F1Logo className="size-14 md:size-full"/>

        <h3 className="font-irish text-[24px] sm:text-[32px] lg:text-[40px] text-[#F90301] whitespace-nowrap">
          LULU SHOP
        </h3>
      </div>

      <Navigation />

    </header>

  )
}

export default HeaderComponent