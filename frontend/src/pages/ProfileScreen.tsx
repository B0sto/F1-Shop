import { User } from "lucide-react"
import { useState } from "react"

import SectionTitle from "@/components/common/SectionTitle"
import ProfileCard from "@/components/sections/Profile/ProfileCard"
import RecentPurchases from "@/components/sections/Profile/RecentPurchases"
import type { UserProfile } from "@/types/UserProfileType"
import type { Purchase } from "@/types/PurchaseType"
import { useQuery } from "@tanstack/react-query"
import { recentPurchasesQuery } from "@/services/providers/queries/checkoutQueries"
import { meQuery } from "@/services/providers/queries/authQueries"
import EditProfileModal from "@/components/sections/Profile/EditProfileModal"


const ProfileScreen = () => {
  const { data: orders = [] } = useQuery(recentPurchasesQuery)
  const { data: user } = useQuery(meQuery);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const profile: UserProfile = {
    _id: user?.id || "",
    username: user?.username || "Driver",
    email: user?.email || "",
    address: user?.address || "No address provided",
    memberSince: user?.createdAt
      ? new Date(user.createdAt).toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      })
      : "N/A",
    totalSpent: user?.totalSpent ?? 0,
    avatar: user?.avatar || `https://ui-avatars.com/api/?name=${user?.username}&background=F90301&color=fff&size=256`
  }

  const purchases: Purchase[] = orders
    .flatMap((order) =>
      order.items.map((item) => ({
        id: `F1-${order._id.slice(0, 5).toUpperCase()}`,
        name: item.name,
        date: new Date(order.createdAt).toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        }),
        price: `$${item.totalPrice}.00`,
        status: "Delivered" as const,
        image: item.image,
      }))
    )
    .slice(0, 3);

  const totalOrdersCount = orders.length;

  return (
    <section className="min-h-full px-4 py-8 font-akshar text-white sm:px-8 sm:py-10 lg:px-12 lg:py-12 xl:px-16 2xl:px-36">
      <div className="mx-auto w-full max-w-350">
        <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <SectionTitle title="Profile" className="text-white" />

          <button
            type="button"
            onClick={() => setIsEditModalOpen(true)}
            className="inline-flex h-10 w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-white px-4 text-[16px] text-black transition-colors duration-300 hover:bg-[#F90301] hover:text-white sm:w-fit"
          >
            <User className="size-4" />
            Edit profile
          </button>
        </div>

        <ProfileCard profile={profile} totalOrders={totalOrdersCount} />

        <div className="mt-6 lg:mt-8">
          <RecentPurchases purchases={purchases} />
        </div>
      </div>

      <EditProfileModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        profile={profile}
      />
    </section>
  )
}

export default ProfileScreen


