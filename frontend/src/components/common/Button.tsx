
type ButtonProps = {
    text?: string
}

const Button = ({ text = "Add To Cart" }: ButtonProps) => {
  return (
    <button className='bg-[#AA1414] px-2 rounded-full text-[14px]'>
        {text}
    </button>
  )
}

export default Button
