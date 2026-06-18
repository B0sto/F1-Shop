type ButtonProps = {
    text?: string
    className?: string
}

const Button = ({ text = "Add To Cart", className = "" }: ButtonProps) => {
  return (
    <button type="button" className={`${className} h-7 whitespace-nowrap rounded-full px-2.5 text-[13px] transition-all duration-300 cursor-pointer sm:h-8 sm:px-3 sm:text-[14px]`}>
        {text}
    </button>
  )
}

export default Button
