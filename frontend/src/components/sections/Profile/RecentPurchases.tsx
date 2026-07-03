import { ArrowRight } from "lucide-react"

import PurchaseItem from "./PurchaseItem"
import type { Purchase } from "@/types/PurchaseType"
import { Link } from "@tanstack/react-router"

type RecentPurchasesProps = {
  purchases: Purchase[]
}

const RecentPurchases = ({ purchases }: RecentPurchasesProps) => {
  return (
    <main className="rounded-lg border border-white/10">
      <div className="flex flex-col gap-4 border-b border-white/10 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
        <h2 className="text-3xl leading-none sm:text-[34px]">Recent purchases</h2>

        <Link
          to="/profile/orders"
          className="inline-flex h-9 w-full cursor-pointer items-center justify-center gap-2 rounded-lg border border-white/20 px-4 text-[15px] transition-colors duration-300 hover:border-[#F90301] hover:text-[#F90301] sm:w-fit"
        >
          View all
          <ArrowRight className="size-4" />
        </Link>
      </div>

      <div className="divide-y divide-white/10">
        {purchases.map((purchase) => (
          <PurchaseItem key={purchase.key} purchase={purchase} />
        ))}
      </div>
    </main>
  )
}

export default RecentPurchases
