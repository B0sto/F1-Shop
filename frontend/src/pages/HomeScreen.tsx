import CollectionsSection from "../components/sections/CollectionsSection/CollectionsSection"
import HeaderComponent from "../components/sections/Header/HeaderComponent"
import HeroSection from "../components/sections/HeroSection/HeroSection"

const HomeScreen = () => {
  return (
    <>
        <HeaderComponent />
        <HeroSection />
        <CollectionsSection />
    </>
  )
}

export default HomeScreen