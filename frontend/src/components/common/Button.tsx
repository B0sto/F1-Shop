import { meQuery } from "@/services/providers/queries/authQueries"
import { useQuery } from "@tanstack/react-query"
import { toast } from "sonner"

type ButtonProps = {
    text?: string
    className?: string
}

const Button = ({ text = "Add To Cart", className = "" }: ButtonProps) => {
  const { data: user } = useQuery(meQuery);

  const handleAddToCart = () => {
    if (!user) {
      toast.error("You should be logged in to add products to cart");
    }
  }

  return (
    <button type="button" className={`${className} h-7 whitespace-nowrap rounded-full px-2.5 text-[13px] transition-all duration-300 cursor-pointer sm:h-8 sm:px-3 sm:text-[14px]`} onClick={handleAddToCart}>
        {text}
    </button>
  )
}

export default Button
