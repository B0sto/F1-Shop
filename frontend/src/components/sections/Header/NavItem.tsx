import { Link } from "@tanstack/react-router"
import type { NavigationItemsType } from "../../../types/NavigationItemType"

const BouncyText = ({ text }: { text: string }) => {
    return text.split("").map((letter, index) => (
        <span
            key={index}
            className="letter"
            style={{ animationDelay: `${index * 60}ms` }}
        >
            {letter === " " ? "\u00A0" : letter}
        </span>
    ))
}

type NavItemProps = {
    navItem: NavigationItemsType
    className?: string
    onClick?: () => void
}

const NavItem = ({ navItem, className = "", onClick }: NavItemProps) => {
    const content = (
        <>
            <span className="absolute -top-2.5 text-[#F90301] font-irish text-sm lg:text-base">
                <BouncyText text={navItem.pageName} />
            </span>

            <img
                src={navItem.imagePath}
                alt={`${navItem.pageName} Wheel`}
                className="size-9 lg:size-11 mt-2 transition-transform duration-500 group-hover:rotate-45"
            />
        </>
    )

    const styles = `group relative flex flex-col items-center justify-center cursor-pointer whitespace-nowrap ${className}`

    if (navItem.routeHref) {
        return (
            <Link to={navItem.routeHref} className={styles}>
                {content}
            </Link>
        )
    }

    return (
        <button type="button" className={styles} onClick={onClick}>
            {content}
        </button>
    )
}

export default NavItem
