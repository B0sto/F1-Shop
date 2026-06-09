import F1Logo from "../../svgs/F1Logo"
import UserIcon from "../../svgs/UserIcon"
import Navigation from "./Navigation"


const HeaderComponent = () => {

  return (
    <header className="bg-black h-18.75 px-6 flex justify-between items-center">
      <div className="flex items-center gap-x-8">
        <F1Logo />

        <h3 className="font-irish text-[40px] text-[#F90301]">LULU SHOP</h3>
      </div>

      <Navigation />

      <UserIcon />
    </header>

  )
}

export default HeaderComponent