import VintageSection from "@/components/sections/VintageSection/VintageSection"
import CollectionsSection from "../components/sections/CollectionsSection/CollectionsSection"
import Footer from "@/components/sections/Footer/Footer"
import HeaderComponent from "../components/sections/Header/HeaderComponent"
import HeroSection from "../components/sections/HeroSection/HeroSection"
import SpecialDiscountsSection from "@/components/sections/SpecialDiscountsSection/SpecialDiscountsSection"

const HomeScreen = () => {
  return (
    <div className="h-dvh overflow-hidden bg-[#110D0D]">
      <HeaderComponent />
      <main className="mt-16 h-[calc(100dvh-4rem)] space-y-16 overflow-x-hidden overflow-y-auto sm:mt-18.75 sm:h-[calc(100dvh-75px)] sm:space-y-20 lg:space-y-24 xl:space-y-30">
        <HeroSection />
        <CollectionsSection />
        <SpecialDiscountsSection />
        <VintageSection />
        <Footer />
      </main>
    </div>
  )
}

export default HomeScreen
