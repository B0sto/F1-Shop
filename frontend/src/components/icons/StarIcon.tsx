
import type { SVGProps } from "react"

const StarIcon = ({ className, ...props }: SVGProps<SVGSVGElement>) => {
    return (
        <svg
            viewBox="0 0 61 60"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className ?? "h-15 w-15.25"}
            {...props}
        >
            <path d="M20.38 47.37L29.75 41.69L39.12 47.45L36.66 36.67L44.92 29.49L34.06 28.51L29.75 18.34L25.43 28.44L14.58 29.41L22.83 36.67L20.38 47.37ZM11.38 59.87L16.21 38.84L0 24.7L21.42 22.83L29.75 2.99L38.08 22.83L59.49 24.7L43.28 38.84L48.12 59.87L29.75 48.72L11.38 59.87ZM45.36 17.96L46.93 11.3L41.65 6.89L48.64 6.29L51.31 0L53.99 6.29L60.98 6.89L55.7 11.3L57.26 17.96L51.31 14.44L45.36 17.96Z" fill="#F3EBEB" />
        </svg>


    )
}

export default StarIcon
