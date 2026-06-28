import { CalendarDays, Mail, MapPin, ShoppingBag, WalletCards } from "lucide-react"

import ProfileStatCard from "./ProfileStatCard"
import type { UserProfile } from "@/types/UserProfileType"

type ProfileCardProps = {
  profile: UserProfile
  totalOrders: number
}

const ProfileCard = ({ profile, totalOrders }: ProfileCardProps) => {
  return (
    <article className="relative overflow-hidden rounded-lg border border-white/10">
      <div className="absolute inset-y-0 left-0 w-1 bg-[#F90301] sm:w-2" />

      <div className="grid gap-6 p-5 pl-6 sm:gap-8 sm:p-8 lg:grid-cols-[minmax(0,1fr)_minmax(280px,360px)] lg:items-center">
        <div className="flex min-w-0 flex-col gap-5 sm:flex-row sm:items-center sm:gap-6">
          <img
            src={profile.avatar}
            alt={`${profile.username} avatar`}
            className="size-24 rounded-lg border border-white/15 object-cover sm:size-30 lg:size-34"
          />

          <div className="min-w-0">
            <p className="text-[13px] uppercase tracking-[0.18em] text-[#747474] sm:text-[15px] sm:tracking-[0.22em]">
              Driver ID
            </p>
            <h1 className="mt-2 wrap-break-word text-4xl leading-none sm:text-5xl lg:text-[56px]">
              {profile.username}
            </h1>

            <div className="mt-5 grid gap-3 text-[16px] leading-tight text-[#747474] sm:text-[17px] xl:grid-cols-2">
              <p className="flex min-w-0 items-center gap-2">
                <Mail className="size-4 shrink-0 text-[#F90301]" />
                <span className="break-all">{profile.email}</span>
              </p>
              <p className="flex min-w-0 items-center gap-2">
                <MapPin className="size-4 shrink-0 text-[#F90301]" />
                <span className="wrap-break-word">{profile.address}</span>
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
          <ProfileStatCard icon={CalendarDays} label="Since" value={profile.memberSince} />
          <ProfileStatCard icon={WalletCards} label="Spent" value={profile.totalSpent} />
          <ProfileStatCard icon={ShoppingBag} label="Orders" value={totalOrders} />
        </div>
      </div>
    </article>
  )
}

export default ProfileCard
