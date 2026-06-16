import { useState } from "react"

type SizeSelectorProps = {
    sizes: Array<string | number>;
    selectedSize?: string | number;
    onSelectSize?: (size: string | number) => void;
}

const SizeSelector = ({ sizes, selectedSize, onSelectSize }: SizeSelectorProps) => {
    const [internalSelectedSize, setInternalSelectedSize] = useState<string | number | undefined>(selectedSize);
    const activeSize = selectedSize ?? internalSelectedSize;

    const handleSelectSize = (size: string | number) => {
        setInternalSelectedSize(size);
        onSelectSize?.(size);
    }

    return (
        <div className="flex items-center gap-0.5">
            {sizes.map((size) => (
                <button
                    key={size}
                    className={`flex h-5 min-w-4 items-center justify-center border border-[#292525] px-1 text-[11px] leading-none cursor-pointer transition-colors duration-300 text-[#110D0D] ${
                        activeSize === size
                            ? "bg-[#544D4D] text-[#FFFCFC]"
                            : "bg-[#FFFCFC] hover:bg-[#a69f9f]"
                    }`}
                    aria-pressed={activeSize === size}
                    onClick={() => handleSelectSize(size)}
                >
                    {size}
                </button>
            ))}
        </div>

    )
}

export default SizeSelector
