const BouncyText = ({ text }: { text: any }) => {
    return text.split("").map((letter: any, index: number) => (
        <span
            key={index}
            className="letter text-[16px]"
            style={{ animationDelay: `${index * 70}ms` }}
        >
            {letter === " " ? "\u00A0" : letter}
        </span>
    ));
};

type NavigationItemsType = {
    pageName: string;
    imagePath: string;
}

const navigationItems: NavigationItemsType[] = [
    {
        pageName: "Home",
        imagePath: "/homeWheel.svg"
    },

    {
        pageName: "Shop",
        imagePath: "/shopWheel.svg"
    },

    {
        pageName: "Cart",
        imagePath: "/cartWheel.svg"
    },
]

const Navigation = () => {
    return (
        <div className="flex items-center gap-x-5">
            {navigationItems.map((navItem: NavigationItemsType) => (
            <div className="group relative flex flex-col items-center justify-center cursor-pointer">
                <span className="absolute -top-2.5 text-[#F90301] font-irish">
                    <BouncyText text={navItem.pageName} />
                </span>

                <img
                    src={navItem.imagePath}
                    alt={`${navItem.pageName} Wheel`}
                    className="size-11 mt-2 transition-transform duration-500 group-hover:rotate-45"
                />
            </div>
            ))}

        </div>
    )
}

export default Navigation