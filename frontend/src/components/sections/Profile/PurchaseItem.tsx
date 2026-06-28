import { ArrowRight, PackageCheck, Truck } from "lucide-react"
import type { LucideIcon } from "lucide-react"

import type { Purchase, PurchaseStatus } from "./types"

type PurchaseItemProps = {
  purchase: Purchase
}

const statusStyles: Record<PurchaseStatus, string> = {
  Delivered: "border-white/30 text-white",
  Transit: "border-[#F90301]/40 text-[#F90301]",
}

const statusIcons: Record<PurchaseStatus, LucideIcon> = {
  Delivered: PackageCheck,
  Transit: Truck,
}

const PurchaseItem = ({ purchase }: PurchaseItemProps) => {
  const StatusIcon = statusIcons[purchase.status]

  return (
    <article className="grid grid-cols-[80px_minmax(0,1fr)] gap-4 p-4 sm:grid-cols-[96px_minmax(0,1fr)] sm:gap-5 sm:p-6 xl:grid-cols-[100px_minmax(0,1fr)_auto] xl:items-center">
      <div className="flex size-20 items-center justify-center rounded-lg bg-white p-2.5 sm:size-24 sm:p-3">
        <img
          src={purchase.image}
          alt={purchase.name}
          loading="lazy"
          className="h-full w-full object-contain"
        />
      </div>

      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-3">
          <p className="text-[15px] text-[#747474]">{purchase.id}</p>
          <span className={`inline-flex h-7 items-center gap-2 rounded-full border px-3 text-[13px] leading-none ${statusStyles[purchase.status]}`}>
            <StatusIcon className="size-3.5" />
            {purchase.status}
          </span>
        </div>

        <h3 className="mt-3 max-w-150 text-lg leading-tight sm:text-[22px]">{purchase.name}</h3>

        <div className="mt-4 flex flex-wrap gap-x-8 gap-y-2 text-[14px] text-[#747474] sm:text-[15px]">
          <p>{purchase.date}</p>
          <p className="text-white">{purchase.price}</p>
        </div>
      </div>

      <div className="col-span-2 flex sm:col-span-1 sm:col-start-2 xl:col-start-auto">
        <button
          type="button"
          className="inline-flex h-9 w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-[#F90301] px-4 text-[15px] leading-none transition-colors duration-300 hover:bg-[#aa0303] sm:w-fit"
        >
          Details
          <ArrowRight className="size-4" />
        </button>
      </div>
    </article>
  )
}

export default PurchaseItem
