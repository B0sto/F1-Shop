import type { NavigationItemsType } from "../../../types/NavigationItemType";
import NavItem from "./NavItem";
import BurgerMenu from "./BurgerMenu";



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

    {
        pageName: "Profile",
        imagePath: "/userProfileWheel.svg"
    }
]

const mainItems = navigationItems.filter(
    (item) => item.pageName !== "Profile"
);

const profileItem = navigationItems.find(
    (item) => item.pageName === "Profile"
);

const Navigation = () => {
    return (
        <>
            <div className="hidden md:flex flex-1 items-center justify-center">
                <div className="flex items-center gap-x-5 lg:gap-x-10 xl:gap-x-14">
                    {mainItems.map((navItem) => (
                        <NavItem key={navItem.pageName} navItem={navItem} />
                    ))}
                </div>
            </div>
            
            <BurgerMenu navigationItems={navigationItems}/>
            {profileItem && <NavItem navItem={profileItem} className="hidden md:block"/>}
        </>
    );
};

export default Navigation
