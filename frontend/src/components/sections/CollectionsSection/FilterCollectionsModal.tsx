import { useEffect, useState } from "react"
import { Modal } from "@/components/common/Modal"
import { SlidersHorizontal, RotateCcw } from "lucide-react"

type FilterCollectionsModalProps = {
    isOpen: boolean
    onClose: () => void
    allDrivers: string[]
    selectedDrivers: string[]
    minPrice: number | undefined
    maxPrice: number | undefined
    onApply: (drivers: string[], minPrice: number | undefined, maxPrice: number | undefined) => void
    onReset: () => void
}

export const FilterCollectionsModal = ({
    isOpen,
    onClose,
    allDrivers,
    selectedDrivers,
    minPrice,
    maxPrice,
    onApply,
    onReset,
}: FilterCollectionsModalProps) => {
    const [tempDrivers, setTempDrivers] = useState<string[]>([])
    const [tempMinPrice, setTempMinPrice] = useState<number | undefined>(undefined)
    const [tempMaxPrice, setTempMaxPrice] = useState<number | undefined>(undefined)

    // Sync temporary states when modal opens or inputs change
    useEffect(() => {
        if (isOpen) {
            setTempDrivers(selectedDrivers)
            setTempMinPrice(minPrice)
            setTempMaxPrice(maxPrice)
        }
    }, [isOpen, selectedDrivers, minPrice, maxPrice])

    const handleDriverCheckboxChange = (driver: string, checked: boolean) => {
        if (checked) {
            setTempDrivers(prev => [...prev, driver])
        } else {
            setTempDrivers(prev => prev.filter(d => d !== driver))
        }
    }

    const handleApply = () => {
        onApply(tempDrivers, tempMinPrice, tempMaxPrice)
    }

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Filter Collections"
            description="Specify F1 drivers and a price range to refine results."
            size="md"
            footer={
                <div className="flex w-full items-center justify-between gap-3">
                    <button
                        type="button"
                        onClick={onReset}
                        className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg border border-white/10 px-4 py-2 font-akshar text-[15px] text-white/60 transition-colors duration-300 hover:border-white/20 hover:text-white"
                    >
                        <RotateCcw className="size-4" />
                        Reset
                    </button>
                    <div className="flex items-center gap-3">
                        <button
                            type="button"
                            className="cursor-pointer rounded-lg border border-white/20 px-5 py-2 font-akshar text-white transition-colors duration-300 hover:bg-white hover:text-black"
                            onClick={onClose}
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            onClick={handleApply}
                            className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg bg-[#F90301] px-5 py-2 font-akshar text-white transition-colors duration-300 hover:bg-[#aa0303]"
                        >
                            <SlidersHorizontal className="size-4" />
                            Apply Filters
                        </button>
                    </div>
                </div>
            }
        >
            <div className="space-y-6">
                {/* Drivers Checklist */}
                <div>
                    <h4 className="text-xs uppercase tracking-wider text-[#747474] mb-3">Drivers</h4>
                    {allDrivers.length === 0 ? (
                        <p className="text-sm text-white/40">No drivers available.</p>
                    ) : (
                        <div className="grid grid-cols-2 gap-3 max-h-48 overflow-y-auto pr-1">
                            {allDrivers.map((driver) => {
                                const isChecked = tempDrivers.includes(driver)
                                return (
                                    <label
                                        key={driver}
                                        className={`flex cursor-pointer items-center gap-2.5 rounded-lg border p-3 transition-all duration-300 ${
                                            isChecked
                                                ? "border-[#F90301] bg-[#F90301]/5 text-white"
                                                : "border-white/10 bg-white/5 text-white/70 hover:border-white/20"
                                        }`}
                                    >
                                        <input
                                            type="checkbox"
                                            checked={isChecked}
                                            onChange={(e) => handleDriverCheckboxChange(driver, e.target.checked)}
                                            className="accent-[#F90301] size-4 rounded cursor-pointer"
                                        />
                                        <span className="text-[15px] select-none font-medium">{driver}</span>
                                    </label>
                                )
                            })}
                        </div>
                    )}
                </div>

                {/* Price Filter Inputs */}
                <div>
                    <h4 className="text-xs uppercase tracking-wider text-[#747474] mb-3">Price Range ($)</h4>
                    <div className="flex items-center gap-3">
                        <div className="relative w-full">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30 text-[15px]">$</span>
                            <input
                                type="number"
                                min="0"
                                placeholder="Min Price"
                                value={tempMinPrice ?? ""}
                                onChange={(e) => {
                                    const val = e.target.value
                                    setTempMinPrice(val === "" ? undefined : Number(val))
                                }}
                                className="w-full rounded-lg border border-white/10 bg-white/5 py-2.5 pl-7 pr-4 text-[15px] text-white placeholder-white/20 transition-all duration-300 focus:border-[#F90301] focus:bg-white/10 focus:outline-none"
                            />
                        </div>
                        <span className="text-white/40">—</span>
                        <div className="relative w-full">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30 text-[15px]">$</span>
                            <input
                                type="number"
                                min="0"
                                placeholder="Max Price"
                                value={tempMaxPrice ?? ""}
                                onChange={(e) => {
                                    const val = e.target.value
                                    setTempMaxPrice(val === "" ? undefined : Number(val))
                                }}
                                className="w-full rounded-lg border border-white/10 bg-white/5 py-2.5 pl-7 pr-4 text-[15px] text-white placeholder-white/20 transition-all duration-300 focus:border-[#F90301] focus:bg-white/10 focus:outline-none"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    )
}
