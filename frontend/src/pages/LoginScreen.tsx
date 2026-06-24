import F1Logo from "@/components/icons/F1Logo"
import GoogleIcon from "@/components/icons/GoogleIcon"

const LoginScreen = () => {
  return (
    <div className="bg-[#060606] h-screen flex items-center justify-center flex-col">
      <F1Logo className="w-41 h-33.5" />
      <h1 className="text-[48px] font-irish text-white mb-3">
        Welcome To <span className="text-[#F90301]">LULU SHOP</span>
      </h1>

      <form className="bg-[#110D0D] py-18.5 px-17.75 pl-19.5 mb-45 w-120 font-akshar rounded-xl">
        <div className="flex flex-col gap-y-2.5 mb-4.75">
          <label htmlFor="email" className="text-white text-[16px]">EMAIL</label>
          <input type="text" id="email" className="bg-[#D9D9D9] rounded-sm px-2 py-1" />
        </div>

        <div className="flex flex-col gap-y-2.5 mb-7.75">
          <label htmlFor="password" className="text-white text-[16px]">PASSWORD</label>
          <input type="text" id="password" className="bg-[#D9D9D9] rounded-sm px-2 py-1" />
        </div>

        <button className="w-full bg-[#F90301] text-[16px] rounded-lg py-1.5 text-white mb-7 cursor-pointer hover:bg-[#aa0303] transition-all duration-300">LOG IN</button>


        <div className="w-full flex items-center justify-center gap-x-2.5 mb-5">
          <div className="w-[30%] bg-white h-px"></div>
          <span className="text-[16px] text-white">OR CONTINUE WITH</span>
          <div className="w-[30%] bg-white h-px"></div>
        </div>

        <button className="w-full pt-2.25 pb-3 border border-white flex items-center gap-x-2.5 justify-center cursor-pointer hover:bg-[#373737] transition-all duration-300">
          <GoogleIcon />
          <span className="text-white text-[18px]">Google</span>
        </button>
      </form>
    </div>
  )
}

export default LoginScreen