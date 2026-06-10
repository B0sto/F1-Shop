import type { NavigationItemsType } from "../../../types/NavigationItemType";

const BouncyText = ({ text }: { text: any }) => {
    return text.split("").map((letter: any, index: number) => (
        <span
            key={index}
            className="letter text-[16px]"
            style={{ animationDelay: `${index * 60}ms` }}
        >
            {letter === " " ? "\u00A0" : letter}
        </span>
    ));
};

const NavItem = ({ navItem, className }: { navItem: NavigationItemsType, className?: string }) => {
    return (
        <div className={`group relative flex flex-col items-center justify-center cursor-pointer whitespace-nowrap ${className}`}>
            <span className="absolute -top-2.5 text-[#F90301] font-irish text-sm sm:text-base">
                <BouncyText text={navItem.pageName} />
            </span>

            <img
                src={navItem.imagePath}
                alt={`${navItem.pageName} Wheel`}
                className="size-9 sm:size-11 mt-2 transition-transform duration-500 group-hover:rotate-45"
            />
        </div>
    );
};

export default NavItem