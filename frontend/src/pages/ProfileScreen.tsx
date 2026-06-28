import SectionTitle from "@/components/common/SectionTitle"

const ProfileScreen = () => {
  return (
    <div className="font-akshar h-screen">
      <SectionTitle title="User Profile" className="text-white"/>
      <div className="w-120 h-150 bg-black">
        <img src="" alt="" />
      </div>
      
      <SectionTitle title="Recent purchases" className="text-white"/>
      <div className="bg-black"></div>  
    </div>

  )
}

export default ProfileScreen