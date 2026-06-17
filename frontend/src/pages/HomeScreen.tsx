import VintageSection from "@/components/sections/VintageSection/VintageSection"
import CollectionsSection from "../components/sections/CollectionsSection/CollectionsSection"
import HeaderComponent from "../components/sections/Header/HeaderComponent"
import HeroSection from "../components/sections/HeroSection/HeroSection"
import SpecialDiscountsSection from "@/components/sections/SpecialDiscountsSection/SpecialDiscountsSection"

const HomeScreen = () => {
  const sections = [
    <HeroSection key="hero" />,
    <CollectionsSection key="collections" />,
    <SpecialDiscountsSection key="special-discounts" />,
    <VintageSection key="vintage f1 collection"/>
  ]

  return (
    <>
      <HeaderComponent />
      <main className="space-y-16 sm:space-y-20 lg:space-y-24 xl:space-y-30">
        {sections}
      </main>
    </>
  )
}

export default HomeScreen
