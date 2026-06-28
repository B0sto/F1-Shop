import { User } from "lucide-react"

import SectionTitle from "@/components/common/SectionTitle"
import ProfileCard from "@/components/sections/Profile/ProfileCard"
import RecentPurchases from "@/components/sections/Profile/RecentPurchases"
import type { UserProfile } from "@/types/UserProfileType"
import type { Purchase } from "@/types/PurchaseType"

const profile: UserProfile = {
  username: "Kim44Kardashian",
  email: "kimkardashian@gmail.com",
  address: "Los Angeles, California",
  memberSince: "March 2026",
  totalSpent: "$500.00",
  avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=320&q=80",
}

const recentPurchases: Purchase[] = [
  {
    id: "#F1-98432",
    name: "George Russell Graphic Hoodie Black",
    date: "December 12, 2025",
    price: "$160.00",
    status: "Delivered",
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=320&q=80",
  },
  {
    id: "#F1-78876",
    name: "Scuderia Ferrari 2025 Team Lewis Hamilton Cap - White",
    date: "April 14, 2025",
    price: "$41.00",
    status: "Transit",
    image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=320&q=80",
  },
  {
    id: "#F1-43087",
    name: "Puma MAPF1 Mercedes AMG Petronas Suede 30802401 Mens Black Sneakers Shoes",
    date: "January 9, 2026",
    price: "$80.00",
    status: "Delivered",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=320&q=80",
  },
]

const ProfileScreen = () => {
  return (
    <section className="min-h-full px-4 py-8 font-akshar text-white sm:px-8 sm:py-10 lg:px-12 lg:py-12 xl:px-16 2xl:px-36">
      <div className="mx-auto w-full max-w-350">
        <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-2 text-[12px] uppercase tracking-[0.2em] text-[#F90301] sm:text-[15px] sm:tracking-[0.26em]">
              LULU SHOP MEMBER
            </p>
            <SectionTitle title="Profile" className="text-white" />
          </div>

          <button
            type="button"
            className="inline-flex h-10 w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-white px-4 text-[16px] text-black transition-colors duration-300 hover:bg-[#F90301] hover:text-white sm:w-fit"
          >
            <User className="size-4" />
            Edit profile
          </button>
        </div>

        <ProfileCard profile={profile} totalOrders={recentPurchases.length} />

        <div className="mt-6 lg:mt-8">
          <RecentPurchases purchases={recentPurchases} />
        </div>
      </div>
    </section>
  )
}

export default ProfileScreen
