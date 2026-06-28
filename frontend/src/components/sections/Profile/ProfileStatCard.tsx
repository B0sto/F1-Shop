import type { LucideIcon } from "lucide-react"

type ProfileStatCardProps = {
  icon: LucideIcon
  label: string
  value: string | number
}

const ProfileStatCard = ({ icon: Icon, label, value }: ProfileStatCardProps) => {
  return (
    <div className="rounded-lg border border-white/10 px-4 py-3 sm:min-h-24">
      <p className="flex items-center gap-2 text-[12px] uppercase tracking-[0.14em] text-[#747474] sm:text-[14px] sm:tracking-[0.16em]">
        <Icon className="size-4 text-[#F90301]" />
        {label}
      </p>
      <p className="mt-2 text-[22px] leading-none sm:text-[24px]">{value}</p>
    </div>
  )
}

export default ProfileStatCard
