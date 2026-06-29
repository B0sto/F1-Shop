import { useState } from "react"

type Size = string | number;

type SizeSelectorProps = {
    sizes: Size[];
    value?: Size;
    onChange?: (size: Size) => void;
}

const buttonClass =
    "flex h-5 min-w-4 cursor-pointer items-center justify-center border border-[#292525] px-1 text-[11px] leading-none transition-colors duration-300";

const SizeSelector = ({ sizes, value, onChange }: SizeSelectorProps) => {
    const [selectedSize, setSelectedSize] = useState<Size>();
    const activeSize = value ?? selectedSize;

    const handleSelectSize = (size: Size) => {
        setSelectedSize(size);
        onChange?.(size);
    }

    return (
        <div className="flex items-center gap-0.5">
            {sizes.map((size) => (
                <button
                    type="button"
                    key={size}
                    className={`${buttonClass} ${
                        activeSize === size
                            ? "bg-[#544D4D] text-[#FFFCFC]"
                            : "bg-[#FFFCFC] text-[#110D0D] hover:bg-[#a69f9f]"
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
