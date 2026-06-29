import { Check } from "lucide-react";

type CartCheckboxProps = {
    selected: boolean;
};

const CartCheckbox = ({ selected }: CartCheckboxProps) => (
    <span className="absolute top-1.5 right-1.5 flex size-4 items-center justify-center rounded-[1px] border-2 border-[#2b2b2b] bg-[#f7f7f7] text-black">
        {selected && <Check className="size-3 stroke-3" />}
    </span>
);

export default CartCheckbox;
