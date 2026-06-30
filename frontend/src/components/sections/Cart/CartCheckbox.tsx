import { Check } from "lucide-react";

type CartCheckboxProps = {
    selected: boolean;
    disabled?: boolean;
    onToggle?: () => void;
};

const CartCheckbox = ({ selected, disabled = false, onToggle }: CartCheckboxProps) => (
    <button
        type="button"
        disabled={disabled}
        onClick={onToggle}
        aria-pressed={selected}
        className="absolute top-1.5 right-1.5 flex size-4 items-center justify-center rounded-[1px] border-2 border-[#2b2b2b] bg-[#f7f7f7] text-black disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer"
    >
        {selected && <Check className="size-3 stroke-3" />}
    </button>
);

export default CartCheckbox;