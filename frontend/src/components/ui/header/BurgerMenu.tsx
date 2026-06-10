import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import type { NavigationItemsType } from "../../../types/NavigationItemType";

type BurgerMenuProps = {
    navigationItems: NavigationItemsType[];
}

const BurgerMenu = ({ navigationItems }: BurgerMenuProps) => {
    const [toggle, setToggle] = useState(false);

    useEffect(() => {
        if (toggle) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }

        return () => {
            document.body.style.overflow = "auto";
        }
    }, [toggle])

    return (
        <div className="relative">
            <Menu
                className="text-[#F90301] md:hidden cursor-pointer"
                onClick={() => setToggle(prev => !prev)}
            />

            {toggle && (
                <div className="fixed inset-0 bg-black/50 z-40" onClick={() => setToggle(false)}>
                    <div className="absolute right-0 top-0 w-52 h-screen bg-black text-red-500 p-4 pr-6 pt-6" onClick={(e) => e.stopPropagation()}>
                        <X className="ml-auto" onClick={() => setToggle(false)}/>
                        <ul className="space-y-4 pt-15">
                            {navigationItems.map((navItem: NavigationItemsType) => (
                                <li className="flex items-center gap-x-3 font-irish">
                                    <img src={navItem.imagePath} alt={`${navItem.pageName} Wheel`} className="size-11"/>
                                    <span>{navItem.pageName}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

            )}
        </div>
    );
};

export default BurgerMenu;