import VintageSection from "@/components/sections/VintageSection/VintageSection"
import CollectionsSection from "../components/sections/CollectionsSection/CollectionsSection"
import HeroSection from "../components/sections/HeroSection/HeroSection"
import SpecialDiscountsSection from "@/components/sections/SpecialDiscountsSection/SpecialDiscountsSection"

const HomeScreen = () => {
  return (
    <div className="space-y-16 overflow-x-hidden bg-[#110D0D] sm:space-y-20 lg:space-y-24 xl:space-y-30">
      <HeroSection />
      <CollectionsSection />
      <SpecialDiscountsSection />
      <VintageSection />
    </div>
  )
}

export default HomeScreen
