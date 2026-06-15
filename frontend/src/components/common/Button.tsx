
import type { TeamVariant } from "@/utils/teamStyles"

type ButtonProps = {
    text?: string
    variant?: TeamVariant
}

const buttonVariants: Record<TeamVariant, string> = {
    ferrari: "bg-[#AA1414] hover:bg-[#B54D4D]",
    mercedes: "bg-[#005871] hover:bg-[#3A7484]",
}

const Button = ({ text = "Add To Cart", variant = "ferrari" }: ButtonProps) => {
  return (
    <button className={`${buttonVariants[variant]} px-2 rounded-full text-[14px] transition-all duration-300 cursor-pointer`}>
        {text}
    </button>
  )
}

export default Button
